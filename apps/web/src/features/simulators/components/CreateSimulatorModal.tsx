import {
  Monitor,
  Save,
 
  UsersRound,
  Wrench,
  X,
} from "lucide-react";

import {
  useState,
  type FormEvent,
} from "react";

import type {
  Simulator,
  SimulatorStatus,
  SimulatorType,
} from "../simulatorsData";

type CreateSimulatorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (
    simulator: Simulator,
  ) => void;
};

type SimulatorFormData = {
  simulatorId: string;
  name: string;
  type: SimulatorType;
  model: string;
  status: SimulatorStatus;
  location: string;
  capacity: string;
  instructor: string;
  hoursUsed: string;
  lastMaintenance: string;
  nextMaintenance: string;
  notes: string;
};

const STATUS_OPTIONS: SimulatorStatus[] = [
  "Available",
  "In Use",
  "Maintenance",
  "Offline",
];

const TYPE_OPTIONS: SimulatorType[] = [
  "Full Flight Simulator",
  "Flight Training Device",
  "Flight Simulation Training Device",
  "Desktop Simulator",
];

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

const INITIAL_FORM: SimulatorFormData = {
  simulatorId: "",
  name: "",
  type: "Full Flight Simulator",
  model: "",
  status: "Available",
  location: "",
  capacity: "1",
  instructor: "",
  hoursUsed: "0",
  lastMaintenance: "",
  nextMaintenance: "",
  notes: "",
};

export function CreateSimulatorModal({
  isOpen,
  onClose,
  onCreate,
}: CreateSimulatorModalProps) {
  const [form, setForm] =
    useState<SimulatorFormData>(
      INITIAL_FORM,
    );

  if (!isOpen) {
    return null;
  }

  const updateField = (
    field: keyof SimulatorFormData,
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

    const simulatorId =
      form.simulatorId.trim();

    const newSimulator: Simulator = {
      id:
        simulatorId ||
        `SIM-${Date.now()}`,

      simulatorId:
        simulatorId ||
        `SIM-${Date.now()}`,

      name: form.name.trim(),

      type: form.type,

      model: form.model.trim(),

      status: form.status,

      location: form.location.trim(),

      capacity:
        Number(form.capacity) || 1,

      instructor:
        form.instructor.trim(),

      hoursUsed:
        Number(form.hoursUsed) || 0,

      lastMaintenance:
        form.lastMaintenance,

      nextMaintenance:
        form.nextMaintenance,

      notes:
        form.notes.trim() || undefined,
    };

    onCreate(newSimulator);

    setForm(INITIAL_FORM);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#101828]/40 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-simulator-modal-title"
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
        {/* HEADER */}

        <header className="flex shrink-0 items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF2FF]">
              <Monitor className="h-4 w-4 text-[#1677FF]" />
            </div>

            <div>
              <h2
                id="create-simulator-modal-title"
                className="text-base font-semibold text-[#172033]"
              >
                New Simulator
              </h2>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                Add training equipment to
                the simulator inventory
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#172033]"
            aria-label="Close create simulator modal"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* FORM */}

        <form
          id="create-simulator-form"
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          {/* BASIC */}

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <Monitor className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Simulator Information
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field
                label="Simulator ID"
                value={form.simulatorId}
                onChange={(value) =>
                  updateField(
                    "simulatorId",
                    value,
                  )
                }
                placeholder="e.g. SIM-011"
                required
              />

              <Field
                label="Name"
                value={form.name}
                onChange={(value) =>
                  updateField(
                    "name",
                    value,
                  )
                }
                placeholder="Simulator name"
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
                placeholder="e.g. Cessna 172 G1000"
                required
              />

              <SelectField
                label="Type"
                value={form.type}
                onChange={(value) =>
                  updateField(
                    "type",
                    value,
                  )
                }
                options={TYPE_OPTIONS}
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
                label="Location"
                value={form.location}
                onChange={(value) =>
                  updateField(
                    "location",
                    value,
                  )
                }
                placeholder="Training Centre A"
                required
              />
            </div>
          </section>

          {/* CAPACITY / PERSONNEL */}

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <UsersRound className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Capacity & Personnel
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field
                label="Capacity"
                type="number"
                value={form.capacity}
                onChange={(value) =>
                  updateField(
                    "capacity",
                    value,
                  )
                }
                placeholder="1"
              />

              <Field
                label="Instructor"
                value={form.instructor}
                onChange={(value) =>
                  updateField(
                    "instructor",
                    value,
                  )
                }
                placeholder="Instructor name"
              />

              <Field
                label="Hours Used"
                type="number"
                value={form.hoursUsed}
                onChange={(value) =>
                  updateField(
                    "hoursUsed",
                    value,
                  )
                }
                placeholder="0"
              />
            </div>
          </section>

          {/* MAINTENANCE */}

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Maintenance
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Last Maintenance"
                type="date"
                value={
                  form.lastMaintenance
                }
                onChange={(value) =>
                  updateField(
                    "lastMaintenance",
                    value,
                  )
                }
              />

              <Field
                label="Next Maintenance"
                type="date"
                value={
                  form.nextMaintenance
                }
                onChange={(value) =>
                  updateField(
                    "nextMaintenance",
                    value,
                  )
                }
              />
            </div>
          </section>

          {/* NOTES */}

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
              placeholder="Add operational notes..."
              className="w-full resize-none rounded-lg border border-[#D0D5DD] bg-white px-3 py-2.5 text-xs leading-5 text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
            />
          </section>
        </form>

        {/* FOOTER */}

        <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-[#E4E7EC] bg-[#F9FAFB] px-5 py-3">
          <p className="hidden text-[10px] text-[#98A2B3] sm:block">
            Create a new simulator
            record.
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
              form="create-simulator-form"
              className="flex h-9 items-center gap-1.5 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1264D8] active:scale-[0.98]"
            >
              <Save className="h-3.5 w-3.5" />

              Create Simulator
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default CreateSimulatorModal;