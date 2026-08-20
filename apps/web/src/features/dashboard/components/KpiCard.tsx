import type { LucideIcon } from "lucide-react";

type KpiCardProps = {
  label: string;
  value: string | number;
  detail: string;
  icon: LucideIcon;
  iconClassName?: string;
};

export function KpiCard({
  label,
  value,
  detail,
  icon: Icon,
  iconClassName = "bg-[#EAF3FF] text-[#1677FF]",
}: KpiCardProps) {
  return (
    <div className="rounded-xl border border-[#E4E7EC] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-[#667085]">
            {label}
          </p>

          <p className="mt-2 text-[28px] font-semibold tracking-tight text-[#172033]">
            {value}
          </p>

          <p className="mt-1 text-[11px] text-[#98A2B3]">
            {detail}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconClassName}`}
        >
          <Icon className="h-[19px] w-[19px]" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}