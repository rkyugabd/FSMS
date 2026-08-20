import {
  useMemo,
  useState,
} from "react";

import AnalyticsHeader from "./components/AnalyticsHeader";
import AnalyticsFilters from "./components/AnalyticsFilters";
import AnalyticsKpiCards from "./components/AnalyticsKpiCards";
import AnalyticsChart from "./components/AnalyticsChart";
import AnalyticsOverview from "./components/AnalyticsOverview";
import AnalyticsInsightCard from "./components/AnalyticsInsightCard";
import AnalyticsEmptyState from "./components/AnalyticsEmptyState";

import {
  getAnalyticsData,
  type AnalyticsPeriod,
} from "./analyticsData";

export function Analytics() {
  const [period, setPeriod] =
    useState<AnalyticsPeriod>(
      "30d",
    );

  const [
    department,
    setDepartment,
  ] = useState(
    "All Departments",
  );

  const [
    refreshKey,
    setRefreshKey,
  ] = useState(0);

  const data = useMemo(
    () => getAnalyticsData(period),
    [period, refreshKey],
  );

  const handleRefresh = () => {
    setRefreshKey(
      (previous) =>
        previous + 1,
    );
  };

  const hasData =
    data.kpis.length > 0;

  return (
    <div className="space-y-5 text-[#172033]">
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <AnalyticsHeader
        onRefresh={handleRefresh}
      />

      {/* =====================================================
          FILTERS
          ===================================================== */}

      <AnalyticsFilters
        period={period}
        department={department}
        onPeriodChange={
          setPeriod
        }
        onDepartmentChange={
          setDepartment
        }
      />

      {!hasData ? (
        <AnalyticsEmptyState
          onRefresh={
            handleRefresh
          }
        />
      ) : (
        <>
          {/* =================================================
              KPI CARDS
              ================================================= */}

          <AnalyticsKpiCards
            kpis={data.kpis}
          />

          {/* =================================================
              OVERVIEW
              ================================================= */}

          <section>
            <div className="mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
                Operational Performance
              </p>

              <p className="mt-0.5 text-xs text-[#667085]">
                Current business performance across major
                operational areas.
              </p>
            </div>

            <AnalyticsOverview
              aircraftUtilization={
                data.aircraftUtilization
              }
              maintenanceCosts={
                data.maintenanceCosts
              }
              trainingProgress={
                data.trainingProgress
              }
            />
          </section>

          {/* =================================================
              CHARTS
              ================================================= */}

          <section>
            <div className="mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
                Business Trends
              </p>

              <p className="mt-0.5 text-xs text-[#667085]">
                Operational activity and financial performance
                over the selected period.
              </p>
            </div>

            <AnalyticsChart
              flightTrend={
                data.flightTrend
              }
              revenueExpense={
                data.revenueExpense
              }
            />
          </section>

          {/* =================================================
              AI INSIGHTS
              ================================================= */}

          <AnalyticsInsightCard
            insights={
              data.insights
            }
          />

          {/* =================================================
              DATA FOOTER
              ================================================= */}

          <div className="flex flex-col gap-2 border-t border-[#E4E7EC] pt-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] text-[#98A2B3]">
              Analytics period:{" "}
              <span className="font-semibold text-[#667085]">
                {period === "7d"
                  ? "Last 7 Days"
                  : period === "30d"
                    ? "Last 30 Days"
                    : period ===
                        "90d"
                      ? "Last 90 Days"
                      : "Last 12 Months"}
              </span>
            </p>

            <p className="text-[10px] text-[#98A2B3]">
              Department:{" "}
              <span className="font-semibold text-[#667085]">
                {department}
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Analytics;