import pool from "@/lib/db";

// CORS 프리플라이트 옵션 (필요시)
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
  });
}

// POST: 위치(local) 업데이트
export async function POST(req) {
  try {
    const { id, local } = await req.json();

    if (!id || !local) {
      return new Response("id와 local은 필수입니다.", {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    // status 테이블에서 id 기준 local 업데이트
    const [result] = await pool.query("UPDATE status SET local=? WHERE id=?", [
      local,
      id,
    ]);

    if (result.affectedRows === 0) {
      return new Response("해당 id의 유저를 찾을 수 없습니다.", {
        status: 404,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    return new Response("위치 저장 성공", {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (err) {
    console.error("위치 저장 오류:", err);
    return new Response("서버 오류: " + err.message, {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }
}
