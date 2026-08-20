import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Clock3,
  MoreHorizontal,
  UserRound,
} from "lucide-react";

import type { TimeEntry } from "../timeTrackingData";

type SortField =
  | "employeeName"
  | "date"
  | "clockIn"
  | "clockOut"
  | "totalHours"
  | "entryType"
  | "status";

type SortDirection = "asc" | "desc";

type TimeTrackingTableProps = {
  entries: TimeEntry[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onEntryClick: (
    entry: TimeEntry,
  ) => void;
};

const STATUS_STYLES: Record<
  TimeEntry["status"],
  {
    background: string;
    text: string;
    dot: string;
  }
> = {
  "Clocked In": {
    background: "bg-[#E8F8F1]",
    text: "text-[#087443]",
    dot: "bg-[#12B76A]",
  },

  "Clocked Out": {
    background: "bg-[#F2F4F7]",
    text: "text-[#475467]",
    dot: "bg-[#98A2B3]",
  },

  "On Break": {
    background: "bg-[#FFFAEB]",
    text: "text-[#B54708]",
    dot: "bg-[#F79009]",
  },

  Pending: {
    background: "bg-[#FFFAEB]",
    text: "text-[#B54708]",
    dot: "bg-[#F79009]",
  },

  Approved: {
    background: "bg-[#EAF2FF]",
    text: "text-[#1355B5]",
    dot: "bg-[#1677FF]",
  },

  Rejected: {
    background: "bg-[#FEF3F2]",
    text: "text-[#B42318]",
    dot: "bg-[#F04438]",
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
}: {
  children: React.ReactNode;
  field: SortField;
  activeField: SortField;
  direction: SortDirection;
  onSort: (field: SortField) => void;
}) {
  return (
    <th
      scope="col"
      className="whitespace-nowrap px-4 py-3 text-left"
    >
      <button
        type="button"
        onClick={() => onSort(field)}
        className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085] transition hover:text-[#344054]"
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

export function TimeTrackingTable({
  entries,
  sortField,
  sortDirection,
  onSort,
  onEntryClick,
}: TimeTrackingTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-[#172033]">
            Time Entries
          </h3>

          <p className="mt-0.5 text-[11px] text-[#667085]">
            {entries.length}{" "}
            {entries.length === 1
              ? "entry"
              : "entries"}{" "}
            displayed
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-[#98A2B3]">
          <span className="h-2 w-2 rounded-full bg-[#12B76A]" />

          Workforce attendance view
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1180px] w-full border-collapse">
          <thead className="border-b border-[#E4E7EC] bg-[#F9FAFB]">
            <tr>
              <TableHeader
                field="employeeName"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Employee
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
                field="clockIn"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Clock In
              </TableHeader>

              <TableHeader
                field="clockOut"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Clock Out
              </TableHeader>

              <TableHeader
                field="totalHours"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Hours
              </TableHeader>

              <th
                scope="col"
                className="whitespace-nowrap px-4 py-3 text-left"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                  Break
                </span>
              </th>

              <TableHeader
                field="entryType"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Type
              </TableHeader>

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
            {entries.map((entry) => {
              const statusStyle =
                STATUS_STYLES[
                  entry.status
                ];

              return (
                <tr
                  key={entry.id}
                  onClick={() =>
                    onEntryClick(entry)
                  }
                  className="group cursor-pointer bg-white transition hover:bg-[#F9FAFB]"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF2FF]">
                        <UserRound className="h-3.5 w-3.5 text-[#1677FF]" />
                      </div>

                      <div className="min-w-0">
                        <div className="truncate text-xs font-semibold text-[#172033]">
                          {
                            entry.employeeName
                          }
                        </div>

                        <div className="mt-0.5 truncate text-[10px] text-[#98A2B3]">
                          {
                            entry.employeeId
                          }{" "}
                          ·{" "}
                          {
                            entry.department
                          }
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="text-xs font-medium text-[#344054]">
                      {new Intl.DateTimeFormat(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      ).format(
                        new Date(
                          `${entry.date}T00:00:00`,
                        ),
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-3.5 w-3.5 text-[#98A2B3]" />

                      <span className="text-xs font-semibold text-[#344054]">
                        {entry.clockIn ||
                          "—"}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span className="text-xs font-semibold text-[#344054]">
                      {entry.clockOut ||
                        "—"}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="text-xs font-semibold text-[#172033]">
                      {entry.totalHours.toFixed(
                        2,
                      )}
                      h
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="text-xs text-[#475467]">
                      {
                        entry.breakMinutes
                      }{" "}
                      min
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="inline-flex whitespace-nowrap rounded-md bg-[#F2F4F7] px-2 py-1 text-[10px] font-medium text-[#475467]">
                      {
                        entry.entryType
                      }
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyle.background} ${statusStyle.text}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                      />

                      {entry.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();

                        onEntryClick(
                          entry,
                        );
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-[#98A2B3] opacity-0 transition hover:bg-[#F2F4F7] hover:text-[#344054] group-hover:opacity-100"
                      aria-label={`Open ${entry.employeeName} time entry`}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-2 border-t border-[#E4E7EC] bg-[#FCFCFD] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[10px] text-[#667085]">
          Showing{" "}
          <span className="font-semibold text-[#344054]">
            {entries.length}
          </span>{" "}
          time{" "}
          {entries.length === 1
            ? "entry"
            : "entries"}
        </p>

        <p className="text-[10px] text-[#98A2B3]">
          Select an entry to view
          attendance details.
        </p>
      </div>
    </div>
  );
}

export default TimeTrackingTable;