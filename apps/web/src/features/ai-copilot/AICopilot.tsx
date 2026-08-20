import { useMemo, useState } from "react";

import {
  initialConversations,
  quickActions,
  type AICopilotContext,
  type AICopilotMessage,
} from "./aiCopilotData";

import { AICopilotHeader } from "./components/AICopilotHeader";
import { AICopilotSidebar } from "./components/AICopilotSidebar";
import { AICopilotWelcome } from "./components/AICopilotWelcome";
import { AICopilotQuickActions } from "./components/AICopilotQuickActions";
import { AICopilotConversation } from "./components/AICopilotConversation";
import { AICopilotInput } from "./components/AICopilotInput";
import { AICopilotContextPanel } from "./components/AICopilotContextPanel";

export function AICopilot() {
  const [conversations, setConversations] =
    useState(initialConversations);

  const [activeConversationId, setActiveConversationId] =
    useState(initialConversations[0]?.id ?? "");

  const [context, setContext] =
    useState<AICopilotContext>({
      type: "dashboard",
      label: "Dashboard",
      description:
        "Overall flight school operational performance",
      recordCount: 128,
    });

  const activeConversation = useMemo(
    () =>
      conversations.find(
        (conversation) =>
          conversation.id ===
          activeConversationId,
      ),
    [conversations, activeConversationId],
  );

  const messages =
    activeConversation?.messages ?? [];

  const createConversation = () => {
    const id = `conversation-${Date.now()}`;

    const newConversation = {
      id,
      title: "New Conversation",
      preview:
        "Start a new conversation with AI Copilot",
      updatedAt: "Now",
      messages: [],
    };

    setConversations((previous) => [
      newConversation,
      ...previous,
    ]);

    setActiveConversationId(id);
  };

  const handleSend = (content: string) => {
    const trimmed = content.trim();

    if (!trimmed) {
      return;
    }

    const userMessage: AICopilotMessage = {
      id: `message-${Date.now()}-user`,
      role: "user",
      type: "text",
      content: trimmed,
      timestamp: new Date().toLocaleTimeString(
        "en-US",
        {
          hour: "numeric",
          minute: "2-digit",
        },
      ),
    };

    const conversationId =
      activeConversationId ||
      `conversation-${Date.now()}`;

    const assistantMessage =
      buildAssistantResponse(trimmed);

    setConversations((previous) => {
      const exists = previous.some(
        (conversation) =>
          conversation.id ===
          conversationId,
      );

      if (!exists) {
        return [
          {
            id: conversationId,
            title:
              trimmed.length > 32
                ? `${trimmed.slice(0, 32)}...`
                : trimmed,
            preview: trimmed,
            updatedAt: "Now",
            messages: [
              userMessage,
              assistantMessage,
            ],
          },
          ...previous,
        ];
      }

      return previous.map(
        (conversation) =>
          conversation.id ===
          conversationId
            ? {
                ...conversation,
                title:
                  conversation.messages.length ===
                  0
                    ? trimmed.length > 32
                      ? `${trimmed.slice(0, 32)}...`
                      : trimmed
                    : conversation.title,
                preview: trimmed,
                updatedAt: "Now",
                messages: [
                  ...conversation.messages,
                  userMessage,
                  assistantMessage,
                ],
              }
            : conversation,
      );
    });

    setActiveConversationId(conversationId);
  };

  const buildAssistantResponse = (
    prompt: string,
  ): AICopilotMessage => {
    const lower = prompt.toLowerCase();

    if (
      lower.includes("flight") ||
      lower.includes("delay") ||
      lower.includes("schedule")
    ) {
      return {
        id: `message-${Date.now()}-assistant`,
        role: "assistant",
        type: "insight",
        content:
          "I've reviewed the current flight operations context. Most flights are operating normally, but there are a few schedule exceptions that should be monitored.",
        timestamp: new Date().toLocaleTimeString(
          "en-US",
          {
            hour: "numeric",
            minute: "2-digit",
          },
        ),
        insights: [
          {
            id: `insight-${Date.now()}-1`,
            title: "On-time Operations",
            description:
              "Most scheduled flights remain on schedule.",
            severity: "success",
            metric: "94%",
            metricLabel: "On time",
            actionLabel: "Review Flights",
          },
          {
            id: `insight-${Date.now()}-2`,
            title: "Schedule Exceptions",
            description:
              "Two flights require operational monitoring.",
            severity: "warning",
            metric: "2",
            metricLabel: "Exceptions",
            actionLabel: "Review Flights",
          },
        ],
      };
    }

    if (
      lower.includes("maintenance") ||
      lower.includes("aircraft")
    ) {
      return {
        id: `message-${Date.now()}-assistant`,
        role: "assistant",
        type: "insight",
        content:
          "The fleet is generally available, but several aircraft are approaching planned maintenance windows. These should be reviewed before assigning additional flight hours.",
        timestamp: new Date().toLocaleTimeString(
          "en-US",
          {
            hour: "numeric",
            minute: "2-digit",
          },
        ),
        insights: [
          {
            id: `insight-${Date.now()}-3`,
            title: "Maintenance Attention",
            description:
              "Three aircraft are approaching scheduled maintenance.",
            severity: "warning",
            metric: "3",
            metricLabel: "Aircraft",
            actionLabel: "Review Maintenance",
          },
        ],
      };
    }

    if (
      lower.includes("student") ||
      lower.includes("training")
    ) {
      return {
        id: `message-${Date.now()}-assistant`,
        role: "assistant",
        type: "insight",
        content:
          "Student training is progressing, but several students are approaching key milestones. Instructor capacity should be reviewed to avoid scheduling bottlenecks.",
        timestamp: new Date().toLocaleTimeString(
          "en-US",
          {
            hour: "numeric",
            minute: "2-digit",
          },
        ),
        insights: [
          {
            id: `insight-${Date.now()}-4`,
            title: "Training Milestones",
            description:
              "Several students are approaching important training milestones.",
            severity: "info",
            metric: "7",
            metricLabel: "Students",
            actionLabel: "Review Training",
          },
        ],
      };
    }

    if (
      lower.includes("finance") ||
      lower.includes("cost")
    ) {
      return {
        id: `message-${Date.now()}-assistant`,
        role: "assistant",
        type: "insight",
        content:
          "Financial activity is currently stable. Aircraft operations, maintenance, and procurement remain the primary areas to monitor for cost changes.",
        timestamp: new Date().toLocaleTimeString(
          "en-US",
          {
            hour: "numeric",
            minute: "2-digit",
          },
        ),
        insights: [
          {
            id: `insight-${Date.now()}-5`,
            title: "Cost Drivers",
            description:
              "Aircraft operations and maintenance are key cost areas.",
            severity: "info",
            metric: "3",
            metricLabel: "Key areas",
            actionLabel: "Open Finance",
          },
        ],
      };
    }

    return {
      id: `message-${Date.now()}-assistant`,
      role: "assistant",
      type: "text",
      content:
        "I can help analyze your FSMS data across flights, students, training, aircraft, maintenance, employees, procurement, finance, analytics, and reports. Try asking me about one of these operational areas.",
      timestamp: new Date().toLocaleTimeString(
        "en-US",
        {
          hour: "numeric",
          minute: "2-digit",
        },
      ),
    };
  };

  const handleQuickAction = (
    prompt: string,
  ) => {
    handleSend(prompt);
  };

  return (
    <div className="flex h-[calc(100vh-120px)] min-h-[680px] flex-col overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white shadow-[0_1px_3px_rgba(16,24,40,0.06)]">
      <AICopilotHeader
        context={context}
        onNewConversation={
          createConversation
        }
      />

      <div className="flex min-h-0 flex-1">
        <AICopilotSidebar
          conversations={conversations}
          activeConversationId={
            activeConversationId
          }
          onConversationSelect={
            setActiveConversationId
          }
          onNewConversation={
            createConversation
          }
        />

        <main className="flex min-w-0 flex-1 flex-col bg-[#FCFCFD]">
          {messages.length === 0 ? (
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-8">
              <AICopilotWelcome />

              <div className="mx-auto mt-8 max-w-3xl">
                <AICopilotQuickActions
                  actions={quickActions}
                  onAction={
                    handleQuickAction
                  }
                />
              </div>
            </div>
          ) : (
            <AICopilotConversation
              messages={messages}
            />
          )}

          <AICopilotInput
            onSend={handleSend}
          />
        </main>

        <AICopilotContextPanel
          context={context}
          onContextChange={setContext}
        />
      </div>
    </div>
  );
}

export default AICopilot;