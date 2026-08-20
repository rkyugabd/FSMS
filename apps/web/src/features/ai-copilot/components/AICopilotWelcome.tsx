import {
  BarChart3,
  BrainCircuit,
  Database,
  ShieldCheck,
} from "lucide-react";

export function AICopilotWelcome() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#172033] shadow-sm">
        <BrainCircuit className="h-7 w-7 text-white" />
      </div>

      <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6941C6]">
        Intelligent Operations
      </p>

      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#172033]">
        How can I help with your operations?
      </h2>

      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#667085]">
        Ask questions about flights, students,
        training, aircraft, maintenance,
        employees, finance, procurement,
        analytics, or reports.
      </p>

      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left">
          <Database className="h-4 w-4 text-[#1677FF]" />

          <h3 className="mt-3 text-[11px] font-semibold text-[#344054]">
            Operational Data
          </h3>

          <p className="mt-1 text-[9px] leading-4 text-[#98A2B3]">
            Analyze operational records across FSMS.
          </p>
        </div>

        <div className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left">
          <BarChart3 className="h-4 w-4 text-[#6941C6]" />

          <h3 className="mt-3 text-[11px] font-semibold text-[#344054]">
            Business Intelligence
          </h3>

          <p className="mt-1 text-[9px] leading-4 text-[#98A2B3]">
            Turn operational data into useful insights.
          </p>
        </div>

        <div className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left">
          <ShieldCheck className="h-4 w-4 text-[#087443]" />

          <h3 className="mt-3 text-[11px] font-semibold text-[#344054]">
            Decision Support
          </h3>

          <p className="mt-1 text-[9px] leading-4 text-[#98A2B3]">
            Identify risks and operational priorities.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AICopilotWelcome;