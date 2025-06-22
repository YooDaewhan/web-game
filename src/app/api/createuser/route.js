import { NextResponse } from "next/server";
import db from "@/lib/db"; // DB 유틸

export async function POST(req) {
  try {
    const { id, name, birth, sex } = await req.json();
    if (!id || !name || !birth || !sex) {
      return NextResponse.json({ error: "필수값 누락" }, { status: 400 });
    }

    // 트랜잭션 또는 순차 쿼리 (트랜잭션은 DB/유틸마다 방식 다름)
    await db.query(
      "INSERT INTO status (id, name, birth, sex) VALUES (?, ?, ?, ?)",
      [id, name, birth, sex]
    );
    await db.query("INSERT INTO inventory (id, inventory) VALUES (?, ?)", [
      id,
      JSON.stringify([]),
    ]);

    return NextResponse.json({ success: true });
  } catch (e) {
    // 이미 존재할 때 등 에러 메시지 그대로 전달
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
