import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM user");
    return Response.json(rows);
  } catch (err) {
    console.error(err);
    return new Response("Database error", { status: 500 });
  }
}
