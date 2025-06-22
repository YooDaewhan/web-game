import pool from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("ID가 필요합니다.", { status: 400 });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM status WHERE id = ?", [id]);
    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: "스테이터스 없음" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return Response.json(rows[0]);
  } catch (err) {
    console.error("DB 오류:", err);
    return new Response(JSON.stringify({ error: "서버 오류" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
