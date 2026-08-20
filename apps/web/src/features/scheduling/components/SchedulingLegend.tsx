import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Plane,
  RotateCcw,
  Settings2,
  Sparkles,
} from "lucide-react";

type LegendItemProps = {
  label: string;
  color: string;
  background: string;
  border?: string;
};

function LegendItem({
  label,
  color,
  background,
  border,
}: LegendItemProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="h-2.5 w-2.5 shrink-0 rounded-full"
        style={{
          backgroundColor: color,
        }}
      />

      <span
        className="text-[10px] font-medium"
        style={{
          color: "#344054",
        }}
      >
        {label}
      </span>

      <span
        className="hidden h-3.5 rounded border px-1 text-[8px] font-medium sm:inline-flex sm:items-center"
        style={{
          backgroundColor: background,
          borderColor:
            border ?? color,
          color,
        }}
      >
        {label}
      </span>
    </div>
  );
}

export function SchedulingLegend() {
  return (
    <section className="rounded-xl border border-[#E4E7EC] bg-white px-4 py-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        {/* =====================================================
            TITLE
            ===================================================== */}

        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F9FAFB]">
            <Sparkles className="h-3.5 w-3.5 text-[#667085]" />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
              Schedule Legend
            </p>

            <p className="text-[11px] font-medium text-[#344054]">
              Flight operations status
            </p>
          </div>
        </div>

        {/* =====================================================
            EVENT TYPES
            ===================================================== */}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <LegendItem
            label="Flight"
            color="#1677FF"
            background="#EAF2FF"
            border="#1677FF"
          />

          <LegendItem
            label="Simulator"
            color="#7F56D9"
            background="#F2EDFF"
            border="#7F56D9"
          />

          <LegendItem
            label="Training"
            color="#12B76A"
            background="#E8F8F1"
            border="#12B76A"
          />

          <LegendItem
            label="Maintenance"
            color="#F79009"
            background="#FFF4E5"
            border="#F79009"
          />
        </div>

        {/* =====================================================
            STATUS
            ===================================================== */}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#F2F4F7] pt-3 xl:border-l xl:border-t-0 xl:pl-4 xl:pt-0">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#12B76A]" />

            <span className="text-[10px] font-medium text-[#344054]">
              Confirmed
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5 text-[#F79009]" />

            <span className="text-[10px] font-medium text-[#344054]">
              Delayed
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5 text-[#F04438]" />

            <span className="text-[10px] font-medium text-[#344054]">
              Conflict
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <RotateCcw className="h-3.5 w-3.5 text-[#98A2B3]" />

            <span className="text-[10px] font-medium text-[#344054]">
              Completed
            </span>
          </div>
        </div>
      </div>

      {/* =======================================================
          OPERATIONAL NOTE
          ======================================================= */}

      <div className="mt-3 flex items-center gap-2 border-t border-[#F2F4F7] pt-3">
        <Plane className="h-3.5 w-3.5 text-[#98A2B3]" />

        <span className="text-[9px] text-[#667085]">
          Schedule colors identify operational activity;
          status indicators identify the current booking state.
        </span>

        <Settings2 className="ml-auto hidden h-3.5 w-3.5 text-[#98A2B3] sm:block" />
      </div>
    </section>
  );
}