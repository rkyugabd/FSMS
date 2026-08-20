import {
  Activity,
  AlertTriangle,
  Clock3,
  Plane,
  Users,
} from "lucide-react";

import {
  dashboardKpis,
} from "./dashboardData";

import { KpiCard } from "./components/KpiCard";
import { TodaysFlights } from "./components/TodaysFlights";
import { FleetUtilizationChart } from "./components/FleetUtilizationChart";
import { TrainingProgressChart } from "./components/TrainingProgressChart";
import { OperationalAlerts } from "./components/OperationalAlerts";
import { AIInsights } from "./components/AIInsights";

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium text-[#667085]">
            Tuesday, August 18, 2026
          </p>

          <h2 className="mt-1 text-[24px] font-semibold tracking-tight text-[#172033]">
            Good afternoon, Alex
          </h2>

          <p className="mt-1 text-sm text-[#667085]">
            Here&apos;s the operational overview for today.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />

          <span className="text-xs font-semibold text-emerald-700">
            Operations Normal
          </span>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard
          label="Flights Today"
          value={dashboardKpis.flightsToday}
          detail="Scheduled flight operations"
          icon={Plane}
        />

        <KpiCard
          label="Simulator Sessions"
          value={dashboardKpis.simulatorSessions}
          detail="Sessions scheduled today"
          icon={Activity}
          iconClassName="bg-purple-50 text-purple-600"
        />

        <KpiCard
          label="Aircraft Available"
          value={`${dashboardKpis.aircraftAvailable}/${dashboardKpis.totalAircraft}`}
          detail="Fleet currently operational"
          icon={Plane}
          iconClassName="bg-emerald-50 text-emerald-600"
        />

        <KpiCard
          label="Training Hours"
          value={dashboardKpis.trainingHours}
          detail="Total scheduled today"
          icon={Clock3}
          iconClassName="bg-amber-50 text-amber-600"
        />

        <KpiCard
          label="Operational Alerts"
          value={dashboardKpis.operationalAlerts}
          detail="Items requiring attention"
          icon={AlertTriangle}
          iconClassName="bg-red-50 text-red-600"
        />
      </div>

      {/* Main Operations */}
      <TodaysFlights />

      {/* Analytics */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <FleetUtilizationChart />
        <TrainingProgressChart />
      </div>

      {/* Alerts + AI */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <OperationalAlerts />
        <AIInsights />
      </div>

      {/* Operations Footer */}
      <div className="flex items-center gap-2 text-[11px] text-[#98A2B3]">
        <Users className="h-3.5 w-3.5" />

        <span>
          Operational dashboard data is currently running on mock
          data. Real-time services will be connected during the backend
          integration phase.
        </span>
      </div>
    </div>
  );
}