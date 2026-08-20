import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Clock3,
  Monitor,
  MoreHorizontal,
  UserRound,
} from "lucide-react";

import type {
  Simulator,
  SimulatorStatus,
} from "../simulatorsData";

type SortField =
  | "simulatorId"
  | "name"
  | "type"
  | "model"
  | "status"
  | "location"
  | "hoursUsed"
  | "nextMaintenance";

type SortDirection = "asc" | "desc";

type SimulatorsTableProps = {
  simulators: Simulator[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onSimulatorClick: (
    simulator: Simulator,
  ) => void;
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

export function SimulatorsTable({
  simulators,
  sortField,
  sortDirection,
  onSort,
  onSimulatorClick,
}: SimulatorsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      {/* HEADER */}

      <div className="flex items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-[#172033]">
            Simulators
          </h3>

          <p className="mt-0.5 text-[11px] text-[#667085]">
            {simulators.length}{" "}
            {simulators.length === 1
              ? "simulator"
              : "simulators"}{" "}
            displayed
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-[#98A2B3]">
          <span className="h-2 w-2 rounded-full bg-[#12B76A]" />

          Training equipment view
        </div>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">
        <table className="min-w-[1220px] w-full border-collapse">
          <thead className="border-b border-[#E4E7EC] bg-[#F9FAFB]">
            <tr>
              <TableHeader
                field="simulatorId"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Simulator
              </TableHeader>

              <TableHeader
                field="name"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Name
              </TableHeader>

              <TableHeader
                field="type"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Type
              </TableHeader>

              <TableHeader
                field="model"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Model
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
                field="status"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Status
              </TableHeader>

              <TableHeader
                field="hoursUsed"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Hours Used
              </TableHeader>

              <TableHeader
                field="nextMaintenance"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Next Maintenance
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
            {simulators.map((simulator) => {
              const statusStyle =
                STATUS_STYLES[
                  simulator.status
                ];

              return (
                <tr
                  key={simulator.id}
                  onClick={() =>
                    onSimulatorClick(
                      simulator,
                    )
                  }
                  className="group cursor-pointer bg-white transition hover:bg-[#F9FAFB]"
                >
                  {/* Simulator */}

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF2FF]">
                        <Monitor className="h-3.5 w-3.5 text-[#1677FF]" />
                      </div>

                      <div className="min-w-0">
                        <div className="truncate text-xs font-semibold text-[#172033]">
                          {
                            simulator.simulatorId
                          }
                        </div>

                        <div className="mt-0.5 truncate text-[10px] text-[#98A2B3]">
                          Capacity{" "}
                          {simulator.capacity}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Name */}

                  <td className="px-4 py-3">
                    <div className="max-w-[190px] truncate text-xs font-semibold text-[#344054]">
                      {simulator.name}
                    </div>

                    <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-[#98A2B3]">
                      <UserRound className="h-3 w-3" />

                      {simulator.instructor}
                    </div>
                  </td>

                  {/* Type */}

                  <td className="px-4 py-3">
                    <span className="inline-flex max-w-[190px] rounded-md bg-[#F2F4F7] px-2 py-1 text-[10px] font-medium text-[#475467]">
                      {simulator.type}
                    </span>
                  </td>

                  {/* Model */}

                  <td className="px-4 py-3">
                    <div className="text-xs font-semibold text-[#344054]">
                      {simulator.model}
                    </div>
                  </td>

                  {/* Location */}

                  <td className="px-4 py-3">
                    <div className="text-xs font-medium text-[#344054]">
                      {simulator.location}
                    </div>
                  </td>

                  {/* Status */}

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyle.background} ${statusStyle.text}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                      />

                      {simulator.status}
                    </span>
                  </td>

                  {/* Hours */}

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-3.5 w-3.5 text-[#98A2B3]" />

                      <div>
                        <div className="text-xs font-semibold text-[#344054]">
                          {simulator.hoursUsed.toLocaleString()}
                        </div>

                        <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                          operating hours
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Maintenance */}

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
                          `${simulator.nextMaintenance}T00:00:00`,
                        ),
                      )}
                    </div>

                    <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                      scheduled service
                    </div>
                  </td>

                  {/* Actions */}

                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();

                        onSimulatorClick(
                          simulator,
                        );
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-[#98A2B3] opacity-0 transition hover:bg-[#F2F4F7] hover:text-[#344054] group-hover:opacity-100"
                      aria-label={`Open ${simulator.simulatorId}`}
                      title={`Open ${simulator.simulatorId}`}
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

      {/* FOOTER */}

      <div className="flex flex-col gap-2 border-t border-[#E4E7EC] bg-[#FCFCFD] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[10px] text-[#667085]">
          Showing{" "}
          <span className="font-semibold text-[#344054]">
            {simulators.length}
          </span>{" "}
          simulator
          {simulators.length === 1
            ? ""
            : "s"}
        </p>

        <p className="text-[10px] text-[#98A2B3]">
          Select a simulator to view
          operational details.
        </p>
      </div>
    </div>
  );
}

export default SimulatorsTable;