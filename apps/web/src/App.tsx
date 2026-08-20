import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { Sidebar } from "./components/layout/Sidebar";
import { Topbar } from "./components/layout/Topbar";

import { Dashboard } from "./features/dashboard/Dashboard";
import { Scheduling } from "./features/scheduling/Scheduling";
import { Flights } from "./features/flights/Flights";
import { Simulators } from "./features/simulators/Simulators";
import { Students } from "./features/students/Students";
import { Training } from "./features/training/Training";
import { Aircraft } from "./features/aircraft/Aircraft";
import { Maintenance } from "./features/maintenance/Maintenance";
import { Employees } from "./features/employees/Employees";
import { TimeTracking } from "./features/timeTracking/TimeTracking";
import { Procurement } from "./features/procurement/Procurement";
import { Finance } from "./features/finance/Finance";
import { Analytics } from "./features/analytics/Analytics";
import { Reports } from "./features/reports/Reports";
import { AICopilot } from "./features/ai-copilot/AICopilot";
import { Settings } from "./features/settings/Settings";

function App() {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* =====================================================
          SIDEBAR
          ===================================================== */}

      <Sidebar />

      {/* =====================================================
          TOPBAR
          ===================================================== */}

      <Topbar />

      {/* =====================================================
          MAIN APPLICATION
          ===================================================== */}

      <main className="min-h-screen pt-[72px] lg:ml-[260px]">
        <div className="p-6">
          <Routes>
            {/* =================================================
                DASHBOARD
                ================================================= */}

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            {/* =================================================
                SCHEDULING
                ================================================= */}

            <Route
              path="/scheduling"
              element={<Scheduling />}
            />

            {/* =================================================
                FLIGHTS
                ================================================= */}

            <Route
              path="/flights"
              element={<Flights />}
            />

            {/* =================================================
                SIMULATORS
                ================================================= */}

            <Route
              path="/simulators"
              element={<Simulators />}
            />

            {/* =================================================
                STUDENTS
                ================================================= */}

            <Route
              path="/students"
              element={<Students />}
            />

            {/* =================================================
                TRAINING
                ================================================= */}

            <Route
              path="/training"
              element={<Training />}
            />

            {/* =================================================
                AIRCRAFT
                ================================================= */}

            <Route
              path="/aircraft"
              element={<Aircraft />}
            />

            {/* =================================================
                MAINTENANCE
                ================================================= */}

            <Route
              path="/maintenance"
              element={<Maintenance />}
            />

            {/* =================================================
                EMPLOYEES
                ================================================= */}

            <Route
              path="/employees"
              element={<Employees />}
            />

            {/* =================================================
                TIME TRACKING
                ================================================= */}

            <Route
              path="/time-tracking"
              element={<TimeTracking />}
            />

            {/* =================================================
                PROCUREMENT
                ================================================= */}

            <Route
              path="/procurement"
              element={<Procurement />}
            />

            {/* =================================================
                FINANCE
                ================================================= */}

            <Route
              path="/finance"
              element={<Finance />}
            />

            {/* =================================================
                BI & ANALYTICS
                ================================================= */}

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            {/* =================================================
                REPORTS
                ================================================= */}

            <Route
              path="/reports"
              element={<Reports />}
            />

            {/* =================================================
                AI COPILOT
                ================================================= */}

            <Route
              path="/ai-copilot"
              element={<AICopilot />}
            />

            <Route
              path="/settings"
              element={<Settings />}
             />

            {/* =================================================
                FALLBACK
                ================================================= */}

            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;