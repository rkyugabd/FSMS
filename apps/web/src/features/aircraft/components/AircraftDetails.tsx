import {
  CalendarDays,
  Clock3,
  MapPin,
  Plane,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

import type { Aircraft } from "../aircraftData";

type AircraftDetailsProps = {
  aircraft: Aircraft;
  onClose: () => void;
  onEdit: (aircraft: Aircraft) => void;
  onDelete: (aircraftId: string) => void;
};

const STATUS_STYLES: Record<
  Aircraft["status"],
  {
    background: string;
    text: string;
    dot: string;
  }
> = {
  Available: {
    background: "bg-[#E8F8F1]",
    text: "text-[#087443]",
    dot: "bg-[#12B76A]",
  },

  "In Flight": {
    background: "bg-[#EAF2FF]",
    text: "text-[#1355B5]",
    dot: "bg-[#1677FF]",
  },

  Maintenance: {
    background: "bg-[#FFFAEB]",
    text: "text-[#B54708]",
    dot: "bg-[#F79009]",
  },

  Reserved: {
    background: "bg-[#F2EDFF]",
    text: "text-[#6941C6]",
    dot: "bg-[#7F56D9]",
  },

  Grounded: {
    background: "bg-[#FEF3F2]",
    text: "text-[#B42318]",
    dot: "bg-[#F04438]",
  },

  Retired: {
    background: "bg-[#F2F4F7]",
    text: "text-[#475467]",
    dot: "bg-[#98A2B3]",
  },
};

function formatDate(value: string) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    },
  ).format(new Date(`${value}T00:00:00Z`));
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
        {label}
      </p>

      <p className="mt-1 text-xs font-medium text-[#344054]">
        {value === "" ? "—" : value}
      </p>
    </div>
  );
}

export function AircraftDetails({
  aircraft,
  onClose,
  onEdit,
  onDelete,
}: AircraftDetailsProps) {
  const statusStyle =
    STATUS_STYLES[aircraft.status];

  return (
    <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <header className="flex items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF2FF]">
            <Plane className="h-5 w-5 text-[#1677FF]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-[#172033]">
                {aircraft.registration}
              </h2>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[9px] font-semibold ${statusStyle.background} ${statusStyle.text}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                />

                {aircraft.status}
              </span>
            </div>

            <p className="mt-0.5 text-[11px] text-[#667085]">
              {aircraft.manufacturer}{" "}
              {aircraft.model} ·{" "}
              {aircraft.aircraftType}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#172033]"
          aria-label="Close aircraft details"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div className="grid gap-0 lg:grid-cols-2">
        <section className="border-b border-[#E4E7EC] px-5 py-5 lg:border-r">
          <div className="mb-4 flex items-center gap-2">
            <Plane className="h-4 w-4 text-[#667085]" />

            <h3 className="text-xs font-semibold text-[#172033]">
              Aircraft Information
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <DetailItem
              label="Registration"
              value={aircraft.registration}
            />

            <DetailItem
              label="Aircraft Type"
              value={aircraft.aircraftType}
            />

            <DetailItem
              label="Manufacturer"
              value={aircraft.manufacturer}
            />

            <DetailItem
              label="Model"
              value={aircraft.model}
            />

            <DetailItem
              label="Serial Number"
              value={aircraft.serialNumber}
            />

            <DetailItem
              label="Year"
              value={aircraft.year}
            />
          </div>
        </section>

        <section className="border-b border-[#E4E7EC] px-5 py-5">
          <div className="mb-4 flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-[#667085]" />

            <h3 className="text-xs font-semibold text-[#172033]">
              Flight Operations
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <DetailItem
              label="Total Flight Hours"
              value={`${aircraft.totalFlightHours.toLocaleString()} h`}
            />

            <DetailItem
              label="Engine Hours"
              value={`${aircraft.engineHours.toLocaleString()} h`}
            />

            <DetailItem
              label="Cycles"
              value={aircraft.cycles.toLocaleString()}
            />

            <DetailItem
              label="Location"
              value={aircraft.location}
            />

            <DetailItem
              label="Assigned Instructor"
              value={aircraft.assignedInstructor}
            />
          </div>
        </section>

        <section className="border-b border-[#E4E7EC] px-5 py-5 lg:border-r">
          <div className="mb-4 flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-[#667085]" />

            <h3 className="text-xs font-semibold text-[#172033]">
              Maintenance
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <DetailItem
              label="Last Maintenance"
              value={formatDate(
                aircraft.lastMaintenanceDate,
              )}
            />

            <DetailItem
              label="Next Maintenance"
              value={formatDate(
                aircraft.nextMaintenanceDate,
              )}
            />

            <DetailItem
              label="Maintenance Hours"
              value={
                aircraft.nextMaintenanceHours > 0
                  ? `${aircraft.nextMaintenanceHours} h remaining`
                  : "Due"
              }
            />
          </div>
        </section>

        <section className="border-b border-[#E4E7EC] px-5 py-5">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#667085]" />

            <h3 className="text-xs font-semibold text-[#172033]">
              Compliance
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <DetailItem
              label="Insurance Expiry"
              value={formatDate(
                aircraft.insuranceExpiry,
              )}
            />

            <DetailItem
              label="Registration Expiry"
              value={formatDate(
                aircraft.registrationExpiry,
              )}
            />
          </div>
        </section>
      </div>

      <section className="border-b border-[#E4E7EC] px-5 py-5">
        <div className="mb-4 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#667085]" />

          <h3 className="text-xs font-semibold text-[#172033]">
            Assignment
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-lg bg-[#F9FAFB] p-3">
            <MapPin className="h-4 w-4 text-[#667085]" />

            <div>
              <p className="text-[10px] text-[#98A2B3]">
                Location
              </p>

              <p className="mt-0.5 text-xs font-medium text-[#344054]">
                {aircraft.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-[#F9FAFB] p-3">
            <UserRound className="h-4 w-4 text-[#667085]" />

            <div>
              <p className="text-[10px] text-[#98A2B3]">
                Instructor
              </p>

              <p className="mt-0.5 text-xs font-medium text-[#344054]">
                {aircraft.assignedInstructor}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
          Operational Notes
        </p>

        <p className="mt-2 text-xs leading-5 text-[#475467]">
          {aircraft.notes || "No operational notes."}
        </p>
      </section>

      <footer className="flex items-center justify-between gap-3 border-t border-[#E4E7EC] bg-[#F9FAFB] px-5 py-3">
        <p className="text-[10px] text-[#98A2B3]">
          Aircraft ID: {aircraft.id}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              onDelete(aircraft.id)
            }
            className="h-9 rounded-lg border border-[#FECDCA] bg-white px-4 text-xs font-semibold text-[#B42318] transition hover:bg-[#FEF3F2]"
          >
            Delete
          </button>

          <button
            type="button"
            onClick={() => onEdit(aircraft)}
            className="h-9 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white transition hover:bg-[#1264D8]"
          >
            Edit Aircraft
          </button>
        </div>
      </footer>
    </div>
  );
}

export default AircraftDetails;