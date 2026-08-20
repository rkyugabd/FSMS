import {
  CalendarDays,
  Plus,
} from "lucide-react";

type SchedulingEmptyStateProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onCreate?: () => void;
};

export function SchedulingEmptyState({
  title = "No schedules found",
  description = "There are no scheduled flights, simulator sessions or training activities for the selected criteria.",
  actionLabel = "New Schedule",
  onCreate,
}: SchedulingEmptyStateProps) {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center bg-white px-6 py-12">
      <div className="flex max-w-md flex-col items-center text-center">
        {/* Icon */}

        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D9E5F7] bg-[#EAF2FF]">
          <CalendarDays className="h-5 w-5 text-[#1677FF]" />
        </div>

        {/* Title */}

        <h3 className="mt-4 text-sm font-semibold text-[#172033]">
          {title}
        </h3>

        {/* Description */}

        <p className="mt-1.5 text-xs leading-5 text-[#667085]">
          {description}
        </p>

        {/* Action */}

        {onCreate && (
          <button
            type="button"
            onClick={onCreate}
            className="mt-5 flex h-9 items-center gap-1.5 rounded-lg bg-[#1677FF] px-3.5 text-xs font-semibold text-white shadow-sm shadow-blue-900/20 transition hover:bg-[#1264D8] active:scale-[0.98]"
          >
            <Plus className="h-3.5 w-3.5 text-white" />

            <span className="text-white">
              {actionLabel}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}