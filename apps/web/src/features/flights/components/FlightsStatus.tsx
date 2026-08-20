import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Plane,
  Timer,
} from "lucide-react";

import type { Flight } from "../flightsData";

type FlightsStatusProps = {
  flights: Flight[];
};

type StatusCardProps = {
  label: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  iconBackground: string;
  iconColor: string;
};

function StatusCard({
  label,
  value,
  description,
  icon,
  iconBackground,
  iconColor,
}: StatusCardProps) {
  return (
    <div className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#98A2B3]">
            {label}
          </p>

          <p className="mt-1 text-2xl font-semibold tracking-tight text-[#172033]">
            {value}
          </p>

          <p className="mt-1 text-[10px] text-[#667085]">
            {description}
          </p>
        </div>

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBackground}`}
        >
          <span className={iconColor}>
            {icon}
          </span>
        </div>
      </div>
    </div>
  );
}

export function FlightsStatus({
  flights,
}: FlightsStatusProps) {
  const scheduledCount =
    flights.filter(
      (flight) =>
        flight.status === "Scheduled",
    ).length;

  const boardingCount =
    flights.filter(
      (flight) =>
        flight.status === "Boarding",
    ).length;

  const inFlightCount =
    flights.filter(
      (flight) =>
        flight.status === "In Flight",
    ).length;

  const delayedCount =
    flights.filter(
      (flight) =>
        flight.status === "Delayed",
    ).length;

  const completedCount =
    flights.filter(
      (flight) =>
        flight.status === "Completed" ||
        flight.status === "Landed",
    ).length;

  const activeCount =
    boardingCount +
    inFlightCount;

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
      <StatusCard
        label="Total Flights"
        value={flights.length}
        description="Flights in operational view"
        icon={
          <Plane className="h-4 w-4" />
        }
        iconBackground="bg-[#EAF2FF]"
        iconColor="text-[#1677FF]"
      />

      <StatusCard
        label="Scheduled"
        value={scheduledCount}
        description="Upcoming scheduled flights"
        icon={
          <Clock3 className="h-4 w-4" />
        }
        iconBackground="bg-[#EAF2FF]"
        iconColor="text-[#1677FF]"
      />

      <StatusCard
        label="Active"
        value={activeCount}
        description="Boarding or currently airborne"
        icon={
          <Timer className="h-4 w-4" />
        }
        iconBackground="bg-[#E8F8F1]"
        iconColor="text-[#12B76A]"
      />

      <StatusCard
        label="Delayed"
        value={delayedCount}
        description="Flights requiring attention"
        icon={
          <AlertTriangle className="h-4 w-4" />
        }
        iconBackground="bg-[#FFFAEB]"
        iconColor="text-[#F79009]"
      />

      <StatusCard
        label="Completed"
        value={completedCount}
        description="Flights completed or landed"
        icon={
          <CheckCircle2 className="h-4 w-4" />
        }
        iconBackground="bg-[#F2F4F7]"
        iconColor="text-[#667085]"
      />
    </section>
  );
}

export default FlightsStatus;