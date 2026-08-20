import {
  BarChart3,
  RefreshCw,
} from "lucide-react";

type AnalyticsHeaderProps = {
  onRefresh: () => void;
};

export function AnalyticsHeader({
  onRefresh,
}: AnalyticsHeaderProps) {
  return (
    <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2FF]">
            <BarChart3 className="h-4 w-4 text-[#1677FF]" />
          </div>

          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#344054]">
            Business Intelligence
          </span>
        </div>

        <h1 className="text-[25px] font-semibold tracking-tight text-[#172033]">
          BI & Analytics
        </h1>

        <p className="mt-1 max-w-2xl text-sm text-[#475467]">
          Monitor operational performance,
          financial health, fleet utilization,
          training progress and business trends.
        </p>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        className="flex h-9 w-fit items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs font-medium text-[#344054] shadow-sm transition hover:bg-[#F9FAFB]"
      >
        <RefreshCw className="h-3.5 w-3.5 text-[#667085]" />

        Refresh Analytics
      </button>
    </section>
  );
}

export default AnalyticsHeader;