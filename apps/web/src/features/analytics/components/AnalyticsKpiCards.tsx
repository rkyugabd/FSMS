import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
} from "lucide-react";

import type {
  AnalyticsKpi,
} from "../analyticsData";

type AnalyticsKpiCardsProps = {
  kpis: AnalyticsKpi[];
};

export function AnalyticsKpiCards({
  kpis,
}: AnalyticsKpiCardsProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const isPositive =
          kpi.trend === "up";

        const isNegative =
          kpi.trend === "down";

        return (
          <article
            key={kpi.id}
            className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD]"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                {kpi.label}
              </p>

              <div
                className={[
                  "flex h-6 items-center gap-0.5 rounded-md px-1.5 text-[10px] font-semibold",
                  isPositive
                    ? "bg-[#ECFDF3] text-[#087443]"
                    : "",
                  isNegative
                    ? "bg-[#FEF3F2] text-[#B42318]"
                    : "",
                  !isPositive &&
                  !isNegative
                    ? "bg-[#F2F4F7] text-[#667085]"
                    : "",
                ].join(" ")}
              >
                {isPositive && (
                  <ArrowUpRight className="h-3 w-3" />
                )}

                {isNegative && (
                  <ArrowDownRight className="h-3 w-3" />
                )}

                {!isPositive &&
                  !isNegative && (
                    <Minus className="h-3 w-3" />
                  )}

                {kpi.change}
              </div>
            </div>

            <p className="mt-3 text-2xl font-semibold tracking-tight text-[#172033]">
              {kpi.value}
            </p>

            <p className="mt-1 text-[10px] text-[#667085]">
              {kpi.description}
            </p>
          </article>
        );
      })}
    </section>
  );
}

export default AnalyticsKpiCards;