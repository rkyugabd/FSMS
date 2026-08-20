import {
  Bot,
  MessageSquarePlus,
} from "lucide-react";

type AICopilotEmptyStateProps = {
  onNewConversation?: () => void;
};

export function AICopilotEmptyState({
  onNewConversation,
}: AICopilotEmptyStateProps) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F2F4F7]">
        <Bot className="h-5 w-5 text-[#667085]" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-[#344054]">
        Start a conversation
      </h3>

      <p className="mt-1 max-w-sm text-[10px] leading-5 text-[#98A2B3]">
        Ask FSMS AI Copilot about flights,
        students, training, aircraft,
        maintenance, finance, or operations.
      </p>

      {onNewConversation && (
        <button
          type="button"
          onClick={onNewConversation}
          className="mt-4 flex h-8 items-center gap-1.5 rounded-lg bg-[#1677FF] px-3 text-[10px] font-semibold text-white transition hover:bg-[#1264D8]"
        >
          <MessageSquarePlus className="h-3.5 w-3.5" />

          Start Conversation
        </button>
      )}
    </div>
  );
}

export default AICopilotEmptyState;