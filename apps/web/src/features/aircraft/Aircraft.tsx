import {
  Plane,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { useMemo, useState } from "react";

import {
  aircraftData,
  type Aircraft,
  type AircraftStatus,
} from "./aircraftData";

import {
  AircraftTable,
  type AircraftSortDirection,
  type AircraftSortField,
} from "./components/AircraftTable";

import { AircraftDetails } from "./components/AircraftDetails";
import { CreateAircraftModal } from "./components/CreateAircraftModal";
import { EditAircraftModal } from "./components/EditAircraftModal";
import { AircraftPagination } from "./components/AircraftPagination";
import { AircraftEmptyState } from "./components/AircraftEmptyState";

const PAGE_SIZE = 8;

export function Aircraft() {
  const [aircraft, setAircraft] =
    useState<Aircraft[]>(aircraftData);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<AircraftStatus | "All">(
      "All",
    );

  const [currentPage, setCurrentPage] =
    useState(1);

  const [sortField, setSortField] =
    useState<AircraftSortField>(
      "registration",
    );

  const [sortDirection, setSortDirection] =
    useState<AircraftSortDirection>("asc");

  const [selectedAircraft, setSelectedAircraft] =
    useState<Aircraft | null>(null);

  const [editingAircraft, setEditingAircraft] =
    useState<Aircraft | null>(null);

  const [isCreateOpen, setIsCreateOpen] =
    useState(false);

  const filteredAircraft = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return aircraft.filter((item) => {
      const matchesSearch =
        query.length === 0 ||
        [
          item.registration,
          item.aircraftType,
          item.manufacturer,
          item.model,
          item.serialNumber,
          item.location,
          item.assignedInstructor,
          item.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    aircraft,
    search,
    statusFilter,
  ]);

  const sortedAircraft = useMemo(() => {
    const result = [
      ...filteredAircraft,
    ];

    result.sort((a, b) => {
      let aValue: string | number = "";
      let bValue: string | number = "";

      switch (sortField) {
        case "registration":
          aValue = a.registration;
          bValue = b.registration;
          break;

        case "aircraftType":
          aValue = a.aircraftType;
          bValue = b.aircraftType;
          break;

        case "manufacturer":
          aValue = a.manufacturer;
          bValue = b.manufacturer;
          break;

        case "totalFlightHours":
          aValue = a.totalFlightHours;
          bValue = b.totalFlightHours;
          break;

        case "location":
          aValue = a.location;
          bValue = b.location;
          break;

        case "nextMaintenanceDate":
          aValue = a.nextMaintenanceDate;
          bValue = b.nextMaintenanceDate;
          break;

        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
      }

      let comparison: number;

      if (
        typeof aValue === "number" &&
        typeof bValue === "number"
      ) {
        comparison = aValue - bValue;
      } else {
        comparison = String(
          aValue,
        ).localeCompare(
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
    filteredAircraft,
    sortField,
    sortDirection,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      sortedAircraft.length /
        PAGE_SIZE,
    ),
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const paginatedAircraft = useMemo(() => {
    const start =
      (safeCurrentPage - 1) *
      PAGE_SIZE;

    return sortedAircraft.slice(
      start,
      start + PAGE_SIZE,
    );
  }, [
    sortedAircraft,
    safeCurrentPage,
  ]);

  const handleSearchChange = (
    value: string,
  ) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (
    value: AircraftStatus | "All",
  ) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSort = (
    field: AircraftSortField,
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
    setAircraft([...aircraftData]);
    setSearch("");
    setStatusFilter("All");
    setCurrentPage(1);
    setSortField("registration");
    setSortDirection("asc");
    setSelectedAircraft(null);
    setEditingAircraft(null);
  };

  const handleCreateAircraft = (
    newAircraft: Aircraft,
  ) => {
    setAircraft((previous) => [
      newAircraft,
      ...previous,
    ]);

    setIsCreateOpen(false);
    setCurrentPage(1);
  };

  const handleUpdateAircraft = (
    updatedAircraft: Aircraft,
  ) => {
    setAircraft((previous) =>
      previous.map((item) =>
        item.id === updatedAircraft.id
          ? updatedAircraft
          : item,
      ),
    );

    setEditingAircraft(null);

    if (
      selectedAircraft?.id ===
      updatedAircraft.id
    ) {
      setSelectedAircraft(
        updatedAircraft,
      );
    }
  };

  const handleDeleteAircraft = (
    aircraftId: string,
  ) => {
    setAircraft((previous) =>
      previous.filter(
        (item) =>
          item.id !== aircraftId,
      ),
    );

    setSelectedAircraft(null);
    setEditingAircraft(null);
  };

  const statusCounts = useMemo(() => {
    return {
      total: aircraft.length,

      available: aircraft.filter(
        (item) =>
          item.status === "Available",
      ).length,

      inFlight: aircraft.filter(
        (item) =>
          item.status === "In Flight",
      ).length,

      maintenance: aircraft.filter(
        (item) =>
          item.status === "Maintenance",
      ).length,

      reserved: aircraft.filter(
        (item) =>
          item.status === "Reserved",
      ).length,

      grounded: aircraft.filter(
        (item) =>
          item.status === "Grounded",
      ).length,

      retired: aircraft.filter(
        (item) =>
          item.status === "Retired",
      ).length,
    };
  }, [aircraft]);

  return (
    <div className="space-y-5 text-[#172033]">
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2FF]">
              <Plane className="h-4 w-4 text-[#1677FF]" />
            </div>

            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#344054]">
              Fleet Management
            </span>
          </div>

          <h1 className="text-[25px] font-semibold tracking-tight text-[#172033]">
            Aircraft
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-[#475467]">
            Manage aircraft, fleet availability,
            flight hours and maintenance status.
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
              New Aircraft
            </span>
          </button>
        </div>
      </section>

      {/* =====================================================
          STATUS SUMMARY
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
            Total Aircraft
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#172033]">
            {statusCounts.total}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Fleet size
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            handleStatusChange("Available")
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
            Ready for flight
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            handleStatusChange("In Flight")
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            In Flight
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#1355B5]">
            {statusCounts.inFlight}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Active aircraft
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            handleStatusChange("Maintenance")
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

      {/* =====================================================
          SEARCH / FILTER BAR
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
              placeholder="Search registration, type, model..."
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
              "In Flight",
              "Maintenance",
              "Reserved",
              "Grounded",
              "Retired",
            ].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() =>
                  handleStatusChange(
                    status as
                      | AircraftStatus
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

      {/* =====================================================
          AIRCRAFT TABLE
          ===================================================== */}

      <section>
        {paginatedAircraft.length > 0 ? (
          <>
            <AircraftTable
              aircraft={paginatedAircraft}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              onAircraftClick={
                setSelectedAircraft
              }
            />

            <AircraftPagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              totalItems={
                sortedAircraft.length
              }
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <AircraftEmptyState
              title={
                search ||
                statusFilter !== "All"
                  ? "No matching aircraft"
                  : "No aircraft found"
              }
              description={
                search ||
                statusFilter !== "All"
                  ? "Try changing your search or status filter."
                  : "There are currently no aircraft in the fleet."
              }
              actionLabel="New Aircraft"
              onAction={() =>
                setIsCreateOpen(true)
              }
            />
          </div>
        )}
      </section>

      {/* =====================================================
          SELECTED AIRCRAFT
          ===================================================== */}

      {selectedAircraft && (
        <section className="relative">
          <AircraftDetails
            aircraft={selectedAircraft}
            onClose={() =>
              setSelectedAircraft(null)
            }
            onEdit={(item) => {
              setEditingAircraft(item);
              setSelectedAircraft(null);
            }}
            onDelete={handleDeleteAircraft}
          />
        </section>
      )}

      {/* =====================================================
          CREATE AIRCRAFT
          ===================================================== */}

      {isCreateOpen && (
        <CreateAircraftModal
          isOpen={isCreateOpen}
          onClose={() =>
            setIsCreateOpen(false)
          }
          onCreate={handleCreateAircraft}
        />
      )}

      {/* =====================================================
          EDIT AIRCRAFT
          ===================================================== */}

      {editingAircraft && (
        <EditAircraftModal
          isOpen={
            editingAircraft !== null
          }
          aircraft={editingAircraft}
          onClose={() =>
            setEditingAircraft(null)
          }
          onSave={handleUpdateAircraft}
        />
      )}
    </div>
  );
}

export default Aircraft;