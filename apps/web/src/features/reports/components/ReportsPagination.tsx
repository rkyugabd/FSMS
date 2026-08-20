import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type ReportsPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (
    page: number,
  ) => void;
};

export function ReportsPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: ReportsPaginationProps) {
  const start =
    totalItems === 0
      ? 0
      : (currentPage - 1) *
          pageSize +
        1;

  const end = Math.min(
    currentPage * pageSize,
    totalItems,
  );

  return (
    <div className="mt-3 flex flex-col gap-3 rounded-xl border border-[#E4E7EC] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[10px] text-[#667085]">
        Showing{" "}
        <span className="font-semibold text-[#344054]">
          {start}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-[#344054]">
          {end}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-[#344054]">
          {totalItems}
        </span>{" "}
        reports
      </p>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={
            currentPage <= 1
          }
          onClick={() =>
            onPageChange(
              currentPage - 1,
            )
          }
          className="flex h-8 items-center gap-1 rounded-lg border border-[#D0D5DD] bg-white px-2.5 text-[11px] font-medium text-[#475467] transition hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-3.5 w-3.5" />

          Previous
        </button>

        <div className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-[#172033] px-2 text-[11px] font-semibold text-white">
          {currentPage}
        </div>

        <button
          type="button"
          disabled={
            currentPage >=
            totalPages
          }
          onClick={() =>
            onPageChange(
              currentPage + 1,
            )
          }
          className="flex h-8 items-center gap-1 rounded-lg border border-[#D0D5DD] bg-white px-2.5 text-[11px] font-medium text-[#475467] transition hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next

          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default ReportsPagination;