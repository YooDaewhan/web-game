import pool from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const type = searchParams.get("type") || "inventory";

  if (!id) {
    return new Response("id 파라미터가 필요합니다.", { status: 400 });
  }

  // 각 type별로 테이블, 컬럼 정의
  const tableMap = {
    inventory: { table: "inventory", column: "inventory", hasMoney: true },
    equipment: { table: "equipment", column: "inventory", hasMoney: false },
    etc: { table: "etc", column: "inventory", hasMoney: false },
  };

  const conf = tableMap[type];
  if (!conf) {
    return new Response("지원하지 않는 type입니다.", { status: 400 });
  }

  try {
    // money 컬럼은 inventory에서만 select, 나머지는 inventory만
    let sql, params;
    if (conf.hasMoney) {
      sql = `SELECT money, ${conf.column} FROM ${conf.table} WHERE id = ?`;
    } else {
      sql = `SELECT ${conf.column} FROM ${conf.table} WHERE id = ?`;
    }
    params = [id];

    const [rows] = await pool.query(sql, params);

    if (rows.length === 0) {
      return Response.json({
        money: 0,
        inventory: [],
      });
    }

    // 파싱할 값만 뽑기
    let money = 0;
    let inventory = rows[0][conf.column];

    if (conf.hasMoney) {
      money = rows[0].money || 0;
    }

    // JSON 파싱
    if (typeof inventory === "string") {
      try {
        inventory = JSON.parse(inventory);
      } catch {
        inventory = [];
      }
    }
    if (!Array.isArray(inventory)) inventory = [];

    const itemCodes = inventory.map((i) => i.item);
    if (itemCodes.length === 0) {
      return Response.json({
        money,
        inventory: [],
      });
    }

    // item 정보 매칭
    const [itemRows] = await pool.query(
      `SELECT * FROM item WHERE itemCode IN (${itemCodes
        .map(() => "?")
        .join(",")})`,
      itemCodes
    );

    const itemMap = {};
    for (const row of itemRows) {
      itemMap[row.itemCode] = row;
    }

    const mergedInventory = inventory.map((inv) => ({
      ...inv,
      ...itemMap[inv.item],
    }));

    return Response.json({
      money,
      inventory: mergedInventory,
    });
  } catch (error) {
    console.error("DB 조회 실패:", error);
    return new Response("서버 오류", { status: 500 });
  }
}
