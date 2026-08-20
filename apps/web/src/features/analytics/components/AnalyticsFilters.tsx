import {
  CalendarDays,
  Filter,
} from "lucide-react";

import type {
  AnalyticsPeriod,
} from "../analyticsData";

type AnalyticsFiltersProps = {
  period: AnalyticsPeriod;
  department: string;
  onPeriodChange: (
    period: AnalyticsPeriod,
  ) => void;
  onDepartmentChange: (
    department: string,
  ) => void;
};

const PERIOD_OPTIONS: {
  value: AnalyticsPeriod;
  label: string;
}[] = [
  {
    value: "7d",
    label: "Last 7 Days",
  },
  {
    value: "30d",
    label: "Last 30 Days",
  },
  {
    value: "90d",
    label: "Last 90 Days",
  },
  {
    value: "12m",
    label: "Last 12 Months",
  },
];

const DEPARTMENT_OPTIONS = [
  "All Departments",
  "Flight Operations",
  "Training",
  "Aircraft",
  "Maintenance",
  "Finance",
  "Procurement",
  "Workforce",
];

export function AnalyticsFilters({
  period,
  department,
  onPeriodChange,
  onDepartmentChange,
}: AnalyticsFiltersProps) {
  return (
    <section className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold text-[#172033]">
            Analytics Filters
          </p>

          <p className="mt-0.5 text-[10px] text-[#98A2B3]">
            Adjust the reporting period and business area.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-3.5 w-3.5 text-[#98A2B3]" />

            <select
              value={period}
              onChange={(event) =>
                onPeriodChange(
                  event.target
                    .value as AnalyticsPeriod,
                )
              }
              className="h-9 rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs font-medium text-[#344054] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
              aria-label="Analytics period"
            >
              {PERIOD_OPTIONS.map(
                (option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ),
              )}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-[#98A2B3]" />

            <select
              value={department}
              onChange={(event) =>
                onDepartmentChange(
                  event.target.value,
                )
              }
              className="h-9 min-w-[180px] rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs font-medium text-[#344054] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
              aria-label="Analytics department"
            >
              {DEPARTMENT_OPTIONS.map(
                (option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                ),
              )}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnalyticsFilters;