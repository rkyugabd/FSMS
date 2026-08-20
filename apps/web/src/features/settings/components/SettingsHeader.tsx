import {
  Settings as SettingsIcon,
  ShieldCheck,
} from "lucide-react";

export function SettingsHeader() {
  return (
    <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2FF]">
            <SettingsIcon className="h-4 w-4 text-[#1677FF]" />
          </div>

          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#344054]">
            System Administration
          </span>
        </div>

        <h1 className="text-[25px] font-semibold tracking-tight text-[#172033]">
          Settings
        </h1>

        <p className="mt-1 max-w-2xl text-sm text-[#475467]">
          Manage your flight school organization,
          users, permissions, notifications,
          integrations and system preferences.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-[#D1FADF] bg-[#ECFDF3] px-3 py-2">
        <ShieldCheck className="h-4 w-4 text-[#039855]" />

        <div>
          <p className="text-[11px] font-semibold text-[#027A48]">
            System Secure
          </p>

          <p className="text-[10px] text-[#039855]">
            Security controls are active
          </p>
        </div>
      </div>
    </section>
  );
}

export default SettingsHeader;