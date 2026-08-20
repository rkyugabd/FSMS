import {
  Clock3,
  Save,
  UserRound,
  X,
} from "lucide-react";

import {
  useState,
  type FormEvent,
} from "react";

import type {
  TimeEntry,
  TimeEntryStatus,
  TimeEntryType,
} from "../timeTrackingData";

type CreateTimeEntryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (entry: TimeEntry) => void;
};

type TimeEntryFormData = {
  employeeId: string;
  employeeName: string;
  department: string;
  role: string;
  date: string;
  clockIn: string;
  clockOut: string;
  breakMinutes: string;
  entryType: TimeEntryType;
  status: TimeEntryStatus;
  location: string;
  notes: string;
};

const STATUS_OPTIONS: TimeEntryStatus[] =
  [
    "Clocked In",
    "Clocked Out",
    "On Break",
    "Pending",
    "Approved",
    "Rejected",
  ];

const TYPE_OPTIONS: TimeEntryType[] =
  [
    "Regular",
    "Overtime",
    "Training",
    "Meeting",
    "Leave",
    "Other",
  ];

function calculateHours(
  clockIn: string,
  clockOut: string,
  breakMinutes: number,
) {
  if (!clockIn || !clockOut) {
    return 0;
  }

  const start = new Date(
    `1970-01-01T${clockIn}:00`,
  );

  const end = new Date(
    `1970-01-01T${clockOut}:00`,
  );

  let difference =
    end.getTime() -
    start.getTime();

  if (difference < 0) {
    difference +=
      24 * 60 * 60 * 1000;
  }

  const hours =
    difference / 1000 / 60 / 60 -
    breakMinutes / 60;

  return Math.max(
    0,
    Number(hours.toFixed(2)),
  );
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
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        placeholder={placeholder}
        required={required}
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
          onChange(
            event.target.value,
          )
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

export function CreateTimeEntryModal({
  isOpen,
  onClose,
  onCreate,
}: CreateTimeEntryModalProps) {
  const [form, setForm] =
    useState<TimeEntryFormData>({
      employeeId: "",
      employeeName: "",
      department: "Flight Operations",
      role: "",
      date: new Date()
        .toISOString()
        .slice(0, 10),
      clockIn: "08:00",
      clockOut: "16:30",
      breakMinutes: "30",
      entryType: "Regular",
      status: "Pending",
      location: "London Campus",
      notes: "",
    });

  if (!isOpen) {
    return null;
  }

  const updateField = (
    field: keyof TimeEntryFormData,
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

    const breakMinutes =
      Number(form.breakMinutes) || 0;

    const totalHours =
      calculateHours(
        form.clockIn,
        form.clockOut,
        breakMinutes,
      );

    const newEntry: TimeEntry = {
      id: `TT-${Date.now()}`,
      employeeId:
        form.employeeId.trim(),
      employeeName:
        form.employeeName.trim(),
      department:
        form.department.trim(),
      role: form.role.trim(),
      date: form.date,
      clockIn: form.clockIn,
      clockOut: form.clockOut,
      breakMinutes,
      totalHours,
      entryType: form.entryType,
      status: form.status,
      location:
        form.location.trim(),
      notes:
        form.notes.trim() ||
        undefined,
    };

    onCreate(newEntry);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#101828]/40 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-time-entry-title"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white shadow-[0_20px_50px_rgba(16,24,40,0.18)]">
        <header className="flex shrink-0 items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF2FF]">
              <Clock3 className="h-4 w-4 text-[#1677FF]" />
            </div>

            <div>
              <h2
                id="create-time-entry-title"
                className="text-base font-semibold text-[#172033]"
              >
                New Time Entry
              </h2>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                Record employee working
                hours
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7]"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <UserRound className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Employee Information
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Employee ID"
                value={form.employeeId}
                onChange={(value) =>
                  updateField(
                    "employeeId",
                    value,
                  )
                }
                placeholder="EMP-1001"
                required
              />

              <Field
                label="Employee Name"
                value={form.employeeName}
                onChange={(value) =>
                  updateField(
                    "employeeName",
                    value,
                  )
                }
                placeholder="Employee name"
                required
              />

              <Field
                label="Department"
                value={form.department}
                onChange={(value) =>
                  updateField(
                    "department",
                    value,
                  )
                }
                placeholder="Flight Operations"
                required
              />

              <Field
                label="Role"
                value={form.role}
                onChange={(value) =>
                  updateField(
                    "role",
                    value,
                  )
                }
                placeholder="Flight Instructor"
                required
              />
            </div>
          </section>

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Attendance
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
                label="Clock In"
                type="time"
                value={form.clockIn}
                onChange={(value) =>
                  updateField(
                    "clockIn",
                    value,
                  )
                }
                required
              />

              <Field
                label="Clock Out"
                type="time"
                value={form.clockOut}
                onChange={(value) =>
                  updateField(
                    "clockOut",
                    value,
                  )
                }
              />

              <Field
                label="Break Minutes"
                type="number"
                value={
                  form.breakMinutes
                }
                onChange={(value) =>
                  updateField(
                    "breakMinutes",
                    value,
                  )
                }
                placeholder="30"
              />
            </div>
          </section>

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                label="Entry Type"
                value={form.entryType}
                onChange={(value) =>
                  updateField(
                    "entryType",
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
                label="Location"
                value={form.location}
                onChange={(value) =>
                  updateField(
                    "location",
                    value,
                  )
                }
                placeholder="London Campus"
              />
            </div>
          </section>

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
              placeholder="Add notes..."
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
            form=""
            onClick={() => {
              const formElement =
                document.querySelector(
                  "form",
                ) as HTMLFormElement | null;

              formElement?.requestSubmit();
            }}
            className="flex h-9 items-center gap-1.5 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1264D8]"
          >
            <Save className="h-3.5 w-3.5" />

            Create Entry
          </button>
        </footer>
      </div>
    </div>
  );
}

export default CreateTimeEntryModal;