import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  BriefcaseBusiness,
  Mail,
  MoreHorizontal,
  Phone,
  UserRound,
} from "lucide-react";

import type {
  Employee,
  EmployeeStatus,
} from "../employeesData";

export type EmployeeSortField =
  | "employeeNumber"
  | "name"
  | "role"
  | "department"
  | "employmentType"
  | "hireDate"
  | "status";

export type EmployeeSortDirection =
  | "asc"
  | "desc";

type EmployeesTableProps = {
  employees: Employee[];
  sortField: EmployeeSortField;
  sortDirection: EmployeeSortDirection;
  onSort: (field: EmployeeSortField) => void;
  onEmployeeClick: (employee: Employee) => void;
};

const STATUS_STYLES: Record<
  EmployeeStatus,
  {
    background: string;
    text: string;
    dot: string;
  }
> = {
  Active: {
    background: "bg-[#E8F8F1]",
    text: "text-[#087443]",
    dot: "bg-[#12B76A]",
  },

  "On Leave": {
    background: "bg-[#FFFAEB]",
    text: "text-[#B54708]",
    dot: "bg-[#F79009]",
  },

  Inactive: {
    background: "bg-[#F2F4F7]",
    text: "text-[#475467]",
    dot: "bg-[#98A2B3]",
  },
};

function SortIcon({
  field,
  activeField,
  direction,
}: {
  field: EmployeeSortField;
  activeField: EmployeeSortField;
  direction: EmployeeSortDirection;
}) {
  if (field !== activeField) {
    return (
      <ArrowUpDown className="h-3 w-3 text-[#98A2B3]" />
    );
  }

  return direction === "asc" ? (
    <ArrowUp className="h-3 w-3 text-[#1677FF]" />
  ) : (
    <ArrowDown className="h-3 w-3 text-[#1677FF]" />
  );
}

function TableHeader({
  children,
  field,
  activeField,
  direction,
  onSort,
}: {
  children: React.ReactNode;
  field: EmployeeSortField;
  activeField: EmployeeSortField;
  direction: EmployeeSortDirection;
  onSort: (field: EmployeeSortField) => void;
}) {
  return (
    <th
      scope="col"
      className="whitespace-nowrap px-4 py-3 text-left"
    >
      <button
        type="button"
        onClick={() => onSort(field)}
        className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085] transition hover:text-[#344054]"
      >
        {children}

        <SortIcon
          field={field}
          activeField={activeField}
          direction={direction}
        />
      </button>
    </th>
  );
}

export function EmployeesTable({
  employees,
  sortField,
  sortDirection,
  onSort,
  onEmployeeClick,
}: EmployeesTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between border-b border-[#E4E7EC] px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-[#172033]">
            Employees
          </h3>

          <p className="mt-0.5 text-[11px] text-[#667085]">
            {employees.length}{" "}
            {employees.length === 1
              ? "employee"
              : "employees"}{" "}
            displayed
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-[#98A2B3]">
          <span className="h-2 w-2 rounded-full bg-[#12B76A]" />
          Workforce overview
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1200px] w-full border-collapse">
          <thead className="border-b border-[#E4E7EC] bg-[#F9FAFB]">
            <tr>
              <TableHeader
                field="employeeNumber"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Employee ID
              </TableHeader>

              <TableHeader
                field="name"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Employee
              </TableHeader>

              <TableHeader
                field="role"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Role
              </TableHeader>

              <TableHeader
                field="department"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Department
              </TableHeader>

              <TableHeader
                field="employmentType"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Employment
              </TableHeader>

              <TableHeader
                field="hireDate"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Hire Date
              </TableHeader>

              <TableHeader
                field="status"
                activeField={sortField}
                direction={sortDirection}
                onSort={onSort}
              >
                Status
              </TableHeader>

              <th
                scope="col"
                className="w-12 px-4 py-3"
              >
                <span className="sr-only">
                  Actions
                </span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E4E7EC]">
            {employees.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-16 text-center"
                >
                  <div className="mx-auto flex max-w-sm flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2F4F7]">
                      <UserRound className="h-4 w-4 text-[#98A2B3]" />
                    </div>

                    <h4 className="mt-3 text-sm font-semibold text-[#344054]">
                      No employees found
                    </h4>

                    <p className="mt-1 text-xs text-[#667085]">
                      Try changing your filters
                      or search criteria.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              employees.map((employee) => {
                const statusStyle =
                  STATUS_STYLES[
                    employee.status
                  ];

                return (
                  <tr
                    key={employee.id}
                    onClick={() =>
                      onEmployeeClick(
                        employee,
                      )
                    }
                    className="group cursor-pointer bg-white transition hover:bg-[#F9FAFB]"
                  >
                    <td className="px-4 py-3">
                      <div className="text-xs font-semibold text-[#344054]">
                        {
                          employee.employeeNumber
                        }
                      </div>

                      <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                        {employee.id}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF2FF]">
                          <UserRound className="h-3.5 w-3.5 text-[#1677FF]" />
                        </div>

                        <div className="min-w-0">
                          <div className="truncate text-xs font-semibold text-[#172033]">
                            {employee.firstName}{" "}
                            {employee.lastName}
                          </div>

                          <div className="mt-0.5 flex items-center gap-1 text-[10px] text-[#98A2B3]">
                            <Mail className="h-2.5 w-2.5" />
                            <span className="truncate">
                              {
                                employee.email
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <BriefcaseBusiness className="h-3.5 w-3.5 text-[#98A2B3]" />

                        <div>
                          <div className="whitespace-nowrap text-xs font-semibold text-[#344054]">
                            {employee.role}
                          </div>

                          {employee.license && (
                            <div className="mt-0.5 text-[10px] text-[#98A2B3]">
                              {
                                employee.license
                              }
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-xs font-medium text-[#344054]">
                        {
                          employee.department
                        }
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span className="inline-flex whitespace-nowrap rounded-md bg-[#F2F4F7] px-2 py-1 text-[10px] font-medium text-[#475467]">
                        {
                          employee.employmentType
                        }
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="text-xs font-medium text-[#344054]">
                        {new Intl.DateTimeFormat(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        ).format(
                          new Date(
                            `${employee.hireDate}T00:00:00`,
                          ),
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyle.background} ${statusStyle.text}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                        />

                        {
                          employee.status
                        }
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();

                          onEmployeeClick(
                            employee,
                          );
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-[#98A2B3] opacity-0 transition hover:bg-[#F2F4F7] hover:text-[#344054] group-hover:opacity-100"
                        aria-label={`Open ${employee.firstName} ${employee.lastName}`}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-2 border-t border-[#E4E7EC] bg-[#FCFCFD] px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[10px] text-[#667085]">
          Showing{" "}
          <span className="font-semibold text-[#344054]">
            {employees.length}
          </span>{" "}
          employee
          {employees.length === 1
            ? ""
            : "s"}
        </p>

        <div className="flex items-center gap-1 text-[10px] text-[#98A2B3]">
          <Phone className="h-3 w-3" />
          Employee directory
        </div>
      </div>
    </div>
  );
}

export default EmployeesTable;