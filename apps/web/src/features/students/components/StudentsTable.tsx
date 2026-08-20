import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CalendarDays,
  MoreHorizontal,
  UserRound,
  UsersRound,
} from "lucide-react";

import type {
  Student,
  StudentStatus,
} from "../studentsData";

export type StudentSortField =
  | "student"
  | "program"
  | "instructor"
  | "progress"
  | "totalFlights"
  | "lastFlightDate"
  | "status";

export type StudentSortDirection =
  | "asc"
  | "desc";

type StudentsTableProps = {
  students: Student[];
  sortField: StudentSortField;
  sortDirection: StudentSortDirection;
  onSort: (
    field: StudentSortField,
  ) => void;
  onStudentClick: (
    student: Student,
  ) => void;
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

function SortIcon({
  field,
  activeField,
  direction,
}: {
  field: StudentSortField;
  activeField: StudentSortField;
  direction: StudentSortDirection;
}) {
  if (field !== activeField) {
    return (
      <ArrowUpDown className="h-3 w-3 text-[#98A2B3]" />
    );
  }

  return direction === "asc" ? (
    <ArrowUp className="h-3 w-3 text-[#1677FF]" />
  ) : (
    <ArrowDown className="h-3 w-3 text-[#1677FF]" />
  );
}

function TableHeader({
  children,
  field,
  activeField,
  direction,
  onSort,
  className = "",
}: {
  children: React.ReactNode;
  field: StudentSortField;
  activeField: StudentSortField;
  direction: StudentSortDirection;
  onSort: (
    field: StudentSortField,
  ) => void;
  className?: string;
}) {
  return (
    <th
      scope="col"
      className={`whitespace-nowrap px-4 py-3 text-left ${className}`}
    >
      <button
        type="button"
        onClick={() => onSort(field)}
        className="group inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085] transition hover:text-[#344054]"
      >
        {children}

        <SortIcon
          field={field}
          activeField={activeField}
          direction={direction}
        />
      </button>
    </th>
  );
}

export function StudentsTable({
  students,
  sortField,
  sortDirection,
  onSort,
  onStudentClick,
}: StudentsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="flex items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-[#172033]">
            Students
          </h3>

          <p className="mt-0.5 text-[11px] text-[#667085]">
            {students.length}{" "}
            {students.length === 1
              ? "student"
              : "students"}{" "}
            displayed
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-[#98A2B3]">
          <span className="h-2 w-2 rounded-full bg-[#12B76A]" />

          Training records
        </div>
      </div>

      {/* =====================================================
          TABLE
          ===================================================== */}

      <div className="overflow-x-auto">
        <table className="min-w-[1280px] w-full border-collapse">
          <thead className="border-b border-[#E4E7EC] bg-[#F9FAFB]">
            <tr>
              <TableHeader
                field="student"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Student
              </TableHeader>

              <th
                scope="col"
                className="whitespace-nowrap px-4 py-3 text-left"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                  Contact
                </span>
              </th>

              <TableHeader
                field="program"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Program
              </TableHeader>

              <TableHeader
                field="instructor"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Instructor
              </TableHeader>

              <TableHeader
                field="progress"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Progress
              </TableHeader>

              <TableHeader
                field="totalFlights"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Flights
              </TableHeader>

              <TableHeader
                field="lastFlightDate"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Last Flight
              </TableHeader>

              <TableHeader
                field="status"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Status
              </TableHeader>

              <th
                scope="col"
                className="w-12 px-4 py-3"
              >
                <span className="sr-only">
                  Actions
                </span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E4E7EC]">
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="px-6 py-16 text-center"
                >
                  <div className="mx-auto flex max-w-sm flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2F4F7]">
                      <UsersRound className="h-4 w-4 text-[#98A2B3]" />
                    </div>

                    <h4 className="mt-3 text-sm font-semibold text-[#344054]">
                      No students found
                    </h4>

                    <p className="mt-1 text-xs text-[#667085]">
                      Try changing your filters
                      or search criteria.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              students.map((student) => {
                const statusStyle =
                  STATUS_STYLES[
                    student.status
                  ];

                const fullName = `${student.firstName} ${student.lastName}`;

                return (
                  <tr
                    key={student.id}
                    onClick={() =>
                      onStudentClick(student)
                    }
                    className="group cursor-pointer bg-white transition hover:bg-[#F9FAFB]"
                  >
                    {/* Student */}

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF2FF]">
                          <UserRound className="h-3.5 w-3.5 text-[#1677FF]" />
                        </div>

                        <div className="min-w-0">
                          <div className="truncate text-xs font-semibold text-[#172033]">
                            {fullName}
                          </div>

                          <div className="mt-0.5 truncate text-[10px] text-[#98A2B3]">
                            {student.studentNumber}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}

                    <td className="px-4 py-3">
                      <div className="truncate text-xs font-medium text-[#344054]">
                        {student.email}
                      </div>

                      <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                        {student.phone}
                      </div>
                    </td>

                    {/* Program */}

                    <td className="px-4 py-3">
                      <div className="text-xs font-semibold text-[#344054]">
                        {student.program}
                      </div>

                      <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                        {student.licenseType}
                      </div>
                    </td>

                    {/* Instructor */}

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F2F4F7]">
                          <UserRound className="h-3.5 w-3.5 text-[#667085]" />
                        </div>

                        <span className="whitespace-nowrap text-xs font-medium text-[#344054]">
                          {student.instructor}
                        </span>
                      </div>
                    </td>

                    {/* Progress */}

                    <td className="px-4 py-3">
                      <div className="w-28">
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="text-[10px] font-semibold text-[#344054]">
                            {student.progress}%
                          </span>

                          <span className="text-[10px] text-[#98A2B3]">
                            Training
                          </span>
                        </div>

                        <div className="h-1.5 overflow-hidden rounded-full bg-[#EAECF0]">
                          <div
                            className="h-full rounded-full bg-[#1677FF] transition-all"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(
                                  0,
                                  student.progress,
                                ),
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Flights */}

                    <td className="px-4 py-3">
                      <div className="text-xs font-semibold text-[#344054]">
                        {student.totalFlights}
                      </div>

                      <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                        {student.flightHours.toFixed(
                          1,
                        )}{" "}
                        flight hrs
                      </div>
                    </td>

                    {/* Last Flight */}

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-3.5 w-3.5 text-[#98A2B3]" />

                        <div className="text-xs font-medium text-[#344054]">
                          {formatDate(
                            student.lastFlightDate,
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Status */}

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyle.background} ${statusStyle.text}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                        />

                        {student.status}
                      </span>
                    </td>

                    {/* Actions */}

                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();

                          onStudentClick(
                            student,
                          );
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-[#98A2B3] opacity-0 transition hover:bg-[#F2F4F7] hover:text-[#344054] group-hover:opacity-100"
                        aria-label={`Open ${fullName}`}
                        title={`Open ${fullName}`}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* =====================================================
          FOOTER
          ===================================================== */}

      <div className="flex flex-col gap-2 border-t border-[#E4E7EC] bg-[#FCFCFD] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[10px] text-[#667085]">
          Showing{" "}
          <span className="font-semibold text-[#344054]">
            {students.length}
          </span>{" "}
          student
          {students.length === 1
            ? ""
            : "s"}
        </p>

        <p className="text-[10px] text-[#98A2B3]">
          Select a student to view training
          details.
        </p>
      </div>
    </div>
  );
}

export default StudentsTable;