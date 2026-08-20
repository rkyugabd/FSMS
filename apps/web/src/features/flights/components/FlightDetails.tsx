import {
  CalendarDays,
  Clock3,
  Plane,
  UserRound,
  UsersRound,
} from "lucide-react";

import type { Flight } from "../flightsData";

type FlightDetailsProps = {
  flight: Flight;
};

const STATUS_STYLES: Record<
  Flight["status"],
  {
    background: string;
    text: string;
    dot: string;
  }
> = {
  Scheduled: {
    background:
      "bg-[#EAF2FF]",
    text: "text-[#1355B5]",
    dot: "bg-[#1677FF]",
  },

  Confirmed: {
    background:
      "bg-[#EEF4FF]",
    text: "text-[#175CD3]",
    dot: "bg-[#2E90FA]",
  },

  Boarding: {
    background:
      "bg-[#F2EDFF]",
    text: "text-[#6941C6]",
    dot: "bg-[#7F56D9]",
  },

  "In Flight": {
    background:
      "bg-[#E8F8F1]",
    text: "text-[#087443]",
    dot: "bg-[#12B76A]",
  },

  Landed: {
    background:
      "bg-[#E8F8F1]",
    text: "text-[#087443]",
    dot: "bg-[#12B76A]",
  },

  Completed: {
    background:
      "bg-[#F2F4F7]",
    text: "text-[#475467]",
    dot: "bg-[#98A2B3]",
  },

  Delayed: {
    background:
      "bg-[#FFFAEB]",
    text: "text-[#B54708]",
    dot: "bg-[#F79009]",
  },

  Cancelled: {
    background:
      "bg-[#FEF3F2]",
    text: "text-[#B42318]",
    dot: "bg-[#F04438]",
  },

  Diverted: {
    background:
      "bg-[#FFF4E5]",
    text: "text-[#B54708]",
    dot: "bg-[#F79009]",
  },

  Maintenance: {
    background:
      "bg-[#F2F4F7]",
    text: "text-[#344054]",
    dot: "bg-[#667085]",
  },
};

function formatDate(
  value: string,
) {
  if (!value) {
    return "—";
  }

  const date = new Date(
    `${value}T00:00:00`,
  );

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  ).format(date);
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value:
    | string
    | number
    | undefined;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
        {label}
      </p>

      <p className="mt-1 text-xs font-medium text-[#344054]">
        {value !==
          undefined &&
        value !== ""
          ? value
          : "—"}
      </p>
    </div>
  );
}

export function FlightDetails({
  flight,
}: FlightDetailsProps) {
  const statusStyle =
    STATUS_STYLES[
      flight.status
    ];

  return (
    <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      {/* HEADER */}

      <header className="flex flex-col gap-4 border-b border-[#E4E7EC] bg-[#FCFCFD] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF2FF]">
            <Plane className="h-5 w-5 text-[#1677FF]" />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#98A2B3]">
              Flight
            </p>

            <h2 className="mt-0.5 text-lg font-semibold text-[#172033]">
              {
                flight.flightNumber
              }
            </h2>

            <p className="mt-0.5 text-[10px] text-[#98A2B3]">
              ID: {flight.id}
            </p>
          </div>
        </div>

        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyle.background} ${statusStyle.text}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
          />

          {flight.status}
        </span>
      </header>

      {/* ROUTE */}

      <section className="border-b border-[#E4E7EC] px-5 py-5">
        <div className="mb-4 flex items-center gap-2">
          <Plane className="h-4 w-4 text-[#667085]" />

          <h3 className="text-xs font-semibold text-[#172033]">
            Route & Schedule
          </h3>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div className="rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Departure
            </p>

            <p className="mt-1 text-lg font-semibold text-[#172033]">
              {
                flight.departureAirport
              }
            </p>

            <p className="mt-0.5 text-xs text-[#667085]">
              Departure airport
            </p>

            <div className="mt-4 flex items-center gap-2">
              <Clock3 className="h-3.5 w-3.5 text-[#98A2B3]" />

              <span className="text-xs font-semibold text-[#344054]">
                {
                  flight.departureTime
                }
              </span>
            </div>

            <p className="mt-1 text-[10px] text-[#98A2B3]">
              {formatDate(
                flight.date,
              )}
            </p>
          </div>

          <div className="hidden lg:block">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF2FF]">
              <Plane className="h-3.5 w-3.5 rotate-90 text-[#1677FF]" />
            </div>
          </div>

          <div className="rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Arrival
            </p>

            <p className="mt-1 text-lg font-semibold text-[#172033]">
              {
                flight.arrivalAirport
              }
            </p>

            <p className="mt-0.5 text-xs text-[#667085]">
              Arrival airport
            </p>

            <div className="mt-4 flex items-center gap-2">
              <Clock3 className="h-3.5 w-3.5 text-[#98A2B3]" />

              <span className="text-xs font-semibold text-[#344054]">
                {
                  flight.arrivalTime
                }
              </span>
            </div>

            <p className="mt-1 text-[10px] text-[#98A2B3]">
              {formatDate(
                flight.date,
              )}
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <DetailItem
            label="Date"
            value={formatDate(
              flight.date,
            )}
          />

          <DetailItem
            label="Duration"
            value={
              flight.duration
            }
          />

          <DetailItem
            label="Flight Type"
            value={
              flight.flightType
            }
          />
        </div>
      </section>

      {/* AIRCRAFT */}

      <section className="border-b border-[#E4E7EC] px-5 py-5">
        <div className="mb-4 flex items-center gap-2">
          <Plane className="h-4 w-4 text-[#667085]" />

          <h3 className="text-xs font-semibold text-[#172033]">
            Aircraft
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DetailItem
            label="Aircraft"
            value={
              flight.aircraft
            }
          />

          <DetailItem
            label="Aircraft Type"
            value={
              flight.aircraftType
            }
          />

          <DetailItem
            label="Gate"
            value={flight.gate}
          />

          <DetailItem
            label="Runway"
            value={
              flight.runway
            }
          />
        </div>
      </section>

      {/* PEOPLE */}

      <section className="border-b border-[#E4E7EC] px-5 py-5">
        <div className="mb-4 flex items-center gap-2">
          <UsersRound className="h-4 w-4 text-[#667085]" />

          <h3 className="text-xs font-semibold text-[#172033]">
            Personnel & Passengers
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F2F4F7]">
              <UserRound className="h-4 w-4 text-[#667085]" />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.08em] text-[#98A2B3]">
                Instructor
              </p>

              <p className="mt-0.5 text-xs font-semibold text-[#344054]">
                {
                  flight.instructor ||
                  "—"
                }
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F2F4F7]">
              <UserRound className="h-4 w-4 text-[#667085]" />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.08em] text-[#98A2B3]">
                Student
              </p>

              <p className="mt-0.5 text-xs font-semibold text-[#344054]">
                {
                  flight.student ||
                  "—"
                }
              </p>
            </div>
          </div>

          <DetailItem
            label="Passengers"
            value={
              flight.passengers ??
              0
            }
          />
        </div>
      </section>

      {/* NOTES */}

      {flight.notes && (
        <section className="px-5 py-5">
          <div className="mb-3 flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-[#667085]" />

            <h3 className="text-xs font-semibold text-[#172033]">
              Operational Notes
            </h3>
          </div>

          <div className="rounded-lg border border-[#E4E7EC] bg-[#F9FAFB] px-4 py-3">
            <p className="text-xs leading-5 text-[#475467]">
              {flight.notes}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

export default FlightDetails;