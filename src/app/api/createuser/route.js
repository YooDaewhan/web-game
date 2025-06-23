import { NextResponse } from "next/server";
import db from "@/lib/db"; // DB 유틸

export async function POST(req) {
  try {
    const { id, name, birth, sex } = await req.json();
    if (!id || !name || !birth || !sex) {
      return NextResponse.json({ error: "필수값 누락" }, { status: 400 });
    }

    await db.query(
      "INSERT INTO status (id, name, birth, sex) VALUES (?, ?, ?, ?)",
      [id, name, birth, sex]
    );

    await db.query("INSERT INTO equipment  (id, inventory) VALUES (?, ?)", [
      id,
      JSON.stringify([
        { item: "aa001", count: 1000 },
        { item: "aa002", count: 1 },
        { item: "aa003", count: 5 },
        { item: "aa004", count: 5 },
        { item: "aa005", count: 1 },
      ]),
    ]);
    await db.query("INSERT INTO inventory (id, inventory) VALUES (?, ?)", [
      id,
      JSON.stringify([
        { item: "aa001", count: 1000 },
        { item: "aa002", count: 1 },
        { item: "aa003", count: 5 },
        { item: "aa004", count: 5 },
        { item: "aa005", count: 1 },
      ]),
    ]);

    return NextResponse.json({ success: true });
  } catch (e) {
    // 이미 존재할 때 등 에러 메시지 그대로 전달
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
