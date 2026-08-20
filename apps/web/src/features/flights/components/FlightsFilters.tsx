import { RotateCcw, SlidersHorizontal } from "lucide-react";

import {
  aircraftOptions,
  flightDateOptions,
  flightStatusOptions,
  flightTypeOptions,
  instructorOptions,
} from "../flightsData";

export type FlightFiltersState = {
  date: string;
  status: string;
  type: string;
  aircraft: string;
  instructor: string;
};

type FlightsFiltersProps = {
  filters: FlightFiltersState;
  onFiltersChange: (
    filters: FlightFiltersState,
  ) => void;
  onReset: () => void;
};

export function FlightsFilters({
  filters,
  onFiltersChange,
  onReset,
}: FlightsFiltersProps) {
  const updateFilter = (
    key: keyof FlightFiltersState,
    value: string,
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <aside className="w-full shrink-0 rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] xl:w-[245px]">
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F2F4F7]">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#667085]" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#172033]">
              Filters
            </h3>

            <p className="text-[10px] text-[#98A2B3]">
              Refine flight records
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex h-7 w-7 items-center justify-center rounded-md text-[#98A2B3] transition hover:bg-[#F9FAFB] hover:text-[#1677FF]"
          aria-label="Reset flight filters"
          title="Reset filters"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* =====================================================
          FILTER FIELDS
          ===================================================== */}

      <div className="space-y-4">
        {/* Date */}

        <div>
          <label
            htmlFor="flight-date-filter"
            className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]"
          >
            Date
          </label>

          <select
            id="flight-date-filter"
            value={filters.date}
            onChange={(event) =>
              updateFilter(
                "date",
                event.target.value,
              )
            }
            className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#344054] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
          >
            {flightDateOptions.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}

        <div>
          <label
            htmlFor="flight-status-filter"
            className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]"
          >
            Status
          </label>

          <select
            id="flight-status-filter"
            value={filters.status}
            onChange={(event) =>
              updateFilter(
                "status",
                event.target.value,
              )
            }
            className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#344054] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
          >
            <option value="All Statuses">
              All Statuses
            </option>

            {flightStatusOptions.map((status) => (
              <option
                key={status}
                value={status}
              >
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Flight Type */}

        <div>
          <label
            htmlFor="flight-type-filter"
            className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]"
          >
            Flight Type
          </label>

          <select
            id="flight-type-filter"
            value={filters.type}
            onChange={(event) =>
              updateFilter(
                "type",
                event.target.value,
              )
            }
            className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#344054] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
          >
            <option value="All Types">
              All Types
            </option>

            {flightTypeOptions.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Aircraft */}

        <div>
          <label
            htmlFor="flight-aircraft-filter"
            className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]"
          >
            Aircraft
          </label>

          <select
            id="flight-aircraft-filter"
            value={filters.aircraft}
            onChange={(event) =>
              updateFilter(
                "aircraft",
                event.target.value,
              )
            }
            className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#344054] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
          >
            {aircraftOptions.map((aircraft) => (
              <option
                key={aircraft}
                value={aircraft}
              >
                {aircraft}
              </option>
            ))}
          </select>
        </div>

        {/* Instructor */}

        <div>
          <label
            htmlFor="flight-instructor-filter"
            className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]"
          >
            Instructor
          </label>

          <select
            id="flight-instructor-filter"
            value={filters.instructor}
            onChange={(event) =>
              updateFilter(
                "instructor",
                event.target.value,
              )
            }
            className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#344054] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
          >
            {instructorOptions.map(
              (instructor) => (
                <option
                  key={instructor}
                  value={instructor}
                >
                  {instructor}
                </option>
              ),
            )}
          </select>
        </div>
      </div>

      {/* =====================================================
          ACTIVE FILTER SUMMARY
          ===================================================== */}

      <div className="mt-5 border-t border-[#E4E7EC] pt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
          Active Filters
        </p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {Object.entries(filters)
            .filter(
              ([, value]) =>
                value &&
                ![
                  "All Dates",
                  "All Statuses",
                  "All Types",
                  "All Aircraft",
                  "All Instructors",
                ].includes(value),
            )
            .map(([key, value]) => (
              <span
                key={key}
                className="rounded-md bg-[#EAF2FF] px-2 py-1 text-[9px] font-medium text-[#1355B5]"
              >
                {value}
              </span>
            ))}

          {Object.entries(filters).every(
            ([, value]) =>
              !value ||
              [
                "All Dates",
                "All Statuses",
                "All Types",
                "All Aircraft",
                "All Instructors",
              ].includes(value),
          ) && (
            <span className="text-[10px] text-[#98A2B3]">
              No filters applied
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}