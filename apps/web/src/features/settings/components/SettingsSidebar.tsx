import {
  Bell,
  Building2,
  ChevronRight,
  Globe2,
  KeyRound,
  Link2,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
  Users,
} from "lucide-react";

import type {
  SettingsSection,
} from "../settingsData";

type SettingsSidebarProps = {
  activeSection: SettingsSection;
  onSectionChange: (
    section: SettingsSection,
  ) => void;
};

const icons = {
  profile: UserRound,
  organization: Building2,
  "flight-school": Globe2,
  users: Users,
  roles: KeyRound,
  notifications: Bell,
  integrations: Link2,
  preferences: SlidersHorizontal,
  security: ShieldCheck,
};

const sections: Array<{
  id: SettingsSection;
  label: string;
  description: string;
}> = [
  {
    id: "profile",
    label: "Profile",
    description: "Personal information",
  },
  {
    id: "organization",
    label: "Organization",
    description: "Company information",
  },
  {
    id: "flight-school",
    label: "Flight School",
    description: "School configuration",
  },
  {
    id: "users",
    label: "Users",
    description: "System users",
  },
  {
    id: "roles",
    label: "Roles & Permissions",
    description: "Access control",
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Alerts and messages",
  },
  {
    id: "integrations",
    label: "Integrations",
    description: "External services",
  },
  {
    id: "preferences",
    label: "Preferences",
    description: "System preferences",
  },
  {
    id: "security",
    label: "Security",
    description: "Security settings",
  },
];

export function SettingsSidebar({
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) {
  return (
    <aside className="rounded-xl border border-[#E4E7EC] bg-white p-2 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="px-3 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
          Settings
        </p>

        <p className="mt-1 text-[11px] text-[#667085]">
          System configuration
        </p>
      </div>

      <div className="space-y-1">
        {sections.map((section) => {
          const Icon = icons[section.id];
          const isActive =
            activeSection === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() =>
                onSectionChange(section.id)
              }
              className={[
                "group flex w-full items-center rounded-lg px-3 py-2.5 text-left transition-all",

                isActive
                  ? "bg-[#EAF2FF] text-[#1355B5]"
                  : "text-[#475467] hover:bg-[#F9FAFB]",
              ].join(" ")}
            >
              <Icon
                className={[
                  "mr-3 h-4 w-4 shrink-0",

                  isActive
                    ? "text-[#1677FF]"
                    : "text-[#98A2B3] group-hover:text-[#667085]",
                ].join(" ")}
                strokeWidth={1.9}
              />

              <div className="min-w-0 flex-1">
                <p
                  className={[
                    "truncate text-xs font-semibold",

                    isActive
                      ? "text-[#1355B5]"
                      : "text-[#344054]",
                  ].join(" ")}
                >
                  {section.label}
                </p>

                <p className="mt-0.5 truncate text-[10px] text-[#98A2B3]">
                  {section.description}
                </p>
              </div>

              <ChevronRight
                className={[
                  "h-3.5 w-3.5 shrink-0",

                  isActive
                    ? "text-[#1677FF]"
                    : "text-[#D0D5DD]",
                ].join(" ")}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default SettingsSidebar;