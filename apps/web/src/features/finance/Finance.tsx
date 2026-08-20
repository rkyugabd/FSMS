import {
  DollarSign,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { useMemo, useState } from "react";

import {
  financeData,
  FINANCE_CATEGORIES,
  FINANCE_STATUSES,
  FINANCE_TRANSACTION_TYPES,
  type FinanceCategory,
  type FinanceStatus,
  type FinanceTransaction,
  type FinanceTransactionType,
} from "./financeData";

import { FinanceTable } from "./components/FinanceTable";
import { FinanceDetails } from "./components/FinanceDetails";
import { CreateFinanceEntryModal } from "./components/CreateFinanceEntryModal";
import { EditFinanceEntryModal } from "./components/EditFinanceEntryModal";
import { FinancePagination } from "./components/FinancePagination";
import { FinanceEmptyState } from "./components/FinanceEmptyState";

const PAGE_SIZE = 8;

type SortField =
  | "transactionNumber"
  | "date"
  | "type"
  | "category"
  | "amount"
  | "status";

type SortDirection = "asc" | "desc";

export function Finance() {
  const [transactions, setTransactions] =
    useState<FinanceTransaction[]>(financeData);

  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] =
    useState<FinanceTransactionType | "All">("All");

  const [categoryFilter, setCategoryFilter] =
    useState<FinanceCategory | "All">("All");

  const [statusFilter, setStatusFilter] =
    useState<FinanceStatus | "All">("All");

  const [currentPage, setCurrentPage] = useState(1);

  const [sortField, setSortField] =
    useState<SortField>("date");

  const [sortDirection, setSortDirection] =
    useState<SortDirection>("desc");

  const [selectedTransaction, setSelectedTransaction] =
    useState<FinanceTransaction | null>(null);

  const [editingTransaction, setEditingTransaction] =
    useState<FinanceTransaction | null>(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return transactions.filter((transaction) => {
      const matchesSearch =
        query.length === 0 ||
        [
          transaction.id,
          transaction.transactionNumber,
          transaction.description,
          transaction.category,
          transaction.type,
          transaction.status,
          transaction.student,
          transaction.aircraft,
          transaction.flight,
          transaction.invoice,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesType =
        typeFilter === "All" ||
        transaction.type === typeFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        transaction.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" ||
        transaction.status === statusFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    transactions,
    search,
    typeFilter,
    categoryFilter,
    statusFilter,
  ]);

  const sortedTransactions = useMemo(() => {
    const result = [...filteredTransactions];

    result.sort((a, b) => {
      let aValue: string | number = "";
      let bValue: string | number = "";

      switch (sortField) {
        case "transactionNumber":
          aValue = a.transactionNumber;
          bValue = b.transactionNumber;
          break;

        case "date":
          aValue = a.date;
          bValue = b.date;
          break;

        case "type":
          aValue = a.type;
          bValue = b.type;
          break;

        case "category":
          aValue = a.category;
          bValue = b.category;
          break;

        case "amount":
          aValue = a.total;
          bValue = b.total;
          break;

        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
      }

      if (
        typeof aValue === "number" &&
        typeof bValue === "number"
      ) {
        return sortDirection === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      const comparison = String(aValue).localeCompare(
        String(bValue),
        undefined,
        {
          numeric: true,
          sensitivity: "base",
        },
      );

      return sortDirection === "asc"
        ? comparison
        : -comparison;
    });

    return result;
  }, [
    filteredTransactions,
    sortField,
    sortDirection,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      sortedTransactions.length / PAGE_SIZE,
    ),
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const paginatedTransactions = useMemo(() => {
    const start =
      (safeCurrentPage - 1) * PAGE_SIZE;

    return sortedTransactions.slice(
      start,
      start + PAGE_SIZE,
    );
  }, [
    sortedTransactions,
    safeCurrentPage,
  ]);

  const financialSummary = useMemo(() => {
    const revenue = transactions
      .filter(
        (transaction) =>
          transaction.type === "Revenue",
      )
      .reduce(
        (sum, transaction) =>
          sum + transaction.total,
        0,
      );

    const expenses = transactions
      .filter(
        (transaction) =>
          transaction.type === "Expense",
      )
      .reduce(
        (sum, transaction) =>
          sum + transaction.total,
        0,
      );

    const refunds = transactions
      .filter(
        (transaction) =>
          transaction.type === "Refund",
      )
      .reduce(
        (sum, transaction) =>
          sum + transaction.total,
        0,
      );

    const outstanding = transactions
      .filter(
        (transaction) =>
          transaction.status === "Pending" ||
          transaction.status === "Overdue",
      )
      .reduce(
        (sum, transaction) =>
          sum + transaction.total,
        0,
      );

    return {
      revenue,
      expenses,
      refunds,
      netIncome:
        revenue - expenses - refunds,
      outstanding,
    };
  }, [transactions]);

  const handleSearchChange = (
    value: string,
  ) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleTypeChange = (
    value: FinanceTransactionType | "All",
  ) => {
    setTypeFilter(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (
    value: FinanceCategory | "All",
  ) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (
    value: FinanceStatus | "All",
  ) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSort = (
    field: SortField,
  ) => {
    if (sortField === field) {
      setSortDirection(
        (previous) =>
          previous === "asc"
            ? "desc"
            : "asc",
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }

    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setTransactions([...financeData]);
    setSearch("");
    setTypeFilter("All");
    setCategoryFilter("All");
    setStatusFilter("All");
    setCurrentPage(1);
    setSortField("date");
    setSortDirection("desc");
    setSelectedTransaction(null);
    setEditingTransaction(null);
  };

  const handleCreate = (
    transaction: FinanceTransaction,
  ) => {
    setTransactions((previous) => [
      transaction,
      ...previous,
    ]);

    setIsCreateOpen(false);
    setCurrentPage(1);
  };

  const handleUpdate = (
    updatedTransaction: FinanceTransaction,
  ) => {
    setTransactions((previous) =>
      previous.map((transaction) =>
        transaction.id ===
        updatedTransaction.id
          ? updatedTransaction
          : transaction,
      ),
    );

    setEditingTransaction(null);

    if (
      selectedTransaction?.id ===
      updatedTransaction.id
    ) {
      setSelectedTransaction(
        updatedTransaction,
      );
    }
  };

  const handleDelete = (
    transactionId: string,
  ) => {
    setTransactions((previous) =>
      previous.filter(
        (transaction) =>
          transaction.id !== transactionId,
      ),
    );

    setSelectedTransaction(null);
  };

  return (
    <div className="space-y-5 text-[#172033]">
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2FF]">
              <DollarSign className="h-4 w-4 text-[#1677FF]" />
            </div>

            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#344054]">
              Financial Management
            </span>
          </div>

          <h1 className="text-[25px] font-semibold tracking-tight text-[#172033]">
            Finance
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-[#475467]">
            Manage revenue, expenses, payments,
            invoices and operational financial
            activity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            className="flex h-9 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs font-medium text-[#344054] shadow-sm transition hover:bg-[#F9FAFB]"
          >
            <RefreshCw className="h-3.5 w-3.5 text-[#667085]" />
            Refresh
          </button>

          <button
            type="button"
            className="flex h-9 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs font-medium text-[#344054] shadow-sm transition hover:bg-[#F9FAFB]"
          >
            <SlidersHorizontal className="h-4 w-4 text-[#667085]" />
            View Options
          </button>

          <button
            type="button"
            onClick={() =>
              setIsCreateOpen(true)
            }
            className="flex h-9 items-center gap-2 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white shadow-sm shadow-blue-900/20 transition hover:bg-[#1264D8] active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            New Transaction
          </button>
        </div>
      </section>

      {/* =====================================================
          FINANCIAL SUMMARY
          ===================================================== */}

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <button
          type="button"
          onClick={() =>
            handleTypeChange("Revenue")
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Total Revenue
            </p>

            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E8F8F1]">
              <TrendingUp className="h-3.5 w-3.5 text-[#12B76A]" />
            </div>
          </div>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#087443]">
            $
            {financialSummary.revenue.toLocaleString(
              "en-CA",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              },
            )}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Recorded revenue
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            handleTypeChange("Expense")
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Total Expenses
            </p>

            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FEF3F2]">
              <TrendingDown className="h-3.5 w-3.5 text-[#F04438]" />
            </div>
          </div>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#B42318]">
            $
            {financialSummary.expenses.toLocaleString(
              "en-CA",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              },
            )}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Operating expenses
          </p>
        </button>

        <div className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Net Income
            </p>

            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF2FF]">
              <Wallet className="h-3.5 w-3.5 text-[#1677FF]" />
            </div>
          </div>

          <p
            className={`mt-2 text-2xl font-semibold tracking-tight ${
              financialSummary.netIncome >= 0
                ? "text-[#1355B5]"
                : "text-[#B42318]"
            }`}
          >
            $
            {financialSummary.netIncome.toLocaleString(
              "en-CA",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              },
            )}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Revenue less expenses and refunds
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            handleStatusChange("Pending")
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Outstanding
            </p>

            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFFAEB]">
              <DollarSign className="h-3.5 w-3.5 text-[#F79009]" />
            </div>
          </div>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#B54708]">
            $
            {financialSummary.outstanding.toLocaleString(
              "en-CA",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              },
            )}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Pending and overdue transactions
          </p>
        </button>
      </section>

      {/* =====================================================
          FILTERS
          ===================================================== */}

      <section className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex flex-col gap-3">
          <div className="relative min-w-0 lg:max-w-md">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A2B3]" />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                handleSearchChange(
                  event.target.value,
                )
              }
              placeholder="Search transaction, student, aircraft..."
              className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white pl-9 pr-3 text-xs text-[#344054] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
              Type
            </span>

            {["All", ...FINANCE_TRANSACTION_TYPES].map(
              (type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    handleTypeChange(
                      type as
                        | FinanceTransactionType
                        | "All",
                    )
                  }
                  className={[
                    "h-8 rounded-lg px-3 text-[11px] font-medium transition",
                    typeFilter === type
                      ? "bg-[#172033] text-white"
                      : "border border-[#D0D5DD] bg-white text-[#475467] hover:bg-[#F9FAFB]",
                  ].join(" ")}
                >
                  {type}
                </button>
              ),
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
              Category
            </span>

            <button
              type="button"
              onClick={() =>
                handleCategoryChange("All")
              }
              className={[
                "h-8 rounded-lg px-3 text-[11px] font-medium transition",
                categoryFilter === "All"
                  ? "bg-[#1677FF] text-white"
                  : "border border-[#D0D5DD] bg-white text-[#475467] hover:bg-[#F9FAFB]",
              ].join(" ")}
            >
              All
            </button>

            {FINANCE_CATEGORIES.map(
              (category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    handleCategoryChange(
                      category,
                    )
                  }
                  className={[
                    "h-8 rounded-lg px-3 text-[11px] font-medium transition",
                    categoryFilter ===
                    category
                      ? "bg-[#1677FF] text-white"
                      : "border border-[#D0D5DD] bg-white text-[#475467] hover:bg-[#F9FAFB]",
                  ].join(" ")}
                >
                  {category}
                </button>
              ),
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
              Status
            </span>

            {["All", ...FINANCE_STATUSES].map(
              (status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() =>
                    handleStatusChange(
                      status as
                        | FinanceStatus
                        | "All",
                    )
                  }
                  className={[
                    "h-8 rounded-lg px-3 text-[11px] font-medium transition",
                    statusFilter === status
                      ? "bg-[#172033] text-white"
                      : "border border-[#D0D5DD] bg-white text-[#475467] hover:bg-[#F9FAFB]",
                  ].join(" ")}
                >
                  {status}
                </button>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          TABLE
          ===================================================== */}

      <section>
        {paginatedTransactions.length > 0 ? (
          <>
            <FinanceTable
              transactions={
                paginatedTransactions
              }
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              onTransactionClick={
                setSelectedTransaction
              }
            />

            <FinancePagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              totalItems={
                sortedTransactions.length
              }
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <FinanceEmptyState
              title={
                search ||
                typeFilter !== "All" ||
                categoryFilter !== "All" ||
                statusFilter !== "All"
                  ? "No matching transactions"
                  : "No financial transactions"
              }
              description={
                search ||
                typeFilter !== "All" ||
                categoryFilter !== "All" ||
                statusFilter !== "All"
                  ? "Try changing your search or filters."
                  : "There are currently no financial transactions."
              }
              actionLabel="New Transaction"
              onAction={() =>
                setIsCreateOpen(true)
              }
            />
          </div>
        )}
      </section>

      {/* =====================================================
          DETAILS
          ===================================================== */}

      {selectedTransaction && (
        <section className="relative">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
                Selected Transaction
              </p>

              <p className="mt-0.5 text-xs text-[#667085]">
                Financial transaction details
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setSelectedTransaction(null)
              }
              className="text-xs font-medium text-[#667085] transition hover:text-[#172033]"
            >
              Close
            </button>
          </div>

          <FinanceDetails
            transaction={selectedTransaction}
          />

          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setEditingTransaction(
                  selectedTransaction,
                );
                setSelectedTransaction(null);
              }}
              className="h-9 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white transition hover:bg-[#1264D8]"
            >
              Edit Transaction
            </button>

            <button
              type="button"
              onClick={() =>
                handleDelete(
                  selectedTransaction.id,
                )
              }
              className="h-9 rounded-lg border border-[#FECDCA] bg-white px-4 text-xs font-semibold text-[#B42318] transition hover:bg-[#FEF3F2]"
            >
              Delete Transaction
            </button>
          </div>
        </section>
      )}

      {/* =====================================================
          CREATE
          ===================================================== */}

      <CreateFinanceEntryModal
        isOpen={isCreateOpen}
        onClose={() =>
          setIsCreateOpen(false)
        }
        onCreate={handleCreate}
      />

      {/* =====================================================
          EDIT
          ===================================================== */}

      <EditFinanceEntryModal
        isOpen={
          editingTransaction !== null
        }
        transaction={editingTransaction}
        onClose={() =>
          setEditingTransaction(null)
        }
        onSave={handleUpdate}
      />
    </div>
  );
}

export default Finance;