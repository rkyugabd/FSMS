import {
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { aiInsights } from "../dashboardData";

export function AIInsights() {
  return (
    <div className="rounded-xl border border-cyan-100 bg-gradient-to-br from-white to-cyan-50/50 p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-700">
          <Sparkles className="h-[18px] w-[18px]" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#172033]">
            AI Operational Insights
          </h3>

          <p className="mt-1 text-[11px] text-[#667085]">
            Automated observations from operational data
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {aiInsights.map((insight) => (
          <div
            key={insight.title}
            className="rounded-lg border border-cyan-100 bg-white/80 p-3"
          >
            <p className="text-xs font-semibold text-[#344054]">
              {insight.title}
            </p>

            <p className="mt-1 text-[11px] leading-5 text-[#667085]">
              {insight.description}
            </p>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-4 flex items-center gap-1 text-[11px] font-semibold text-cyan-700 hover:text-cyan-800"
      >
        Open AI Copilot
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}