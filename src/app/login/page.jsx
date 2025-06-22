"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, pw }),
      });

      if (res.status === 200) {
        const data = await res.json(); // ✅ JSON으로 받기
        localStorage.setItem("user", data.id); // ✅ 실제 id 저장
        router.push("/main/main");
      } else {
        const text = await res.text();
        setMessage("❌ 실패: " + text);
      }
    } catch (err) {
      setMessage("❌ 서버 오류 발생");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div style={{ padding: 20 }}>
        <h1 style={{ textAlign: "center" }}>로그인</h1>
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 300,
            gap: 10,
          }}
        >
          <input
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            required
          />
          <button type="submit">로그인</button>
          {message && <div style={{ marginTop: 10 }}>{message}</div>}
        </form>
      </div>
    </div>
  );
}
