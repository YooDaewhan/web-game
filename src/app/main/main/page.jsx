"use client";
import useUserData from "@/hooks/useUserData";
import Status from "@/components/status/Status";
import Inventory from "@/components/inventory/Inventory";
import { Hunting, Shop, Town } from "@/components/map";
import { Header, Footer } from "@/components/layout";
import { useSectionStore } from "@/store/sectionStore";

export default function MainPage() {
  const { user, status, inventory, loading } = useUserData();
  const currentSection = useSectionStore((state) => state.currentSection);

  if (loading) return <div>로딩 중...</div>;

  const centerComponentMap = {
    Hunting: <Hunting />,
    Shop: <Shop />,
    Town: <Town />,
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />

      <main style={{ flex: 1, display: "flex" }}>
        <aside style={{ flex: 1, background: "#eee", padding: "1rem" }}>
          <Status status={status} />
        </aside>
        <section style={{ flex: 4, padding: "1rem" }}>
          {centerComponentMap[currentSection] || (
            <div>존재하지 않는 화면입니다.</div>
          )}
        </section>
        <aside style={{ flex: 1, background: "#eee", padding: "1rem" }}>
          <Inventory inventory={inventory} />
        </aside>
      </main>

      <Footer />
    </div>
  );
}
