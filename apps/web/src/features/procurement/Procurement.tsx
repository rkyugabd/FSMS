import {
  CheckCircle2,
  ClipboardList,
  Package,
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Truck,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  procurementData,
  type ProcurementStatus,
  type PurchaseOrder,
} from "./procurementData";

import {
  ProcurementTable,
  type ProcurementSortDirection,
  type ProcurementSortField,
} from "./components/ProcurementTable";

import { ProcurementDetails } from "./components/ProcurementDetails";

import { CreatePurchaseOrderModal } from "./components/CreatePurchaseOrderModal";

import { EditPurchaseOrderModal } from "./components/EditPurchaseOrderModal";

import { ProcurementPagination } from "./components/ProcurementPagination";

import { ProcurementEmptyState } from "./components/ProcurementEmptyState";

const PAGE_SIZE = 8;

export function Procurement() {
  const [purchaseOrders, setPurchaseOrders] =
    useState<PurchaseOrder[]>(
      procurementData,
    );

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<
      ProcurementStatus | "All"
    >("All");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const [
    sortField,
    setSortField,
  ] =
    useState<ProcurementSortField>(
      "orderDate",
    );

  const [
    sortDirection,
    setSortDirection,
  ] =
    useState<ProcurementSortDirection>(
      "desc",
    );

  const [
    selectedPurchaseOrder,
    setSelectedPurchaseOrder,
  ] =
    useState<PurchaseOrder | null>(
      null,
    );

  const [
    editingPurchaseOrder,
    setEditingPurchaseOrder,
  ] =
    useState<PurchaseOrder | null>(
      null,
    );

  const [
    isCreateOpen,
    setIsCreateOpen,
  ] = useState(false);

  /*
   * =========================================================
   * FILTER
   * =========================================================
   */

  const filteredPurchaseOrders =
    useMemo(() => {
      const query = search
        .trim()
        .toLowerCase();

      return purchaseOrders.filter(
        (purchaseOrder) => {
          const matchesSearch =
            query.length === 0 ||
            [
              purchaseOrder.poNumber,
              purchaseOrder.id,
              purchaseOrder.vendor,
              purchaseOrder.category,
              purchaseOrder.priority,
              purchaseOrder.status,
              purchaseOrder.requester,
              purchaseOrder.department,
              purchaseOrder.aircraft,
              purchaseOrder.maintenanceReference,
              ...purchaseOrder.items.map(
                (item) =>
                  `${item.description} ${item.partNumber ?? ""}`,
              ),
            ]
              .join(" ")
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            statusFilter ===
              "All" ||
            purchaseOrder.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        },
      );
    }, [
      purchaseOrders,
      search,
      statusFilter,
    ]);

  /*
   * =========================================================
   * SORT
   * =========================================================
   */

  const sortedPurchaseOrders =
    useMemo(() => {
      const result = [
        ...filteredPurchaseOrders,
      ];

      result.sort((a, b) => {
        let aValue:
          | string
          | number = "";

        let bValue:
          | string
          | number = "";

        switch (sortField) {
          case "poNumber":
            aValue = a.poNumber;
            bValue = b.poNumber;
            break;

          case "orderDate":
            aValue = a.orderDate;
            bValue = b.orderDate;
            break;

          case "vendor":
            aValue = a.vendor;
            bValue = b.vendor;
            break;

          case "category":
            aValue = a.category;
            bValue = b.category;
            break;

          case "total":
            aValue = a.total;
            bValue = b.total;
            break;

          case "expectedDelivery":
            aValue =
              a.expectedDelivery ??
              "";
            bValue =
              b.expectedDelivery ??
              "";
            break;

          case "status":
            aValue = a.status;
            bValue = b.status;
            break;
        }

        if (
          typeof aValue ===
            "number" &&
          typeof bValue ===
            "number"
        ) {
          return sortDirection ===
            "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        const comparison =
          String(
            aValue,
          ).localeCompare(
            String(bValue),
            undefined,
            {
              numeric: true,
              sensitivity: "base",
            },
          );

        return sortDirection ===
          "asc"
          ? comparison
          : -comparison;
      });

      return result;
    }, [
      filteredPurchaseOrders,
      sortField,
      sortDirection,
    ]);

  /*
   * =========================================================
   * PAGINATION
   * =========================================================
   */

  const totalPages = Math.max(
    1,
    Math.ceil(
      sortedPurchaseOrders.length /
        PAGE_SIZE,
    ),
  );

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages,
    );

  const paginatedPurchaseOrders =
    useMemo(() => {
      const start =
        (safeCurrentPage - 1) *
        PAGE_SIZE;

      return sortedPurchaseOrders.slice(
        start,
        start + PAGE_SIZE,
      );
    }, [
      sortedPurchaseOrders,
      safeCurrentPage,
    ]);

  /*
   * =========================================================
   * STATUS COUNTS
   * =========================================================
   */

  const statusCounts = useMemo(() => {
    const totalSpend =
      purchaseOrders.reduce(
        (sum, purchaseOrder) =>
          sum +
          purchaseOrder.total,
        0,
      );

    return {
      total: purchaseOrders.length,

      pendingApproval:
        purchaseOrders.filter(
          (purchaseOrder) =>
            purchaseOrder.status ===
            "Pending Approval",
        ).length,

      ordered:
        purchaseOrders.filter(
          (purchaseOrder) =>
            purchaseOrder.status ===
            "Ordered",
        ).length,

      received:
        purchaseOrders.filter(
          (purchaseOrder) =>
            purchaseOrder.status ===
              "Received" ||
            purchaseOrder.status ===
              "Partially Received",
        ).length,

      totalSpend,
    };
  }, [purchaseOrders]);

  /*
   * =========================================================
   * HANDLERS
   * =========================================================
   */

  const handleSearchChange = (
    value: string,
  ) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (
    value:
      | ProcurementStatus
      | "All",
  ) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSort = (
    field: ProcurementSortField,
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
    setPurchaseOrders([
      ...procurementData,
    ]);

    setSearch("");
    setStatusFilter("All");
    setCurrentPage(1);
    setSortField("orderDate");
    setSortDirection("desc");

    setSelectedPurchaseOrder(
      null,
    );

    setEditingPurchaseOrder(
      null,
    );
  };

  const handleCreatePurchaseOrder = (
    purchaseOrder: PurchaseOrder,
  ) => {
    setPurchaseOrders(
      (previous) => [
        purchaseOrder,
        ...previous,
      ],
    );

    setIsCreateOpen(false);
    setCurrentPage(1);
  };

  const handleUpdatePurchaseOrder = (
    updatedPurchaseOrder: PurchaseOrder,
  ) => {
    setPurchaseOrders(
      (previous) =>
        previous.map(
          (purchaseOrder) =>
            purchaseOrder.id ===
            updatedPurchaseOrder.id
              ? updatedPurchaseOrder
              : purchaseOrder,
        ),
    );

    setEditingPurchaseOrder(
      null,
    );

    if (
      selectedPurchaseOrder?.id ===
      updatedPurchaseOrder.id
    ) {
      setSelectedPurchaseOrder(
        updatedPurchaseOrder,
      );
    }
  };

  const handleDeletePurchaseOrder = (
    purchaseOrderId: string,
  ) => {
    setPurchaseOrders(
      (previous) =>
        previous.filter(
          (purchaseOrder) =>
            purchaseOrder.id !==
            purchaseOrderId,
        ),
    );

    setSelectedPurchaseOrder(
      null,
    );
  };

  const formatCurrency = (
    value: number,
  ) => {
    return new Intl.NumberFormat(
      "en-CA",
      {
        style: "currency",
        currency: "CAD",
        minimumFractionDigits: 0,
      },
    ).format(value);
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="space-y-5 text-[#172033]">
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2FF]">
              <Package className="h-4 w-4 text-[#1677FF]" />
            </div>

            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#344054]">
              Procurement
            </span>
          </div>

          <h1 className="text-[25px] font-semibold tracking-tight text-[#172033]">
            Procurement
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-[#475467]">
            Manage purchase orders,
            suppliers, aircraft parts,
            maintenance supplies and
            procurement spending.
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
            <Plus className="h-4 w-4 text-white" />

            <span className="text-white">
              New Purchase Order
            </span>
          </button>
        </div>
      </section>

      {/* =====================================================
          SUMMARY
          ===================================================== */}

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <button
          type="button"
          onClick={() =>
            handleStatusChange("All")
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                Purchase Orders
              </p>

              <p className="mt-2 text-2xl font-semibold tracking-tight text-[#172033]">
                {statusCounts.total}
              </p>

              <p className="mt-1 text-[11px] text-[#667085]">
                Total procurement orders
              </p>
            </div>

            <ClipboardList className="h-4 w-4 text-[#98A2B3]" />
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            handleStatusChange(
              "Pending Approval",
            )
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                Pending Approval
              </p>

              <p className="mt-2 text-2xl font-semibold tracking-tight text-[#B54708]">
                {
                  statusCounts.pendingApproval
                }
              </p>

              <p className="mt-1 text-[11px] text-[#667085]">
                Requires approval
              </p>
            </div>

            <ClipboardList className="h-4 w-4 text-[#F79009]" />
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            handleStatusChange(
              "Ordered",
            )
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                Ordered
              </p>

              <p className="mt-2 text-2xl font-semibold tracking-tight text-[#6941C6]">
                {statusCounts.ordered}
              </p>

              <p className="mt-1 text-[11px] text-[#667085]">
                Awaiting delivery
              </p>
            </div>

            <Truck className="h-4 w-4 text-[#7F56D9]" />
          </div>
        </button>

        <div className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                Total Spend
              </p>

              <p className="mt-2 text-2xl font-semibold tracking-tight text-[#087443]">
                {formatCurrency(
                  statusCounts.totalSpend,
                )}
              </p>

              <p className="mt-1 text-[11px] text-[#667085]">
                Current purchase orders
              </p>
            </div>

            <CheckCircle2 className="h-4 w-4 text-[#12B76A]" />
          </div>
        </div>
      </section>

      {/* =====================================================
          SEARCH / FILTER
          ===================================================== */}

      <section className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative min-w-0 flex-1 lg:max-w-md">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A2B3]" />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                handleSearchChange(
                  event.target.value,
                )
              }
              placeholder="Search PO, vendor, aircraft, item..."
              className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white pl-9 pr-3 text-xs text-[#344054] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
              Status
            </span>

            {[
              "All",
              "Draft",
              "Pending Approval",
              "Approved",
              "Ordered",
              "Partially Received",
              "Received",
              "Cancelled",
            ].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() =>
                  handleStatusChange(
                    status as
                      | ProcurementStatus
                      | "All",
                  )
                }
                className={[
                  "h-8 rounded-lg px-3 text-[11px] font-medium transition",
                  statusFilter ===
                  status
                    ? "bg-[#172033] text-white"
                    : "border border-[#D0D5DD] bg-white text-[#475467] hover:bg-[#F9FAFB]",
                ].join(" ")}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TABLE
          ===================================================== */}

      <section>
        {paginatedPurchaseOrders.length >
        0 ? (
          <>
            <ProcurementTable
              purchaseOrders={
                paginatedPurchaseOrders
              }
              sortField={sortField}
              sortDirection={
                sortDirection
              }
              onSort={handleSort}
              onPurchaseOrderClick={
                setSelectedPurchaseOrder
              }
            />

            <ProcurementPagination
              currentPage={
                safeCurrentPage
              }
              totalPages={
                totalPages
              }
              totalItems={
                sortedPurchaseOrders.length
              }
              pageSize={
                PAGE_SIZE
              }
              onPageChange={
                setCurrentPage
              }
            />
          </>
        ) : (
          <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <ProcurementEmptyState
              title={
                search ||
                statusFilter !==
                  "All"
                  ? "No matching purchase orders"
                  : "No purchase orders found"
              }
              description={
                search ||
                statusFilter !==
                  "All"
                  ? "Try changing your search or status filter."
                  : "There are currently no purchase orders in the procurement schedule."
              }
              actionLabel="New Purchase Order"
              onAction={() =>
                setIsCreateOpen(
                  true,
                )
              }
            />
          </div>
        )}
      </section>

      {/* =====================================================
          DETAILS
          ===================================================== */}

      {selectedPurchaseOrder && (
        <section className="relative">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
                Selected Purchase Order
              </p>

              <p className="mt-0.5 text-xs text-[#667085]">
                Procurement details
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setSelectedPurchaseOrder(
                  null,
                )
              }
              className="text-xs font-medium text-[#667085] transition hover:text-[#172033]"
            >
              Close
            </button>
          </div>

          <ProcurementDetails
            purchaseOrder={
              selectedPurchaseOrder
            }
          />

          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setEditingPurchaseOrder(
                  selectedPurchaseOrder,
                );

                setSelectedPurchaseOrder(
                  null,
                );
              }}
              className="h-9 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white transition hover:bg-[#1264D8]"
            >
              Edit Purchase Order
            </button>

            <button
              type="button"
              onClick={() =>
                handleDeletePurchaseOrder(
                  selectedPurchaseOrder.id,
                )
              }
              className="h-9 rounded-lg border border-[#FECDCA] bg-white px-4 text-xs font-semibold text-[#B42318] transition hover:bg-[#FEF3F2]"
            >
              Delete Purchase Order
            </button>
          </div>
        </section>
      )}

      {/* =====================================================
          CREATE
          ===================================================== */}

      {isCreateOpen && (
        <CreatePurchaseOrderModal
          isOpen={isCreateOpen}
          onClose={() =>
            setIsCreateOpen(
              false,
            )
          }
          onCreate={
            handleCreatePurchaseOrder
          }
        />
      )}

      {/* =====================================================
          EDIT
          ===================================================== */}

      {editingPurchaseOrder && (
        <EditPurchaseOrderModal
          isOpen={
            editingPurchaseOrder !==
            null
          }
          purchaseOrder={
            editingPurchaseOrder
          }
          onClose={() =>
            setEditingPurchaseOrder(
              null,
            )
          }
          onSave={
            handleUpdatePurchaseOrder
          }
        />
      )}
    </div>
  );
}

export default Procurement;