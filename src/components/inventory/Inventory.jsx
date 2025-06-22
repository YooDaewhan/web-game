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

  const [hoveredItem, setHoveredItem] = useState(null); // 오버 상태
  const [selectedItem, setSelectedItem] = useState(null); // 클릭 고정 상태

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

  // 하단 표시할 아이템 (고정이 있으면 고정, 없으면 hover)
  const displayItem = selectedItem || hoveredItem;

  return (
    <div className="flex flex-col h-full">
      {/* 상단: 카드 그리드 (2/3) */}
      <div className="flex-2 basis-2/3 overflow-auto border">
        <div className="border relative">
          <span className="">인벤토리</span>
        </div>
        <div className="border relative">
          <span className="">인벤토리</span>
        </div>
        <div className="grid grid-cols-4 gap-[1px]">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="relative aspect-square border-1 border-black rounded-lg flex flex-col items-center justify-center cursor-pointer"
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() =>
                setSelectedItem(selectedItem === item ? null : item)
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
        {/* 툴팁 (생략: 기존 그대로) */}
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
      {/* 하단: 추가 내용 (1/3) */}
      <div className="flex-1 basis-1/3 bg-gray-100 flex items-center justify-center border">
        {displayItem ? (
          <div className="text-center">
            <div className="text-2xl font-bold">{displayItem.itemName}</div>
            <div className="text-base mt-2">{displayItem.itemInfo}</div>
          </div>
        ) : (
          <span className="text-xl text-gray-600">
            여기가 하단 1/3 구역입니다.
          </span>
        )}
      </div>
    </div>
  );
}
