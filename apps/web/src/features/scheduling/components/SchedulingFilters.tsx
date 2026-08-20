import {
  Filter,
  RotateCcw,
  Search,
} from "lucide-react";
import {
  useMemo,
  useState,
} from "react";

import {
  aircraftOptions,
  instructorOptions,
  trainingOptions,
} from "../schedulingData";

export type SchedulingStatus =
  | "Scheduled"
  | "Confirmed"
  | "In Flight"
  | "Completed"
  | "Delayed"
  | "Conflict";

export type SchedulingFilterState = {
  search: string;
  aircraft: string;
  instructor: string;
  trainingType: string;
  statuses: SchedulingStatus[];
};

type SchedulingFiltersProps = {
  /**
   * Optional callback for the parent Scheduling page.
   *
   * The current Scheduling.tsx does not need to provide this.
   * When filtering is connected to FullCalendar, the parent can
   * receive the complete filter state here.
   */
  onFiltersChange?: (
    filters: SchedulingFilterState,
  ) => void;
};

const STATUS_OPTIONS: {
  label: SchedulingStatus;
  colorClass: string;
  activeBackground: string;
}[] = [
  {
    label: "Scheduled",
    colorClass: "bg-[#1677FF]",
    activeBackground: "bg-[#EAF2FF]",
  },
  {
    label: "Confirmed",
    colorClass: "bg-[#7F56D9]",
    activeBackground: "bg-[#F2EDFF]",
  },
  {
    label: "In Flight",
    colorClass: "bg-[#12B76A]",
    activeBackground: "bg-[#E8F8F1]",
  },
  {
    label: "Completed",
    colorClass: "bg-[#98A2B3]",
    activeBackground: "bg-[#F2F4F7]",
  },
  {
    label: "Delayed",
    colorClass: "bg-[#F79009]",
    activeBackground: "bg-[#FFF4E5]",
  },
  {
    label: "Conflict",
    colorClass: "bg-[#F04438]",
    activeBackground: "bg-[#FEF3F2]",
  },
];

const DEFAULT_STATUSES: SchedulingStatus[] =
  STATUS_OPTIONS.map((status) => status.label);

const getDefaultFilters =
  (): SchedulingFilterState => ({
    search: "",
    aircraft:
      aircraftOptions[0] ?? "All Aircraft",
    instructor:
      instructorOptions[0] ??
      "All Instructors",
    trainingType:
      trainingOptions[0] ??
      "All Training Types",
    statuses: [...DEFAULT_STATUSES],
  });

export function SchedulingFilters({
  onFiltersChange,
}: SchedulingFiltersProps) {
  const [filters, setFilters] =
    useState<SchedulingFilterState>(
      getDefaultFilters,
    );

  const activeFilterCount = useMemo(() => {
    let count = 0;

    if (filters.search.trim()) {
      count += 1;
    }

    if (
      filters.aircraft !==
      (aircraftOptions[0] ??
        "All Aircraft")
    ) {
      count += 1;
    }

    if (
      filters.instructor !==
      (instructorOptions[0] ??
        "All Instructors")
    ) {
      count += 1;
    }

    if (
      filters.trainingType !==
      (trainingOptions[0] ??
        "All Training Types")
    ) {
      count += 1;
    }

    if (
      filters.statuses.length !==
      DEFAULT_STATUSES.length
    ) {
      count += 1;
    }

    return count;
  }, [filters]);

  const updateFilters = (
    nextFilters: SchedulingFilterState,
  ) => {
    setFilters(nextFilters);
    onFiltersChange?.(nextFilters);
  };

  const handleSearchChange = (
    value: string,
  ) => {
    updateFilters({
      ...filters,
      search: value,
    });
  };

  const handleAircraftChange = (
    value: string,
  ) => {
    updateFilters({
      ...filters,
      aircraft: value,
    });
  };

  const handleInstructorChange = (
    value: string,
  ) => {
    updateFilters({
      ...filters,
      instructor: value,
    });
  };

  const handleTrainingChange = (
    value: string,
  ) => {
    updateFilters({
      ...filters,
      trainingType: value,
    });
  };

  const handleStatusToggle = (
    status: SchedulingStatus,
  ) => {
    const isSelected =
      filters.statuses.includes(status);

    const nextStatuses = isSelected
      ? filters.statuses.filter(
          (item) => item !== status,
        )
      : [
          ...filters.statuses,
          status,
        ];

    updateFilters({
      ...filters,
      statuses: nextStatuses,
    });
  };

  const handleReset = () => {
    const defaultFilters =
      getDefaultFilters();

    updateFilters(defaultFilters);
  };

  return (
    <aside className="w-[245px] shrink-0 rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      {/* =====================================================
          FILTER HEADER
          ===================================================== */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EAF2FF]">
            <Filter className="h-3.5 w-3.5 text-[#1677FF]" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#172033]">
              Filters
            </h3>

            {activeFilterCount > 0 && (
              <p className="mt-0.5 text-[9px] font-medium text-[#1677FF]">
                {activeFilterCount} active
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="flex h-7 w-7 items-center justify-center rounded-md text-[#98A2B3] transition hover:bg-[#F9FAFB] hover:text-[#1677FF]"
          aria-label="Reset scheduling filters"
          title="Reset filters"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="space-y-5">
        {/* =================================================
            SEARCH
            ================================================= */}
        <div>
          <label
            htmlFor="scheduling-search"
            className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-[#98A2B3]"
          >
            Search
          </label>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A2B3]" />

            <input
              id="scheduling-search"
              type="search"
              value={filters.search}
              onChange={(event) =>
                handleSearchChange(
                  event.target.value,
                )
              }
              placeholder="Flight, student..."
              autoComplete="off"
              className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white pl-9 pr-3 text-xs text-[#344054] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* =================================================
            AIRCRAFT
            ================================================= */}
        <div>
          <label
            htmlFor="scheduling-aircraft"
            className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-[#98A2B3]"
          >
            Aircraft
          </label>

          <select
            id="scheduling-aircraft"
            value={filters.aircraft}
            onChange={(event) =>
              handleAircraftChange(
                event.target.value,
              )
            }
            className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#344054] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
          >
            {aircraftOptions.map(
              (aircraft) => (
                <option
                  key={aircraft}
                  value={aircraft}
                >
                  {aircraft}
                </option>
              ),
            )}
          </select>
        </div>

        {/* =================================================
            INSTRUCTOR
            ================================================= */}
        <div>
          <label
            htmlFor="scheduling-instructor"
            className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-[#98A2B3]"
          >
            Instructor
          </label>

          <select
            id="scheduling-instructor"
            value={filters.instructor}
            onChange={(event) =>
              handleInstructorChange(
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

        {/* =================================================
            TRAINING TYPE
            ================================================= */}
        <div>
          <label
            htmlFor="scheduling-training"
            className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-[#98A2B3]"
          >
            Training Type
          </label>

          <select
            id="scheduling-training"
            value={filters.trainingType}
            onChange={(event) =>
              handleTrainingChange(
                event.target.value,
              )
            }
            className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#344054] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
          >
            {trainingOptions.map(
              (training) => (
                <option
                  key={training}
                  value={training}
                >
                  {training}
                </option>
              ),
            )}
          </select>
        </div>

        {/* =================================================
            STATUS
            ================================================= */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#98A2B3]">
              Status
            </label>

            <span className="text-[9px] font-medium text-[#98A2B3]">
              {filters.statuses.length}/
              {STATUS_OPTIONS.length}
            </span>
          </div>

          <div className="space-y-1">
            {STATUS_OPTIONS.map(
              (status) => {
                const isSelected =
                  filters.statuses.includes(
                    status.label,
                  );

                return (
                  <label
                    key={status.label}
                    className={[
                      "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-xs transition",
                      isSelected
                        ? status.activeBackground
                        : "hover:bg-[#F9FAFB]",
                    ].join(" ")}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() =>
                        handleStatusToggle(
                          status.label,
                        )
                      }
                      className="h-3.5 w-3.5 rounded border-[#D0D5DD] text-[#1677FF] focus:ring-2 focus:ring-blue-100"
                    />

                    <span
                      className={[
                        "h-2 w-2 shrink-0 rounded-full",
                        status.colorClass,
                      ].join(" ")}
                    />

                    <span
                      className={[
                        "font-medium",
                        isSelected
                          ? "text-[#344054]"
                          : "text-[#98A2B3]",
                      ].join(" ")}
                    >
                      {status.label}
                    </span>
                  </label>
                );
              },
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          FILTER FOOTER
          ===================================================== */}
      {activeFilterCount > 0 && (
        <div className="mt-5 border-t border-[#EAECF0] pt-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#E4E7EC] bg-white py-2 text-[10px] font-semibold text-[#667085] transition hover:bg-[#F9FAFB] hover:text-[#1677FF]"
          >
            <RotateCcw className="h-3 w-3" />
            Reset all filters
          </button>
        </div>
      )}
    </aside>
  );
}