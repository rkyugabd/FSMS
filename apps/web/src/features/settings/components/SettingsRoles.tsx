import {
  Check,
  KeyRound,
  X,
} from "lucide-react";

import {
  permissionLabels,
  type PermissionKey,
  type RolePermission,
  type UserRole,
} from "../settingsData";

type SettingsRolesProps = {
  roles: RolePermission[];
  selectedRole: UserRole;
  onRoleChange: (
    role: UserRole,
  ) => void;
  onPermissionChange: (
    role: UserRole,
    permission: PermissionKey,
  ) => void;
};

const permissionOrder: PermissionKey[] = [
  "dashboard",
  "scheduling",
  "flights",
  "simulators",
  "students",
  "training",
  "aircraft",
  "maintenance",
  "employees",
  "timeTracking",
  "procurement",
  "finance",
  "analytics",
  "reports",
  "settings",
];

export function SettingsRoles({
  roles,
  selectedRole,
  onRoleChange,
  onPermissionChange,
}: SettingsRolesProps) {
  const currentRole = roles.find(
    (role) =>
      role.role === selectedRole,
  );

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="border-b border-[#E4E7EC] px-5 py-4">
          <div className="flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-[#667085]" />

            <div>
              <h2 className="text-sm font-semibold text-[#172033]">
                Roles & Permissions
              </h2>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                Control which areas of the system each role can access.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[220px_minmax(0,1fr)]">
          <div className="border-b border-[#E4E7EC] p-3 lg:border-b-0 lg:border-r">
            <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
              Roles
            </p>

            <div className="space-y-1">
              {roles.map((role) => (
                <button
                  key={role.role}
                  type="button"
                  onClick={() =>
                    onRoleChange(
                      role.role,
                    )
                  }
                  className={[
                    "w-full rounded-lg px-3 py-2.5 text-left text-xs font-semibold transition",

                    selectedRole ===
                    role.role
                      ? "bg-[#EAF2FF] text-[#1355B5]"
                      : "text-[#475467] hover:bg-[#F9FAFB]",
                  ].join(" ")}
                >
                  {role.role}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-[#172033]">
                  {selectedRole}
                </h3>

                <p className="mt-0.5 text-[11px] text-[#667085]">
                  Configure module access.
                </p>
              </div>

              <span className="rounded-full bg-[#F2F4F7] px-2.5 py-1 text-[10px] font-semibold text-[#475467]">
                Role Permissions
              </span>
            </div>

            {currentRole && (
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {permissionOrder.map(
                  (permission) => {
                    const enabled =
                      currentRole
                        .permissions[
                        permission
                      ];

                    return (
                      <button
                        key={permission}
                        type="button"
                        onClick={() =>
                          onPermissionChange(
                            selectedRole,
                            permission,
                          )
                        }
                        className={[
                          "flex items-center justify-between rounded-lg border px-3 py-2.5 text-left transition",

                          enabled
                            ? "border-[#B2DDFF] bg-[#F5FAFF]"
                            : "border-[#E4E7EC] bg-white hover:bg-[#F9FAFB]",
                        ].join(" ")}
                      >
                        <span className="text-[11px] font-medium text-[#344054]">
                          {
                            permissionLabels[
                              permission
                            ]
                          }
                        </span>

                        <span
                          className={[
                            "flex h-5 w-5 items-center justify-center rounded-full",

                            enabled
                              ? "bg-[#1677FF] text-white"
                              : "bg-[#F2F4F7] text-[#98A2B3]",
                          ].join(" ")}
                        >
                          {enabled ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <X className="h-3 w-3" />
                          )}
                        </span>
                      </button>
                    );
                  },
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsRoles;