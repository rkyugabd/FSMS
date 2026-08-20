export type AircraftStatus =
  | "Available"
  | "In Flight"
  | "Maintenance"
  | "Reserved"
  | "Grounded"
  | "Retired";

export type Aircraft = {
  id: string;
  registration: string;
  aircraftType: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  year: number;

  status: AircraftStatus;

  totalFlightHours: number;
  engineHours: number;
  cycles: number;

  location: string;
  assignedInstructor: string;

  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  nextMaintenanceHours: number;

  insuranceExpiry: string;
  registrationExpiry: string;

  notes: string;
};

export const aircraftData: Aircraft[] = [
  {
    id: "AC-001",
    registration: "C-GABC",
    aircraftType: "C172",
    manufacturer: "Cessna",
    model: "172S",
    serialNumber: "172S-81234",
    year: 2018,
    status: "Available",
    totalFlightHours: 1240,
    engineHours: 1180,
    cycles: 2430,
    location: "London",
    assignedInstructor: "Michael Brown",
    lastMaintenanceDate: "2026-07-15",
    nextMaintenanceDate: "2026-09-12",
    nextMaintenanceHours: 58,
    insuranceExpiry: "2026-12-31",
    registrationExpiry: "2027-03-20",
    notes: "Primary training aircraft. Ready for normal operations.",
  },

  {
    id: "AC-002",
    registration: "C-GXYZ",
    aircraftType: "PA-28",
    manufacturer: "Piper",
    model: "Archer III",
    serialNumber: "PA28-54321",
    year: 2020,
    status: "In Flight",
    totalFlightHours: 1860,
    engineHours: 1740,
    cycles: 3210,
    location: "London",
    assignedInstructor: "Sarah Wilson",
    lastMaintenanceDate: "2026-06-28",
    nextMaintenanceDate: "2026-08-28",
    nextMaintenanceHours: 34,
    insuranceExpiry: "2027-01-15",
    registrationExpiry: "2027-05-10",
    notes: "Currently assigned to IFR training operations.",
  },

  {
    id: "AC-003",
    registration: "C-GDEF",
    aircraftType: "C152",
    manufacturer: "Cessna",
    model: "152",
    serialNumber: "C152-44567",
    year: 2016,
    status: "Maintenance",
    totalFlightHours: 2340,
    engineHours: 820,
    cycles: 4120,
    location: "London Hangar",
    assignedInstructor: "N/A",
    lastMaintenanceDate: "2026-07-28",
    nextMaintenanceDate: "2026-08-21",
    nextMaintenanceHours: 0,
    insuranceExpiry: "2026-11-30",
    registrationExpiry: "2027-02-14",
    notes: "Scheduled inspection and engine maintenance in progress.",
  },

  {
    id: "AC-004",
    registration: "C-GHJK",
    aircraftType: "C172",
    manufacturer: "Cessna",
    model: "172M",
    serialNumber: "172M-67231",
    year: 2017,
    status: "Available",
    totalFlightHours: 980,
    engineHours: 940,
    cycles: 1870,
    location: "London",
    assignedInstructor: "David Miller",
    lastMaintenanceDate: "2026-07-02",
    nextMaintenanceDate: "2026-10-04",
    nextMaintenanceHours: 96,
    insuranceExpiry: "2027-01-31",
    registrationExpiry: "2027-04-18",
    notes: "Available for student solo and dual instruction.",
  },

  {
    id: "AC-005",
    registration: "C-GKLM",
    aircraftType: "PA-28",
    manufacturer: "Piper",
    model: "Warrior II",
    serialNumber: "PA28-77891",
    year: 2019,
    status: "Reserved",
    totalFlightHours: 1510,
    engineHours: 1435,
    cycles: 2780,
    location: "London",
    assignedInstructor: "Emily Carter",
    lastMaintenanceDate: "2026-07-10",
    nextMaintenanceDate: "2026-09-01",
    nextMaintenanceHours: 71,
    insuranceExpiry: "2026-12-20",
    registrationExpiry: "2027-03-05",
    notes: "Reserved for commercial pilot training block.",
  },

  {
    id: "AC-006",
    registration: "C-GNOP",
    aircraftType: "DA40",
    manufacturer: "Diamond",
    model: "DA40 NG",
    serialNumber: "DA40-33210",
    year: 2021,
    status: "Available",
    totalFlightHours: 720,
    engineHours: 690,
    cycles: 1350,
    location: "Waterloo",
    assignedInstructor: "James Anderson",
    lastMaintenanceDate: "2026-07-22",
    nextMaintenanceDate: "2026-10-15",
    nextMaintenanceHours: 112,
    insuranceExpiry: "2027-02-28",
    registrationExpiry: "2027-06-12",
    notes: "Modern glass cockpit aircraft used for advanced training.",
  },

  {
    id: "AC-007",
    registration: "C-GQRS",
    aircraftType: "C152",
    manufacturer: "Cessna",
    model: "152",
    serialNumber: "C152-55672",
    year: 2015,
    status: "Grounded",
    totalFlightHours: 2890,
    engineHours: 1950,
    cycles: 4980,
    location: "London Hangar",
    assignedInstructor: "N/A",
    lastMaintenanceDate: "2026-08-05",
    nextMaintenanceDate: "2026-08-20",
    nextMaintenanceHours: 0,
    insuranceExpiry: "2026-10-31",
    registrationExpiry: "2027-01-25",
    notes: "Grounded pending maintenance inspection and approval.",
  },

  {
    id: "AC-008",
    registration: "C-GTUV",
    aircraftType: "C172",
    manufacturer: "Cessna",
    model: "172R",
    serialNumber: "172R-99821",
    year: 2018,
    status: "Available",
    totalFlightHours: 1320,
    engineHours: 1260,
    cycles: 2510,
    location: "London",
    assignedInstructor: "Robert Taylor",
    lastMaintenanceDate: "2026-07-30",
    nextMaintenanceDate: "2026-09-25",
    nextMaintenanceHours: 64,
    insuranceExpiry: "2027-01-10",
    registrationExpiry: "2027-04-01",
    notes: "Standard C172 training aircraft.",
  },

  {
    id: "AC-009",
    registration: "C-GWXY",
    aircraftType: "PA-28",
    manufacturer: "Piper",
    model: "Archer II",
    serialNumber: "PA28-66342",
    year: 2017,
    status: "In Flight",
    totalFlightHours: 2010,
    engineHours: 1910,
    cycles: 3650,
    location: "London",
    assignedInstructor: "Daniel Harris",
    lastMaintenanceDate: "2026-06-18",
    nextMaintenanceDate: "2026-09-03",
    nextMaintenanceHours: 41,
    insuranceExpiry: "2026-12-15",
    registrationExpiry: "2027-02-28",
    notes: "Currently used for night rating training.",
  },

  {
    id: "AC-010",
    registration: "C-GAAA",
    aircraftType: "DA42",
    manufacturer: "Diamond",
    model: "DA42 VI",
    serialNumber: "DA42-44128",
    year: 2022,
    status: "Available",
    totalFlightHours: 540,
    engineHours: 515,
    cycles: 920,
    location: "Waterloo",
    assignedInstructor: "Thomas Clark",
    lastMaintenanceDate: "2026-08-01",
    nextMaintenanceDate: "2026-11-01",
    nextMaintenanceHours: 145,
    insuranceExpiry: "2027-03-15",
    registrationExpiry: "2027-07-20",
    notes: "Multi-engine training aircraft.",
  },

  {
    id: "AC-011",
    registration: "C-GBBB",
    aircraftType: "C172",
    manufacturer: "Cessna",
    model: "172S",
    serialNumber: "172S-88421",
    year: 2020,
    status: "Reserved",
    totalFlightHours: 890,
    engineHours: 850,
    cycles: 1620,
    location: "London",
    assignedInstructor: "Laura Martin",
    lastMaintenanceDate: "2026-07-20",
    nextMaintenanceDate: "2026-09-18",
    nextMaintenanceHours: 83,
    insuranceExpiry: "2027-01-22",
    registrationExpiry: "2027-05-08",
    notes: "Reserved for private pilot licence training.",
  },

  {
    id: "AC-012",
    registration: "C-GCCC",
    aircraftType: "C152",
    manufacturer: "Cessna",
    model: "152",
    serialNumber: "C152-71231",
    year: 2014,
    status: "Maintenance",
    totalFlightHours: 3150,
    engineHours: 540,
    cycles: 5340,
    location: "London Hangar",
    assignedInstructor: "N/A",
    lastMaintenanceDate: "2026-08-10",
    nextMaintenanceDate: "2026-08-24",
    nextMaintenanceHours: 0,
    insuranceExpiry: "2026-10-15",
    registrationExpiry: "2027-01-18",
    notes: "Annual inspection and component replacement.",
  },
];

export default aircraftData;