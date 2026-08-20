import {
  CalendarDays,
  Clock3,
  Plane,
  UserRound,
  X,
} from "lucide-react";

import type { EventClickArg } from "@fullcalendar/core";

type ScheduleDetailsModalProps = {
  open: boolean;
  event: EventClickArg | null;
  onClose: () => void;
};

type ScheduleStatus =
  | "Scheduled"
  | "Confirmed"
  | "In Flight"
  | "Completed"
  | "Delayed"
  | "Conflict"
  | "Cancelled";

function getStatusStyle(
  status: ScheduleStatus | undefined,
) {
  switch (status) {
    case "Confirmed":
      return {
        dot: "bg-[#1677FF]",
        background: "bg-[#EAF2FF]",
        text: "text-[#1355B5]",
      };

    case "In Flight":
      return {
        dot: "bg-[#12B76A]",
        background: "bg-[#E8F8F1]",
        text: "text-[#087443]",
      };

    case "Completed":
      return {
        dot: "bg-[#98A2B3]",
        background: "bg-[#F2F4F7]",
        text: "text-[#475467]",
      };

    case "Delayed":
      return {
        dot: "bg-[#F79009]",
        background: "bg-[#FFFAEB]",
        text: "text-[#B54708]",
      };

    case "Conflict":
      return {
        dot: "bg-[#F04438]",
        background: "bg-[#FEF3F2]",
        text: "text-[#B42318]",
      };

    case "Cancelled":
      return {
        dot: "bg-[#D92D20]",
        background: "bg-[#FEF3F2]",
        text: "text-[#B42318]",
      };

    case "Scheduled":
    default:
      return {
        dot: "bg-[#1677FF]",
        background: "bg-[#EAF2FF]",
        text: "text-[#1355B5]",
      };
  }
}

function formatDateTime(
  date: Date,
): string {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    },
  ).format(date);
}

function formatDate(
  date: Date,
): string {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  ).format(date);
}

function formatTime(
  date: Date,
): string {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    },
  ).format(date);
}

export function ScheduleDetailsModal({
  open,
  event,
  onClose,
}: ScheduleDetailsModalProps) {
  if (!open || !event) {
    return null;
  }

  const calendarEvent =
    event.event;

  const extendedProps =
    calendarEvent.extendedProps;

  const status =
    extendedProps.status as
      | ScheduleStatus
      | undefined;

  const eventType =
    extendedProps.type as
      | string
      | undefined;

  const aircraft =
    extendedProps.aircraft as
      | string
      | undefined;

  const instructor =
    extendedProps.instructor as
      | string
      | undefined;

  const student =
    extendedProps.student as
      | string
      | undefined;

  const trainingType =
    extendedProps.trainingType as
      | string
      | undefined;

  const statusStyle =
    getStatusStyle(status);

  const startDate =
    calendarEvent.start;

  const endDate =
    calendarEvent.end;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101828]/40 px-4 py-6 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="schedule-details-title"
    >
      <div className="flex max-h-[calc(100vh-48px)] w-full max-w-[620px] flex-col overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white shadow-[0_24px_48px_rgba(16,24,40,0.18)]">
        {/* =====================================================
            HEADER
            ===================================================== */}

        <div className="flex items-start justify-between border-b border-[#E4E7EC] px-6 py-5">
          <div className="min-w-0 pr-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF2FF]">
                <Plane className="h-4 w-4 text-[#1677FF]" />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#667085]">
                Schedule Details
              </span>
            </div>

            <h2
              id="schedule-details-title"
              className="truncate text-lg font-semibold text-[#172033]"
            >
              {calendarEvent.title}
            </h2>

            {eventType && (
              <p className="mt-1 text-xs text-[#667085]">
                {eventType}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#172033]"
            aria-label="Close schedule details"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* =====================================================
            CONTENT
            ===================================================== */}

        <div className="min-h-0 overflow-y-auto">
          <div className="space-y-5 px-6 py-5">
            {/* Status */}

            <section className="flex items-center justify-between rounded-xl border border-[#E4E7EC] bg-[#FCFCFD] px-4 py-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                  Current Status
                </p>

                <div className="mt-1.5 flex items-center gap-2">
                  <span
                    className={[
                      "h-2 w-2 rounded-full",
                      statusStyle.dot,
                    ].join(" ")}
                  />

                  <span className="text-xs font-semibold text-[#172033]">
                    {status ?? "Scheduled"}
                  </span>
                </div>
              </div>

              <span
                className={[
                  "rounded-full px-2.5 py-1 text-[10px] font-semibold",
                  statusStyle.background,
                  statusStyle.text,
                ].join(" ")}
              >
                {status ?? "Scheduled"}
              </span>
            </section>

            {/* Date / Time */}

            <section>
              <div className="mb-3 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-[#667085]" />

                <h3 className="text-xs font-semibold text-[#172033]">
                  Schedule Time
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-[#E4E7EC] bg-white px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                    Date
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#172033]">
                    {startDate
                      ? formatDate(startDate)
                      : "—"}
                  </p>
                </div>

                <div className="rounded-lg border border-[#E4E7EC] bg-white px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <Clock3 className="h-3 w-3 text-[#98A2B3]" />

                    <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                      Time
                    </p>
                  </div>

                  <p className="mt-1 text-xs font-semibold text-[#172033]">
                    {startDate
                      ? formatTime(startDate)
                      : "—"}

                    {endDate
                      ? ` – ${formatTime(endDate)}`
                      : ""}
                  </p>
                </div>
              </div>

              {startDate && (
                <p className="mt-2 text-[10px] text-[#98A2B3]">
                  Local Operations Time ·{" "}
                  {formatDateTime(startDate)}
                </p>
              )}
            </section>

            {/* Resources */}

            <section className="border-t border-[#F2F4F7] pt-5">
              <div className="mb-3 flex items-center gap-2">
                <UserRound className="h-4 w-4 text-[#667085]" />

                <h3 className="text-xs font-semibold text-[#172033]">
                  Assigned Resources
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-[#E4E7EC] bg-white px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                    Aircraft
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#172033]">
                    {aircraft || "Not assigned"}
                  </p>
                </div>

                <div className="rounded-lg border border-[#E4E7EC] bg-white px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                    Instructor
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#172033]">
                    {instructor || "Not assigned"}
                  </p>
                </div>

                <div className="rounded-lg border border-[#E4E7EC] bg-white px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                    Student
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#172033]">
                    {student || "Not assigned"}
                  </p>
                </div>

                <div className="rounded-lg border border-[#E4E7EC] bg-white px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                    Training Type
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#172033]">
                    {trainingType || "Not specified"}
                  </p>
                </div>
              </div>
            </section>

            {/* Event ID */}

            <section className="border-t border-[#F2F4F7] pt-5">
              <div className="flex items-center justify-between rounded-lg bg-[#F9FAFB] px-4 py-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                  Schedule ID
                </span>

                <span className="font-mono text-[10px] font-medium text-[#475467]">
                  {calendarEvent.id}
                </span>
              </div>
            </section>
          </div>
        </div>

        {/* =====================================================
            FOOTER
            ===================================================== */}

        <div className="flex items-center justify-end border-t border-[#E4E7EC] bg-[#FCFCFD] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-lg bg-[#172033] px-4 text-xs font-semibold text-white transition hover:bg-[#101828] active:scale-[0.98]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}