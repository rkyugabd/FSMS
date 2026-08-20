import {
  KeyRound,
  ShieldCheck,
} from "lucide-react";

import type {
  SecuritySettings,
} from "../settingsData";

type SettingsSecurityProps = {
  data: SecuritySettings;
  onChange: (
    data: SecuritySettings,
  ) => void;
};

export function SettingsSecurity({
  data,
  onChange,
}: SettingsSecurityProps) {
  const update = (
    field: keyof SecuritySettings,
    value: boolean | number,
  ) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="border-b border-[#E4E7EC] px-5 py-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#667085]" />

            <div>
              <h2 className="text-sm font-semibold text-[#172033]">
                Security
              </h2>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                Manage authentication, sessions and security controls.
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-[#F2F4F7] p-5">
          <ToggleRow
            title="Two-Factor Authentication"
            description="Require an additional verification step when users sign in."
            enabled={
              data.twoFactorAuthentication
            }
            onToggle={() =>
              update(
                "twoFactorAuthentication",
                !data.twoFactorAuthentication,
              )
            }
          />

          <ToggleRow
            title="Login Notifications"
            description="Notify users when a new login is detected."
            enabled={
              data.loginNotifications
            }
            onToggle={() =>
              update(
                "loginNotifications",
                !data.loginNotifications,
              )
            }
          />

          <ToggleRow
            title="API Access"
            description="Allow authorized integrations to access system APIs."
            enabled={data.apiAccess}
            onToggle={() =>
              update(
                "apiAccess",
                !data.apiAccess,
              )
            }
          />

          <div className="grid gap-4 py-4 sm:grid-cols-2">
            <SelectField
              label="Session Timeout"
              value={String(
                data.sessionTimeout,
              )}
              onChange={(value) =>
                update(
                  "sessionTimeout",
                  Number(value),
                )
              }
              options={[
                "15",
                "30",
                "60",
                "120",
              ]}
            />

            <SelectField
              label="Password Expiration"
              value={String(
                data.passwordExpiration,
              )}
              onChange={(value) =>
                update(
                  "passwordExpiration",
                  Number(value),
                )
              }
              options={[
                "30",
                "60",
                "90",
                "180",
                "365",
              ]}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-[#E4E7EC] bg-[#F9FAFB] px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2FF]">
                <KeyRound className="h-4 w-4 text-[#1677FF]" />
              </div>

              <div>
                <p className="text-xs font-semibold text-[#344054]">
                  Password
                </p>

                <p className="mt-0.5 text-[10px] text-[#98A2B3]">
                  Last changed 24 days ago.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="h-8 rounded-lg border border-[#D0D5DD] bg-white px-3 text-[10px] font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-[#D1FADF] bg-[#F6FEF9] p-4">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#039855]" />

          <div>
            <p className="text-xs font-semibold text-[#027A48]">
              Security Controls Active
            </p>

            <p className="mt-1 text-[11px] leading-5 text-[#039855]">
              Two-factor authentication and login
              notifications are currently enabled for
              the organization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({
  title,
  description,
  enabled,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 first:pt-0">
      <div>
        <p className="text-xs font-semibold text-[#344054]">
          {title}
        </p>

        <p className="mt-0.5 text-[11px] text-[#98A2B3]">
          {description}
        </p>
      </div>

      <button
        type="button"
        aria-label={`Toggle ${title}`}
        onClick={onToggle}
        className={[
          "relative h-5 w-9 shrink-0 rounded-full transition",

          enabled
            ? "bg-[#1677FF]"
            : "bg-[#D0D5DD]",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition",

            enabled
              ? "left-[18px]"
              : "left-0.5",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#172033] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SettingsSecurity;