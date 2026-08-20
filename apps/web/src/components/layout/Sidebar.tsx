import {
  Activity,
  BarChart3,
  BookOpen,
  CalendarDays,
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Plane,
  Settings,
  ShoppingCart,
  Sparkles,
  Users,
  Wrench,
  Clock3,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";

type NavigationItem = {
  label: string;
  path: string;
  icon: React.ElementType;
};

type NavigationSection = {
  label: string;
  items: NavigationItem[];
};

const navigationSections: NavigationSection[] = [
  {
    label: "COMMAND",
    items: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    label: "OPERATIONS",
    items: [
      {
        label: "Scheduling",
        path: "/scheduling",
        icon: CalendarDays,
      },
      {
        label: "Flights",
        path: "/flights",
        icon: Plane,
      },
      {
        label: "Simulators",
        path: "/simulators",
        icon: Activity,
      },
    ],
  },

  {
    label: "TRAINING",
    items: [
      {
        label: "Students",
        path: "/students",
        icon: GraduationCap,
      },
      {
        label: "Training",
        path: "/training",
        icon: BookOpen,
      },
    ],
  },

  {
    label: "FLEET",
    items: [
      {
        label: "Aircraft",
        path: "/aircraft",
        icon: Plane,
      },
      {
        label: "Maintenance",
        path: "/maintenance",
        icon: Wrench,
      },
    ],
  },

  {
    label: "WORKFORCE",
    items: [
      {
        label: "Employees",
        path: "/employees",
        icon: Users,
      },
      {
        label: "Time Tracking",
        path: "/time-tracking",
        icon: Clock3,
      },
    ],
  },

  {
    label: "PROCUREMENT",
    items: [
      {
        label: "Procurement",
        path: "/procurement",
        icon: ShoppingCart,
      },
    ],
  },

  {
    label: "FINANCE",
    items: [
      {
        label: "Finance",
        path: "/finance",
        icon: CreditCard,
      },
    ],
  },

  {
    label: "ANALYTICS",
    items: [
      {
        label: "BI & Analytics",
        path: "/analytics",
        icon: BarChart3,
      },
      {
        label: "Reports",
        path: "/reports",
        icon: FileText,
      },
    ],
  },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-white/10 bg-[#0B1F33] text-white">
      {/* =====================================================
          BRAND
          ===================================================== */}

      <div className="flex h-[72px] items-center border-b border-white/10 px-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1677FF] shadow-lg shadow-blue-950/30">
          <Plane
            className="h-5 w-5"
            strokeWidth={2.2}
          />
        </div>

        <div className="ml-3 min-w-0">
          <div className="truncate text-[15px] font-semibold tracking-wide">
            ITPS
          </div>

          <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
            Flight School
          </div>
        </div>
      </div>

      {/* =====================================================
          NAVIGATION
          ===================================================== */}

      <div className="flex-1 overflow-y-auto px-3 py-5">
        {navigationSections.map((section) => (
          <div
            key={section.label}
            className="mb-5"
          >
            <div className="mb-2 px-3 text-[10px] font-semibold tracking-[0.16em] text-slate-500">
              {section.label}
            </div>

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      [
                        "group flex w-full items-center rounded-lg px-3 py-2.5 text-left text-[13px] font-medium transition-all",

                        isActive
                          ? "bg-[#1677FF] text-white shadow-sm shadow-blue-950/30"
                          : "text-slate-300 hover:bg-white/8 hover:text-white",
                      ].join(" ")
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className={[
                            "mr-3 h-[17px] w-[17px] shrink-0",

                            isActive
                              ? "text-white"
                              : "text-slate-400 group-hover:text-slate-200",
                          ].join(" ")}
                          strokeWidth={1.9}
                        />

                        <span className="truncate">
                          {item.label}
                        </span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}

        {/* =====================================================
            AI COPILOT
            ===================================================== */}

        <div className="mt-2">
          <NavLink
            to="/ai-copilot"
            className={({ isActive }) =>
              [
                "group flex w-full items-center rounded-lg border px-3 py-2.5 text-left transition-all",

                isActive
                  ? "border-cyan-400/30 bg-cyan-500/20 shadow-sm"
                  : "border-cyan-500/20 bg-cyan-500/8 hover:border-cyan-400/30 hover:bg-cyan-500/12",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                <Sparkles
                  className={[
                    "mr-3 h-[17px] w-[17px]",

                    isActive
                      ? "text-cyan-300"
                      : "text-cyan-400",
                  ].join(" ")}
                  strokeWidth={1.9}
                />

                <span
                  className={[
                    "text-[13px] font-semibold",

                    isActive
                      ? "text-white"
                      : "text-cyan-100",
                  ].join(" ")}
                >
                  AI Copilot
                </span>

                <span className="ml-auto rounded-full bg-cyan-400/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-cyan-300">
                  AI
                </span>
              </>
            )}
          </NavLink>
        </div>
      </div>

      {/* =====================================================
          BOTTOM SETTINGS
          ===================================================== */}

      <div className="border-t border-white/10 p-3">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            [
              "group flex w-full items-center rounded-lg px-3 py-2.5 transition-all",

              isActive
                ? "bg-[#1677FF] text-white shadow-sm shadow-blue-950/30"
                : "text-slate-300 hover:bg-white/8 hover:text-white",
            ].join(" ")
          }
        >
          {({ isActive }) => (
            <>
              <Settings
                className={[
                  "mr-3 h-[17px] w-[17px]",

                  isActive
                    ? "text-white"
                    : "text-slate-400 group-hover:text-slate-200",
                ].join(" ")}
                strokeWidth={1.9}
              />

              <span className="text-[13px] font-medium">
                Settings
              </span>
            </>
          )}
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;