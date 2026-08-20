import {
  Plane,
  Plus,
} from "lucide-react";

type FlightsEmptyStateProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function FlightsEmptyState({
  title = "No flights found",
  description = "There are no flights matching the current filters.",
  actionLabel = "New Flight",
  onAction,
}: FlightsEmptyStateProps) {
  return (
    <div className="flex min-h-[360px] w-full items-center justify-center rounded-xl border border-[#E4E7EC] bg-white px-6 py-12">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2FF]">
          <Plane className="h-5 w-5 text-[#1677FF]" />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-[#172033]">
          {title}
        </h3>

        <p className="mt-1.5 max-w-sm text-xs leading-5 text-[#667085]">
          {description}
        </p>

        {onAction && (
          <button
            type="button"
            onClick={onAction}
            className="mt-5 flex h-9 items-center gap-1.5 rounded-lg bg-[#1677FF] px-3.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1264D8] active:scale-[0.98]"
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