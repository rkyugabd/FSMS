import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  DollarSign,
  Plane,
} from "lucide-react";

import type {
  AircraftUtilizationItem,
  MaintenanceCostItem,
  TrainingProgressItem,
} from "../analyticsData";

type AnalyticsOverviewProps = {
  aircraftUtilization: AircraftUtilizationItem[];
  maintenanceCosts: MaintenanceCostItem[];
  trainingProgress: TrainingProgressItem[];
};

function formatCurrency(
  value: number,
): string {
  return new Intl.NumberFormat(
    "en-CA",
    {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    },
  ).format(value);
}

export function AnalyticsOverview({
  aircraftUtilization,
  maintenanceCosts,
  trainingProgress,
}: AnalyticsOverviewProps) {
  const topAircraft =
    [...aircraftUtilization].sort(
      (a, b) =>
        b.utilization -
        a.utilization,
    );

  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {/* Aircraft Utilization */}

      <article className="rounded-xl border border-[#E4E7EC] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#172033]">
              Aircraft Utilization
            </h3>

            <p className="mt-0.5 text-[10px] text-[#98A2B3]">
              Fleet performance
            </p>
          </div>

          <Plane className="h-4 w-4 text-[#1677FF]" />
        </div>

        <div className="mt-5 space-y-4">
          {topAircraft.map(
            (aircraft) => (
              <div key={aircraft.aircraft}>
                <div className="mb-1.5 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-[#344054]">
                      {aircraft.aircraft}
                    </span>

                    <span className="ml-2 text-[9px] text-[#98A2B3]">
                      {aircraft.type}
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold text-[#172033]">
                    {aircraft.utilization}%
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-[#F2F4F7]">
                  <div
                    className="h-full rounded-full bg-[#1677FF]"
                    style={{
                      width: `${aircraft.utilization}%`,
                    }}
                  />
                </div>

                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[9px] text-[#98A2B3]">
                    {aircraft.flightHours}h
                  </span>

                  <span
                    className={[
                      "text-[9px] font-medium",
                      aircraft.status ===
                        "Maintenance"
                        ? "text-[#B54708]"
                        : aircraft.status ===
                            "Scheduled"
                          ? "text-[#1355B5]"
                          : "text-[#087443]",
                    ].join(" ")}
                  >
                    {aircraft.status}
                  </span>
                </div>
              </div>
            ),
          )}
        </div>
      </article>

      {/* Maintenance Cost */}

      <article className="rounded-xl border border-[#E4E7EC] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#172033]">
              Maintenance Cost
            </h3>

            <p className="mt-0.5 text-[10px] text-[#98A2B3]">
              Cost distribution
            </p>
          </div>

          <DollarSign className="h-4 w-4 text-[#B54708]" />
        </div>

        <div className="mt-5 space-y-4">
          {maintenanceCosts.map(
            (item) => (
              <div key={item.category}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#344054]">
                    {item.category}
                  </span>

                  <span className="text-[10px] font-semibold text-[#172033]">
                    {formatCurrency(
                      item.cost,
                    )}
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-[#F2F4F7]">
                  <div
                    className="h-full rounded-full bg-[#F79009]"
                    style={{
                      width: `${item.percentage * 2.5}%`,
                    }}
                  />
                </div>

                <div className="mt-1 text-[9px] text-[#98A2B3]">
                  {item.percentage}% of total
                </div>
              </div>
            ),
          )}
        </div>
      </article>

      {/* Training Progress */}

      <article className="rounded-xl border border-[#E4E7EC] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#172033]">
              Training Progress
            </h3>

            <p className="mt-0.5 text-[10px] text-[#98A2B3]">
              Student pipeline
            </p>
          </div>

          <Activity className="h-4 w-4 text-[#6941C6]" />
        </div>

        <div className="mt-5 space-y-4">
          {trainingProgress.map(
            (item) => (
              <div key={item.label}>
                <div className="mb-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-[#344054]">
                      {item.label}
                    </span>

                    <span className="text-[9px] text-[#98A2B3]">
                      {item.students}
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold text-[#172033]">
                    {item.percentage}%
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-[#F2F4F7]">
                  <div
                    className="h-full rounded-full bg-[#7F56D9]"
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  />
                </div>
              </div>
            ),
          )}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-[#F9FAFB] p-2.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#12B76A]" />

            <p className="mt-1 text-[9px] text-[#98A2B3]">
              Active
            </p>

            <p className="text-xs font-semibold text-[#172033]">
              148
            </p>
          </div>

          <div className="rounded-lg bg-[#F9FAFB] p-2.5">
            <Clock3 className="h-3.5 w-3.5 text-[#1677FF]" />

            <p className="mt-1 text-[9px] text-[#98A2B3]">
              In Progress
            </p>

            <p className="text-xs font-semibold text-[#172033]">
              96
            </p>
          </div>

          <div className="rounded-lg bg-[#F9FAFB] p-2.5">
            <AlertTriangle className="h-3.5 w-3.5 text-[#F79009]" />

            <p className="mt-1 text-[9px] text-[#98A2B3]">
              At Risk
            </p>

            <p className="text-xs font-semibold text-[#172033]">
              12
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

export default AnalyticsOverview;