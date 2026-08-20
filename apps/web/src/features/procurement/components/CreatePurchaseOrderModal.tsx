import {
  CalendarDays,
  Package,
  Plus,
  Save,
  Trash2,
  Truck,
  X,
} from "lucide-react";

import {
  useState,
  type FormEvent,
} from "react";

import type {
  ProcurementCategory,
  ProcurementPriority,
  ProcurementStatus,
  ProcurementItem,
  PurchaseOrder,
} from "../procurementData";

type CreatePurchaseOrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (
    purchaseOrder: PurchaseOrder,
  ) => void;
};

type FormItem = {
  description: string;
  partNumber: string;
  quantity: string;
  unitPrice: string;
};

type FormData = {
  vendor: string;
  vendorContact: string;
  category: ProcurementCategory;
  priority: ProcurementPriority;
  status: ProcurementStatus;
  requester: string;
  department: string;
  aircraft: string;
  maintenanceReference: string;
  orderDate: string;
  expectedDelivery: string;
  notes: string;
};

const CATEGORIES: ProcurementCategory[] = [
  "Aircraft Parts",
  "Maintenance Supplies",
  "Fuel & Lubricants",
  "Safety Equipment",
  "Simulator Parts",
  "Training Supplies",
  "Office Supplies",
];

const PRIORITIES: ProcurementPriority[] = [
  "Low",
  "Normal",
  "High",
  "Urgent",
];

const STATUSES: ProcurementStatus[] = [
  "Draft",
  "Pending Approval",
  "Approved",
  "Ordered",
  "Partially Received",
  "Received",
  "Cancelled",
];

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
        {label}

        {required && (
          <span className="ml-0.5 text-[#F04438]">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#172033] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
      >
        {options.map(
          (option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ),
        )}
      </select>
    </div>
  );
}

const emptyItem = (): FormItem => ({
  description: "",
  partNumber: "",
  quantity: "1",
  unitPrice: "",
});

export function CreatePurchaseOrderModal({
  isOpen,
  onClose,
  onCreate,
}: CreatePurchaseOrderModalProps) {
  const [form, setForm] =
    useState<FormData>({
      vendor: "",
      vendorContact: "",
      category: "Aircraft Parts",
      priority: "Normal",
      status: "Draft",
      requester: "",
      department: "Maintenance",
      aircraft: "",
      maintenanceReference: "",
      orderDate: "",
      expectedDelivery: "",
      notes: "",
    });

  const [items, setItems] =
    useState<FormItem[]>([
      emptyItem(),
    ]);

  if (!isOpen) {
    return null;
  }

  const updateField = (
    field: keyof FormData,
    value: string,
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const updateItem = (
    index: number,
    field: keyof FormItem,
    value: string,
  ) => {
    setItems((previous) =>
      previous.map(
        (item, itemIndex) =>
          itemIndex === index
            ? {
                ...item,
                [field]: value,
              }
            : item,
      ),
    );
  };

  const addItem = () => {
    setItems((previous) => [
      ...previous,
      emptyItem(),
    ]);
  };

  const removeItem = (
    index: number,
  ) => {
    setItems((previous) =>
      previous.length === 1
        ? previous
        : previous.filter(
            (_, itemIndex) =>
              itemIndex !== index,
          ),
    );
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const normalizedItems: ProcurementItem[] =
      items.map((item, index) => {
        const quantity =
          Number(item.quantity) || 0;

        const unitPrice =
          Number(item.unitPrice) || 0;

        return {
          id: `ITEM-${Date.now()}-${index}`,
          description:
            item.description.trim(),
          partNumber:
            item.partNumber.trim() ||
            undefined,
          quantity,
          unitPrice,
          total:
            quantity * unitPrice,
        };
      });

    const subtotal =
      normalizedItems.reduce(
        (sum, item) =>
          sum + item.total,
        0,
      );

    const tax = subtotal * 0.13;

    const purchaseOrder: PurchaseOrder =
      {
        id: `PO-${Date.now()}`,

        poNumber: `PO-${new Date().getFullYear()}-${String(
          Date.now(),
        ).slice(-5)}`,

        orderDate:
          form.orderDate ||
          new Date()
            .toISOString()
            .slice(0, 10),

        vendor:
          form.vendor.trim(),

        vendorContact:
          form.vendorContact.trim() ||
          undefined,

        category: form.category,
        priority: form.priority,
        status: form.status,

        requester:
          form.requester.trim(),

        department:
          form.department.trim(),

        aircraft:
          form.aircraft.trim() ||
          undefined,

        maintenanceReference:
          form.maintenanceReference.trim() ||
          undefined,

        expectedDelivery:
          form.expectedDelivery ||
          undefined,

        currency: "CAD",

        subtotal,

        tax,

        shipping: 0,

        total:
          subtotal + tax,

        items: normalizedItems,

        notes:
          form.notes.trim() ||
          undefined,
      };

    onCreate(purchaseOrder);

    setForm({
      vendor: "",
      vendorContact: "",
      category: "Aircraft Parts",
      priority: "Normal",
      status: "Draft",
      requester: "",
      department: "Maintenance",
      aircraft: "",
      maintenanceReference: "",
      orderDate: "",
      expectedDelivery: "",
      notes: "",
    });

    setItems([emptyItem()]);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#101828]/40 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-purchase-order-title"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white shadow-[0_20px_50px_rgba(16,24,40,0.18)]">
        <header className="flex shrink-0 items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF2FF]">
              <Package className="h-4 w-4 text-[#1677FF]" />
            </div>

            <div>
              <h2
                id="create-purchase-order-title"
                className="text-base font-semibold text-[#172033]"
              >
                New Purchase Order
              </h2>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                Create a procurement order
                for the flight school.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#172033]"
            aria-label="Close create purchase order modal"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <form
          id="create-purchase-order-form"
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <Truck className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Order Information
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field
                label="Vendor"
                value={form.vendor}
                onChange={(value) =>
                  updateField(
                    "vendor",
                    value,
                  )
                }
                placeholder="Supplier name"
                required
              />

              <Field
                label="Vendor Contact"
                value={
                  form.vendorContact
                }
                onChange={(value) =>
                  updateField(
                    "vendorContact",
                    value,
                  )
                }
                placeholder="Email / phone"
              />

              <SelectField
                label="Category"
                value={form.category}
                onChange={(value) =>
                  updateField(
                    "category",
                    value,
                  )
                }
                options={CATEGORIES}
              />

              <SelectField
                label="Priority"
                value={form.priority}
                onChange={(value) =>
                  updateField(
                    "priority",
                    value,
                  )
                }
                options={PRIORITIES}
              />

              <SelectField
                label="Status"
                value={form.status}
                onChange={(value) =>
                  updateField(
                    "status",
                    value,
                  )
                }
                options={STATUSES}
              />

              <Field
                label="Department"
                value={form.department}
                onChange={(value) =>
                  updateField(
                    "department",
                    value,
                  )
                }
                placeholder="Maintenance"
              />

              <Field
                label="Requester"
                value={form.requester}
                onChange={(value) =>
                  updateField(
                    "requester",
                    value,
                  )
                }
                placeholder="Employee name"
                required
              />

              <Field
                label="Order Date"
                type="date"
                value={form.orderDate}
                onChange={(value) =>
                  updateField(
                    "orderDate",
                    value,
                  )
                }
              />

              <Field
                label="Expected Delivery"
                type="date"
                value={
                  form.expectedDelivery
                }
                onChange={(value) =>
                  updateField(
                    "expectedDelivery",
                    value,
                  )
                }
              />
            </div>
          </section>

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Operational Reference
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Aircraft"
                value={form.aircraft}
                onChange={(value) =>
                  updateField(
                    "aircraft",
                    value,
                  )
                }
                placeholder="e.g. C-GABC"
              />

              <Field
                label="Maintenance Reference"
                value={
                  form.maintenanceReference
                }
                onChange={(value) =>
                  updateField(
                    "maintenanceReference",
                    value,
                  )
                }
                placeholder="e.g. MX-2026-021"
              />
            </div>
          </section>

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-[#667085]" />

                <h3 className="text-xs font-semibold text-[#172033]">
                  Line Items
                </h3>
              </div>

              <button
                type="button"
                onClick={addItem}
                className="flex h-8 items-center gap-1.5 rounded-lg border border-[#D0D5DD] bg-white px-3 text-[11px] font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
              >
                <Plus className="h-3.5 w-3.5" />

                Add Item
              </button>
            </div>

            <div className="space-y-3">
              {items.map(
                (item, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] p-4"
                  >
                    <div className="grid gap-4 lg:grid-cols-[2fr_1fr_100px_140px_auto]">
                      <Field
                        label="Description"
                        value={
                          item.description
                        }
                        onChange={(
                          value,
                        ) =>
                          updateItem(
                            index,
                            "description",
                            value,
                          )
                        }
                        placeholder="Item description"
                        required
                      />

                      <Field
                        label="Part Number"
                        value={
                          item.partNumber
                        }
                        onChange={(
                          value,
                        ) =>
                          updateItem(
                            index,
                            "partNumber",
                            value,
                          )
                        }
                        placeholder="Part #"
                      />

                      <Field
                        label="Quantity"
                        type="number"
                        value={
                          item.quantity
                        }
                        onChange={(
                          value,
                        ) =>
                          updateItem(
                            index,
                            "quantity",
                            value,
                          )
                        }
                        placeholder="1"
                        required
                      />

                      <Field
                        label="Unit Price"
                        type="number"
                        value={
                          item.unitPrice
                        }
                        onChange={(
                          value,
                        ) =>
                          updateItem(
                            index,
                            "unitPrice",
                            value,
                          )
                        }
                        placeholder="0.00"
                        required
                      />

                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() =>
                            removeItem(
                              index,
                            )
                          }
                          disabled={
                            items.length ===
                            1
                          }
                          className="mb-0 flex h-9 w-9 items-center justify-center rounded-lg text-[#98A2B3] transition hover:bg-[#FEF3F2] hover:text-[#B42318] disabled:cursor-not-allowed disabled:opacity-40"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </section>

          <section className="px-5 py-5">
            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
              Notes
            </label>

            <textarea
              value={form.notes}
              onChange={(event) =>
                updateField(
                  "notes",
                  event.target.value,
                )
              }
              rows={4}
              placeholder="Add procurement notes..."
              className="w-full resize-none rounded-lg border border-[#D0D5DD] bg-white px-3 py-2.5 text-xs leading-5 text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
            />
          </section>
        </form>

        <footer className="flex shrink-0 items-center justify-end gap-2 border-t border-[#E4E7EC] bg-[#F9FAFB] px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-lg border border-[#D0D5DD] bg-white px-4 text-xs font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="create-purchase-order-form"
            className="flex h-9 items-center gap-1.5 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1264D8] active:scale-[0.98]"
          >
            <Save className="h-3.5 w-3.5" />

            Create Purchase Order
          </button>
        </footer>
      </div>
    </div>
  );
}

export default CreatePurchaseOrderModal;