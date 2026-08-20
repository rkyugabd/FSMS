import {
  Bot,
  Sparkles,
} from "lucide-react";

import type {
  AICopilotMessage,
} from "../aiCopilotData";

import { AICopilotMessage as Message } from "./AICopilotMessage";

type AICopilotConversationProps = {
  messages: AICopilotMessage[];
};

export function AICopilotConversation({
  messages,
}: AICopilotConversationProps) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#172033]">
            <Bot className="h-3.5 w-3.5 text-white" />
          </div>

          <div className="flex items-center gap-1.5 text-[9px] text-[#98A2B3]">
            <Sparkles className="h-3 w-3 text-[#6941C6]" />

            AI Copilot is analyzing FSMS context
          </div>
        </div>

        <div className="space-y-5">
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AICopilotConversation;