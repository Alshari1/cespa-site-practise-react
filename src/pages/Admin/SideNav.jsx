import { NavLink } from "react-router-dom";
import { SECTIONS } from "./adminSections";

const iconMap = {
  bell: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  users: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  building: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="9" y1="22" x2="9" y2="16" />
      <line x1="15" y1="22" x2="15" y2="16" />
      <line x1="9" y1="16" x2="15" y2="16" />
      <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M12 6h.01M12 10h.01" />
    </svg>
  ),
  graduation: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  ),
  edit: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  gift: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  ),
};

export default function SideNav({ sidebarOpen, setSidebarOpen }) {
  return (
    <aside className={`
      flex flex-col bg-[#2b3232] border-r border-white/5
      transition-all duration-300 ease-in-out shrink-0
      ${sidebarOpen ? "w-56" : "w-14"}
    `}>
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/8 ${!sidebarOpen && "justify-center"}`}>
        <div className="w-7 h-7 bg-[#a0724a] rounded-sm flex items-center justify-center shrink-0">
          <span className="font-['Cormorant_Garamond'] text-sm font-bold text-white">C</span>
        </div>
        {sidebarOpen && (
          <span className="font-['Cormorant_Garamond'] text-[#e8e2d9] text-lg font-semibold tracking-wide">
            CESPA
          </span>
        )}
      </div>

      {/* Nav label */}
      {sidebarOpen && (
        <p className="px-4 pt-5 pb-2 text-[9px] font-medium tracking-[0.22em] uppercase text-[#9aabab]">
          Sections
        </p>
      )}

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-2 pb-4 space-y-0.5">
        {SECTIONS.map((s) => (
          <NavLink
            key={s.key}
            to={`/admin/${s.key}`}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-medium
              tracking-wide transition-colors duration-150 group text-cream1
              ${isActive
                ? "bg-[#a0724a]/20 "
                : " hover:bg-white/5 hover:text-[#e8e2d9]"
              }
              ${!sidebarOpen && "justify-center"}
            `}
            title={!sidebarOpen ? s.label : undefined}
          >
            <span className="shrink-0 flex items-center justify-center text-cream1">
              {iconMap[s.icon] || s.icon}
            </span>
            {sidebarOpen && <span>{s.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="m-3 flex items-center justify-center gap-2 py-2 border border-white/10 rounded-sm text-[#9aabab] hover:text-[#e8e2d9] hover:border-white/20 transition-colors text-xs"
        title={sidebarOpen ? "Collapse" : "Expand"}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {sidebarOpen
            ? <><path d="M15 18l-6-6 6-6"/></>
            : <><path d="M9 18l6-6-6-6"/></>
          }
        </svg>
        {sidebarOpen && <span className="text-[10px] tracking-wide">Collapse</span>}
      </button>
    </aside>
  );
}
