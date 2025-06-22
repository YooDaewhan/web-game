"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSectionStore } from "@/store/sectionStore"; // zustand import

export default function useUserData() {
  const [user, setUser] = useState("");
  const [status, setStatus] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // zustand 전역 상태 관리
  const currentSection = useSectionStore((state) => state.currentSection);
  const initializeSection = useSectionStore((state) => state.initializeSection);

  // 딱 한 번만 초기화 제어용 ref
  const didInitialize = useRef(false);

  // 1. 로그인 유저와 DB 데이터 불러오기
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }
    setUser(storedUser);

    Promise.all([
      fetch(`/api/status?id=${storedUser}`).then((r) =>
        r.ok ? r.json() : null
      ),
      fetch(`/api/inventory?id=${storedUser}`).then((r) =>
        r.ok ? r.json() : null
      ),
    ]).then(([statusData, inventoryData]) => {
      setStatus(statusData);
      setInventory(inventoryData);
      setLoading(false);

      if (!statusData && !inventoryData) {
        alert("유저 정보가 없습니다. 회원가입 페이지로 이동합니다.");
        router.push("/createuser");
      } else if (!statusData || !inventoryData) {
        alert("유저 정보가 누락되었습니다. 관리자에게 문의하세요.");
      }
    });
  }, [router]);

  // 2. DB(local) 값으로 zustand 상태를 '딱 한 번' 강제 초기화
  useEffect(() => {
    // status?.local이 존재하고, 아직 초기화하지 않았다면
    if (status?.local && !didInitialize.current) {
      initializeSection(status.local);
      didInitialize.current = true; // 다시 실행 안되게!
    }
  }, [status?.local, initializeSection]);

  // 3. currentSection이 바뀔 때마다 DB에도 저장!
  useEffect(() => {
    if (!user || !currentSection) return;
    fetch("/api/updateStatusLocal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user, local: currentSection }),
    }).catch((e) => {
      console.error("DB 위치 저장 실패", e);
    });
  }, [user, currentSection]);

  return { user, status, inventory, loading };
}
