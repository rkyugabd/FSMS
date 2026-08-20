import {
  Mail,
  Plus,
  UserRound,
} from "lucide-react";

import type {
  SettingsUser,
} from "../settingsData";

type SettingsUsersProps = {
  users: SettingsUser[];
  onAddUser: () => void;
};

export function SettingsUsers({
  users,
  onAddUser,
}: SettingsUsersProps) {
  return (
    <div className="rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
        <div className="flex items-center gap-2">
          <UserRound className="h-4 w-4 text-[#667085]" />

          <div>
            <h2 className="text-sm font-semibold text-[#172033]">
              System Users
            </h2>

            <p className="mt-0.5 text-[11px] text-[#667085]">
              Manage users who have access to the FSMS platform.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onAddUser}
          className="flex h-8 items-center gap-1.5 rounded-lg bg-[#1677FF] px-3 text-[11px] font-semibold text-white transition hover:bg-[#1264D8]"
        >
          <Plus className="h-3.5 w-3.5" />
          Add User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead>
            <tr className="border-b border-[#E4E7EC] bg-[#F9FAFB]">
              <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                User
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                Role
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                Department
              </th>

              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                Status
              </th>

              <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
                Last Login
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-[#F2F4F7] last:border-b-0 hover:bg-[#FCFCFD]"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF2FF] text-[10px] font-semibold text-[#1677FF]">
                      {user.name
                        .split(" ")
                        .map(
                          (part) =>
                            part[0],
                        )
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-[#172033]">
                        {user.name}
                      </p>

                      <p className="mt-0.5 flex items-center gap-1 text-[10px] text-[#667085]">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3.5 text-xs text-[#344054]">
                  {user.role}
                </td>

                <td className="px-4 py-3.5 text-xs text-[#667085]">
                  {user.department}
                </td>

                <td className="px-4 py-3.5">
                  <span
                    className={[
                      "inline-flex rounded-full px-2 py-1 text-[10px] font-semibold",

                      user.status ===
                      "Active"
                        ? "bg-[#ECFDF3] text-[#027A48]"
                        : user.status ===
                            "Inactive"
                          ? "bg-[#F2F4F7] text-[#667085]"
                          : "bg-[#FEF3F2] text-[#B42318]",
                    ].join(" ")}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="px-5 py-3.5 text-xs text-[#667085]">
                  {user.lastLogin}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SettingsUsers;