export type AnalyticsPeriod =
  | "7d"
  | "30d"
  | "90d"
  | "12m";

export type AnalyticsMetricTrend =
  | "up"
  | "down"
  | "neutral";

export type AnalyticsKpi = {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: AnalyticsMetricTrend;
  description: string;
};

export type FlightTrendItem = {
  label: string;
  flights: number;
  flightHours: number;
  utilization: number;
};

export type RevenueExpenseItem = {
  label: string;
  revenue: number;
  expenses: number;
};

export type AircraftUtilizationItem = {
  aircraft: string;
  type: string;
  utilization: number;
  flightHours: number;
  status: "Available" | "Maintenance" | "Scheduled";
};

export type MaintenanceCostItem = {
  category: string;
  cost: number;
  percentage: number;
};

export type TrainingProgressItem = {
  label: string;
  students: number;
  percentage: number;
};

export type AnalyticsInsight = {
  id: string;
  type: "warning" | "positive" | "info";
  title: string;
  description: string;
  metric?: string;
  actionLabel?: string;
};

export type AnalyticsData = {
  kpis: AnalyticsKpi[];
  flightTrend: FlightTrendItem[];
  revenueExpense: RevenueExpenseItem[];
  aircraftUtilization: AircraftUtilizationItem[];
  maintenanceCosts: MaintenanceCostItem[];
  trainingProgress: TrainingProgressItem[];
  insights: AnalyticsInsight[];
};

export const analyticsPeriods: {
  value: AnalyticsPeriod;
  label: string;
}[] = [
  {
    value: "7d",
    label: "Last 7 Days",
  },
  {
    value: "30d",
    label: "Last 30 Days",
  },
  {
    value: "90d",
    label: "Last 90 Days",
  },
  {
    value: "12m",
    label: "Last 12 Months",
  },
];

export const analyticsDataByPeriod: Record<
  AnalyticsPeriod,
  AnalyticsData
> = {
  "7d": {
    kpis: [
      {
        id: "revenue",
        label: "Total Revenue",
        value: "$68,420",
        change: "+8.4%",
        trend: "up",
        description: "vs previous period",
      },
      {
        id: "operating-cost",
        label: "Operating Cost",
        value: "$41,860",
        change: "+4.2%",
        trend: "up",
        description: "vs previous period",
      },
      {
        id: "flight-hours",
        label: "Flight Hours",
        value: "284h",
        change: "+11.7%",
        trend: "up",
        description: "vs previous period",
      },
      {
        id: "aircraft-utilization",
        label: "Aircraft Utilization",
        value: "82.4%",
        change: "+5.1%",
        trend: "up",
        description: "fleet utilization",
      },
      {
        id: "active-students",
        label: "Active Students",
        value: "148",
        change: "+6.2%",
        trend: "up",
        description: "currently training",
      },
      {
        id: "training-completion",
        label: "Training Completion",
        value: "74.8%",
        change: "+3.2%",
        trend: "up",
        description: "program completion",
      },
      {
        id: "maintenance-cost",
        label: "Maintenance Cost",
        value: "$9,840",
        change: "+12.6%",
        trend: "up",
        description: "vs previous period",
      },
      {
        id: "labour-cost",
        label: "Labour Cost",
        value: "$14,620",
        change: "-2.8%",
        trend: "down",
        description: "vs previous period",
      },
    ],

    flightTrend: [
      {
        label: "Mon",
        flights: 32,
        flightHours: 41,
        utilization: 72,
      },
      {
        label: "Tue",
        flights: 38,
        flightHours: 48,
        utilization: 78,
      },
      {
        label: "Wed",
        flights: 44,
        flightHours: 57,
        utilization: 84,
      },
      {
        label: "Thu",
        flights: 41,
        flightHours: 53,
        utilization: 81,
      },
      {
        label: "Fri",
        flights: 47,
        flightHours: 62,
        utilization: 89,
      },
      {
        label: "Sat",
        flights: 45,
        flightHours: 58,
        utilization: 87,
      },
      {
        label: "Sun",
        flights: 37,
        flightHours: 45,
        utilization: 76,
      },
    ],

    revenueExpense: [
      {
        label: "Mon",
        revenue: 8200,
        expenses: 5100,
      },
      {
        label: "Tue",
        revenue: 9100,
        expenses: 5400,
      },
      {
        label: "Wed",
        revenue: 10400,
        expenses: 6100,
      },
      {
        label: "Thu",
        revenue: 9800,
        expenses: 5900,
      },
      {
        label: "Fri",
        revenue: 11200,
        expenses: 6800,
      },
      {
        label: "Sat",
        revenue: 10800,
        expenses: 7100,
      },
      {
        label: "Sun",
        revenue: 8920,
        expenses: 5460,
      },
    ],

    aircraftUtilization: [
      {
        aircraft: "C-GABC",
        type: "Cessna 172",
        utilization: 94,
        flightHours: 48,
        status: "Scheduled",
      },
      {
        aircraft: "C-GXYZ",
        type: "Cessna 172",
        utilization: 88,
        flightHours: 44,
        status: "Available",
      },
      {
        aircraft: "C-GKLM",
        type: "Diamond DA40",
        utilization: 84,
        flightHours: 42,
        status: "Scheduled",
      },
      {
        aircraft: "C-GPQR",
        type: "Cessna 152",
        utilization: 79,
        flightHours: 39,
        status: "Available",
      },
      {
        aircraft: "C-GDEF",
        type: "Cessna 172",
        utilization: 72,
        flightHours: 36,
        status: "Maintenance",
      },
      {
        aircraft: "C-GHIJ",
        type: "Diamond DA42",
        utilization: 68,
        flightHours: 34,
        status: "Scheduled",
      },
    ],

    maintenanceCosts: [
      {
        category: "Engine",
        cost: 3240,
        percentage: 33,
      },
      {
        category: "Airframe",
        cost: 2160,
        percentage: 22,
      },
      {
        category: "Avionics",
        cost: 1770,
        percentage: 18,
      },
      {
        category: "Parts",
        cost: 1480,
        percentage: 15,
      },
      {
        category: "Inspection",
        cost: 1190,
        percentage: 12,
      },
    ],

    trainingProgress: [
      {
        label: "Ground School",
        students: 148,
        percentage: 82,
      },
      {
        label: "Flight Training",
        students: 132,
        percentage: 76,
      },
      {
        label: "Solo Flight",
        students: 86,
        percentage: 58,
      },
      {
        label: "Instrument",
        students: 64,
        percentage: 44,
      },
      {
        label: "Commercial",
        students: 38,
        percentage: 31,
      },
    ],

    insights: [
      {
        id: "maintenance-increase",
        type: "warning",
        title: "Maintenance Cost Increased",
        description:
          "Maintenance spending is above the expected operating baseline. Engine-related maintenance is the largest contributor.",
        metric: "+12.6%",
        actionLabel: "View Maintenance",
      },
      {
        id: "fleet-utilization",
        type: "positive",
        title: "Fleet Utilization Improving",
        description:
          "Aircraft utilization increased across the fleet, with C-GABC currently operating at the highest utilization rate.",
        metric: "82.4%",
        actionLabel: "View Aircraft",
      },
      {
        id: "training-risk",
        type: "warning",
        title: "Training Progress Requires Attention",
        description:
          "Several students are progressing below the expected milestone for their current training program.",
        metric: "12 students",
        actionLabel: "View Students",
      },
      {
        id: "labour-efficiency",
        type: "positive",
        title: "Labour Cost Efficiency Improved",
        description:
          "Labour cost decreased while flight activity increased, indicating improved workforce utilization.",
        metric: "-2.8%",
        actionLabel: "View Workforce",
      },
    ],
  },

  "30d": {
    kpis: [
      {
        id: "revenue",
        label: "Total Revenue",
        value: "$284,620",
        change: "+8.4%",
        trend: "up",
        description: "vs previous period",
      },
      {
        id: "operating-cost",
        label: "Operating Cost",
        value: "$168,430",
        change: "+4.2%",
        trend: "up",
        description: "vs previous period",
      },
      {
        id: "flight-hours",
        label: "Flight Hours",
        value: "1,284h",
        change: "+11.7%",
        trend: "up",
        description: "vs previous period",
      },
      {
        id: "aircraft-utilization",
        label: "Aircraft Utilization",
        value: "82.4%",
        change: "+5.1%",
        trend: "up",
        description: "fleet utilization",
      },
      {
        id: "active-students",
        label: "Active Students",
        value: "148",
        change: "+6.2%",
        trend: "up",
        description: "currently training",
      },
      {
        id: "training-completion",
        label: "Training Completion",
        value: "74.8%",
        change: "+3.2%",
        trend: "up",
        description: "program completion",
      },
      {
        id: "maintenance-cost",
        label: "Maintenance Cost",
        value: "$38,420",
        change: "+12.6%",
        trend: "up",
        description: "vs previous period",
      },
      {
        id: "labour-cost",
        label: "Labour Cost",
        value: "$56,820",
        change: "-2.8%",
        trend: "down",
        description: "vs previous period",
      },
    ],

    flightTrend: [
      {
        label: "Week 1",
        flights: 174,
        flightHours: 214,
        utilization: 75,
      },
      {
        label: "Week 2",
        flights: 188,
        flightHours: 238,
        utilization: 79,
      },
      {
        label: "Week 3",
        flights: 214,
        flightHours: 269,
        utilization: 85,
      },
      {
        label: "Week 4",
        flights: 226,
        flightHours: 284,
        utilization: 88,
      },
    ],

    revenueExpense: [
      {
        label: "Week 1",
        revenue: 63400,
        expenses: 40800,
      },
      {
        label: "Week 2",
        revenue: 68400,
        expenses: 41200,
      },
      {
        label: "Week 3",
        revenue: 73400,
        expenses: 43700,
      },
      {
        label: "Week 4",
        revenue: 79600,
        expenses: 42730,
      },
    ],

    aircraftUtilization: [
      {
        aircraft: "C-GABC",
        type: "Cessna 172",
        utilization: 94,
        flightHours: 188,
        status: "Scheduled",
      },
      {
        aircraft: "C-GXYZ",
        type: "Cessna 172",
        utilization: 88,
        flightHours: 176,
        status: "Available",
      },
      {
        aircraft: "C-GKLM",
        type: "Diamond DA40",
        utilization: 84,
        flightHours: 168,
        status: "Scheduled",
      },
      {
        aircraft: "C-GPQR",
        type: "Cessna 152",
        utilization: 79,
        flightHours: 158,
        status: "Available",
      },
      {
        aircraft: "C-GDEF",
        type: "Cessna 172",
        utilization: 72,
        flightHours: 144,
        status: "Maintenance",
      },
      {
        aircraft: "C-GHIJ",
        type: "Diamond DA42",
        utilization: 68,
        flightHours: 136,
        status: "Scheduled",
      },
    ],

    maintenanceCosts: [
      {
        category: "Engine",
        cost: 12600,
        percentage: 33,
      },
      {
        category: "Airframe",
        cost: 8450,
        percentage: 22,
      },
      {
        category: "Avionics",
        cost: 6915,
        percentage: 18,
      },
      {
        category: "Parts",
        cost: 5763,
        percentage: 15,
      },
      {
        category: "Inspection",
        cost: 4612,
        percentage: 12,
      },
    ],

    trainingProgress: [
      {
        label: "Ground School",
        students: 148,
        percentage: 82,
      },
      {
        label: "Flight Training",
        students: 132,
        percentage: 76,
      },
      {
        label: "Solo Flight",
        students: 86,
        percentage: 58,
      },
      {
        label: "Instrument",
        students: 64,
        percentage: 44,
      },
      {
        label: "Commercial",
        students: 38,
        percentage: 31,
      },
    ],

    insights: [
      {
        id: "maintenance-increase",
        type: "warning",
        title: "Maintenance Cost Increased",
        description:
          "Maintenance spending is 18.6% above the monthly operating baseline.",
        metric: "+18.6%",
        actionLabel: "View Maintenance",
      },
      {
        id: "fleet-utilization",
        type: "positive",
        title: "Fleet Utilization Improving",
        description:
          "Fleet utilization increased 5.1% over the last 30 days.",
        metric: "82.4%",
        actionLabel: "View Aircraft",
      },
      {
        id: "training-risk",
        type: "warning",
        title: "Student Progress Risk",
        description:
          "12 students are currently below the expected training milestone.",
        metric: "12 students",
        actionLabel: "View Students",
      },
      {
        id: "labour-efficiency",
        type: "positive",
        title: "Labour Efficiency Improved",
        description:
          "Labour cost decreased while total operational activity increased.",
        metric: "-2.8%",
        actionLabel: "View Workforce",
      },
    ],
  },

  "90d": {
    kpis: [
      {
        id: "revenue",
        label: "Total Revenue",
        value: "$824,680",
        change: "+10.8%",
        trend: "up",
        description: "vs previous period",
      },
      {
        id: "operating-cost",
        label: "Operating Cost",
        value: "$492,240",
        change: "+5.4%",
        trend: "up",
        description: "vs previous period",
      },
      {
        id: "flight-hours",
        label: "Flight Hours",
        value: "3,842h",
        change: "+14.2%",
        trend: "up",
        description: "vs previous period",
      },
      {
        id: "aircraft-utilization",
        label: "Aircraft Utilization",
        value: "81.2%",
        change: "+4.6%",
        trend: "up",
        description: "fleet utilization",
      },
      {
        id: "active-students",
        label: "Active Students",
        value: "152",
        change: "+8.1%",
        trend: "up",
        description: "currently training",
      },
      {
        id: "training-completion",
        label: "Training Completion",
        value: "72.6%",
        change: "+4.1%",
        trend: "up",
        description: "program completion",
      },
      {
        id: "maintenance-cost",
        label: "Maintenance Cost",
        value: "$104,860",
        change: "+9.4%",
        trend: "up",
        description: "vs previous period",
      },
      {
        id: "labour-cost",
        label: "Labour Cost",
        value: "$168,240",
        change: "-1.9%",
        trend: "down",
        description: "vs previous period",
      },
    ],

    flightTrend: [
      {
        label: "Jan",
        flights: 612,
        flightHours: 768,
        utilization: 74,
      },
      {
        label: "Feb",
        flights: 684,
        flightHours: 852,
        utilization: 79,
      },
      {
        label: "Mar",
        flights: 742,
        flightHours: 928,
        utilization: 84,
      },
      {
        label: "Apr",
        flights: 806,
        flightHours: 1014,
        utilization: 88,
      },
    ],

    revenueExpense: [
      {
        label: "Jan",
        revenue: 184000,
        expenses: 121000,
      },
      {
        label: "Feb",
        revenue: 198000,
        expenses: 125000,
      },
      {
        label: "Mar",
        revenue: 216000,
        expenses: 128000,
      },
      {
        label: "Apr",
        revenue: 226680,
        expenses: 118240,
      },
    ],

    aircraftUtilization: [
      {
        aircraft: "C-GABC",
        type: "Cessna 172",
        utilization: 93,
        flightHours: 572,
        status: "Scheduled",
      },
      {
        aircraft: "C-GXYZ",
        type: "Cessna 172",
        utilization: 89,
        flightHours: 548,
        status: "Available",
      },
      {
        aircraft: "C-GKLM",
        type: "Diamond DA40",
        utilization: 85,
        flightHours: 524,
        status: "Scheduled",
      },
      {
        aircraft: "C-GPQR",
        type: "Cessna 152",
        utilization: 79,
        flightHours: 486,
        status: "Available",
      },
      {
        aircraft: "C-GDEF",
        type: "Cessna 172",
        utilization: 71,
        flightHours: 438,
        status: "Maintenance",
      },
      {
        aircraft: "C-GHIJ",
        type: "Diamond DA42",
        utilization: 67,
        flightHours: 414,
        status: "Scheduled",
      },
    ],

    maintenanceCosts: [
      {
        category: "Engine",
        cost: 34600,
        percentage: 33,
      },
      {
        category: "Airframe",
        cost: 23069,
        percentage: 22,
      },
      {
        category: "Avionics",
        cost: 18875,
        percentage: 18,
      },
      {
        category: "Parts",
        cost: 15729,
        percentage: 15,
      },
      {
        category: "Inspection",
        cost: 12587,
        percentage: 12,
      },
    ],

    trainingProgress: [
      {
        label: "Ground School",
        students: 152,
        percentage: 84,
      },
      {
        label: "Flight Training",
        students: 138,
        percentage: 78,
      },
      {
        label: "Solo Flight",
        students: 92,
        percentage: 61,
      },
      {
        label: "Instrument",
        students: 68,
        percentage: 47,
      },
      {
        label: "Commercial",
        students: 41,
        percentage: 34,
      },
    ],

    insights: [
      {
        id: "revenue-growth",
        type: "positive",
        title: "Revenue Growth Accelerating",
        description:
          "Revenue has grown faster than operating expenses over the selected period.",
        metric: "+10.8%",
        actionLabel: "View Finance",
      },
      {
        id: "maintenance-increase",
        type: "warning",
        title: "Maintenance Spending Trending Up",
        description:
          "Maintenance expenditure increased primarily because of engine and airframe work.",
        metric: "+9.4%",
        actionLabel: "View Maintenance",
      },
      {
        id: "fleet-utilization",
        type: "positive",
        title: "Fleet Utilization Healthy",
        description:
          "Average fleet utilization remains above the operational target.",
        metric: "81.2%",
        actionLabel: "View Aircraft",
      },
      {
        id: "training-risk",
        type: "info",
        title: "Training Pipeline Stable",
        description:
          "Student progression is improving with the strongest completion rate in ground school.",
        metric: "72.6%",
        actionLabel: "View Training",
      },
    ],
  },

  "12m": {
    kpis: [
      {
        id: "revenue",
        label: "Total Revenue",
        value: "$3.42M",
        change: "+12.4%",
        trend: "up",
        description: "year over year",
      },
      {
        id: "operating-cost",
        label: "Operating Cost",
        value: "$2.04M",
        change: "+6.8%",
        trend: "up",
        description: "year over year",
      },
      {
        id: "flight-hours",
        label: "Flight Hours",
        value: "15,842h",
        change: "+16.2%",
        trend: "up",
        description: "year over year",
      },
      {
        id: "aircraft-utilization",
        label: "Aircraft Utilization",
        value: "79.8%",
        change: "+3.9%",
        trend: "up",
        description: "fleet utilization",
      },
      {
        id: "active-students",
        label: "Active Students",
        value: "164",
        change: "+11.4%",
        trend: "up",
        description: "current enrollment",
      },
      {
        id: "training-completion",
        label: "Training Completion",
        value: "71.8%",
        change: "+5.2%",
        trend: "up",
        description: "program completion",
      },
      {
        id: "maintenance-cost",
        label: "Maintenance Cost",
        value: "$428K",
        change: "+7.8%",
        trend: "up",
        description: "year over year",
      },
      {
        id: "labour-cost",
        label: "Labour Cost",
        value: "$682K",
        change: "-1.4%",
        trend: "down",
        description: "year over year",
      },
    ],

    flightTrend: [
      {
        label: "Jan",
        flights: 520,
        flightHours: 642,
        utilization: 72,
      },
      {
        label: "Feb",
        flights: 548,
        flightHours: 681,
        utilization: 74,
      },
      {
        label: "Mar",
        flights: 574,
        flightHours: 718,
        utilization: 76,
      },
      {
        label: "Apr",
        flights: 602,
        flightHours: 754,
        utilization: 78,
      },
      {
        label: "May",
        flights: 628,
        flightHours: 786,
        utilization: 80,
      },
      {
        label: "Jun",
        flights: 654,
        flightHours: 818,
        utilization: 82,
      },
      {
        label: "Jul",
        flights: 682,
        flightHours: 854,
        utilization: 84,
      },
      {
        label: "Aug",
        flights: 704,
        flightHours: 882,
        utilization: 85,
      },
      {
        label: "Sep",
        flights: 716,
        flightHours: 894,
        utilization: 83,
      },
      {
        label: "Oct",
        flights: 698,
        flightHours: 872,
        utilization: 81,
      },
      {
        label: "Nov",
        flights: 662,
        flightHours: 828,
        utilization: 78,
      },
      {
        label: "Dec",
        flights: 634,
        flightHours: 792,
        utilization: 76,
      },
    ],

    revenueExpense: [
      {
        label: "Jan",
        revenue: 244000,
        expenses: 158000,
      },
      {
        label: "Feb",
        revenue: 251000,
        expenses: 161000,
      },
      {
        label: "Mar",
        revenue: 268000,
        expenses: 164000,
      },
      {
        label: "Apr",
        revenue: 276000,
        expenses: 169000,
      },
      {
        label: "May",
        revenue: 284000,
        expenses: 171000,
      },
      {
        label: "Jun",
        revenue: 296000,
        expenses: 176000,
      },
      {
        label: "Jul",
        revenue: 312000,
        expenses: 182000,
      },
      {
        label: "Aug",
        revenue: 324000,
        expenses: 187000,
      },
      {
        label: "Sep",
        revenue: 316000,
        expenses: 184000,
      },
      {
        label: "Oct",
        revenue: 302000,
        expenses: 179000,
      },
      {
        label: "Nov",
        revenue: 286000,
        expenses: 173000,
      },
      {
        label: "Dec",
        revenue: 261000,
        expenses: 171000,
      },
    ],

    aircraftUtilization: [
      {
        aircraft: "C-GABC",
        type: "Cessna 172",
        utilization: 93,
        flightHours: 2240,
        status: "Scheduled",
      },
      {
        aircraft: "C-GXYZ",
        type: "Cessna 172",
        utilization: 88,
        flightHours: 2118,
        status: "Available",
      },
      {
        aircraft: "C-GKLM",
        type: "Diamond DA40",
        utilization: 84,
        flightHours: 2036,
        status: "Scheduled",
      },
      {
        aircraft: "C-GPQR",
        type: "Cessna 152",
        utilization: 78,
        flightHours: 1882,
        status: "Available",
      },
      {
        aircraft: "C-GDEF",
        type: "Cessna 172",
        utilization: 71,
        flightHours: 1716,
        status: "Maintenance",
      },
      {
        aircraft: "C-GHIJ",
        type: "Diamond DA42",
        utilization: 66,
        flightHours: 1588,
        status: "Scheduled",
      },
    ],

    maintenanceCosts: [
      {
        category: "Engine",
        cost: 141240,
        percentage: 33,
      },
      {
        category: "Airframe",
        cost: 94160,
        percentage: 22,
      },
      {
        category: "Avionics",
        cost: 77040,
        percentage: 18,
      },
      {
        category: "Parts",
        cost: 64160,
        percentage: 15,
      },
      {
        category: "Inspection",
        cost: 51360,
        percentage: 12,
      },
    ],

    trainingProgress: [
      {
        label: "Ground School",
        students: 164,
        percentage: 86,
      },
      {
        label: "Flight Training",
        students: 151,
        percentage: 80,
      },
      {
        label: "Solo Flight",
        students: 104,
        percentage: 64,
      },
      {
        label: "Instrument",
        students: 76,
        percentage: 51,
      },
      {
        label: "Commercial",
        students: 48,
        percentage: 37,
      },
    ],

    insights: [
      {
        id: "annual-growth",
        type: "positive",
        title: "Operational Growth Is Strong",
        description:
          "Flight hours, revenue and student enrollment all increased compared with the previous year.",
        metric: "+12.4%",
        actionLabel: "View Performance",
      },
      {
        id: "maintenance-cost",
        type: "warning",
        title: "Maintenance Remains a Major Cost Driver",
        description:
          "Engine and airframe maintenance account for more than half of maintenance expenditure.",
        metric: "55%",
        actionLabel: "View Maintenance",
      },
      {
        id: "fleet-utilization",
        type: "positive",
        title: "Fleet Utilization Is Stable",
        description:
          "Fleet utilization remains within the expected operational range throughout the year.",
        metric: "79.8%",
        actionLabel: "View Aircraft",
      },
      {
        id: "student-growth",
        type: "info",
        title: "Student Enrollment Increased",
        description:
          "The active student population increased while overall training completion also improved.",
        metric: "+11.4%",
        actionLabel: "View Students",
      },
    ],
  },
};

export function getAnalyticsData(
  period: AnalyticsPeriod,
): AnalyticsData {
  return analyticsDataByPeriod[period];
}