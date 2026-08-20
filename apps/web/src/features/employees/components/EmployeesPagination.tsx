import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type EmployeesPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export function EmployeesPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: EmployeesPaginationProps) {
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

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <div className="mt-3 flex flex-col gap-3 rounded-xl border border-[#E4E7EC] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[10px] text-[#667085]">
        Showing{" "}
        <span className="font-semibold text-[#344054]">
          {start}-{end}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-[#344054]">
          {totalItems}
        </span>{" "}
        employees
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(
              Math.max(
                1,
                currentPage - 1,
              ),
            )
          }
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] transition hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() =>
              onPageChange(page)
            }
            className={[
              "h-8 min-w-8 rounded-lg px-2 text-[11px] font-medium transition",
              page === currentPage
                ? "bg-[#1677FF] text-white"
                : "border border-[#D0D5DD] bg-white text-[#475467] hover:bg-[#F9FAFB]",
            ].join(" ")}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            onPageChange(
              Math.min(
                totalPages,
                currentPage + 1,
              ),
            )
          }
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] transition hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default EmployeesPagination;