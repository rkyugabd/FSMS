import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Info,
  type LucideIcon,
} from "lucide-react";

import type {
  AICopilotInsight,
  AICopilotInsightSeverity,
} from "../aiCopilotData";

type AICopilotInsightCardProps = {
  insight: AICopilotInsight;
  icon?: LucideIcon;
};

const STYLES: Record<
  AICopilotInsightSeverity,
  {
    background: string;
    border: string;
    icon: string;
    text: string;
    metric: string;
  }
> = {
  info: {
    background: "bg-[#F5F8FF]",
    border: "border-[#D9E5FF]",
    icon: "text-[#1677FF]",
    text: "text-[#344054]",
    metric: "text-[#1355B5]",
  },

  success: {
    background: "bg-[#F3FBF7]",
    border: "border-[#C7EAD8]",
    icon: "text-[#12B76A]",
    text: "text-[#344054]",
    metric: "text-[#087443]",
  },

  warning: {
    background: "bg-[#FFFCF5]",
    border: "border-[#FDE3A7]",
    icon: "text-[#F79009]",
    text: "text-[#344054]",
    metric: "text-[#B54708]",
  },

  critical: {
    background: "bg-[#FFF8F7]",
    border: "border-[#FECACA]",
    icon: "text-[#F04438]",
    text: "text-[#344054]",
    metric: "text-[#B42318]",
  },
};

export function AICopilotInsightCard({
  insight,
  icon,
}: AICopilotInsightCardProps) {
  const style =
    STYLES[insight.severity];

  const Icon =
    icon ??
    (insight.severity ===
    "success"
      ? CheckCircle2
      : insight.severity ===
          "warning" ||
        insight.severity ===
          "critical"
        ? AlertCircle
        : Info);

  return (
    <div
      className={[
        "rounded-xl border p-3",
        style.background,
        style.border,
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div
          className={[
            "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white",
            style.icon,
          ].join(" ")}
        >
          <Icon className="h-3.5 w-3.5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p
                className={[
                  "text-[10px] font-semibold",
                  style.text,
                ].join(" ")}
              >
                {insight.title}
              </p>

              <p className="mt-1 text-[9px] leading-4 text-[#667085]">
                {insight.description}
              </p>
            </div>

            {insight.metric && (
              <div className="shrink-0 text-right">
                <p
                  className={[
                    "text-base font-semibold",
                    style.metric,
                  ].join(" ")}
                >
                  {insight.metric}
                </p>

                {insight.metricLabel && (
                  <p className="text-[8px] text-[#98A2B3]">
                    {insight.metricLabel}
                  </p>
                )}
              </div>
            )}
          </div>

          {insight.actionLabel && (
            <button
              type="button"
              className={[
                "mt-2 inline-flex items-center gap-1 text-[9px] font-semibold",
                style.metric,
              ].join(" ")}
            >
              {insight.actionLabel}

              <ChevronRight className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AICopilotInsightCard;