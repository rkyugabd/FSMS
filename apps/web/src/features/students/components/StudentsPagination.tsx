import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type StudentsPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export function StudentsPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: StudentsPaginationProps) {
  const startItem =
    totalItems === 0
      ? 0
      : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(
    currentPage * pageSize,
    totalItems,
  );

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <div className="flex flex-col gap-3 border-x border-b border-[#E4E7EC] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
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
        students
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(
              Math.max(1, currentPage - 1),
            )
          }
          className="flex h-8 items-center gap-1 rounded-lg border border-[#D0D5DD] bg-white px-2.5 text-[10px] font-medium text-[#475467] transition hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-3.5 w-3.5" />

          Previous
        </button>

        <div className="hidden items-center gap-1 sm:flex">
          {pages.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() =>
                onPageChange(page)
              }
              className={[
                "flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-[10px] font-semibold transition",
                currentPage === page
                  ? "bg-[#172033] text-white"
                  : "text-[#667085] hover:bg-[#F2F4F7]",
              ].join(" ")}
            >
              {page}
            </button>
          ))}
        </div>

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
          className="flex h-8 items-center gap-1 rounded-lg border border-[#D0D5DD] bg-white px-2.5 text-[10px] font-medium text-[#475467] transition hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next

          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default StudentsPagination;