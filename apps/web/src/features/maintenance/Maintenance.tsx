import {
  AlertTriangle,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Wrench,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  maintenanceData,
  type MaintenanceRecord,
  type MaintenanceStatus,
} from "./maintenanceData";

import {
  MaintenanceTable,
  type MaintenanceSortDirection,
  type MaintenanceSortField,
} from "./components/MaintenanceTable";

import { MaintenanceDetails } from "./components/MaintenanceDetails";

import { CreateMaintenanceModal } from "./components/CreateMaintenanceModal";

import { EditMaintenanceModal } from "./components/EditMaintenanceModal";

import { MaintenancePagination } from "./components/MaintenancePagination";

import { MaintenanceEmptyState } from "./components/MaintenanceEmptyState";

const PAGE_SIZE = 8;

export function Maintenance() {
  const [maintenanceRecords, setMaintenanceRecords] =
    useState<MaintenanceRecord[]>(
      maintenanceData,
    );

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<
      MaintenanceStatus | "All"
    >("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [sortField, setSortField] =
    useState<MaintenanceSortField>(
      "nextDueDate",
    );

  const [sortDirection, setSortDirection] =
    useState<MaintenanceSortDirection>(
      "asc",
    );

  const [
    selectedMaintenance,
    setSelectedMaintenance,
  ] =
    useState<MaintenanceRecord | null>(
      null,
    );

  const [
    editingMaintenance,
    setEditingMaintenance,
  ] =
    useState<MaintenanceRecord | null>(
      null,
    );

  const [
    isCreateOpen,
    setIsCreateOpen,
  ] = useState(false);

  /*
   * =========================================================
   * FILTER
   * =========================================================
   */

  const filteredMaintenance =
    useMemo(() => {
      const query = search
        .trim()
        .toLowerCase();

      return maintenanceRecords.filter(
        (maintenance) => {
          const matchesSearch =
            query.length === 0 ||
            [
              maintenance.id,
              maintenance.aircraft,
              maintenance.registration,
              maintenance.aircraftType,
              maintenance.maintenanceType,
              maintenance.description,
              maintenance.technician,
              maintenance.workOrder,
              maintenance.status,
            ]
              .join(" ")
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            statusFilter === "All" ||
            maintenance.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        },
      );
    }, [
      maintenanceRecords,
      search,
      statusFilter,
    ]);

  /*
   * =========================================================
   * SORT
   * =========================================================
   */

  const sortedMaintenance =
    useMemo(() => {
      const result = [
        ...filteredMaintenance,
      ];

      result.sort((a, b) => {
        let aValue:
          | string
          | number = "";

        let bValue:
          | string
          | number = "";

        switch (sortField) {
          case "aircraft":
            aValue = a.registration;
            bValue = b.registration;
            break;

          case "maintenanceType":
            aValue =
              a.maintenanceType;
            bValue =
              b.maintenanceType;
            break;

          case "status":
            aValue = a.status;
            bValue = b.status;
            break;

          case "lastServiceDate":
            aValue =
              a.lastServiceDate;
            bValue =
              b.lastServiceDate;
            break;

          case "nextDueDate":
            aValue = a.nextDueDate;
            bValue = b.nextDueDate;
            break;

          case "currentHours":
            aValue = a.currentHours;
            bValue = b.currentHours;
            break;

          case "technician":
            aValue = a.technician;
            bValue = b.technician;
            break;

          case "cost":
            aValue = a.cost;
            bValue = b.cost;
            break;
        }

        if (
          typeof aValue ===
            "number" &&
          typeof bValue ===
            "number"
        ) {
          return sortDirection ===
            "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        const comparison =
          String(aValue).localeCompare(
            String(bValue),
            undefined,
            {
              numeric: true,
              sensitivity: "base",
            },
          );

        return sortDirection ===
          "asc"
          ? comparison
          : -comparison;
      });

      return result;
    }, [
      filteredMaintenance,
      sortField,
      sortDirection,
    ]);

  /*
   * =========================================================
   * PAGINATION
   * =========================================================
   */

  const totalPages = Math.max(
    1,
    Math.ceil(
      sortedMaintenance.length /
        PAGE_SIZE,
    ),
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const paginatedMaintenance =
    useMemo(() => {
      const start =
        (safeCurrentPage - 1) *
        PAGE_SIZE;

      return sortedMaintenance.slice(
        start,
        start + PAGE_SIZE,
      );
    }, [
      sortedMaintenance,
      safeCurrentPage,
    ]);

  /*
   * =========================================================
   * STATUS COUNTS
   * =========================================================
   */

  const statusCounts = useMemo(() => {
    return {
      total:
        maintenanceRecords.length,

      dueSoon:
        maintenanceRecords.filter(
          (maintenance) =>
            maintenance.status ===
            "Due Soon",
        ).length,

      overdue:
        maintenanceRecords.filter(
          (maintenance) =>
            maintenance.status ===
            "Overdue",
        ).length,

      inProgress:
        maintenanceRecords.filter(
          (maintenance) =>
            maintenance.status ===
            "In Progress",
        ).length,

      completed:
        maintenanceRecords.filter(
          (maintenance) =>
            maintenance.status ===
            "Completed",
        ).length,
    };
  }, [maintenanceRecords]);

  /*
   * =========================================================
   * HANDLERS
   * =========================================================
   */

  const handleSearchChange = (
    value: string,
  ) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (
    value:
      | MaintenanceStatus
      | "All",
  ) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSort = (
    field: MaintenanceSortField,
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
    setMaintenanceRecords([
      ...maintenanceData,
    ]);

    setSearch("");

    setStatusFilter("All");

    setCurrentPage(1);

    setSortField(
      "nextDueDate",
    );

    setSortDirection("asc");

    setSelectedMaintenance(null);

    setEditingMaintenance(null);
  };

  const handleCreateMaintenance = (
    maintenance: MaintenanceRecord,
  ) => {
    setMaintenanceRecords(
      (previous) => [
        maintenance,
        ...previous,
      ],
    );

    setIsCreateOpen(false);

    setCurrentPage(1);
  };

  const handleUpdateMaintenance = (
    updatedMaintenance: MaintenanceRecord,
  ) => {
    setMaintenanceRecords(
      (previous) =>
        previous.map(
          (maintenance) =>
            maintenance.id ===
            updatedMaintenance.id
              ? updatedMaintenance
              : maintenance,
        ),
    );

    setEditingMaintenance(null);

    if (
      selectedMaintenance?.id ===
      updatedMaintenance.id
    ) {
      setSelectedMaintenance(
        updatedMaintenance,
      );
    }
  };

  const handleDeleteMaintenance = (
    maintenanceId: string,
  ) => {
    setMaintenanceRecords(
      (previous) =>
        previous.filter(
          (maintenance) =>
            maintenance.id !==
            maintenanceId,
        ),
    );

    setSelectedMaintenance(null);

    setEditingMaintenance(null);
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="space-y-5 text-[#172033]">
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2FF]">
              <Wrench className="h-4 w-4 text-[#1677FF]" />
            </div>

            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#344054]">
              Aircraft Maintenance
            </span>
          </div>

          <h1 className="text-[25px] font-semibold tracking-tight text-[#172033]">
            Maintenance
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-[#475467]">
            Manage aircraft maintenance,
            inspections, service
            intervals, technicians and
            maintenance status.
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
            className="flex h-9 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs font-medium text-[#344054] shadow-sm transition hover:bg-[#F9FAFB]"
          >
            <SlidersHorizontal className="h-4 w-4 text-[#667085]" />

            View Options
          </button>

          <button
            type="button"
            onClick={() =>
              setIsCreateOpen(true)
            }
            className="flex h-9 items-center gap-2 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white shadow-sm shadow-blue-900/20 transition hover:bg-[#1264D8] active:scale-[0.98]"
          >
            <Plus className="h-4 w-4 text-white" />

            <span className="text-white">
              New Maintenance
            </span>
          </button>
        </div>
      </section>

      {/* =====================================================
          SUMMARY
          ===================================================== */}

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <button
          type="button"
          onClick={() =>
            handleStatusChange("All")
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Total Records
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#172033]">
            {statusCounts.total}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Maintenance schedule
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            handleStatusChange(
              "Due Soon",
            )
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Due Soon
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#B54708]">
            {statusCounts.dueSoon}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Upcoming maintenance
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            handleStatusChange(
              "Overdue",
            )
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Overdue
          </p>

          <p className="mt-2 flex items-center gap-2 text-2xl font-semibold tracking-tight text-[#B42318]">
            {statusCounts.overdue}

            {statusCounts.overdue >
              0 && (
              <AlertTriangle className="h-5 w-5" />
            )}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Requires immediate attention
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            handleStatusChange(
              "In Progress",
            )
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            In Progress
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#6941C6]">
            {statusCounts.inProgress}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Currently being serviced
          </p>
        </button>
      </section>

      {/* =====================================================
          SEARCH / FILTER
          ===================================================== */}

      <section className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative min-w-0 flex-1 lg:max-w-md">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A2B3]" />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                handleSearchChange(
                  event.target.value,
                )
              }
              placeholder="Search aircraft, work order, technician..."
              className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white pl-9 pr-3 text-xs text-[#344054] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
              Status
            </span>

            {[
              "All",
              "Scheduled",
              "Due Soon",
              "In Progress",
              "Completed",
              "Overdue",
              "Cancelled",
            ].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() =>
                  handleStatusChange(
                    status as
                      | MaintenanceStatus
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
        </div>
      </section>

      {/* =====================================================
          TABLE
          ===================================================== */}

      <section>
        {paginatedMaintenance.length >
        0 ? (
          <>
            <MaintenanceTable
              maintenanceRecords={
                paginatedMaintenance
              }
              sortField={sortField}
              sortDirection={
                sortDirection
              }
              onSort={handleSort}
              onMaintenanceClick={
                setSelectedMaintenance
              }
            />

            <MaintenancePagination
              currentPage={
                safeCurrentPage
              }
              totalPages={
                totalPages
              }
              totalItems={
                sortedMaintenance.length
              }
              pageSize={PAGE_SIZE}
              onPageChange={
                setCurrentPage
              }
            />
          </>
        ) : (
          <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <MaintenanceEmptyState
              title={
                search ||
                statusFilter !==
                  "All"
                  ? "No matching maintenance records"
                  : "No maintenance records"
              }
              description={
                search ||
                statusFilter !==
                  "All"
                  ? "Try changing your search or status filter."
                  : "There are currently no maintenance records in the system."
              }
              actionLabel="New Maintenance"
              onAction={() =>
                setIsCreateOpen(true)
              }
            />
          </div>
        )}
      </section>

      {/* =====================================================
          DETAILS
          ===================================================== */}

      {selectedMaintenance && (
        <section className="relative">
          <MaintenanceDetails
            maintenance={
              selectedMaintenance
            }
            onClose={() =>
              setSelectedMaintenance(
                null,
              )
            }
            onEdit={(maintenance) => {
              setEditingMaintenance(
                maintenance,
              );

              setSelectedMaintenance(
                null,
              );
            }}
            onDelete={
              handleDeleteMaintenance
            }
          />
        </section>
      )}

      {/* =====================================================
          CREATE
          ===================================================== */}

      {isCreateOpen && (
        <CreateMaintenanceModal
          isOpen={isCreateOpen}
          onClose={() =>
            setIsCreateOpen(false)
          }
          onCreate={
            handleCreateMaintenance
          }
        />
      )}

      {/* =====================================================
          EDIT
          ===================================================== */}

      {editingMaintenance && (
        <EditMaintenanceModal
          isOpen={
            editingMaintenance !==
            null
          }
          maintenance={
            editingMaintenance
          }
          onClose={() =>
            setEditingMaintenance(
              null,
            )
          }
          onSave={
            handleUpdateMaintenance
          }
        />
      )}
    </div>
  );
}

export default Maintenance;