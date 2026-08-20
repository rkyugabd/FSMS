export type StudentStatus =
  | "Active"
  | "Inactive"
  | "On Hold"
  | "Completed"
  | "Withdrawn";

export type StudentProgram =
  | "Private Pilot"
  | "Commercial Pilot"
  | "Instrument Rating"
  | "Multi-Engine"
  | "Flight Instructor"
  | "Recreational Pilot"
  | "Other";

export type MedicalStatus =
  | "Valid"
  | "Expiring Soon"
  | "Expired"
  | "Not Provided";

export type Student = {
  id: string;
  studentNumber: string;

  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  dateOfBirth: string;

  address: string;
  city: string;
  province: string;
  postalCode: string;

  program: StudentProgram;
  licenseType: string;

  instructor: string;

  enrollmentDate: string;

  status: StudentStatus;

  totalFlights: number;
  completedFlights: number;

  flightHours: number;
  soloHours: number;

  progress: number;

  lastFlightDate: string;
  nextFlightDate: string;

  medicalStatus: MedicalStatus;

  notes: string;
};

export const studentData: Student[] = [
  {
    id: "student-001",
    studentNumber: "STU-001",

    firstName: "John",
    lastName: "Smith",

    email: "john.smith@example.com",
    phone: "(519) 555-2101",

    dateOfBirth: "1998-04-12",

    address: "125 Wellington Street",
    city: "London",
    province: "Ontario",
    postalCode: "N6B 2K5",

    program: "Private Pilot",
    licenseType: "PPL",

    instructor: "Michael Brown",

    enrollmentDate: "2026-01-12",

    status: "Active",

    totalFlights: 28,
    completedFlights: 24,

    flightHours: 38.5,
    soloHours: 12.4,

    progress: 42,

    lastFlightDate: "2026-08-17",
    nextFlightDate: "2026-08-20",

    medicalStatus: "Valid",

    notes:
      "Progressing well through private pilot training. Requires additional cross-country practice.",
  },

  {
    id: "student-002",
    studentNumber: "STU-002",

    firstName: "Emily",
    lastName: "Johnson",

    email: "emily.johnson@example.com",
    phone: "(519) 555-2102",

    dateOfBirth: "2000-08-21",

    address: "48 Oxford Street",
    city: "London",
    province: "Ontario",
    postalCode: "N6A 1T2",

    program: "Private Pilot",
    licenseType: "PPL",

    instructor: "Sarah Wilson",

    enrollmentDate: "2026-02-03",

    status: "Active",

    totalFlights: 34,
    completedFlights: 30,

    flightHours: 45.2,
    soloHours: 18.6,

    progress: 61,

    lastFlightDate: "2026-08-16",
    nextFlightDate: "2026-08-19",

    medicalStatus: "Valid",

    notes:
      "Strong solo performance. Preparing for upcoming progress check.",
  },

  {
    id: "student-003",
    studentNumber: "STU-003",

    firstName: "Daniel",
    lastName: "Williams",

    email: "daniel.williams@example.com",
    phone: "(519) 555-2103",

    dateOfBirth: "1995-11-05",

    address: "214 Richmond Street",
    city: "London",
    province: "Ontario",
    postalCode: "N6B 2C5",

    program: "Commercial Pilot",
    licenseType: "CPL",

    instructor: "David Miller",

    enrollmentDate: "2025-10-18",

    status: "Active",

    totalFlights: 76,
    completedFlights: 71,

    flightHours: 128.7,
    soloHours: 64.2,

    progress: 78,

    lastFlightDate: "2026-08-18",
    nextFlightDate: "2026-08-22",

    medicalStatus: "Valid",

    notes:
      "Commercial pilot training progressing according to schedule.",
  },

  {
    id: "student-004",
    studentNumber: "STU-004",

    firstName: "Sophia",
    lastName: "Taylor",

    email: "sophia.taylor@example.com",
    phone: "(519) 555-2104",

    dateOfBirth: "1999-02-14",

    address: "92 Adelaide Street",
    city: "London",
    province: "Ontario",
    postalCode: "N6B 3H8",

    program: "Instrument Rating",
    licenseType: "IR",

    instructor: "Michael Brown",

    enrollmentDate: "2026-03-22",

    status: "Active",

    totalFlights: 41,
    completedFlights: 37,

    flightHours: 68.4,
    soloHours: 21.5,

    progress: 67,

    lastFlightDate: "2026-08-15",
    nextFlightDate: "2026-08-21",

    medicalStatus: "Expiring Soon",

    notes:
      "Instrument training underway. Medical renewal should be completed before next phase.",
  },

  {
    id: "student-005",
    studentNumber: "STU-005",

    firstName: "Liam",
    lastName: "Anderson",

    email: "liam.anderson@example.com",
    phone: "(519) 555-2105",

    dateOfBirth: "2001-06-30",

    address: "31 King Street",
    city: "London",
    province: "Ontario",
    postalCode: "N6A 1C4",

    program: "Private Pilot",
    licenseType: "PPL",

    instructor: "Sarah Wilson",

    enrollmentDate: "2026-04-09",

    status: "On Hold",

    totalFlights: 19,
    completedFlights: 17,

    flightHours: 27.8,
    soloHours: 8.2,

    progress: 35,

    lastFlightDate: "2026-07-29",
    nextFlightDate: "",

    medicalStatus: "Valid",

    notes:
      "Training temporarily paused at student's request.",
  },

  {
    id: "student-006",
    studentNumber: "STU-006",

    firstName: "Olivia",
    lastName: "Martin",

    email: "olivia.martin@example.com",
    phone: "(519) 555-2106",

    dateOfBirth: "1997-09-18",

    address: "67 Dundas Street",
    city: "London",
    province: "Ontario",
    postalCode: "N6A 1E2",

    program: "Commercial Pilot",
    licenseType: "CPL",

    instructor: "David Miller",

    enrollmentDate: "2025-08-15",

    status: "Completed",

    totalFlights: 112,
    completedFlights: 108,

    flightHours: 198.6,
    soloHours: 101.3,

    progress: 100,

    lastFlightDate: "2026-07-31",
    nextFlightDate: "",

    medicalStatus: "Valid",

    notes:
      "Commercial pilot training completed successfully.",
  },

  {
    id: "student-007",
    studentNumber: "STU-007",

    firstName: "Noah",
    lastName: "Thomas",

    email: "noah.thomas@example.com",
    phone: "(519) 555-2107",

    dateOfBirth: "2002-01-27",

    address: "15 Wharncliffe Road",
    city: "London",
    province: "Ontario",
    postalCode: "N6G 1K9",

    program: "Multi-Engine",
    licenseType: "MEL",

    instructor: "Michael Brown",

    enrollmentDate: "2026-05-03",

    status: "Active",

    totalFlights: 16,
    completedFlights: 13,

    flightHours: 42.7,
    soloHours: 6.8,

    progress: 48,

    lastFlightDate: "2026-08-14",
    nextFlightDate: "2026-08-20",

    medicalStatus: "Valid",

    notes:
      "Multi-engine training in progress.",
  },

  {
    id: "student-008",
    studentNumber: "STU-008",

    firstName: "Ava",
    lastName: "Jackson",

    email: "ava.jackson@example.com",
    phone: "(519) 555-2108",

    dateOfBirth: "1996-12-09",

    address: "183 Hamilton Road",
    city: "London",
    province: "Ontario",
    postalCode: "N5Z 1R2",

    program: "Flight Instructor",
    licenseType: "FI",

    instructor: "David Miller",

    enrollmentDate: "2026-01-28",

    status: "Active",

    totalFlights: 59,
    completedFlights: 55,

    flightHours: 116.4,
    soloHours: 53.7,

    progress: 84,

    lastFlightDate: "2026-08-18",
    nextFlightDate: "2026-08-23",

    medicalStatus: "Valid",

    notes:
      "Instructor training nearing completion.",
  },

  {
    id: "student-009",
    studentNumber: "STU-009",

    firstName: "James",
    lastName: "White",

    email: "james.white@example.com",
    phone: "(519) 555-2109",

    dateOfBirth: "1994-05-16",

    address: "74 Baseline Road",
    city: "London",
    province: "Ontario",
    postalCode: "N6J 1V8",

    program: "Private Pilot",
    licenseType: "PPL",

    instructor: "Sarah Wilson",

    enrollmentDate: "2026-06-10",

    status: "Active",

    totalFlights: 11,
    completedFlights: 9,

    flightHours: 16.3,
    soloHours: 2.1,

    progress: 22,

    lastFlightDate: "2026-08-12",
    nextFlightDate: "2026-08-20",

    medicalStatus: "Valid",

    notes:
      "Early-stage student completing foundational flight exercises.",
  },

  {
    id: "student-010",
    studentNumber: "STU-010",

    firstName: "Isabella",
    lastName: "Harris",

    email: "isabella.harris@example.com",
    phone: "(519) 555-2110",

    dateOfBirth: "1998-03-25",

    address: "56 Commissioners Road",
    city: "London",
    province: "Ontario",
    postalCode: "N6J 1Y3",

    program: "Recreational Pilot",
    licenseType: "RPP",

    instructor: "Michael Brown",

    enrollmentDate: "2026-02-18",

    status: "Inactive",

    totalFlights: 23,
    completedFlights: 21,

    flightHours: 31.5,
    soloHours: 9.4,

    progress: 56,

    lastFlightDate: "2026-06-27",
    nextFlightDate: "",

    medicalStatus: "Expired",

    notes:
      "Training inactive pending medical documentation.",
  },

  {
    id: "student-011",
    studentNumber: "STU-011",

    firstName: "Lucas",
    lastName: "Clark",

    email: "lucas.clark@example.com",
    phone: "(519) 555-2111",

    dateOfBirth: "2000-10-02",

    address: "102 Highbury Avenue",
    city: "London",
    province: "Ontario",
    postalCode: "N5W 2K4",

    program: "Private Pilot",
    licenseType: "PPL",

    instructor: "Sarah Wilson",

    enrollmentDate: "2026-05-17",

    status: "Active",

    totalFlights: 14,
    completedFlights: 12,

    flightHours: 21.9,
    soloHours: 5.7,

    progress: 29,

    lastFlightDate: "2026-08-13",
    nextFlightDate: "2026-08-21",

    medicalStatus: "Valid",

    notes:
      "Consistent attendance and good progress.",
  },

  {
    id: "student-012",
    studentNumber: "STU-012",

    firstName: "Mia",
    lastName: "Lewis",

    email: "mia.lewis@example.com",
    phone: "(519) 555-2112",

    dateOfBirth: "1999-07-11",

    address: "218 Fanshawe Park Road",
    city: "London",
    province: "Ontario",
    postalCode: "N5X 3T8",

    program: "Instrument Rating",
    licenseType: "IR",

    instructor: "David Miller",

    enrollmentDate: "2026-04-14",

    status: "Active",

    totalFlights: 37,
    completedFlights: 34,

    flightHours: 59.8,
    soloHours: 19.2,

    progress: 63,

    lastFlightDate: "2026-08-16",
    nextFlightDate: "2026-08-22",

    medicalStatus: "Valid",

    notes:
      "Strong performance in instrument procedures.",
  },
];

export default studentData;