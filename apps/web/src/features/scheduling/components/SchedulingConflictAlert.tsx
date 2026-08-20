import {
  CalendarDays,
  Clock3,
  Plane,
  UserRound,
  GraduationCap,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";

export type ScheduleFormData = {
  title: string;
  type: "Flight" | "Simulator" | "Training" | "Maintenance";
  date: string;
  startTime: string;
  endTime: string;
  aircraft: string;
  instructor: string;
  student: string;
  trainingType: string;
  status:
    | "Scheduled"
    | "Confirmed"
    | "In Flight"
    | "Completed"
    | "Delayed"
    | "Conflict"
    | "Cancelled";
  notes: string;
};

type CreateScheduleModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: ScheduleFormData) => void;
};

const DEFAULT_FORM: ScheduleFormData = {
  title: "",
  type: "Flight",
  date: "2026-08-18",
  startTime: "08:00",
  endTime: "09:00",
  aircraft: "",
  instructor: "",
  student: "",
  trainingType: "",
  status: "Scheduled",
  notes: "",
};

const aircraftOptions = [
  "Select aircraft",
  "C-GABC · Cessna 172",
  "C-GDEF · Cessna 172",
  "C-GHIJ · Piper PA-28",
  "C-GKLM · Diamond DA40",
];

const instructorOptions = [
  "Select instructor",
  "John Smith",
  "Michael Brown",
  "Sarah Wilson",
  "David Anderson",
];

const studentOptions = [
  "Select student",
  "Alex Johnson",
  "Emma Davis",
  "Daniel Miller",
  "Sophia Wilson",
];

const trainingOptions = [
  "Select training type",
  "Private Pilot",
  "Commercial Pilot",
  "Instrument Rating",
  "Multi-Engine",
  "Flight Review",
];

export function CreateScheduleModal({
  open,
  onClose,
  onSubmit,
}: CreateScheduleModalProps) {
  const [form, setForm] =
    useState<ScheduleFormData>(
      DEFAULT_FORM,
    );

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    if (!open) {
      return;
    }

    setForm(DEFAULT_FORM);
    setErrors({});
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const updateField = <
    K extends keyof ScheduleFormData,
  >(
    field: K,
    value: ScheduleFormData[K],
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((previous) => {
        const next = {
          ...previous,
        };

        delete next[field];

        return next;
      });
    }
  };

  const validate = () => {
    const nextErrors: Record<
      string,
      string
    > = {};

    if (!form.title.trim()) {
      nextErrors.title =
        "Schedule title is required.";
    }

    if (!form.date) {
      nextErrors.date =
        "Date is required.";
    }

    if (!form.startTime) {
      nextErrors.startTime =
        "Start time is required.";
    }

    if (!form.endTime) {
      nextErrors.endTime =
        "End time is required.";
    }

    if (
      form.startTime &&
      form.endTime &&
      form.startTime >= form.endTime
    ) {
      nextErrors.endTime =
        "End time must be after start time.";
    }

    if (
      !form.aircraft ||
      form.aircraft ===
        "Select aircraft"
    ) {
      nextErrors.aircraft =
        "Please select an aircraft.";
    }

    if (
      !form.instructor ||
      form.instructor ===
        "Select instructor"
    ) {
      nextErrors.instructor =
        "Please select an instructor.";
    }

    if (
      form.type !== "Maintenance" &&
      (!form.student ||
        form.student ===
          "Select student")
    ) {
      nextErrors.student =
        "Please select a student.";
    }

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors).length === 0
    );
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit?.(form);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#172033]/35 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-schedule-title"
        className="flex max-h-[calc(100vh-32px)] w-full max-w-[720px] flex-col overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white shadow-[0_24px_60px_rgba(16,24,40,0.18)]"
      >
        {/* =====================================================
            HEADER
            ===================================================== */}

        <div className="flex items-start justify-between border-b border-[#E4E7EC] px-6 py-5">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2FF]">
                <CalendarDays className="h-4 w-4 text-[#1677FF]" />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#667085]">
                Flight Operations
              </span>
            </div>

            <h2
              id="create-schedule-title"
              className="text-lg font-semibold text-[#172033]"
            >
              New Schedule
            </h2>

            <p className="mt-1 text-xs text-[#667085]">
              Create a new flight,
              simulator, training or
              maintenance schedule.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#172033]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* =====================================================
            FORM
            ===================================================== */}

        <form
          onSubmit={handleSubmit}
          className="min-h-0 overflow-y-auto"
        >
          <div className="space-y-6 px-6 py-6">
            {/* =================================================
                BASIC INFORMATION
                ================================================= */}

            <section>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F2F4F7]">
                  <CalendarDays className="h-3.5 w-3.5 text-[#667085]" />
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-[#172033]">
                    Schedule Information
                  </h3>

                  <p className="text-[10px] text-[#98A2B3]">
                    Define the type and timing
                    of the operation.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Title */}

                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                    Schedule Title
                  </label>

                  <input
                    type="text"
                    value={form.title}
                    onChange={(event) =>
                      updateField(
                        "title",
                        event.target.value,
                      )
                    }
                    placeholder="e.g. Alex Johnson — Flight Training"
                    className={[
                      "h-10 w-full rounded-lg border bg-white px-3 text-xs text-[#172033] outline-none transition placeholder:text-[#98A2B3]",
                      errors.title
                        ? "border-[#F04438] focus:ring-2 focus:ring-red-100"
                        : "border-[#D0D5DD] focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100",
                    ].join(" ")}
                  />

                  {errors.title && (
                    <p className="mt-1 text-[10px] text-[#D92D20]">
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Type */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                    Schedule Type
                  </label>

                  <select
                    value={form.type}
                    onChange={(event) =>
                      updateField(
                        "type",
                        event.target
                          .value as ScheduleFormData["type"],
                      )
                    }
                    className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#172033] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="Flight">
                      Flight
                    </option>

                    <option value="Simulator">
                      Simulator
                    </option>

                    <option value="Training">
                      Training
                    </option>

                    <option value="Maintenance">
                      Maintenance
                    </option>
                  </select>
                </div>

                {/* Status */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                    Status
                  </label>

                  <select
                    value={form.status}
                    onChange={(event) =>
                      updateField(
                        "status",
                        event.target
                          .value as ScheduleFormData["status"],
                      )
                    }
                    className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#172033] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="Scheduled">
                      Scheduled
                    </option>

                    <option value="Confirmed">
                      Confirmed
                    </option>

                    <option value="In Flight">
                      In Flight
                    </option>

                    <option value="Completed">
                      Completed
                    </option>

                    <option value="Delayed">
                      Delayed
                    </option>

                    <option value="Conflict">
                      Conflict
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>
                  </select>
                </div>

                {/* Date */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                    Date
                  </label>

                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A2B3]" />

                    <input
                      type="date"
                      value={form.date}
                      onChange={(event) =>
                        updateField(
                          "date",
                          event.target.value,
                        )
                      }
                      className={[
                        "h-10 w-full rounded-lg border bg-white pl-9 pr-3 text-xs text-[#172033] outline-none transition",
                        errors.date
                          ? "border-[#F04438]"
                          : "border-[#D0D5DD] focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100",
                      ].join(" ")}
                    />
                  </div>

                  {errors.date && (
                    <p className="mt-1 text-[10px] text-[#D92D20]">
                      {errors.date}
                    </p>
                  )}
                </div>

                {/* Start Time */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                    Start Time
                  </label>

                  <div className="relative">
                    <Clock3 className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A2B3]" />

                    <input
                      type="time"
                      value={form.startTime}
                      onChange={(event) =>
                        updateField(
                          "startTime",
                          event.target.value,
                        )
                      }
                      className={[
                        "h-10 w-full rounded-lg border bg-white pl-9 pr-3 text-xs text-[#172033] outline-none transition",
                        errors.startTime
                          ? "border-[#F04438]"
                          : "border-[#D0D5DD] focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100",
                      ].join(" ")}
                    />
                  </div>

                  {errors.startTime && (
                    <p className="mt-1 text-[10px] text-[#D92D20]">
                      {errors.startTime}
                    </p>
                  )}
                </div>

                {/* End Time */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                    End Time
                  </label>

                  <div className="relative">
                    <Clock3 className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A2B3]" />

                    <input
                      type="time"
                      value={form.endTime}
                      onChange={(event) =>
                        updateField(
                          "endTime",
                          event.target.value,
                        )
                      }
                      className={[
                        "h-10 w-full rounded-lg border bg-white pl-9 pr-3 text-xs text-[#172033] outline-none transition",
                        errors.endTime
                          ? "border-[#F04438]"
                          : "border-[#D0D5DD] focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100",
                      ].join(" ")}
                    />
                  </div>

                  {errors.endTime && (
                    <p className="mt-1 text-[10px] text-[#D92D20]">
                      {errors.endTime}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* =================================================
                RESOURCES
                ================================================= */}

            <section className="border-t border-[#E4E7EC] pt-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EAF2FF]">
                  <Plane className="h-3.5 w-3.5 text-[#1677FF]" />
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-[#172033]">
                    Resources
                  </h3>

                  <p className="text-[10px] text-[#98A2B3]">
                    Assign aircraft, instructor
                    and student.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Aircraft */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                    Aircraft
                  </label>

                  <div className="relative">
                    <Plane className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A2B3]" />

                    <select
                      value={form.aircraft}
                      onChange={(event) =>
                        updateField(
                          "aircraft",
                          event.target.value,
                        )
                      }
                      className={[
                        "h-10 w-full appearance-none rounded-lg border bg-white pl-9 pr-3 text-xs outline-none transition",
                        form.aircraft
                          ? "text-[#172033]"
                          : "text-[#98A2B3]",
                        errors.aircraft
                          ? "border-[#F04438]"
                          : "border-[#D0D5DD] focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100",
                      ].join(" ")}
                    >
                      {aircraftOptions.map(
                        (option) => (
                          <option
                            key={option}
                            value={
                              option ===
                              "Select aircraft"
                                ? ""
                                : option
                            }
                          >
                            {option}
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  {errors.aircraft && (
                    <p className="mt-1 text-[10px] text-[#D92D20]">
                      {errors.aircraft}
                    </p>
                  )}
                </div>

                {/* Instructor */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                    Instructor
                  </label>

                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A2B3]" />

                    <select
                      value={form.instructor}
                      onChange={(event) =>
                        updateField(
                          "instructor",
                          event.target.value,
                        )
                      }
                      className={[
                        "h-10 w-full appearance-none rounded-lg border bg-white pl-9 pr-3 text-xs outline-none transition",
                        form.instructor
                          ? "text-[#172033]"
                          : "text-[#98A2B3]",
                        errors.instructor
                          ? "border-[#F04438]"
                          : "border-[#D0D5DD] focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100",
                      ].join(" ")}
                    >
                      {instructorOptions.map(
                        (option) => (
                          <option
                            key={option}
                            value={
                              option ===
                              "Select instructor"
                                ? ""
                                : option
                            }
                          >
                            {option}
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  {errors.instructor && (
                    <p className="mt-1 text-[10px] text-[#D92D20]">
                      {errors.instructor}
                    </p>
                  )}
                </div>

                {/* Student */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                    Student
                  </label>

                  <div className="relative">
                    <GraduationCap className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A2B3]" />

                    <select
                      value={form.student}
                      onChange={(event) =>
                        updateField(
                          "student",
                          event.target.value,
                        )
                      }
                      className={[
                        "h-10 w-full appearance-none rounded-lg border bg-white pl-9 pr-3 text-xs outline-none transition",
                        form.student
                          ? "text-[#172033]"
                          : "text-[#98A2B3]",
                        errors.student
                          ? "border-[#F04438]"
                          : "border-[#D0D5DD] focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100",
                      ].join(" ")}
                    >
                      {studentOptions.map(
                        (option) => (
                          <option
                            key={option}
                            value={
                              option ===
                              "Select student"
                                ? ""
                                : option
                            }
                          >
                            {option}
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  {errors.student && (
                    <p className="mt-1 text-[10px] text-[#D92D20]">
                      {errors.student}
                    </p>
                  )}
                </div>

                {/* Training */}

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                    Training Type
                  </label>

                  <select
                    value={form.trainingType}
                    onChange={(event) =>
                      updateField(
                        "trainingType",
                        event.target.value,
                      )
                    }
                    className={[
                      "h-10 w-full rounded-lg border bg-white px-3 text-xs outline-none transition",
                      form.trainingType
                        ? "text-[#172033]"
                        : "text-[#98A2B3]",
                      "border-[#D0D5DD] focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100",
                    ].join(" ")}
                  >
                    {trainingOptions.map(
                      (option) => (
                        <option
                          key={option}
                          value={
                            option ===
                            "Select training type"
                              ? ""
                              : option
                          }
                        >
                          {option}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              </div>
            </section>

            {/* =================================================
                NOTES
                ================================================= */}

            <section className="border-t border-[#E4E7EC] pt-6">
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
                rows={3}
                placeholder="Add operational notes, special requirements or additional information..."
                className="w-full resize-none rounded-lg border border-[#D0D5DD] bg-white px-3 py-2.5 text-xs text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
              />
            </section>
          </div>

          {/* ===================================================
              FOOTER
              =================================================== */}

          <div className="flex flex-col-reverse gap-2 border-t border-[#E4E7EC] bg-[#FCFCFD] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] text-[#98A2B3]">
              Required fields are marked by
              validation when submitted.
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="h-9 rounded-lg border border-[#D0D5DD] bg-white px-4 text-xs font-semibold text-[#344054] transition hover:bg-[#F9FAFB] active:scale-[0.98]"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="h-9 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white shadow-sm shadow-blue-900/20 transition hover:bg-[#1264D8] active:scale-[0.98]"
              >
                Create Schedule
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}