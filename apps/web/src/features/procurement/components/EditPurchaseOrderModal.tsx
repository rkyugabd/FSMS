import {
  CalendarDays,
  Package,
  Save,
  Truck,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import type {
  ProcurementCategory,
  ProcurementPriority,
  ProcurementStatus,
  PurchaseOrder,
} from "../procurementData";

type EditPurchaseOrderModalProps = {
  isOpen: boolean;
  purchaseOrder: PurchaseOrder | null;
  onClose: () => void;
  onSave: (
    purchaseOrder: PurchaseOrder,
  ) => void;
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
  receivedDate: string;
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
        {label}
      </label>

      <input
        type={type}
        value={value}
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

function createFormData(
  purchaseOrder: PurchaseOrder,
): FormData {
  return {
    vendor:
      purchaseOrder.vendor,
    vendorContact:
      purchaseOrder.vendorContact ??
      "",
    category:
      purchaseOrder.category,
    priority:
      purchaseOrder.priority,
    status:
      purchaseOrder.status,
    requester:
      purchaseOrder.requester,
    department:
      purchaseOrder.department,
    aircraft:
      purchaseOrder.aircraft ?? "",
    maintenanceReference:
      purchaseOrder.maintenanceReference ??
      "",
    orderDate:
      purchaseOrder.orderDate,
    expectedDelivery:
      purchaseOrder.expectedDelivery ??
      "",
    receivedDate:
      purchaseOrder.receivedDate ??
      "",
    notes:
      purchaseOrder.notes ?? "",
  };
}

export function EditPurchaseOrderModal({
  isOpen,
  purchaseOrder,
  onClose,
  onSave,
}: EditPurchaseOrderModalProps) {
  const [form, setForm] =
    useState<FormData | null>(null);

  useEffect(() => {
    if (
      isOpen &&
      purchaseOrder
    ) {
      setForm(
        createFormData(
          purchaseOrder,
        ),
      );
    }
  }, [
    isOpen,
    purchaseOrder,
  ]);

  if (
    !isOpen ||
    !purchaseOrder ||
    !form
  ) {
    return null;
  }

  const updateField = (
    field: keyof FormData,
    value: string,
  ) => {
    setForm((previous) =>
      previous
        ? {
            ...previous,
            [field]: value,
          }
        : previous,
    );
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const updatedPurchaseOrder: PurchaseOrder =
      {
        ...purchaseOrder,

        vendor:
          form.vendor.trim(),

        vendorContact:
          form.vendorContact.trim() ||
          undefined,

        category:
          form.category,

        priority:
          form.priority,

        status:
          form.status,

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

        orderDate:
          form.orderDate,

        expectedDelivery:
          form.expectedDelivery ||
          undefined,

        receivedDate:
          form.receivedDate ||
          undefined,

        notes:
          form.notes.trim() ||
          undefined,
      };

    onSave(
      updatedPurchaseOrder,
    );
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#101828]/40 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-purchase-order-title"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white shadow-[0_20px_50px_rgba(16,24,40,0.18)]">
        <header className="flex shrink-0 items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF2FF]">
              <Package className="h-4 w-4 text-[#1677FF]" />
            </div>

            <div>
              <h2
                id="edit-purchase-order-title"
                className="text-base font-semibold text-[#172033]"
              >
                Edit Purchase Order
              </h2>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                {purchaseOrder.poNumber}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#172033]"
            aria-label="Close edit purchase order modal"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <form
          id="edit-purchase-order-form"
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

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field
                label="Aircraft"
                value={form.aircraft}
                onChange={(value) =>
                  updateField(
                    "aircraft",
                    value,
                  )
                }
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
              />

              <Field
                label="Received Date"
                type="date"
                value={
                  form.receivedDate
                }
                onChange={(value) =>
                  updateField(
                    "receivedDate",
                    value,
                  )
                }
              />
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
              rows={5}
              placeholder="Add procurement notes..."
              className="w-full resize-none rounded-lg border border-[#D0D5DD] bg-white px-3 py-2.5 text-xs leading-5 text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
            />
          </section>
        </form>

        <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-[#E4E7EC] bg-[#F9FAFB] px-5 py-3">
          <p className="hidden text-[10px] text-[#98A2B3] sm:block">
            PO ID:{" "}
            {purchaseOrder.id}
          </p>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-9 rounded-lg border border-[#D0D5DD] bg-white px-4 text-xs font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="edit-purchase-order-form"
              className="flex h-9 items-center gap-1.5 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1264D8] active:scale-[0.98]"
            >
              <Save className="h-3.5 w-3.5" />

              Save Changes
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default EditPurchaseOrderModal;