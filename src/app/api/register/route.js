import pool from "@/lib/db";

export async function POST(req) {
  try {
    const { id, local } = await req.json();

    if (!id || !local) {
      return new Response("id와 local은 필수입니다.", { status: 400 });
    }

    const [result] = await pool.query("UPDATE status SET local=? WHERE id=?", [
      local,
      id,
    ]);

    if (result.affectedRows === 0) {
      return new Response("해당 id의 유저를 찾을 수 없습니다.", {
        status: 404,
      });
    }

    return new Response("ok");
  } catch (err) {
    return new Response("서버 오류: " + err.message, { status: 500 });
  }
}
