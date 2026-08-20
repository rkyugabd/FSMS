import {
  AlertTriangle,
  CalendarDays,
  Clock3,
  DollarSign,
  FileText,
  Plane,
  UserRound,
  Wrench,
  X,
} from "lucide-react";

import type {
  MaintenanceRecord,
} from "../maintenanceData";

type MaintenanceDetailsProps = {
  maintenance: MaintenanceRecord;
  onClose: () => void;
  onEdit: (
    maintenance: MaintenanceRecord,
  ) => void;
  onDelete: (id: string) => void;
};

function formatDate(
  value: string,
): string {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  ).format(
    new Date(`${value}T00:00:00`),
  );
}

const STATUS_STYLES: Record<
  MaintenanceRecord["status"],
  string
> = {
  Scheduled:
    "bg-[#EAF2FF] text-[#1355B5]",
  "Due Soon":
    "bg-[#FFFAEB] text-[#B54708]",
  "In Progress":
    "bg-[#F2EDFF] text-[#6941C6]",
  Completed:
    "bg-[#E8F8F1] text-[#087443]",
  Overdue:
    "bg-[#FEF3F2] text-[#B42318]",
  Cancelled:
    "bg-[#F2F4F7] text-[#475467]",
};

function DetailItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-[#E4E7EC] bg-white p-3">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
        {icon}
        {label}
      </div>

      <p className="mt-2 text-xs font-semibold text-[#344054]">
        {value}
      </p>
    </div>
  );
}

export function MaintenanceDetails({
  maintenance,
  onClose,
  onEdit,
  onDelete,
}: MaintenanceDetailsProps) {
  const remainingHours =
    maintenance.nextDueHours > 0
      ? maintenance.nextDueHours -
        maintenance.currentHours
      : null;

  return (
    <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      {/* Header */}

      <header className="flex items-start justify-between border-b border-[#E4E7EC] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF2FF]">
            <Wrench className="h-4 w-4 text-[#1677FF]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-[#172033]">
                {maintenance.maintenanceType}
              </h2>

              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-semibold ${STATUS_STYLES[maintenance.status]}`}
              >
                {maintenance.status}
              </span>
            </div>

            <p className="mt-0.5 text-[11px] text-[#667085]">
              {maintenance.id} ·{" "}
              {maintenance.workOrder}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#172033]"
          aria-label="Close maintenance details"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      {/* Aircraft */}

      <section className="border-b border-[#E4E7EC] px-5 py-5">
        <div className="mb-3 flex items-center gap-2">
          <Plane className="h-4 w-4 text-[#667085]" />

          <h3 className="text-xs font-semibold text-[#172033]">
            Aircraft
          </h3>
        </div>

        <div className="rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-base font-semibold text-[#172033]">
                {maintenance.registration}
              </p>

              <p className="mt-0.5 text-xs text-[#667085]">
                {maintenance.aircraftType}
              </p>
            </div>

            <div className="rounded-lg bg-white px-4 py-2">
              <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                Current Hours
              </p>

              <p className="mt-1 text-sm font-semibold text-[#172033]">
                {maintenance.currentHours}{" "}
                hrs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance information */}

      <section className="border-b border-[#E4E7EC] px-5 py-5">
        <div className="mb-3 flex items-center gap-2">
          <Wrench className="h-4 w-4 text-[#667085]" />

          <h3 className="text-xs font-semibold text-[#172033]">
            Maintenance Information
          </h3>
        </div>

        <p className="text-xs leading-5 text-[#475467]">
          {maintenance.description}
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <DetailItem
            label="Last Service"
            value={formatDate(
              maintenance.lastServiceDate,
            )}
            icon={
              <CalendarDays className="h-3 w-3" />
            }
          />

          <DetailItem
            label="Next Due"
            value={formatDate(
              maintenance.nextDueDate,
            )}
            icon={
              <CalendarDays className="h-3 w-3" />
            }
          />

          <DetailItem
            label="Last Service Hours"
            value={`${maintenance.lastServiceHours} hrs`}
            icon={
              <Clock3 className="h-3 w-3" />
            }
          />

          <DetailItem
            label="Next Due Hours"
            value={
              maintenance.nextDueHours > 0
                ? `${maintenance.nextDueHours} hrs`
                : "Calendar based"
            }
            icon={
              <Clock3 className="h-3 w-3" />
            }
          />
        </div>

        {remainingHours !== null && (
          <div
            className={`mt-4 rounded-lg border px-4 py-3 ${
              remainingHours <= 0
                ? "border-[#FECDCA] bg-[#FEF3F2]"
                : remainingHours <= 25
                  ? "border-[#FEDF89] bg-[#FFFAEB]"
                  : "border-[#D1FADF] bg-[#E8F8F1]"
            }`}
          >
            <div className="flex items-center gap-2">
              {remainingHours <= 0 ? (
                <AlertTriangle className="h-4 w-4 text-[#F04438]" />
              ) : (
                <Clock3 className="h-4 w-4 text-[#667085]" />
              )}

              <div>
                <p className="text-xs font-semibold text-[#344054]">
                  {remainingHours <= 0
                    ? "Maintenance interval exceeded"
                    : `${remainingHours.toFixed(1)} flight hours remaining`}
                </p>

                <p className="mt-0.5 text-[10px] text-[#667085]">
                  Current aircraft hours:{" "}
                  {
                    maintenance.currentHours
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Technician / Cost */}

      <section className="border-b border-[#E4E7EC] px-5 py-5">
        <div className="mb-3 flex items-center gap-2">
          <UserRound className="h-4 w-4 text-[#667085]" />

          <h3 className="text-xs font-semibold text-[#172033]">
            Maintenance Personnel
          </h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <DetailItem
            label="Technician"
            value={
              maintenance.technician ||
              "Not assigned"
            }
            icon={
              <UserRound className="h-3 w-3" />
            }
          />

          <DetailItem
            label="Work Order"
            value={
              maintenance.workOrder ||
              "Not assigned"
            }
            icon={
              <FileText className="h-3 w-3" />
            }
          />

          <DetailItem
            label="Estimated Cost"
            value={`$${maintenance.cost.toLocaleString(
              "en-CA",
              {
                minimumFractionDigits: 2,
              },
            )}`}
            icon={
              <DollarSign className="h-3 w-3" />
            }
          />
        </div>
      </section>

      {/* Notes */}

      <section className="px-5 py-5">
        <div className="mb-2 flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#667085]" />

          <h3 className="text-xs font-semibold text-[#172033]">
            Maintenance Notes
          </h3>
        </div>

        <div className="rounded-lg border border-[#E4E7EC] bg-[#F9FAFB] p-4">
          <p className="text-xs leading-5 text-[#475467]">
            {maintenance.notes ||
              "No maintenance notes have been added."}
          </p>
        </div>
      </section>

      {/* Footer */}

      <footer className="flex flex-col gap-2 border-t border-[#E4E7EC] bg-[#F9FAFB] px-5 py-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() =>
            onDelete(maintenance.id)
          }
          className="h-9 rounded-lg border border-[#FECDCA] bg-white px-4 text-xs font-semibold text-[#B42318] transition hover:bg-[#FEF3F2]"
        >
          Delete
        </button>

        <button
          type="button"
          onClick={() =>
            onEdit(maintenance)
          }
          className="h-9 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white transition hover:bg-[#1264D8]"
        >
          Edit Maintenance
        </button>
      </footer>
    </div>
  );
}