export type SettingsSection =
  | "profile"
  | "organization"
  | "flight-school"
  | "users"
  | "roles"
  | "notifications"
  | "integrations"
  | "preferences"
  | "security";

export type UserStatus =
  | "Active"
  | "Inactive"
  | "Suspended";

export type UserRole =
  | "Administrator"
  | "Operations Manager"
  | "Chief Instructor"
  | "Instructor"
  | "Dispatcher"
  | "Finance"
  | "HR";

export type IntegrationStatus =
  | "Connected"
  | "Not Connected"
  | "Coming Soon";

export type NotificationChannel =
  | "Email"
  | "In-App"
  | "SMS";

export type SettingsProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  employeeId: string;
  language: string;
};

export type OrganizationSettings = {
  organizationName: string;
  organizationId: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  email: string;
  website: string;
};

export type FlightSchoolSettings = {
  schoolName: string;
  primaryAirport: string;
  primaryAirportName: string;
  timezone: string;
  operatingHours: string;
  currency: string;
  defaultFlightDuration: string;
  defaultPageSize: number;
};

export type SettingsUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  status: UserStatus;
  lastLogin: string;
};

export type PermissionKey =
  | "dashboard"
  | "scheduling"
  | "flights"
  | "simulators"
  | "students"
  | "training"
  | "aircraft"
  | "maintenance"
  | "employees"
  | "timeTracking"
  | "procurement"
  | "finance"
  | "analytics"
  | "reports"
  | "settings";

export type RolePermission = {
  role: UserRole;
  permissions: Record<PermissionKey, boolean>;
};

export type NotificationSettings = {
  flightDelayed: boolean;
  maintenanceDue: boolean;
  studentTrainingAlert: boolean;
  documentExpiration: boolean;
  procurementApproval: boolean;
  financeApproval: boolean;
  dailyOperationsSummary: boolean;
  weeklyManagementReport: boolean;
  channels: NotificationChannel[];
};

export type Integration = {
  id: string;
  name: string;
  description: string;
  category: string;
  status: IntegrationStatus;
  provider: string;
};

export type PreferenceSettings = {
  dateFormat: string;
  timeFormat: string;
  currency: string;
  timezone: string;
  defaultPageSize: number;
  defaultLandingPage: string;
  compactTables: boolean;
};

export type SecuritySettings = {
  twoFactorAuthentication: boolean;
  sessionTimeout: number;
  passwordExpiration: number;
  loginNotifications: boolean;
  apiAccess: boolean;
};

export const profileData: SettingsProfile = {
  firstName: "Alex",
  lastName: "Morgan",
  email: "alex.morgan@itps.ca",
  phone: "(519) 555-0142",
  jobTitle: "Operations Manager",
  employeeId: "EMP-00124",
  language: "English",
};

export const organizationData: OrganizationSettings = {
  organizationName: "ITPS Flight School",
  organizationId: "ITPS-001",
  address: "2460 Aviation Way",
  city: "London",
  province: "Ontario",
  postalCode: "N5V 3A8",
  phone: "(519) 555-0100",
  email: "operations@itps.ca",
  website: "www.itps.ca",
};

export const flightSchoolData: FlightSchoolSettings = {
  schoolName: "ITPS Flight School",
  primaryAirport: "CYXU",
  primaryAirportName: "London International Airport",
  timezone: "America/Toronto",
  operatingHours: "06:00 - 22:00",
  currency: "CAD",
  defaultFlightDuration: "01:30",
  defaultPageSize: 25,
};

export const settingsUsers: SettingsUser[] = [
  {
    id: "USR-001",
    name: "Alex Morgan",
    email: "alex.morgan@itps.ca",
    role: "Administrator",
    department: "Operations",
    status: "Active",
    lastLogin: "Today, 08:42",
  },
  {
    id: "USR-002",
    name: "Sarah Thompson",
    email: "sarah.thompson@itps.ca",
    role: "Chief Instructor",
    department: "Training",
    status: "Active",
    lastLogin: "Today, 09:15",
  },
  {
    id: "USR-003",
    name: "Michael Chen",
    email: "michael.chen@itps.ca",
    role: "Instructor",
    department: "Training",
    status: "Active",
    lastLogin: "Today, 07:58",
  },
  {
    id: "USR-004",
    name: "David Wilson",
    email: "david.wilson@itps.ca",
    role: "Dispatcher",
    department: "Operations",
    status: "Active",
    lastLogin: "Yesterday, 18:34",
  },
  {
    id: "USR-005",
    name: "Emma Johnson",
    email: "emma.johnson@itps.ca",
    role: "Finance",
    department: "Finance",
    status: "Active",
    lastLogin: "Yesterday, 16:21",
  },
  {
    id: "USR-006",
    name: "Robert Brown",
    email: "robert.brown@itps.ca",
    role: "Instructor",
    department: "Training",
    status: "Inactive",
    lastLogin: "Aug 12, 2026",
  },
];

const allPermissions: Record<
  PermissionKey,
  boolean
> = {
  dashboard: true,
  scheduling: true,
  flights: true,
  simulators: true,
  students: true,
  training: true,
  aircraft: true,
  maintenance: true,
  employees: true,
  timeTracking: true,
  procurement: true,
  finance: true,
  analytics: true,
  reports: true,
  settings: true,
};

export const rolePermissions: RolePermission[] = [
  {
    role: "Administrator",
    permissions: {
      ...allPermissions,
    },
  },
  {
    role: "Operations Manager",
    permissions: {
      ...allPermissions,
      finance: false,
      settings: false,
    },
  },
  {
    role: "Chief Instructor",
    permissions: {
      ...allPermissions,
      procurement: false,
      finance: false,
      settings: false,
    },
  },
  {
    role: "Instructor",
    permissions: {
      dashboard: true,
      scheduling: true,
      flights: true,
      simulators: true,
      students: true,
      training: true,
      aircraft: true,
      maintenance: true,
      employees: false,
      timeTracking: true,
      procurement: false,
      finance: false,
      analytics: true,
      reports: true,
      settings: false,
    },
  },
  {
    role: "Dispatcher",
    permissions: {
      dashboard: true,
      scheduling: true,
      flights: true,
      simulators: true,
      students: true,
      training: false,
      aircraft: true,
      maintenance: true,
      employees: false,
      timeTracking: true,
      procurement: false,
      finance: false,
      analytics: true,
      reports: true,
      settings: false,
    },
  },
  {
    role: "Finance",
    permissions: {
      dashboard: true,
      scheduling: false,
      flights: false,
      simulators: false,
      students: false,
      training: false,
      aircraft: false,
      maintenance: false,
      employees: false,
      timeTracking: true,
      procurement: true,
      finance: true,
      analytics: true,
      reports: true,
      settings: false,
    },
  },
  {
    role: "HR",
    permissions: {
      dashboard: true,
      scheduling: false,
      flights: false,
      simulators: false,
      students: false,
      training: false,
      aircraft: false,
      maintenance: false,
      employees: true,
      timeTracking: true,
      procurement: false,
      finance: false,
      analytics: true,
      reports: true,
      settings: false,
    },
  },
];

export const notificationData: NotificationSettings = {
  flightDelayed: true,
  maintenanceDue: true,
  studentTrainingAlert: true,
  documentExpiration: true,
  procurementApproval: true,
  financeApproval: true,
  dailyOperationsSummary: true,
  weeklyManagementReport: true,
  channels: ["Email", "In-App"],
};

export const integrationData: Integration[] = [
  {
    id: "INT-001",
    name: "Google Gemini",
    description:
      "AI-powered analysis and operational assistant capabilities.",
    category: "Artificial Intelligence",
    status: "Connected",
    provider: "Google",
  },
  {
    id: "INT-002",
    name: "OpenAI",
    description:
      "AI services for the FSMS AI Copilot and intelligent workflows.",
    category: "Artificial Intelligence",
    status: "Connected",
    provider: "OpenAI",
  },
  {
    id: "INT-003",
    name: "Email Service",
    description:
      "System email delivery for notifications and reports.",
    category: "Communication",
    status: "Connected",
    provider: "System",
  },
  {
    id: "INT-004",
    name: "Accounting System",
    description:
      "Synchronize financial transactions and accounting records.",
    category: "Finance",
    status: "Not Connected",
    provider: "External",
  },
  {
    id: "INT-005",
    name: "ERP",
    description:
      "Connect inventory, procurement and operational data.",
    category: "Enterprise",
    status: "Not Connected",
    provider: "External",
  },
  {
    id: "INT-006",
    name: "Payment Provider",
    description:
      "Process student and customer payments.",
    category: "Payments",
    status: "Coming Soon",
    provider: "External",
  },
];

export const preferenceData: PreferenceSettings = {
  dateFormat: "YYYY-MM-DD",
  timeFormat: "24 Hour",
  currency: "CAD",
  timezone: "America/Toronto",
  defaultPageSize: 25,
  defaultLandingPage: "Dashboard",
  compactTables: false,
};

export const securityData: SecuritySettings = {
  twoFactorAuthentication: true,
  sessionTimeout: 30,
  passwordExpiration: 90,
  loginNotifications: true,
  apiAccess: true,
};

export const settingsSections: Array<{
  id: SettingsSection;
  label: string;
  description: string;
}> = [
  {
    id: "profile",
    label: "Profile",
    description: "Manage your personal information",
  },
  {
    id: "organization",
    label: "Organization",
    description: "Organization information",
  },
  {
    id: "flight-school",
    label: "Flight School",
    description: "School operational configuration",
  },
  {
    id: "users",
    label: "Users",
    description: "Manage system users",
  },
  {
    id: "roles",
    label: "Roles & Permissions",
    description: "Manage access control",
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Configure system alerts",
  },
  {
    id: "integrations",
    label: "Integrations",
    description: "External system connections",
  },
  {
    id: "preferences",
    label: "Preferences",
    description: "System display preferences",
  },
  {
    id: "security",
    label: "Security",
    description: "Security and access settings",
  },
];

export const permissionLabels: Record<
  PermissionKey,
  string
> = {
  dashboard: "Dashboard",
  scheduling: "Scheduling",
  flights: "Flights",
  simulators: "Simulators",
  students: "Students",
  training: "Training",
  aircraft: "Aircraft",
  maintenance: "Maintenance",
  employees: "Employees",
  timeTracking: "Time Tracking",
  procurement: "Procurement",
  finance: "Finance",
  analytics: "BI & Analytics",
  reports: "Reports",
  settings: "Settings",
};