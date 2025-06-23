import pool from "@/lib/db";

export async function POST(req) {
  try {
    const { id, pw } = await req.json();

    if (!id || !pw) {
      return new Response("id와 pw는 필수입니다.", { status: 400 });
    }

    // 회원 정보 등록 (users 테이블에 저장)
    const [result] = await pool.query(
      "INSERT INTO user (id, pw) VALUES (?, ?)",
      [id, pw]
    );

    return new Response("ok", { status: 201 });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return new Response("이미 존재하는 아이디입니다.", { status: 409 });
    }
    return new Response("서버 오류: " + err.message, { status: 500 });
  }
}
