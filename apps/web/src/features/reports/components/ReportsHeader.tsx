import {
  FileBarChart2,
  Plus,
  RefreshCw,
} from "lucide-react";

type ReportsHeaderProps = {
  onRefresh: () => void;
  onCreate: () => void;
};

export function ReportsHeader({
  onRefresh,
  onCreate,
}: ReportsHeaderProps) {
  return (
    <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2FF]">
            <FileBarChart2 className="h-4 w-4 text-[#1677FF]" />
          </div>

          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#344054]">
            Business Reporting
          </span>
        </div>

        <h1 className="text-[25px] font-semibold tracking-tight text-[#172033]">
          Reports
        </h1>

        <p className="mt-1 max-w-2xl text-sm text-[#475467]">
          Generate, manage and review operational,
          management and business reports.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onRefresh}
          className="flex h-9 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs font-medium text-[#344054] shadow-sm transition hover:bg-[#F9FAFB]"
        >
          <RefreshCw className="h-3.5 w-3.5 text-[#667085]" />

          Refresh
        </button>

        <button
          type="button"
          onClick={onCreate}
          className="flex h-9 items-center gap-2 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white shadow-sm shadow-blue-900/20 transition hover:bg-[#1264D8] active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />

          Generate Report
        </button>
      </div>
    </section>
  );
}

export default ReportsHeader;