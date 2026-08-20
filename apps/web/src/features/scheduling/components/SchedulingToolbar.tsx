import {
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

export type SchedulingView =
  | "day"
  | "week"
  | "month";

type SchedulingToolbarProps = {
  activeView: SchedulingView;
  onViewChange: (
    view: SchedulingView,
  ) => void;
  onToday: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onCreate: () => void;
};

export function SchedulingToolbar({
  activeView,
  onViewChange,
  onToday,
  onPrevious,
  onNext,
  onCreate,
}: SchedulingToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#E4E7EC] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] xl:flex-row xl:items-center xl:justify-between">
      {/* =====================================================
          TITLE
          ===================================================== */}

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#667085]">
          Flight Operations
        </p>

        <h2 className="mt-1 text-lg font-semibold text-[#172033]">
          Scheduling
        </h2>
      </div>

      {/* =====================================================
          CONTROLS
          ===================================================== */}

      <div className="flex flex-wrap items-center gap-2">
        {/* Today */}

        <button
          type="button"
          onClick={onToday}
          className="h-9 rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs font-semibold text-[#344054] transition hover:bg-[#F9FAFB] active:scale-[0.98]"
        >
          Today
        </button>

        {/* Previous / Next */}

        <div className="flex overflow-hidden rounded-lg border border-[#D0D5DD] bg-white">
          <button
            type="button"
            onClick={onPrevious}
            className="flex h-9 w-9 items-center justify-center text-[#344054] transition hover:bg-[#F9FAFB] hover:text-[#172033] active:bg-[#F2F4F7]"
            aria-label="Previous date"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onNext}
            className="flex h-9 w-9 items-center justify-center border-l border-[#D0D5DD] text-[#344054] transition hover:bg-[#F9FAFB] hover:text-[#172033] active:bg-[#F2F4F7]"
            aria-label="Next date"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Divider */}

        <div className="mx-1 hidden h-6 w-px bg-[#E4E7EC] sm:block" />

        {/* ===================================================
            VIEW SWITCHER
            =================================================== */}

        <div className="flex overflow-hidden rounded-lg border border-[#D0D5DD] bg-white">
          {/* Day */}

          <button
            type="button"
            onClick={() =>
              onViewChange("day")
            }
            className={[
              "h-9 px-3 text-xs font-semibold transition",
              activeView === "day"
                ? "bg-[#172033] text-white"
                : "bg-white text-[#344054] hover:bg-[#F9FAFB]",
            ].join(" ")}
          >
            Day
          </button>

          {/* Week */}

          <button
            type="button"
            onClick={() =>
              onViewChange("week")
            }
            className={[
              "h-9 border-l border-[#D0D5DD] px-3 text-xs font-semibold transition",
              activeView === "week"
                ? "bg-[#172033] text-white"
                : "bg-white text-[#344054] hover:bg-[#F9FAFB]",
            ].join(" ")}
          >
            Week
          </button>

          {/* Month */}

          <button
            type="button"
            onClick={() =>
              onViewChange("month")
            }
            className={[
              "h-9 border-l border-[#D0D5DD] px-3 text-xs font-semibold transition",
              activeView === "month"
                ? "bg-[#172033] text-white"
                : "bg-white text-[#344054] hover:bg-[#F9FAFB]",
            ].join(" ")}
          >
            Month
          </button>
        </div>

        {/* ===================================================
            CREATE
            =================================================== */}

        <button
          type="button"
          onClick={onCreate}
          className="flex h-9 items-center gap-1.5 rounded-lg bg-[#1677FF] px-3 text-xs font-semibold text-white shadow-sm shadow-blue-900/20 transition hover:bg-[#1264D8] active:scale-[0.98]"
        >
          <Plus className="h-3.5 w-3.5 text-white" />

          <span className="text-white">
            New Schedule
          </span>
        </button>
      </div>
    </div>
  );
}