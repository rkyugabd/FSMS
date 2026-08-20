export type SimulatorStatus =
  | "Available"
  | "In Use"
  | "Maintenance"
  | "Offline";

export type SimulatorType =
  | "Full Flight Simulator"
  | "Flight Training Device"
  | "Flight Simulation Training Device"
  | "Desktop Simulator";

export type Simulator = {
  id: string;

  simulatorId: string;
  name: string;

  type: SimulatorType;
  model: string;

  status: SimulatorStatus;

  location: string;

  capacity: number;

  instructor: string;

  hoursUsed: number;

  lastMaintenance: string;
  nextMaintenance: string;

  notes?: string;
};

export const simulatorData: Simulator[] = [
  {
    id: "SIM-001",
    simulatorId: "SIM-001",
    name: "C172 Training Simulator",
    type: "Full Flight Simulator",
    model: "Cessna 172 G1000",
    status: "Available",
    location: "Training Centre A",
    capacity: 2,
    instructor: "Michael Carter",
    hoursUsed: 1248,
    lastMaintenance: "2026-07-18",
    nextMaintenance: "2026-09-18",
    notes: "Primary simulator for private pilot training.",
  },

  {
    id: "SIM-002",
    simulatorId: "SIM-002",
    name: "DA40 Advanced Trainer",
    type: "Flight Training Device",
    model: "Diamond DA40",
    status: "In Use",
    location: "Training Centre A",
    capacity: 2,
    instructor: "Sarah Mitchell",
    hoursUsed: 982,
    lastMaintenance: "2026-07-25",
    nextMaintenance: "2026-09-25",
    notes: "Used for advanced navigation and instrument training.",
  },

  {
    id: "SIM-003",
    simulatorId: "SIM-003",
    name: "IFR Navigation Trainer",
    type: "Flight Simulation Training Device",
    model: "Generic IFR Trainer",
    status: "Available",
    location: "Training Centre B",
    capacity: 1,
    instructor: "David Wilson",
    hoursUsed: 756,
    lastMaintenance: "2026-08-01",
    nextMaintenance: "2026-10-01",
    notes: "Dedicated IFR procedures and navigation training.",
  },

  {
    id: "SIM-004",
    simulatorId: "SIM-004",
    name: "Multi-Engine Simulator",
    type: "Full Flight Simulator",
    model: "Diamond DA42",
    status: "Maintenance",
    location: "Training Centre B",
    capacity: 2,
    instructor: "James Anderson",
    hoursUsed: 1534,
    lastMaintenance: "2026-08-12",
    nextMaintenance: "2026-08-22",
    notes: "Scheduled maintenance in progress.",
  },

  {
    id: "SIM-005",
    simulatorId: "SIM-005",
    name: "Desktop Flight Trainer",
    type: "Desktop Simulator",
    model: "G1000 Desktop Trainer",
    status: "Available",
    location: "Training Centre A",
    capacity: 1,
    instructor: "Emily Brown",
    hoursUsed: 438,
    lastMaintenance: "2026-06-20",
    nextMaintenance: "2026-09-20",
    notes: "Desktop trainer for cockpit familiarization.",
  },

  {
    id: "SIM-006",
    simulatorId: "SIM-006",
    name: "Commercial Pilot Trainer",
    type: "Flight Training Device",
    model: "ATD-3000",
    status: "In Use",
    location: "Training Centre C",
    capacity: 2,
    instructor: "Robert Taylor",
    hoursUsed: 1876,
    lastMaintenance: "2026-07-30",
    nextMaintenance: "2026-09-30",
    notes: "Used for commercial pilot preparation.",
  },

  {
    id: "SIM-007",
    simulatorId: "SIM-007",
    name: "Emergency Procedures Trainer",
    type: "Flight Simulation Training Device",
    model: "EPT-200",
    status: "Offline",
    location: "Training Centre C",
    capacity: 2,
    instructor: "Jennifer Davis",
    hoursUsed: 621,
    lastMaintenance: "2026-05-15",
    nextMaintenance: "2026-08-30",
    notes: "Temporarily offline pending equipment inspection.",
  },

  {
    id: "SIM-008",
    simulatorId: "SIM-008",
    name: "Advanced IFR Simulator",
    type: "Full Flight Simulator",
    model: "IFR-X500",
    status: "Available",
    location: "Training Centre B",
    capacity: 2,
    instructor: "Daniel Miller",
    hoursUsed: 1102,
    lastMaintenance: "2026-07-10",
    nextMaintenance: "2026-09-10",
    notes: "Advanced IFR and instrument approach training.",
  },

  {
    id: "SIM-009",
    simulatorId: "SIM-009",
    name: "Basic Navigation Trainer",
    type: "Desktop Simulator",
    model: "NAV-100",
    status: "Available",
    location: "Training Centre A",
    capacity: 1,
    instructor: "Laura Wilson",
    hoursUsed: 312,
    lastMaintenance: "2026-07-05",
    nextMaintenance: "2026-10-05",
    notes: "Basic navigation and flight planning practice.",
  },

  {
    id: "SIM-010",
    simulatorId: "SIM-010",
    name: "Commercial Multi-Engine Trainer",
    type: "Full Flight Simulator",
    model: "B200 Multi Trainer",
    status: "Maintenance",
    location: "Training Centre C",
    capacity: 2,
    instructor: "Christopher Moore",
    hoursUsed: 2104,
    lastMaintenance: "2026-08-14",
    nextMaintenance: "2026-08-24",
    notes: "Annual inspection and software update.",
  },
];