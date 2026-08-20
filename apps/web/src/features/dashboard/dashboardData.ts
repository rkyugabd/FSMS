export type FlightStatus =
  | "Scheduled"
  | "Boarding"
  | "In Flight"
  | "Completed"
  | "Delayed"
  | "Cancelled";

export type FlightRecord = {
  id: string;
  time: string;
  flightNumber: string;
  student: string;
  instructor: string;
  aircraft: string;
  type: string;
  status: FlightStatus;
};

export const dashboardKpis = {
  flightsToday: 18,
  simulatorSessions: 7,
  aircraftAvailable: 11,
  totalAircraft: 14,
  trainingHours: 42.5,
  operationalAlerts: 3,
};

export const todaysFlights: FlightRecord[] = [
  {
    id: "FLT-001",
    time: "07:30",
    flightNumber: "ITPS-241",
    student: "Michael Chen",
    instructor: "David Wilson",
    aircraft: "C-GITP",
    type: "Training Flight",
    status: "Completed",
  },
  {
    id: "FLT-002",
    time: "08:15",
    flightNumber: "ITPS-242",
    student: "Sarah Johnson",
    instructor: "Emily Brown",
    aircraft: "C-GITS",
    type: "IFR Training",
    status: "In Flight",
  },
  {
    id: "FLT-003",
    time: "09:00",
    flightNumber: "ITPS-243",
    student: "Daniel Lee",
    instructor: "Robert Smith",
    aircraft: "C-GITR",
    type: "Training Flight",
    status: "Boarding",
  },
  {
    id: "FLT-004",
    time: "10:30",
    flightNumber: "ITPS-244",
    student: "Anna Rossi",
    instructor: "David Wilson",
    aircraft: "C-GITQ",
    type: "Navigation",
    status: "Scheduled",
  },
  {
    id: "FLT-005",
    time: "11:15",
    flightNumber: "ITPS-245",
    student: "James Martin",
    instructor: "Emily Brown",
    aircraft: "C-GITP",
    type: "Solo Flight",
    status: "Scheduled",
  },
  {
    id: "FLT-006",
    time: "13:00",
    flightNumber: "ITPS-246",
    student: "Olivia Garcia",
    instructor: "Robert Smith",
    aircraft: "C-GITS",
    type: "IFR Training",
    status: "Scheduled",
  },
  {
    id: "FLT-007",
    time: "14:30",
    flightNumber: "ITPS-247",
    student: "Noah Williams",
    instructor: "David Wilson",
    aircraft: "C-GITR",
    type: "Training Flight",
    status: "Delayed",
  },
];

export const fleetUtilizationData = [
  { name: "Mon", utilization: 72 },
  { name: "Tue", utilization: 78 },
  { name: "Wed", utilization: 81 },
  { name: "Thu", utilization: 76 },
  { name: "Fri", utilization: 84 },
  { name: "Sat", utilization: 69 },
  { name: "Sun", utilization: 52 },
];

export const trainingProgressData = [
  {
    name: "PPL",
    completed: 74,
    remaining: 26,
  },
  {
    name: "CPL",
    completed: 61,
    remaining: 39,
  },
  {
    name: "IFR",
    completed: 68,
    remaining: 32,
  },
  {
    name: "MCC",
    completed: 83,
    remaining: 17,
  },
];

export const operationalAlerts = [
  {
    id: "ALT-001",
    severity: "warning",
    title: "Aircraft C-GITR approaching maintenance interval",
    detail: "12.4 flight hours remaining",
  },
  {
    id: "ALT-002",
    severity: "danger",
    title: "Flight ITPS-247 delayed",
    detail: "Weather review required",
  },
  {
    id: "ALT-003",
    severity: "info",
    title: "Simulator FS-02 available",
    detail: "Open slot at 16:30",
  },
];

export const aiInsights = [
  {
    title: "Schedule optimization opportunity",
    description:
      "Two instructor availability gaps could be reduced by moving one afternoon simulator session.",
  },
  {
    title: "Aircraft utilization",
    description:
      "C-GITP is currently operating 18% above the fleet average this week.",
  },
  {
    title: "Training progression",
    description:
      "Four students are approaching their next training milestone within the next 7 days.",
  },
];