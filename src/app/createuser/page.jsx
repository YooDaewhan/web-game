"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateUserPage() {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [sex, setSex] = useState("남");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // localStorage에서 user id 가져오기
    const storedId = localStorage.getItem("user");
    if (!storedId) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }
    setUserId(storedId);
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !birth || !sex) {
      setError("모든 값을 입력하세요.");
      return;
    }

    try {
      const res = await fetch("/api/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId, // ✅ id도 함께 전송
          name,
          birth,
          sex,
        }),
      });
      if (res.status === 200) {
        alert("회원가입이 완료되었습니다!");
        router.push("/main/main");
      } else {
        const text = await res.text();
        setError("오류: " + text);
      }
    } catch (err) {
      setError("서버 오류");
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "3rem auto",
        padding: 32,
        background: "#fafafa",
        borderRadius: 12,
        boxShadow: "0 4px 20px #0001",
      }}
    >
      <h2 style={{ marginBottom: 24 }}>회원가입</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <label>
          이름
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </label>
        <label>
          생년월일
          <input
            type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </label>
        <label>
          성별
          <select
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          >
            <option value="남">남</option>
            <option value="여">여</option>
          </select>
        </label>
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        <button
          type="submit"
          style={{
            background: "#222",
            color: "#fff",
            padding: 12,
            border: "none",
            borderRadius: 6,
            fontWeight: "bold",
          }}
        >
          가입하기
        </button>
      </form>
    </div>
  );
}
