import {
  CalendarDays,
  GraduationCap,
  Save,
  UsersRound,
  X,
} from "lucide-react";

import {
  useState,
  type FormEvent,
} from "react";

import type {
  Training,
  TrainingStatus,
  TrainingType,
} from "../trainingData";

type CreateTrainingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (training: Training) => void;
};

type TrainingFormData = {
  trainingNumber: string;
  student: string;
  studentId: string;
  instructor: string;
  instructorId: string;
  aircraft: string;
  aircraftType: string;
  trainingType: TrainingType;
  status: TrainingStatus;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  location: string;
  lessonCode: string;
  lessonTitle: string;
  progress: string;
  score: string;
  notes: string;
};

const TRAINING_TYPES: TrainingType[] = [
  "Private Pilot",
  "Commercial Pilot",
  "Instrument Rating",
  "Night Rating",
  "Multi-Engine",
  "Flight Review",
  "Ground School",
  "Simulator Training",
];

const STATUS_OPTIONS: TrainingStatus[] = [
  "Scheduled",
  "In Progress",
  "Completed",
  "Passed",
  "Failed",
  "Cancelled",
];

const INITIAL_FORM: TrainingFormData = {
  trainingNumber: "",
  student: "",
  studentId: "",
  instructor: "",
  instructorId: "",
  aircraft: "",
  aircraftType: "",
  trainingType: "Private Pilot",
  status: "Scheduled",
  date: "",
  startTime: "",
  endTime: "",
  duration: "",
  location: "",
  lessonCode: "",
  lessonTitle: "",
  progress: "0",
  score: "",
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

export function CreateTrainingModal({
  isOpen,
  onClose,
  onCreate,
}: CreateTrainingModalProps) {
  const [form, setForm] =
    useState<TrainingFormData>(
      INITIAL_FORM,
    );

  if (!isOpen) {
    return null;
  }

  const updateField = (
    field: keyof TrainingFormData,
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

    const training: Training = {
      id: `TRN-${Date.now()}`,

      trainingNumber:
        form.trainingNumber.trim() ||
        `TR-${new Date().getFullYear()}-${String(
          Date.now(),
        ).slice(-3)}`,

      studentId:
        form.studentId.trim(),

      student:
        form.student.trim(),

      instructorId:
        form.instructorId.trim(),

      instructor:
        form.instructor.trim(),

      aircraft:
        form.aircraft.trim() ||
        undefined,

      aircraftType:
        form.aircraftType.trim() ||
        undefined,

      trainingType:
        form.trainingType,

      status:
        form.status,

      date:
        form.date,

      startTime:
        form.startTime,

      endTime:
        form.endTime,

      duration:
        form.duration.trim(),

      location:
        form.location.trim() ||
        undefined,

      lessonCode:
        form.lessonCode.trim() ||
        undefined,

      lessonTitle:
        form.lessonTitle.trim() ||
        undefined,

      progress: Math.min(
        100,
        Math.max(
          0,
          Number(form.progress) || 0,
        ),
      ),

      score: form.score.trim()
        ? Number(form.score)
        : undefined,

      notes:
        form.notes.trim() ||
        undefined,

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    };

    onCreate(training);

    setForm(INITIAL_FORM);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#101828]/40 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-training-modal-title"
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
              <GraduationCap className="h-4 w-4 text-[#1677FF]" />
            </div>

            <div>
              <h2
                id="create-training-modal-title"
                className="text-base font-semibold text-[#172033]"
              >
                New Training Record
              </h2>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                Create a new flight training
                record
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#172033]"
            aria-label="Close create training modal"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <form
          id="create-training-form"
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Training Information
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field
                label="Training Number"
                value={
                  form.trainingNumber
                }
                onChange={(value) =>
                  updateField(
                    "trainingNumber",
                    value,
                  )
                }
                placeholder="TR-2026-009"
              />

              <SelectField
                label="Training Type"
                value={
                  form.trainingType
                }
                onChange={(value) =>
                  updateField(
                    "trainingType",
                    value,
                  )
                }
                options={
                  TRAINING_TYPES
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
                label="Lesson Code"
                value={
                  form.lessonCode
                }
                onChange={(value) =>
                  updateField(
                    "lessonCode",
                    value,
                  )
                }
                placeholder="PPL-01"
              />

              <Field
                label="Lesson Title"
                value={
                  form.lessonTitle
                }
                onChange={(value) =>
                  updateField(
                    "lessonTitle",
                    value,
                  )
                }
                placeholder="Normal Takeoff"
              />

              <Field
                label="Location"
                value={
                  form.location
                }
                onChange={(value) =>
                  updateField(
                    "location",
                    value,
                  )
                }
                placeholder="CYXU"
              />
            </div>
          </section>

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <UsersRound className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Student & Instructor
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

              <Field
                label="Student ID"
                value={
                  form.studentId
                }
                onChange={(value) =>
                  updateField(
                    "studentId",
                    value,
                  )
                }
                placeholder="STU-001"
              />

              <Field
                label="Instructor"
                value={
                  form.instructor
                }
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
                label="Instructor ID"
                value={
                  form.instructorId
                }
                onChange={(value) =>
                  updateField(
                    "instructorId",
                    value,
                  )
                }
                placeholder="INS-001"
              />
            </div>
          </section>

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Schedule
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

              <Field
                label="Start Time"
                type="time"
                value={
                  form.startTime
                }
                onChange={(value) =>
                  updateField(
                    "startTime",
                    value,
                  )
                }
                required
              />

              <Field
                label="End Time"
                type="time"
                value={
                  form.endTime
                }
                onChange={(value) =>
                  updateField(
                    "endTime",
                    value,
                  )
                }
                required
              />

              <Field
                label="Duration"
                value={
                  form.duration
                }
                onChange={(value) =>
                  updateField(
                    "duration",
                    value,
                  )
                }
                placeholder="1h 30m"
              />
            </div>
          </section>

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Aircraft & Progress
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Field
                label="Aircraft"
                value={
                  form.aircraft
                }
                onChange={(value) =>
                  updateField(
                    "aircraft",
                    value,
                  )
                }
                placeholder="C-GABC"
              />

              <Field
                label="Aircraft Type"
                value={
                  form.aircraftType
                }
                onChange={(value) =>
                  updateField(
                    "aircraftType",
                    value,
                  )
                }
                placeholder="C172"
              />

              <Field
                label="Progress %"
                type="number"
                value={
                  form.progress
                }
                onChange={(value) =>
                  updateField(
                    "progress",
                    value,
                  )
                }
                placeholder="0"
              />

              <Field
                label="Score %"
                type="number"
                value={form.score}
                onChange={(value) =>
                  updateField(
                    "score",
                    value,
                  )
                }
                placeholder="Optional"
              />
            </div>
          </section>

          <section className="px-5 py-5">
            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
              Training Notes
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
              placeholder="Add training notes..."
              className="w-full resize-none rounded-lg border border-[#D0D5DD] bg-white px-3 py-2.5 text-xs leading-5 text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
            />
          </section>
        </form>

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
            form="create-training-form"
            className="flex h-9 items-center gap-1.5 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1264D8]"
          >
            <Save className="h-3.5 w-3.5" />

            Create Training
          </button>
        </footer>
      </div>
    </div>
  );
}

export default CreateTrainingModal;