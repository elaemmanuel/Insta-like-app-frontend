

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const linkClasses = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      location.pathname === path
        ? "bg-zinc-800 text-white"
        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
    }`;

  return (
    <aside className="sticky top-0 h-screen bg-black border-r border-zinc-800 px-4 py-6 flex flex-col">
      
      {/* LOGO */}
      {/* <div className="mb-10 px-2">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Elari
        </h2>

        <p className="text-sm text-zinc-500 mt-1">
          Scalable Media Platform
        </p>
      </div> */}

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-2">
        
        {/* HOME */}
        <Link to="/" className={linkClasses("/")}>
          <span className="text-xl">🏠</span>
          <span className="font-medium">Home</span>
        </Link>

        {/* CREATOR */}
        {user?.role === "creator" && (
          <Link
            to="/creator"
            className={linkClasses("/creator")}
          >
            <span className="text-xl">⬆️</span>
            <span className="font-medium">
              Creator Studio
            </span>
          </Link>
        )}
      </nav>

      {/* BOTTOM SECTION */}
      <div className="mt-auto">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          
          <p className="text-sm text-zinc-400 mb-2">
            Connected as
          </p>

          <p className="text-white text-sm font-medium break-all">
            {user?.email}
          </p>

          <div className="mt-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>

            <span className="text-xs text-zinc-500">
              Azure Cloud Connected
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;