export type TimeEntryStatus =
  | "Clocked In"
  | "Clocked Out"
  | "On Break"
  | "Pending"
  | "Approved"
  | "Rejected";

export type TimeEntryType =
  | "Regular"
  | "Overtime"
  | "Training"
  | "Meeting"
  | "Leave"
  | "Other";

export type TimeEntry = {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  role: string;

  date: string;

  clockIn: string;
  clockOut: string;

  breakMinutes: number;
  totalHours: number;

  entryType: TimeEntryType;
  status: TimeEntryStatus;

  location: string;

  notes?: string;
};

export const timeTrackingData: TimeEntry[] = [
  {
    id: "TT-1001",
    employeeId: "EMP-1001",
    employeeName: "Michael Chen",
    department: "Flight Operations",
    role: "Flight Instructor",
    date: "2026-08-18",
    clockIn: "07:30",
    clockOut: "16:00",
    breakMinutes: 30,
    totalHours: 8,
    entryType: "Regular",
    status: "Clocked Out",
    location: "London Campus",
    notes: "Regular instructor shift.",
  },

  {
    id: "TT-1002",
    employeeId: "EMP-1002",
    employeeName: "Sarah Williams",
    department: "Training",
    role: "Training Coordinator",
    date: "2026-08-18",
    clockIn: "08:00",
    clockOut: "16:30",
    breakMinutes: 30,
    totalHours: 8,
    entryType: "Regular",
    status: "Approved",
    location: "London Campus",
    notes: "Student training administration.",
  },

  {
    id: "TT-1003",
    employeeId: "EMP-1003",
    employeeName: "Daniel Brown",
    department: "Maintenance",
    role: "Aircraft Maintenance Technician",
    date: "2026-08-18",
    clockIn: "06:45",
    clockOut: "15:15",
    breakMinutes: 30,
    totalHours: 8,
    entryType: "Regular",
    status: "Approved",
    location: "Maintenance Hangar",
    notes: "Aircraft inspection and maintenance.",
  },

  {
    id: "TT-1004",
    employeeId: "EMP-1004",
    employeeName: "Emily Johnson",
    department: "Administration",
    role: "Office Administrator",
    date: "2026-08-18",
    clockIn: "09:00",
    clockOut: "17:00",
    breakMinutes: 30,
    totalHours: 7.5,
    entryType: "Regular",
    status: "Clocked Out",
    location: "London Campus",
  },

  {
    id: "TT-1005",
    employeeId: "EMP-1005",
    employeeName: "James Wilson",
    department: "Flight Operations",
    role: "Senior Flight Instructor",
    date: "2026-08-18",
    clockIn: "07:00",
    clockOut: "17:30",
    breakMinutes: 30,
    totalHours: 10,
    entryType: "Overtime",
    status: "Pending",
    location: "London Campus",
    notes: "Additional flight training sessions.",
  },

  {
    id: "TT-1006",
    employeeId: "EMP-1006",
    employeeName: "Olivia Martin",
    department: "Student Services",
    role: "Student Coordinator",
    date: "2026-08-18",
    clockIn: "08:30",
    clockOut: "17:00",
    breakMinutes: 30,
    totalHours: 8,
    entryType: "Regular",
    status: "Approved",
    location: "London Campus",
  },

  {
    id: "TT-1007",
    employeeId: "EMP-1007",
    employeeName: "Noah Anderson",
    department: "Maintenance",
    role: "Maintenance Supervisor",
    date: "2026-08-17",
    clockIn: "07:00",
    clockOut: "18:00",
    breakMinutes: 45,
    totalHours: 10.25,
    entryType: "Overtime",
    status: "Pending",
    location: "Maintenance Hangar",
    notes: "Weekend aircraft maintenance.",
  },

  {
    id: "TT-1008",
    employeeId: "EMP-1008",
    employeeName: "Sophia Taylor",
    department: "Finance",
    role: "Finance Analyst",
    date: "2026-08-17",
    clockIn: "08:30",
    clockOut: "16:30",
    breakMinutes: 30,
    totalHours: 7.5,
    entryType: "Regular",
    status: "Approved",
    location: "London Campus",
  },

  {
    id: "TT-1009",
    employeeId: "EMP-1009",
    employeeName: "Liam Thomas",
    department: "Flight Operations",
    role: "Flight Instructor",
    date: "2026-08-17",
    clockIn: "08:00",
    clockOut: "12:00",
    breakMinutes: 0,
    totalHours: 4,
    entryType: "Training",
    status: "Approved",
    location: "London Campus",
    notes: "Instructor development training.",
  },

  {
    id: "TT-1010",
    employeeId: "EMP-1010",
    employeeName: "Ava Jackson",
    department: "Administration",
    role: "HR Coordinator",
    date: "2026-08-17",
    clockIn: "09:00",
    clockOut: "17:00",
    breakMinutes: 30,
    totalHours: 7.5,
    entryType: "Regular",
    status: "Clocked Out",
    location: "London Campus",
  },

  {
    id: "TT-1011",
    employeeId: "EMP-1011",
    employeeName: "William White",
    department: "Flight Operations",
    role: "Operations Manager",
    date: "2026-08-16",
    clockIn: "07:30",
    clockOut: "18:00",
    breakMinutes: 45,
    totalHours: 9.75,
    entryType: "Overtime",
    status: "Pending",
    location: "London Campus",
    notes: "Operational planning and weekend coverage.",
  },

  {
    id: "TT-1012",
    employeeId: "EMP-1012",
    employeeName: "Mia Harris",
    department: "Student Services",
    role: "Student Support Specialist",
    date: "2026-08-16",
    clockIn: "08:30",
    clockOut: "16:30",
    breakMinutes: 30,
    totalHours: 7.5,
    entryType: "Regular",
    status: "Approved",
    location: "London Campus",
  },

  {
    id: "TT-1013",
    employeeId: "EMP-1013",
    employeeName: "Ethan Clark",
    department: "Maintenance",
    role: "Aircraft Maintenance Technician",
    date: "2026-08-16",
    clockIn: "06:30",
    clockOut: "15:00",
    breakMinutes: 30,
    totalHours: 8,
    entryType: "Regular",
    status: "Clocked Out",
    location: "Maintenance Hangar",
  },

  {
    id: "TT-1014",
    employeeId: "EMP-1014",
    employeeName: "Isabella Lewis",
    department: "Training",
    role: "Chief Flight Instructor",
    date: "2026-08-15",
    clockIn: "07:00",
    clockOut: "17:00",
    breakMinutes: 45,
    totalHours: 9.25,
    entryType: "Regular",
    status: "Approved",
    location: "London Campus",
  },

  {
    id: "TT-1015",
    employeeId: "EMP-1015",
    employeeName: "Benjamin Walker",
    department: "Flight Operations",
    role: "Flight Instructor",
    date: "2026-08-15",
    clockIn: "08:00",
    clockOut: "16:30",
    breakMinutes: 30,
    totalHours: 8,
    entryType: "Regular",
    status: "Approved",
    location: "London Campus",
  },

  {
    id: "TT-1016",
    employeeId: "EMP-1016",
    employeeName: "Charlotte Hall",
    department: "Administration",
    role: "Reception Coordinator",
    date: "2026-08-15",
    clockIn: "09:00",
    clockOut: "17:00",
    breakMinutes: 30,
    totalHours: 7.5,
    entryType: "Regular",
    status: "Rejected",
    location: "London Campus",
    notes: "Missing supporting information.",
  },
];

export default timeTrackingData;