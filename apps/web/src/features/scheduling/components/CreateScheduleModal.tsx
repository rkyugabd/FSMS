import {
  CalendarDays,
  Clock3,
  Plane,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";

type CreateScheduleModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: CreateScheduleFormData) => void;
};

export type CreateScheduleFormData = {
  scheduleType: string;
  date: string;
  startTime: string;
  endTime: string;
  aircraft: string;
  instructor: string;
  student: string;
  trainingType: string;
  notes: string;
};

const INITIAL_FORM: CreateScheduleFormData = {
  scheduleType: "Flight",
  date: "2026-08-18",
  startTime: "09:00",
  endTime: "10:30",
  aircraft: "",
  instructor: "",
  student: "",
  trainingType: "",
  notes: "",
};

const aircraftOptions = [
  "Select aircraft",
  "C-GABC",
  "C-GDEF",
  "C-GHIJ",
  "C-GKLM",
];

const instructorOptions = [
  "Select instructor",
  "Michael Brown",
  "Sarah Wilson",
  "David Miller",
  "James Anderson",
];

const studentOptions = [
  "Select student",
  "Alex Johnson",
  "Emily Smith",
  "Daniel Lee",
  "Sophia Martin",
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
    useState<CreateScheduleFormData>(
      INITIAL_FORM,
    );

  if (!open) {
    return null;
  }

  const updateField = <
    K extends keyof CreateScheduleFormData,
  >(
    field: K,
    value: CreateScheduleFormData[K],
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    onSubmit?.(form);
  };

  const handleClose = () => {
    setForm(INITIAL_FORM);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101828]/40 px-4 py-6 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-schedule-title"
    >
      <div className="flex max-h-[calc(100vh-48px)] w-full max-w-[680px] flex-col overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white shadow-[0_24px_48px_rgba(16,24,40,0.18)]">
        {/* =====================================================
            HEADER
            ===================================================== */}

        <div className="flex items-start justify-between border-b border-[#E4E7EC] px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF2FF]">
              <CalendarDays className="h-4 w-4 text-[#1677FF]" />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#667085]">
                Flight Operations
              </p>

              <h2
                id="create-schedule-title"
                className="mt-1 text-lg font-semibold text-[#172033]"
              >
                New Schedule
              </h2>

              <p className="mt-1 text-xs text-[#667085]">
                Create a new flight, simulator or
                training schedule.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#172033]"
            aria-label="Close modal"
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
          <div className="space-y-6 px-6 py-5">
            {/* Schedule Type */}

            <section>
              <div className="mb-3 flex items-center gap-2">
                <Plane className="h-4 w-4 text-[#667085]" />

                <h3 className="text-xs font-semibold text-[#172033]">
                  Schedule Details
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="schedule-type"
                    className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]"
                  >
                    Schedule Type
                  </label>

                  <select
                    id="schedule-type"
                    value={form.scheduleType}
                    onChange={(event) =>
                      updateField(
                        "scheduleType",
                        event.target.value,
                      )
                    }
                    className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#172033] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
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

                {/* Date */}

                <div>
                  <label
                    htmlFor="schedule-date"
                    className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]"
                  >
                    Date
                  </label>

                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A2B3]" />

                    <input
                      id="schedule-date"
                      type="date"
                      value={form.date}
                      onChange={(event) =>
                        updateField(
                          "date",
                          event.target.value,
                        )
                      }
                      required
                      className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white pl-9 pr-3 text-xs text-[#172033] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
                    />
                  </div>
                </div>

                {/* Start Time */}

                <div>
                  <label
                    htmlFor="schedule-start-time"
                    className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]"
                  >
                    Start Time
                  </label>

                  <div className="relative">
                    <Clock3 className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A2B3]" />

                    <input
                      id="schedule-start-time"
                      type="time"
                      value={form.startTime}
                      onChange={(event) =>
                        updateField(
                          "startTime",
                          event.target.value,
                        )
                      }
                      required
                      className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white pl-9 pr-3 text-xs text-[#172033] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
                    />
                  </div>
                </div>

                {/* End Time */}

                <div>
                  <label
                    htmlFor="schedule-end-time"
                    className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]"
                  >
                    End Time
                  </label>

                  <div className="relative">
                    <Clock3 className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A2B3]" />

                    <input
                      id="schedule-end-time"
                      type="time"
                      value={form.endTime}
                      onChange={(event) =>
                        updateField(
                          "endTime",
                          event.target.value,
                        )
                      }
                      required
                      className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white pl-9 pr-3 text-xs text-[#172033] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                RESOURCES
                ================================================= */}

            <section className="border-t border-[#F2F4F7] pt-5">
              <div className="mb-3 flex items-center gap-2">
                <UserRound className="h-4 w-4 text-[#667085]" />

                <h3 className="text-xs font-semibold text-[#172033]">
                  Resources
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Aircraft */}

                <div>
                  <label
                    htmlFor="schedule-aircraft"
                    className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]"
                  >
                    Aircraft
                  </label>

                  <select
                    id="schedule-aircraft"
                    value={form.aircraft}
                    onChange={(event) =>
                      updateField(
                        "aircraft",
                        event.target.value,
                      )
                    }
                    className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#172033] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
                  >
                    {aircraftOptions.map(
                      (aircraft) => (
                        <option
                          key={aircraft}
                          value={
                            aircraft ===
                            "Select aircraft"
                              ? ""
                              : aircraft
                          }
                        >
                          {aircraft}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                {/* Instructor */}

                <div>
                  <label
                    htmlFor="schedule-instructor"
                    className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]"
                  >
                    Instructor
                  </label>

                  <select
                    id="schedule-instructor"
                    value={form.instructor}
                    onChange={(event) =>
                      updateField(
                        "instructor",
                        event.target.value,
                      )
                    }
                    className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#172033] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
                  >
                    {instructorOptions.map(
                      (instructor) => (
                        <option
                          key={instructor}
                          value={
                            instructor ===
                            "Select instructor"
                              ? ""
                              : instructor
                          }
                        >
                          {instructor}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                {/* Student */}

                <div>
                  <label
                    htmlFor="schedule-student"
                    className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]"
                  >
                    Student
                  </label>

                  <select
                    id="schedule-student"
                    value={form.student}
                    onChange={(event) =>
                      updateField(
                        "student",
                        event.target.value,
                      )
                    }
                    className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#172033] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
                  >
                    {studentOptions.map(
                      (student) => (
                        <option
                          key={student}
                          value={
                            student ===
                            "Select student"
                              ? ""
                              : student
                          }
                        >
                          {student}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                {/* Training Type */}

                <div>
                  <label
                    htmlFor="schedule-training"
                    className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]"
                  >
                    Training Type
                  </label>

                  <select
                    id="schedule-training"
                    value={form.trainingType}
                    onChange={(event) =>
                      updateField(
                        "trainingType",
                        event.target.value,
                      )
                    }
                    className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#172033] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
                  >
                    {trainingOptions.map(
                      (training) => (
                        <option
                          key={training}
                          value={
                            training ===
                            "Select training type"
                              ? ""
                              : training
                          }
                        >
                          {training}
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

            <section className="border-t border-[#F2F4F7] pt-5">
              <label
                htmlFor="schedule-notes"
                className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]"
              >
                Notes
              </label>

              <textarea
                id="schedule-notes"
                value={form.notes}
                onChange={(event) =>
                  updateField(
                    "notes",
                    event.target.value,
                  )
                }
                rows={3}
                placeholder="Add operational notes..."
                className="w-full resize-none rounded-lg border border-[#D0D5DD] bg-white px-3 py-2.5 text-xs text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
              />
            </section>
          </div>

          {/* =====================================================
              FOOTER
              ===================================================== */}

          <div className="flex items-center justify-end gap-2 border-t border-[#E4E7EC] bg-[#FCFCFD] px-6 py-4">
            <button
              type="button"
              onClick={handleClose}
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
        </form>
      </div>
    </div>
  );
}