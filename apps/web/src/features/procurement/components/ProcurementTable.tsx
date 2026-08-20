import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CalendarDays,
  MoreHorizontal,
  Package,
} from "lucide-react";

import type {
  ProcurementStatus,
  PurchaseOrder,
} from "../procurementData";

export type ProcurementSortField =
  | "poNumber"
  | "orderDate"
  | "vendor"
  | "category"
  | "total"
  | "expectedDelivery"
  | "status";

export type ProcurementSortDirection =
  | "asc"
  | "desc";

type ProcurementTableProps = {
  purchaseOrders: PurchaseOrder[];
  sortField: ProcurementSortField;
  sortDirection: ProcurementSortDirection;
  onSort: (
    field: ProcurementSortField,
  ) => void;
  onPurchaseOrderClick: (
    purchaseOrder: PurchaseOrder,
  ) => void;
};

const STATUS_STYLES: Record<
  ProcurementStatus,
  {
    background: string;
    text: string;
    dot: string;
  }
> = {
  Draft: {
    background: "bg-[#F2F4F7]",
    text: "text-[#475467]",
    dot: "bg-[#98A2B3]",
  },

  "Pending Approval": {
    background: "bg-[#FFFAEB]",
    text: "text-[#B54708]",
    dot: "bg-[#F79009]",
  },

  Approved: {
    background: "bg-[#EAF2FF]",
    text: "text-[#1355B5]",
    dot: "bg-[#1677FF]",
  },

  Ordered: {
    background: "bg-[#F2EDFF]",
    text: "text-[#6941C6]",
    dot: "bg-[#7F56D9]",
  },

  "Partially Received": {
    background: "bg-[#FFF4E5]",
    text: "text-[#B54708]",
    dot: "bg-[#F79009]",
  },

  Received: {
    background: "bg-[#E8F8F1]",
    text: "text-[#087443]",
    dot: "bg-[#12B76A]",
  },

  Cancelled: {
    background: "bg-[#FEF3F2]",
    text: "text-[#B42318]",
    dot: "bg-[#F04438]",
  },
};

function SortIcon({
  field,
  activeField,
  direction,
}: {
  field: ProcurementSortField;
  activeField: ProcurementSortField;
  direction: ProcurementSortDirection;
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
  field: ProcurementSortField;
  activeField: ProcurementSortField;
  direction: ProcurementSortDirection;
  onSort: (
    field: ProcurementSortField,
  ) => void;
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

function formatDate(
  value?: string,
) {
  if (!value) {
    return "—";
  }

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

function formatCurrency(
  value: number,
) {
  return new Intl.NumberFormat(
    "en-CA",
    {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 2,
    },
  ).format(value);
}

export function ProcurementTable({
  purchaseOrders,
  sortField,
  sortDirection,
  onSort,
  onPurchaseOrderClick,
}: ProcurementTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-[#172033]">
            Purchase Orders
          </h3>

          <p className="mt-0.5 text-[11px] text-[#667085]">
            {purchaseOrders.length}{" "}
            {purchaseOrders.length === 1
              ? "order"
              : "orders"}{" "}
            displayed
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-[#98A2B3]">
          <span className="h-2 w-2 rounded-full bg-[#1677FF]" />
          Procurement operations
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1200px] w-full border-collapse">
          <thead className="border-b border-[#E4E7EC] bg-[#F9FAFB]">
            <tr>
              <TableHeader
                field="poNumber"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Purchase Order
              </TableHeader>

              <TableHeader
                field="orderDate"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Date
              </TableHeader>

              <TableHeader
                field="vendor"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Vendor
              </TableHeader>

              <TableHeader
                field="category"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Category
              </TableHeader>

              <th className="whitespace-nowrap px-4 py-3 text-left">
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                  Requester
                </span>
              </th>

              <TableHeader
                field="total"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Total
              </TableHeader>

              <TableHeader
                field="expectedDelivery"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Delivery
              </TableHeader>

              <TableHeader
                field="status"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Status
              </TableHeader>

              <th className="w-12 px-4 py-3">
                <span className="sr-only">
                  Actions
                </span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E4E7EC]">
            {purchaseOrders.length ===
            0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="px-6 py-16 text-center"
                >
                  <div className="mx-auto flex max-w-sm flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2F4F7]">
                      <Package className="h-4 w-4 text-[#98A2B3]" />
                    </div>

                    <h4 className="mt-3 text-sm font-semibold text-[#344054]">
                      No purchase orders found
                    </h4>

                    <p className="mt-1 text-xs text-[#667085]">
                      Try changing your
                      filters or search
                      criteria.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              purchaseOrders.map(
                (purchaseOrder) => {
                  const statusStyle =
                    STATUS_STYLES[
                      purchaseOrder.status
                    ];

                  return (
                    <tr
                      key={
                        purchaseOrder.id
                      }
                      onClick={() =>
                        onPurchaseOrderClick(
                          purchaseOrder,
                        )
                      }
                      className="group cursor-pointer bg-white transition hover:bg-[#F9FAFB]"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF2FF]">
                            <Package className="h-3.5 w-3.5 text-[#1677FF]" />
                          </div>

                          <div className="min-w-0">
                            <div className="truncate text-xs font-semibold text-[#172033]">
                              {
                                purchaseOrder.poNumber
                              }
                            </div>

                            <div className="mt-0.5 truncate text-[10px] text-[#98A2B3]">
                              {
                                purchaseOrder.id
                              }
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="text-xs font-medium text-[#344054]">
                          {formatDate(
                            purchaseOrder.orderDate,
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="max-w-[180px] truncate text-xs font-semibold text-[#344054]">
                          {
                            purchaseOrder.vendor
                          }
                        </div>

                        <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                          {
                            purchaseOrder.department
                          }
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <span className="inline-flex whitespace-nowrap rounded-md bg-[#F2F4F7] px-2 py-1 text-[10px] font-medium text-[#475467]">
                          {
                            purchaseOrder.category
                          }
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="text-xs font-medium text-[#344054]">
                          {
                            purchaseOrder.requester
                          }
                        </div>

                        {purchaseOrder.aircraft && (
                          <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                            Aircraft:{" "}
                            {
                              purchaseOrder.aircraft
                            }
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <div className="text-xs font-semibold text-[#172033]">
                          {formatCurrency(
                            purchaseOrder.total,
                          )}
                        </div>

                        <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                          {
                            purchaseOrder.items
                              .length
                          }{" "}
                          {purchaseOrder.items
                            .length === 1
                            ? "item"
                            : "items"}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5 text-[#98A2B3]" />

                          <span className="text-xs font-medium text-[#344054]">
                            {formatDate(
                              purchaseOrder.expectedDelivery,
                            )}
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

                          {
                            purchaseOrder.status
                          }
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={(
                            event,
                          ) => {
                            event.stopPropagation();

                            onPurchaseOrderClick(
                              purchaseOrder,
                            );
                          }}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-[#98A2B3] opacity-0 transition hover:bg-[#F2F4F7] hover:text-[#344054] group-hover:opacity-100"
                          aria-label={`Open ${purchaseOrder.poNumber}`}
                          title={`Open ${purchaseOrder.poNumber}`}
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
            {purchaseOrders.length}
          </span>{" "}
          purchase order
          {purchaseOrders.length === 1
            ? ""
            : "s"}
        </p>

        <p className="text-[10px] text-[#98A2B3]">
          Select a purchase order to view
          procurement details.
        </p>
      </div>
    </div>
  );
}

export default ProcurementTable;