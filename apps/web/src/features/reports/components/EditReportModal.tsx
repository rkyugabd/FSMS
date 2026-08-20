import {
  FileBarChart2,
  Save,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import type {
  Report,
  ReportCategory,
  ReportFormat,
  ReportStatus,
} from "../reportsData";

type EditReportModalProps = {
  isOpen: boolean;
  report: Report | null;
  onClose: () => void;
  onSave: (report: Report) => void;
};

type FormData = {
  name: string;
  category: ReportCategory;
  description: string;
  periodStart: string;
  periodEnd: string;
  format: ReportFormat;
  status: ReportStatus;
  scheduled: boolean;
  schedule: string;
  recipients: string;
  includeCharts: boolean;
  includeSummary: boolean;
  includeDetailedData: boolean;
};

const categories: ReportCategory[] = [
  "Flight Operations",
  "Training",
  "Students",
  "Aircraft",
  "Maintenance",
  "Employees",
  "Time Tracking",
  "Procurement",
  "Finance",
  "Analytics",
  "Custom",
];

const formats: ReportFormat[] = [
  "PDF",
  "Excel",
  "CSV",
];

const statuses: ReportStatus[] = [
  "Ready",
  "Generating",
  "Scheduled",
  "Failed",
  "Archived",
];

export function EditReportModal({
  isOpen,
  report,
  onClose,
  onSave,
}: EditReportModalProps) {
  const [form, setForm] =
    useState<FormData | null>(null);

  useEffect(() => {
    if (isOpen && report) {
      setForm({
        name: report.name,
        category: report.category,
        description:
          report.description,
        periodStart:
          report.periodStart,
        periodEnd:
          report.periodEnd,
        format: report.format,
        status: report.status,
        scheduled:
          report.scheduled,
        schedule:
          report.schedule ?? "Weekly",
        recipients: String(
          report.recipients,
        ),
        includeCharts:
          report.includeCharts,
        includeSummary:
          report.includeSummary,
        includeDetailedData:
          report.includeDetailedData,
      });
    }
  }, [isOpen, report]);

  if (!isOpen || !report || !form) {
    return null;
  }

  const updateField = <
    K extends keyof FormData,
  >(
    field: K,
    value: FormData[K],
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

    const updatedReport: Report = {
      ...report,
      name:
        form.name.trim() ||
        report.name,
      category: form.category,
      description:
        form.description.trim(),
      periodStart:
        form.periodStart,
      periodEnd:
        form.periodEnd,
      format: form.format,
      status: form.status,
      scheduled:
        form.scheduled,
      schedule: form.scheduled
        ? form.schedule
        : undefined,
      recipients:
        Number(form.recipients) ||
        1,
      includeCharts:
        form.includeCharts,
      includeSummary:
        form.includeSummary,
      includeDetailedData:
        form.includeDetailedData,
      updatedAt:
        new Date()
          .toISOString()
          .split("T")[0],
    };

    onSave(updatedReport);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#101828]/40 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-report-modal-title"
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
              <FileBarChart2 className="h-4 w-4 text-[#1677FF]" />
            </div>

            <div>
              <h2
                id="edit-report-modal-title"
                className="text-base font-semibold text-[#172033]"
              >
                Edit Report
              </h2>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                Update report configuration
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] hover:bg-[#F2F4F7]"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <section className="px-5 py-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                  Report Name
                </label>

                <input
                  required
                  value={form.name}
                  onChange={(event) =>
                    updateField(
                      "name",
                      event.target.value,
                    )
                  }
                  className="h-9 w-full rounded-lg border border-[#D0D5DD] px-3 text-xs text-[#172033] outline-none focus:border-[#1677FF]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                  Category
                </label>

                <select
                  value={form.category}
                  onChange={(event) =>
                    updateField(
                      "category",
                      event.target.value as ReportCategory,
                    )
                  }
                  className="h-9 w-full rounded-lg border border-[#D0D5DD] px-3 text-xs"
                >
                  {categories.map(
                    (category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ),
                  )}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(event) =>
                    updateField(
                      "status",
                      event.target.value as ReportStatus,
                    )
                  }
                  className="h-9 w-full rounded-lg border border-[#D0D5DD] px-3 text-xs"
                >
                  {statuses.map(
                    (status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    ),
                  )}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                  Format
                </label>

                <select
                  value={form.format}
                  onChange={(event) =>
                    updateField(
                      "format",
                      event.target.value as ReportFormat,
                    )
                  }
                  className="h-9 w-full rounded-lg border border-[#D0D5DD] px-3 text-xs"
                >
                  {formats.map(
                    (format) => (
                      <option
                        key={format}
                        value={format}
                      >
                        {format}
                      </option>
                    ),
                  )}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                  Recipients
                </label>

                <input
                  type="number"
                  min="1"
                  value={form.recipients}
                  onChange={(event) =>
                    updateField(
                      "recipients",
                      event.target.value,
                    )
                  }
                  className="h-9 w-full rounded-lg border border-[#D0D5DD] px-3 text-xs"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                  Period Start
                </label>

                <input
                  type="date"
                  value={form.periodStart}
                  onChange={(event) =>
                    updateField(
                      "periodStart",
                      event.target.value,
                    )
                  }
                  className="h-9 w-full rounded-lg border border-[#D0D5DD] px-3 text-xs"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                  Period End
                </label>

                <input
                  type="date"
                  value={form.periodEnd}
                  onChange={(event) =>
                    updateField(
                      "periodEnd",
                      event.target.value,
                    )
                  }
                  className="h-9 w-full rounded-lg border border-[#D0D5DD] px-3 text-xs"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                  Description
                </label>

                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(event) =>
                    updateField(
                      "description",
                      event.target.value,
                    )
                  }
                  className="w-full resize-none rounded-lg border border-[#D0D5DD] px-3 py-2.5 text-xs"
                />
              </div>
            </div>
          </section>

          <section className="border-t border-[#E4E7EC] px-5 py-5">
            <div className="space-y-3">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={
                    form.includeSummary
                  }
                  onChange={(event) =>
                    updateField(
                      "includeSummary",
                      event.target.checked,
                    )
                  }
                />

                <span className="text-xs font-medium text-[#344054]">
                  Include Executive Summary
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={
                    form.includeCharts
                  }
                  onChange={(event) =>
                    updateField(
                      "includeCharts",
                      event.target.checked,
                    )
                  }
                />

                <span className="text-xs font-medium text-[#344054]">
                  Include Charts
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={
                    form.includeDetailedData
                  }
                  onChange={(event) =>
                    updateField(
                      "includeDetailedData",
                      event.target.checked,
                    )
                  }
                />

                <span className="text-xs font-medium text-[#344054]">
                  Include Detailed Data
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.scheduled}
                  onChange={(event) =>
                    updateField(
                      "scheduled",
                      event.target.checked,
                    )
                  }
                />

                <span className="text-xs font-medium text-[#344054]">
                  Scheduled Report
                </span>
              </label>

              {form.scheduled && (
                <select
                  value={form.schedule}
                  onChange={(event) =>
                    updateField(
                      "schedule",
                      event.target.value,
                    )
                  }
                  className="h-9 w-full rounded-lg border border-[#D0D5DD] px-3 text-xs"
                >
                  <option>
                    Daily
                  </option>
                  <option>
                    Weekly
                  </option>
                  <option>
                    Monthly
                  </option>
                </select>
              )}
            </div>
          </section>

          <footer className="flex items-center justify-end gap-2 border-t border-[#E4E7EC] bg-[#F9FAFB] px-5 py-3">
            <button
              type="button"
              onClick={onClose}
              className="h-9 rounded-lg border border-[#D0D5DD] bg-white px-4 text-xs font-semibold text-[#344054]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex h-9 items-center gap-1.5 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white hover:bg-[#1264D8]"
            >
              <Save className="h-3.5 w-3.5" />

              Save Changes
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default EditReportModal;