import {
  Activity,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Monitor,
  Wrench,
} from "lucide-react";

import { useMemo, useState } from "react";

import {
  simulatorData,
  type Simulator,
  type SimulatorStatus,
} from "./simulatorsData";

import { SimulatorsPagination } from "./components/SimulatorsPagination";
import { SimulatorsEmptyState } from "./components/SimulatorsEmptyState";
import { SimulatorsTable } from "./components/SimulatorsTable";
import { SimulatorDetails } from "./components/SimulatorDetails";
import { CreateSimulatorModal } from "./components/CreateSimulatorModal";
import { EditSimulatorModal } from "./components/EditSimulatorModal";

const PAGE_SIZE = 8;

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

export function Simulators() {
  const [simulators, setSimulators] =
    useState<Simulator[]>(simulatorData);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<SimulatorStatus | "All">("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [sortField, setSortField] =
    useState<SortField>("simulatorId");

  const [sortDirection, setSortDirection] =
    useState<SortDirection>("asc");

  const [selectedSimulator, setSelectedSimulator] =
    useState<Simulator | null>(null);

  const [editingSimulator, setEditingSimulator] =
    useState<Simulator | null>(null);

  const [isCreateOpen, setIsCreateOpen] =
    useState(false);

  /*
   * =========================================================
   * FILTER
   * =========================================================
   */

  const filteredSimulators = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return simulators.filter((simulator) => {
      const matchesSearch =
        query.length === 0 ||
        [
          simulator.simulatorId,
          simulator.name,
          simulator.type,
          simulator.model,
          simulator.status,
          simulator.location,
          simulator.instructor,
          simulator.notes ?? "",
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        simulator.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [simulators, search, statusFilter]);

  /*
   * =========================================================
   * SORT
   * =========================================================
   */

  const sortedSimulators = useMemo(() => {
    const result = [...filteredSimulators];

    result.sort((a, b) => {
      let aValue: string | number = "";
      let bValue: string | number = "";

      switch (sortField) {
        case "simulatorId":
          aValue = a.simulatorId;
          bValue = b.simulatorId;
          break;

        case "name":
          aValue = a.name;
          bValue = b.name;
          break;

        case "type":
          aValue = a.type;
          bValue = b.type;
          break;

        case "model":
          aValue = a.model;
          bValue = b.model;
          break;

        case "status":
          aValue = a.status;
          bValue = b.status;
          break;

        case "location":
          aValue = a.location;
          bValue = b.location;
          break;

        case "hoursUsed":
          aValue = a.hoursUsed;
          bValue = b.hoursUsed;
          break;

        case "nextMaintenance":
          aValue = a.nextMaintenance;
          bValue = b.nextMaintenance;
          break;
      }

      let comparison: number;

      if (
        typeof aValue === "number" &&
        typeof bValue === "number"
      ) {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue).localeCompare(
          String(bValue),
          undefined,
          {
            numeric: true,
            sensitivity: "base",
          },
        );
      }

      return sortDirection === "asc"
        ? comparison
        : -comparison;
    });

    return result;
  }, [
    filteredSimulators,
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
      sortedSimulators.length / PAGE_SIZE,
    ),
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const paginatedSimulators = useMemo(() => {
    const start =
      (safeCurrentPage - 1) * PAGE_SIZE;

    return sortedSimulators.slice(
      start,
      start + PAGE_SIZE,
    );
  }, [
    sortedSimulators,
    safeCurrentPage,
  ]);

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
    value: SimulatorStatus | "All",
  ) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSort = (
    field: SortField,
  ) => {
    if (sortField === field) {
      setSortDirection((previous) =>
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
    setSimulators([...simulatorData]);
    setSearch("");
    setStatusFilter("All");
    setCurrentPage(1);
    setSortField("simulatorId");
    setSortDirection("asc");
    setSelectedSimulator(null);
    setEditingSimulator(null);
  };

  const handleCreateSimulator = (
    simulator: Simulator,
  ) => {
    setSimulators((previous) => [
      simulator,
      ...previous,
    ]);

    setIsCreateOpen(false);
    setCurrentPage(1);
  };

  const handleUpdateSimulator = (
    updatedSimulator: Simulator,
  ) => {
    setSimulators((previous) =>
      previous.map((simulator) =>
        simulator.id === updatedSimulator.id
          ? updatedSimulator
          : simulator,
      ),
    );

    setEditingSimulator(null);

    if (
      selectedSimulator?.id ===
      updatedSimulator.id
    ) {
      setSelectedSimulator(
        updatedSimulator,
      );
    }
  };

  const handleDeleteSimulator = (
    simulatorId: string,
  ) => {
    setSimulators((previous) =>
      previous.filter(
        (simulator) =>
          simulator.id !== simulatorId,
      ),
    );

    setSelectedSimulator(null);
  };

  /*
   * =========================================================
   * STATUS COUNTS
   * =========================================================
   */

  const statusCounts = useMemo(() => {
    return {
      total: simulators.length,

      available: simulators.filter(
        (simulator) =>
          simulator.status === "Available",
      ).length,

      inUse: simulators.filter(
        (simulator) =>
          simulator.status === "In Use",
      ).length,

      maintenance: simulators.filter(
        (simulator) =>
          simulator.status === "Maintenance",
      ).length,

      offline: simulators.filter(
        (simulator) =>
          simulator.status === "Offline",
      ).length,
    };
  }, [simulators]);

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="space-y-5 text-[#172033]">
      {/* PAGE HEADER */}

      <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2FF]">
              <Monitor className="h-4 w-4 text-[#1677FF]" />
            </div>

            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#344054]">
              Training Equipment
            </span>
          </div>

          <h1 className="text-[25px] font-semibold tracking-tight text-[#172033]">
            Simulators
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-[#475467]">
            Manage flight simulators,
            training devices, availability,
            maintenance and utilization.
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
            <Plus className="h-4 w-4" />

            New Simulator
          </button>
        </div>
      </section>

      {/* STATUS SUMMARY */}

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <button
          type="button"
          onClick={() =>
            handleStatusChange("All")
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Total Simulators
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#172033]">
            {statusCounts.total}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Training equipment
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            handleStatusChange(
              "Available",
            )
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Available
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#087443]">
            {statusCounts.available}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Ready for training
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            handleStatusChange("In Use")
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            In Use
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#1355B5]">
            {statusCounts.inUse}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Active training
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            handleStatusChange(
              "Maintenance",
            )
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Maintenance
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#B54708]">
            {statusCounts.maintenance}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Requires attention
          </p>
        </button>
      </section>

      {/* SEARCH / FILTER */}

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
              placeholder="Search simulator, model, location..."
              className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white pl-9 pr-3 text-xs text-[#344054] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
              Status
            </span>

            {[
              "All",
              "Available",
              "In Use",
              "Maintenance",
              "Offline",
            ].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() =>
                  handleStatusChange(
                    status as
                      | SimulatorStatus
                      | "All",
                  )
                }
                className={[
                  "h-8 rounded-lg px-3 text-[11px] font-medium transition",
                  statusFilter === status
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

      {/* TABLE */}

      <section>
        {paginatedSimulators.length > 0 ? (
          <>
            <SimulatorsTable
              simulators={
                paginatedSimulators
              }
              sortField={sortField}
              sortDirection={
                sortDirection
              }
              onSort={handleSort}
              onSimulatorClick={
                setSelectedSimulator
              }
            />

            <SimulatorsPagination
              currentPage={
                safeCurrentPage
              }
              totalPages={totalPages}
              totalItems={
                sortedSimulators.length
              }
              pageSize={PAGE_SIZE}
              onPageChange={
                setCurrentPage
              }
            />
          </>
        ) : (
          <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <SimulatorsEmptyState
              title={
                search ||
                statusFilter !== "All"
                  ? "No matching simulators"
                  : "No simulators found"
              }
              description={
                search ||
                statusFilter !== "All"
                  ? "Try changing your search or status filter."
                  : "There are currently no simulators in the training equipment inventory."
              }
              actionLabel="New Simulator"
              onAction={() =>
                setIsCreateOpen(true)
              }
            />
          </div>
        )}
      </section>

      {/* DETAILS */}

      {selectedSimulator && (
        <section className="relative">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
                Selected Simulator
              </p>

              <p className="mt-0.5 text-xs text-[#667085]">
                Training equipment details
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setSelectedSimulator(null)
              }
              className="text-xs font-medium text-[#667085] transition hover:text-[#172033]"
            >
              Close
            </button>
          </div>

          <SimulatorDetails
            simulator={selectedSimulator}
          />

          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setEditingSimulator(
                  selectedSimulator,
                );
                setSelectedSimulator(null);
              }}
              className="h-9 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white transition hover:bg-[#1264D8]"
            >
              Edit Simulator
            </button>

            <button
              type="button"
              onClick={() =>
                handleDeleteSimulator(
                  selectedSimulator.id,
                )
              }
              className="h-9 rounded-lg border border-[#FECDCA] bg-white px-4 text-xs font-semibold text-[#B42318] transition hover:bg-[#FEF3F2]"
            >
              Delete Simulator
            </button>
          </div>
        </section>
      )}

      {/* CREATE */}

      {isCreateOpen && (
        <CreateSimulatorModal
          isOpen={isCreateOpen}
          onClose={() =>
            setIsCreateOpen(false)
          }
          onCreate={
            handleCreateSimulator
          }
        />
      )}

      {/* EDIT */}

      {editingSimulator && (
        <EditSimulatorModal
          isOpen={
            editingSimulator !== null
          }
          simulator={editingSimulator}
          onClose={() =>
            setEditingSimulator(null)
          }
          onSave={handleUpdateSimulator}
        />
      )}
    </div>
  );
}

export default Simulators;