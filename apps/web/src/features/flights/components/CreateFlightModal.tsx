import {
  CalendarDays,
  Plane,
  Save,
  UsersRound,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import type {
  Flight,
  FlightStatus,
  FlightType,
} from "../flightsData";

type CreateFlightModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (flight: Flight) => void;
};

type FlightFormData = {
  flightNumber: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;
  aircraft: string;
  aircraftType: string;
  instructor: string;
  student: string;
  flightType: FlightType;
  status: FlightStatus;
  duration: string;
  notes: string;
};

const STATUS_OPTIONS: FlightStatus[] = [
  "Scheduled",
  "Confirmed",
  "Boarding",
  "In Flight",
  "Landed",
  "Delayed",
  "Cancelled",
  "Completed",
];

const FLIGHT_TYPE_OPTIONS: FlightType[] = [
  "Training",
  "Solo",
  "Checkride",
  "Cross-Country",
  "Simulator",
  "Maintenance",
];

const INITIAL_FORM: FlightFormData = {
  flightNumber: "",
  date: "",
  departureTime: "",
  arrivalTime: "",
  departureAirport: "",
  arrivalAirport: "",
  aircraft: "",
  aircraftType: "",
  instructor: "",
  student: "",
  flightType: "Training",
  status: "Scheduled",
  duration: "",
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
  options: readonly string[];
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

export function CreateFlightModal({
  isOpen,
  onClose,
  onCreate,
}: CreateFlightModalProps) {
  const [form, setForm] =
    useState<FlightFormData>(INITIAL_FORM);

  useEffect(() => {
    if (isOpen) {
      setForm(INITIAL_FORM);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const updateField = (
    field: keyof FlightFormData,
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

    const generatedId = `FLT-${Date.now()}`;

    const newFlight: Flight = {
      id: generatedId,

      flightNumber:
        form.flightNumber.trim(),

      date: form.date,

      departureTime:
        form.departureTime,

      arrivalTime:
        form.arrivalTime,

      departureAirport:
        form.departureAirport
          .trim()
          .toUpperCase(),

      arrivalAirport:
        form.arrivalAirport
          .trim()
          .toUpperCase(),

      aircraft:
        form.aircraft.trim(),

      aircraftType:
        form.aircraftType.trim(),

      instructor:
        form.instructor.trim(),

      student:
        form.student.trim(),

      flightType:
        form.flightType,

      status:
        form.status,

      duration:
        form.duration.trim(),

      notes:
        form.notes.trim() || undefined,
    };

    onCreate(newFlight);
    setForm(INITIAL_FORM);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#101828]/40 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-flight-modal-title"
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
              <Plane className="h-4 w-4 text-[#1677FF]" />
            </div>

            <div>
              <h2
                id="create-flight-modal-title"
                className="text-base font-semibold text-[#172033]"
              >
                Create Flight
              </h2>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                Create a new flight operation
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#172033]"
            aria-label="Close create flight modal"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* FORM */}

        <form
          id="create-flight-form"
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          {/* FLIGHT INFORMATION */}

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <Plane className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Flight Information
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field
                label="Flight Number"
                value={form.flightNumber}
                onChange={(value) =>
                  updateField(
                    "flightNumber",
                    value,
                  )
                }
                placeholder="e.g. FS-221"
                required
              />

              <Field
                label="Date"
                type="date"
                value={form.date}
                onChange={(value) =>
                  updateField(
                    "date",
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

              <SelectField
                label="Flight Type"
                value={form.flightType}
                onChange={(value) =>
                  updateField(
                    "flightType",
                    value,
                  )
                }
                options={FLIGHT_TYPE_OPTIONS}
              />

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
                label="Aircraft Type"
                value={form.aircraftType}
                onChange={(value) =>
                  updateField(
                    "aircraftType",
                    value,
                  )
                }
                placeholder="e.g. Cessna 172"
                required
              />
            </div>
          </section>

          {/* SCHEDULE */}

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Schedule & Route
              </h3>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {/* Departure */}

              <div className="rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] p-4">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                  Departure
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Airport"
                    value={
                      form.departureAirport
                    }
                    onChange={(value) =>
                      updateField(
                        "departureAirport",
                        value,
                      )
                    }
                    placeholder="CYXU"
                    required
                  />

                  <Field
                    label="Time"
                    type="time"
                    value={
                      form.departureTime
                    }
                    onChange={(value) =>
                      updateField(
                        "departureTime",
                        value,
                      )
                    }
                    required
                  />
                </div>
              </div>

              {/* Arrival */}

              <div className="rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] p-4">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                  Arrival
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Airport"
                    value={
                      form.arrivalAirport
                    }
                    onChange={(value) =>
                      updateField(
                        "arrivalAirport",
                        value,
                      )
                    }
                    placeholder="CYKF"
                    required
                  />

                  <Field
                    label="Time"
                    type="time"
                    value={
                      form.arrivalTime
                    }
                    onChange={(value) =>
                      updateField(
                        "arrivalTime",
                        value,
                      )
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 max-w-sm">
              <Field
                label="Duration"
                value={form.duration}
                onChange={(value) =>
                  updateField(
                    "duration",
                    value,
                  )
                }
                placeholder="e.g. 1h 30m"
                required
              />
            </div>
          </section>

          {/* PERSONNEL */}

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <UsersRound className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Personnel
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
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
                required
              />

              <Field
                label="Student"
                value={form.student}
                onChange={(value) =>
                  updateField(
                    "student",
                    value,
                  )
                }
                placeholder="Student name"
                required
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
            form="create-flight-form"
            className="flex h-9 items-center gap-1.5 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1264D8] active:scale-[0.98]"
          >
            <Save className="h-3.5 w-3.5" />

            Create Flight
          </button>
        </footer>
      </div>
    </div>
  );
}

export default CreateFlightModal;