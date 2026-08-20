export type ReportStatus =
  | "Ready"
  | "Generating"
  | "Scheduled"
  | "Failed"
  | "Archived";

export type ReportFormat =
  | "PDF"
  | "Excel"
  | "CSV";

export type ReportCategory =
  | "Flight Operations"
  | "Training"
  | "Students"
  | "Aircraft"
  | "Maintenance"
  | "Employees"
  | "Time Tracking"
  | "Procurement"
  | "Finance"
  | "Analytics"
  | "Custom";

export type Report = {
  id: string;
  reportNumber: string;
  name: string;
  category: ReportCategory;
  description: string;
  periodStart: string;
  periodEnd: string;
  generatedBy: string;
  createdAt: string;
  updatedAt: string;
  format: ReportFormat;
  status: ReportStatus;
  records: number;
  fileSize: string;
  scheduled: boolean;
  schedule?: string;
  recipients: number;
  includeCharts: boolean;
  includeSummary: boolean;
  includeDetailedData: boolean;
};

export const reportData: Report[] = [
  {
    id: "RPT-001",
    reportNumber: "RPT-2026-001",
    name: "Monthly Flight Operations Report",
    category: "Flight Operations",
    description:
      "Monthly operational summary covering flight activity, aircraft utilization, instructors, students and flight status.",
    periodStart: "2026-08-01",
    periodEnd: "2026-08-18",
    generatedBy: "Admin",
    createdAt: "2026-08-18",
    updatedAt: "2026-08-18",
    format: "PDF",
    status: "Ready",
    records: 148,
    fileSize: "2.4 MB",
    scheduled: true,
    schedule: "Monthly",
    recipients: 5,
    includeCharts: true,
    includeSummary: true,
    includeDetailedData: true,
  },
  {
    id: "RPT-002",
    reportNumber: "RPT-2026-002",
    name: "Student Training Progress",
    category: "Training",
    description:
      "Training progress report covering student flight hours, completed lessons, performance and outstanding training requirements.",
    periodStart: "2026-08-01",
    periodEnd: "2026-08-18",
    generatedBy: "Sarah Johnson",
    createdAt: "2026-08-17",
    updatedAt: "2026-08-17",
    format: "Excel",
    status: "Ready",
    records: 62,
    fileSize: "1.8 MB",
    scheduled: false,
    recipients: 3,
    includeCharts: true,
    includeSummary: true,
    includeDetailedData: true,
  },
  {
    id: "RPT-003",
    reportNumber: "RPT-2026-003",
    name: "Aircraft Utilization Report",
    category: "Aircraft",
    description:
      "Aircraft utilization report showing flight hours, availability, utilization rate and operational activity by aircraft.",
    periodStart: "2026-08-01",
    periodEnd: "2026-08-18",
    generatedBy: "Operations Manager",
    createdAt: "2026-08-16",
    updatedAt: "2026-08-16",
    format: "PDF",
    status: "Ready",
    records: 27,
    fileSize: "1.2 MB",
    scheduled: true,
    schedule: "Weekly",
    recipients: 4,
    includeCharts: true,
    includeSummary: true,
    includeDetailedData: false,
  },
  {
    id: "RPT-004",
    reportNumber: "RPT-2026-004",
    name: "Maintenance Cost Report",
    category: "Maintenance",
    description:
      "Maintenance cost and activity report covering inspections, repairs, parts and maintenance expenditure.",
    periodStart: "2026-08-01",
    periodEnd: "2026-08-18",
    generatedBy: "Finance Manager",
    createdAt: "2026-08-15",
    updatedAt: "2026-08-15",
    format: "Excel",
    status: "Ready",
    records: 94,
    fileSize: "2.1 MB",
    scheduled: false,
    recipients: 2,
    includeCharts: true,
    includeSummary: true,
    includeDetailedData: true,
  },
  {
    id: "RPT-005",
    reportNumber: "RPT-2026-005",
    name: "Employee Hours Summary",
    category: "Time Tracking",
    description:
      "Employee working hours, overtime, leave and attendance summary for the selected reporting period.",
    periodStart: "2026-08-01",
    periodEnd: "2026-08-18",
    generatedBy: "HR Manager",
    createdAt: "2026-08-14",
    updatedAt: "2026-08-14",
    format: "CSV",
    status: "Ready",
    records: 186,
    fileSize: "640 KB",
    scheduled: true,
    schedule: "Monthly",
    recipients: 3,
    includeCharts: false,
    includeSummary: true,
    includeDetailedData: true,
  },
  {
    id: "RPT-006",
    reportNumber: "RPT-2026-006",
    name: "Procurement Spend Analysis",
    category: "Procurement",
    description:
      "Purchase order and supplier spending report including committed spend, completed orders and purchasing activity.",
    periodStart: "2026-08-01",
    periodEnd: "2026-08-18",
    generatedBy: "Procurement Manager",
    createdAt: "2026-08-13",
    updatedAt: "2026-08-13",
    format: "PDF",
    status: "Ready",
    records: 73,
    fileSize: "1.6 MB",
    scheduled: false,
    recipients: 4,
    includeCharts: true,
    includeSummary: true,
    includeDetailedData: true,
  },
  {
    id: "RPT-2026-007",
    reportNumber: "RPT-2026-007",
    name: "Finance Monthly Summary",
    category: "Finance",
    description:
      "Financial summary covering revenue, expenses, outstanding balances and major financial activity.",
    periodStart: "2026-08-01",
    periodEnd: "2026-08-18",
    generatedBy: "Finance Manager",
    createdAt: "2026-08-12",
    updatedAt: "2026-08-12",
    format: "Excel",
    status: "Ready",
    records: 128,
    fileSize: "2.8 MB",
    scheduled: true,
    schedule: "Monthly",
    recipients: 6,
    includeCharts: true,
    includeSummary: true,
    includeDetailedData: true,
  },
  {
    id: "RPT-2026-008",
    reportNumber: "RPT-2026-008",
    name: "Student Enrollment Report",
    category: "Students",
    description:
      "Student enrollment and status report including active students, completed students and enrollment trends.",
    periodStart: "2026-08-01",
    periodEnd: "2026-08-18",
    generatedBy: "Admin",
    createdAt: "2026-08-11",
    updatedAt: "2026-08-11",
    format: "PDF",
    status: "Generating",
    records: 84,
    fileSize: "—",
    scheduled: false,
    recipients: 2,
    includeCharts: true,
    includeSummary: true,
    includeDetailedData: false,
  },
  {
    id: "RPT-2026-009",
    reportNumber: "RPT-2026-009",
    name: "Management Operations Dashboard",
    category: "Analytics",
    description:
      "Executive-level operational report combining KPIs from flights, training, aircraft, maintenance and finance.",
    periodStart: "2026-08-01",
    periodEnd: "2026-08-18",
    generatedBy: "Admin",
    createdAt: "2026-08-10",
    updatedAt: "2026-08-10",
    format: "PDF",
    status: "Scheduled",
    records: 412,
    fileSize: "—",
    scheduled: true,
    schedule: "Weekly",
    recipients: 8,
    includeCharts: true,
    includeSummary: true,
    includeDetailedData: false,
  },
  {
    id: "RPT-2026-010",
    reportNumber: "RPT-2026-010",
    name: "Aircraft Maintenance Compliance",
    category: "Maintenance",
    description:
      "Compliance report covering scheduled inspections, maintenance due dates and outstanding maintenance actions.",
    periodStart: "2026-07-01",
    periodEnd: "2026-07-31",
    generatedBy: "Maintenance Manager",
    createdAt: "2026-08-05",
    updatedAt: "2026-08-05",
    format: "PDF",
    status: "Archived",
    records: 51,
    fileSize: "1.4 MB",
    scheduled: false,
    recipients: 3,
    includeCharts: false,
    includeSummary: true,
    includeDetailedData: true,
  },
  {
    id: "RPT-2026-011",
    reportNumber: "RPT-2026-011",
    name: "Employee Directory Export",
    category: "Employees",
    description:
      "Employee directory export containing active employee information and organizational details.",
    periodStart: "2026-08-01",
    periodEnd: "2026-08-18",
    generatedBy: "HR Manager",
    createdAt: "2026-08-04",
    updatedAt: "2026-08-04",
    format: "CSV",
    status: "Ready",
    records: 47,
    fileSize: "420 KB",
    scheduled: false,
    recipients: 1,
    includeCharts: false,
    includeSummary: false,
    includeDetailedData: true,
  },
  {
    id: "RPT-2026-012",
    reportNumber: "RPT-2026-012",
    name: "Flight Training Performance",
    category: "Training",
    description:
      "Training performance analysis covering lesson completion, flight hours and student progress indicators.",
    periodStart: "2026-07-01",
    periodEnd: "2026-07-31",
    generatedBy: "Chief Flight Instructor",
    createdAt: "2026-08-02",
    updatedAt: "2026-08-02",
    format: "PDF",
    status: "Failed",
    records: 96,
    fileSize: "—",
    scheduled: false,
    recipients: 4,
    includeCharts: true,
    includeSummary: true,
    includeDetailedData: true,
  },
];

export const reportCategories: ReportCategory[] = [
  "Flight Operations",
  "Training",
  "Students",
  "Aircraft",
  "Maintenance",
  "Employees",
  "Time Tracking",
  "Procurement",
  "Finance",
  "Analytics",
  "Custom",
];

export const reportStatuses: ReportStatus[] = [
  "Ready",
  "Generating",
  "Scheduled",
  "Failed",
  "Archived",
];

export const reportFormats: ReportFormat[] = [
  "PDF",
  "Excel",
  "CSV",
];