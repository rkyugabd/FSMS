import {
  AlertCircle,
  BarChart3,
  CheckCircle2,
  FileText,
} from "lucide-react";

type ReportsKpiCardsProps = {
  total: number;
  ready: number;
  scheduled: number;
  failed: number;
};

export function ReportsKpiCards({
  total,
  ready,
  scheduled,
  failed,
}: ReportsKpiCardsProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Total Reports
            </p>

            <p className="mt-2 text-2xl font-semibold tracking-tight text-[#172033]">
              {total}
            </p>

            <p className="mt-1 text-[11px] text-[#667085]">
              Available in reporting center
            </p>
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F2F4F7]">
            <FileText className="h-4 w-4 text-[#667085]" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Ready
            </p>

            <p className="mt-2 text-2xl font-semibold tracking-tight text-[#087443]">
              {ready}
            </p>

            <p className="mt-1 text-[11px] text-[#667085]">
              Reports ready to review
            </p>
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E8F8F1]">
            <CheckCircle2 className="h-4 w-4 text-[#12B76A]" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Scheduled
            </p>

            <p className="mt-2 text-2xl font-semibold tracking-tight text-[#6941C6]">
              {scheduled}
            </p>

            <p className="mt-1 text-[11px] text-[#667085]">
              Automated report schedules
            </p>
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F2EDFF]">
            <BarChart3 className="h-4 w-4 text-[#7F56D9]" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Failed
            </p>

            <p className="mt-2 text-2xl font-semibold tracking-tight text-[#B42318]">
              {failed}
            </p>

            <p className="mt-1 text-[11px] text-[#667085]">
              Reports requiring attention
            </p>
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FEF3F2]">
            <AlertCircle className="h-4 w-4 text-[#F04438]" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReportsKpiCards;