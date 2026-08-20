import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type FlightsPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export function FlightsPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: FlightsPaginationProps) {
  const safeTotalPages = Math.max(
    1,
    totalPages,
  );

  const safeCurrentPage = Math.min(
    Math.max(1, currentPage),
    safeTotalPages,
  );

  const startItem =
    totalItems === 0
      ? 0
      : (safeCurrentPage - 1) * pageSize + 1;

  const endItem =
    totalItems === 0
      ? 0
      : Math.min(
          safeCurrentPage * pageSize,
          totalItems,
        );

  const canGoPrevious =
    safeCurrentPage > 1;

  const canGoNext =
    safeCurrentPage < safeTotalPages;

  const getPageNumbers = () => {
    if (safeTotalPages <= 5) {
      return Array.from(
        { length: safeTotalPages },
        (_, index) => index + 1,
      );
    }

    if (safeCurrentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (
      safeCurrentPage >=
      safeTotalPages - 2
    ) {
      return [
        safeTotalPages - 4,
        safeTotalPages - 3,
        safeTotalPages - 2,
        safeTotalPages - 1,
        safeTotalPages,
      ];
    }

    return [
      safeCurrentPage - 2,
      safeCurrentPage - 1,
      safeCurrentPage,
      safeCurrentPage + 1,
      safeCurrentPage + 2,
    ];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col gap-3 border-t border-[#E4E7EC] bg-white px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-[11px] text-[#667085]">
        Showing{" "}
        <span className="font-semibold text-[#344054]">
          {startItem}
        </span>
        {"–"}
        <span className="font-semibold text-[#344054]">
          {endItem}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-[#344054]">
          {totalItems}
        </span>{" "}
        flights
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() =>
            onPageChange(
              safeCurrentPage - 1,
            )
          }
          disabled={!canGoPrevious}
          aria-label="Previous page"
          className={[
            "flex h-8 w-8 items-center justify-center rounded-lg border transition",
            canGoPrevious
              ? "border-[#D0D5DD] bg-white text-[#344054] hover:bg-[#F9FAFB]"
              : "cursor-not-allowed border-[#EAECF0] bg-[#F9FAFB] text-[#D0D5DD]",
          ].join(" ")}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        <div className="flex items-center gap-1">
          {pageNumbers.map((page) => {
            const isActive =
              page === safeCurrentPage;

            return (
              <button
                key={page}
                type="button"
                onClick={() =>
                  onPageChange(page)
                }
                aria-current={
                  isActive
                    ? "page"
                    : undefined
                }
                className={[
                  "flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-medium transition",
                  isActive
                    ? "bg-[#1677FF] text-white shadow-sm"
                    : "text-[#475467] hover:bg-[#F2F4F7]",
                ].join(" ")}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() =>
            onPageChange(
              safeCurrentPage + 1,
            )
          }
          disabled={!canGoNext}
          aria-label="Next page"
          className={[
            "flex h-8 w-8 items-center justify-center rounded-lg border transition",
            canGoNext
              ? "border-[#D0D5DD] bg-white text-[#344054] hover:bg-[#F9FAFB]"
              : "cursor-not-allowed border-[#EAECF0] bg-[#F9FAFB] text-[#D0D5DD]",
          ].join(" ")}
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}