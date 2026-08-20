import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type FinancePaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (
    page: number,
  ) => void;
};

export function FinancePagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: FinancePaginationProps) {
  const startItem =
    totalItems === 0
      ? 0
      : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(
    currentPage * pageSize,
    totalItems,
  );

  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1,
      );
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (currentPage >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  };

  const pages = getPages();

  return (
    <div className="mt-3 flex flex-col gap-3 rounded-xl border border-[#E4E7EC] bg-white px-4 py-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:flex-row sm:items-center sm:justify-between">
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
        transactions
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() =>
            onPageChange(
              Math.max(1, currentPage - 1),
            )
          }
          disabled={currentPage === 1}
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
              "flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-[11px] font-medium transition",
              currentPage === page
                ? "bg-[#1677FF] text-white"
                : "border border-transparent text-[#475467] hover:bg-[#F2F4F7]",
            ].join(" ")}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={() =>
            onPageChange(
              Math.min(
                totalPages,
                currentPage + 1,
              ),
            )
          }
          disabled={
            currentPage === totalPages
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

export default FinancePagination;