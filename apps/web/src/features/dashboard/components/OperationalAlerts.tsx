import {
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";
import { operationalAlerts } from "../dashboardData";

const alertConfig = {
  warning: {
    icon: AlertTriangle,
    iconClass: "bg-amber-50 text-amber-600",
  },
  danger: {
    icon: AlertTriangle,
    iconClass: "bg-red-50 text-red-600",
  },
  info: {
    icon: Info,
    iconClass: "bg-blue-50 text-blue-600",
  },
};

export function OperationalAlerts() {
  return (
    <div className="rounded-xl border border-[#E4E7EC] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#172033]">
            Operational Alerts
          </h3>

          <p className="mt-1 text-[11px] text-[#98A2B3]">
            Items requiring attention
          </p>
        </div>

        <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-semibold text-red-600">
          {operationalAlerts.length} Active
        </span>
      </div>

      <div className="space-y-3">
        {operationalAlerts.map((alert) => {
          const config =
            alertConfig[
              alert.severity as keyof typeof alertConfig
            ];

          const Icon = config.icon;

          return (
            <div
              key={alert.id}
              className="flex gap-3 rounded-lg border border-[#F2F4F7] p-3"
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${config.iconClass}`}
              >
                <Icon className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold leading-5 text-[#344054]">
                  {alert.title}
                </p>

                <p className="mt-0.5 text-[10px] text-[#98A2B3]">
                  {alert.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#F9FAFB] px-3 py-2.5 text-[10px] text-[#667085]">
        <CheckCircle2 className="h-3.5 w-3.5 text-[#12B76A]" />
        Operations monitoring is active
      </div>
    </div>
  );
}