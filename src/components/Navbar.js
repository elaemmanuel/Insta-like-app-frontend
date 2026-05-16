





import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const username =
    user?.email?.split("@")[0] || "User";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-black shadow-lg">
            E
          </div>

          <div>
            <h1 className="text-white text-xl font-bold tracking-tight">
              Elari
            </h1>

            <p className="text-xs text-zinc-400 -mt-1">
              Cloud Native Media Platform
            </p>
          </div>
        </div>

        {/* RIGHT */}
        {user && (
          <div className="flex items-center gap-4">
            
            {/* USER */}
            <div className="hidden md:flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-full">
              
              {/* AVATAR */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-fuchsia-500 to-orange-400 flex items-center justify-center text-sm font-bold">
                {username.charAt(0).toUpperCase()}
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-white font-medium leading-none">
                  {username}
                </span>

                <span className="text-xs text-zinc-400">
                  {user.role}
                </span>
              </div>
            </div>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 transition-all duration-200 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-lg"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;