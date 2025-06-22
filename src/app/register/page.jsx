"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter(); // ⬅️ 반드시 컴포넌트 안에서 호출
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, pw }),
      });

      if (res.status === 201) {
        setMessage("✅ 회원가입 성공!");
        router.push("/"); // 홈으로 이동
        setId("");
        setPw("");
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
        <h1 style={{ textAlign: "center" }}>회원가입</h1>
        <form
          onSubmit={handleSubmit}
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
          <button type="submit">회원가입</button>
          {message && <div style={{ marginTop: 10 }}>{message}</div>}
        </form>
      </div>
    </div>
  );
}
