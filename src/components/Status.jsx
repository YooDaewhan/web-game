"use client";
import { useEffect, useState } from "react";

export default function status() {
  const [status, setStatus] = useState(null);
  const userId = typeof window !== "undefined" && localStorage.getItem("user");

  useEffect(() => {
    if (!userId) return;

    const fetchStatus = async () => {
      try {
        const res = await fetch(`/api/status?id=${userId}`);
        const data = await res.json();
        setStatus(data);
      } catch (err) {
        console.error("스테이터스 불러오기 실패:", err);
      }
    };

    fetchStatus();
  }, [userId]);

  if (!status) return <div>스테이터스 불러오는 중...</div>;

  return (
    <div style={{ padding: "1rem", borderRight: "1px solid #ccc" }}>
      <h3>🧍 내 상태</h3>
      <p>Lv: {status.level}</p>
      <p>HP: {status.hp}</p>
      <p>MP: {status.mp}</p>
    </div>
  );
}
