export default function Footer() {
  return (
    <footer
      style={{
        background: "#222",
        height: "50px",
        display: "flex",
        alignItems: "center",
        paddingLeft: "1rem",
      }}
    >
      <button
        style={{
          background: "#ff5252",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "0.5rem 1rem",
          cursor: "pointer",
          fontWeight: "bold",
        }}
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
      >
        로그아웃
      </button>
    </footer>
  );
}
