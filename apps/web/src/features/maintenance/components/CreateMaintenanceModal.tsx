import {
  CalendarDays,
  Save,
  UserRound,
  Wrench,
  X,
} from "lucide-react";

import {
  useState,
  type FormEvent,
} from "react";

import type {
  MaintenanceRecord,
  MaintenanceStatus,
  MaintenanceType,
} from "../maintenanceData";

type CreateMaintenanceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (
    maintenance: MaintenanceRecord,
  ) => void;
};

type MaintenanceFormData = {
  aircraft: string;
  registration: string;
  aircraftType: string;
  maintenanceType: MaintenanceType;
  description: string;
  status: MaintenanceStatus;
  lastServiceDate: string;
  nextDueDate: string;
  lastServiceHours: string;
  nextDueHours: string;
  currentHours: string;
  technician: string;
  workOrder: string;
  cost: string;
  notes: string;
};

const STATUS_OPTIONS: MaintenanceStatus[] =
  [
    "Scheduled",
    "Due Soon",
    "In Progress",
    "Completed",
    "Overdue",
    "Cancelled",
  ];

const TYPE_OPTIONS: MaintenanceType[] = [
  "100-Hour Inspection",
  "Annual Inspection",
  "50-Hour Inspection",
  "Engine Inspection",
  "Oil Change",
  "AD Compliance",
  "Repair",
  "Avionics",
  "Landing Gear",
  "Other",
];

const EMPTY_FORM: MaintenanceFormData =
  {
    aircraft: "",
    registration: "",
    aircraftType: "",
    maintenanceType:
      "100-Hour Inspection",
    description: "",
    status: "Scheduled",
    lastServiceDate: "",
    nextDueDate: "",
    lastServiceHours: "",
    nextDueHours: "",
    currentHours: "",
    technician: "",
    workOrder: "",
    cost: "",
    notes: "",
  };

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
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CreateMaintenanceModal({
  isOpen,
  onClose,
  onCreate,
}: CreateMaintenanceModalProps) {
  const [form, setForm] =
    useState<MaintenanceFormData>(
      EMPTY_FORM,
    );

  if (!isOpen) {
    return null;
  }

  const updateField = (
    field: keyof MaintenanceFormData,
    value: string,
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const maintenance: MaintenanceRecord =
      {
        id: `MNT-${String(
          Date.now(),
        ).slice(-6)}`,

        aircraft:
          form.aircraft.trim(),

        registration:
          form.registration.trim(),

        aircraftType:
          form.aircraftType.trim(),

        maintenanceType:
          form.maintenanceType,

        description:
          form.description.trim(),

        status: form.status,

        lastServiceDate:
          form.lastServiceDate,

        nextDueDate:
          form.nextDueDate,

        lastServiceHours:
          Number(
            form.lastServiceHours,
          ) || 0,

        nextDueHours:
          Number(
            form.nextDueHours,
          ) || 0,

        currentHours:
          Number(form.currentHours) ||
          0,

        technician:
          form.technician.trim(),

        workOrder:
          form.workOrder.trim(),

        cost:
          Number(form.cost) || 0,

        notes:
          form.notes.trim(),
      };

    onCreate(maintenance);

    setForm(EMPTY_FORM);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#101828]/40 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-maintenance-title"
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
        {/* Header */}

        <header className="flex shrink-0 items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF2FF]">
              <Wrench className="h-4 w-4 text-[#1677FF]" />
            </div>

            <div>
              <h2
                id="create-maintenance-title"
                className="text-base font-semibold text-[#172033]"
              >
                New Maintenance
              </h2>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                Create a maintenance
                record
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#172033]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* Form */}

        <form
          id="create-maintenance-form"
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          {/* Aircraft */}

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Aircraft Information
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field
                label="Aircraft"
                value={form.aircraft}
                onChange={(value) =>
                  updateField(
                    "aircraft",
                    value,
                  )
                }
                placeholder="e.g. C-GABC"
                required
              />

              <Field
                label="Registration"
                value={form.registration}
                onChange={(value) =>
                  updateField(
                    "registration",
                    value,
                  )
                }
                placeholder="e.g. C-GABC"
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
                placeholder="e.g. Cessna 172S"
                required
              />
            </div>
          </section>

          {/* Maintenance */}

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Maintenance Information
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <SelectField
                label="Maintenance Type"
                value={
                  form.maintenanceType
                }
                onChange={(value) =>
                  updateField(
                    "maintenanceType",
                    value,
                  )
                }
                options={
                  TYPE_OPTIONS
                }
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
                options={
                  STATUS_OPTIONS
                }
              />

              <Field
                label="Work Order"
                value={form.workOrder}
                onChange={(value) =>
                  updateField(
                    "workOrder",
                    value,
                  )
                }
                placeholder="e.g. WO-2026-011"
              />
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                Description
              </label>

              <textarea
                value={form.description}
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value,
                  )
                }
                rows={3}
                placeholder="Describe the maintenance work..."
                className="w-full resize-none rounded-lg border border-[#D0D5DD] bg-white px-3 py-2.5 text-xs leading-5 text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
              />
            </div>
          </section>

          {/* Schedule */}

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Service Schedule
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Field
                label="Last Service Date"
                type="date"
                value={
                  form.lastServiceDate
                }
                onChange={(value) =>
                  updateField(
                    "lastServiceDate",
                    value,
                  )
                }
              />

              <Field
                label="Next Due Date"
                type="date"
                value={
                  form.nextDueDate
                }
                onChange={(value) =>
                  updateField(
                    "nextDueDate",
                    value,
                  )
                }
              />

              <Field
                label="Last Service Hours"
                type="number"
                value={
                  form.lastServiceHours
                }
                onChange={(value) =>
                  updateField(
                    "lastServiceHours",
                    value,
                  )
                }
                placeholder="0"
              />

              <Field
                label="Next Due Hours"
                type="number"
                value={
                  form.nextDueHours
                }
                onChange={(value) =>
                  updateField(
                    "nextDueHours",
                    value,
                  )
                }
                placeholder="0"
              />
            </div>

            <div className="mt-4">
              <Field
                label="Current Aircraft Hours"
                type="number"
                value={
                  form.currentHours
                }
                onChange={(value) =>
                  updateField(
                    "currentHours",
                    value,
                  )
                }
                placeholder="0"
              />
            </div>
          </section>

          {/* Personnel */}

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <UserRound className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Personnel & Cost
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field
                label="Technician"
                value={form.technician}
                onChange={(value) =>
                  updateField(
                    "technician",
                    value,
                  )
                }
                placeholder="Technician name"
              />

              <Field
                label="Estimated Cost"
                type="number"
                value={form.cost}
                onChange={(value) =>
                  updateField(
                    "cost",
                    value,
                  )
                }
                placeholder="0"
              />

              <Field
                label="Work Order"
                value={form.workOrder}
                onChange={(value) =>
                  updateField(
                    "workOrder",
                    value,
                  )
                }
                placeholder="WO-2026-XXX"
              />
            </div>
          </section>

          {/* Notes */}

          <section className="px-5 py-5">
            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
              Notes
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
              placeholder="Add maintenance notes..."
              className="w-full resize-none rounded-lg border border-[#D0D5DD] bg-white px-3 py-2.5 text-xs leading-5 text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
            />
          </section>
        </form>

        {/* Footer */}

        <footer className="flex shrink-0 items-center justify-end gap-2 border-t border-[#E4E7EC] bg-[#F9FAFB] px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-lg border border-[#D0D5DD] bg-white px-4 text-xs font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="create-maintenance-form"
            className="flex h-9 items-center gap-1.5 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1264D8]"
          >
            <Save className="h-3.5 w-3.5" />

            Create Maintenance
          </button>
        </footer>
      </div>
    </div>
  );
}

export default CreateMaintenanceModal;