import { Plane } from "lucide-react";

type AircraftEmptyStateProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function AircraftEmptyState({
  title = "No aircraft found",
  description = "There are currently no aircraft matching your criteria.",
  actionLabel = "New Aircraft",
  onAction,
}: AircraftEmptyStateProps) {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center px-6 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F2F4F7]">
        <Plane className="h-5 w-5 text-[#98A2B3]" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-[#344054]">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-xs leading-5 text-[#667085]">
        {description}
      </p>

      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 h-9 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1264D8]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default AircraftEmptyState;