import {
  CalendarDays,
  FileText,
  Package,
  Truck,
  UserRound,
  X,
} from "lucide-react";

import type {
  PurchaseOrder,
} from "../procurementData";

type ProcurementDetailsProps = {
  purchaseOrder: PurchaseOrder;
  onClose?: () => void;
};

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

export function ProcurementDetails({
  purchaseOrder,
  onClose,
}: ProcurementDetailsProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF2FF]">
            <Package className="h-4 w-4 text-[#1677FF]" />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
              Purchase Order
            </p>

            <h2 className="mt-0.5 text-base font-semibold text-[#172033]">
              {purchaseOrder.poNumber}
            </h2>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#172033]"
            aria-label="Close procurement details"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-[#E4E7EC] bg-[#FCFCFD] p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Status
          </p>

          <p className="mt-1 text-xs font-semibold text-[#172033]">
            {purchaseOrder.status}
          </p>
        </div>

        <div className="rounded-lg border border-[#E4E7EC] bg-[#FCFCFD] p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Priority
          </p>

          <p className="mt-1 text-xs font-semibold text-[#172033]">
            {purchaseOrder.priority}
          </p>
        </div>

        <div className="rounded-lg border border-[#E4E7EC] bg-[#FCFCFD] p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Order Date
          </p>

          <p className="mt-1 text-xs font-semibold text-[#172033]">
            {formatDate(
              purchaseOrder.orderDate,
            )}
          </p>
        </div>

        <div className="rounded-lg border border-[#E4E7EC] bg-[#FCFCFD] p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Total
          </p>

          <p className="mt-1 text-xs font-semibold text-[#1677FF]">
            {formatCurrency(
              purchaseOrder.total,
            )}
          </p>
        </div>
      </div>

      <div className="grid gap-5 border-t border-[#E4E7EC] p-5 lg:grid-cols-2">
        <section>
          <div className="mb-3 flex items-center gap-2">
            <Truck className="h-4 w-4 text-[#667085]" />

            <h3 className="text-xs font-semibold text-[#172033]">
              Vendor Information
            </h3>
          </div>

          <div className="rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] p-4">
            <p className="text-xs font-semibold text-[#344054]">
              {purchaseOrder.vendor}
            </p>

            {purchaseOrder.vendorContact && (
              <p className="mt-1 text-[11px] text-[#667085]">
                {purchaseOrder.vendorContact}
              </p>
            )}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center gap-2">
            <UserRound className="h-4 w-4 text-[#667085]" />

            <h3 className="text-xs font-semibold text-[#172033]">
              Request Information
            </h3>
          </div>

          <div className="rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-[10px] text-[#98A2B3]">
                  Requester
                </p>

                <p className="mt-0.5 text-xs font-medium text-[#344054]">
                  {
                    purchaseOrder.requester
                  }
                </p>
              </div>

              <div>
                <p className="text-[10px] text-[#98A2B3]">
                  Department
                </p>

                <p className="mt-0.5 text-xs font-medium text-[#344054]">
                  {
                    purchaseOrder.department
                  }
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="border-t border-[#E4E7EC] px-5 py-5">
        <div className="mb-3 flex items-center gap-2">
          <Package className="h-4 w-4 text-[#667085]" />

          <h3 className="text-xs font-semibold text-[#172033]">
            Line Items
          </h3>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#E4E7EC]">
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full">
              <thead className="bg-[#F9FAFB]">
                <tr className="border-b border-[#E4E7EC]">
                  <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                    Item
                  </th>

                  <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                    Part Number
                  </th>

                  <th className="px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                    Qty
                  </th>

                  <th className="px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                    Unit Price
                  </th>

                  <th className="px-4 py-2.5 text-right text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E4E7EC]">
                {purchaseOrder.items.map(
                  (item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3 text-xs font-medium text-[#344054]">
                        {
                          item.description
                        }
                      </td>

                      <td className="px-4 py-3 text-[11px] text-[#667085]">
                        {item.partNumber ??
                          "—"}
                      </td>

                      <td className="px-4 py-3 text-right text-xs text-[#344054]">
                        {item.quantity}
                      </td>

                      <td className="px-4 py-3 text-right text-xs text-[#344054]">
                        {formatCurrency(
                          item.unitPrice,
                        )}
                      </td>

                      <td className="px-4 py-3 text-right text-xs font-semibold text-[#172033]">
                        {formatCurrency(
                          item.total,
                        )}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="grid gap-5 border-t border-[#E4E7EC] p-5 lg:grid-cols-2">
        <section>
          <div className="mb-3 flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-[#667085]" />

            <h3 className="text-xs font-semibold text-[#172033]">
              Delivery Information
            </h3>
          </div>

          <div className="rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-[10px] text-[#98A2B3]">
                  Expected Delivery
                </p>

                <p className="mt-0.5 text-xs font-medium text-[#344054]">
                  {formatDate(
                    purchaseOrder.expectedDelivery,
                  )}
                </p>
              </div>

              <div>
                <p className="text-[10px] text-[#98A2B3]">
                  Received Date
                </p>

                <p className="mt-0.5 text-xs font-medium text-[#344054]">
                  {formatDate(
                    purchaseOrder.receivedDate,
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#667085]" />

            <h3 className="text-xs font-semibold text-[#172033]">
              References
            </h3>
          </div>

          <div className="rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-[10px] text-[#98A2B3]">
                  Aircraft
                </p>

                <p className="mt-0.5 text-xs font-medium text-[#344054]">
                  {purchaseOrder.aircraft ??
                    "Not assigned"}
                </p>
              </div>

              <div>
                <p className="text-[10px] text-[#98A2B3]">
                  Maintenance Reference
                </p>

                <p className="mt-0.5 text-xs font-medium text-[#344054]">
                  {purchaseOrder.maintenanceReference ??
                    "Not assigned"}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="border-t border-[#E4E7EC] p-5">
        <div className="ml-auto max-w-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#667085]">
            <span>Subtotal</span>

            <span>
              {formatCurrency(
                purchaseOrder.subtotal,
              )}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-[#667085]">
            <span>Tax</span>

            <span>
              {formatCurrency(
                purchaseOrder.tax,
              )}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-[#667085]">
            <span>Shipping</span>

            <span>
              {formatCurrency(
                purchaseOrder.shipping,
              )}
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-[#E4E7EC] pt-2 text-sm font-semibold text-[#172033]">
            <span>Total</span>

            <span>
              {formatCurrency(
                purchaseOrder.total,
              )}
            </span>
          </div>
        </div>
      </section>

      {purchaseOrder.notes && (
        <section className="border-t border-[#E4E7EC] bg-[#FCFCFD] px-5 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Notes
          </p>

          <p className="mt-1 text-xs leading-5 text-[#667085]">
            {purchaseOrder.notes}
          </p>
        </section>
      )}
    </div>
  );
}

export default ProcurementDetails;