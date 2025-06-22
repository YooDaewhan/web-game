import { useSectionStore } from "@/store/sectionStore";

export default function Shop() {
  const setSection = useSectionStore((state) => state.setSection);
  return (
    <div>
      <h2>상점 화면입니다.</h2>
      <button onClick={() => setSection("Hunting")}>사냥터로 이동</button>
      <button onClick={() => setSection("Town")}>마을로 이동</button>
    </div>
  );
}
