import { ArrowRight, Plane } from "lucide-react";
import {
  todaysFlights,
} from "../dashboardData";
import { FlightStatusBadge } from "./FlightStatusBadge";

export function TodaysFlights() {
  return (
    <div className="rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-[#172033]">
            Today&apos;s Flight Operations
          </h3>

          <p className="mt-1 text-[11px] text-[#98A2B3]">
            Live operational schedule
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 text-xs font-semibold text-[#1677FF] hover:text-[#1264D8]"
        >
          View schedule
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px]">
          <thead>
            <tr className="border-b border-[#E4E7EC] bg-[#F9FAFB]">
              <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#98A2B3]">
                Time
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#98A2B3]">
                Flight
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#98A2B3]">
                Student
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#98A2B3]">
                Instructor
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#98A2B3]">
                Aircraft
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#98A2B3]">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {todaysFlights.map((flight) => (
              <tr
                key={flight.id}
                className="border-b border-[#F2F4F7] last:border-0 hover:bg-[#F9FAFB]"
              >
                <td className="px-5 py-3.5 text-xs font-semibold text-[#172033]">
                  {flight.time}
                </td>

                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EAF3FF] text-[#1677FF]">
                      <Plane className="h-3.5 w-3.5" />
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-[#172033]">
                        {flight.flightNumber}
                      </div>

                      <div className="text-[10px] text-[#98A2B3]">
                        {flight.type}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3.5 text-xs text-[#475467]">
                  {flight.student}
                </td>

                <td className="px-4 py-3.5 text-xs text-[#475467]">
                  {flight.instructor}
                </td>

                <td className="px-4 py-3.5 text-xs font-medium text-[#475467]">
                  {flight.aircraft}
                </td>

                <td className="px-4 py-3.5">
                  <FlightStatusBadge status={flight.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}