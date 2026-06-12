import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import TopHeader from "./TopHeader";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f0ede8] font-['Jost']">
      {/* Side Navigation */}
      <SideNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <TopHeader />

        {/* Dynamic Nested Route Content */}
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
