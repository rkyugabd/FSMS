export type AICopilotRole =
  | "user"
  | "assistant"
  | "system";

export type AICopilotMessageType =
  | "text"
  | "insight"
  | "action"
  | "system";

export type AICopilotContextType =
  | "dashboard"
  | "flights"
  | "students"
  | "training"
  | "aircraft"
  | "maintenance"
  | "employees"
  | "time-tracking"
  | "procurement"
  | "finance"
  | "analytics"
  | "reports";

export type AICopilotQuickAction =
  | "flight-status"
  | "maintenance-risk"
  | "student-progress"
  | "training-capacity"
  | "financial-summary"
  | "operational-report";

export type AICopilotInsightSeverity =
  | "info"
  | "success"
  | "warning"
  | "critical";

export type AICopilotInsight = {
  id: string;
  title: string;
  description: string;
  severity: AICopilotInsightSeverity;
  metric?: string;
  metricLabel?: string;
  actionLabel?: string;
};

export type AICopilotMessage = {
  id: string;
  role: AICopilotRole;
  type: AICopilotMessageType;
  content: string;
  timestamp: string;
  insights?: AICopilotInsight[];
};

export type AICopilotConversation = {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
  messages: AICopilotMessage[];
};

export type AICopilotContext = {
  type: AICopilotContextType;
  label: string;
  description: string;
  recordCount: number;
};

export type AICopilotQuickActionItem = {
  id: AICopilotQuickAction;
  title: string;
  description: string;
  prompt: string;
};

export const copilotContextOptions: AICopilotContext[] = [
  {
    type: "dashboard",
    label: "Dashboard",
    description:
      "Overall flight school operational performance",
    recordCount: 128,
  },
  {
    type: "flights",
    label: "Flights",
    description:
      "Flight schedules and operational status",
    recordCount: 48,
  },
  {
    type: "students",
    label: "Students",
    description:
      "Student enrollment and training progress",
    recordCount: 76,
  },
  {
    type: "training",
    label: "Training",
    description:
      "Training programs, lessons and progress",
    recordCount: 93,
  },
  {
    type: "aircraft",
    label: "Aircraft",
    description:
      "Aircraft fleet and operational availability",
    recordCount: 18,
  },
  {
    type: "maintenance",
    label: "Maintenance",
    description:
      "Maintenance schedules and aircraft service records",
    recordCount: 31,
  },
  {
    type: "employees",
    label: "Employees",
    description:
      "Employees, instructors and operational staff",
    recordCount: 42,
  },
  {
    type: "time-tracking",
    label: "Time Tracking",
    description:
      "Employee and instructor working hours",
    recordCount: 214,
  },
  {
    type: "procurement",
    label: "Procurement",
    description:
      "Purchase orders and supplier activity",
    recordCount: 27,
  },
  {
    type: "finance",
    label: "Finance",
    description:
      "Financial transactions and operating costs",
    recordCount: 184,
  },
  {
    type: "analytics",
    label: "BI & Analytics",
    description:
      "Operational analytics and business intelligence",
    recordCount: 42,
  },
  {
    type: "reports",
    label: "Reports",
    description:
      "Generated operational and management reports",
    recordCount: 19,
  },
];

export const quickActions: AICopilotQuickActionItem[] = [
  {
    id: "flight-status",
    title: "Flight Status",
    description:
      "Analyze today's flight operations",
    prompt:
      "Analyze today's flight operations and identify delays, risks, and operational issues.",
  },
  {
    id: "maintenance-risk",
    title: "Maintenance Risk",
    description:
      "Find aircraft maintenance risks",
    prompt:
      "Review the aircraft fleet and identify upcoming maintenance risks or aircraft availability issues.",
  },
  {
    id: "student-progress",
    title: "Student Progress",
    description:
      "Review student training progress",
    prompt:
      "Analyze student training progress and identify students who may need additional support.",
  },
  {
    id: "training-capacity",
    title: "Training Capacity",
    description:
      "Check instructor and simulator capacity",
    prompt:
      "Analyze instructor, simulator, and aircraft capacity for upcoming training operations.",
  },
  {
    id: "financial-summary",
    title: "Financial Summary",
    description:
      "Summarize financial performance",
    prompt:
      "Give me a management-level financial summary including revenue, expenses, and major cost drivers.",
  },
  {
    id: "operational-report",
    title: "Operations Report",
    description:
      "Generate an operations summary",
    prompt:
      "Prepare a concise operational report covering flights, aircraft, students, training, maintenance, and major risks.",
  },
];

export const initialInsights: AICopilotInsight[] = [
  {
    id: "insight-1",
    title: "Flight Operations Stable",
    description:
      "Most scheduled flights are operating normally. Two flights require monitoring because of schedule changes.",
    severity: "success",
    metric: "94%",
    metricLabel: "On-time operations",
    actionLabel: "Review Flights",
  },
  {
    id: "insight-2",
    title: "Maintenance Attention",
    description:
      "Three aircraft have maintenance activities approaching their planned service windows.",
    severity: "warning",
    metric: "3",
    metricLabel: "Aircraft",
    actionLabel: "View Maintenance",
  },
  {
    id: "insight-3",
    title: "Student Progress",
    description:
      "Seven students have training milestones approaching completion and may require instructor scheduling.",
    severity: "info",
    metric: "7",
    metricLabel: "Students",
    actionLabel: "Review Students",
  },
];

export const initialMessages: AICopilotMessage[] = [
  {
    id: "message-1",
    role: "assistant",
    type: "text",
    content:
      "Hello! I'm your FSMS AI Copilot. I can help you understand flight operations, students, training, aircraft, maintenance, finance, procurement, analytics, and reports.",
    timestamp: "10:02 AM",
  },
  {
    id: "message-2",
    role: "assistant",
    type: "insight",
    content:
      "I found a few operational items worth reviewing today.",
    timestamp: "10:02 AM",
    insights: initialInsights,
  },
];

export const initialConversations: AICopilotConversation[] =
  [
    {
      id: "conversation-1",
      title: "Today's Operations",
      preview:
        "Review today's flight operations and risks",
      updatedAt: "10:02 AM",
      messages: initialMessages,
    },
    {
      id: "conversation-2",
      title: "Maintenance Review",
      preview:
        "Aircraft maintenance risk analysis",
      updatedAt: "Yesterday",
      messages: [
        {
          id: "maintenance-message-1",
          role: "user",
          type: "text",
          content:
            "Which aircraft need maintenance attention?",
          timestamp: "Yesterday",
        },
        {
          id: "maintenance-message-2",
          role: "assistant",
          type: "text",
          content:
            "Three aircraft are approaching scheduled maintenance windows. I recommend reviewing their next available maintenance slots before assigning additional flights.",
          timestamp: "Yesterday",
        },
      ],
    },
    {
      id: "conversation-3",
      title: "Student Performance",
      preview:
        "Review student training performance",
      updatedAt: "Mon",
      messages: [
        {
          id: "student-message-1",
          role: "user",
          type: "text",
          content:
            "Which students may need additional training?",
          timestamp: "Mon",
        },
        {
          id: "student-message-2",
          role: "assistant",
          type: "text",
          content:
            "Based on the current training records, several students are progressing slower than their expected milestones. I recommend reviewing their recent lesson outcomes and instructor comments.",
          timestamp: "Mon",
        },
      ],
    },
  ];

export const currentContext: AICopilotContext =
  copilotContextOptions[0];

export function generateCopilotResponse(
  prompt: string,
): AICopilotMessage {
  const normalized = prompt.toLowerCase();

  let content =
    "I've reviewed the available FSMS operational context. Based on the current data, I recommend reviewing the related records and monitoring any exceptions before making operational changes.";

  let insights: AICopilotInsight[] | undefined;

  if (
    normalized.includes("flight") ||
    normalized.includes("delay") ||
    normalized.includes("schedule")
  ) {
    content =
      "Flight operations are generally stable. Most scheduled flights are progressing normally, but a small number of flights should be monitored for schedule changes and potential delays.";

    insights = [
      {
        id: `generated-${Date.now()}-1`,
        title: "Flight Operations",
        description:
          "Most scheduled flights remain operationally stable.",
        severity: "success",
        metric: "94%",
        metricLabel: "On-time",
        actionLabel: "Review Flights",
      },
      {
        id: `generated-${Date.now()}-2`,
        title: "Schedule Exceptions",
        description:
          "Two flights require additional operational monitoring.",
        severity: "warning",
        metric: "2",
        metricLabel: "Exceptions",
        actionLabel: "Review Exceptions",
      },
    ];
  } else if (
    normalized.includes("maintenance") ||
    normalized.includes("aircraft")
  ) {
    content =
      "The fleet appears operationally healthy overall, but several aircraft are approaching maintenance windows. Before assigning additional flights, confirm maintenance availability and upcoming service requirements.";

    insights = [
      {
        id: `generated-${Date.now()}-3`,
        title: "Maintenance Risk",
        description:
          "Three aircraft are approaching scheduled maintenance activities.",
        severity: "warning",
        metric: "3",
        metricLabel: "Aircraft",
        actionLabel: "Open Maintenance",
      },
    ];
  } else if (
    normalized.includes("student") ||
    normalized.includes("training")
  ) {
    content =
      "Student training activity is progressing, although several students are approaching important milestones. Instructor availability should be reviewed to ensure upcoming lessons can be scheduled without unnecessary gaps.";

    insights = [
      {
        id: `generated-${Date.now()}-4`,
        title: "Training Milestones",
        description:
          "Seven students are approaching important training milestones.",
        severity: "info",
        metric: "7",
        metricLabel: "Students",
        actionLabel: "Review Training",
      },
    ];
  } else if (
    normalized.includes("finance") ||
    normalized.includes("financial") ||
    normalized.includes("cost")
  ) {
    content =
      "Financial activity is currently within the expected operational range. The largest areas to monitor are aircraft-related operating costs, maintenance expenses, and procurement activity.";

    insights = [
      {
        id: `generated-${Date.now()}-5`,
        title: "Cost Monitoring",
        description:
          "Aircraft operations and maintenance remain the key cost areas to monitor.",
        severity: "info",
        metric: "3",
        metricLabel: "Key cost areas",
        actionLabel: "Open Finance",
      },
    ];
  } else if (
    normalized.includes("report") ||
    normalized.includes("summary")
  ) {
    content =
      "I can prepare an operational management summary covering flights, aircraft availability, maintenance, students, training capacity, financial activity, and procurement. The current data suggests stable operations with a few maintenance and scheduling items requiring attention.";

    insights = initialInsights;
  }

  return {
    id: `message-${Date.now()}`,
    role: "assistant",
    type: insights ? "insight" : "text",
    content,
    timestamp: new Date().toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
      },
    ),
    insights,
  };
}