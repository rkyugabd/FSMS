import {
  CalendarDays,
  CreditCard,
  FileText,
  Plane,
  Receipt,
  UserRound,
  Wallet,
} from "lucide-react";

import type { FinanceTransaction } from "../financeData";

type FinanceDetailsProps = {
  transaction: FinanceTransaction;
};

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

export function FinanceDetails({
  transaction,
}: FinanceDetailsProps) {
  const isExpense =
    transaction.type === "Expense" ||
    transaction.type === "Refund";

  return (
    <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="border-b border-[#E4E7EC] px-5 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div
              className={[
                "flex h-10 w-10 items-center justify-center rounded-lg",
                isExpense
                  ? "bg-[#FEF3F2]"
                  : "bg-[#E8F8F1]",
              ].join(" ")}
            >
              <Wallet
                className={[
                  "h-5 w-5",
                  isExpense
                    ? "text-[#F04438]"
                    : "text-[#12B76A]",
                ].join(" ")}
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#172033]">
                {transaction.transactionNumber}
              </h3>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                {transaction.description}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Total
            </p>

            <p
              className={[
                "mt-1 text-xl font-semibold",
                isExpense
                  ? "text-[#B42318]"
                  : "text-[#087443]",
              ].join(" ")}
            >
              {isExpense ? "-" : "+"}
              {formatCurrency(
                transaction.total,
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-1 flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-[#98A2B3]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Date
            </span>
          </div>

          <p className="text-xs font-medium text-[#344054]">
            {formatDate(
              transaction.date,
            )}
          </p>
        </div>

        <div>
          <div className="mb-1 flex items-center gap-1.5">
            <Receipt className="h-3.5 w-3.5 text-[#98A2B3]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Type
            </span>
          </div>

          <p className="text-xs font-medium text-[#344054]">
            {transaction.type}
          </p>
        </div>

        <div>
          <div className="mb-1 flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-[#98A2B3]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Category
            </span>
          </div>

          <p className="text-xs font-medium text-[#344054]">
            {transaction.category}
          </p>
        </div>

        <div>
          <div className="mb-1 flex items-center gap-1.5">
            <CreditCard className="h-3.5 w-3.5 text-[#98A2B3]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Payment
            </span>
          </div>

          <p className="text-xs font-medium text-[#344054]">
            {transaction.paymentMethod}
          </p>
        </div>
      </div>

      <div className="border-t border-[#E4E7EC] px-5 py-4">
        <h4 className="mb-3 text-xs font-semibold text-[#172033]">
          Financial Breakdown
        </h4>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-[#F9FAFB] p-3">
            <p className="text-[10px] text-[#98A2B3]">
              Amount
            </p>

            <p className="mt-1 text-sm font-semibold text-[#344054]">
              {formatCurrency(
                transaction.amount,
              )}
            </p>
          </div>

          <div className="rounded-lg bg-[#F9FAFB] p-3">
            <p className="text-[10px] text-[#98A2B3]">
              Tax
            </p>

            <p className="mt-1 text-sm font-semibold text-[#344054]">
              {formatCurrency(
                transaction.tax,
              )}
            </p>
          </div>

          <div className="rounded-lg bg-[#EAF2FF] p-3">
            <p className="text-[10px] text-[#667085]">
              Total
            </p>

            <p className="mt-1 text-sm font-semibold text-[#1355B5]">
              {formatCurrency(
                transaction.total,
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E4E7EC] px-5 py-4">
        <h4 className="mb-3 text-xs font-semibold text-[#172033]">
          Related Records
        </h4>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {transaction.student && (
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F2F4F7]">
                <UserRound className="h-3.5 w-3.5 text-[#667085]" />
              </div>

              <div>
                <p className="text-[10px] text-[#98A2B3]">
                  Student
                </p>

                <p className="text-xs font-medium text-[#344054]">
                  {transaction.student}
                </p>
              </div>
            </div>
          )}

          {transaction.aircraft && (
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F2F4F7]">
                <Plane className="h-3.5 w-3.5 text-[#667085]" />
              </div>

              <div>
                <p className="text-[10px] text-[#98A2B3]">
                  Aircraft
                </p>

                <p className="text-xs font-medium text-[#344054]">
                  {transaction.aircraft}
                </p>
              </div>
            </div>
          )}

          {transaction.flight && (
            <div>
              <p className="text-[10px] text-[#98A2B3]">
                Flight
              </p>

              <p className="text-xs font-medium text-[#344054]">
                {transaction.flight}
              </p>
            </div>
          )}

          {transaction.invoice && (
            <div>
              <p className="text-[10px] text-[#98A2B3]">
                Invoice
              </p>

              <p className="text-xs font-medium text-[#344054]">
                {transaction.invoice}
              </p>
            </div>
          )}
        </div>
      </div>

      {transaction.notes && (
        <div className="border-t border-[#E4E7EC] bg-[#FCFCFD] px-5 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Notes
          </p>

          <p className="mt-1 text-xs leading-5 text-[#475467]">
            {transaction.notes}
          </p>
        </div>
      )}
    </div>
  );
}

export default FinanceDetails;