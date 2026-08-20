import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CalendarDays,
  CreditCard,
  DollarSign,
  MoreHorizontal,
  Plane,
  UserRound,
} from "lucide-react";

import type {
  FinanceStatus,
  FinanceTransaction,
} from "../financeData";

type SortField =
  | "transactionNumber"
  | "date"
  | "type"
  | "category"
  | "amount"
  | "status";

type SortDirection = "asc" | "desc";

type FinanceTableProps = {
  transactions: FinanceTransaction[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  onTransactionClick: (
    transaction: FinanceTransaction,
  ) => void;
};

const STATUS_STYLES: Record<
  FinanceStatus,
  {
    background: string;
    text: string;
    dot: string;
  }
> = {
  Paid: {
    background: "bg-[#E8F8F1]",
    text: "text-[#087443]",
    dot: "bg-[#12B76A]",
  },

  Pending: {
    background: "bg-[#FFFAEB]",
    text: "text-[#B54708]",
    dot: "bg-[#F79009]",
  },

  Overdue: {
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

function formatCurrency(
  value: number,
) {
  return value.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
  });
}

function formatDate(
  value: string,
) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  ).format(
    new Date(`${value}T00:00:00`),
  );
}

export function FinanceTable({
  transactions,
  sortField,
  sortDirection,
  onSort,
  onTransactionClick,
}: FinanceTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-[#172033]">
            Financial Transactions
          </h3>

          <p className="mt-0.5 text-[11px] text-[#667085]">
            {transactions.length}{" "}
            {transactions.length === 1
              ? "transaction"
              : "transactions"}{" "}
            displayed
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-[#98A2B3]">
          <span className="h-2 w-2 rounded-full bg-[#12B76A]" />
          Live financial view
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1300px] w-full border-collapse">
          <thead className="border-b border-[#E4E7EC] bg-[#F9FAFB]">
            <tr>
              <TableHeader
                field="transactionNumber"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Transaction
              </TableHeader>

              <TableHeader
                field="date"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Date
              </TableHeader>

              <TableHeader
                field="type"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Type
              </TableHeader>

              <TableHeader
                field="category"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Category
              </TableHeader>

              <th
                scope="col"
                className="whitespace-nowrap px-4 py-3 text-left"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                  Description
                </span>
              </th>

              <TableHeader
                field="amount"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Amount
              </TableHeader>

              <th
                scope="col"
                className="whitespace-nowrap px-4 py-3 text-left"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                  Related
                </span>
              </th>

              <th
                scope="col"
                className="whitespace-nowrap px-4 py-3 text-left"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                  Payment
                </span>
              </th>

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
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="px-6 py-16 text-center"
                >
                  <div className="mx-auto flex max-w-sm flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2F4F7]">
                      <DollarSign className="h-4 w-4 text-[#98A2B3]" />
                    </div>

                    <h4 className="mt-3 text-sm font-semibold text-[#344054]">
                      No transactions found
                    </h4>

                    <p className="mt-1 text-xs text-[#667085]">
                      Try changing your filters
                      or search criteria.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              transactions.map(
                (transaction) => {
                  const statusStyle =
                    STATUS_STYLES[
                      transaction.status
                    ];

                  const isExpense =
                    transaction.type ===
                      "Expense" ||
                    transaction.type ===
                      "Refund";

                  return (
                    <tr
                      key={transaction.id}
                      onClick={() =>
                        onTransactionClick(
                          transaction,
                        )
                      }
                      className="group cursor-pointer bg-white transition hover:bg-[#F9FAFB]"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={[
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                              isExpense
                                ? "bg-[#FEF3F2]"
                                : "bg-[#E8F8F1]",
                            ].join(" ")}
                          >
                            <DollarSign
                              className={[
                                "h-3.5 w-3.5",
                                isExpense
                                  ? "text-[#F04438]"
                                  : "text-[#12B76A]",
                              ].join(" ")}
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="truncate text-xs font-semibold text-[#172033]">
                              {
                                transaction.transactionNumber
                              }
                            </div>

                            <div className="mt-0.5 truncate text-[10px] text-[#98A2B3]">
                              {transaction.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-3.5 w-3.5 text-[#98A2B3]" />

                          <span className="text-xs font-medium text-[#344054]">
                            {formatDate(
                              transaction.date,
                            )}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={[
                            "inline-flex whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-semibold",
                            transaction.type ===
                            "Revenue"
                              ? "bg-[#E8F8F1] text-[#087443]"
                              : transaction.type ===
                                  "Expense"
                                ? "bg-[#FEF3F2] text-[#B42318]"
                                : transaction.type ===
                                    "Refund"
                                  ? "bg-[#FFFAEB] text-[#B54708]"
                                  : "bg-[#F2F4F7] text-[#475467]",
                          ].join(" ")}
                        >
                          {transaction.type}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="text-xs font-semibold text-[#344054]">
                          {transaction.category}
                        </div>

                        <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                          Financial category
                        </div>
                      </td>

                      <td className="max-w-[240px] px-4 py-3">
                        <div className="truncate text-xs font-medium text-[#344054]">
                          {
                            transaction.description
                          }
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div
                          className={[
                            "text-xs font-semibold",
                            isExpense
                              ? "text-[#B42318]"
                              : "text-[#087443]",
                          ].join(" ")}
                        >
                          {isExpense
                            ? "-"
                            : "+"}
                          {formatCurrency(
                            transaction.total,
                          )}
                        </div>

                        <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                          Base{" "}
                          {formatCurrency(
                            transaction.amount,
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          {transaction.student && (
                            <div className="flex items-center gap-1.5 text-[10px] text-[#667085]">
                              <UserRound className="h-3 w-3" />
                              {transaction.student}
                            </div>
                          )}

                          {transaction.aircraft && (
                            <div className="flex items-center gap-1.5 text-[10px] text-[#667085]">
                              <Plane className="h-3 w-3" />
                              {transaction.aircraft}
                            </div>
                          )}

                          {!transaction.student &&
                            !transaction.aircraft && (
                              <span className="text-[10px] text-[#98A2B3]">
                                General
                              </span>
                            )}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <CreditCard className="h-3 w-3 text-[#98A2B3]" />

                          <span className="whitespace-nowrap text-[10px] font-medium text-[#475467]">
                            {
                              transaction.paymentMethod
                            }
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyle.background} ${statusStyle.text}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                          />

                          {transaction.status}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();

                            onTransactionClick(
                              transaction,
                            );
                          }}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-[#98A2B3] opacity-0 transition hover:bg-[#F2F4F7] hover:text-[#344054] group-hover:opacity-100"
                          aria-label={`Open ${transaction.transactionNumber}`}
                          title={`Open ${transaction.transactionNumber}`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                },
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-2 border-t border-[#E4E7EC] bg-[#FCFCFD] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[10px] text-[#667085]">
          Showing{" "}
          <span className="font-semibold text-[#344054]">
            {transactions.length}
          </span>{" "}
          transaction
          {transactions.length === 1
            ? ""
            : "s"}
        </p>

        <p className="text-[10px] text-[#98A2B3]">
          Select a transaction to view financial
          details.
        </p>
      </div>
    </div>
  );
}

export default FinanceTable;