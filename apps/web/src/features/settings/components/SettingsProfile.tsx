import {
  Mail,
  Phone,
  UserRound,
} from "lucide-react";

import type {
  SettingsProfile as SettingsProfileData,
} from "../settingsData";

type SettingsProfileProps = {
  data: SettingsProfileData;
  onChange: (
    data: SettingsProfileData,
  ) => void;
};

export function SettingsProfile({
  data,
  onChange,
}: SettingsProfileProps) {
  const update = (
    field: keyof SettingsProfileData,
    value: string,
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
            <UserRound className="h-4 w-4 text-[#667085]" />

            <div>
              <h2 className="text-sm font-semibold text-[#172033]">
                Personal Profile
              </h2>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                Update your personal account information.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-6 flex items-center gap-4 rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] p-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF2FF] text-lg font-semibold text-[#1677FF]">
              {data.firstName.charAt(0)}
              {data.lastName.charAt(0)}
            </div>

            <div>
              <p className="text-sm font-semibold text-[#172033]">
                {data.firstName} {data.lastName}
              </p>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                {data.jobTitle}
              </p>

              <button
                type="button"
                className="mt-2 text-[11px] font-semibold text-[#1677FF] hover:text-[#1264D8]"
              >
                Change profile photo
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="First Name"
              value={data.firstName}
              onChange={(value) =>
                update("firstName", value)
              }
            />

            <Field
              label="Last Name"
              value={data.lastName}
              onChange={(value) =>
                update("lastName", value)
              }
            />

            <Field
              label="Email"
              value={data.email}
              onChange={(value) =>
                update("email", value)
              }
              icon={<Mail />}
            />

            <Field
              label="Phone"
              value={data.phone}
              onChange={(value) =>
                update("phone", value)
              }
              icon={<Phone />}
            />

            <Field
              label="Job Title"
              value={data.jobTitle}
              onChange={(value) =>
                update("jobTitle", value)
              }
            />

            <Field
              label="Employee ID"
              value={data.employeeId}
              onChange={(value) =>
                update("employeeId", value)
              }
              disabled
            />

            <SelectField
              label="Language"
              value={data.language}
              onChange={(value) =>
                update("language", value)
              }
              options={[
                "English",
                "French",
                "Chinese",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  icon,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  disabled?: boolean;
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
          value={value}
          disabled={disabled}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className={[
            "h-9 w-full rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]",

            icon ? "pl-9" : "",

            disabled
              ? "cursor-not-allowed bg-[#F2F4F7] text-[#98A2B3]"
              : "",
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

export default SettingsProfile;