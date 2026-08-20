import {
  SlidersHorizontal,
} from "lucide-react";

import type {
  PreferenceSettings,
} from "../settingsData";

type SettingsPreferencesProps = {
  data: PreferenceSettings;
  onChange: (
    data: PreferenceSettings,
  ) => void;
};

export function SettingsPreferences({
  data,
  onChange,
}: SettingsPreferencesProps) {
  const update = (
    field: keyof PreferenceSettings,
    value: string | number | boolean,
  ) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="border-b border-[#E4E7EC] px-5 py-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[#667085]" />

          <div>
            <h2 className="text-sm font-semibold text-[#172033]">
              Preferences
            </h2>

            <p className="mt-0.5 text-[11px] text-[#667085]">
              Customize how the FSMS application behaves and displays information.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-2">
        <SelectField
          label="Date Format"
          value={data.dateFormat}
          onChange={(value) =>
            update(
              "dateFormat",
              value,
            )
          }
          options={[
            "YYYY-MM-DD",
            "MM/DD/YYYY",
            "DD/MM/YYYY",
          ]}
        />

        <SelectField
          label="Time Format"
          value={data.timeFormat}
          onChange={(value) =>
            update(
              "timeFormat",
              value,
            )
          }
          options={[
            "24 Hour",
            "12 Hour",
          ]}
        />

        <SelectField
          label="Currency"
          value={data.currency}
          onChange={(value) =>
            update(
              "currency",
              value,
            )
          }
          options={[
            "CAD",
            "USD",
            "EUR",
            "GBP",
          ]}
        />

        <SelectField
          label="Timezone"
          value={data.timezone}
          onChange={(value) =>
            update(
              "timezone",
              value,
            )
          }
          options={[
            "America/Toronto",
            "America/Vancouver",
            "America/Edmonton",
            "America/Winnipeg",
            "America/Halifax",
          ]}
        />

        <SelectField
          label="Default Page Size"
          value={String(
            data.defaultPageSize,
          )}
          onChange={(value) =>
            update(
              "defaultPageSize",
              Number(value),
            )
          }
          options={[
            "10",
            "25",
            "50",
            "100",
          ]}
        />

        <SelectField
          label="Default Landing Page"
          value={data.defaultLandingPage}
          onChange={(value) =>
            update(
              "defaultLandingPage",
              value,
            )
          }
          options={[
            "Dashboard",
            "Scheduling",
            "Flights",
            "Analytics",
            "Reports",
            "AI Copilot",
          ]}
        />

        <div className="flex items-center justify-between rounded-lg border border-[#E4E7EC] px-4 py-3 sm:col-span-2">
          <div>
            <p className="text-xs font-semibold text-[#344054]">
              Compact Tables
            </p>

            <p className="mt-0.5 text-[11px] text-[#98A2B3]">
              Reduce row spacing across operational tables.
            </p>
          </div>

          <button
            type="button"
            aria-label="Toggle compact tables"
            onClick={() =>
              update(
                "compactTables",
                !data.compactTables,
              )
            }
            className={[
              "relative h-5 w-9 rounded-full transition",

              data.compactTables
                ? "bg-[#1677FF]"
                : "bg-[#D0D5DD]",
            ].join(" ")}
          >
            <span
              className={[
                "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition",

                data.compactTables
                  ? "left-[18px]"
                  : "left-0.5",
              ].join(" ")}
            />
          </button>
        </div>
      </div>
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

export default SettingsPreferences;