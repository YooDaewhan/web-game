"use client";
import { useEffect, useState } from "react";

const TAB_LIST = ["인벤토리", "장비", "기타"];
const TYPE_MAP = {
  인벤토리: "inventory",
  장비: "equipment",
  기타: "etc",
};

export default function Inventory() {
  const [money, setMoney] = useState(0);
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState("인벤토리");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("user");
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }
    const fetchInventory = async () => {
      try {
        const type = TYPE_MAP[activeTab];
        const res = await fetch(`/api/inventory?id=${userId}&type=${type}`);
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg);
        }
        const data = await res.json();
        setMoney(data.money);
        setItems(data.inventory || []);
      } catch (err) {
        console.error("인벤토리 조회 오류:", err.message);
        setItems([]);
      }
    };
    fetchInventory();
  }, [activeTab]);

  // 하단 표시할 아이템 (고정이 있으면 고정, 없으면 hover)
  const displayItem = selectedItem || hoveredItem;

  return (
    <div className="flex flex-col h-full">
      {/* 탭 버튼 */}
      <div className="flex mb-2 gap-2">
        {TAB_LIST.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-1 rounded ${
              activeTab === tab
                ? "bg-black text-white font-bold"
                : "bg-gray-200"
            }`}
            onClick={() => {
              setActiveTab(tab);
              setSelectedItem(null); // 탭 이동 시 선택 해제
              setHoveredItem(null);
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 상단: 아이템 그리드 */}
      <div className="flex-2 basis-2/3 overflow-auto border">
        <div className="border relative p-2 font-bold">
          {activeTab} (보유금: {money?.toLocaleString() ?? 0}원)
        </div>
        <div className="grid grid-cols-4 gap-[1px]">
          {items.length === 0 ? (
            <div className="col-span-4 text-center text-gray-500 py-8">
              아이템 없음
            </div>
          ) : (
            items.map((item, idx) => (
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
                {activeTab === "장비" ? (
                  <>
                    <div className="text-lg font-bold">
                      {item.itemName || item.item}
                    </div>
                    <div className="text-sm text-blue-600 mt-1">
                      공격력: {item.atk ?? "-"}
                    </div>
                    <div className="text-sm text-red-600">
                      방어력: {item.def ?? "-"}
                    </div>
                    {item.level && (
                      <div className="text-xs text-gray-700">
                        Lv.{item.level}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="text-lg font-bold">
                      {item.itemName || item.item}
                    </div>
                    <div className="mt-2 text-gray-700">{item.count} 개</div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      {/* 하단: 상세 정보 */}
      <div className="flex-1 basis-1/3 bg-gray-100 flex items-center justify-center border">
        {displayItem ? (
          <div className="text-center">
            <div className="text-2xl font-bold">{displayItem.itemName}</div>
            <div className="text-base mt-2">{displayItem.itemInfo}</div>
            {activeTab === "장비" && (
              <>
                <div className="mt-2 text-blue-600">
                  공격력: {displayItem.atk ?? "-"}
                </div>
                <div className="text-red-600">
                  방어력: {displayItem.def ?? "-"}
                </div>
                {displayItem.level && (
                  <div className="text-xs text-gray-700">
                    Lv.{displayItem.level}
                  </div>
                )}
                {/* 추가 장비 정보가 있으면 여기에 */}
              </>
            )}
            {activeTab !== "장비" && (
              <div className="mt-2 text-gray-700">{displayItem.count} 개</div>
            )}
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
