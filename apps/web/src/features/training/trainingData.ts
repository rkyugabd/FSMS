export type TrainingStatus =
  | "Scheduled"
  | "In Progress"
  | "Completed"
  | "Passed"
  | "Failed"
  | "Cancelled";

export type TrainingType =
  | "Private Pilot"
  | "Commercial Pilot"
  | "Instrument Rating"
  | "Night Rating"
  | "Multi-Engine"
  | "Flight Review"
  | "Ground School"
  | "Simulator Training";

export type Training = {
  id: string;
  trainingNumber: string;

  studentId: string;
  student: string;

  instructorId: string;
  instructor: string;

  aircraft?: string;
  aircraftType?: string;

  trainingType: TrainingType;
  status: TrainingStatus;

  date: string;
  startTime: string;
  endTime: string;
  duration: string;

  location?: string;

  lessonCode?: string;
  lessonTitle?: string;

  progress: number;

  score?: number;

  notes?: string;

  createdAt?: string;
  updatedAt?: string;
};

export const trainingData: Training[] = [
  {
    id: "TRN-001",
    trainingNumber: "TR-2026-001",

    studentId: "STU-001",
    student: "Emma Wilson",

    instructorId: "INS-001",
    instructor: "Michael Brown",

    aircraft: "C-GABC",
    aircraftType: "C172",

    trainingType: "Private Pilot",
    status: "In Progress",

    date: "2026-08-19",
    startTime: "09:00",
    endTime: "10:30",
    duration: "1h 30m",

    location: "CYXU",

    lessonCode: "PPL-04",
    lessonTitle: "Normal Takeoff and Landing",

    progress: 65,

    notes:
      "Student demonstrates good aircraft control. Continue landing pattern practice.",
  },

  {
    id: "TRN-002",
    trainingNumber: "TR-2026-002",

    studentId: "STU-002",
    student: "Liam Johnson",

    instructorId: "INS-002",
    instructor: "Sarah Thompson",

    aircraft: "C-GDEF",
    aircraftType: "C172",

    trainingType: "Instrument Rating",
    status: "Scheduled",

    date: "2026-08-19",
    startTime: "11:00",
    endTime: "12:30",
    duration: "1h 30m",

    location: "CYXU",

    lessonCode: "IFR-07",
    lessonTitle: "Instrument Approaches",

    progress: 42,

    notes:
      "Focus on approach briefing and instrument scan.",
  },

  {
    id: "TRN-003",
    trainingNumber: "TR-2026-003",

    studentId: "STU-003",
    student: "Olivia Martin",

    instructorId: "INS-003",
    instructor: "David Anderson",

    aircraft: "C-GXYZ",
    aircraftType: "DA40",

    trainingType: "Commercial Pilot",
    status: "Completed",

    date: "2026-08-18",
    startTime: "13:00",
    endTime: "15:00",
    duration: "2h",

    location: "CYXU",

    lessonCode: "CPL-12",
    lessonTitle: "Commercial Flight Maneuvers",

    progress: 100,

    score: 91,

    notes:
      "Training objectives completed successfully.",
  },

  {
    id: "TRN-004",
    trainingNumber: "TR-2026-004",

    studentId: "STU-004",
    student: "Noah Williams",

    instructorId: "INS-001",
    instructor: "Michael Brown",

    aircraft: "C-GABC",
    aircraftType: "C172",

    trainingType: "Night Rating",
    status: "Passed",

    date: "2026-08-17",
    startTime: "20:00",
    endTime: "22:00",
    duration: "2h",

    location: "CYXU",

    lessonCode: "NIGHT-05",
    lessonTitle: "Night Circuit Operations",

    progress: 100,

    score: 94,

    notes:
      "Student successfully completed night circuit requirements.",
  },

  {
    id: "TRN-005",
    trainingNumber: "TR-2026-005",

    studentId: "STU-005",
    student: "Ava Davis",

    instructorId: "INS-004",
    instructor: "James Wilson",

    aircraft: "C-GHIJ",
    aircraftType: "DA42",

    trainingType: "Multi-Engine",
    status: "In Progress",

    date: "2026-08-18",
    startTime: "14:00",
    endTime: "16:00",
    duration: "2h",

    location: "CYXU",

    lessonCode: "ME-03",
    lessonTitle: "Engine Failure Procedures",

    progress: 72,

    notes:
      "Continue asymmetric flight and engine failure exercises.",
  },

  {
    id: "TRN-006",
    trainingNumber: "TR-2026-006",

    studentId: "STU-006",
    student: "Ethan Taylor",

    instructorId: "INS-002",
    instructor: "Sarah Thompson",

    aircraft: "C-GDEF",
    aircraftType: "C172",

    trainingType: "Flight Review",
    status: "Scheduled",

    date: "2026-08-20",
    startTime: "09:30",
    endTime: "11:00",
    duration: "1h 30m",

    location: "CYXU",

    lessonCode: "FR-01",
    lessonTitle: "Flight Review",

    progress: 0,

    notes:
      "Annual flight review scheduled.",
  },

  {
    id: "TRN-007",
    trainingNumber: "TR-2026-007",

    studentId: "STU-007",
    student: "Sophia Clark",

    instructorId: "INS-003",
    instructor: "David Anderson",

    aircraftType: "Classroom",

    trainingType: "Ground School",
    status: "Completed",

    date: "2026-08-16",
    startTime: "10:00",
    endTime: "12:00",
    duration: "2h",

    location: "Training Room A",

    lessonCode: "GS-08",
    lessonTitle: "Air Law and Regulations",

    progress: 100,

    score: 88,

    notes:
      "Ground school module completed.",
  },

  {
    id: "TRN-008",
    trainingNumber: "TR-2026-008",

    studentId: "STU-008",
    student: "Mason Lewis",

    instructorId: "INS-004",
    instructor: "James Wilson",

    aircraft: "SIM-02",
    aircraftType: "A320 Simulator",

    trainingType: "Simulator Training",
    status: "Cancelled",

    date: "2026-08-20",
    startTime: "13:00",
    endTime: "15:00",
    duration: "2h",

    location: "Simulator Centre",

    lessonCode: "SIM-14",
    lessonTitle: "Abnormal Procedures",

    progress: 20,

    notes:
      "Session cancelled due to simulator maintenance.",
  },
];