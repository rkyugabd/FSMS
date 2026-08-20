import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type TimeTrackingPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (
    page: number,
  ) => void;
};

export function TimeTrackingPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: TimeTrackingPaginationProps) {
  const startItem =
    totalItems === 0
      ? 0
      : (currentPage - 1) *
          pageSize +
        1;

  const endItem = Math.min(
    currentPage * pageSize,
    totalItems,
  );

  return (
    <div className="flex flex-col gap-3 border-x border-b border-[#E4E7EC] bg-white px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[10px] text-[#667085]">
        Showing{" "}
        <span className="font-semibold text-[#344054]">
          {startItem}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-[#344054]">
          {endItem}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-[#344054]">
          {totalItems}
        </span>{" "}
        entries
      </p>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() =>
            onPageChange(
              currentPage - 1,
            )
          }
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#667085] transition hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        {Array.from(
          {
            length: totalPages,
          },
          (_, index) => index + 1,
        )
          .slice(
            Math.max(
              0,
              currentPage - 3,
            ),
            Math.min(
              totalPages,
              currentPage + 2,
            ),
          )
          .map((page) => (
            <button
              key={page}
              type="button"
              onClick={() =>
                onPageChange(page)
              }
              className={[
                "flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-[11px] font-medium transition",
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
            currentPage >=
            totalPages
          }
          onClick={() =>
            onPageChange(
              currentPage + 1,
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

export default TimeTrackingPagination;