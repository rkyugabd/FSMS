import {
  Activity,
  ChevronDown,
  Database,
  Layers3,
} from "lucide-react";

import {
  copilotContextOptions,
  type AICopilotContext,
} from "../aiCopilotData";

type AICopilotContextPanelProps = {
  context: AICopilotContext;
  onContextChange: (
    context: AICopilotContext,
  ) => void;
};

export function AICopilotContextPanel({
  context,
  onContextChange,
}: AICopilotContextPanelProps) {
  return (
    <aside className="hidden w-[250px] shrink-0 flex-col border-l border-[#E4E7EC] bg-white xl:flex">
      <div className="border-b border-[#E4E7EC] px-4 py-3.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#667085]">
          AI Context
        </p>

        <p className="mt-0.5 text-[9px] text-[#98A2B3]">
          Data available to Copilot
        </p>
      </div>

      <div className="space-y-4 p-4">
        <div>
          <label className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
            Active Context
          </label>

          <div className="relative">
            <select
              value={context.type}
              onChange={(event) => {
                const selected =
                  copilotContextOptions.find(
                    (option) =>
                      option.type ===
                      event.target.value,
                  );

                if (selected) {
                  onContextChange(
                    selected,
                  );
                }
              }}
              className="h-9 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-white px-3 pr-8 text-[10px] font-medium text-[#344054] outline-none focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
            >
              {copilotContextOptions.map(
                (option) => (
                  <option
                    key={option.type}
                    value={option.type}
                  >
                    {option.label}
                  </option>
                ),
              )}
            </select>

            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A2B3]" />
          </div>
        </div>

        <div className="rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] p-3">
          <div className="flex items-start gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
              <Layers3 className="h-4 w-4 text-[#1677FF]" />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-[#344054]">
                {context.label}
              </p>

              <p className="mt-1 text-[9px] leading-4 text-[#98A2B3]">
                {context.description}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
              Data Scope
            </p>

            <Database className="h-3 w-3 text-[#98A2B3]" />
          </div>

          <div className="rounded-lg border border-[#E4E7EC] bg-white p-3">
            <p className="text-lg font-semibold text-[#172033]">
              {context.recordCount}
            </p>

            <p className="mt-0.5 text-[9px] text-[#98A2B3]">
              records available
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-[#E4E7EC] bg-white p-3">
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-[#12B76A]" />

            <p className="text-[10px] font-semibold text-[#344054]">
              Context Ready
            </p>
          </div>

          <p className="mt-2 text-[9px] leading-4 text-[#98A2B3]">
            Copilot can use the selected operational
            context when generating insights.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default AICopilotContextPanel;