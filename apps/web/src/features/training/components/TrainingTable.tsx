import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CalendarDays,
  GraduationCap,
  MoreHorizontal,
  UserRound,
} from "lucide-react";

import type {
  Training,
  TrainingStatus,
} from "../trainingData";

type SortField =
  | "trainingNumber"
  | "date"
  | "student"
  | "instructor"
  | "trainingType"
  | "progress"
  | "status";

type SortDirection = "asc" | "desc";

type TrainingTableProps = {
  trainings: Training[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onTrainingClick: (training: Training) => void;
};

const STATUS_STYLES: Record<
  TrainingStatus,
  {
    background: string;
    text: string;
    dot: string;
  }
> = {
  Scheduled: {
    background: "bg-[#EAF2FF]",
    text: "text-[#1355B5]",
    dot: "bg-[#1677FF]",
  },

  "In Progress": {
    background: "bg-[#F2EDFF]",
    text: "text-[#6941C6]",
    dot: "bg-[#7F56D9]",
  },

  Completed: {
    background: "bg-[#E8F8F1]",
    text: "text-[#087443]",
    dot: "bg-[#12B76A]",
  },

  Passed: {
    background: "bg-[#E8F8F1]",
    text: "text-[#087443]",
    dot: "bg-[#12B76A]",
  },

  Failed: {
    background: "bg-[#FEF3F2]",
    text: "text-[#B42318]",
    dot: "bg-[#F04438]",
  },

  Cancelled: {
    background: "bg-[#F2F4F7]",
    text: "text-[#475467]",
    dot: "bg-[#98A2B3]",
  },
};

function SortIcon({
  field,
  activeField,
  direction,
}: {
  field: SortField;
  activeField: SortField;
  direction: SortDirection;
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
}: {
  children: React.ReactNode;
  field: SortField;
  activeField: SortField;
  direction: SortDirection;
  onSort: (field: SortField) => void;
}) {
  return (
    <th
      scope="col"
      className="whitespace-nowrap px-4 py-3 text-left"
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

export function TrainingTable({
  trainings,
  sortField,
  sortDirection,
  onSort,
  onTrainingClick,
}: TrainingTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-[#172033]">
            Training Records
          </h3>

          <p className="mt-0.5 text-[11px] text-[#667085]">
            {trainings.length}{" "}
            {trainings.length === 1
              ? "training"
              : "training records"}{" "}
            displayed
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-[#98A2B3]">
          <span className="h-2 w-2 rounded-full bg-[#12B76A]" />

          Training operations view
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1180px] w-full border-collapse">
          <thead className="border-b border-[#E4E7EC] bg-[#F9FAFB]">
            <tr>
              <TableHeader
                field="trainingNumber"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Training
              </TableHeader>

              <TableHeader
                field="date"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Schedule
              </TableHeader>

              <TableHeader
                field="student"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Student
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
                field="trainingType"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Training Type
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
            {trainings.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-16 text-center"
                >
                  <div className="mx-auto flex max-w-sm flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2F4F7]">
                      <GraduationCap className="h-4 w-4 text-[#98A2B3]" />
                    </div>

                    <h4 className="mt-3 text-sm font-semibold text-[#344054]">
                      No training records found
                    </h4>

                    <p className="mt-1 text-xs text-[#667085]">
                      Try changing your filters
                      or search criteria.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              trainings.map((training) => {
                const statusStyle =
                  STATUS_STYLES[
                    training.status
                  ];

                return (
                  <tr
                    key={training.id}
                    onClick={() =>
                      onTrainingClick(
                        training,
                      )
                    }
                    className="group cursor-pointer bg-white transition hover:bg-[#F9FAFB]"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF2FF]">
                          <GraduationCap className="h-3.5 w-3.5 text-[#1677FF]" />
                        </div>

                        <div className="min-w-0">
                          <div className="truncate text-xs font-semibold text-[#172033]">
                            {
                              training.trainingNumber
                            }
                          </div>

                          <div className="mt-0.5 truncate text-[10px] text-[#98A2B3]">
                            {training.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-start gap-2">
                        <CalendarDays className="mt-0.5 h-3.5 w-3.5 text-[#98A2B3]" />

                        <div>
                          <div className="text-xs font-semibold text-[#344054]">
                            {new Intl.DateTimeFormat(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            ).format(
                              new Date(
                                `${training.date}T00:00:00`,
                              ),
                            )}
                          </div>

                          <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                            {
                              training.startTime
                            }{" "}
                            —{" "}
                            {
                              training.endTime
                            }
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="text-xs font-semibold text-[#344054]">
                        {training.student}
                      </div>

                      <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                        {training.studentId}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F2F4F7]">
                          <UserRound className="h-3.5 w-3.5 text-[#667085]" />
                        </div>

                        <span className="whitespace-nowrap text-xs font-medium text-[#344054]">
                          {
                            training.instructor
                          }
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span className="inline-flex whitespace-nowrap rounded-md bg-[#F2F4F7] px-2 py-1 text-[10px] font-medium text-[#475467]">
                        {
                          training.trainingType
                        }
                      </span>

                      {training.lessonTitle && (
                        <div className="mt-1 max-w-[180px] truncate text-[10px] text-[#98A2B3]">
                          {
                            training.lessonTitle
                          }
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <div className="w-28">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-[10px] font-medium text-[#667085]">
                            Progress
                          </span>

                          <span className="text-[10px] font-semibold text-[#344054]">
                            {training.progress}%
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
                                  training.progress,
                                ),
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyle.background} ${statusStyle.text}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                        />

                        {training.status}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();

                          onTrainingClick(
                            training,
                          );
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-[#98A2B3] opacity-0 transition hover:bg-[#F2F4F7] hover:text-[#344054] group-hover:opacity-100"
                        aria-label={`Open ${training.trainingNumber}`}
                        title={`Open ${training.trainingNumber}`}
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

      <div className="flex flex-col gap-2 border-t border-[#E4E7EC] bg-[#FCFCFD] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[10px] text-[#667085]">
          Showing{" "}
          <span className="font-semibold text-[#344054]">
            {trainings.length}
          </span>{" "}
          training record
          {trainings.length === 1
            ? ""
            : "s"}
        </p>

        <p className="text-[10px] text-[#98A2B3]">
          Select a training record to view
          operational details.
        </p>
      </div>
    </div>
  );
}

export default TrainingTable;