import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Clock3,
  MoreHorizontal,
  Plane,
} from "lucide-react";

import type { Aircraft } from "../aircraftData";

export type AircraftSortField =
  | "registration"
  | "aircraftType"
  | "manufacturer"
  | "totalFlightHours"
  | "location"
  | "nextMaintenanceDate"
  | "status";

export type AircraftSortDirection =
  | "asc"
  | "desc";

type AircraftTableProps = {
  aircraft: Aircraft[];
  sortField: AircraftSortField;
  sortDirection: AircraftSortDirection;
  onSort: (field: AircraftSortField) => void;
  onAircraftClick: (aircraft: Aircraft) => void;
};

const STATUS_STYLES: Record<
  Aircraft["status"],
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

  "In Flight": {
    background: "bg-[#EAF2FF]",
    text: "text-[#1355B5]",
    dot: "bg-[#1677FF]",
  },

  Maintenance: {
    background: "bg-[#FFFAEB]",
    text: "text-[#B54708]",
    dot: "bg-[#F79009]",
  },

  Reserved: {
    background: "bg-[#F2EDFF]",
    text: "text-[#6941C6]",
    dot: "bg-[#7F56D9]",
  },

  Grounded: {
    background: "bg-[#FEF3F2]",
    text: "text-[#B42318]",
    dot: "bg-[#F04438]",
  },

  Retired: {
    background: "bg-[#F2F4F7]",
    text: "text-[#475467]",
    dot: "bg-[#98A2B3]",
  },
};

function SortIcon({
  field,
  activeField,
  direction,
}: {
  field: AircraftSortField;
  activeField: AircraftSortField;
  direction: AircraftSortDirection;
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
  field: AircraftSortField;
  activeField: AircraftSortField;
  direction: AircraftSortDirection;
  onSort: (field: AircraftSortField) => void;
}) {
  return (
    <th
      scope="col"
      className="whitespace-nowrap px-4 py-3 text-left"
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

function formatDate(value: string) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    },
  ).format(new Date(`${value}T00:00:00Z`));
}

export function AircraftTable({
  aircraft,
  sortField,
  sortDirection,
  onSort,
  onAircraftClick,
}: AircraftTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-[#172033]">
            Aircraft
          </h3>

          <p className="mt-0.5 text-[11px] text-[#667085]">
            {aircraft.length}{" "}
            {aircraft.length === 1
              ? "aircraft"
              : "aircraft"}{" "}
            displayed
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-[#98A2B3]">
          <span className="h-2 w-2 rounded-full bg-[#12B76A]" />
          Live fleet view
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1100px] w-full border-collapse">
          <thead className="border-b border-[#E4E7EC] bg-[#F9FAFB]">
            <tr>
              <TableHeader
                field="registration"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Aircraft
              </TableHeader>

              <TableHeader
                field="aircraftType"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Type
              </TableHeader>

              <TableHeader
                field="manufacturer"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Manufacturer
              </TableHeader>

              <TableHeader
                field="totalFlightHours"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Flight Hours
              </TableHeader>

              <TableHeader
                field="location"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Location
              </TableHeader>

              <TableHeader
                field="nextMaintenanceDate"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Maintenance
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
            {aircraft.map((item) => {
              const statusStyle =
                STATUS_STYLES[item.status];

              return (
                <tr
                  key={item.id}
                  onClick={() =>
                    onAircraftClick(item)
                  }
                  className="group cursor-pointer bg-white transition hover:bg-[#F9FAFB]"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF2FF]">
                        <Plane className="h-3.5 w-3.5 text-[#1677FF]" />
                      </div>

                      <div className="min-w-0">
                        <div className="truncate text-xs font-semibold text-[#172033]">
                          {item.registration}
                        </div>

                        <div className="mt-0.5 truncate text-[10px] text-[#98A2B3]">
                          {item.manufacturer}{" "}
                          {item.model}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-md bg-[#F2F4F7] px-2 py-1 text-[10px] font-medium text-[#475467]">
                      {item.aircraftType}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="text-xs font-medium text-[#344054]">
                      {item.manufacturer}
                    </div>

                    <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                      {item.model}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-3.5 w-3.5 text-[#98A2B3]" />

                      <div>
                        <div className="text-xs font-semibold text-[#344054]">
                          {item.totalFlightHours.toLocaleString()}{" "}
                          h
                        </div>

                        <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                          Engine{" "}
                          {item.engineHours.toLocaleString()}{" "}
                          h
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="text-xs font-medium text-[#344054]">
                      {item.location}
                    </div>

                    <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                      {item.assignedInstructor ===
                      "N/A"
                        ? "No instructor assigned"
                        : item.assignedInstructor}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="text-xs font-medium text-[#344054]">
                      {formatDate(
                        item.nextMaintenanceDate,
                      )}
                    </div>

                    <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                      {item.nextMaintenanceHours >
                      0
                        ? `${item.nextMaintenanceHours} h remaining`
                        : "Maintenance due"}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyle.background} ${statusStyle.text}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                      />

                      {item.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onAircraftClick(item);
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-[#98A2B3] opacity-0 transition hover:bg-[#F2F4F7] hover:text-[#344054] group-hover:opacity-100"
                      aria-label={`Open ${item.registration}`}
                      title={`Open ${item.registration}`}
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
            {aircraft.length}
          </span>{" "}
          aircraft
        </p>

        <p className="text-[10px] text-[#98A2B3]">
          Select an aircraft to view fleet details.
        </p>
      </div>
    </div>
  );
}

export default AircraftTable;