export type MaintenanceStatus =
  | "Scheduled"
  | "Due Soon"
  | "In Progress"
  | "Completed"
  | "Overdue"
  | "Cancelled";

export type MaintenanceType =
  | "100-Hour Inspection"
  | "Annual Inspection"
  | "50-Hour Inspection"
  | "Engine Inspection"
  | "Oil Change"
  | "AD Compliance"
  | "Repair"
  | "Avionics"
  | "Landing Gear"
  | "Other";

export type MaintenanceRecord = {
  id: string;

  aircraft: string;
  registration: string;
  aircraftType: string;

  maintenanceType: MaintenanceType;
  description: string;

  status: MaintenanceStatus;

  lastServiceDate: string;
  nextDueDate: string;

  lastServiceHours: number;
  nextDueHours: number;
  currentHours: number;

  technician: string;
  workOrder: string;

  cost: number;

  notes: string;
};

export const maintenanceData: MaintenanceRecord[] = [
  {
    id: "MNT-001",

    aircraft: "C-GABC",
    registration: "C-GABC",
    aircraftType: "Cessna 172S",

    maintenanceType: "100-Hour Inspection",
    description:
      "Scheduled 100-hour inspection including engine, controls, landing gear and airframe inspection.",

    status: "Due Soon",

    lastServiceDate: "2026-05-18",
    nextDueDate: "2026-08-25",

    lastServiceHours: 1142.4,
    nextDueHours: 1242.4,
    currentHours: 1218.7,

    technician: "Michael Carter",
    workOrder: "WO-2026-001",

    cost: 850,

    notes:
      "Aircraft approaching 100-hour inspection interval. Schedule maintenance before next training cycle.",
  },

  {
    id: "MNT-002",

    aircraft: "C-GDEF",
    registration: "C-GDEF",
    aircraftType: "Cessna 172R",

    maintenanceType: "Annual Inspection",
    description:
      "Annual inspection of aircraft systems, engine, airframe, avionics and required documentation.",

    status: "Scheduled",

    lastServiceDate: "2025-09-14",
    nextDueDate: "2026-09-14",

    lastServiceHours: 986.2,
    nextDueHours: 0,
    currentHours: 1042.8,

    technician: "Sarah Mitchell",
    workOrder: "WO-2026-002",

    cost: 1450,

    notes:
      "Annual inspection scheduled with maintenance department.",
  },

  {
    id: "MNT-003",

    aircraft: "C-GHIJ",
    registration: "C-GHIJ",
    aircraftType: "Diamond DA40",

    maintenanceType: "Oil Change",
    description:
      "Engine oil and oil filter replacement.",

    status: "Completed",

    lastServiceDate: "2026-08-02",
    nextDueDate: "2026-10-02",

    lastServiceHours: 742.6,
    nextDueHours: 792.6,
    currentHours: 756.3,

    technician: "Daniel Wilson",
    workOrder: "WO-2026-003",

    cost: 235,

    notes:
      "Oil and filter replaced. No abnormal findings reported.",
  },

  {
    id: "MNT-004",

    aircraft: "C-GKLM",
    registration: "C-GKLM",
    aircraftType: "Piper PA-28",

    maintenanceType: "Engine Inspection",
    description:
      "Engine inspection and compression check following scheduled engine-hour interval.",

    status: "In Progress",

    lastServiceDate: "2026-07-21",
    nextDueDate: "2026-08-30",

    lastServiceHours: 1634.8,
    nextDueHours: 1684.8,
    currentHours: 1669.2,

    technician: "Robert Anderson",
    workOrder: "WO-2026-004",

    cost: 620,

    notes:
      "Compression test underway. Aircraft temporarily unavailable for flight operations.",
  },

  {
    id: "MNT-005",

    aircraft: "C-GNOP",
    registration: "C-GNOP",
    aircraftType: "Cessna 172S",

    maintenanceType: "50-Hour Inspection",
    description:
      "Routine 50-hour inspection and lubrication of required aircraft components.",

    status: "Overdue",

    lastServiceDate: "2026-06-10",
    nextDueDate: "2026-07-28",

    lastServiceHours: 1270.5,
    nextDueHours: 1320.5,
    currentHours: 1331.4,

    technician: "Michael Carter",
    workOrder: "WO-2026-005",

    cost: 480,

    notes:
      "Inspection is overdue by both calendar date and aircraft hours. Aircraft should not be scheduled until inspection is completed.",
  },

  {
    id: "MNT-006",

    aircraft: "C-GQRS",
    registration: "C-GQRS",
    aircraftType: "Diamond DA20",

    maintenanceType: "Avionics",
    description:
      "Inspection and troubleshooting of communication radio and navigation equipment.",

    status: "Scheduled",

    lastServiceDate: "2026-04-15",
    nextDueDate: "2026-09-05",

    lastServiceHours: 612.4,
    nextDueHours: 0,
    currentHours: 648.9,

    technician: "James Thompson",
    workOrder: "WO-2026-006",

    cost: 390,

    notes:
      "Avionics inspection planned during next scheduled maintenance window.",
  },

  {
    id: "MNT-007",

    aircraft: "C-GTUV",
    registration: "C-GTUV",
    aircraftType: "Cessna 150",

    maintenanceType: "Landing Gear",
    description:
      "Inspection of landing gear, wheels, brakes and associated components.",

    status: "Completed",

    lastServiceDate: "2026-07-29",
    nextDueDate: "2026-10-29",

    lastServiceHours: 2187.3,
    nextDueHours: 2237.3,
    currentHours: 2201.7,

    technician: "Sarah Mitchell",
    workOrder: "WO-2026-007",

    cost: 310,

    notes:
      "Landing gear inspection completed. Brake pads remain within service limits.",
  },

  {
    id: "MNT-008",

    aircraft: "C-GWXY",
    registration: "C-GWXY",
    aircraftType: "Cessna 172S",

    maintenanceType: "AD Compliance",
    description:
      "Inspection and compliance verification for applicable Airworthiness Directives.",

    status: "Due Soon",

    lastServiceDate: "2026-06-22",
    nextDueDate: "2026-08-28",

    lastServiceHours: 895.6,
    nextDueHours: 0,
    currentHours: 921.8,

    technician: "Daniel Wilson",
    workOrder: "WO-2026-008",

    cost: 275,

    notes:
      "AD compliance review required before the next scheduled maintenance cycle.",
  },

  {
    id: "MNT-009",

    aircraft: "C-GYZA",
    registration: "C-GYZA",
    aircraftType: "Piper PA-28",

    maintenanceType: "Repair",
    description:
      "Repair of minor electrical system fault identified during pre-flight inspection.",

    status: "Completed",

    lastServiceDate: "2026-08-05",
    nextDueDate: "2026-11-05",

    lastServiceHours: 1422.1,
    nextDueHours: 0,
    currentHours: 1428.6,

    technician: "Robert Anderson",
    workOrder: "WO-2026-009",

    cost: 185,

    notes:
      "Electrical connection repaired and system tested successfully.",
  },

  {
    id: "MNT-010",

    aircraft: "C-GBCD",
    registration: "C-GBCD",
    aircraftType: "Diamond DA40",

    maintenanceType: "100-Hour Inspection",
    description:
      "100-hour inspection including engine, airframe, flight controls and safety equipment.",

    status: "Scheduled",

    lastServiceDate: "2026-06-30",
    nextDueDate: "2026-09-20",

    lastServiceHours: 532.8,
    nextDueHours: 632.8,
    currentHours: 581.2,

    technician: "James Thompson",
    workOrder: "WO-2026-010",

    cost: 900,

    notes:
      "Inspection planned for September maintenance window.",
  },
];