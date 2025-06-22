import { useSectionStore } from "@/store/sectionStore";

export default function Hunting() {
  const setSection = useSectionStore((state) => state.setSection);
  return (
    <div>
      <h2>사냥터 화면입니다.</h2>
      <button onClick={() => setSection("Shop")}>상점으로 이동</button>
      <button onClick={() => setSection("Town")}>마을로 이동</button>
    </div>
  );
}
