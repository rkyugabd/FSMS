import {
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  UsersRound,
} from "lucide-react";

import { useMemo, useState } from "react";

import {
  studentData,
  type Student,
  type StudentProgram,
  type StudentStatus,
} from "./studentsData";

import {
  StudentsTable,
  type StudentSortDirection,
  type StudentSortField,
} from "./components/StudentsTable";

import { StudentsPagination } from "./components/StudentsPagination";

import { StudentsEmptyState } from "./components/StudentsEmptyState";

import { StudentDetails } from "./components/StudentDetails";

import { CreateStudentModal } from "./components/CreateStudentModal";

import { EditStudentModal } from "./components/EditStudentModal";

const PAGE_SIZE = 8;

const STATUS_FILTERS: Array<
  StudentStatus | "All"
> = [
  "All",
  "Active",
  "Inactive",
  "On Hold",
  "Completed",
  "Withdrawn",
];

const PROGRAM_FILTERS: Array<
  StudentProgram | "All"
> = [
  "All",
  "Private Pilot",
  "Commercial Pilot",
  "Instrument Rating",
  "Multi-Engine",
  "Flight Instructor",
  "Recreational Pilot",
  "Other",
];

export function Students() {
  const [students, setStudents] =
    useState<Student[]>(studentData);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<StudentStatus | "All">(
      "All",
    );

  const [programFilter, setProgramFilter] =
    useState<StudentProgram | "All">(
      "All",
    );

  const [currentPage, setCurrentPage] =
    useState(1);

  const [sortField, setSortField] =
    useState<StudentSortField>(
      "student",
    );

  const [sortDirection, setSortDirection] =
    useState<StudentSortDirection>(
      "asc",
    );

  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  const [editingStudent, setEditingStudent] =
    useState<Student | null>(null);

  const [isCreateOpen, setIsCreateOpen] =
    useState(false);

  /*
   * =========================================================
   * FILTER
   * =========================================================
   */

  const filteredStudents = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return students.filter((student) => {
      const fullName =
        `${student.firstName} ${student.lastName}`;

      const matchesSearch =
        query.length === 0 ||
        [
          fullName,
          student.studentNumber,
          student.email,
          student.phone,
          student.program,
          student.licenseType,
          student.instructor,
          student.status,
          student.city,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        student.status === statusFilter;

      const matchesProgram =
        programFilter === "All" ||
        student.program ===
          programFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesProgram
      );
    });
  }, [
    students,
    search,
    statusFilter,
    programFilter,
  ]);

  /*
   * =========================================================
   * SORT
   * =========================================================
   */

  const sortedStudents = useMemo(() => {
    const result = [
      ...filteredStudents,
    ];

    result.sort((a, b) => {
      let aValue: string | number = "";
      let bValue: string | number = "";

      switch (sortField) {
        case "student":
          aValue =
            `${a.firstName} ${a.lastName}`;
          bValue =
            `${b.firstName} ${b.lastName}`;
          break;

        case "program":
          aValue = a.program;
          bValue = b.program;
          break;

        case "instructor":
          aValue = a.instructor;
          bValue = b.instructor;
          break;

        case "progress":
          aValue = a.progress;
          bValue = b.progress;
          break;

        case "totalFlights":
          aValue = a.totalFlights;
          bValue = b.totalFlights;
          break;

        case "lastFlightDate":
          aValue = a.lastFlightDate;
          bValue = b.lastFlightDate;
          break;

        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
      }

      if (
        typeof aValue === "number" &&
        typeof bValue === "number"
      ) {
        return sortDirection ===
          "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      const comparison =
        String(aValue).localeCompare(
          String(bValue),
          undefined,
          {
            numeric: true,
            sensitivity: "base",
          },
        );

      return sortDirection ===
        "asc"
        ? comparison
        : -comparison;
    });

    return result;
  }, [
    filteredStudents,
    sortField,
    sortDirection,
  ]);

  /*
   * =========================================================
   * PAGINATION
   * =========================================================
   */

  const totalPages = Math.max(
    1,
    Math.ceil(
      sortedStudents.length /
        PAGE_SIZE,
    ),
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const paginatedStudents = useMemo(() => {
    const start =
      (safeCurrentPage - 1) *
      PAGE_SIZE;

    return sortedStudents.slice(
      start,
      start + PAGE_SIZE,
    );
  }, [
    sortedStudents,
    safeCurrentPage,
  ]);

  /*
   * =========================================================
   * HANDLERS
   * =========================================================
   */

  const handleSearchChange = (
    value: string,
  ) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (
    value: StudentStatus | "All",
  ) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleProgramChange = (
    value: StudentProgram | "All",
  ) => {
    setProgramFilter(value);
    setCurrentPage(1);
  };

  const handleSort = (
    field: StudentSortField,
  ) => {
    if (sortField === field) {
      setSortDirection(
        (previous) =>
          previous === "asc"
            ? "desc"
            : "asc",
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }

    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setStudents([...studentData]);

    setSearch("");

    setStatusFilter("All");

    setProgramFilter("All");

    setCurrentPage(1);

    setSortField("student");

    setSortDirection("asc");

    setSelectedStudent(null);

    setEditingStudent(null);
  };

  const handleCreateStudent = (
    student: Student,
  ) => {
    setStudents((previous) => [
      student,
      ...previous,
    ]);

    setIsCreateOpen(false);

    setCurrentPage(1);
  };

  const handleUpdateStudent = (
    updatedStudent: Student,
  ) => {
    setStudents((previous) =>
      previous.map((student) =>
        student.id ===
        updatedStudent.id
          ? updatedStudent
          : student,
      ),
    );

    setEditingStudent(null);

    if (
      selectedStudent?.id ===
      updatedStudent.id
    ) {
      setSelectedStudent(
        updatedStudent,
      );
    }
  };

  const handleDeleteStudent = (
    studentId: string,
  ) => {
    setStudents((previous) =>
      previous.filter(
        (student) =>
          student.id !== studentId,
      ),
    );

    setSelectedStudent(null);

    setEditingStudent(null);
  };

  /*
   * =========================================================
   * STATUS COUNTS
   * =========================================================
   */

  const statusCounts = useMemo(() => {
    return {
      total: students.length,

      active: students.filter(
        (student) =>
          student.status === "Active",
      ).length,

      inactive: students.filter(
        (student) =>
          student.status === "Inactive",
      ).length,

      onHold: students.filter(
        (student) =>
          student.status === "On Hold",
      ).length,

      completed: students.filter(
        (student) =>
          student.status === "Completed",
      ).length,

      withdrawn: students.filter(
        (student) =>
          student.status === "Withdrawn",
      ).length,

      inTraining: students.filter(
        (student) =>
          student.status === "Active" ||
          student.status === "On Hold",
      ).length,
    };
  }, [students]);

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="space-y-5 text-[#172033]">
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2FF]">
              <UsersRound className="h-4 w-4 text-[#1677FF]" />
            </div>

            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#344054]">
              Student Management
            </span>
          </div>

          <h1 className="text-[25px] font-semibold tracking-tight text-[#172033]">
            Students
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-[#475467]">
            Manage student profiles,
            training progress, licenses and
            flight activity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            className="flex h-9 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs font-medium text-[#344054] shadow-sm transition hover:bg-[#F9FAFB]"
          >
            <RefreshCw className="h-3.5 w-3.5 text-[#667085]" />

            Refresh
          </button>

          <button
            type="button"
            className="flex h-9 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs font-medium text-[#344054] shadow-sm transition hover:bg-[#F9FAFB]"
          >
            <SlidersHorizontal className="h-4 w-4 text-[#667085]" />

            View Options
          </button>

          <button
            type="button"
            onClick={() =>
              setIsCreateOpen(true)
            }
            className="flex h-9 items-center gap-2 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white shadow-sm shadow-blue-900/20 transition hover:bg-[#1264D8] active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />

            New Student
          </button>
        </div>
      </section>

      {/* =====================================================
          STATUS SUMMARY
          ===================================================== */}

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <button
          type="button"
          onClick={() => {
            handleStatusChange("All");
            handleProgramChange("All");
          }}
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Total Students
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#172033]">
            {statusCounts.total}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            All student records
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            handleStatusChange("Active")
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Active Students
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#087443]">
            {statusCounts.active}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Currently active
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            handleStatusChange("On Hold")
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            On Hold
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#B54708]">
            {statusCounts.onHold}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Training temporarily paused
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            handleStatusChange("Completed")
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Completed
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#1355B5]">
            {statusCounts.completed}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Training completed
          </p>
        </button>
      </section>

      {/* =====================================================
          SEARCH / FILTER BAR
          ===================================================== */}

      <section className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative min-w-0 flex-1 xl:max-w-md">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A2B3]" />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                handleSearchChange(
                  event.target.value,
                )
              }
              placeholder="Search student, email, instructor..."
              className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white pl-9 pr-3 text-xs text-[#344054] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
              Status
            </span>

            {STATUS_FILTERS.map(
              (status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() =>
                    handleStatusChange(
                      status,
                    )
                  }
                  className={[
                    "h-8 rounded-lg px-3 text-[11px] font-medium transition",
                    statusFilter ===
                    status
                      ? "bg-[#172033] text-white"
                      : "border border-[#D0D5DD] bg-white text-[#475467] hover:bg-[#F9FAFB]",
                  ].join(" ")}
                >
                  {status}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[#F2F4F7] pt-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
            Program
          </span>

          {PROGRAM_FILTERS.map(
            (program) => (
              <button
                key={program}
                type="button"
                onClick={() =>
                  handleProgramChange(
                    program,
                  )
                }
                className={[
                  "h-8 rounded-lg px-3 text-[11px] font-medium transition",
                  programFilter ===
                  program
                    ? "bg-[#EAF2FF] text-[#1355B5]"
                    : "border border-[#D0D5DD] bg-white text-[#475467] hover:bg-[#F9FAFB]",
                ].join(" ")}
              >
                {program}
              </button>
            ),
          )}
        </div>
      </section>

      {/* =====================================================
          STUDENTS TABLE
          ===================================================== */}

      <section>
        {paginatedStudents.length >
        0 ? (
          <>
            <StudentsTable
              students={
                paginatedStudents
              }
              sortField={sortField}
              sortDirection={
                sortDirection
              }
              onSort={handleSort}
              onStudentClick={
                setSelectedStudent
              }
            />

            <StudentsPagination
              currentPage={
                safeCurrentPage
              }
              totalPages={
                totalPages
              }
              totalItems={
                sortedStudents.length
              }
              pageSize={PAGE_SIZE}
              onPageChange={
                setCurrentPage
              }
            />
          </>
        ) : (
          <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <StudentsEmptyState
              title={
                search ||
                statusFilter !==
                  "All" ||
                programFilter !==
                  "All"
                  ? "No matching students"
                  : "No students found"
              }
              description={
                search ||
                statusFilter !==
                  "All" ||
                programFilter !==
                  "All"
                  ? "Try changing your search or filters."
                  : "There are currently no students in the training system."
              }
              actionLabel="New Student"
              onAction={() =>
                setIsCreateOpen(true)
              }
            />
          </div>
        )}
      </section>

      {/* =====================================================
          SELECTED STUDENT DETAILS
          ===================================================== */}

      {selectedStudent && (
        <section className="relative">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
                Selected Student
              </p>

              <p className="mt-0.5 text-xs text-[#667085]">
                Training and student details
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setSelectedStudent(
                  null,
                )
              }
              className="text-xs font-medium text-[#667085] transition hover:text-[#172033]"
            >
              Close
            </button>
          </div>

          <StudentDetails
            student={selectedStudent}
            onClose={() =>
              setSelectedStudent(
                null,
              )
            }
            onEdit={(student) => {
              setEditingStudent(
                student,
              );

              setSelectedStudent(
                null,
              );
            }}
            onDelete={
              handleDeleteStudent
            }
          />
        </section>
      )}

      {/* =====================================================
          CREATE STUDENT
          ===================================================== */}

      <CreateStudentModal
        isOpen={isCreateOpen}
        onClose={() =>
          setIsCreateOpen(false)
        }
        onCreate={
          handleCreateStudent
        }
      />

      {/* =====================================================
          EDIT STUDENT
          ===================================================== */}

      <EditStudentModal
        isOpen={
          editingStudent !== null
        }
        student={editingStudent}
        onClose={() =>
          setEditingStudent(null)
        }
        onSave={handleUpdateStudent}
      />
    </div>
  );
}

export default Students;