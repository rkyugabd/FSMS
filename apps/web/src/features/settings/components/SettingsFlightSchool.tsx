import {
  Clock3,
  Plane,
} from "lucide-react";

import type {
  FlightSchoolSettings as FlightSchoolSettingsData,
} from "../settingsData";

type SettingsFlightSchoolProps = {
  data: FlightSchoolSettingsData;
  onChange: (
    data: FlightSchoolSettingsData,
  ) => void;
};

export function SettingsFlightSchool({
  data,
  onChange,
}: SettingsFlightSchoolProps) {
  const update = (
    field: keyof FlightSchoolSettingsData,
    value: string | number,
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
            <Plane className="h-4 w-4 text-[#667085]" />

            <div>
              <h2 className="text-sm font-semibold text-[#172033]">
                Flight School Configuration
              </h2>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                Configure the default operational settings for the flight school.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <Field
            label="School Name"
            value={data.schoolName}
            onChange={(value) =>
              update("schoolName", value)
            }
          />

          <Field
            label="Primary Airport"
            value={data.primaryAirport}
            onChange={(value) =>
              update(
                "primaryAirport",
                value,
              )
            }
          />

          <Field
            label="Airport Name"
            value={data.primaryAirportName}
            onChange={(value) =>
              update(
                "primaryAirportName",
                value,
              )
            }
          />

          <SelectField
            label="Time Zone"
            value={data.timezone}
            onChange={(value) =>
              update("timezone", value)
            }
            options={[
              "America/Toronto",
              "America/Vancouver",
              "America/Edmonton",
              "America/Winnipeg",
              "America/Halifax",
            ]}
          />

          <Field
            label="Operating Hours"
            value={data.operatingHours}
            onChange={(value) =>
              update(
                "operatingHours",
                value,
              )
            }
            icon={<Clock3 />}
          />

          <SelectField
            label="Currency"
            value={data.currency}
            onChange={(value) =>
              update("currency", value)
            }
            options={[
              "CAD",
              "USD",
              "EUR",
              "GBP",
            ]}
          />

          <Field
            label="Default Flight Duration"
            value={data.defaultFlightDuration}
            onChange={(value) =>
              update(
                "defaultFlightDuration",
                value,
              )
            }
            type="time"
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
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3]">
            {icon}
          </span>
        )}

        <input
          type={type}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className={[
            "h-9 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#172033] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]",

            icon ? "pl-9" : "",
          ].join(" ")}
        />
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

export default SettingsFlightSchool;