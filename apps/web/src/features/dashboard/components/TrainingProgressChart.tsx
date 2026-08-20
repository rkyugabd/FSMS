import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { trainingProgressData } from "../dashboardData";

export function TrainingProgressChart() {
  return (
    <div className="rounded-xl border border-[#E4E7EC] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-[#172033]">
          Training Progress
        </h3>

        <p className="mt-1 text-[11px] text-[#98A2B3]">
          Program completion across active students
        </p>
      </div>

      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={trainingProgressData}
            margin={{
              top: 5,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              stroke="#EAECF0"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "#98A2B3",
              }}
            />

            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                fill: "#98A2B3",
              }}
              tickFormatter={(value) => `${value}%`}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #E4E7EC",
                boxShadow:
                  "0 4px 12px rgba(16, 24, 40, 0.08)",
                fontSize: "11px",
              }}
              formatter={(value) => [`${value}%`, "Completed"]}
            />

            <Bar
              dataKey="completed"
              fill="#1677FF"
              radius={[5, 5, 0, 0]}
              barSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}