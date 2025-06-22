// components/StatusInfo.jsx

export default function StatusInfo({ status, showMore, setShowMore }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "2px 32px 10px 32px",
        borderBottom: "1px solid #eee",
        border: "1px solid #222",
      }}
    >
      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 10 }}>
        {status.name}{" "}
        <span style={{ fontSize: 15, color: "#888" }}>Lv.{status.level}</span>
      </div>
      <div style={{ display: "flex", gap: 24, marginBottom: 8 }}>
        <span>
          HP: <strong>{status.hp}</strong>
        </span>
        <span>
          MP: <strong>{status.mp}</strong>
        </span>
      </div>
      <button
        onClick={() => setShowMore((prev) => !prev)}
        style={{
          width: 100,
          marginTop: 8,
          background: "#fff",
          border: "1px solid #bbb",
          borderRadius: 8,
          cursor: "pointer",
          color: "#333",
          fontWeight: 500,
          fontSize: 15,
          alignSelf: "flex-start",
          transition: "background 0.2s",
        }}
      >
        {showMore ? "간략히" : "더보기"}
      </button>
      {showMore && (
        <div
          style={{
            marginTop: 10,
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(110px, 1fr))",
            background: "#fff",
            border: "1px solid #e3e3e3",
            borderRadius: 10,
            padding: 6,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <span>
            공격력: <strong>{status.atk}</strong>
          </span>
          <span>
            방어력: <strong>{status.def}</strong>
          </span>
          <span>
            방어막: <strong>{status.shield}</strong>
          </span>
          <span>
            방어관통: <strong>{status.defPen}</strong>
          </span>
          <span>
            공격속도: <strong>{status.atkSpd}</strong>
          </span>
          <span>
            치명확률: <strong>{status.critRate}%</strong>
          </span>
          <span>
            치명효율: <strong>{status.critDmg}%</strong>
          </span>
          <span>
            근력: <strong>{status.str}</strong>
          </span>
          <span>
            손재주: <strong>{status.dex}</strong>
          </span>
          <span>
            지능: <strong>{status.int}</strong>
          </span>
          <span>
            행운: <strong>{status.luk}</strong>
          </span>
        </div>
      )}
    </div>
  );
}
