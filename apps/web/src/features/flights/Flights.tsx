import {
  Plane,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { useMemo, useState } from "react";

import {
  flightData,
  type Flight,
  type FlightStatus,
} from "./flightsData";

import { FlightsPagination } from "./components/FlightsPagination";
import { FlightsEmptyState } from "./components/FlightsEmptyState";
import { FlightsTable } from "./components/FlightsTable";
import { FlightDetails } from "./components/FlightDetails";
import { CreateFlightModal } from "./components/CreateFlightModal";
import { EditFlightModal } from "./components/EditFlightModal";

const PAGE_SIZE = 8;

type SortField =
  | "flightNumber"
  | "date"
  | "departureTime"
  | "aircraft"
  | "instructor"
  | "student"
  | "status";

type SortDirection = "asc" | "desc";

export function Flights() {
  const [flights, setFlights] =
    useState<Flight[]>(flightData);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<FlightStatus | "All">("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [sortField, setSortField] =
    useState<SortField>("date");

  const [sortDirection, setSortDirection] =
    useState<SortDirection>("asc");

  const [selectedFlight, setSelectedFlight] =
    useState<Flight | null>(null);

  const [editingFlight, setEditingFlight] =
    useState<Flight | null>(null);

  const [isCreateOpen, setIsCreateOpen] =
    useState(false);

  /*
   * =========================================================
   * FILTER
   * =========================================================
   */

  const filteredFlights = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return flights.filter((flight) => {
      const matchesSearch =
        query.length === 0 ||
        [
          flight.flightNumber,
          flight.id,
          flight.aircraft,
          flight.aircraftType,
          flight.instructor,
          flight.student,
          flight.departureAirport,
          flight.arrivalAirport,
          flight.flightType,
          flight.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        flight.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    flights,
    search,
    statusFilter,
  ]);

  /*
   * =========================================================
   * SORT
   * =========================================================
   */

  const sortedFlights = useMemo(() => {
    const result = [
      ...filteredFlights,
    ];

    result.sort((a, b) => {
      let aValue: string | number = "";
      let bValue: string | number = "";

      switch (sortField) {
        case "flightNumber":
          aValue = a.flightNumber;
          bValue = b.flightNumber;
          break;

        case "date":
          aValue = a.date;
          bValue = b.date;
          break;

        case "departureTime":
          aValue = a.departureTime;
          bValue = b.departureTime;
          break;

        case "aircraft":
          aValue = a.aircraft;
          bValue = b.aircraft;
          break;

        case "instructor":
          aValue = a.instructor;
          bValue = b.instructor;
          break;

        case "student":
          aValue = a.student;
          bValue = b.student;
          break;

        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
      }

      const comparison = String(
        aValue,
      ).localeCompare(
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
    filteredFlights,
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
      sortedFlights.length /
        PAGE_SIZE,
    ),
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const paginatedFlights = useMemo(() => {
    const start =
      (safeCurrentPage - 1) *
      PAGE_SIZE;

    return sortedFlights.slice(
      start,
      start + PAGE_SIZE,
    );
  }, [
    sortedFlights,
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
    value: FlightStatus | "All",
  ) => {
    setStatusFilter(value);
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
    setFlights([...flightData]);
    setSearch("");
    setStatusFilter("All");
    setCurrentPage(1);
    setSortField("date");
    setSortDirection("asc");
    setSelectedFlight(null);
    setEditingFlight(null);
  };

  const handleCreateFlight = (
    flight: Flight,
  ) => {
    setFlights((previous) => [
      flight,
      ...previous,
    ]);

    setIsCreateOpen(false);
    setCurrentPage(1);
  };

  const handleUpdateFlight = (
    updatedFlight: Flight,
  ) => {
    setFlights((previous) =>
      previous.map((flight) =>
        flight.id ===
        updatedFlight.id
          ? updatedFlight
          : flight,
      ),
    );

    setEditingFlight(null);

    if (
      selectedFlight?.id ===
      updatedFlight.id
    ) {
      setSelectedFlight(
        updatedFlight,
      );
    }
  };

  const handleDeleteFlight = (
    flightId: string,
  ) => {
    setFlights((previous) =>
      previous.filter(
        (flight) =>
          flight.id !== flightId,
      ),
    );

    setSelectedFlight(null);
  };

  /*
   * =========================================================
   * STATUS COUNTS
   * =========================================================
   */

  const statusCounts = useMemo(() => {
    return {
      total: flights.length,

      scheduled: flights.filter(
        (flight) =>
          flight.status ===
          "Scheduled",
      ).length,

      confirmed: flights.filter(
        (flight) =>
          flight.status ===
          "Confirmed",
      ).length,

      boarding: flights.filter(
        (flight) =>
          flight.status ===
          "Boarding",
      ).length,

      inFlight: flights.filter(
        (flight) =>
          flight.status ===
          "In Flight",
      ).length,

      landed: flights.filter(
        (flight) =>
          flight.status ===
          "Landed",
      ).length,

      delayed: flights.filter(
        (flight) =>
          flight.status ===
          "Delayed",
      ).length,

      completed: flights.filter(
        (flight) =>
          flight.status ===
          "Completed",
      ).length,

      cancelled: flights.filter(
        (flight) =>
          flight.status ===
          "Cancelled",
      ).length,
    };
  }, [flights]);

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
              <Plane className="h-4 w-4 text-[#1677FF]" />
            </div>

            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#344054]">
              Flight Operations
            </span>
          </div>

          <h1 className="text-[25px] font-semibold tracking-tight text-[#172033]">
            Flights
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-[#475467]">
            Manage flight operations,
            aircraft, instructors,
            students and flight status.
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
              New Flight
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
            Total Flights
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#172033]">
            {statusCounts.total}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Operational schedule
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            handleStatusChange(
              "Scheduled",
            )
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Scheduled
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#1355B5]">
            {statusCounts.scheduled}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Upcoming flights
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            handleStatusChange(
              "In Flight",
            )
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            In Flight
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#087443]">
            {statusCounts.inFlight}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Active operations
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            handleStatusChange(
              "Delayed",
            )
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Delayed
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#B54708]">
            {statusCounts.delayed}
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
              placeholder="Search flight, student, aircraft..."
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
              "Confirmed",
              "Boarding",
              "In Flight",
              "Landed",
              "Delayed",
              "Cancelled",
              "Completed",
            ].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() =>
                  handleStatusChange(
                    status as
                      | FlightStatus
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
          FLIGHTS TABLE
          ===================================================== */}

      <section>
        {paginatedFlights.length >
        0 ? (
          <>
            <FlightsTable
              flights={
                paginatedFlights
              }
              sortField={sortField}
              sortDirection={
                sortDirection
              }
              onSort={handleSort}
              onFlightClick={
                setSelectedFlight
              }
            />

            <FlightsPagination
              currentPage={
                safeCurrentPage
              }
              totalPages={
                totalPages
              }
              totalItems={
                sortedFlights.length
              }
              pageSize={PAGE_SIZE}
              onPageChange={
                setCurrentPage
              }
            />
          </>
        ) : (
          <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <FlightsEmptyState
              title={
                search ||
                statusFilter !==
                  "All"
                  ? "No matching flights"
                  : "No flights found"
              }
              description={
                search ||
                statusFilter !==
                  "All"
                  ? "Try changing your search or status filter."
                  : "There are currently no flights in the operational schedule."
              }
              actionLabel="New Flight"
              onAction={() =>
                setIsCreateOpen(true)
              }
            />
          </div>
        )}
      </section>

      {/* =====================================================
          SELECTED FLIGHT DETAILS
          ===================================================== */}

      {selectedFlight && (
        <section className="relative">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
                Selected Flight
              </p>

              <p className="mt-0.5 text-xs text-[#667085]">
                Operational details
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setSelectedFlight(
                  null,
                )
              }
              className="text-xs font-medium text-[#667085] transition hover:text-[#172033]"
            >
              Close
            </button>
          </div>

          <FlightDetails
            flight={{
              id: selectedFlight.id,
              flightNumber:
                selectedFlight.flightNumber,
              status:
                selectedFlight.status,
              aircraft:
                selectedFlight.aircraft,
              aircraftType:
                selectedFlight.aircraftType,
              origin:
                selectedFlight.departureAirport,
              originName:
                selectedFlight.departureAirport,
              destination:
                selectedFlight.arrivalAirport,
              destinationName:
                selectedFlight.arrivalAirport,
              departureDate:
                selectedFlight.date,
              departureTime:
                selectedFlight.departureTime,
              arrivalDate:
                selectedFlight.date,
              arrivalTime:
                selectedFlight.arrivalTime,
              duration:
                selectedFlight.duration,
              instructor:
                selectedFlight.instructor,
              student:
                selectedFlight.student,
              trainingType:
                selectedFlight.flightType,
              notes:
                selectedFlight.notes,
            }}
          />

          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setEditingFlight(
                  selectedFlight,
                );
                setSelectedFlight(
                  null,
                );
              }}
              className="h-9 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white transition hover:bg-[#1264D8]"
            >
              Edit Flight
            </button>

            <button
              type="button"
              onClick={() =>
                handleDeleteFlight(
                  selectedFlight.id,
                )
              }
              className="h-9 rounded-lg border border-[#FECDCA] bg-white px-4 text-xs font-semibold text-[#B42318] transition hover:bg-[#FEF3F2]"
            >
              Delete Flight
            </button>
          </div>
        </section>
      )}

      {/* =====================================================
          CREATE FLIGHT
          ===================================================== */}

      {isCreateOpen && (
        <CreateFlightModal
          isOpen={isCreateOpen}
          onClose={() =>
            setIsCreateOpen(false)
          }
          onCreate={
            handleCreateFlight
          }
        />
      )}

      {/* =====================================================
          EDIT FLIGHT
          ===================================================== */}

      {editingFlight && (
        <EditFlightModal
          isOpen={
            editingFlight !== null
          }
          flight={{
            id: editingFlight.id,
            flightNumber:
              editingFlight.flightNumber,
            status:
              editingFlight.status,
            aircraft:
              editingFlight.aircraft,
            aircraftType:
              editingFlight.aircraftType,
            origin:
              editingFlight.departureAirport,
            originName:
              editingFlight.departureAirport,
            destination:
              editingFlight.arrivalAirport,
            destinationName:
              editingFlight.arrivalAirport,
            departureDate:
              editingFlight.date,
            departureTime:
              editingFlight.departureTime,
            arrivalDate:
              editingFlight.date,
            arrivalTime:
              editingFlight.arrivalTime,
            duration:
              editingFlight.duration,
            instructor:
              editingFlight.instructor,
            student:
              editingFlight.student,
            trainingType:
              editingFlight.flightType,
            notes:
              editingFlight.notes,
          }}
          onClose={() =>
            setEditingFlight(null)
          }
          onSave={(
            updatedDetails,
          ) => {
            const updatedFlight: Flight =
              {
                ...editingFlight,

                flightNumber:
                  updatedDetails.flightNumber,

                status:
                  updatedDetails.status as FlightStatus,

                aircraft:
                  updatedDetails.aircraft ??
                  editingFlight.aircraft,

                aircraftType:
                  updatedDetails.aircraftType ??
                  editingFlight.aircraftType,

                departureAirport:
                  updatedDetails.origin ??
                  editingFlight.departureAirport,

                arrivalAirport:
                  updatedDetails.destination ??
                  editingFlight.arrivalAirport,

                date:
                  updatedDetails.departureDate ??
                  editingFlight.date,

                departureTime:
                  updatedDetails.departureTime ??
                  editingFlight.departureTime,

                arrivalTime:
                  updatedDetails.arrivalTime ??
                  editingFlight.arrivalTime,

                duration:
                  updatedDetails.duration ??
                  editingFlight.duration,

                instructor:
                  updatedDetails.instructor ??
                  editingFlight.instructor,

                student:
                  updatedDetails.student ??
                  editingFlight.student,

                flightType:
                  (updatedDetails.trainingType as Flight["flightType"]) ??
                  editingFlight.flightType,

                notes:
                  updatedDetails.notes,
              };

            handleUpdateFlight(
              updatedFlight,
            );
          }}
        />
      )}
    </div>
  );
}

export default Flights;