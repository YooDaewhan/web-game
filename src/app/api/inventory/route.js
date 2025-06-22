import pool from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("id 파라미터가 필요합니다.", { status: 400 });
  }

  try {
    const [rows] = await pool.query(
      "SELECT money, inventory FROM inventory WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return new Response("해당 사용자의 인벤토리가 없습니다.", {
        status: 404,
      });
    }

    // inventory 파싱 (string 또는 object 대응)
    let inventory = rows[0].inventory;
    if (typeof inventory === "string") {
      inventory = JSON.parse(inventory);
    }
    if (!Array.isArray(inventory)) inventory = [];

    // 아이템 코드 리스트 추출
    const itemCodes = inventory.map((i) => i.item);
    if (itemCodes.length === 0) {
      return Response.json({
        money: rows[0].money,
        inventory: [],
      });
    }

    // item 테이블에서 정보 모두 불러오기 (IN 쿼리)
    const [itemRows] = await pool.query(
      `SELECT * FROM item WHERE itemCode IN (${itemCodes
        .map(() => "?")
        .join(",")})`,
      itemCodes
    );

    // 코드별로 맵핑
    const itemMap = {};
    for (const row of itemRows) {
      itemMap[row.itemCode] = row;
    }

    // inventory에 아이템 정보 매칭해서 반환
    const mergedInventory = inventory.map((inv) => ({
      ...inv,
      ...itemMap[inv.item], // item, count, + itemName, itemImage, itemInfo
    }));

    return Response.json({
      money: rows[0].money,
      inventory: mergedInventory,
    });
  } catch (error) {
    console.error("DB 조회 실패:", error);
    return new Response("서버 오류", { status: 500 });
  }
}
