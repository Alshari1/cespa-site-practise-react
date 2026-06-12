import { useAuth } from "../../contexts/AuthContext";

export default function DashboardHome() {
  const { user } = useAuth();
  const stats = [
    { label: "Notices",    value: "—", icon: "🔔" },
    { label: "Members",    value: "—", icon: "👥" },
    { label: "Alumni",     value: "—", icon: "🎓" },
    { label: "Pending",    value: "—", icon: "📬" },
  ];

  return (
    <div className="h-full overflow-y-auto p-6 font-['Jost']">
      <div className="max-w-4xl">
        <h2 className="font-['Cormorant_Garamond'] text-[#2b3232] text-3xl font-medium mb-1">
          Welcome back, {user?.displayName?.split(" ")[0] || "Admin"}
        </h2>
        <p className="text-xs text-[#9aabab] tracking-wide mb-8">
          Select a section from the sidebar to manage records.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-sm p-5 border border-[#e8e2d9]">
              <div className="text-xl mb-2">{s.icon}</div>
              <div className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#2b3232]">{s.value}</div>
              <div className="text-[10px] tracking-[0.16em] uppercase text-[#9aabab] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white rounded-sm border border-[#e8e2d9] p-5">
          <p className="text-[9px] font-medium tracking-[0.2em] uppercase text-[#a0724a] mb-3">Quick tip</p>
          <p className="text-xs text-[#4a5555] leading-relaxed">
            Use the sidebar to navigate between sections. Each section lets you search, add, edit and delete records.
            Membership requests can be approved or rejected directly from the Membership section.
          </p>
        </div>
      </div>
    </div>
  );
}
