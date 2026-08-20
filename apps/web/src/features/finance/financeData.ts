export type FinanceTransactionType =
  | "Revenue"
  | "Expense"
  | "Refund"
  | "Adjustment";

export type FinanceCategory =
  | "Flight Training"
  | "Simulator Training"
  | "Aircraft Maintenance"
  | "Fuel"
  | "Airport Fees"
  | "Instructor Payroll"
  | "Procurement"
  | "Insurance"
  | "Software"
  | "Other";

export type FinanceStatus =
  | "Paid"
  | "Pending"
  | "Overdue"
  | "Cancelled";

export type PaymentMethod =
  | "Credit Card"
  | "Debit Card"
  | "Bank Transfer"
  | "Cash"
  | "Cheque"
  | "Other";

export type FinanceTransaction = {
  id: string;
  transactionNumber: string;

  date: string;

  type: FinanceTransactionType;
  category: FinanceCategory;

  description: string;

  amount: number;
  tax: number;
  total: number;

  paymentMethod: PaymentMethod;
  status: FinanceStatus;

  student?: string;
  aircraft?: string;
  flight?: string;
  invoice?: string;

  notes?: string;
};

export const financeData: FinanceTransaction[] = [
  {
    id: "FIN-0001",
    transactionNumber: "TXN-2026-0001",
    date: "2026-08-18",
    type: "Revenue",
    category: "Flight Training",
    description: "Private Pilot flight training session",
    amount: 420,
    tax: 54.6,
    total: 474.6,
    paymentMethod: "Credit Card",
    status: "Paid",
    student: "Emma Wilson",
    aircraft: "C-GABC",
    flight: "FL-102",
    invoice: "INV-2026-0012",
    notes: "Training flight completed successfully.",
  },
  {
    id: "FIN-0002",
    transactionNumber: "TXN-2026-0002",
    date: "2026-08-18",
    type: "Revenue",
    category: "Simulator Training",
    description: "IFR simulator training session",
    amount: 285,
    tax: 37.05,
    total: 322.05,
    paymentMethod: "Debit Card",
    status: "Paid",
    student: "Liam Chen",
    invoice: "INV-2026-0013",
    notes: "Two-hour simulator session.",
  },
  {
    id: "FIN-0003",
    transactionNumber: "TXN-2026-0003",
    date: "2026-08-17",
    type: "Expense",
    category: "Fuel",
    description: "Aviation fuel purchase",
    amount: 680,
    tax: 88.4,
    total: 768.4,
    paymentMethod: "Bank Transfer",
    status: "Paid",
    aircraft: "C-GABC",
    notes: "Fuel replenishment for training fleet.",
  },
  {
    id: "FIN-0004",
    transactionNumber: "TXN-2026-0004",
    date: "2026-08-17",
    type: "Expense",
    category: "Aircraft Maintenance",
    description: "Scheduled 50-hour aircraft inspection",
    amount: 1250,
    tax: 162.5,
    total: 1412.5,
    paymentMethod: "Bank Transfer",
    status: "Pending",
    aircraft: "C-GDEF",
    notes: "Maintenance invoice awaiting payment.",
  },
  {
    id: "FIN-0005",
    transactionNumber: "TXN-2026-0005",
    date: "2026-08-16",
    type: "Revenue",
    category: "Flight Training",
    description: "Instrument rating training",
    amount: 510,
    tax: 66.3,
    total: 576.3,
    paymentMethod: "Credit Card",
    status: "Paid",
    student: "Olivia Martin",
    aircraft: "C-GDEF",
    flight: "FL-105",
    invoice: "INV-2026-0010",
  },
  {
    id: "FIN-0006",
    transactionNumber: "TXN-2026-0006",
    date: "2026-08-16",
    type: "Expense",
    category: "Airport Fees",
    description: "Airport landing and parking fees",
    amount: 340,
    tax: 44.2,
    total: 384.2,
    paymentMethod: "Credit Card",
    status: "Paid",
    aircraft: "C-GABC",
    flight: "FL-101",
  },
  {
    id: "FIN-0007",
    transactionNumber: "TXN-2026-0007",
    date: "2026-08-15",
    type: "Revenue",
    category: "Simulator Training",
    description: "Commercial pilot simulator block",
    amount: 760,
    tax: 98.8,
    total: 858.8,
    paymentMethod: "Bank Transfer",
    status: "Pending",
    student: "Noah Brown",
    invoice: "INV-2026-0008",
  },
  {
    id: "FIN-0008",
    transactionNumber: "TXN-2026-0008",
    date: "2026-08-15",
    type: "Expense",
    category: "Procurement",
    description: "Aircraft consumables and supplies",
    amount: 475,
    tax: 61.75,
    total: 536.75,
    paymentMethod: "Credit Card",
    status: "Paid",
    notes: "Operational supplies received.",
  },
  {
    id: "FIN-0009",
    transactionNumber: "TXN-2026-0009",
    date: "2026-08-14",
    type: "Expense",
    category: "Insurance",
    description: "Monthly fleet insurance allocation",
    amount: 2200,
    tax: 286,
    total: 2486,
    paymentMethod: "Bank Transfer",
    status: "Paid",
    notes: "Monthly insurance expense.",
  },
  {
    id: "FIN-0010",
    transactionNumber: "TXN-2026-0010",
    date: "2026-08-14",
    type: "Revenue",
    category: "Flight Training",
    description: "Discovery flight and introductory lesson",
    amount: 195,
    tax: 25.35,
    total: 220.35,
    paymentMethod: "Credit Card",
    status: "Paid",
    student: "Sophia Taylor",
    aircraft: "C-GGHI",
    flight: "FL-099",
  },
  {
    id: "FIN-0011",
    transactionNumber: "TXN-2026-0011",
    date: "2026-08-13",
    type: "Expense",
    category: "Instructor Payroll",
    description: "Instructor payroll allocation",
    amount: 3850,
    tax: 0,
    total: 3850,
    paymentMethod: "Bank Transfer",
    status: "Paid",
    notes: "Weekly instructor payroll.",
  },
  {
    id: "FIN-0012",
    transactionNumber: "TXN-2026-0012",
    date: "2026-08-12",
    type: "Refund",
    category: "Flight Training",
    description: "Training session refund",
    amount: 180,
    tax: 23.4,
    total: 203.4,
    paymentMethod: "Credit Card",
    status: "Paid",
    student: "James Anderson",
    invoice: "INV-2026-0005",
    notes: "Refund issued due to cancelled training session.",
  },
];

export const FINANCE_CATEGORIES: FinanceCategory[] = [
  "Flight Training",
  "Simulator Training",
  "Aircraft Maintenance",
  "Fuel",
  "Airport Fees",
  "Instructor Payroll",
  "Procurement",
  "Insurance",
  "Software",
  "Other",
];

export const FINANCE_STATUSES: FinanceStatus[] = [
  "Paid",
  "Pending",
  "Overdue",
  "Cancelled",
];

export const FINANCE_TRANSACTION_TYPES: FinanceTransactionType[] = [
  "Revenue",
  "Expense",
  "Refund",
  "Adjustment",
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  "Credit Card",
  "Debit Card",
  "Bank Transfer",
  "Cash",
  "Cheque",
  "Other",
];