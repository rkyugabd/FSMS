export type ScheduleStatus =
  | "Scheduled"
  | "Confirmed"
  | "In Flight"
  | "Completed"
  | "Delayed"
  | "Conflict";

export type ScheduleType =
  | "Flight"
  | "Simulator";

export type ScheduleEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  type: ScheduleType;
  status: ScheduleStatus;
  aircraft?: string;
  instructor?: string;
  student?: string;
  trainingType: string;
};

export const scheduleEvents: ScheduleEvent[] = [
  {
    id: "SCH-001",
    title: "ITPS-241 · Michael Chen",
    start: "2026-08-18T07:30:00",
    end: "2026-08-18T09:00:00",
    type: "Flight",
    status: "Completed",
    aircraft: "C-GITP",
    instructor: "David Wilson",
    student: "Michael Chen",
    trainingType: "PPL Training",
  },
  {
    id: "SCH-002",
    title: "ITPS-242 · Sarah Johnson",
    start: "2026-08-18T08:15:00",
    end: "2026-08-18T10:00:00",
    type: "Flight",
    status: "In Flight",
    aircraft: "C-GITS",
    instructor: "Emily Brown",
    student: "Sarah Johnson",
    trainingType: "IFR Training",
  },
  {
    id: "SCH-003",
    title: "ITPS-243 · Daniel Lee",
    start: "2026-08-18T09:00:00",
    end: "2026-08-18T10:30:00",
    type: "Flight",
    status: "Confirmed",
    aircraft: "C-GITR",
    instructor: "Robert Smith",
    student: "Daniel Lee",
    trainingType: "PPL Training",
  },
  {
    id: "SCH-004",
    title: "SIM-102 · Anna Rossi",
    start: "2026-08-18T09:30:00",
    end: "2026-08-18T11:00:00",
    type: "Simulator",
    status: "Confirmed",
    instructor: "Emily Brown",
    student: "Anna Rossi",
    trainingType: "IFR Simulator",
  },
  {
    id: "SCH-005",
    title: "ITPS-244 · Anna Rossi",
    start: "2026-08-18T10:30:00",
    end: "2026-08-18T12:00:00",
    type: "Flight",
    status: "Scheduled",
    aircraft: "C-GITQ",
    instructor: "David Wilson",
    student: "Anna Rossi",
    trainingType: "Navigation",
  },
  {
    id: "SCH-006",
    title: "ITPS-245 · James Martin",
    start: "2026-08-18T11:15:00",
    end: "2026-08-18T12:45:00",
    type: "Flight",
    status: "Scheduled",
    aircraft: "C-GITP",
    instructor: "Robert Smith",
    student: "James Martin",
    trainingType: "Solo Flight",
  },
  {
    id: "SCH-007",
    title: "SIM-103 · Olivia Garcia",
    start: "2026-08-18T13:00:00",
    end: "2026-08-18T14:30:00",
    type: "Simulator",
    status: "Scheduled",
    instructor: "Emily Brown",
    student: "Olivia Garcia",
    trainingType: "MCC",
  },
  {
    id: "SCH-008",
    title: "ITPS-246 · Olivia Garcia",
    start: "2026-08-18T14:00:00",
    end: "2026-08-18T15:30:00",
    type: "Flight",
    status: "Scheduled",
    aircraft: "C-GITS",
    instructor: "David Wilson",
    student: "Olivia Garcia",
    trainingType: "IFR Training",
  },
  {
    id: "SCH-009",
    title: "ITPS-247 · Noah Williams",
    start: "2026-08-18T14:30:00",
    end: "2026-08-18T16:00:00",
    type: "Flight",
    status: "Delayed",
    aircraft: "C-GITR",
    instructor: "Robert Smith",
    student: "Noah Williams",
    trainingType: "PPL Training",
  },
  {
    id: "SCH-010",
    title: "SIM-104 · James Martin",
    start: "2026-08-18T16:30:00",
    end: "2026-08-18T18:00:00",
    type: "Simulator",
    status: "Scheduled",
    instructor: "Emily Brown",
    student: "James Martin",
    trainingType: "MCC",
  },
];

export const aircraftOptions = [
  "All Aircraft",
  "C-GITP",
  "C-GITS",
  "C-GITR",
  "C-GITQ",
];

export const instructorOptions = [
  "All Instructors",
  "David Wilson",
  "Emily Brown",
  "Robert Smith",
];

export const trainingOptions = [
  "All Training",
  "PPL Training",
  "IFR Training",
  "IFR Simulator",
  "Navigation",
  "Solo Flight",
  "MCC",
];

export const schedulingAlerts = [
  {
    id: "CON-001",
    title: "Instructor conflict detected",
    detail:
      "Emily Brown has overlapping simulator sessions at 09:30 and 09:45.",
    severity: "danger",
  },
  {
    id: "CON-002",
    title: "Aircraft turnaround warning",
    detail:
      "C-GITS has only 15 minutes between two scheduled operations.",
    severity: "warning",
  },
];