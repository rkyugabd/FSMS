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
} from "../flightsData";

type EditFlightModalProps = {
  isOpen: boolean;
  flight: Flight | null;
  onClose: () => void;
  onSave: (flight: Flight) => void;
};

type FlightFormData = {
  flightNumber: string;
  status: FlightStatus;
  aircraft: string;
  aircraftType: string;

  origin: string;
  originName: string;

  destination: string;
  destinationName: string;

  departureDate: string;
  departureTime: string;

  arrivalDate: string;
  arrivalTime: string;

  duration: string;

  instructor: string;
  student: string;

  trainingType: string;

  passengers: string;

  gate: string;
  runway: string;

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
  "Diverted",
  "Maintenance",
];

function createFormData(
  flight: Flight,
): FlightFormData {
  return {
    flightNumber:
      flight.flightNumber ?? "",

    status:
      flight.status ?? "Scheduled",

    aircraft:
      flight.aircraft ?? "",

    aircraftType:
      flight.aircraftType ?? "",

    origin:
      flight.origin ??
      flight.departureAirport ??
      "",

    originName:
      flight.originName ??
      flight.departureAirportName ??
      "",

    destination:
      flight.destination ??
      flight.arrivalAirport ??
      "",

    destinationName:
      flight.destinationName ??
      flight.arrivalAirportName ??
      "",

    departureDate:
      flight.date ?? "",

    departureTime:
      flight.departureTime ?? "",

    arrivalDate:
      flight.date ?? "",

    arrivalTime:
      flight.arrivalTime ?? "",

    duration:
      flight.duration ?? "",

    instructor:
      flight.instructor ?? "",

    student:
      flight.student ?? "",

    trainingType:
      flight.trainingType ??
      flight.flightType ??
      "",

    passengers:
      flight.passengers !== undefined
        ? String(flight.passengers)
        : "",

    gate:
      flight.gate ?? "",

    runway:
      flight.runway ?? "",

    notes:
      flight.notes ?? "",
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

export function EditFlightModal({
  isOpen,
  flight,
  onClose,
  onSave,
}: EditFlightModalProps) {
  const [form, setForm] =
    useState<FlightFormData | null>(null);

  useEffect(() => {
    if (isOpen && flight) {
      setForm(createFormData(flight));
    }
  }, [isOpen, flight]);

  if (!isOpen || !flight || !form) {
    return null;
  }

  const updateField = (
    field: keyof FlightFormData,
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

    const origin =
      form.origin.trim();

    const destination =
      form.destination.trim();

    const updatedFlight: Flight = {
      ...flight,

      flightNumber:
        form.flightNumber.trim(),

      status: form.status,

      aircraft:
        form.aircraft.trim(),

      aircraftType:
        form.aircraftType.trim(),

      /*
       * Keep both naming conventions synchronized.
       */
      origin:
        origin || undefined,

      originName:
        form.originName.trim() ||
        undefined,

      destination:
        destination || undefined,

      destinationName:
        form.destinationName.trim() ||
        undefined,

      departureAirport:
        origin ||
        flight.departureAirport,

      departureAirportName:
        form.originName.trim() ||
        undefined,

      arrivalAirport:
        destination ||
        flight.arrivalAirport,

      arrivalAirportName:
        form.destinationName.trim() ||
        undefined,

      date:
        form.departureDate ||
        flight.date,

      departureTime:
        form.departureTime,

      arrivalTime:
        form.arrivalTime,

      duration:
        form.duration.trim(),

      instructor:
        form.instructor.trim(),

      student:
        form.student.trim(),

      trainingType:
        form.trainingType.trim() ||
        undefined,

      passengers:
        form.passengers.trim()
          ? Math.max(
              0,
              Number(form.passengers),
            )
          : undefined,

      gate:
        form.gate.trim() ||
        undefined,

      runway:
        form.runway.trim() ||
        undefined,

      notes:
        form.notes.trim() ||
        undefined,
    };

    onSave(updatedFlight);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#101828]/40 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-flight-modal-title"
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
              <Plane className="h-4 w-4 text-[#1677FF]" />
            </div>

            <div>
              <h2
                id="edit-flight-modal-title"
                className="text-base font-semibold text-[#172033]"
              >
                Edit Flight
              </h2>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                Update flight operation details
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#172033]"
            aria-label="Close edit flight modal"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* Form */}

        <form
          id="edit-flight-form"
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          {/* Flight Information */}

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
                label="Aircraft"
                value={form.aircraft}
                onChange={(value) =>
                  updateField(
                    "aircraft",
                    value,
                  )
                }
                placeholder="e.g. C-GABC"
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
              />

              <Field
                label="Training Type"
                value={form.trainingType}
                onChange={(value) =>
                  updateField(
                    "trainingType",
                    value,
                  )
                }
                placeholder="e.g. IFR Training"
              />

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
              />
            </div>
          </section>

          {/* Route */}

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <Plane className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Route
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
                    value={form.origin}
                    onChange={(value) =>
                      updateField(
                        "origin",
                        value,
                      )
                    }
                    placeholder="CYXU"
                  />

                  <Field
                    label="Airport Name"
                    value={form.originName}
                    onChange={(value) =>
                      updateField(
                        "originName",
                        value,
                      )
                    }
                    placeholder="London International"
                  />

                  <Field
                    label="Date"
                    type="date"
                    value={
                      form.departureDate
                    }
                    onChange={(value) =>
                      updateField(
                        "departureDate",
                        value,
                      )
                    }
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
                      form.destination
                    }
                    onChange={(value) =>
                      updateField(
                        "destination",
                        value,
                      )
                    }
                    placeholder="CYKF"
                  />

                  <Field
                    label="Airport Name"
                    value={
                      form.destinationName
                    }
                    onChange={(value) =>
                      updateField(
                        "destinationName",
                        value,
                      )
                    }
                    placeholder="Region of Waterloo"
                  />

                  <Field
                    label="Date"
                    type="date"
                    value={
                      form.arrivalDate
                    }
                    onChange={(value) =>
                      updateField(
                        "arrivalDate",
                        value,
                      )
                    }
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
                  />
                </div>
              </div>
            </div>
          </section>

          {/* People */}

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <UsersRound className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Personnel & Passengers
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                label="Student"
                value={form.student}
                onChange={(value) =>
                  updateField(
                    "student",
                    value,
                  )
                }
                placeholder="Student name"
              />

              <Field
                label="Passengers"
                type="number"
                value={form.passengers}
                onChange={(value) =>
                  updateField(
                    "passengers",
                    value,
                  )
                }
                placeholder="0"
              />
            </div>
          </section>

          {/* Operations */}

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Operations
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Gate"
                value={form.gate}
                onChange={(value) =>
                  updateField(
                    "gate",
                    value,
                  )
                }
                placeholder="Gate / Bay"
              />

              <Field
                label="Runway"
                value={form.runway}
                onChange={(value) =>
                  updateField(
                    "runway",
                    value,
                  )
                }
                placeholder="Runway"
              />
            </div>
          </section>

          {/* Notes */}

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

        {/* Footer */}

        <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-[#E4E7EC] bg-[#F9FAFB] px-5 py-3">
          <p className="hidden text-[10px] text-[#98A2B3] sm:block">
            Flight ID: {flight.id}
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
              form="edit-flight-form"
              className="flex h-9 items-center gap-1.5 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1264D8] active:scale-[0.98]"
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

export default EditFlightModal;