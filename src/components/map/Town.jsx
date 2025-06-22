import { useSectionStore } from "@/store/sectionStore";

export default function Town() {
  const setSection = useSectionStore((state) => state.setSection);
  return (
    <div>
      <h2>마을 화면입니다.</h2>
      <button onClick={() => setSection("Hunting")}>사냥터 이동</button>
      <button onClick={() => setSection("Shop")}>상점으로 이동</button>
    </div>
  );
}
