import {
  CalendarDays,
  Clock3,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";

import type {
  Student,
  StudentStatus,
} from "../studentsData";

type StudentDetailsProps = {
  student: Student;
  onClose: () => void;
  onEdit: (student: Student) => void;
  onDelete: (studentId: string) => void;
};

const STATUS_STYLES: Record<
  StudentStatus,
  {
    background: string;
    text: string;
    dot: string;
  }
> = {
  Active: {
    background: "bg-[#E8F8F1]",
    text: "text-[#087443]",
    dot: "bg-[#12B76A]",
  },

  Inactive: {
    background: "bg-[#F2F4F7]",
    text: "text-[#475467]",
    dot: "bg-[#98A2B3]",
  },

  "On Hold": {
    background: "bg-[#FFFAEB]",
    text: "text-[#B54708]",
    dot: "bg-[#F79009]",
  },

  Completed: {
    background: "bg-[#EAF2FF]",
    text: "text-[#1355B5]",
    dot: "bg-[#1677FF]",
  },

  Withdrawn: {
    background: "bg-[#FEF3F2]",
    text: "text-[#B42318]",
    dot: "bg-[#F04438]",
  },
};

function formatDate(
  date: string,
): string {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(
    `${date}T00:00:00`,
  );

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  ).format(parsedDate);
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
        {label}
      </p>

      <p className="mt-1 text-xs font-medium text-[#344054]">
        {value || "—"}
      </p>
    </div>
  );
}

export function StudentDetails({
  student,
  onClose,
  onEdit,
  onDelete,
}: StudentDetailsProps) {
  const fullName = `${student.firstName} ${student.lastName}`;

  const statusStyle =
    STATUS_STYLES[student.status];

  return (
    <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="flex items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2FF]">
            <UserRound className="h-4 w-4 text-[#1677FF]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-[#172033]">
                {fullName}
              </h2>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[9px] font-semibold ${statusStyle.background} ${statusStyle.text}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                />

                {student.status}
              </span>
            </div>

            <p className="mt-0.5 text-[10px] text-[#98A2B3]">
              {student.studentNumber}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#172033]"
          aria-label="Close student details"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="divide-y divide-[#E4E7EC]">
        {/* Contact */}

        <section className="px-5 py-5">
          <div className="mb-4 flex items-center gap-2">
            <UsersRound className="h-4 w-4 text-[#667085]" />

            <h3 className="text-xs font-semibold text-[#172033]">
              Contact Information
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-2">
              <Mail className="mt-0.5 h-3.5 w-3.5 text-[#98A2B3]" />

              <DetailItem
                label="Email"
                value={student.email}
              />
            </div>

            <div className="flex items-start gap-2">
              <Phone className="mt-0.5 h-3.5 w-3.5 text-[#98A2B3]" />

              <DetailItem
                label="Phone"
                value={student.phone}
              />
            </div>

            <DetailItem
              label="Date of Birth"
              value={formatDate(
                student.dateOfBirth,
              )}
            />

            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 text-[#98A2B3]" />

              <DetailItem
                label="Location"
                value={`${student.city}, ${student.province}`}
              />
            </div>
          </div>

          <div className="mt-4">
            <DetailItem
              label="Address"
              value={`${student.address}, ${student.city}, ${student.province} ${student.postalCode}`}
            />
          </div>
        </section>

        {/* Training */}

        <section className="px-5 py-5">
          <div className="mb-4 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-[#667085]" />

            <h3 className="text-xs font-semibold text-[#172033]">
              Training
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DetailItem
              label="Program"
              value={student.program}
            />

            <DetailItem
              label="License Type"
              value={student.licenseType}
            />

            <DetailItem
              label="Instructor"
              value={student.instructor}
            />

            <DetailItem
              label="Enrollment Date"
              value={formatDate(
                student.enrollmentDate,
              )}
            />
          </div>
        </section>

        {/* Progress */}

        <section className="px-5 py-5">
          <div className="mb-4 flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-[#667085]" />

            <h3 className="text-xs font-semibold text-[#172033]">
              Training Progress
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-lg border border-[#E4E7EC] bg-[#F9FAFB] p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                Progress
              </p>

              <p className="mt-1 text-xl font-semibold text-[#1677FF]">
                {student.progress}%
              </p>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#EAECF0]">
                <div
                  className="h-full rounded-full bg-[#1677FF]"
                  style={{
                    width: `${student.progress}%`,
                  }}
                />
              </div>
            </div>

            <div className="rounded-lg border border-[#E4E7EC] bg-[#F9FAFB] p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                Flight Hours
              </p>

              <p className="mt-1 text-xl font-semibold text-[#172033]">
                {student.flightHours.toFixed(
                  1,
                )}
              </p>
            </div>

            <div className="rounded-lg border border-[#E4E7EC] bg-[#F9FAFB] p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                Solo Hours
              </p>

              <p className="mt-1 text-xl font-semibold text-[#172033]">
                {student.soloHours.toFixed(
                  1,
                )}
              </p>
            </div>

            <div className="rounded-lg border border-[#E4E7EC] bg-[#F9FAFB] p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                Total Flights
              </p>

              <p className="mt-1 text-xl font-semibold text-[#172033]">
                {student.totalFlights}
              </p>
            </div>

            <div className="rounded-lg border border-[#E4E7EC] bg-[#F9FAFB] p-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                Completed
              </p>

              <p className="mt-1 text-xl font-semibold text-[#172033]">
                {student.completedFlights}
              </p>
            </div>
          </div>
        </section>

        {/* Flight Activity */}

        <section className="px-5 py-5">
          <div className="mb-4 flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-[#667085]" />

            <h3 className="text-xs font-semibold text-[#172033]">
              Flight Activity
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <DetailItem
              label="Last Flight"
              value={formatDate(
                student.lastFlightDate,
              )}
            />

            <DetailItem
              label="Next Flight"
              value={
                student.nextFlightDate
                  ? formatDate(
                      student.nextFlightDate,
                    )
                  : "Not scheduled"
              }
            />

            <DetailItem
              label="Medical Status"
              value={student.medicalStatus}
            />
          </div>
        </section>

        {/* Notes */}

        <section className="px-5 py-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Training Notes
          </p>

          <p className="mt-2 rounded-lg border border-[#E4E7EC] bg-[#F9FAFB] p-3 text-xs leading-5 text-[#475467]">
            {student.notes || "No notes available."}
          </p>
        </section>
      </div>

      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer className="flex items-center justify-between gap-3 border-t border-[#E4E7EC] bg-[#F9FAFB] px-5 py-3">
        <p className="hidden text-[10px] text-[#98A2B3] sm:block">
          Student ID: {student.id}
        </p>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              onDelete(student.id)
            }
            className="h-9 rounded-lg border border-[#FECDCA] bg-white px-4 text-xs font-semibold text-[#B42318] transition hover:bg-[#FEF3F2]"
          >
            Delete Student
          </button>

          <button
            type="button"
            onClick={() => onEdit(student)}
            className="h-9 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white transition hover:bg-[#1264D8]"
          >
            Edit Student
          </button>
        </div>
      </footer>
    </div>
  );
}

export default StudentDetails;