import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

import type {
  ReportCategory,
  ReportFormat,
  ReportStatus,
} from "../reportsData";

type ReportsFiltersProps = {
  search: string;
  categoryFilter: ReportCategory | "All";
  statusFilter: ReportStatus | "All";
  formatFilter: ReportFormat | "All";
  onSearchChange: (value: string) => void;
  onCategoryChange: (
    value: ReportCategory | "All",
  ) => void;
  onStatusChange: (
    value: ReportStatus | "All",
  ) => void;
  onFormatChange: (
    value: ReportFormat | "All",
  ) => void;
};

const categories: Array<
  ReportCategory | "All"
> = [
  "All",
  "Flight Operations",
  "Training",
  "Students",
  "Aircraft",
  "Maintenance",
  "Employees",
  "Time Tracking",
  "Procurement",
  "Finance",
  "Analytics",
  "Custom",
];

const statuses: Array<
  ReportStatus | "All"
> = [
  "All",
  "Ready",
  "Generating",
  "Scheduled",
  "Failed",
  "Archived",
];

const formats: Array<
  ReportFormat | "All"
> = [
  "All",
  "PDF",
  "Excel",
  "CSV",
];

export function ReportsFilters({
  search,
  categoryFilter,
  statusFilter,
  formatFilter,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onFormatChange,
}: ReportsFiltersProps) {
  return (
    <section className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1 lg:max-w-md">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A2B3]" />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                onSearchChange(
                  event.target.value,
                )
              }
              placeholder="Search report name, category..."
              className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white pl-9 pr-3 text-xs text-[#344054] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#98A2B3]">
            <SlidersHorizontal className="h-3.5 w-3.5" />

            Filters
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
              Category
            </label>

            <select
              value={categoryFilter}
              onChange={(event) =>
                onCategoryChange(
                  event.target.value as
                    | ReportCategory
                    | "All",
                )
              }
              className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#344054] outline-none focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
            >
              {categories.map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ),
              )}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
              Status
            </label>

            <select
              value={statusFilter}
              onChange={(event) =>
                onStatusChange(
                  event.target.value as
                    | ReportStatus
                    | "All",
                )
              }
              className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#344054] outline-none focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
            >
              {statuses.map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ),
              )}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
              Format
            </label>

            <select
              value={formatFilter}
              onChange={(event) =>
                onFormatChange(
                  event.target.value as
                    | ReportFormat
                    | "All",
                )
              }
              className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#344054] outline-none focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
            >
              {formats.map(
                (format) => (
                  <option
                    key={format}
                    value={format}
                  >
                    {format}
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

export default ReportsFilters;