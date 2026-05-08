import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 20px",
        background: "#020617",
        borderBottom: "1px solid #1e293b"
      }}
    >
      {/* LEFT */}
      <h2 style={{ color: "white" }}>Elari</h2>

      {/* RIGHT */}
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ color: "#94a3b8" }}>{user.email}</span>

          <button
            onClick={handleLogout}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "none",
              background: "#ef4444",
              color: "white",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;