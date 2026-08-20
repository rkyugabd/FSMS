import {
  AlertCircle,
  CheckCircle2,
  Info,
  Sparkles,
  UserRound,
} from "lucide-react";

import type {
  AICopilotInsightSeverity,
  AICopilotMessage,
} from "../aiCopilotData";

import { AICopilotInsightCard } from "./AICopilotInsightCard";

type AICopilotMessageProps = {
  message: AICopilotMessage;
};

const severityIcons: Record<
  AICopilotInsightSeverity,
  typeof Info
> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  critical: AlertCircle,
};

export function AICopilotMessage({
  message,
}: AICopilotMessageProps) {
  const isUser =
    message.role === "user";

  return (
    <div
      className={[
        "flex gap-3",
        isUser
          ? "justify-end"
          : "justify-start",
      ].join(" ")}
    >
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#172033]">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
      )}

      <div
        className={[
          "max-w-[82%]",
          isUser ? "items-end" : "items-start",
        ].join(" ")}
      >
        <div
          className={[
            "rounded-2xl px-4 py-3",
            isUser
              ? "rounded-tr-md bg-[#1677FF] text-white"
              : "rounded-tl-md border border-[#E4E7EC] bg-white text-[#344054]",
          ].join(" ")}
        >
          <p className="whitespace-pre-wrap text-xs leading-5">
            {message.content}
          </p>
        </div>

        {message.insights &&
          message.insights.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.insights.map(
                (insight) => {
                  const Icon =
                    severityIcons[
                      insight.severity
                    ];

                  return (
                    <AICopilotInsightCard
                      key={insight.id}
                      insight={insight}
                      icon={Icon}
                    />
                  );
                },
              )}
            </div>
          )}

        <div
          className={[
            "mt-1.5 flex items-center gap-1 text-[8px] text-[#98A2B3]",
            isUser
              ? "justify-end"
              : "justify-start",
          ].join(" ")}
        >
          {isUser && (
            <UserRound className="h-2.5 w-2.5" />
          )}

          {message.timestamp}
        </div>
      </div>
    </div>
  );
}

export default AICopilotMessage;