import {
  BarChart3,
  RefreshCw,
} from "lucide-react";

type AnalyticsEmptyStateProps = {
  onRefresh: () => void;
};

export function AnalyticsEmptyState({
  onRefresh,
}: AnalyticsEmptyStateProps) {
  return (
    <section className="rounded-xl border border-[#E4E7EC] bg-white px-6 py-16 text-center shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F2F4F7]">
        <BarChart3 className="h-5 w-5 text-[#98A2B3]" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-[#344054]">
        No analytics data available
      </h3>

      <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-[#667085]">
        There is currently no business data available
        for the selected analytics filters.
      </p>

      <button
        type="button"
        onClick={onRefresh}
        className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white transition hover:bg-[#1264D8]"
      >
        <RefreshCw className="h-3.5 w-3.5" />

        Refresh Data
      </button>
    </section>
  );
}

export default AnalyticsEmptyState;