import {
  Plane,
  Save,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import type {
  Aircraft,
  AircraftStatus,
} from "../aircraftData";

type EditAircraftModalProps = {
  isOpen: boolean;
  aircraft: Aircraft | null;
  onClose: () => void;
  onSave: (aircraft: Aircraft) => void;
};

type AircraftFormData = {
  registration: string;
  aircraftType: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  year: string;
  status: AircraftStatus;
  totalFlightHours: string;
  engineHours: string;
  cycles: string;
  location: string;
  assignedInstructor: string;
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  nextMaintenanceHours: string;
  insuranceExpiry: string;
  registrationExpiry: string;
  notes: string;
};

const STATUS_OPTIONS: AircraftStatus[] = [
  "Available",
  "In Flight",
  "Maintenance",
  "Reserved",
  "Grounded",
  "Retired",
];

function createFormData(
  aircraft: Aircraft,
): AircraftFormData {
  return {
    registration: aircraft.registration,
    aircraftType: aircraft.aircraftType,
    manufacturer: aircraft.manufacturer,
    model: aircraft.model,
    serialNumber: aircraft.serialNumber,
    year: String(aircraft.year),
    status: aircraft.status,
    totalFlightHours: String(
      aircraft.totalFlightHours,
    ),
    engineHours: String(
      aircraft.engineHours,
    ),
    cycles: String(aircraft.cycles),
    location: aircraft.location,
    assignedInstructor:
      aircraft.assignedInstructor,
    lastMaintenanceDate:
      aircraft.lastMaintenanceDate,
    nextMaintenanceDate:
      aircraft.nextMaintenanceDate,
    nextMaintenanceHours: String(
      aircraft.nextMaintenanceHours,
    ),
    insuranceExpiry:
      aircraft.insuranceExpiry,
    registrationExpiry:
      aircraft.registrationExpiry,
    notes: aircraft.notes,
  };
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
        {label}
        {required && (
          <span className="ml-0.5 text-[#F04438]">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#172033] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export function EditAircraftModal({
  isOpen,
  aircraft,
  onClose,
  onSave,
}: EditAircraftModalProps) {
  const [form, setForm] =
    useState<AircraftFormData | null>(
      null,
    );

  useEffect(() => {
    if (isOpen && aircraft) {
      setForm(createFormData(aircraft));
    }
  }, [isOpen, aircraft]);

  if (!isOpen || !aircraft || !form) {
    return null;
  }

  const updateField = (
    field: keyof AircraftFormData,
    value: string,
  ) => {
    setForm((previous) =>
      previous
        ? {
            ...previous,
            [field]: value,
          }
        : previous,
    );
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const updatedAircraft: Aircraft = {
      ...aircraft,

      registration:
        form.registration.trim(),

      aircraftType:
        form.aircraftType.trim(),

      manufacturer:
        form.manufacturer.trim(),

      model: form.model.trim(),

      serialNumber:
        form.serialNumber.trim(),

      year:
        Number(form.year) ||
        aircraft.year,

      status: form.status,

      totalFlightHours:
        Number(form.totalFlightHours) || 0,

      engineHours:
        Number(form.engineHours) || 0,

      cycles: Number(form.cycles) || 0,

      location:
        form.location.trim(),

      assignedInstructor:
        form.assignedInstructor.trim() ||
        "N/A",

      lastMaintenanceDate:
        form.lastMaintenanceDate,

      nextMaintenanceDate:
        form.nextMaintenanceDate,

      nextMaintenanceHours:
        Number(form.nextMaintenanceHours) || 0,

      insuranceExpiry:
        form.insuranceExpiry,

      registrationExpiry:
        form.registrationExpiry,

      notes: form.notes.trim(),
    };

    onSave(updatedAircraft);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#101828]/40 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-aircraft-title"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white shadow-[0_20px_50px_rgba(16,24,40,0.18)]">
        <header className="flex shrink-0 items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF2FF]">
              <Plane className="h-4 w-4 text-[#1677FF]" />
            </div>

            <div>
              <h2
                id="edit-aircraft-title"
                className="text-base font-semibold text-[#172033]"
              >
                Edit Aircraft
              </h2>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                Update fleet and maintenance information
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7]"
            aria-label="Close edit aircraft modal"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <form
          id="edit-aircraft-form"
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <Plane className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Aircraft Information
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field
                label="Registration"
                value={form.registration}
                onChange={(value) =>
                  updateField(
                    "registration",
                    value,
                  )
                }
                required
              />

              <Field
                label="Aircraft Type"
                value={form.aircraftType}
                onChange={(value) =>
                  updateField(
                    "aircraftType",
                    value,
                  )
                }
                required
              />

              <SelectField
                label="Status"
                value={form.status}
                onChange={(value) =>
                  updateField(
                    "status",
                    value,
                  )
                }
                options={STATUS_OPTIONS}
              />

              <Field
                label="Manufacturer"
                value={form.manufacturer}
                onChange={(value) =>
                  updateField(
                    "manufacturer",
                    value,
                  )
                }
                required
              />

              <Field
                label="Model"
                value={form.model}
                onChange={(value) =>
                  updateField(
                    "model",
                    value,
                  )
                }
                required
              />

              <Field
                label="Serial Number"
                value={form.serialNumber}
                onChange={(value) =>
                  updateField(
                    "serialNumber",
                    value,
                  )
                }
              />

              <Field
                label="Year"
                type="number"
                value={form.year}
                onChange={(value) =>
                  updateField(
                    "year",
                    value,
                  )
                }
              />
            </div>
          </section>

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <h3 className="mb-4 text-xs font-semibold text-[#172033]">
              Operations
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field
                label="Location"
                value={form.location}
                onChange={(value) =>
                  updateField(
                    "location",
                    value,
                  )
                }
              />

              <Field
                label="Assigned Instructor"
                value={form.assignedInstructor}
                onChange={(value) =>
                  updateField(
                    "assignedInstructor",
                    value,
                  )
                }
              />

              <Field
                label="Total Flight Hours"
                type="number"
                value={form.totalFlightHours}
                onChange={(value) =>
                  updateField(
                    "totalFlightHours",
                    value,
                  )
                }
              />

              <Field
                label="Engine Hours"
                type="number"
                value={form.engineHours}
                onChange={(value) =>
                  updateField(
                    "engineHours",
                    value,
                  )
                }
              />

              <Field
                label="Cycles"
                type="number"
                value={form.cycles}
                onChange={(value) =>
                  updateField(
                    "cycles",
                    value,
                  )
                }
              />
            </div>
          </section>

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <h3 className="mb-4 text-xs font-semibold text-[#172033]">
              Maintenance
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field
                label="Last Maintenance"
                type="date"
                value={form.lastMaintenanceDate}
                onChange={(value) =>
                  updateField(
                    "lastMaintenanceDate",
                    value,
                  )
                }
              />

              <Field
                label="Next Maintenance"
                type="date"
                value={form.nextMaintenanceDate}
                onChange={(value) =>
                  updateField(
                    "nextMaintenanceDate",
                    value,
                  )
                }
              />

              <Field
                label="Maintenance Hours"
                type="number"
                value={form.nextMaintenanceHours}
                onChange={(value) =>
                  updateField(
                    "nextMaintenanceHours",
                    value,
                  )
                }
              />
            </div>
          </section>

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <h3 className="mb-4 text-xs font-semibold text-[#172033]">
              Compliance
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Insurance Expiry"
                type="date"
                value={form.insuranceExpiry}
                onChange={(value) =>
                  updateField(
                    "insuranceExpiry",
                    value,
                  )
                }
              />

              <Field
                label="Registration Expiry"
                type="date"
                value={form.registrationExpiry}
                onChange={(value) =>
                  updateField(
                    "registrationExpiry",
                    value,
                  )
                }
              />
            </div>
          </section>

          <section className="px-5 py-5">
            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
              Operational Notes
            </label>

            <textarea
              value={form.notes}
              onChange={(event) =>
                updateField(
                  "notes",
                  event.target.value,
                )
              }
              rows={4}
              placeholder="Add aircraft notes..."
              className="w-full resize-none rounded-lg border border-[#D0D5DD] bg-white px-3 py-2.5 text-xs leading-5 text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
            />
          </section>
        </form>

        <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-[#E4E7EC] bg-[#F9FAFB] px-5 py-3">
          <p className="hidden text-[10px] text-[#98A2B3] sm:block">
            Aircraft ID: {aircraft.id}
          </p>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-9 rounded-lg border border-[#D0D5DD] bg-white px-4 text-xs font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="edit-aircraft-form"
              className="flex h-9 items-center gap-1.5 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1264D8]"
            >
              <Save className="h-3.5 w-3.5" />
              Save Changes
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default EditAircraftModal;