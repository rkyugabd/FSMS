import {
  Clock3,
  Plus,
  RefreshCw,
  Search,
  TimerReset,
} from "lucide-react";

import { useMemo, useState } from "react";

import {
  timeTrackingData,
  type TimeEntry,
  type TimeEntryStatus,
  type TimeEntryType,
} from "./timeTrackingData";

import { TimeTrackingTable } from "./components/TimeTrackingTable";
import { TimeTrackingDetails } from "./components/TimeTrackingDetails";
import { CreateTimeEntryModal } from "./components/CreateTimeEntryModal";
import { EditTimeEntryModal } from "./components/EditTimeEntryModal";
import { TimeTrackingPagination } from "./components/TimeTrackingPagination";
import { TimeTrackingEmptyState } from "./components/TimeTrackingEmptyState";

const PAGE_SIZE = 8;

type SortField =
  | "employeeName"
  | "date"
  | "clockIn"
  | "clockOut"
  | "totalHours"
  | "entryType"
  | "status";

type SortDirection = "asc" | "desc";

export function TimeTracking() {
  const [entries, setEntries] =
    useState<TimeEntry[]>(timeTrackingData);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<TimeEntryStatus | "All">("All");

  const [typeFilter, setTypeFilter] =
    useState<TimeEntryType | "All">("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [sortField, setSortField] =
    useState<SortField>("date");

  const [sortDirection, setSortDirection] =
    useState<SortDirection>("desc");

  const [selectedEntry, setSelectedEntry] =
    useState<TimeEntry | null>(null);

  const [editingEntry, setEditingEntry] =
    useState<TimeEntry | null>(null);

  const [isCreateOpen, setIsCreateOpen] =
    useState(false);

  const filteredEntries = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return entries.filter((entry) => {
      const matchesSearch =
        query.length === 0 ||
        [
          entry.id,
          entry.employeeId,
          entry.employeeName,
          entry.department,
          entry.role,
          entry.location,
          entry.entryType,
          entry.status,
          entry.notes ?? "",
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        entry.status === statusFilter;

      const matchesType =
        typeFilter === "All" ||
        entry.entryType === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    });
  }, [
    entries,
    search,
    statusFilter,
    typeFilter,
  ]);

  const sortedEntries = useMemo(() => {
    const result = [...filteredEntries];

    result.sort((a, b) => {
      let aValue: string | number = "";
      let bValue: string | number = "";

      switch (sortField) {
        case "employeeName":
          aValue = a.employeeName;
          bValue = b.employeeName;
          break;

        case "date":
          aValue = a.date;
          bValue = b.date;
          break;

        case "clockIn":
          aValue = a.clockIn;
          bValue = b.clockIn;
          break;

        case "clockOut":
          aValue = a.clockOut;
          bValue = b.clockOut;
          break;

        case "totalHours":
          aValue = a.totalHours;
          bValue = b.totalHours;
          break;

        case "entryType":
          aValue = a.entryType;
          bValue = b.entryType;
          break;

        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
      }

      const comparison =
        typeof aValue === "number" &&
        typeof bValue === "number"
          ? aValue - bValue
          : String(aValue).localeCompare(
              String(bValue),
              undefined,
              {
                numeric: true,
                sensitivity: "base",
              },
            );

      return sortDirection === "asc"
        ? comparison
        : -comparison;
    });

    return result;
  }, [
    filteredEntries,
    sortField,
    sortDirection,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      sortedEntries.length /
        PAGE_SIZE,
    ),
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const paginatedEntries = useMemo(() => {
    const start =
      (safeCurrentPage - 1) *
      PAGE_SIZE;

    return sortedEntries.slice(
      start,
      start + PAGE_SIZE,
    );
  }, [
    sortedEntries,
    safeCurrentPage,
  ]);

  const handleSearchChange = (
    value: string,
  ) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (
    value: TimeEntryStatus | "All",
  ) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleTypeChange = (
    value: TimeEntryType | "All",
  ) => {
    setTypeFilter(value);
    setCurrentPage(1);
  };

  const handleSort = (
    field: SortField,
  ) => {
    if (sortField === field) {
      setSortDirection(
        (previous) =>
          previous === "asc"
            ? "desc"
            : "asc",
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }

    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setEntries([...timeTrackingData]);
    setSearch("");
    setStatusFilter("All");
    setTypeFilter("All");
    setCurrentPage(1);
    setSortField("date");
    setSortDirection("desc");
    setSelectedEntry(null);
    setEditingEntry(null);
  };

  const handleCreateEntry = (
    entry: TimeEntry,
  ) => {
    setEntries((previous) => [
      entry,
      ...previous,
    ]);

    setIsCreateOpen(false);
    setCurrentPage(1);
  };

  const handleUpdateEntry = (
    updatedEntry: TimeEntry,
  ) => {
    setEntries((previous) =>
      previous.map((entry) =>
        entry.id === updatedEntry.id
          ? updatedEntry
          : entry,
      ),
    );

    setEditingEntry(null);

    if (
      selectedEntry?.id ===
      updatedEntry.id
    ) {
      setSelectedEntry(
        updatedEntry,
      );
    }
  };

  const handleDeleteEntry = (
    entryId: string,
  ) => {
    setEntries((previous) =>
      previous.filter(
        (entry) =>
          entry.id !== entryId,
      ),
    );

    setSelectedEntry(null);
  };

  const totalHours = useMemo(
    () =>
      entries.reduce(
        (sum, entry) =>
          sum + entry.totalHours,
        0,
      ),
    [entries],
  );

  const pendingCount = entries.filter(
    (entry) =>
      entry.status === "Pending",
  ).length;

  const clockedInCount = entries.filter(
    (entry) =>
      entry.status === "Clocked In",
  ).length;

  const overtimeHours = entries
    .filter(
      (entry) =>
        entry.entryType ===
        "Overtime",
    )
    .reduce(
      (sum, entry) =>
        sum + entry.totalHours,
      0,
    );

  return (
    <div className="space-y-5 text-[#172033]">
      {/* PAGE HEADER */}

      <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2FF]">
              <Clock3 className="h-4 w-4 text-[#1677FF]" />
            </div>

            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#344054]">
              Workforce Management
            </span>
          </div>

          <h1 className="text-[25px] font-semibold tracking-tight text-[#172033]">
            Time Tracking
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-[#475467]">
            Track employee attendance,
            working hours, breaks,
            overtime and time-entry
            approvals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            className="flex h-9 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs font-medium text-[#344054] shadow-sm transition hover:bg-[#F9FAFB]"
          >
            <RefreshCw className="h-3.5 w-3.5 text-[#667085]" />

            Refresh
          </button>

          <button
            type="button"
            onClick={() =>
              setIsCreateOpen(true)
            }
            className="flex h-9 items-center gap-2 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white shadow-sm shadow-blue-900/20 transition hover:bg-[#1264D8] active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />

            New Time Entry
          </button>
        </div>
      </section>

      {/* SUMMARY */}

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Total Hours
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#172033]">
            {totalHours.toFixed(1)}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Recorded hours
          </p>
        </div>

        <div className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Clocked In
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#087443]">
            {clockedInCount}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Currently working
          </p>
        </div>

        <div className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Pending Approval
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#B54708]">
            {pendingCount}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Entries requiring review
          </p>
        </div>

        <div className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Overtime Hours
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#6941C6]">
            {overtimeHours.toFixed(1)}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Overtime recorded
          </p>
        </div>
      </section>

      {/* SEARCH AND FILTERS */}

      <section className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex flex-col gap-4">
          <div className="relative min-w-0 lg:max-w-md">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A2B3]" />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                handleSearchChange(
                  event.target.value,
                )
              }
              placeholder="Search employee, department, role..."
              className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white pl-9 pr-3 text-xs text-[#344054] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
                Status
              </span>

              {[
                "All",
                "Clocked In",
                "Clocked Out",
                "On Break",
                "Pending",
                "Approved",
                "Rejected",
              ].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() =>
                    handleStatusChange(
                      status as
                        | TimeEntryStatus
                        | "All",
                    )
                  }
                  className={[
                    "h-8 rounded-lg px-3 text-[11px] font-medium transition",
                    statusFilter ===
                    status
                      ? "bg-[#172033] text-white"
                      : "border border-[#D0D5DD] bg-white text-[#475467] hover:bg-[#F9FAFB]",
                  ].join(" ")}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
                Type
              </span>

              {[
                "All",
                "Regular",
                "Overtime",
                "Training",
                "Meeting",
                "Leave",
              ].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    handleTypeChange(
                      type as
                        | TimeEntryType
                        | "All",
                    )
                  }
                  className={[
                    "h-8 rounded-lg px-3 text-[11px] font-medium transition",
                    typeFilter === type
                      ? "bg-[#EAF2FF] text-[#1355B5]"
                      : "border border-[#D0D5DD] bg-white text-[#475467] hover:bg-[#F9FAFB]",
                  ].join(" ")}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TABLE */}

      <section>
        {paginatedEntries.length >
        0 ? (
          <>
            <TimeTrackingTable
              entries={
                paginatedEntries
              }
              sortField={sortField}
              sortDirection={
                sortDirection
              }
              onSort={handleSort}
              onEntryClick={
                setSelectedEntry
              }
            />

            <TimeTrackingPagination
              currentPage={
                safeCurrentPage
              }
              totalPages={
                totalPages
              }
              totalItems={
                sortedEntries.length
              }
              pageSize={PAGE_SIZE}
              onPageChange={
                setCurrentPage
              }
            />
          </>
        ) : (
          <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <TimeTrackingEmptyState
              title={
                search ||
                statusFilter !==
                  "All" ||
                typeFilter !== "All"
                  ? "No matching time entries"
                  : "No time entries found"
              }
              description={
                search ||
                statusFilter !==
                  "All" ||
                typeFilter !== "All"
                  ? "Try changing your search or filters."
                  : "There are currently no time entries recorded."
              }
              actionLabel="New Time Entry"
              onAction={() =>
                setIsCreateOpen(true)
              }
            />
          </div>
        )}
      </section>

      {/* DETAILS */}

      {selectedEntry && (
        <section className="relative">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
                Selected Time Entry
              </p>

              <p className="mt-0.5 text-xs text-[#667085]">
                Attendance and working
                hours details
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setSelectedEntry(null)
              }
              className="text-xs font-medium text-[#667085] transition hover:text-[#172033]"
            >
              Close
            </button>
          </div>

          <TimeTrackingDetails
            entry={selectedEntry}
          />

          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setEditingEntry(
                  selectedEntry,
                );
                setSelectedEntry(
                  null,
                );
              }}
              className="h-9 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white transition hover:bg-[#1264D8]"
            >
              Edit Entry
            </button>

            <button
              type="button"
              onClick={() =>
                handleDeleteEntry(
                  selectedEntry.id,
                )
              }
              className="h-9 rounded-lg border border-[#FECDCA] bg-white px-4 text-xs font-semibold text-[#B42318] transition hover:bg-[#FEF3F2]"
            >
              Delete Entry
            </button>
          </div>
        </section>
      )}

      {/* CREATE */}

      {isCreateOpen && (
        <CreateTimeEntryModal
          isOpen={isCreateOpen}
          onClose={() =>
            setIsCreateOpen(false)
          }
          onCreate={
            handleCreateEntry
          }
        />
      )}

      {/* EDIT */}

      {editingEntry && (
        <EditTimeEntryModal
          isOpen={
            editingEntry !== null
          }
          entry={editingEntry}
          onClose={() =>
            setEditingEntry(null)
          }
          onSave={
            handleUpdateEntry
          }
        />
      )}
    </div>
  );
}

export default TimeTracking;