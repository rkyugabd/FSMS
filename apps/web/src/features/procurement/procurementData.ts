export type ProcurementStatus =
  | "Draft"
  | "Pending Approval"
  | "Approved"
  | "Ordered"
  | "Partially Received"
  | "Received"
  | "Cancelled";

export type ProcurementCategory =
  | "Aircraft Parts"
  | "Maintenance Supplies"
  | "Fuel & Lubricants"
  | "Safety Equipment"
  | "Simulator Parts"
  | "Training Supplies"
  | "Office Supplies";

export type ProcurementPriority =
  | "Low"
  | "Normal"
  | "High"
  | "Urgent";

export type ProcurementItem = {
  id: string;
  description: string;
  partNumber?: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

export type PurchaseOrder = {
  id: string;
  poNumber: string;
  orderDate: string;

  vendor: string;
  vendorContact?: string;

  category: ProcurementCategory;
  priority: ProcurementPriority;
  status: ProcurementStatus;

  requester: string;
  department: string;

  aircraft?: string;
  maintenanceReference?: string;

  expectedDelivery?: string;
  receivedDate?: string;

  currency: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;

  items: ProcurementItem[];

  notes?: string;
};

export const procurementData: PurchaseOrder[] = [
  {
    id: "PO-001",
    poNumber: "PO-2026-001",
    orderDate: "2026-08-01",

    vendor: "Aviation Supply Canada",
    vendorContact: "orders@aviationsupply.ca",

    category: "Aircraft Parts",
    priority: "High",
    status: "Ordered",

    requester: "Daniel Morgan",
    department: "Maintenance",

    aircraft: "C-GABC",
    maintenanceReference: "MX-2026-014",

    expectedDelivery: "2026-08-22",

    currency: "CAD",
    subtotal: 1840,
    tax: 239.2,
    shipping: 75,
    total: 2154.2,

    items: [
      {
        id: "ITEM-001",
        description: "Oil Filter",
        partNumber: "CH48110-1",
        quantity: 4,
        unitPrice: 85,
        total: 340,
      },
      {
        id: "ITEM-002",
        description: "Air Filter",
        partNumber: "BA-4106",
        quantity: 2,
        unitPrice: 145,
        total: 290,
      },
      {
        id: "ITEM-003",
        description: "Spark Plug Set",
        partNumber: "REM40E",
        quantity: 6,
        unitPrice: 201.67,
        total: 1210,
      },
    ],

    notes:
      "Required for scheduled 100-hour maintenance inspection.",
  },

  {
    id: "PO-002",
    poNumber: "PO-2026-002",
    orderDate: "2026-08-03",

    vendor: "Flight Safety Equipment Ltd.",
    vendorContact: "sales@flightsafety.ca",

    category: "Safety Equipment",
    priority: "Normal",
    status: "Pending Approval",

    requester: "Sarah Williams",
    department: "Operations",

    expectedDelivery: "2026-08-28",

    currency: "CAD",
    subtotal: 920,
    tax: 119.6,
    shipping: 35,
    total: 1074.6,

    items: [
      {
        id: "ITEM-004",
        description: "Emergency First Aid Kit",
        partNumber: "FAK-200",
        quantity: 4,
        unitPrice: 145,
        total: 580,
      },
      {
        id: "ITEM-005",
        description: "Aircraft Fire Extinguisher",
        partNumber: "FE-1211",
        quantity: 2,
        unitPrice: 170,
        total: 340,
      },
    ],

    notes:
      "Replacement equipment for training aircraft.",
  },

  {
    id: "PO-003",
    poNumber: "PO-2026-003",
    orderDate: "2026-08-05",

    vendor: "Petro Aviation Fuels",
    vendorContact: "commercial@petroaviation.ca",

    category: "Fuel & Lubricants",
    priority: "High",
    status: "Approved",

    requester: "Michael Brown",
    department: "Flight Operations",

    expectedDelivery: "2026-08-20",

    currency: "CAD",
    subtotal: 3250,
    tax: 422.5,
    shipping: 0,
    total: 3672.5,

    items: [
      {
        id: "ITEM-006",
        description: "Aviation Engine Oil",
        partNumber: "AERO-OIL-15W50",
        quantity: 20,
        unitPrice: 95,
        total: 1900,
      },
      {
        id: "ITEM-007",
        description: "Aviation Fuel",
        partNumber: "100LL",
        quantity: 1000,
        unitPrice: 1.35,
        total: 1350,
      },
    ],

    notes:
      "Monthly fuel and lubricant replenishment.",
  },

  {
    id: "PO-004",
    poNumber: "PO-2026-004",
    orderDate: "2026-08-06",

    vendor: "CAE Simulation Supplies",
    vendorContact: "support@caesimulation.ca",

    category: "Simulator Parts",
    priority: "Normal",
    status: "Partially Received",

    requester: "Emily Carter",
    department: "Training",

    expectedDelivery: "2026-08-18",

    currency: "CAD",
    subtotal: 1480,
    tax: 192.4,
    shipping: 50,
    total: 1722.4,

    items: [
      {
        id: "ITEM-008",
        description: "Simulator Control Panel Module",
        partNumber: "SIM-CTRL-204",
        quantity: 2,
        unitPrice: 540,
        total: 1080,
      },
      {
        id: "ITEM-009",
        description: "Display Interface Cable",
        partNumber: "SIM-CBL-88",
        quantity: 4,
        unitPrice: 100,
        total: 400,
      },
    ],

    notes:
      "Two control modules ordered for simulator maintenance.",
  },

  {
    id: "PO-005",
    poNumber: "PO-2026-005",
    orderDate: "2026-08-08",

    vendor: "Canadian Aviation Training Supply",
    vendorContact: "orders@catraining.ca",

    category: "Training Supplies",
    priority: "Normal",
    status: "Received",

    requester: "Emily Carter",
    department: "Training",

    receivedDate: "2026-08-14",

    currency: "CAD",
    subtotal: 640,
    tax: 83.2,
    shipping: 25,
    total: 748.2,

    items: [
      {
        id: "ITEM-010",
        description: "Navigation Training Charts",
        partNumber: "CHART-VFR-2026",
        quantity: 20,
        unitPrice: 22,
        total: 440,
      },
      {
        id: "ITEM-011",
        description: "Student Training Logbooks",
        partNumber: "LOG-STD-01",
        quantity: 20,
        unitPrice: 10,
        total: 200,
      },
    ],

    notes:
      "Training materials received and distributed to instructors.",
  },

  {
    id: "PO-006",
    poNumber: "PO-2026-006",
    orderDate: "2026-08-09",

    vendor: "Aircraft Maintenance Tools Inc.",
    vendorContact: "sales@amtools.ca",

    category: "Maintenance Supplies",
    priority: "Urgent",
    status: "Pending Approval",

    requester: "Daniel Morgan",
    department: "Maintenance",

    aircraft: "C-GXYZ",
    maintenanceReference: "MX-2026-019",

    expectedDelivery: "2026-08-25",

    currency: "CAD",
    subtotal: 2240,
    tax: 291.2,
    shipping: 60,
    total: 2591.2,

    items: [
      {
        id: "ITEM-012",
        description: "Torque Wrench Set",
        partNumber: "TW-500",
        quantity: 2,
        unitPrice: 720,
        total: 1440,
      },
      {
        id: "ITEM-013",
        description: "Safety Wire Kit",
        partNumber: "SW-KIT-20",
        quantity: 4,
        unitPrice: 200,
        total: 800,
      },
    ],

    notes:
      "Tools required for upcoming scheduled maintenance.",
  },

  {
    id: "PO-007",
    poNumber: "PO-2026-007",
    orderDate: "2026-08-10",

    vendor: "OfficePro Canada",
    vendorContact: "orders@officepro.ca",

    category: "Office Supplies",
    priority: "Low",
    status: "Received",

    requester: "Laura Wilson",
    department: "Administration",

    receivedDate: "2026-08-15",

    currency: "CAD",
    subtotal: 385,
    tax: 50.05,
    shipping: 15,
    total: 450.05,

    items: [
      {
        id: "ITEM-014",
        description: "Printer Paper",
        quantity: 20,
        unitPrice: 12.5,
        total: 250,
      },
      {
        id: "ITEM-015",
        description: "Printer Toner",
        partNumber: "TONER-HP-410",
        quantity: 1,
        unitPrice: 135,
        total: 135,
      },
    ],

    notes:
      "General office replenishment.",
  },

  {
    id: "PO-008",
    poNumber: "PO-2026-008",
    orderDate: "2026-08-11",

    vendor: "Aero Parts Ontario",
    vendorContact: "sales@aeroparts.on.ca",

    category: "Aircraft Parts",
    priority: "Urgent",
    status: "Draft",

    requester: "Daniel Morgan",
    department: "Maintenance",

    aircraft: "C-GABC",
    maintenanceReference: "MX-2026-021",

    currency: "CAD",
    subtotal: 760,
    tax: 98.8,
    shipping: 35,
    total: 893.8,

    items: [
      {
        id: "ITEM-016",
        description: "Landing Gear Bushing",
        partNumber: "LG-BUSH-112",
        quantity: 4,
        unitPrice: 120,
        total: 480,
      },
      {
        id: "ITEM-017",
        description: "Retaining Ring",
        partNumber: "RR-44",
        quantity: 8,
        unitPrice: 35,
        total: 280,
      },
    ],

    notes:
      "Draft order pending final maintenance inspection.",
  },

  {
    id: "PO-009",
    poNumber: "PO-2026-009",
    orderDate: "2026-08-12",

    vendor: "Aviation Safety Canada",
    vendorContact: "orders@aviationsafety.ca",

    category: "Safety Equipment",
    priority: "High",
    status: "Ordered",

    requester: "Sarah Williams",
    department: "Operations",

    expectedDelivery: "2026-08-26",

    currency: "CAD",
    subtotal: 1120,
    tax: 145.6,
    shipping: 40,
    total: 1305.6,

    items: [
      {
        id: "ITEM-018",
        description: "Aircraft Emergency Locator Battery",
        partNumber: "ELT-BAT-12",
        quantity: 4,
        unitPrice: 280,
        total: 1120,
      },
    ],

    notes:
      "Replacement ELT batteries for fleet aircraft.",
  },

  {
    id: "PO-010",
    poNumber: "PO-2026-010",
    orderDate: "2026-08-13",

    vendor: "Canadian Aviation Supplies",
    vendorContact: "sales@casupplies.ca",

    category: "Aircraft Parts",
    priority: "Normal",
    status: "Cancelled",

    requester: "Daniel Morgan",
    department: "Maintenance",

    aircraft: "C-GDEF",

    currency: "CAD",
    subtotal: 980,
    tax: 127.4,
    shipping: 30,
    total: 1137.4,

    items: [
      {
        id: "ITEM-019",
        description: "Fuel Pump Assembly",
        partNumber: "FP-220",
        quantity: 1,
        unitPrice: 980,
        total: 980,
      },
    ],

    notes:
      "Cancelled after alternate part was found in inventory.",
  },
];