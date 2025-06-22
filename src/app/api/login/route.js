import pool from "@/lib/db";

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

export async function POST(req) {
  try {
    const { id, pw } = await req.json();

    if (!id || !pw) {
      return new Response("id와 pw는 필수입니다.", {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const [rows] = await pool.query(
      "SELECT * FROM user WHERE id = ? AND pw = ?",
      [id, pw]
    );

    if (rows.length === 0) {
      return new Response("아이디 또는 비밀번호가 틀렸습니다.", {
        status: 401,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // 로그인 성공 시 id 값을 JSON으로 반환
    return new Response(JSON.stringify({ id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("로그인 오류:", err);
    return new Response("서버 오류: " + err.message, {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
