import {
  Bell,
  ChevronDown,
  HelpCircle,
  Search,
} from "lucide-react";

export function Topbar() {
  return (
    <header className="fixed right-0 top-0 z-30 flex h-[72px] items-center border-b border-[#E4E7EC] bg-white px-6 lg:left-[260px]">
      {/* Page Context */}
      <div className="min-w-0">
        <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#98A2B3]">
          Flight School Management System
        </div>

        <h1 className="mt-0.5 truncate text-[18px] font-semibold text-[#172033]">
          Command Center
        </h1>
      </div>

      {/* Right Side */}
      <div className="ml-auto flex items-center gap-2">
        {/* Search */}
        <button
          type="button"
          className="hidden h-9 items-center gap-2 rounded-lg border border-[#E4E7EC] bg-[#F5F7FA] px-3 text-[#667085] transition hover:border-[#D0D5DD] hover:bg-white md:flex"
        >
          <Search className="h-4 w-4" />

          <span className="text-xs">
            Search FSMS
          </span>

          <span className="ml-4 rounded border border-[#E4E7EC] bg-white px-1.5 py-0.5 text-[10px] text-[#98A2B3]">
            /
          </span>
        </button>

        {/* Help */}
        <button
          type="button"
          aria-label="Help"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F5F7FA] hover:text-[#172033]"
        >
          <HelpCircle className="h-[18px] w-[18px]" />
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F5F7FA] hover:text-[#172033]"
        >
          <Bell className="h-[18px] w-[18px]" />

          <span className="absolute right-[7px] top-[6px] h-1.5 w-1.5 rounded-full bg-[#F04438] ring-2 ring-white" />
        </button>

        <div className="mx-2 h-7 w-px bg-[#E4E7EC]" />

        {/* User */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-[#F5F7FA]"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF3FF] text-[11px] font-semibold text-[#1677FF]">
            AD
          </div>

          <div className="hidden text-left sm:block">
            <div className="text-xs font-semibold text-[#172033]">
              Alex Davis
            </div>

            <div className="text-[10px] text-[#98A2B3]">
              Operations
            </div>
          </div>

          <ChevronDown className="h-4 w-4 text-[#98A2B3]" />
        </button>
      </div>
    </header>
  );
}