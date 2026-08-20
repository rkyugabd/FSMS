import type { FlightStatus } from "../dashboardData";

type FlightStatusBadgeProps = {
  status: FlightStatus;
};

const statusStyles: Record<FlightStatus, string> = {
  Scheduled:
    "bg-slate-100 text-slate-600",
  Boarding:
    "bg-blue-50 text-blue-700",
  "In Flight":
    "bg-emerald-50 text-emerald-700",
  Completed:
    "bg-slate-100 text-slate-500",
  Delayed:
    "bg-amber-50 text-amber-700",
  Cancelled:
    "bg-red-50 text-red-700",
};

export function FlightStatusBadge({
  status,
}: FlightStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}