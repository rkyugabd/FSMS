import {
  CalendarDays,
  Clock3,
  GraduationCap,
  Plane,
  UserRound,
  X,
} from "lucide-react";

export type SchedulingEventDetailsData = {
  id?: string;
  title: string;
  start?: string;
  end?: string;
  type?: string;
  status?: string;
  aircraft?: string;
  instructor?: string;
  student?: string;
  trainingType?: string;
  notes?: string;
};

type SchedulingEventDetailsProps = {
  event: SchedulingEventDetailsData | null;
  open: boolean;
  onClose: () => void;
};

function formatDateTime(value?: string): string {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function getStatusClasses(status?: string): string {
  switch (status) {
    case "In Flight":
      return "border-[#B2DDFF] bg-[#EAF2FF] text-[#175CD3]";

    case "Completed":
      return "border-[#D0D5DD] bg-[#F2F4F7] text-[#475467]";

    case "Delayed":
      return "border-[#FEDF89] bg-[#FFFAEB] text-[#B54708]";

    case "Conflict":
      return "border-[#FECDCA] bg-[#FEF3F2] text-[#B42318]";

    case "Cancelled":
      return "border-[#FECDCA] bg-[#FEF3F2] text-[#B42318]";

    case "Confirmed":
      return "border-[#C7D7FE] bg-[#EEF4FF] text-[#3538CD]";

    default:
      return "border-[#D0D5DD] bg-[#F9FAFB] text-[#344054]";
  }
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-[#F2F4F7] py-3 last:border-b-0">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F2F4F7] text-[#667085]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
          {label}
        </p>

        <p className="mt-0.5 truncate text-xs font-medium text-[#172033]">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

export function SchedulingEventDetails({
  event,
  open,
  onClose,
}: SchedulingEventDetailsProps) {
  if (!open || !event) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#172033]/25 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="scheduling-event-details-title"
      onMouseDown={(mouseEvent) => {
        if (mouseEvent.target === mouseEvent.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_20px_40px_rgba(16,24,40,0.16)]">
        {/* Header */}

        <div className="flex items-start justify-between border-b border-[#E4E7EC] px-5 py-4">
          <div className="min-w-0 pr-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#667085]">
              Schedule Details
            </p>

            <h2
              id="scheduling-event-details-title"
              className="mt-1 truncate text-base font-semibold text-[#172033]"
            >
              {event.title}
            </h2>

            {event.type && (
              <p className="mt-0.5 text-[11px] text-[#667085]">
                {event.type}
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

        {/* Status */}

        <div className="border-b border-[#E4E7EC] px-5 py-3">
          <span
            className={[
              "inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold",
              getStatusClasses(event.status),
            ].join(" ")}
          >
            {event.status || "Scheduled"}
          </span>
        </div>

        {/* Details */}

        <div className="px-5">
          <DetailRow
            icon={<CalendarDays className="h-3.5 w-3.5" />}
            label="Start"
            value={formatDateTime(event.start)}
          />

          <DetailRow
            icon={<Clock3 className="h-3.5 w-3.5" />}
            label="End"
            value={formatDateTime(event.end)}
          />

          <DetailRow
            icon={<Plane className="h-3.5 w-3.5" />}
            label="Aircraft"
            value={event.aircraft}
          />

          <DetailRow
            icon={<UserRound className="h-3.5 w-3.5" />}
            label="Instructor"
            value={event.instructor}
          />

          <DetailRow
            icon={<GraduationCap className="h-3.5 w-3.5" />}
            label="Student"
            value={event.student}
          />

          <DetailRow
            icon={<GraduationCap className="h-3.5 w-3.5" />}
            label="Training Type"
            value={event.trainingType}
          />
        </div>

        {/* Notes */}

        {event.notes && (
          <div className="mx-5 mb-5 mt-4 rounded-lg border border-[#E4E7EC] bg-[#F9FAFB] p-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Notes
            </p>

            <p className="mt-1 text-xs leading-5 text-[#475467]">
              {event.notes}
            </p>
          </div>
        )}

        {/* Footer */}

        <div className="flex items-center justify-end border-t border-[#E4E7EC] bg-[#F9FAFB] px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-lg border border-[#D0D5DD] bg-white px-4 text-xs font-semibold text-[#344054] transition hover:bg-[#F2F4F7]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}