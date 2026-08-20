import {
  Bot,
  Plus,
  Sparkles,
} from "lucide-react";

import type { AICopilotContext } from "../aiCopilotData";

type AICopilotHeaderProps = {
  context: AICopilotContext;
  onNewConversation: () => void;
};

export function AICopilotHeader({
  context,
  onNewConversation,
}: AICopilotHeaderProps) {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-[#E4E7EC] bg-white px-5 py-3.5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#172033]">
          <Bot className="h-4 w-4 text-white" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold text-[#172033]">
              FSMS AI Copilot
            </h1>

            <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F8F1] px-2 py-0.5 text-[9px] font-semibold text-[#087443]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#12B76A]" />
              Online
            </span>
          </div>

          <p className="mt-0.5 text-[10px] text-[#667085]">
            AI-powered flight school operations assistant
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-lg border border-[#E4E7EC] bg-[#F9FAFB] px-3 py-1.5 sm:flex">
          <Sparkles className="h-3.5 w-3.5 text-[#6941C6]" />

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Context
            </p>

            <p className="text-[10px] font-medium text-[#344054]">
              {context.label}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onNewConversation}
          className="flex h-8 items-center gap-1.5 rounded-lg bg-[#1677FF] px-3 text-[10px] font-semibold text-white transition hover:bg-[#1264D8]"
        >
          <Plus className="h-3.5 w-3.5" />

          New Chat
        </button>
      </div>
    </header>
  );
}

export default AICopilotHeader;