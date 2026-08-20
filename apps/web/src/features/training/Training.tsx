import {
  BookOpen,
  GraduationCap,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Target,
} from "lucide-react";

import { useMemo, useState } from "react";

import {
  trainingData,
  type Training,
  type TrainingStatus,
} from "./trainingData";

import { TrainingPagination } from "./components/TrainingPagination";
import { TrainingEmptyState } from "./components/TrainingEmptyState";
import { TrainingTable } from "./components/TrainingTable";
import { TrainingDetails } from "./components/TrainingDetails";
import { CreateTrainingModal } from "./components/CreateTrainingModal";
import { EditTrainingModal } from "./components/EditTrainingModal";

const PAGE_SIZE = 8;

type SortField =
  | "trainingNumber"
  | "date"
  | "student"
  | "instructor"
  | "trainingType"
  | "progress"
  | "status";

type SortDirection = "asc" | "desc";

export function Training() {
  const [trainings, setTrainings] =
    useState<Training[]>(
      trainingData,
    );

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<
      TrainingStatus | "All"
    >("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [sortField, setSortField] =
    useState<SortField>("date");

  const [sortDirection, setSortDirection] =
    useState<SortDirection>("asc");

  const [selectedTraining, setSelectedTraining] =
    useState<Training | null>(null);

  const [editingTraining, setEditingTraining] =
    useState<Training | null>(null);

  const [isCreateOpen, setIsCreateOpen] =
    useState(false);

  /*
   * =========================================================
   * FILTER
   * =========================================================
   */

  const filteredTrainings = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return trainings.filter(
      (training) => {
        const matchesSearch =
          query.length === 0 ||
          [
            training.trainingNumber,
            training.id,
            training.student,
            training.studentId,
            training.instructor,
            training.instructorId,
            training.aircraft,
            training.aircraftType,
            training.trainingType,
            training.status,
            training.lessonCode,
            training.lessonTitle,
            training.location,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(query);

        const matchesStatus =
          statusFilter === "All" ||
          training.status ===
            statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );
      },
    );
  }, [
    trainings,
    search,
    statusFilter,
  ]);

  /*
   * =========================================================
   * SORT
   * =========================================================
   */

  const sortedTrainings = useMemo(() => {
    const result = [
      ...filteredTrainings,
    ];

    result.sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "trainingNumber":
          comparison =
            a.trainingNumber.localeCompare(
              b.trainingNumber,
              undefined,
              {
                numeric: true,
                sensitivity: "base",
              },
            );
          break;

        case "date":
          comparison =
            a.date.localeCompare(
              b.date,
            );
          break;

        case "student":
          comparison =
            a.student.localeCompare(
              b.student,
              undefined,
              {
                sensitivity: "base",
              },
            );
          break;

        case "instructor":
          comparison =
            a.instructor.localeCompare(
              b.instructor,
              undefined,
              {
                sensitivity: "base",
              },
            );
          break;

        case "trainingType":
          comparison =
            a.trainingType.localeCompare(
              b.trainingType,
              undefined,
              {
                sensitivity: "base",
              },
            );
          break;

        case "progress":
          comparison =
            a.progress - b.progress;
          break;

        case "status":
          comparison =
            a.status.localeCompare(
              b.status,
              undefined,
              {
                sensitivity: "base",
              },
            );
          break;
      }

      return sortDirection ===
        "asc"
        ? comparison
        : -comparison;
    });

    return result;
  }, [
    filteredTrainings,
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
      sortedTrainings.length /
        PAGE_SIZE,
    ),
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const paginatedTrainings =
    useMemo(() => {
      const start =
        (safeCurrentPage - 1) *
        PAGE_SIZE;

      return sortedTrainings.slice(
        start,
        start + PAGE_SIZE,
      );
    }, [
      sortedTrainings,
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
    value: TrainingStatus | "All",
  ) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSort = (
    field: SortField,
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
    setTrainings([
      ...trainingData,
    ]);

    setSearch("");
    setStatusFilter("All");
    setCurrentPage(1);
    setSortField("date");
    setSortDirection("asc");
    setSelectedTraining(null);
    setEditingTraining(null);
  };

  const handleCreateTraining = (
    training: Training,
  ) => {
    setTrainings((previous) => [
      training,
      ...previous,
    ]);

    setIsCreateOpen(false);
    setCurrentPage(1);
  };

  const handleUpdateTraining = (
    updatedTraining: Training,
  ) => {
    setTrainings((previous) =>
      previous.map((training) =>
        training.id ===
        updatedTraining.id
          ? updatedTraining
          : training,
      ),
    );

    setEditingTraining(null);

    if (
      selectedTraining?.id ===
      updatedTraining.id
    ) {
      setSelectedTraining(
        updatedTraining,
      );
    }
  };

  const handleDeleteTraining = (
    trainingId: string,
  ) => {
    setTrainings((previous) =>
      previous.filter(
        (training) =>
          training.id !==
          trainingId,
      ),
    );

    setSelectedTraining(null);
  };

  /*
   * =========================================================
   * STATUS COUNTS
   * =========================================================
   */

  const statusCounts = useMemo(() => {
    return {
      total: trainings.length,

      scheduled: trainings.filter(
        (training) =>
          training.status ===
          "Scheduled",
      ).length,

      inProgress: trainings.filter(
        (training) =>
          training.status ===
          "In Progress",
      ).length,

      completed: trainings.filter(
        (training) =>
          training.status ===
          "Completed",
      ).length,

      passed: trainings.filter(
        (training) =>
          training.status ===
          "Passed",
      ).length,

      failed: trainings.filter(
        (training) =>
          training.status ===
          "Failed",
      ).length,
    };
  }, [trainings]);

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
              <GraduationCap className="h-4 w-4 text-[#1677FF]" />
            </div>

            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#344054]">
              Training Operations
            </span>
          </div>

          <h1 className="text-[25px] font-semibold tracking-tight text-[#172033]">
            Training
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-[#475467]">
            Manage student training,
            instructors, lessons,
            progress and training
            outcomes.
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

            New Training
          </button>
        </div>
      </section>

      {/* =====================================================
          STATUS SUMMARY
          ===================================================== */}

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <button
          type="button"
          onClick={() =>
            handleStatusChange("All")
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Total Training
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#172033]">
            {statusCounts.total}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Training records
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            handleStatusChange(
              "In Progress",
            )
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            In Progress
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#6941C6]">
            {statusCounts.inProgress}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Active training
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            handleStatusChange(
              "Completed",
            )
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Completed
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#087443]">
            {statusCounts.completed}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Finished lessons
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            handleStatusChange(
              "Passed",
            )
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Passed
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#087443]">
            {statusCounts.passed}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Successful outcomes
          </p>
        </button>
      </section>

      {/* =====================================================
          TRAINING INSIGHTS
          ===================================================== */}

      <section className="grid gap-3 lg:grid-cols-2">
        <div className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF2FF]">
              <BookOpen className="h-4 w-4 text-[#1677FF]" />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#172033]">
                Training Management
              </p>

              <p className="mt-1 text-[11px] leading-5 text-[#667085]">
                Track lessons, student
                progress, instructor
                assignments and training
                outcomes from one place.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8F8F1]">
              <Target className="h-4 w-4 text-[#12B76A]" />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#172033]">
                Training Performance
              </p>

              <p className="mt-1 text-[11px] leading-5 text-[#667085]">
                Monitor progress and
                assessment scores to
                identify students who
                need additional training.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SEARCH / FILTER BAR
          ===================================================== */}

      <section className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative min-w-0 flex-1 lg:max-w-md">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A2B3]" />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                handleSearchChange(
                  event.target.value,
                )
              }
              placeholder="Search training, student, instructor..."
              className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white pl-9 pr-3 text-xs text-[#344054] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
              Status
            </span>

            {[
              "All",
              "Scheduled",
              "In Progress",
              "Completed",
              "Passed",
              "Failed",
              "Cancelled",
            ].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() =>
                  handleStatusChange(
                    status as
                      | TrainingStatus
                      | "All",
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
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TRAINING TABLE
          ===================================================== */}

      <section>
        {paginatedTrainings.length >
        0 ? (
          <>
            <TrainingTable
              trainings={
                paginatedTrainings
              }
              sortField={sortField}
              sortDirection={
                sortDirection
              }
              onSort={handleSort}
              onTrainingClick={
                setSelectedTraining
              }
            />

            <TrainingPagination
              currentPage={
                safeCurrentPage
              }
              totalPages={
                totalPages
              }
              totalItems={
                sortedTrainings.length
              }
              pageSize={PAGE_SIZE}
              onPageChange={
                setCurrentPage
              }
            />
          </>
        ) : (
          <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <TrainingEmptyState
              title={
                search ||
                statusFilter !==
                  "All"
                  ? "No matching training records"
                  : "No training records found"
              }
              description={
                search ||
                statusFilter !==
                  "All"
                  ? "Try changing your search or status filter."
                  : "There are currently no training records."
              }
              actionLabel="New Training"
              onAction={() =>
                setIsCreateOpen(true)
              }
            />
          </div>
        )}
      </section>

      {/* =====================================================
          SELECTED TRAINING DETAILS
          ===================================================== */}

      {selectedTraining && (
        <section className="relative">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
                Selected Training
              </p>

              <p className="mt-0.5 text-xs text-[#667085]">
                Training operational
                details
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setSelectedTraining(
                  null,
                )
              }
              className="text-xs font-medium text-[#667085] transition hover:text-[#172033]"
            >
              Close
            </button>
          </div>

          <TrainingDetails
            training={
              selectedTraining
            }
            onClose={() =>
              setSelectedTraining(
                null,
              )
            }
          />

          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setEditingTraining(
                  selectedTraining,
                );

                setSelectedTraining(
                  null,
                );
              }}
              className="h-9 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white transition hover:bg-[#1264D8]"
            >
              Edit Training
            </button>

            <button
              type="button"
              onClick={() =>
                handleDeleteTraining(
                  selectedTraining.id,
                )
              }
              className="h-9 rounded-lg border border-[#FECDCA] bg-white px-4 text-xs font-semibold text-[#B42318] transition hover:bg-[#FEF3F2]"
            >
              Delete Training
            </button>
          </div>
        </section>
      )}

      {/* =====================================================
          CREATE TRAINING
          ===================================================== */}

      {isCreateOpen && (
        <CreateTrainingModal
          isOpen={isCreateOpen}
          onClose={() =>
            setIsCreateOpen(false)
          }
          onCreate={
            handleCreateTraining
          }
        />
      )}

      {/* =====================================================
          EDIT TRAINING
          ===================================================== */}

      {editingTraining && (
        <EditTrainingModal
          isOpen={
            editingTraining !== null
          }
          training={
            editingTraining
          }
          onClose={() =>
            setEditingTraining(null)
          }
          onSave={
            handleUpdateTraining
          }
        />
      )}
    </div>
  );
}

export default Training;