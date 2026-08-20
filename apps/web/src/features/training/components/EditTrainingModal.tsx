import {
  CalendarDays,
  GraduationCap,
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
  Training,
  TrainingStatus,
  TrainingType,
} from "../trainingData";

type EditTrainingModalProps = {
  isOpen: boolean;
  training: Training | null;
  onClose: () => void;
  onSave: (training: Training) => void;
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

function createFormData(
  training: Training,
): TrainingFormData {
  return {
    trainingNumber:
      training.trainingNumber ?? "",

    student:
      training.student ?? "",

    studentId:
      training.studentId ?? "",

    instructor:
      training.instructor ?? "",

    instructorId:
      training.instructorId ?? "",

    aircraft:
      training.aircraft ?? "",

    aircraftType:
      training.aircraftType ?? "",

    trainingType:
      training.trainingType,

    status:
      training.status,

    date:
      training.date ?? "",

    startTime:
      training.startTime ?? "",

    endTime:
      training.endTime ?? "",

    duration:
      training.duration ?? "",

    location:
      training.location ?? "",

    lessonCode:
      training.lessonCode ?? "",

    lessonTitle:
      training.lessonTitle ?? "",

    progress:
      String(training.progress ?? 0),

    score:
      training.score !== undefined
        ? String(training.score)
        : "",

    notes:
      training.notes ?? "",
  };
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
        {label}
      </label>

      <input
        type={type}
        value={value}
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

export function EditTrainingModal({
  isOpen,
  training,
  onClose,
  onSave,
}: EditTrainingModalProps) {
  const [form, setForm] =
    useState<TrainingFormData | null>(
      null,
    );

  useEffect(() => {
    if (isOpen && training) {
      setForm(
        createFormData(training),
      );
    }
  }, [isOpen, training]);

  if (!isOpen || !training || !form) {
    return null;
  }

  const updateField = (
    field: keyof TrainingFormData,
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

    const updatedTraining: Training = {
      ...training,

      trainingNumber:
        form.trainingNumber.trim(),

      student:
        form.student.trim(),

      studentId:
        form.studentId.trim(),

      instructor:
        form.instructor.trim(),

      instructorId:
        form.instructorId.trim(),

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

      updatedAt:
        new Date().toISOString(),
    };

    onSave(updatedTraining);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#101828]/40 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-training-modal-title"
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
                id="edit-training-modal-title"
                className="text-base font-semibold text-[#172033]"
              >
                Edit Training
              </h2>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                Update training operation
                details
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#172033]"
            aria-label="Close edit training modal"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <form
          id="edit-training-form"
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

        <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-[#E4E7EC] bg-[#F9FAFB] px-5 py-3">
          <p className="hidden text-[10px] text-[#98A2B3] sm:block">
            Training ID: {training.id}
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
              form="edit-training-form"
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

export default EditTrainingModal;