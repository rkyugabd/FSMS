import {
  CalendarDays,
  Clock3,
  Plane,
  UserRound,
  GraduationCap,
  Wrench,
  X,
  Pencil,
  Ban,
} from "lucide-react";

type BookingDetails = {
  id: string;
  title: string;
  start?: string;
  end?: string;
  type?: string;
  status?: string;
  aircraft?: string;
  instructor?: string;
  student?: string;
  trainingType?: string;
};

type BookingDetailsPanelProps = {
  booking: BookingDetails | null;
  open: boolean;
  onClose: () => void;
  onEdit?: (booking: BookingDetails) => void;
  onCancel?: (booking: BookingDetails) => void;
};

const STATUS_STYLES: Record<
  string,
  {
    background: string;
    text: string;
    dot: string;
  }
> = {
  Scheduled: {
    background: "#EAF2FF",
    text: "#1355B5",
    dot: "#1677FF",
  },
  Confirmed: {
    background: "#EEF4FF",
    text: "#3538CD",
    dot: "#4E5BA6",
  },
  "In Flight": {
    background: "#E8F8F1",
    text: "#087443",
    dot: "#12B76A",
  },
  Completed: {
    background: "#F2F4F7",
    text: "#475467",
    dot: "#98A2B3",
  },
  Delayed: {
    background: "#FFFAEB",
    text: "#B54708",
    dot: "#F79009",
  },
  Conflict: {
    background: "#FEF3F2",
    text: "#B42318",
    dot: "#F04438",
  },
  Cancelled: {
    background: "#FEF3F2",
    text: "#B42318",
    dot: "#D92D20",
  },
};

function formatDateTime(
  value?: string,
): string {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

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

function formatTimeRange(
  start?: string,
  end?: string,
): string {
  if (!start && !end) {
    return "—";
  }

  const formatTime = (value?: string) => {
    if (!value) {
      return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      },
    ).format(date);
  };

  return `${formatTime(start)} – ${formatTime(end)}`;
}

function getStatusStyle(status?: string) {
  if (!status) {
    return {
      background: "#F2F4F7",
      text: "#475467",
      dot: "#98A2B3",
    };
  }

  return (
    STATUS_STYLES[status] ?? {
      background: "#F2F4F7",
      text: "#475467",
      dot: "#98A2B3",
    }
  );
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
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F9FAFB] text-[#667085]">
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

export function BookingDetailsPanel({
  booking,
  open,
  onClose,
  onEdit,
  onCancel,
}: BookingDetailsPanelProps) {
  if (!open || !booking) {
    return null;
  }

  const statusStyle = getStatusStyle(
    booking.status,
  );

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#172033]/20 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-label="Booking details"
    >
      <div className="flex h-full w-full max-w-[430px] flex-col border-l border-[#E4E7EC] bg-white shadow-[-8px_0_24px_rgba(16,24,40,0.08)]">
        {/* =====================================================
            HEADER
            ===================================================== */}

        <div className="flex items-start justify-between border-b border-[#E4E7EC] px-5 py-4">
          <div className="min-w-0 pr-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#667085]">
              Schedule Details
            </p>

            <h2 className="mt-1 truncate text-lg font-semibold text-[#172033]">
              {booking.title}
            </h2>

            <p className="mt-1 text-[11px] text-[#667085]">
              Booking ID: {booking.id}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F9FAFB] hover:text-[#172033]"
            aria-label="Close booking details"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* =====================================================
            STATUS
            ===================================================== */}

        <div className="border-b border-[#E4E7EC] px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
              Status
            </span>

            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold"
              style={{
                backgroundColor:
                  statusStyle.background,
                color: statusStyle.text,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor:
                    statusStyle.dot,
                }}
              />

              {booking.status || "Scheduled"}
            </span>
          </div>
        </div>

        {/* =====================================================
            CONTENT
            ===================================================== */}

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="space-y-6">
            {/* Schedule */}

            <section>
              <div className="mb-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#98A2B3]">
                  Schedule
                </p>

                <div className="mt-1 h-px bg-[#F2F4F7]" />
              </div>

              <div className="space-y-4">
                <DetailRow
                  icon={
                    <CalendarDays className="h-4 w-4" />
                  }
                  label="Date & Start"
                  value={formatDateTime(
                    booking.start,
                  )}
                />

                <DetailRow
                  icon={
                    <Clock3 className="h-4 w-4" />
                  }
                  label="Time"
                  value={formatTimeRange(
                    booking.start,
                    booking.end,
                  )}
                />

                <DetailRow
                  icon={
                    <Plane className="h-4 w-4" />
                  }
                  label="Schedule Type"
                  value={
                    booking.type ||
                    "Flight"
                  }
                />
              </div>
            </section>

            {/* Resources */}

            <section>
              <div className="mb-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#98A2B3]">
                  Resources
                </p>

                <div className="mt-1 h-px bg-[#F2F4F7]" />
              </div>

              <div className="space-y-4">
                <DetailRow
                  icon={
                    <Plane className="h-4 w-4" />
                  }
                  label="Aircraft"
                  value={
                    booking.aircraft
                  }
                />

                <DetailRow
                  icon={
                    <UserRound className="h-4 w-4" />
                  }
                  label="Instructor"
                  value={
                    booking.instructor
                  }
                />

                <DetailRow
                  icon={
                    <GraduationCap className="h-4 w-4" />
                  }
                  label="Student"
                  value={booking.student}
                />

                <DetailRow
                  icon={
                    <Wrench className="h-4 w-4" />
                  }
                  label="Training Type"
                  value={
                    booking.trainingType
                  }
                />
              </div>
            </section>

            {/* Operational Summary */}

            <section className="rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#667085]">
                Operational Summary
              </p>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-[#E4E7EC] bg-white p-3">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                    Type
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#172033]">
                    {booking.type ||
                      "Flight"}
                  </p>
                </div>

                <div className="rounded-lg border border-[#E4E7EC] bg-white p-3">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                    Duration
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#172033]">
                    {booking.start &&
                    booking.end
                      ? `${Math.max(
                          0,
                          Math.round(
                            (new Date(
                              booking.end,
                            ).getTime() -
                              new Date(
                                booking.start,
                              ).getTime()) /
                              60000,
                          ),
                        )} min`
                      : "—"}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* =====================================================
            FOOTER ACTIONS
            ===================================================== */}

        <div className="border-t border-[#E4E7EC] bg-white px-5 py-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                onEdit?.(booking)
              }
              className="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs font-semibold text-[#344054] transition hover:bg-[#F9FAFB] active:scale-[0.98]"
            >
              <Pencil className="h-3.5 w-3.5" />

              Edit Schedule
            </button>

            <button
              type="button"
              onClick={() =>
                onCancel?.(booking)
              }
              className="flex h-9 items-center justify-center gap-2 rounded-lg border border-[#F04438]/30 bg-white px-3 text-xs font-semibold text-[#B42318] transition hover:bg-[#FEF3F2] active:scale-[0.98]"
            >
              <Ban className="h-3.5 w-3.5" />

              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}