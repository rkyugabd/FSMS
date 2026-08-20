import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Clock3,
  MoreHorizontal,
  Plane,
  UserRound,
} from "lucide-react";

import type { Flight } from "../flightsData";

type SortField =
  | "flightNumber"
  | "date"
  | "departureTime"
  | "aircraft"
  | "instructor"
  | "student"
  | "status";

type SortDirection =
  | "asc"
  | "desc";

type FlightsTableProps = {
  flights: Flight[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onFlightClick: (flight: Flight) => void;
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
    background: "bg-[#EAF2FF]",
    text: "text-[#1355B5]",
    dot: "bg-[#1677FF]",
  },

  Confirmed: {
    background: "bg-[#EEF2FF]",
    text: "text-[#4338CA]",
    dot: "bg-[#6366F1]",
  },

  Boarding: {
    background: "bg-[#F2EDFF]",
    text: "text-[#6941C6]",
    dot: "bg-[#7F56D9]",
  },

  "In Flight": {
    background: "bg-[#E8F8F1]",
    text: "text-[#087443]",
    dot: "bg-[#12B76A]",
  },

  Landed: {
    background: "bg-[#E8F8F1]",
    text: "text-[#087443]",
    dot: "bg-[#12B76A]",
  },

  Delayed: {
    background: "bg-[#FFFAEB]",
    text: "text-[#B54708]",
    dot: "bg-[#F79009]",
  },

  Cancelled: {
    background: "bg-[#FEF3F2]",
    text: "text-[#B42318]",
    dot: "bg-[#F04438]",
  },

  Completed: {
    background: "bg-[#F2F4F7]",
    text: "text-[#475467]",
    dot: "bg-[#98A2B3]",
  },

  Diverted: {
    background: "bg-[#FEF3F2]",
    text: "text-[#B42318]",
    dot: "bg-[#F04438]",
  },

  Maintenance: {
    background: "bg-[#FFF7E8]",
    text: "text-[#B54708]",
    dot: "bg-[#F79009]",
  },
};

function SortIcon({
  field,
  activeField,
  direction,
}: {
  field: SortField;
  activeField: SortField;
  direction: SortDirection;
}) {
  if (field !== activeField) {
    return (
      <ArrowUpDown className="h-3 w-3 text-[#98A2B3]" />
    );
  }

  return direction === "asc" ? (
    <ArrowUp className="h-3 w-3 text-[#1677FF]" />
  ) : (
    <ArrowDown className="h-3 w-3 text-[#1677FF]" />
  );
}

function TableHeader({
  children,
  field,
  activeField,
  direction,
  onSort,
  className = "",
}: {
  children: React.ReactNode;
  field: SortField;
  activeField: SortField;
  direction: SortDirection;
  onSort: (field: SortField) => void;
  className?: string;
}) {
  return (
    <th
      scope="col"
      className={`whitespace-nowrap px-4 py-3 text-left ${className}`}
    >
      <button
        type="button"
        onClick={() => onSort(field)}
        className="group inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085] transition hover:text-[#344054]"
      >
        {children}

        <SortIcon
          field={field}
          activeField={activeField}
          direction={direction}
        />
      </button>
    </th>
  );
}

function formatDate(
  date: string,
) {
  if (!date) {
    return "—";
  }

  const parsed =
    new Date(`${date}T00:00:00`);

  if (
    Number.isNaN(
      parsed.getTime(),
    )
  ) {
    return date;
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  ).format(parsed);
}

function formatWeekday(
  date: string,
) {
  if (!date) {
    return "";
  }

  const parsed =
    new Date(`${date}T00:00:00`);

  if (
    Number.isNaN(
      parsed.getTime(),
    )
  ) {
    return "";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      weekday: "short",
    },
  ).format(parsed);
}

export function FlightsTable({
  flights,
  sortField,
  sortDirection,
  onSort,
  onFlightClick,
}: FlightsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-[#172033]">
            Flights
          </h3>

          <p className="mt-0.5 text-[11px] text-[#667085]">
            {flights.length}{" "}
            {flights.length === 1
              ? "flight"
              : "flights"}{" "}
            displayed
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-[#98A2B3]">
          <span className="h-2 w-2 rounded-full bg-[#12B76A]" />

          Live operations view
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="min-w-[1180px] w-full border-collapse">
          <thead className="border-b border-[#E4E7EC] bg-[#F9FAFB]">
            <tr>
              <TableHeader
                field="flightNumber"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Flight
              </TableHeader>

              <TableHeader
                field="date"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Date
              </TableHeader>

              <TableHeader
                field="departureTime"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Schedule
              </TableHeader>

              <TableHeader
                field="aircraft"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Aircraft
              </TableHeader>

              <TableHeader
                field="instructor"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Instructor
              </TableHeader>

              <TableHeader
                field="student"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Student
              </TableHeader>

              <th
                scope="col"
                className="whitespace-nowrap px-4 py-3 text-left"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                  Type
                </span>
              </th>

              <TableHeader
                field="status"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Status
              </TableHeader>

              <th
                scope="col"
                className="w-12 px-4 py-3"
              >
                <span className="sr-only">
                  Actions
                </span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E4E7EC]">
            {flights.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="px-6 py-16 text-center"
                >
                  <div className="mx-auto flex max-w-sm flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2F4F7]">
                      <Plane className="h-4 w-4 text-[#98A2B3]" />
                    </div>

                    <h4 className="mt-3 text-sm font-semibold text-[#344054]">
                      No flights found
                    </h4>

                    <p className="mt-1 text-xs text-[#667085]">
                      Try changing your filters
                      or search criteria.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              flights.map(
                (flight) => {
                  const statusStyle =
                    STATUS_STYLES[
                      flight.status
                    ];

                  return (
                    <tr
                      key={flight.id}
                      onClick={() =>
                        onFlightClick(
                          flight,
                        )
                      }
                      className="group cursor-pointer bg-white transition hover:bg-[#F9FAFB]"
                    >
                      {/* Flight */}

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF2FF]">
                            <Plane className="h-3.5 w-3.5 text-[#1677FF]" />
                          </div>

                          <div className="min-w-0">
                            <div className="truncate text-xs font-semibold text-[#172033]">
                              {
                                flight.flightNumber
                              }
                            </div>

                            <div className="mt-0.5 truncate text-[10px] text-[#98A2B3]">
                              {flight.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Date */}

                      <td className="px-4 py-3">
                        <div className="text-xs font-medium text-[#344054]">
                          {formatDate(
                            flight.date,
                          )}
                        </div>

                        <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                          {formatWeekday(
                            flight.date,
                          )}
                        </div>
                      </td>

                      {/* Schedule */}

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Clock3 className="h-3.5 w-3.5 text-[#98A2B3]" />

                          <div>
                            <div className="text-xs font-semibold text-[#344054]">
                              {
                                flight.departureTime
                              }{" "}
                              —{" "}
                              {
                                flight.arrivalTime
                              }
                            </div>

                            <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                              {
                                flight.duration
                              }
                            </div>
                          </div>
                        </div>

                        <div className="mt-1.5 text-[10px] font-medium text-[#667085]">
                          {
                            flight.departureAirport
                          }{" "}
                          →{" "}
                          {
                            flight.arrivalAirport
                          }
                        </div>
                      </td>

                      {/* Aircraft */}

                      <td className="px-4 py-3">
                        <div className="text-xs font-semibold text-[#344054]">
                          {
                            flight.aircraft
                          }
                        </div>

                        <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                          {
                            flight.aircraftType
                          }
                        </div>
                      </td>

                      {/* Instructor */}

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F2F4F7]">
                            <UserRound className="h-3.5 w-3.5 text-[#667085]" />
                          </div>

                          <span className="whitespace-nowrap text-xs font-medium text-[#344054]">
                            {
                              flight.instructor
                            }
                          </span>
                        </div>
                      </td>

                      {/* Student */}

                      <td className="px-4 py-3">
                        <div className="text-xs font-medium text-[#344054]">
                          {flight.student}
                        </div>

                        <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                          Student
                        </div>
                      </td>

                      {/* Type */}

                      <td className="px-4 py-3">
                        <span className="inline-flex whitespace-nowrap rounded-md bg-[#F2F4F7] px-2 py-1 text-[10px] font-medium text-[#475467]">
                          {
                            flight.flightType
                          }
                        </span>
                      </td>

                      {/* Status */}

                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyle.background} ${statusStyle.text}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                          />

                          {
                            flight.status
                          }
                        </span>
                      </td>

                      {/* Actions */}

                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={(
                            event,
                          ) => {
                            event.stopPropagation();

                            onFlightClick(
                              flight,
                            );
                          }}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-[#98A2B3] opacity-0 transition hover:bg-[#F2F4F7] hover:text-[#344054] group-hover:opacity-100"
                          aria-label={`Open ${flight.flightNumber}`}
                          title={`Open ${flight.flightNumber}`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                },
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}

      <div className="flex flex-col gap-2 border-t border-[#E4E7EC] bg-[#FCFCFD] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[10px] text-[#667085]">
          Showing{" "}
          <span className="font-semibold text-[#344054]">
            {flights.length}
          </span>{" "}
          flight
          {flights.length === 1
            ? ""
            : "s"}
        </p>

        <p className="text-[10px] text-[#98A2B3]">
          Select a flight to view operational
          details.
        </p>
      </div>
    </div>
  );
}

export default FlightsTable;