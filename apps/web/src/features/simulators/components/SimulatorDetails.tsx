import {
  CalendarDays,
  Clock3,
  MapPin,
  Monitor,
  UserRound,
  UsersRound,
  Wrench,
} from "lucide-react";

import type {
  Simulator,
  SimulatorStatus,
} from "../simulatorsData";

type SimulatorDetailsProps = {
  simulator: Simulator;
};

const STATUS_STYLES: Record<
  SimulatorStatus,
  {
    background: string;
    text: string;
    dot: string;
  }
> = {
  Available: {
    background: "bg-[#E8F8F1]",
    text: "text-[#087443]",
    dot: "bg-[#12B76A]",
  },

  "In Use": {
    background: "bg-[#EAF2FF]",
    text: "text-[#1355B5]",
    dot: "bg-[#1677FF]",
  },

  Maintenance: {
    background: "bg-[#FFFAEB]",
    text: "text-[#B54708]",
    dot: "bg-[#F79009]",
  },

  Offline: {
    background: "bg-[#FEF3F2]",
    text: "text-[#B42318]",
    dot: "bg-[#F04438]",
  },
};

function formatDate(
  value: string,
) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  ).format(
    new Date(`${value}T00:00:00`),
  );
}

export function SimulatorDetails({
  simulator,
}: SimulatorDetailsProps) {
  const statusStyle =
    STATUS_STYLES[simulator.status];

  return (
    <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      {/* HEADER */}

      <div className="flex flex-col gap-4 border-b border-[#E4E7EC] bg-[#FCFCFD] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF2FF]">
            <Monitor className="h-5 w-5 text-[#1677FF]" />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#98A2B3]">
              {simulator.simulatorId}
            </p>

            <h2 className="mt-0.5 text-base font-semibold text-[#172033]">
              {simulator.name}
            </h2>

            <p className="mt-0.5 text-xs text-[#667085]">
              {simulator.model}
            </p>
          </div>
        </div>

        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyle.background} ${statusStyle.text}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
          />

          {simulator.status}
        </span>
      </div>

      {/* INFORMATION */}

      <div className="grid gap-px bg-[#E4E7EC] sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-4">
          <div className="mb-2 flex items-center gap-2 text-[#98A2B3]">
            <Monitor className="h-3.5 w-3.5" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.08em]">
              Type
            </span>
          </div>

          <p className="text-xs font-semibold text-[#344054]">
            {simulator.type}
          </p>
        </div>

        <div className="bg-white p-4">
          <div className="mb-2 flex items-center gap-2 text-[#98A2B3]">
            <MapPin className="h-3.5 w-3.5" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.08em]">
              Location
            </span>
          </div>

          <p className="text-xs font-semibold text-[#344054]">
            {simulator.location}
          </p>
        </div>

        <div className="bg-white p-4">
          <div className="mb-2 flex items-center gap-2 text-[#98A2B3]">
            <UsersRound className="h-3.5 w-3.5" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.08em]">
              Capacity
            </span>
          </div>

          <p className="text-xs font-semibold text-[#344054]">
            {simulator.capacity}{" "}
            {simulator.capacity === 1
              ? "person"
              : "people"}
          </p>
        </div>

        <div className="bg-white p-4">
          <div className="mb-2 flex items-center gap-2 text-[#98A2B3]">
            <Clock3 className="h-3.5 w-3.5" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.08em]">
              Hours Used
            </span>
          </div>

          <p className="text-xs font-semibold text-[#344054]">
            {simulator.hoursUsed.toLocaleString()}{" "}
            hours
          </p>
        </div>
      </div>

      {/* OPERATIONS */}

      <div className="border-t border-[#E4E7EC] px-5 py-5">
        <div className="mb-4 flex items-center gap-2">
          <Wrench className="h-4 w-4 text-[#667085]" />

          <h3 className="text-xs font-semibold text-[#172033]">
            Maintenance & Operations
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-[#E4E7EC] bg-[#F9FAFB] p-3">
            <div className="flex items-center gap-2 text-[#98A2B3]">
              <CalendarDays className="h-3.5 w-3.5" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.08em]">
                Last Maintenance
              </span>
            </div>

            <p className="mt-2 text-xs font-semibold text-[#344054]">
              {formatDate(
                simulator.lastMaintenance,
              )}
            </p>
          </div>

          <div className="rounded-lg border border-[#E4E7EC] bg-[#F9FAFB] p-3">
            <div className="flex items-center gap-2 text-[#98A2B3]">
              <CalendarDays className="h-3.5 w-3.5" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.08em]">
                Next Maintenance
              </span>
            </div>

            <p className="mt-2 text-xs font-semibold text-[#344054]">
              {formatDate(
                simulator.nextMaintenance,
              )}
            </p>
          </div>

          <div className="rounded-lg border border-[#E4E7EC] bg-[#F9FAFB] p-3">
            <div className="flex items-center gap-2 text-[#98A2B3]">
              <UserRound className="h-3.5 w-3.5" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.08em]">
                Assigned Instructor
              </span>
            </div>

            <p className="mt-2 text-xs font-semibold text-[#344054]">
              {simulator.instructor}
            </p>
          </div>
        </div>
      </div>

      {/* NOTES */}

      {simulator.notes && (
        <div className="border-t border-[#E4E7EC] px-5 py-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Operational Notes
          </p>

          <p className="mt-2 text-xs leading-5 text-[#475467]">
            {simulator.notes}
          </p>
        </div>
      )}

      {/* FOOTER */}

      <div className="border-t border-[#E4E7EC] bg-[#FCFCFD] px-5 py-3">
        <p className="text-[10px] text-[#98A2B3]">
          Simulator ID:{" "}
          <span className="font-semibold text-[#667085]">
            {simulator.id}
          </span>
        </p>
      </div>
    </div>
  );
}

export default SimulatorDetails;