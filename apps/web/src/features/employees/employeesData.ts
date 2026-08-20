export type EmployeeStatus =
  | "Active"
  | "On Leave"
  | "Inactive";

export type EmployeeRole =
  | "Flight Instructor"
  | "Senior Flight Instructor"
  | "Chief Flight Instructor"
  | "Simulator Instructor"
  | "Maintenance Technician"
  | "Operations Coordinator"
  | "Operations Manager"
  | "Dispatcher"
  | "Administrator"
  | "Finance"
  | "HR"
  | "IT Support";

export type EmploymentType =
  | "Full Time"
  | "Part Time"
  | "Contract";

export type Employee = {
  id: string;
  employeeNumber: string;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  role: EmployeeRole;
  department: string;
  employmentType: EmploymentType;
  status: EmployeeStatus;

  hireDate: string;
  dateOfBirth?: string;

  license?: string;
  certifications?: string[];

  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;

  emergencyContactName?: string;
  emergencyContactPhone?: string;

  supervisor?: string;

  notes?: string;
};

export const employeeData: Employee[] = [
  {
    id: "EMP-001",
    employeeNumber: "EMP-1001",
    firstName: "Michael",
    lastName: "Anderson",
    email: "michael.anderson@fsms.ca",
    phone: "(519) 555-0101",
    role: "Chief Flight Instructor",
    department: "Flight Operations",
    employmentType: "Full Time",
    status: "Active",
    hireDate: "2021-04-12",
    license: "ATPL",
    certifications: [
      "Flight Instructor Rating",
      "Instrument Rating",
      "Multi-Engine Rating",
    ],
    address: "125 Aviation Drive",
    city: "London",
    province: "ON",
    postalCode: "N5V 3B5",
    emergencyContactName: "Sarah Anderson",
    emergencyContactPhone: "(519) 555-0191",
    supervisor: "David Wilson",
    notes: "Chief instructor responsible for flight training standards and instructor supervision.",
  },

  {
    id: "EMP-002",
    employeeNumber: "EMP-1002",
    firstName: "Sarah",
    lastName: "Mitchell",
    email: "sarah.mitchell@fsms.ca",
    phone: "(519) 555-0102",
    role: "Senior Flight Instructor",
    department: "Flight Operations",
    employmentType: "Full Time",
    status: "Active",
    hireDate: "2022-01-17",
    license: "CPL",
    certifications: [
      "Flight Instructor Rating",
      "Instrument Rating",
    ],
    address: "42 Oxford Street",
    city: "London",
    province: "ON",
    postalCode: "N6A 2M4",
    emergencyContactName: "James Mitchell",
    emergencyContactPhone: "(519) 555-0192",
    supervisor: "Michael Anderson",
    notes: "Senior instructor supporting commercial and instrument flight training.",
  },

  {
    id: "EMP-003",
    employeeNumber: "EMP-1003",
    firstName: "Daniel",
    lastName: "Roberts",
    email: "daniel.roberts@fsms.ca",
    phone: "(519) 555-0103",
    role: "Flight Instructor",
    department: "Flight Operations",
    employmentType: "Full Time",
    status: "Active",
    hireDate: "2023-06-05",
    license: "CPL",
    certifications: [
      "Flight Instructor Rating",
    ],
    address: "18 Richmond Street",
    city: "London",
    province: "ON",
    postalCode: "N6A 3B4",
    supervisor: "Sarah Mitchell",
    notes: "Primary flight instructor for private and commercial students.",
  },

  {
    id: "EMP-004",
    employeeNumber: "EMP-1004",
    firstName: "Emily",
    lastName: "Turner",
    email: "emily.turner@fsms.ca",
    phone: "(519) 555-0104",
    role: "Simulator Instructor",
    department: "Training",
    employmentType: "Full Time",
    status: "Active",
    hireDate: "2022-09-19",
    license: "CPL",
    certifications: [
      "Simulator Instructor",
      "Instrument Rating",
    ],
    address: "76 Wellington Road",
    city: "London",
    province: "ON",
    postalCode: "N6C 4R5",
    supervisor: "Michael Anderson",
    notes: "Responsible for simulator-based instrument and emergency procedure training.",
  },

  {
    id: "EMP-005",
    employeeNumber: "EMP-1005",
    firstName: "James",
    lastName: "Carter",
    email: "james.carter@fsms.ca",
    phone: "(519) 555-0105",
    role: "Maintenance Technician",
    department: "Maintenance",
    employmentType: "Full Time",
    status: "Active",
    hireDate: "2020-11-02",
    license: "AME",
    certifications: [
      "M1 AME",
      "Aircraft Maintenance",
    ],
    address: "91 Clarke Road",
    city: "London",
    province: "ON",
    postalCode: "N5W 5P4",
    emergencyContactName: "Laura Carter",
    emergencyContactPhone: "(519) 555-0195",
    supervisor: "Robert Hughes",
    notes: "Aircraft maintenance technician responsible for inspections and scheduled maintenance.",
  },

  {
    id: "EMP-006",
    employeeNumber: "EMP-1006",
    firstName: "Olivia",
    lastName: "Bennett",
    email: "olivia.bennett@fsms.ca",
    phone: "(519) 555-0106",
    role: "Operations Coordinator",
    department: "Operations",
    employmentType: "Full Time",
    status: "Active",
    hireDate: "2024-02-12",
    address: "22 King Street",
    city: "London",
    province: "ON",
    postalCode: "N6A 1C5",
    supervisor: "Robert Hughes",
    notes: "Coordinates daily flight operations, instructors and aircraft availability.",
  },

  {
    id: "EMP-007",
    employeeNumber: "EMP-1007",
    firstName: "Robert",
    lastName: "Hughes",
    email: "robert.hughes@fsms.ca",
    phone: "(519) 555-0107",
    role: "Operations Manager",
    department: "Operations",
    employmentType: "Full Time",
    status: "Active",
    hireDate: "2019-08-26",
    address: "14 Commissioners Road",
    city: "London",
    province: "ON",
    postalCode: "N6C 2T8",
    supervisor: "General Manager",
    notes: "Responsible for overall operational coordination and resource planning.",
  },

  {
    id: "EMP-008",
    employeeNumber: "EMP-1008",
    firstName: "Sophia",
    lastName: "Walker",
    email: "sophia.walker@fsms.ca",
    phone: "(519) 555-0108",
    role: "Administrator",
    department: "Administration",
    employmentType: "Full Time",
    status: "Active",
    hireDate: "2023-03-13",
    address: "53 Adelaide Street",
    city: "London",
    province: "ON",
    postalCode: "N6B 1R3",
    supervisor: "Robert Hughes",
    notes: "Administrative support for employees, students and operational records.",
  },

  {
    id: "EMP-009",
    employeeNumber: "EMP-1009",
    firstName: "William",
    lastName: "Collins",
    email: "william.collins@fsms.ca",
    phone: "(519) 555-0109",
    role: "Dispatcher",
    department: "Flight Operations",
    employmentType: "Part Time",
    status: "Active",
    hireDate: "2024-05-06",
    address: "88 Dundas Street",
    city: "London",
    province: "ON",
    postalCode: "N6A 1G7",
    supervisor: "Olivia Bennett",
    notes: "Supports daily dispatch and operational communication.",
  },

  {
    id: "EMP-010",
    employeeNumber: "EMP-1010",
    firstName: "Grace",
    lastName: "Morgan",
    email: "grace.morgan@fsms.ca",
    phone: "(519) 555-0110",
    role: "HR",
    department: "Human Resources",
    employmentType: "Full Time",
    status: "On Leave",
    hireDate: "2021-10-18",
    address: "31 Hamilton Road",
    city: "London",
    province: "ON",
    postalCode: "N5Z 1S2",
    supervisor: "General Manager",
    notes: "Employee currently on approved leave.",
  },
];

export default employeeData;