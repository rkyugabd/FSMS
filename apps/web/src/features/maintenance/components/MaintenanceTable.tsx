import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CalendarDays,
  Clock3,
  MoreHorizontal,
  Plane,
  Wrench,
} from "lucide-react";

import type {
  MaintenanceRecord,
  MaintenanceStatus,
} from "../maintenanceData";

export type MaintenanceSortField =
  | "aircraft"
  | "maintenanceType"
  | "status"
  | "lastServiceDate"
  | "nextDueDate"
  | "currentHours"
  | "technician"
  | "cost";

export type MaintenanceSortDirection =
  | "asc"
  | "desc";

type MaintenanceTableProps = {
  maintenanceRecords: MaintenanceRecord[];
  sortField: MaintenanceSortField;
  sortDirection: MaintenanceSortDirection;
  onSort: (
    field: MaintenanceSortField,
  ) => void;
  onMaintenanceClick: (
    maintenance: MaintenanceRecord,
  ) => void;
};

const STATUS_STYLES: Record<
  MaintenanceStatus,
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

  "Due Soon": {
    background: "bg-[#FFFAEB]",
    text: "text-[#B54708]",
    dot: "bg-[#F79009]",
  },

  "In Progress": {
    background: "bg-[#F2EDFF]",
    text: "text-[#6941C6]",
    dot: "bg-[#7F56D9]",
  },

  Completed: {
    background: "bg-[#E8F8F1]",
    text: "text-[#087443]",
    dot: "bg-[#12B76A]",
  },

  Overdue: {
    background: "bg-[#FEF3F2]",
    text: "text-[#B42318]",
    dot: "bg-[#F04438]",
  },

  Cancelled: {
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
  field: MaintenanceSortField;
  activeField: MaintenanceSortField;
  direction: MaintenanceSortDirection;
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
  field: MaintenanceSortField;
  activeField: MaintenanceSortField;
  direction: MaintenanceSortDirection;
  onSort: (
    field: MaintenanceSortField,
  ) => void;
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
  value: string,
): string {
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

export function MaintenanceTable({
  maintenanceRecords,
  sortField,
  sortDirection,
  onSort,
  onMaintenanceClick,
}: MaintenanceTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-[#172033]">
            Maintenance Records
          </h3>

          <p className="mt-0.5 text-[11px] text-[#667085]">
            {maintenanceRecords.length}{" "}
            {maintenanceRecords.length === 1
              ? "record"
              : "records"}{" "}
            displayed
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-[#98A2B3]">
          <span className="h-2 w-2 rounded-full bg-[#12B76A]" />

          Maintenance operations view
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="min-w-[1350px] w-full border-collapse">
          <thead className="border-b border-[#E4E7EC] bg-[#F9FAFB]">
            <tr>
              <TableHeader
                field="aircraft"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Aircraft
              </TableHeader>

              <TableHeader
                field="maintenanceType"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Maintenance
              </TableHeader>

              <TableHeader
                field="lastServiceDate"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Last Service
              </TableHeader>

              <TableHeader
                field="nextDueDate"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Next Due
              </TableHeader>

              <TableHeader
                field="currentHours"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Hours
              </TableHeader>

              <TableHeader
                field="technician"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Technician
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
                field="cost"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Cost
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
            {maintenanceRecords.length ===
            0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="px-6 py-16 text-center"
                >
                  <div className="mx-auto flex max-w-sm flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2F4F7]">
                      <Wrench className="h-4 w-4 text-[#98A2B3]" />
                    </div>

                    <h4 className="mt-3 text-sm font-semibold text-[#344054]">
                      No maintenance records
                    </h4>

                    <p className="mt-1 text-xs text-[#667085]">
                      Try changing your
                      filters or search
                      criteria.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              maintenanceRecords.map(
                (maintenance) => {
                  const statusStyle =
                    STATUS_STYLES[
                      maintenance.status
                    ];

                  return (
                    <tr
                      key={maintenance.id}
                      onClick={() =>
                        onMaintenanceClick(
                          maintenance,
                        )
                      }
                      className="group cursor-pointer bg-white transition hover:bg-[#F9FAFB]"
                    >
                      {/* Aircraft */}

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF2FF]">
                            <Plane className="h-3.5 w-3.5 text-[#1677FF]" />
                          </div>

                          <div className="min-w-0">
                            <div className="truncate text-xs font-semibold text-[#172033]">
                              {
                                maintenance.registration
                              }
                            </div>

                            <div className="mt-0.5 truncate text-[10px] text-[#98A2B3]">
                              {
                                maintenance.aircraftType
                              }
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Maintenance */}

                      <td className="px-4 py-3">
                        <div className="flex items-start gap-2">
                          <Wrench className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#667085]" />

                          <div className="min-w-0">
                            <div className="truncate text-xs font-semibold text-[#344054]">
                              {
                                maintenance.maintenanceType
                              }
                            </div>

                            <div className="mt-0.5 max-w-[230px] truncate text-[10px] text-[#98A2B3]">
                              {
                                maintenance.description
                              }
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Last Service */}

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-3.5 w-3.5 text-[#98A2B3]" />

                          <div>
                            <div className="text-xs font-medium text-[#344054]">
                              {formatDate(
                                maintenance.lastServiceDate,
                              )}
                            </div>

                            <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                              {
                                maintenance.lastServiceHours
                              }{" "}
                              hrs
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Next Due */}

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {maintenance.status ===
                            "Overdue" ? (
                            <AlertTriangle className="h-3.5 w-3.5 text-[#F04438]" />
                          ) : (
                            <CalendarDays className="h-3.5 w-3.5 text-[#98A2B3]" />
                          )}

                          <div>
                            <div
                              className={`text-xs font-semibold ${
                                maintenance.status ===
                                "Overdue"
                                  ? "text-[#B42318]"
                                  : "text-[#344054]"
                              }`}
                            >
                              {formatDate(
                                maintenance.nextDueDate,
                              )}
                            </div>

                            {maintenance.nextDueHours >
                              0 && (
                              <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                                Due at{" "}
                                {
                                  maintenance.nextDueHours
                                }{" "}
                                hrs
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Hours */}

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Clock3 className="h-3.5 w-3.5 text-[#98A2B3]" />

                          <div>
                            <div className="text-xs font-semibold text-[#344054]">
                              {
                                maintenance.currentHours
                              }{" "}
                              hrs
                            </div>

                            {maintenance.nextDueHours >
                              0 && (
                              <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                                {Math.max(
                                  maintenance.nextDueHours -
                                    maintenance.currentHours,
                                  0,
                                ).toFixed(
                                  1,
                                )}{" "}
                                remaining
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Technician */}

                      <td className="px-4 py-3">
                        <span className="whitespace-nowrap text-xs font-medium text-[#344054]">
                          {
                            maintenance.technician
                          }
                        </span>

                        <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                          {
                            maintenance.workOrder
                          }
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

                          {
                            maintenance.status
                          }
                        </span>
                      </td>

                      {/* Cost */}

                      <td className="px-4 py-3">
                        <span className="whitespace-nowrap text-xs font-semibold text-[#344054]">
                          $
                          {maintenance.cost.toLocaleString(
                            "en-CA",
                            {
                              minimumFractionDigits: 2,
                            },
                          )}
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

                            onMaintenanceClick(
                              maintenance,
                            );
                          }}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-[#98A2B3] opacity-0 transition hover:bg-[#F2F4F7] hover:text-[#344054] group-hover:opacity-100"
                          aria-label={`Open maintenance record ${maintenance.id}`}
                          title={`Open ${maintenance.id}`}
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
            {maintenanceRecords.length}
          </span>{" "}
          maintenance{" "}
          {maintenanceRecords.length ===
          1
            ? "record"
            : "records"}
        </p>

        <p className="text-[10px] text-[#98A2B3]">
          Select a maintenance record
          to view operational details.
        </p>
      </div>
    </div>
  );
}