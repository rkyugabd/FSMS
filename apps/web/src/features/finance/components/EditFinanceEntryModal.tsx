import {
  DollarSign,
  FileText,
  Save,
  X,
} from "lucide-react";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  FINANCE_CATEGORIES,
  FINANCE_STATUSES,
  FINANCE_TRANSACTION_TYPES,
  PAYMENT_METHODS,
  type FinanceCategory,
  type FinanceStatus,
  type FinanceTransaction,
  type FinanceTransactionType,
  type PaymentMethod,
} from "../financeData";

type EditFinanceEntryModalProps = {
  isOpen: boolean;
  transaction: FinanceTransaction | null;
  onClose: () => void;
  onSave: (
    transaction: FinanceTransaction,
  ) => void;
};

type FinanceFormData = {
  transactionNumber: string;
  date: string;
  type: FinanceTransactionType;
  category: FinanceCategory;
  description: string;
  amount: string;
  tax: string;
  paymentMethod: PaymentMethod;
  status: FinanceStatus;
  student: string;
  aircraft: string;
  flight: string;
  invoice: string;
  notes: string;
};

function createFormData(
  transaction: FinanceTransaction,
): FinanceFormData {
  return {
    transactionNumber:
      transaction.transactionNumber,
    date: transaction.date,
    type: transaction.type,
    category: transaction.category,
    description:
      transaction.description,
    amount: String(
      transaction.amount,
    ),
    tax: String(transaction.tax),
    paymentMethod:
      transaction.paymentMethod,
    status: transaction.status,
    student:
      transaction.student ?? "",
    aircraft:
      transaction.aircraft ?? "",
    flight:
      transaction.flight ?? "",
    invoice:
      transaction.invoice ?? "",
    notes:
      transaction.notes ?? "",
  };
}

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
        min={type === "number" ? "0" : undefined}
        step={
          type === "number"
            ? "0.01"
            : undefined
        }
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
  options: readonly string[];
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
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export function EditFinanceEntryModal({
  isOpen,
  transaction,
  onClose,
  onSave,
}: EditFinanceEntryModalProps) {
  const [form, setForm] =
    useState<FinanceFormData | null>(
      null,
    );

  useEffect(() => {
    if (isOpen && transaction) {
      setForm(
        createFormData(transaction),
      );
    }
  }, [isOpen, transaction]);

  if (!isOpen || !transaction || !form) {
    return null;
  }

  const updateField = (
    field: keyof FinanceFormData,
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

    const amount =
      Number(form.amount) || 0;

    const tax =
      Number(form.tax) || 0;

    const updatedTransaction: FinanceTransaction =
      {
        ...transaction,

        transactionNumber:
          form.transactionNumber.trim(),

        date: form.date,

        type: form.type,

        category: form.category,

        description:
          form.description.trim(),

        amount,

        tax,

        total: amount + tax,

        paymentMethod:
          form.paymentMethod,

        status: form.status,

        student:
          form.student.trim() ||
          undefined,

        aircraft:
          form.aircraft.trim() ||
          undefined,

        flight:
          form.flight.trim() ||
          undefined,

        invoice:
          form.invoice.trim() ||
          undefined,

        notes:
          form.notes.trim() ||
          undefined,
      };

    onSave(updatedTransaction);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#101828]/40 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-finance-title"
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
              <DollarSign className="h-4 w-4 text-[#1677FF]" />
            </div>

            <div>
              <h2
                id="edit-finance-title"
                className="text-base font-semibold text-[#172033]"
              >
                Edit Financial Transaction
              </h2>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                Update transaction and payment
                information
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#172033]"
            aria-label="Close edit finance modal"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <form
          id="edit-finance-form"
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Transaction Information
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field
                label="Transaction Number"
                value={
                  form.transactionNumber
                }
                onChange={(value) =>
                  updateField(
                    "transactionNumber",
                    value,
                  )
                }
              />

              <Field
                label="Date"
                type="date"
                value={form.date}
                onChange={(value) =>
                  updateField(
                    "date",
                    value,
                  )
                }
              />

              <SelectField
                label="Type"
                value={form.type}
                onChange={(value) =>
                  updateField(
                    "type",
                    value,
                  )
                }
                options={
                  FINANCE_TRANSACTION_TYPES
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
                options={
                  FINANCE_CATEGORIES
                }
              />

              <SelectField
                label="Payment Method"
                value={
                  form.paymentMethod
                }
                onChange={(value) =>
                  updateField(
                    "paymentMethod",
                    value,
                  )
                }
                options={PAYMENT_METHODS}
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
                options={FINANCE_STATUSES}
              />
            </div>
          </section>

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Financial Amount
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field
                label="Amount"
                type="number"
                value={form.amount}
                onChange={(value) =>
                  updateField(
                    "amount",
                    value,
                  )
                }
              />

              <Field
                label="Tax"
                type="number"
                value={form.tax}
                onChange={(value) =>
                  updateField(
                    "tax",
                    value,
                  )
                }
              />

              <div>
                <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
                  Total
                </label>

                <div className="flex h-9 items-center rounded-lg border border-[#E4E7EC] bg-[#F9FAFB] px-3 text-xs font-semibold text-[#1355B5]">
                  $
                  {(
                    (Number(form.amount) ||
                      0) +
                    (Number(form.tax) ||
                      0)
                  ).toFixed(2)}
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-[#E4E7EC] px-5 py-5">
            <div className="mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#667085]" />

              <h3 className="text-xs font-semibold text-[#172033]">
                Description & Related Records
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="sm:col-span-2 lg:col-span-3">
                <Field
                  label="Description"
                  value={
                    form.description
                  }
                  onChange={(value) =>
                    updateField(
                      "description",
                      value,
                    )
                  }
                />
              </div>

              <Field
                label="Student"
                value={form.student}
                onChange={(value) =>
                  updateField(
                    "student",
                    value,
                  )
                }
              />

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
                label="Flight"
                value={form.flight}
                onChange={(value) =>
                  updateField(
                    "flight",
                    value,
                  )
                }
              />

              <Field
                label="Invoice"
                value={form.invoice}
                onChange={(value) =>
                  updateField(
                    "invoice",
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
              rows={4}
              placeholder="Add financial notes..."
              className="w-full resize-none rounded-lg border border-[#D0D5DD] bg-white px-3 py-2.5 text-xs leading-5 text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
            />
          </section>
        </form>

        <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-[#E4E7EC] bg-[#F9FAFB] px-5 py-3">
          <p className="hidden text-[10px] text-[#98A2B3] sm:block">
            Transaction ID: {transaction.id}
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
              form="edit-finance-form"
              className="flex h-9 items-center gap-1.5 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1264D8]"
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

export default EditFinanceEntryModal;