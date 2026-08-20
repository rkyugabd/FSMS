import {
  CalendarDays,
  Download,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";

type FlightsToolbarProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onCreate: () => void;
  onRefresh: () => void;
  onExport: () => void;
};

export function FlightsToolbar({
  searchQuery,
  onSearchChange,
  onCreate,
  onRefresh,
  onExport,
}: FlightsToolbarProps) {
  return (
    <section className="rounded-xl border border-[#E4E7EC] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* =====================================================
            TITLE
            ===================================================== */}

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#667085]">
            Flight Operations
          </p>

          <h2 className="mt-1 text-lg font-semibold text-[#172033]">
            Flight Management
          </h2>

          <p className="mt-0.5 text-xs text-[#667085]">
            Monitor and manage scheduled flight operations.
          </p>
        </div>

        {/* =====================================================
            ACTIONS
            ===================================================== */}

        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}

          <div className="relative min-w-[220px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A2B3]" />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) =>
                onSearchChange(event.target.value)
              }
              placeholder="Search flights..."
              aria-label="Search flights"
              className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white pl-9 pr-3 text-xs text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Date */}

          <button
            type="button"
            className="flex h-9 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs font-medium text-[#344054] transition hover:bg-[#F9FAFB] active:scale-[0.98]"
          >
            <CalendarDays className="h-3.5 w-3.5 text-[#667085]" />

            <span>Today</span>
          </button>

          {/* Refresh */}

          <button
            type="button"
            onClick={onRefresh}
            className="flex h-9 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white px-3 text-[#667085] transition hover:bg-[#F9FAFB] hover:text-[#172033] active:scale-[0.98]"
            aria-label="Refresh flights"
            title="Refresh flights"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>

          {/* Export */}

          <button
            type="button"
            onClick={onExport}
            className="flex h-9 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs font-medium text-[#344054] transition hover:bg-[#F9FAFB] active:scale-[0.98]"
          >
            <Download className="h-3.5 w-3.5 text-[#667085]" />

            <span>Export</span>
          </button>

          {/* Create */}

          <button
            type="button"
            onClick={onCreate}
            className="flex h-9 items-center gap-2 rounded-lg bg-[#1677FF] px-3.5 text-xs font-semibold text-white shadow-sm shadow-blue-900/20 transition hover:bg-[#1264D8] active:scale-[0.98]"
          >
            <Plus className="h-3.5 w-3.5 text-white" />

            <span className="text-white">
              New Flight
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}