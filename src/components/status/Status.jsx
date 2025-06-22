"use client";
import { useEffect, useState } from "react";
import StatusInfo from "@/components/status/StatusInfo";

export default function StatusPanel() {
  const [status, setStatus] = useState(null);
  const [showMore, setShowMore] = useState(false);
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

  if (!status)
    return (
      <div
        style={{
          padding: "30px",
          textAlign: "center",
          fontSize: "18px",
          color: "#888",
        }}
      >
        스테이터스 불러오는 중...
      </div>
    );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRight: "1px solid #ccc",
        background: "#f9fafb",
      }}
    >
      {/* 상단 (1) */}
      <StatusInfo
        status={status}
        showMore={showMore}
        setShowMore={setShowMore}
      />

      {/* 중앙 (3) */}
      <div
        style={{
          flex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #eee",
          border: "1px solid #222",
        }}
      >
        {/* 필요시 내용 */}
      </div>
      {/* 하단 (1) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid #222",
        }}
      >
        {/* 필요시 내용 */}
      </div>
    </div>
  );
}
