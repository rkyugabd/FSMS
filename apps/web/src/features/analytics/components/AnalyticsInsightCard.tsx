import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Info,
} from "lucide-react";

import type {
  AnalyticsInsight,
} from "../analyticsData";

type AnalyticsInsightCardProps = {
  insights: AnalyticsInsight[];
};

export function AnalyticsInsightCard({
  insights,
}: AnalyticsInsightCardProps) {
  return (
    <section className="rounded-xl border border-[#E4E7EC] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#172033]">
            AI Operational Insights
          </h3>

          <p className="mt-0.5 text-[10px] text-[#98A2B3]">
            Key observations generated from current business data
          </p>
        </div>

        <span className="rounded-full bg-[#EAF2FF] px-2.5 py-1 text-[9px] font-semibold text-[#1355B5]">
          AI ANALYSIS
        </span>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {insights.map((insight) => {
          const isWarning =
            insight.type ===
            "warning";

          const isPositive =
            insight.type ===
            "positive";

          return (
            <article
              key={insight.id}
              className={[
                "rounded-xl border p-4",
                isWarning
                  ? "border-[#FEDF89] bg-[#FFFCF5]"
                  : "",
                isPositive
                  ? "border-[#ABEFC6] bg-[#F6FEF9]"
                  : "",
                !isWarning &&
                !isPositive
                  ? "border-[#B2DDFF] bg-[#F5FAFF]"
                  : "",
              ].join(" ")}
            >
              <div className="flex items-start gap-3">
                <div
                  className={[
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    isWarning
                      ? "bg-[#FEF0C7]"
                      : "",
                    isPositive
                      ? "bg-[#D1FADF]"
                      : "",
                    !isWarning &&
                    !isPositive
                      ? "bg-[#D1E9FF]"
                      : "",
                  ].join(" ")}
                >
                  {isWarning && (
                    <AlertTriangle className="h-4 w-4 text-[#B54708]" />
                  )}

                  {isPositive && (
                    <CheckCircle2 className="h-4 w-4 text-[#087443]" />
                  )}

                  {!isWarning &&
                    !isPositive && (
                      <Info className="h-4 w-4 text-[#175CD3]" />
                    )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h4 className="text-xs font-semibold text-[#172033]">
                      {insight.title}
                    </h4>

                    {insight.metric && (
                      <span
                        className={[
                          "rounded-md px-2 py-1 text-[9px] font-bold",
                          isWarning
                            ? "bg-[#FEF0C7] text-[#B54708]"
                            : "",
                          isPositive
                            ? "bg-[#D1FADF] text-[#087443]"
                            : "",
                          !isWarning &&
                          !isPositive
                            ? "bg-[#D1E9FF] text-[#175CD3]"
                            : "",
                        ].join(" ")}
                      >
                        {insight.metric}
                      </span>
                    )}
                  </div>

                  <p className="mt-1.5 text-[10px] leading-5 text-[#667085]">
                    {insight.description}
                  </p>

                  {insight.actionLabel && (
                    <button
                      type="button"
                      className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold text-[#1677FF] transition hover:text-[#1264D8]"
                    >
                      {insight.actionLabel}

                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default AnalyticsInsightCard;