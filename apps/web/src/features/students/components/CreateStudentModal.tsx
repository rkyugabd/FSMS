import {
  GraduationCap,
  Save,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";

import {
  useState,
  type FormEvent,
} from "react";

import type {
  MedicalStatus,
  Student,
  StudentProgram,
  StudentStatus,
} from "../studentsData";

type CreateStudentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (student: Student) => void;
};

type StudentFormData = {
  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  dateOfBirth: string;

  address: string;
  city: string;
  province: string;
  postalCode: string;

  program: StudentProgram;
  licenseType: string;

  instructor: string;

  enrollmentDate: string;

  status: StudentStatus;

  medicalStatus: MedicalStatus;

  notes: string;
};

const PROGRAM_OPTIONS: StudentProgram[] = [
  "Private Pilot",
  "Commercial Pilot",
  "Instrument Rating",
  "Multi-Engine",
  "Flight Instructor",
  "Recreational Pilot",
  "Other",
];

const STATUS_OPTIONS: StudentStatus[] = [
  "Active",
  "Inactive",
  "On Hold",
  "Completed",
  "Withdrawn",
];

const MEDICAL_OPTIONS: MedicalStatus[] = [
  "Valid",
  "Expiring Soon",
  "Expired",
  "Not Provided",
];

const LICENSE_OPTIONS = [
  "PPL",
  "CPL",
  "IR",
  "MEL",
  "FI",
  "RPP",
  "Other",
];

const INITIAL_FORM: StudentFormData = {
  firstName: "",
  lastName: "",

  email: "",
  phone: "",

  dateOfBirth: "",

  address: "",
  city: "",
  province: "Ontario",
  postalCode: "",

  program: "Private Pilot",
  licenseType: "PPL",

  instructor: "",

  enrollmentDate: "",

  status: "Active",

  medicalStatus: "Not Provided",

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

export function CreateStudentModal({
  isOpen,
  onClose,
  onCreate,
}: CreateStudentModalProps) {
  const [form, setForm] =
    useState<StudentFormData>(
      INITIAL_FORM,
    );

  if (!isOpen) {
    return null;
  }

  const updateField = (
    field: keyof StudentFormData,
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

    const firstName =
      form.firstName.trim();

    const lastName =
      form.lastName.trim();

    const studentNumber = `STU-${String(
      Date.now(),
    ).slice(-5)}`;

    const newStudent: Student = {
      id: `student-${Date.now()}`,
      studentNumber,

      firstName,
      lastName,

      email: form.email.trim(),
      phone: form.phone.trim(),

      dateOfBirth: form.dateOfBirth,

      address: form.address.trim(),
      city: form.city.trim(),
      province: form.province.trim(),
      postalCode:
        form.postalCode.trim(),

      program: form.program,
      licenseType:
        form.licenseType.trim() ||
        "PPL",

      instructor:
        form.instructor.trim() ||
        "Unassigned",

      enrollmentDate:
        form.enrollmentDate,

      status: form.status,

      totalFlights: 0,
      completedFlights: 0,

      flightHours: 0,
      soloHours: 0,

      progress: 0,

      lastFlightDate: "",
      nextFlightDate: "",

      medicalStatus:
        form.medicalStatus,

      notes: form.notes.trim(),
    };

    onCreate(newStudent);

    setForm(INITIAL_FORM);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#101828]/40 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-student-modal-title"
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
              <UserRound className="h-4 w-4 text-[#1677FF]" />
            </div>

            <div>
              <h2
                id="create-student-modal-title"
                className="text-base font-semibold text-[#172033]"
              >
                New Student
              </h2>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                Create a new student training
                record
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#172033]"
            aria-label="Close create student modal"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* Form */}

        <form
          id="create-student-form"
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          {/* Student Information */}

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <UserRound className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Student Information
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Field
                label="First Name"
                value={form.firstName}
                onChange={(value) =>
                  updateField(
                    "firstName",
                    value,
                  )
                }
                placeholder="John"
                required
              />

              <Field
                label="Last Name"
                value={form.lastName}
                onChange={(value) =>
                  updateField(
                    "lastName",
                    value,
                  )
                }
                placeholder="Smith"
                required
              />

              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(value) =>
                  updateField(
                    "email",
                    value,
                  )
                }
                placeholder="student@example.com"
                required
              />

              <Field
                label="Phone"
                value={form.phone}
                onChange={(value) =>
                  updateField(
                    "phone",
                    value,
                  )
                }
                placeholder="(519) 555-0000"
              />

              <Field
                label="Date of Birth"
                type="date"
                value={form.dateOfBirth}
                onChange={(value) =>
                  updateField(
                    "dateOfBirth",
                    value,
                  )
                }
              />
            </div>
          </section>

          {/* Address */}

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <MapPinIcon />

              <h3 className="text-xs font-semibold text-[#172033]">
                Address
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="sm:col-span-2">
                <Field
                  label="Address"
                  value={form.address}
                  onChange={(value) =>
                    updateField(
                      "address",
                      value,
                    )
                  }
                  placeholder="Street address"
                />
              </div>

              <Field
                label="City"
                value={form.city}
                onChange={(value) =>
                  updateField(
                    "city",
                    value,
                  )
                }
                placeholder="London"
              />

              <Field
                label="Province"
                value={form.province}
                onChange={(value) =>
                  updateField(
                    "province",
                    value,
                  )
                }
                placeholder="Ontario"
              />

              <Field
                label="Postal Code"
                value={form.postalCode}
                onChange={(value) =>
                  updateField(
                    "postalCode",
                    value,
                  )
                }
                placeholder="N6A 1A1"
              />
            </div>
          </section>

          {/* Training */}

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Training
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <SelectField
                label="Program"
                value={form.program}
                onChange={(value) =>
                  updateField(
                    "program",
                    value,
                  )
                }
                options={
                  PROGRAM_OPTIONS
                }
              />

              <SelectField
                label="License Type"
                value={form.licenseType}
                onChange={(value) =>
                  updateField(
                    "licenseType",
                    value,
                  )
                }
                options={
                  LICENSE_OPTIONS
                }
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
                label="Enrollment Date"
                type="date"
                value={form.enrollmentDate}
                onChange={(value) =>
                  updateField(
                    "enrollmentDate",
                    value,
                  )
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

              <SelectField
                label="Medical Status"
                value={
                  form.medicalStatus
                }
                onChange={(value) =>
                  updateField(
                    "medicalStatus",
                    value,
                  )
                }
                options={
                  MEDICAL_OPTIONS
                }
              />
            </div>
          </section>

          {/* Notes */}

          <section className="px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <UsersRound className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Notes
              </h3>
            </div>

            <textarea
              value={form.notes}
              onChange={(event) =>
                updateField(
                  "notes",
                  event.target.value,
                )
              }
              rows={4}
              placeholder="Add training or operational notes..."
              className="w-full resize-none rounded-lg border border-[#D0D5DD] bg-white px-3 py-2.5 text-xs leading-5 text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
            />
          </section>
        </form>

        {/* Footer */}

        <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-[#E4E7EC] bg-[#F9FAFB] px-5 py-3">
          <p className="hidden text-[10px] text-[#98A2B3] sm:block">
            Required fields are marked with *
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
              form="create-student-form"
              className="flex h-9 items-center gap-1.5 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1264D8] active:scale-[0.98]"
            >
              <Save className="h-3.5 w-3.5" />

              Create Student
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

function MapPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4 text-[#667085]"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle
        cx="12"
        cy="10"
        r="2.5"
      />
    </svg>
  );
}

export default CreateStudentModal;