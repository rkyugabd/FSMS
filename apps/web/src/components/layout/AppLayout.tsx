import { Outlet } from "react-router-dom";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Sidebar />

      <Topbar />

      <main className="min-h-screen pt-[72px] lg:ml-[260px]">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}