import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();

  return (
    <div
      style={{
        width: "220px",
        background: "#020617",
        padding: "20px",
        borderRight: "1px solid #1e293b"
      }}
    >
      <h3 style={{ color: "white", marginBottom: "20px" }}>Menu</h3>

      <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        {/* COMMON */}
        <Link to="/" style={{ color: "#cbd5f5", textDecoration: "none" }}>
          Home
        </Link>

        {/* CREATOR ONLY */}
        {user?.role === "creator" && (
          <Link
            to="/creator"
            style={{ color: "#cbd5f5", textDecoration: "none" }}
          >
            Creator Dashboard
          </Link>
        )}

      </nav>
    </div>
  );
}

export default Sidebar;