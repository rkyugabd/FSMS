import {
  CalendarDays,
  Clock3,
  GraduationCap,
  MapPin,
  UserRound,
  X,
} from "lucide-react";

import type {
  Training,
  TrainingStatus,
} from "../trainingData";

type TrainingDetailsProps = {
  training: Training;
  onClose?: () => void;
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

function DetailItem({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
        {label}
      </p>

      <p className="mt-1 text-xs font-medium text-[#344054]">
        {value !== undefined &&
        value !== null &&
        value !== ""
          ? value
          : "—"}
      </p>
    </div>
  );
}

export function TrainingDetails({
  training,
  onClose,
}: TrainingDetailsProps) {
  const statusStyle =
    STATUS_STYLES[training.status];

  return (
    <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF2FF]">
            <GraduationCap className="h-4 w-4 text-[#1677FF]" />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
              Training Record
            </p>

            <h2 className="mt-0.5 text-sm font-semibold text-[#172033]">
              {training.trainingNumber}
            </h2>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#172033]"
            aria-label="Close training details"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5">
          <section>
            <div className="mb-3 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Training Information
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem
                label="Training Type"
                value={
                  training.trainingType
                }
              />

              <DetailItem
                label="Lesson"
                value={
                  training.lessonTitle
                }
              />

              <DetailItem
                label="Lesson Code"
                value={
                  training.lessonCode
                }
              />

              <DetailItem
                label="Location"
                value={
                  training.location
                }
              />
            </div>
          </section>

          <section className="rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] p-4">
            <div className="mb-3 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Schedule
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem
                label="Date"
                value={
                  new Intl.DateTimeFormat(
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
                  )
                }
              />

              <DetailItem
                label="Time"
                value={`${training.startTime} — ${training.endTime}`}
              />

              <DetailItem
                label="Duration"
                value={
                  training.duration
                }
              />

              <DetailItem
                label="Location"
                value={
                  training.location
                }
              />
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center gap-2">
              <UserRound className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Personnel
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem
                label="Student"
                value={
                  training.student
                }
              />

              <DetailItem
                label="Student ID"
                value={
                  training.studentId
                }
              />

              <DetailItem
                label="Instructor"
                value={
                  training.instructor
                }
              />

              <DetailItem
                label="Instructor ID"
                value={
                  training.instructorId
                }
              />
            </div>
          </section>
        </div>

        <div className="space-y-4">
          <section className="rounded-xl border border-[#E4E7EC] bg-[#FCFCFD] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                  Status
                </p>

                <span
                  className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyle.background} ${statusStyle.text}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                  />

                  {training.status}
                </span>
              </div>

              {training.score !==
                undefined && (
                <div className="text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                    Score
                  </p>

                  <p className="mt-1 text-2xl font-semibold text-[#172033]">
                    {training.score}
                    %
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="rounded-xl border border-[#E4E7EC] bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                  Training Progress
                </p>

                <p className="mt-1 text-lg font-semibold text-[#172033]">
                  {training.progress}%
                </p>
              </div>

              <Clock3 className="h-4 w-4 text-[#98A2B3]" />
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-[#EAECF0]">
              <div
                className="h-full rounded-full bg-[#1677FF]"
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

            <p className="mt-2 text-[10px] text-[#98A2B3]">
              Overall lesson completion
            </p>
          </section>

          <section className="rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] p-4">
            <div className="mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Aircraft
              </h3>
            </div>

            <DetailItem
              label="Aircraft"
              value={
                training.aircraft
              }
            />

            <div className="mt-3">
              <DetailItem
                label="Aircraft Type"
                value={
                  training.aircraftType
                }
              />
            </div>
          </section>
        </div>
      </div>

      {training.notes && (
        <div className="border-t border-[#E4E7EC] bg-[#FCFCFD] px-5 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Training Notes
          </p>

          <p className="mt-1.5 text-xs leading-5 text-[#475467]">
            {training.notes}
          </p>
        </div>
      )}
    </div>
  );
}

export default TrainingDetails;