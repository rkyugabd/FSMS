export type FlightStatus =
  | "Scheduled"
  | "Confirmed"
  | "Boarding"
  | "In Flight"
  | "Landed"
  | "Delayed"
  | "Cancelled"
  | "Completed"
  | "Diverted"
  | "Maintenance";

export type FlightType =
  | "Training"
  | "Solo"
  | "Checkride"
  | "Cross-Country"
  | "Simulator"
  | "Maintenance";

/*
 * =========================================================
 * FLIGHT DATA MODEL
 * =========================================================
 *
 * Important:
 * The entire Flights feature uses:
 *
 * date
 * departureTime
 * arrivalTime
 *
 * Do NOT use departureDate.
 */
export type Flight = {
  id: string;

  /*
   * Flight identification
   */
  flightNumber: string;

  /*
   * Schedule
   */
  date: string;
  departureTime: string;
  arrivalTime: string;

  /*
   * Airports
   */
  departureAirport: string;
  arrivalAirport: string;

  /*
   * Airport display names
   */
  departureAirportName?: string;
  arrivalAirportName?: string;

  /*
   * UI aliases
   */
  origin?: string;
  originName?: string;
  destination?: string;
  destinationName?: string;

  /*
   * Aircraft
   */
  aircraft: string;
  aircraftType: string;

  /*
   * Personnel
   */
  instructor: string;
  student: string;

  /*
   * Classification
   */
  flightType: FlightType;

  /*
   * Training UI alias
   */
  trainingType?: string;

  /*
   * Status
   */
  status: FlightStatus;

  /*
   * Duration
   */
  duration: string;

  /*
   * Operational information
   */
  passengers?: number;
  gate?: string;
  runway?: string;

  /*
   * Notes
   */
  notes?: string;
};

/*
 * =========================================================
 * MAIN FLIGHT DATASET
 * =========================================================
 */

export const flightData: Flight[] = [
  {
    id: "FLT-1001",
    flightNumber: "FS-201",
    date: "2026-08-18",
    departureTime: "07:30",
    arrivalTime: "09:15",

    departureAirport: "CYXU",
    arrivalAirport: "CYHM",

    departureAirportName: "London International",
    arrivalAirportName:
      "John C. Munro Hamilton International",

    origin: "CYXU",
    originName: "London International",

    destination: "CYHM",
    destinationName:
      "John C. Munro Hamilton International",

    aircraft: "C-GABC",
    aircraftType: "Cessna 172",

    instructor: "Michael Brown",
    student: "Emma Wilson",

    flightType: "Training",
    trainingType: "Training",

    status: "Completed",

    duration: "1h 45m",

    passengers: 1,

    notes:
      "Normal training flight. All objectives completed.",
  },

  {
    id: "FLT-1002",
    flightNumber: "FS-202",
    date: "2026-08-18",
    departureTime: "09:30",
    arrivalTime: "11:00",

    departureAirport: "CYXU",
    arrivalAirport: "CYKF",

    departureAirportName: "London International",
    arrivalAirportName:
      "Region of Waterloo International",

    origin: "CYXU",
    originName: "London International",

    destination: "CYKF",
    destinationName:
      "Region of Waterloo International",

    aircraft: "C-GDEF",
    aircraftType: "Cessna 172",

    instructor: "David Miller",
    student: "Liam Anderson",

    flightType: "Training",
    trainingType: "Instrument Training",

    status: "In Flight",

    duration: "1h 30m",

    passengers: 1,

    notes: "Instrument training session.",
  },

  {
    id: "FLT-1003",
    flightNumber: "FS-203",
    date: "2026-08-18",
    departureTime: "10:00",
    arrivalTime: "12:00",

    departureAirport: "CYXU",
    arrivalAirport: "CYOO",

    departureAirportName: "London International",
    arrivalAirportName:
      "Oshawa Executive Airport",

    origin: "CYXU",
    originName: "London International",

    destination: "CYOO",
    destinationName:
      "Oshawa Executive Airport",

    aircraft: "C-GHIJ",
    aircraftType: "Diamond DA40",

    instructor: "Sarah Thompson",
    student: "Noah Martin",

    flightType: "Cross-Country",
    trainingType: "Cross-Country",

    status: "Scheduled",

    duration: "2h 00m",

    passengers: 1,

    notes: "Cross-country navigation training.",
  },

  {
    id: "FLT-1004",
    flightNumber: "FS-204",
    date: "2026-08-18",
    departureTime: "11:30",
    arrivalTime: "13:00",

    departureAirport: "CYXU",
    arrivalAirport: "CYKF",

    departureAirportName: "London International",
    arrivalAirportName:
      "Region of Waterloo International",

    origin: "CYXU",
    originName: "London International",

    destination: "CYKF",
    destinationName:
      "Region of Waterloo International",

    aircraft: "C-GKLM",
    aircraftType: "Piper Archer",

    instructor: "James Wilson",
    student: "Olivia Taylor",

    flightType: "Checkride",
    trainingType: "Checkride",

    status: "Confirmed",

    duration: "1h 30m",

    passengers: 1,

    notes: "Private Pilot Licence checkride.",
  },

  {
    id: "FLT-1005",
    flightNumber: "FS-205",
    date: "2026-08-18",
    departureTime: "13:30",
    arrivalTime: "15:00",

    departureAirport: "CYXU",
    arrivalAirport: "CYZR",

    departureAirportName: "London International",
    arrivalAirportName:
      "Chris Hadfield Airport",

    origin: "CYXU",
    originName: "London International",

    destination: "CYZR",
    destinationName:
      "Chris Hadfield Airport",

    aircraft: "C-GMNO",
    aircraftType: "Cessna 172",

    instructor: "Michael Brown",
    student: "Ethan Davis",

    flightType: "Solo",
    trainingType: "Solo",

    status: "Scheduled",

    duration: "1h 30m",

    passengers: 0,

    notes: "Supervised solo flight.",
  },

  {
    id: "FLT-1006",
    flightNumber: "FS-206",
    date: "2026-08-18",
    departureTime: "14:00",
    arrivalTime: "15:30",

    departureAirport: "CYXU",
    arrivalAirport: "CYHM",

    departureAirportName: "London International",
    arrivalAirportName:
      "John C. Munro Hamilton International",

    origin: "CYXU",
    originName: "London International",

    destination: "CYHM",
    destinationName:
      "John C. Munro Hamilton International",

    aircraft: "C-GPQR",
    aircraftType: "Diamond DA40",

    instructor: "Sarah Thompson",
    student: "Sophia Moore",

    flightType: "Training",
    trainingType: "Training",

    status: "Delayed",

    duration: "1h 30m",

    passengers: 1,

    notes: "Delayed due to weather conditions.",
  },

  {
    id: "FLT-1007",
    flightNumber: "FS-207",
    date: "2026-08-18",
    departureTime: "15:30",
    arrivalTime: "17:00",

    departureAirport: "CYXU",
    arrivalAirport: "CYKF",

    departureAirportName: "London International",
    arrivalAirportName:
      "Region of Waterloo International",

    origin: "CYXU",
    originName: "London International",

    destination: "CYKF",
    destinationName:
      "Region of Waterloo International",

    aircraft: "C-GSTU",
    aircraftType: "Cessna 172",

    instructor: "David Miller",
    student: "Lucas Johnson",

    flightType: "Training",
    trainingType: "Circuit Training",

    status: "Scheduled",

    duration: "1h 30m",

    passengers: 1,

    notes: "Circuit and landing practice.",
  },

  {
    id: "FLT-1008",
    flightNumber: "FS-208",
    date: "2026-08-18",
    departureTime: "16:00",
    arrivalTime: "17:30",

    departureAirport: "CYXU",
    arrivalAirport: "CYOO",

    departureAirportName: "London International",
    arrivalAirportName:
      "Oshawa Executive Airport",

    origin: "CYXU",
    originName: "London International",

    destination: "CYOO",
    destinationName:
      "Oshawa Executive Airport",

    aircraft: "C-GVWX",
    aircraftType: "Piper Archer",

    instructor: "James Wilson",
    student: "Mia Anderson",

    flightType: "Training",
    trainingType: "Training",

    status: "Scheduled",

    duration: "1h 30m",

    passengers: 1,

    notes: "General flight training.",
  },

  {
    id: "FLT-1009",
    flightNumber: "FS-209",
    date: "2026-08-18",
    departureTime: "18:00",
    arrivalTime: "19:30",

    departureAirport: "CYXU",
    arrivalAirport: "CYKF",

    departureAirportName: "London International",
    arrivalAirportName:
      "Region of Waterloo International",

    origin: "CYXU",
    originName: "London International",

    destination: "CYKF",
    destinationName:
      "Region of Waterloo International",

    aircraft: "C-GYZA",
    aircraftType: "Cessna 172",

    instructor: "Michael Brown",
    student: "Benjamin Clark",

    flightType: "Solo",
    trainingType: "Solo",

    status: "Scheduled",

    duration: "1h 30m",

    passengers: 0,

    notes: "Evening solo practice.",
  },

  {
    id: "FLT-1010",
    flightNumber: "FS-210",
    date: "2026-08-18",
    departureTime: "19:00",
    arrivalTime: "20:30",

    departureAirport: "CYXU",
    arrivalAirport: "CYHM",

    departureAirportName: "London International",
    arrivalAirportName:
      "John C. Munro Hamilton International",

    origin: "CYXU",
    originName: "London International",

    destination: "CYHM",
    destinationName:
      "John C. Munro Hamilton International",

    aircraft: "C-GBCD",
    aircraftType: "Diamond DA40",

    instructor: "Sarah Thompson",
    student: "Charlotte White",

    flightType: "Training",
    trainingType: "Night Training",

    status: "Scheduled",

    duration: "1h 30m",

    passengers: 1,

    notes: "Night flight training.",
  },

  {
    id: "FLT-1011",
    flightNumber: "FS-211",
    date: "2026-08-19",
    departureTime: "08:00",
    arrivalTime: "09:30",

    departureAirport: "CYXU",
    arrivalAirport: "CYKF",

    departureAirportName: "London International",
    arrivalAirportName:
      "Region of Waterloo International",

    origin: "CYXU",
    originName: "London International",

    destination: "CYKF",
    destinationName:
      "Region of Waterloo International",

    aircraft: "C-GDEF",
    aircraftType: "Cessna 172",

    instructor: "David Miller",
    student: "Daniel Harris",

    flightType: "Training",
    trainingType: "Training",

    status: "Scheduled",

    duration: "1h 30m",

    passengers: 1,

    notes: "Morning flight training.",
  },

  {
    id: "FLT-1012",
    flightNumber: "FS-212",
    date: "2026-08-19",
    departureTime: "09:30",
    arrivalTime: "11:00",

    departureAirport: "CYXU",
    arrivalAirport: "CYHM",

    departureAirportName: "London International",
    arrivalAirportName:
      "John C. Munro Hamilton International",

    origin: "CYXU",
    originName: "London International",

    destination: "CYHM",
    destinationName:
      "John C. Munro Hamilton International",

    aircraft: "C-GHIJ",
    aircraftType: "Diamond DA40",

    instructor: "Sarah Thompson",
    student: "Emily Lewis",

    flightType: "Cross-Country",
    trainingType: "Cross-Country",

    status: "Confirmed",

    duration: "1h 30m",

    passengers: 1,

    notes: "Cross-country flight.",
  },

  {
    id: "FLT-1013",
    flightNumber: "FS-213",
    date: "2026-08-19",
    departureTime: "11:00",
    arrivalTime: "12:30",

    departureAirport: "CYXU",
    arrivalAirport: "CYOO",

    departureAirportName: "London International",
    arrivalAirportName:
      "Oshawa Executive Airport",

    origin: "CYXU",
    originName: "London International",

    destination: "CYOO",
    destinationName:
      "Oshawa Executive Airport",

    aircraft: "C-GKLM",
    aircraftType: "Piper Archer",

    instructor: "James Wilson",
    student: "Alexander Walker",

    flightType: "Checkride",
    trainingType: "Checkride",

    status: "Confirmed",

    duration: "1h 30m",

    passengers: 1,

    notes: "Commercial pilot checkride.",
  },

  {
    id: "FLT-1014",
    flightNumber: "FS-214",
    date: "2026-08-19",
    departureTime: "13:00",
    arrivalTime: "14:30",

    departureAirport: "CYXU",
    arrivalAirport: "CYKF",

    departureAirportName: "London International",
    arrivalAirportName:
      "Region of Waterloo International",

    origin: "CYXU",
    originName: "London International",

    destination: "CYKF",
    destinationName:
      "Region of Waterloo International",

    aircraft: "C-GMNO",
    aircraftType: "Cessna 172",

    instructor: "Michael Brown",
    student: "Grace Hall",

    flightType: "Training",
    trainingType: "Training",

    status: "Scheduled",

    duration: "1h 30m",

    passengers: 1,

    notes: "Flight fundamentals training.",
  },

  {
    id: "FLT-1015",
    flightNumber: "FS-215",
    date: "2026-08-19",
    departureTime: "14:30",
    arrivalTime: "16:00",

    departureAirport: "CYXU",
    arrivalAirport: "CYZR",

    departureAirportName: "London International",
    arrivalAirportName:
      "Chris Hadfield Airport",

    origin: "CYXU",
    originName: "London International",

    destination: "CYZR",
    destinationName:
      "Chris Hadfield Airport",

    aircraft: "C-GPQR",
    aircraftType: "Diamond DA40",

    instructor: "Sarah Thompson",
    student: "Henry Young",

    flightType: "Training",
    trainingType: "Advanced Navigation",

    status: "Scheduled",

    duration: "1h 30m",

    passengers: 1,

    notes: "Advanced navigation training.",
  },

  {
    id: "FLT-1016",
    flightNumber: "SIM-301",
    date: "2026-08-19",
    departureTime: "16:00",
    arrivalTime: "17:30",

    departureAirport: "FSMS",
    arrivalAirport: "FSMS",

    departureAirportName:
      "Flight School Simulator",
    arrivalAirportName:
      "Flight School Simulator",

    origin: "FSMS",
    originName:
      "Flight School Simulator",

    destination: "FSMS",
    destinationName:
      "Flight School Simulator",

    aircraft: "SIM-01",
    aircraftType: "Flight Simulator",

    instructor: "David Miller",
    student: "Isabella King",

    flightType: "Simulator",
    trainingType:
      "IFR Simulator Training",

    status: "Scheduled",

    duration: "1h 30m",

    passengers: 1,

    notes: "IFR simulator training.",
  },

  {
    id: "FLT-1017",
    flightNumber: "FS-217",
    date: "2026-08-19",
    departureTime: "17:30",
    arrivalTime: "19:00",

    departureAirport: "CYXU",
    arrivalAirport: "CYHM",

    departureAirportName: "London International",
    arrivalAirportName:
      "John C. Munro Hamilton International",

    origin: "CYXU",
    originName: "London International",

    destination: "CYHM",
    destinationName:
      "John C. Munro Hamilton International",

    aircraft: "C-GSTU",
    aircraftType: "Cessna 172",

    instructor: "James Wilson",
    student: "Jack Wright",

    flightType: "Solo",
    trainingType: "Solo",

    status: "Scheduled",

    duration: "1h 30m",

    passengers: 0,

    notes: "Solo flight practice.",
  },

  {
    id: "FLT-1018",
    flightNumber: "FS-218",
    date: "2026-08-19",
    departureTime: "18:30",
    arrivalTime: "20:00",

    departureAirport: "CYXU",
    arrivalAirport: "CYKF",

    departureAirportName: "London International",
    arrivalAirportName:
      "Region of Waterloo International",

    origin: "CYXU",
    originName: "London International",

    destination: "CYKF",
    destinationName:
      "Region of Waterloo International",

    aircraft: "C-GVWX",
    aircraftType: "Diamond DA40",

    instructor: "Michael Brown",
    student: "Amelia Scott",

    flightType: "Training",
    trainingType: "Training",

    status: "Scheduled",

    duration: "1h 30m",

    passengers: 1,

    notes: "Evening training flight.",
  },

  {
    id: "FLT-1019",
    flightNumber: "FS-219",
    date: "2026-08-20",
    departureTime: "08:30",
    arrivalTime: "10:00",

    departureAirport: "CYXU",
    arrivalAirport: "CYOO",

    departureAirportName: "London International",
    arrivalAirportName:
      "Oshawa Executive Airport",

    origin: "CYXU",
    originName: "London International",

    destination: "CYOO",
    destinationName:
      "Oshawa Executive Airport",

    aircraft: "C-GABC",
    aircraftType: "Cessna 172",

    instructor: "David Miller",
    student: "William Green",

    flightType: "Training",
    trainingType: "Training",

    status: "Scheduled",

    duration: "1h 30m",

    passengers: 1,

    notes: "Morning training flight.",
  },

  {
    id: "FLT-1020",
    flightNumber: "FS-220",
    date: "2026-08-20",
    departureTime: "10:30",
    arrivalTime: "12:30",

    departureAirport: "CYXU",
    arrivalAirport: "CYHM",

    departureAirportName: "London International",
    arrivalAirportName:
      "John C. Munro Hamilton International",

    origin: "CYXU",
    originName: "London International",

    destination: "CYHM",
    destinationName:
      "John C. Munro Hamilton International",

    aircraft: "C-GDEF",
    aircraftType: "Cessna 172",

    instructor: "Sarah Thompson",
    student: "Ella Baker",

    flightType: "Cross-Country",
    trainingType: "Cross-Country",

    status: "Scheduled",

    duration: "2h 00m",

    passengers: 1,

    notes: "Cross-country navigation.",
  },
];

/*
 * =========================================================
 * FILTER OPTIONS
 * =========================================================
 */

export const flightStatusOptions: FlightStatus[] = [
  "Scheduled",
  "Confirmed",
  "Boarding",
  "In Flight",
  "Landed",
  "Delayed",
  "Cancelled",
  "Completed",
  "Diverted",
  "Maintenance",
];

export const flightTypeOptions: FlightType[] = [
  "Training",
  "Solo",
  "Checkride",
  "Cross-Country",
  "Simulator",
  "Maintenance",
];

export const aircraftOptions = [
  "All Aircraft",
  "C-GABC",
  "C-GDEF",
  "C-GHIJ",
  "C-GKLM",
  "C-GMNO",
  "C-GPQR",
  "C-GSTU",
  "C-GVWX",
  "C-GYZA",
  "C-GBCD",
  "SIM-01",
];

export const instructorOptions = [
  "All Instructors",
  "Michael Brown",
  "David Miller",
  "Sarah Thompson",
  "James Wilson",
];

export const flightDateOptions = [
  "All Dates",
  "Today",
  "Tomorrow",
  "This Week",
];

/*
 * =========================================================
 * DATA ACCESS HELPERS
 * =========================================================
 */

export function getFlightById(
  id: string,
): Flight | undefined {
  return flightData.find(
    (flight) => flight.id === id,
  );
}

export function getFlightsByStatus(
  status: FlightStatus,
): Flight[] {
  return flightData.filter(
    (flight) =>
      flight.status === status,
  );
}

export function getFlightsByDate(
  date: string,
): Flight[] {
  return flightData.filter(
    (flight) =>
      flight.date === date,
  );
}