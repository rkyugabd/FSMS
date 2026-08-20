import {
  Building2,
} from "lucide-react";

import type {
  OrganizationSettings,
} from "../settingsData";

type SettingsOrganizationProps = {
  data: OrganizationSettings;
  onChange: (
    data: OrganizationSettings,
  ) => void;
};

export function SettingsOrganization({
  data,
  onChange,
}: SettingsOrganizationProps) {
  const update = (
    field: keyof OrganizationSettings,
    value: string,
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
          <Building2 className="h-4 w-4 text-[#667085]" />

          <div>
            <h2 className="text-sm font-semibold text-[#172033]">
              Organization
            </h2>

            <p className="mt-0.5 text-[11px] text-[#667085]">
              Manage your organization's basic information.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-2">
        <Field
          label="Organization Name"
          value={data.organizationName}
          onChange={(value) =>
            update(
              "organizationName",
              value,
            )
          }
        />

        <Field
          label="Organization ID"
          value={data.organizationId}
          onChange={(value) =>
            update(
              "organizationId",
              value,
            )
          }
          disabled
        />

        <Field
          label="Address"
          value={data.address}
          onChange={(value) =>
            update("address", value)
          }
        />

        <Field
          label="City"
          value={data.city}
          onChange={(value) =>
            update("city", value)
          }
        />

        <Field
          label="Province"
          value={data.province}
          onChange={(value) =>
            update("province", value)
          }
        />

        <Field
          label="Postal Code"
          value={data.postalCode}
          onChange={(value) =>
            update(
              "postalCode",
              value,
            )
          }
        />

        <Field
          label="Phone"
          value={data.phone}
          onChange={(value) =>
            update("phone", value)
          }
        />

        <Field
          label="Email"
          value={data.email}
          onChange={(value) =>
            update("email", value)
          }
        />

        <Field
          label="Website"
          value={data.website}
          onChange={(value) =>
            update("website", value)
          }
        />
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
        {label}
      </label>

      <input
        value={value}
        disabled={disabled}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className={[
          "h-9 w-full rounded-lg border border-[#D0D5DD] px-3 text-xs text-[#172033] outline-none transition focus:border-[#1677FF] focus:ring-2 focus:ring-[#EAF2FF]",

          disabled
            ? "cursor-not-allowed bg-[#F2F4F7] text-[#98A2B3]"
            : "bg-white",
        ].join(" ")}
      />
    </div>
  );
}

export default SettingsOrganization;