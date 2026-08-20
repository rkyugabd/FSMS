import type {
  FlightTrendItem,
  RevenueExpenseItem,
} from "../analyticsData";

type AnalyticsChartProps = {
  flightTrend: FlightTrendItem[];
  revenueExpense: RevenueExpenseItem[];
};

function formatCurrency(
  value: number,
): string {
  if (value >= 1000000) {
    return `$${(
      value / 1000000
    ).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `$${(
      value / 1000
    ).toFixed(0)}K`;
  }

  return `$${value}`;
}

export function AnalyticsChart({
  flightTrend,
  revenueExpense,
}: AnalyticsChartProps) {
  const maxFlightHours = Math.max(
    ...flightTrend.map(
      (item) => item.flightHours,
    ),
    1,
  );

  const maxFinancialValue = Math.max(
    ...revenueExpense.flatMap(
      (item) => [
        item.revenue,
        item.expenses,
      ],
    ),
    1,
  );

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {/* Flight Operations */}

      <article className="rounded-xl border border-[#E4E7EC] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-[#172033]">
              Flight Operations Trend
            </h3>

            <p className="mt-0.5 text-[10px] text-[#98A2B3]">
              Flight hours and utilization
            </p>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-[#667085]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#1677FF]" />
              Flight Hours
            </span>

            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#12B76A]" />
              Utilization
            </span>
          </div>
        </div>

        <div className="mt-6 flex h-[230px] items-end gap-2 border-b border-l border-[#E4E7EC] px-2 pb-0">
          {flightTrend.map(
            (item) => {
              const height =
                (item.flightHours /
                  maxFlightHours) *
                100;

              return (
                <div
                  key={item.label}
                  className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
                >
                  <div className="flex h-full w-full items-end justify-center">
                    <div
                      className="w-full max-w-9 rounded-t-md bg-[#DCEBFF] transition hover:bg-[#BBD6FF]"
                      style={{
                        height: `${Math.max(
                          height,
                          6,
                        )}%`,
                      }}
                      title={`${item.flightHours} flight hours`}
                    />
                  </div>

                  <span className="mb-2 text-[9px] font-medium text-[#98A2B3]">
                    {item.label}
                  </span>
                </div>
              );
            },
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-[#F9FAFB] p-3">
            <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Total Flights
            </p>

            <p className="mt-1 text-sm font-semibold text-[#172033]">
              {flightTrend.reduce(
                (total, item) =>
                  total + item.flights,
                0,
              )}
            </p>
          </div>

          <div className="rounded-lg bg-[#F9FAFB] p-3">
            <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Avg. Utilization
            </p>

            <p className="mt-1 text-sm font-semibold text-[#172033]">
              {Math.round(
                flightTrend.reduce(
                  (total, item) =>
                    total +
                    item.utilization,
                  0,
                ) /
                  Math.max(
                    flightTrend.length,
                    1,
                  ),
              )}
              %
            </p>
          </div>
        </div>
      </article>

      {/* Revenue vs Expenses */}

      <article className="rounded-xl border border-[#E4E7EC] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-[#172033]">
              Revenue vs Operating Cost
            </h3>

            <p className="mt-0.5 text-[10px] text-[#98A2B3]">
              Financial performance trend
            </p>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-[#667085]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#1677FF]" />
              Revenue
            </span>

            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#98A2B3]" />
              Expenses
            </span>
          </div>
        </div>

        <div className="mt-6 flex h-[230px] items-end gap-3 border-b border-l border-[#E4E7EC] px-3 pb-0">
          {revenueExpense.map(
            (item) => {
              const revenueHeight =
                (item.revenue /
                  maxFinancialValue) *
                100;

              const expenseHeight =
                (item.expenses /
                  maxFinancialValue) *
                100;

              return (
                <div
                  key={item.label}
                  className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
                >
                  <div className="flex h-full w-full items-end justify-center gap-1">
                    <div
                      className="w-1/2 max-w-5 rounded-t-sm bg-[#1677FF]"
                      style={{
                        height: `${Math.max(
                          revenueHeight,
                          5,
                        )}%`,
                      }}
                      title={`Revenue ${formatCurrency(
                        item.revenue,
                      )}`}
                    />

                    <div
                      className="w-1/2 max-w-5 rounded-t-sm bg-[#D0D5DD]"
                      style={{
                        height: `${Math.max(
                          expenseHeight,
                          5,
                        )}%`,
                      }}
                      title={`Expenses ${formatCurrency(
                        item.expenses,
                      )}`}
                    />
                  </div>

                  <span className="mb-2 text-[9px] font-medium text-[#98A2B3]">
                    {item.label}
                  </span>
                </div>
              );
            },
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-[#F9FAFB] p-3">
            <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Revenue
            </p>

            <p className="mt-1 text-sm font-semibold text-[#172033]">
              {formatCurrency(
                revenueExpense.reduce(
                  (total, item) =>
                    total + item.revenue,
                  0,
                ),
              )}
            </p>
          </div>

          <div className="rounded-lg bg-[#F9FAFB] p-3">
            <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Expenses
            </p>

            <p className="mt-1 text-sm font-semibold text-[#172033]">
              {formatCurrency(
                revenueExpense.reduce(
                  (total, item) =>
                    total +
                    item.expenses,
                  0,
                ),
              )}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

export default AnalyticsChart;