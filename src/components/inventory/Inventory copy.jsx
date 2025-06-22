"use client";
import { useEffect, useState } from "react";

export default function Inventory() {
  const [money, setMoney] = useState(0);
  const [items, setItems] = useState([]);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    item: null,
  });

  useEffect(() => {
    const userId = localStorage.getItem("user");
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    const fetchInventory = async () => {
      try {
        const res = await fetch(`/api/inventory?id=${userId}`);
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg);
        }
        const data = await res.json();
        setMoney(data.money);
        setItems(data.inventory || []);
      } catch (err) {
        console.error("인벤토리 조회 오류:", err.message);
      }
    };

    fetchInventory();
  }, []);

  // 마우스가 카드 위에 있을 때만 전체 body에서 마우스 움직임을 감지하도록 설정
  useEffect(() => {
    function handleMouseMove(e) {
      setTooltip((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));
    }
    if (tooltip.visible) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [tooltip.visible]);

  return (
    <div className="p-4 rounded">
      <h2 className="font-bold text-lg mb-2">
        <span role="img" aria-label="money">
          💰
        </span>{" "}
        보유 금액: <span className="text-2xl">{money} G</span>
      </h2>
      <h3 className="font-bold text-lg mb-4">
        <span role="img" aria-label="bag">
          👜
        </span>{" "}
        인벤토리
      </h3>
      <div className="grid grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="relative aspect-square border-2 border-black rounded-lg flex flex-col items-center justify-center"
            onMouseEnter={(e) => {
              setTooltip({
                visible: true,
                x: e.clientX,
                y: e.clientY,
                item,
              });
            }}
            onMouseMove={(e) => {
              setTooltip((prev) => ({
                ...prev,
                x: e.clientX,
                y: e.clientY,
              }));
            }}
            onMouseLeave={() =>
              setTooltip((prev) => ({ ...prev, visible: false }))
            }
          >
            {item.itemImage && (
              <img
                src={item.itemImage}
                alt={item.itemName}
                className="w-12 h-12 mb-2 object-contain"
              />
            )}
            <div className="text-lg font-bold">
              {item.itemName || item.item}
            </div>
            <div className="mt-2 text-gray-700">{item.count} 개</div>
          </div>
        ))}
      </div>

      {/* 마우스 위치에 따라 나오는 툴팁 */}
      {tooltip.visible && tooltip.item && (
        <div
          className="fixed z-50 w-[100px] h-[100px] border-2 border-black rounded-lg shadow
    flex flex-col items-center justify-center
    text-red-600 text-xs font-bold text-center pointer-events-none"
          style={{
            left: tooltip.x - 110,
            top: tooltip.y + 10,
            backgroundColor: "rgba(255,255,255,1)",
          }}
        >
          <div>{tooltip.item.itemName}</div>
          <div>{tooltip.item.itemInfo}</div>
        </div>
      )}
    </div>
  );
}
