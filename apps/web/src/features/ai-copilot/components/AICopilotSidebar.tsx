import {
  Clock3,
  MessageSquare,
  Plus,
} from "lucide-react";

import type {
  AICopilotConversation,
} from "../aiCopilotData";

type AICopilotSidebarProps = {
  conversations: AICopilotConversation[];
  activeConversationId: string;
  onConversationSelect: (
    id: string,
  ) => void;
  onNewConversation: () => void;
};

export function AICopilotSidebar({
  conversations,
  activeConversationId,
  onConversationSelect,
  onNewConversation,
}: AICopilotSidebarProps) {
  return (
    <aside className="hidden w-[240px] shrink-0 flex-col border-r border-[#E4E7EC] bg-white lg:flex">
      <div className="flex items-center justify-between border-b border-[#E4E7EC] px-4 py-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#667085]">
            Conversations
          </p>

          <p className="mt-0.5 text-[9px] text-[#98A2B3]">
            {conversations.length} chats
          </p>
        </div>

        <button
          type="button"
          onClick={onNewConversation}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-[#D0D5DD] text-[#667085] transition hover:bg-[#F9FAFB] hover:text-[#172033]"
          aria-label="New conversation"
          title="New conversation"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {conversations.map(
          (conversation) => {
            const active =
              conversation.id ===
              activeConversationId;

            return (
              <button
                key={conversation.id}
                type="button"
                onClick={() =>
                  onConversationSelect(
                    conversation.id,
                  )
                }
                className={[
                  "mb-1 w-full rounded-lg p-3 text-left transition",
                  active
                    ? "bg-[#EAF2FF]"
                    : "hover:bg-[#F9FAFB]",
                ].join(" ")}
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className={[
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md",
                      active
                        ? "bg-white"
                        : "bg-[#F2F4F7]",
                    ].join(" ")}
                  >
                    <MessageSquare
                      className={[
                        "h-3.5 w-3.5",
                        active
                          ? "text-[#1677FF]"
                          : "text-[#667085]",
                      ].join(" ")}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={[
                        "truncate text-[11px] font-semibold",
                        active
                          ? "text-[#1355B5]"
                          : "text-[#344054]",
                      ].join(" ")}
                    >
                      {conversation.title}
                    </p>

                    <p className="mt-1 line-clamp-2 text-[9px] leading-4 text-[#98A2B3]">
                      {conversation.preview}
                    </p>

                    <div className="mt-2 flex items-center gap-1 text-[8px] text-[#98A2B3]">
                      <Clock3 className="h-2.5 w-2.5" />

                      {conversation.updatedAt}
                    </div>
                  </div>
                </div>
              </button>
            );
          },
        )}
      </div>
    </aside>
  );
}

export default AICopilotSidebar;