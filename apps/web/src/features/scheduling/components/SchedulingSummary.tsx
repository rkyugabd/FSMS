import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Plane,
  Users,
} from "lucide-react";

type SummaryItem = {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconBackground: string;
  iconColor: string;
  valueColor?: string;
};

type SchedulingSummaryProps = {
  total?: number;
  confirmed?: number;
  inFlight?: number;
  delayed?: number;
  conflicts?: number;
  students?: number;
};

export function SchedulingSummary({
  total = 12,
  confirmed = 7,
  inFlight = 2,
  delayed = 1,
  conflicts = 1,
  students = 9,
}: SchedulingSummaryProps) {
  const items: SummaryItem[] = [
    {
      label: "Total Schedules",
      value: total,
      icon: <Plane className="h-4 w-4" />,
      iconBackground: "#EAF2FF",
      iconColor: "#1677FF",
    },
    {
      label: "Confirmed",
      value: confirmed,
      icon: <CheckCircle2 className="h-4 w-4" />,
      iconBackground: "#E8F8F1",
      iconColor: "#12B76A",
    },
    {
      label: "In Flight",
      value: inFlight,
      icon: <Clock3 className="h-4 w-4" />,
      iconBackground: "#EEF4FF",
      iconColor: "#4E5BA6",
    },
    {
      label: "Delayed",
      value: delayed,
      icon: <Clock3 className="h-4 w-4" />,
      iconBackground: "#FFFAEB",
      iconColor: "#F79009",
    },
    {
      label: "Conflicts",
      value: conflicts,
      icon: <AlertTriangle className="h-4 w-4" />,
      iconBackground: "#FEF3F2",
      iconColor: "#F04438",
      valueColor: "#B42318",
    },
    {
      label: "Students",
      value: students,
      icon: <Users className="h-4 w-4" />,
      iconBackground: "#F2EDFF",
      iconColor: "#7F56D9",
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-[#E4E7EC] bg-white px-4 py-3 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{
                backgroundColor:
                  item.iconBackground,
                color: item.iconColor,
              }}
            >
              {item.icon}
            </div>

            <span
              className="text-xl font-semibold leading-8"
              style={{
                color:
                  item.valueColor ??
                  "#172033",
              }}
            >
              {item.value}
            </span>
          </div>

          <p className="mt-2 truncate text-[10px] font-medium text-[#667085]">
            {item.label}
          </p>
        </div>
      ))}
    </section>
  );
}