import {
  BarChart3,
  CircleDollarSign,
  Plane,
  Settings,
  UsersRound,
  Wrench,
} from "lucide-react";

import type {
  AICopilotQuickActionItem,
} from "../aiCopilotData";

type AICopilotQuickActionsProps = {
  actions: AICopilotQuickActionItem[];
  onAction: (prompt: string) => void;
};

const ICONS = {
  "flight-status": Plane,
  "maintenance-risk": Wrench,
  "student-progress": UsersRound,
  "training-capacity": Settings,
  "financial-summary": CircleDollarSign,
  "operational-report": BarChart3,
};

export function AICopilotQuickActions({
  actions,
  onAction,
}: AICopilotQuickActionsProps) {
  return (
    <div>
      <div className="mb-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#667085]">
          Quick Actions
        </p>

        <p className="mt-0.5 text-[10px] text-[#98A2B3]">
          Start with a common operational question
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon =
            ICONS[action.id];

          return (
            <button
              key={action.id}
              type="button"
              onClick={() =>
                onAction(action.prompt)
              }
              className="group flex items-start gap-3 rounded-xl border border-[#E4E7EC] bg-white p-3.5 text-left transition hover:border-[#B2CCFF] hover:bg-[#F9FBFF] hover:shadow-sm"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F2F4F7] transition group-hover:bg-[#EAF2FF]">
                <Icon className="h-4 w-4 text-[#667085] group-hover:text-[#1677FF]" />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-[#344054]">
                  {action.title}
                </p>

                <p className="mt-1 text-[9px] leading-4 text-[#98A2B3]">
                  {action.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default AICopilotQuickActions;