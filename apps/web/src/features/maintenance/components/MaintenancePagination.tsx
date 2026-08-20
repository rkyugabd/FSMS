import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type MaintenancePaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (
    page: number,
  ) => void;
};

export function MaintenancePagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: MaintenancePaginationProps) {
  if (totalItems === 0) {
    return null;
  }

  const startItem =
    (currentPage - 1) * pageSize + 1;

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
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

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
        records
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(
              Math.max(
                currentPage - 1,
                1,
              ),
            )
          }
          className="flex h-8 items-center gap-1 rounded-lg border border-[#D0D5DD] bg-white px-2.5 text-[10px] font-medium text-[#475467] transition hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-3.5 w-3.5" />

          Previous
        </button>

        <div className="hidden items-center gap-1 sm:flex">
          {getPages().map(
            (page, index) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-8 w-8 items-center justify-center text-[10px] text-[#98A2B3]"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  type="button"
                  onClick={() =>
                    onPageChange(
                      page as number,
                    )
                  }
                  className={[
                    "flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-semibold transition",
                    currentPage === page
                      ? "bg-[#1677FF] text-white"
                      : "text-[#475467] hover:bg-[#F2F4F7]",
                  ].join(" ")}
                >
                  {page}
                </button>
              ),
          )}
        </div>

        <span className="px-2 text-[10px] text-[#667085] sm:hidden">
          Page {currentPage} of{" "}
          {totalPages}
        </span>

        <button
          type="button"
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            onPageChange(
              Math.min(
                currentPage + 1,
                totalPages,
              ),
            )
          }
          className="flex h-8 items-center gap-1 rounded-lg border border-[#D0D5DD] bg-white px-2.5 text-[10px] font-medium text-[#475467] transition hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next

          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default MaintenancePagination;