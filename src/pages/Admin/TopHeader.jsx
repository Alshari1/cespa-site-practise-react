import { useAuth } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";

export default function TopHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-[#e8e2d9] px-6 py-3 flex items-center justify-between shrink-0 font-['Jost']">
      {/* Left: page context */}
      <div>
        <p className="text-[9px] font-medium tracking-[0.22em] uppercase text-[#a0724a]">
          Admin Panel
        </p>
        <p className="font-['Cormorant_Garamond'] text-[#2b3232] text-lg font-medium leading-tight">
          Dashboard
        </p>
      </div>

      {/* Right: admin info */}
      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <button className="relative w-8 h-8 flex items-center justify-center text-[#9aabab] hover:text-[#2b3232] transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#a0724a] rounded-full" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-[#e8e2d9]" />

        {/* Admin info */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-medium text-[#2b3232] leading-tight">
              {user?.displayName || "Admin"}
            </p>
            <p className="text-[10px] text-[#9aabab] leading-tight">
              {user?.email || "admin@cespa.org"}
            </p>
          </div>
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="admin"
              className="w-8 h-8 rounded-full object-cover border-2 border-[#e8e2d9]"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#3d5454] flex items-center justify-center">
              <span className="font-['Cormorant_Garamond'] text-sm font-semibold text-[#e8e2d9]">
                {user?.displayName?.charAt(0) || "A"}
              </span>
            </div>
          )}
          <button
            onClick={handleSignOut}
            className="hidden sm:flex items-center gap-1.5 text-[10px] tracking-[0.14em] uppercase text-[#9aabab] hover:text-[#a0724a] transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
