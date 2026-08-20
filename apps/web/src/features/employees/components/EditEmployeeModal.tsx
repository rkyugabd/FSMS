import {
  BriefcaseBusiness,
  Save,
  UserRound,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import type {
  Employee,
  EmployeeRole,
  EmployeeStatus,
  EmploymentType,
} from "../employeesData";

type EditEmployeeModalProps = {
  isOpen: boolean;
  employee: Employee | null;
  onClose: () => void;
  onSave: (employee: Employee) => void;
};

type EmployeeFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: EmployeeRole;
  department: string;
  employmentType: EmploymentType;
  status: EmployeeStatus;
  hireDate: string;
  license: string;
  supervisor: string;
  notes: string;
};

const ROLE_OPTIONS: EmployeeRole[] = [
  "Flight Instructor",
  "Senior Flight Instructor",
  "Chief Flight Instructor",
  "Simulator Instructor",
  "Maintenance Technician",
  "Operations Coordinator",
  "Operations Manager",
  "Dispatcher",
  "Administrator",
  "Finance",
  "HR",
  "IT Support",
];

const STATUS_OPTIONS: EmployeeStatus[] = [
  "Active",
  "On Leave",
  "Inactive",
];

const EMPLOYMENT_OPTIONS: EmploymentType[] = [
  "Full Time",
  "Part Time",
  "Contract",
];

const DEPARTMENT_OPTIONS = [
  "Flight Operations",
  "Training",
  "Maintenance",
  "Operations",
  "Administration",
  "Human Resources",
  "Finance",
  "IT",
];

function createFormData(
  employee: Employee,
): EmployeeFormData {
  return {
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    phone: employee.phone,
    role: employee.role,
    department: employee.department,
    employmentType:
      employee.employmentType,
    status: employee.status,
    hireDate: employee.hireDate,
    license: employee.license ?? "",
    supervisor:
      employee.supervisor ?? "",
    notes: employee.notes ?? "",
  };
}

export function EditEmployeeModal({
  isOpen,
  employee,
  onClose,
  onSave,
}: EditEmployeeModalProps) {
  const [form, setForm] =
    useState<EmployeeFormData | null>(
      null,
    );

  useEffect(() => {
    if (isOpen && employee) {
      setForm(createFormData(employee));
    }
  }, [isOpen, employee]);

  if (!isOpen || !employee || !form) {
    return null;
  }

  const updateField = (
    field: keyof EmployeeFormData,
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

    const updatedEmployee: Employee =
      {
        ...employee,
        firstName:
          form.firstName.trim(),
        lastName:
          form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        role: form.role,
        department: form.department,
        employmentType:
          form.employmentType,
        status: form.status,
        hireDate: form.hireDate,
        license:
          form.license.trim() ||
          undefined,
        supervisor:
          form.supervisor.trim() ||
          undefined,
        notes:
          form.notes.trim() ||
          undefined,
      };

    onSave(updatedEmployee);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#101828]/40 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-employee-title"
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
              <UserRound className="h-4 w-4 text-[#1677FF]" />
            </div>

            <div>
              <h2
                id="edit-employee-title"
                className="text-base font-semibold text-[#172033]"
              >
                Edit Employee
              </h2>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                Update employee information
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#172033]"
            aria-label="Close edit employee modal"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <form
          id="edit-employee-form"
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <UserRound className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Personal Information
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="First Name"
                value={form.firstName}
                onChange={(value) =>
                  updateField(
                    "firstName",
                    value,
                  )
                }
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
                required
              />
            </div>
          </section>

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <BriefcaseBusiness className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Employment Information
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <SelectField
                label="Role"
                value={form.role}
                onChange={(value) =>
                  updateField(
                    "role",
                    value,
                  )
                }
                options={ROLE_OPTIONS}
              />

              <SelectField
                label="Department"
                value={form.department}
                onChange={(value) =>
                  updateField(
                    "department",
                    value,
                  )
                }
                options={
                  DEPARTMENT_OPTIONS
                }
              />

              <SelectField
                label="Employment Type"
                value={
                  form.employmentType
                }
                onChange={(value) =>
                  updateField(
                    "employmentType",
                    value,
                  )
                }
                options={
                  EMPLOYMENT_OPTIONS
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
                options={STATUS_OPTIONS}
              />

              <Field
                label="Hire Date"
                type="date"
                value={form.hireDate}
                onChange={(value) =>
                  updateField(
                    "hireDate",
                    value,
                  )
                }
                required
              />

              <Field
                label="License"
                value={form.license}
                onChange={(value) =>
                  updateField(
                    "license",
                    value,
                  )
                }
                placeholder="CPL / ATPL / AME"
              />

              <Field
                label="Supervisor"
                value={form.supervisor}
                onChange={(value) =>
                  updateField(
                    "supervisor",
                    value,
                  )
                }
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
              placeholder="Add employee notes..."
              className="w-full resize-none rounded-lg border border-[#D0D5DD] bg-white px-3 py-2.5 text-xs leading-5 text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
            />
          </section>
        </form>

        <footer className="flex shrink-0 items-center justify-between border-t border-[#E4E7EC] bg-[#F9FAFB] px-5 py-3">
          <p className="hidden text-[10px] text-[#98A2B3] sm:block">
            Employee ID: {employee.id}
          </p>

          <div className="ml-auto flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-9 rounded-lg border border-[#D0D5DD] bg-white px-4 text-xs font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="edit-employee-form"
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

export default EditEmployeeModal;