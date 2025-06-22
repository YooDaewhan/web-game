"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Status from "@/components/Status";
import Inventory from "@/components/Inventory";

export default function MainMainPage() {
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("로그인이 필요합니다.");
      router.push("/login");
    } else {
      setUser(storedUser);
    }
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* Header */}
      <header
        style={{
          background: "#222",
          color: "#fff",
          padding: "1rem",
          display: "flex",
          justifyContent: "space-around",
          fontWeight: "bold",
        }}
      >
        <div>사냥터</div>
        <div>상점</div>
        <div>마을</div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, display: "flex" }}>
        {/* 왼쪽 한칸 */}
        <aside style={{ flex: 1, background: "#eee", padding: "1rem" }}>
          <Status />
        </aside>

        {/* 가운데 네칸 */}
        <section style={{ flex: 4, padding: "1rem" }}>중앙 게임 화면</section>

        {/* 오른쪽 한칸 */}
        <aside style={{ flex: 1, background: "#eee", padding: "1rem" }}>
          <Inventory />
        </aside>
      </main>

      {/* Footer */}
      <footer
        style={{
          background: "#222",
          height: "50px",
        }}
      ></footer>
    </div>
  );
}
