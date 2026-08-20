import {
  BriefcaseBusiness,
  CalendarDays,
  Mail,
  MapPin,
 
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

import type { Employee } from "../employeesData";

type EmployeeDetailsProps = {
  employee: Employee | null;
  onClose: () => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employeeId: string) => void;
};

const STATUS_STYLES = {
  Active: {
    background: "bg-[#E8F8F1]",
    text: "text-[#087443]",
    dot: "bg-[#12B76A]",
  },
  "On Leave": {
    background: "bg-[#FFFAEB]",
    text: "text-[#B54708]",
    dot: "bg-[#F79009]",
  },
  Inactive: {
    background: "bg-[#F2F4F7]",
    text: "text-[#475467]",
    dot: "bg-[#98A2B3]",
  },
};

export function EmployeeDetails({
  employee,
  onClose,
  onEdit,
  onDelete,
}: EmployeeDetailsProps) {
  if (!employee) {
    return null;
  }

  const statusStyle =
    STATUS_STYLES[employee.status];

  return (
    <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
            Employee Profile
          </p>

          <h2 className="mt-1 text-base font-semibold text-[#172033]">
            {employee.firstName}{" "}
            {employee.lastName}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#172033]"
          aria-label="Close employee details"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF2FF]">
              <UserRound className="h-5 w-5 text-[#1677FF]" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#172033]">
                {employee.firstName}{" "}
                {employee.lastName}
              </h3>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                {employee.employeeNumber} ·{" "}
                {employee.role}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyle.background} ${statusStyle.text}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
            />

            {employee.status}
          </span>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-[#E4E7EC] bg-[#FCFCFD] p-4">
            <div className="mb-3 flex items-center gap-2">
              <BriefcaseBusiness className="h-4 w-4 text-[#667085]" />

              <h4 className="text-xs font-semibold text-[#172033]">
                Employment
              </h4>
            </div>

            <div className="space-y-3">
              <InfoRow
                label="Role"
                value={employee.role}
              />

              <InfoRow
                label="Department"
                value={employee.department}
              />

              <InfoRow
                label="Employment Type"
                value={
                  employee.employmentType
                }
              />

              <InfoRow
                label="Hire Date"
                value={employee.hireDate}
              />

              <InfoRow
                label="Supervisor"
                value={
                  employee.supervisor ??
                  "Not assigned"
                }
              />
            </div>
          </div>

          <div className="rounded-xl border border-[#E4E7EC] bg-[#FCFCFD] p-4">
            <div className="mb-3 flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#667085]" />

              <h4 className="text-xs font-semibold text-[#172033]">
                Contact
              </h4>
            </div>

            <div className="space-y-3">
              <InfoRow
                label="Email"
                value={employee.email}
              />

              <InfoRow
                label="Phone"
                value={employee.phone}
              />

              <InfoRow
                label="Address"
                value={
                  employee.address ??
                  "Not provided"
                }
              />

              <InfoRow
                label="Location"
                value={[
                  employee.city,
                  employee.province,
                  employee.postalCode,
                ]
                  .filter(Boolean)
                  .join(", ") ||
                  "Not provided"}
              />
            </div>
          </div>

          <div className="rounded-xl border border-[#E4E7EC] bg-[#FCFCFD] p-4">
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#667085]" />

              <h4 className="text-xs font-semibold text-[#172033]">
                Qualifications
              </h4>
            </div>

            <div className="space-y-3">
              <InfoRow
                label="License"
                value={
                  employee.license ??
                  "Not provided"
                }
              />

              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.06em] text-[#98A2B3]">
                  Certifications
                </p>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {employee.certifications &&
                  employee.certifications
                    .length > 0 ? (
                    employee.certifications.map(
                      (certification) => (
                        <span
                          key={certification}
                          className="rounded-md bg-[#EAF2FF] px-2 py-1 text-[10px] font-medium text-[#1355B5]"
                        >
                          {certification}
                        </span>
                      ),
                    )
                  ) : (
                    <span className="text-[11px] text-[#98A2B3]">
                      No certifications
                      recorded
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#E4E7EC] bg-[#FCFCFD] p-4">
            <div className="mb-3 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#667085]" />

              <h4 className="text-xs font-semibold text-[#172033]">
                Emergency Contact
              </h4>
            </div>

            <div className="space-y-3">
              <InfoRow
                label="Contact Name"
                value={
                  employee.emergencyContactName ??
                  "Not provided"
                }
              />

              <InfoRow
                label="Contact Phone"
                value={
                  employee.emergencyContactPhone ??
                  "Not provided"
                }
              />
            </div>
          </div>
        </div>

        {employee.notes && (
          <div className="mt-4 rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] p-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#667085]" />

              <h4 className="text-xs font-semibold text-[#172033]">
                Notes
              </h4>
            </div>

            <p className="mt-2 text-xs leading-5 text-[#667085]">
              {employee.notes}
            </p>
          </div>
        )}

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={() =>
              onDelete(employee.id)
            }
            className="h-9 rounded-lg border border-[#FECDCA] bg-white px-4 text-xs font-semibold text-[#B42318] transition hover:bg-[#FEF3F2]"
          >
            Delete Employee
          </button>

          <button
            type="button"
            onClick={() => onEdit(employee)}
            className="h-9 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white transition hover:bg-[#1264D8]"
          >
            Edit Employee
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-[0.06em] text-[#98A2B3]">
        {label}
      </p>

      <p className="mt-0.5 break-words text-xs font-medium text-[#344054]">
        {value}
      </p>
    </div>
  );
}

export default EmployeeDetails;