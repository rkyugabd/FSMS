import {
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
} from "lucide-react";

import type { TimeEntry } from "../timeTrackingData";

type TimeTrackingDetailsProps = {
  entry: TimeEntry;
};

const STATUS_STYLES: Record<
  TimeEntry["status"],
  string
> = {
  "Clocked In":
    "bg-[#E8F8F1] text-[#087443]",
  "Clocked Out":
    "bg-[#F2F4F7] text-[#475467]",
  "On Break":
    "bg-[#FFFAEB] text-[#B54708]",
  Pending:
    "bg-[#FFFAEB] text-[#B54708]",
  Approved:
    "bg-[#EAF2FF] text-[#1355B5]",
  Rejected:
    "bg-[#FEF3F2] text-[#B42318]",
};

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
        {label}
      </p>

      <p className="mt-1 text-xs font-medium text-[#344054]">
        {value}
      </p>
    </div>
  );
}

export function TimeTrackingDetails({
  entry,
}: TimeTrackingDetailsProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="border-b border-[#E4E7EC] px-5 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF2FF]">
              <UserRound className="h-4 w-4 text-[#1677FF]" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[#172033]">
                {entry.employeeName}
              </h2>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                {entry.employeeId} ·{" "}
                {entry.role}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex w-fit rounded-full px-2.5 py-1 text-[10px] font-semibold ${STATUS_STYLES[entry.status]}`}
          >
            {entry.status}
          </span>
        </div>
      </div>

      <div className="grid gap-5 px-5 py-5 sm:grid-cols-2 lg:grid-cols-4">
        <DetailItem
          label="Department"
          value={entry.department}
        />

        <DetailItem
          label="Date"
          value={new Intl.DateTimeFormat(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            },
          ).format(
            new Date(
              `${entry.date}T00:00:00`,
            ),
          )}
        />

        <DetailItem
          label="Entry Type"
          value={entry.entryType}
        />

        <DetailItem
          label="Location"
          value={entry.location}
        />
      </div>

      <div className="border-t border-[#E4E7EC] bg-[#F9FAFB] px-5 py-5">
        <div className="mb-4 flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-[#667085]" />

          <h3 className="text-xs font-semibold text-[#172033]">
            Attendance
          </h3>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Clock In
            </p>

            <p className="mt-1 text-sm font-semibold text-[#172033]">
              {entry.clockIn || "—"}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Clock Out
            </p>

            <p className="mt-1 text-sm font-semibold text-[#172033]">
              {entry.clockOut || "—"}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Break
            </p>

            <p className="mt-1 text-sm font-semibold text-[#172033]">
              {entry.breakMinutes} min
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Total Hours
            </p>

            <p className="mt-1 text-sm font-semibold text-[#1677FF]">
              {entry.totalHours.toFixed(
                2,
              )}{" "}
              hours
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 border-t border-[#E4E7EC] px-5 py-5 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <CalendarDays className="mt-0.5 h-4 w-4 text-[#98A2B3]" />

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Time Entry ID
            </p>

            <p className="mt-1 text-xs font-semibold text-[#344054]">
              {entry.id}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-4 w-4 text-[#98A2B3]" />

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Work Location
            </p>

            <p className="mt-1 text-xs font-semibold text-[#344054]">
              {entry.location}
            </p>
          </div>
        </div>
      </div>

      {entry.notes && (
        <div className="border-t border-[#E4E7EC] px-5 py-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Notes
          </p>

          <p className="mt-2 text-xs leading-5 text-[#475467]">
            {entry.notes}
          </p>
        </div>
      )}
    </div>
  );
}

export default TimeTrackingDetails;