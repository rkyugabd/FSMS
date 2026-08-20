import {
  Plus,
  RefreshCw,
  Search,
  SlidersHorizontal,
  UsersRound,
} from "lucide-react";

import { useMemo, useState } from "react";

import {
  employeeData,
  type Employee,
  type EmployeeStatus,
} from "./employeesData";

import {
  EmployeesTable,
  type EmployeeSortDirection,
  type EmployeeSortField,
} from "./components/EmployeesTable";

import { EmployeesPagination } from "./components/EmployeesPagination";

import { EmployeesEmptyState } from "./components/EmployeesEmptyState";

import { EmployeeDetails } from "./components/EmployeeDetails";

import { CreateEmployeeModal } from "./components/CreateEmployeeModal";

import { EditEmployeeModal } from "./components/EditEmployeeModal";

const PAGE_SIZE = 8;

export function Employees() {
  const [employees, setEmployees] =
    useState<Employee[]>(
      employeeData,
    );

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<EmployeeStatus | "All">(
      "All",
    );

  const [
    departmentFilter,
    setDepartmentFilter,
  ] = useState("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [sortField, setSortField] =
    useState<EmployeeSortField>("name");

  const [
    sortDirection,
    setSortDirection,
  ] =
    useState<EmployeeSortDirection>("asc");

  const [
    selectedEmployee,
    setSelectedEmployee,
  ] = useState<Employee | null>(null);

  const [
    editingEmployee,
    setEditingEmployee,
  ] = useState<Employee | null>(null);

  const [
    isCreateOpen,
    setIsCreateOpen,
  ] = useState(false);

  /*
   * =========================================================
   * FILTER
   * =========================================================
   */

  const filteredEmployees = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return employees.filter(
      (employee) => {
        const matchesSearch =
          query.length === 0 ||
          [
            employee.id,
            employee.employeeNumber,
            employee.firstName,
            employee.lastName,
            employee.email,
            employee.phone,
            employee.role,
            employee.department,
            employee.employmentType,
            employee.status,
            employee.license,
            employee.supervisor,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(query);

        const matchesStatus =
          statusFilter === "All" ||
          employee.status ===
            statusFilter;

        const matchesDepartment =
          departmentFilter === "All" ||
          employee.department ===
            departmentFilter;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesDepartment
        );
      },
    );
  }, [
    employees,
    search,
    statusFilter,
    departmentFilter,
  ]);

  /*
   * =========================================================
   * SORT
   * =========================================================
   */

  const sortedEmployees = useMemo(() => {
    const result = [
      ...filteredEmployees,
    ];

    result.sort((a, b) => {
      let aValue = "";
      let bValue = "";

      switch (sortField) {
        case "employeeNumber":
          aValue =
            a.employeeNumber;
          bValue =
            b.employeeNumber;
          break;

        case "name":
          aValue =
            `${a.firstName} ${a.lastName}`;
          bValue =
            `${b.firstName} ${b.lastName}`;
          break;

        case "role":
          aValue = a.role;
          bValue = b.role;
          break;

        case "department":
          aValue = a.department;
          bValue = b.department;
          break;

        case "employmentType":
          aValue =
            a.employmentType;
          bValue =
            b.employmentType;
          break;

        case "hireDate":
          aValue = a.hireDate;
          bValue = b.hireDate;
          break;

        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
      }

      const comparison =
        String(aValue).localeCompare(
          String(bValue),
          undefined,
          {
            numeric: true,
            sensitivity: "base",
          },
        );

      return sortDirection ===
        "asc"
        ? comparison
        : -comparison;
    });

    return result;
  }, [
    filteredEmployees,
    sortField,
    sortDirection,
  ]);

  /*
   * =========================================================
   * PAGINATION
   * =========================================================
   */

  const totalPages = Math.max(
    1,
    Math.ceil(
      sortedEmployees.length /
        PAGE_SIZE,
    ),
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const paginatedEmployees =
    useMemo(() => {
      const start =
        (safeCurrentPage - 1) *
        PAGE_SIZE;

      return sortedEmployees.slice(
        start,
        start + PAGE_SIZE,
      );
    }, [
      sortedEmployees,
      safeCurrentPage,
    ]);

  /*
   * =========================================================
   * STATUS COUNTS
   * =========================================================
   */

  const statusCounts = useMemo(() => {
    return {
      total: employees.length,

      active: employees.filter(
        (employee) =>
          employee.status ===
          "Active",
      ).length,

      onLeave: employees.filter(
        (employee) =>
          employee.status ===
          "On Leave",
      ).length,

      inactive: employees.filter(
        (employee) =>
          employee.status ===
          "Inactive",
      ).length,
    };
  }, [employees]);

  /*
   * =========================================================
   * DEPARTMENT COUNTS
   * =========================================================
   */

  const departmentCount =
    useMemo(() => {
      return new Set(
        employees.map(
          (employee) =>
            employee.department,
        ),
      ).size;
    }, [employees]);

  /*
   * =========================================================
   * HANDLERS
   * =========================================================
   */

  const handleSearchChange = (
    value: string,
  ) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (
    value: EmployeeStatus | "All",
  ) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleDepartmentChange = (
    value: string,
  ) => {
    setDepartmentFilter(value);
    setCurrentPage(1);
  };

  const handleSort = (
    field: EmployeeSortField,
  ) => {
    if (sortField === field) {
      setSortDirection(
        (previous) =>
          previous === "asc"
            ? "desc"
            : "asc",
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }

    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setEmployees([...employeeData]);
    setSearch("");
    setStatusFilter("All");
    setDepartmentFilter("All");
    setCurrentPage(1);
    setSortField("name");
    setSortDirection("asc");
    setSelectedEmployee(null);
    setEditingEmployee(null);
  };

  const handleCreateEmployee = (
    employee: Employee,
  ) => {
    setEmployees((previous) => [
      employee,
      ...previous,
    ]);

    setIsCreateOpen(false);
    setCurrentPage(1);
  };

  const handleUpdateEmployee = (
    updatedEmployee: Employee,
  ) => {
    setEmployees((previous) =>
      previous.map((employee) =>
        employee.id ===
        updatedEmployee.id
          ? updatedEmployee
          : employee,
      ),
    );

    setEditingEmployee(null);

    if (
      selectedEmployee?.id ===
      updatedEmployee.id
    ) {
      setSelectedEmployee(
        updatedEmployee,
      );
    }
  };

  const handleDeleteEmployee = (
    employeeId: string,
  ) => {
    setEmployees((previous) =>
      previous.filter(
        (employee) =>
          employee.id !== employeeId,
      ),
    );

    setSelectedEmployee(null);
  };

  /*
   * =========================================================
   * DEPARTMENTS
   * =========================================================
   */

  const departments = useMemo(() => {
    return Array.from(
      new Set(
        employees.map(
          (employee) =>
            employee.department,
        ),
      ),
    ).sort();
  }, [employees]);

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="space-y-5 text-[#172033]">
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2FF]">
              <UsersRound className="h-4 w-4 text-[#1677FF]" />
            </div>

            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#344054]">
              Workforce Management
            </span>
          </div>

          <h1 className="text-[25px] font-semibold tracking-tight text-[#172033]">
            Employees
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-[#475467]">
            Manage employees, roles,
            departments, qualifications
            and workforce status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            className="flex h-9 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs font-medium text-[#344054] shadow-sm transition hover:bg-[#F9FAFB]"
          >
            <RefreshCw className="h-3.5 w-3.5 text-[#667085]" />
            Refresh
          </button>

          <button
            type="button"
            className="flex h-9 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs font-medium text-[#344054] shadow-sm transition hover:bg-[#F9FAFB]"
          >
            <SlidersHorizontal className="h-4 w-4 text-[#667085]" />
            View Options
          </button>

          <button
            type="button"
            onClick={() =>
              setIsCreateOpen(true)
            }
            className="flex h-9 items-center gap-2 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white shadow-sm shadow-blue-900/20 transition hover:bg-[#1264D8] active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            New Employee
          </button>
        </div>
      </section>

      {/* =====================================================
          SUMMARY
          ===================================================== */}

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <button
          type="button"
          onClick={() => {
            handleStatusChange("All");
            handleDepartmentChange(
              "All",
            );
          }}
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Total Employees
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#172033]">
            {statusCounts.total}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Organization workforce
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            handleStatusChange(
              "Active",
            )
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Active
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#087443]">
            {statusCounts.active}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Currently working
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            handleStatusChange(
              "On Leave",
            )
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            On Leave
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#B54708]">
            {statusCounts.onLeave}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Temporarily unavailable
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            handleDepartmentChange(
              "All",
            )
          }
          className="rounded-xl border border-[#E4E7EC] bg-white p-4 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:bg-[#FCFCFD]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#98A2B3]">
            Departments
          </p>

          <p className="mt-2 text-2xl font-semibold tracking-tight text-[#1355B5]">
            {departmentCount}
          </p>

          <p className="mt-1 text-[11px] text-[#667085]">
            Operational departments
          </p>
        </button>
      </section>

      {/* =====================================================
          SEARCH / FILTER
          ===================================================== */}

      <section className="rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative min-w-0 flex-1 xl:max-w-md">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A2B3]" />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                handleSearchChange(
                  event.target.value,
                )
              }
              placeholder="Search employee, role, department..."
              className="h-9 w-full rounded-lg border border-[#D0D5DD] bg-white pl-9 pr-3 text-xs text-[#344054] outline-none transition placeholder:text-[#98A2B3] focus:border-[#1677FF] focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
              Status
            </span>

            {[
              "All",
              "Active",
              "On Leave",
              "Inactive",
            ].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() =>
                  handleStatusChange(
                    status as
                      | EmployeeStatus
                      | "All",
                  )
                }
                className={[
                  "h-8 rounded-lg px-3 text-[11px] font-medium transition",
                  statusFilter ===
                  status
                    ? "bg-[#172033] text-white"
                    : "border border-[#D0D5DD] bg-white text-[#475467] hover:bg-[#F9FAFB]",
                ].join(" ")}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
              Department
            </span>

            <select
              value={departmentFilter}
              onChange={(event) =>
                handleDepartmentChange(
                  event.target.value,
                )
              }
              className="h-8 rounded-lg border border-[#D0D5DD] bg-white px-3 text-[11px] text-[#475467] outline-none focus:border-[#1677FF]"
            >
              <option value="All">
                All Departments
              </option>

              {departments.map(
                (department) => (
                  <option
                    key={department}
                    value={department}
                  >
                    {department}
                  </option>
                ),
              )}
            </select>
          </div>
        </div>
      </section>

      {/* =====================================================
          TABLE
          ===================================================== */}

      <section>
        {paginatedEmployees.length >
        0 ? (
          <>
            <EmployeesTable
              employees={
                paginatedEmployees
              }
              sortField={sortField}
              sortDirection={
                sortDirection
              }
              onSort={handleSort}
              onEmployeeClick={
                setSelectedEmployee
              }
            />

            <EmployeesPagination
              currentPage={
                safeCurrentPage
              }
              totalPages={totalPages}
              totalItems={
                sortedEmployees.length
              }
              pageSize={PAGE_SIZE}
              onPageChange={
                setCurrentPage
              }
            />
          </>
        ) : (
          <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <EmployeesEmptyState
              title={
                search ||
                statusFilter !==
                  "All" ||
                departmentFilter !==
                  "All"
                  ? "No matching employees"
                  : "No employees found"
              }
              description={
                search ||
                statusFilter !==
                  "All" ||
                departmentFilter !==
                  "All"
                  ? "Try changing your search or filters."
                  : "There are currently no employees in the organization."
              }
              actionLabel="New Employee"
              onAction={() =>
                setIsCreateOpen(true)
              }
            />
          </div>
        )}
      </section>

      {/* =====================================================
          DETAILS
          ===================================================== */}

      {selectedEmployee && (
        <section className="relative">
          <EmployeeDetails
            employee={
              selectedEmployee
            }
            onClose={() =>
              setSelectedEmployee(null)
            }
            onEdit={(employee) => {
              setEditingEmployee(
                employee,
              );
              setSelectedEmployee(
                null,
              );
            }}
            onDelete={
              handleDeleteEmployee
            }
          />
        </section>
      )}

      {/* =====================================================
          CREATE
          ===================================================== */}

      <CreateEmployeeModal
        isOpen={isCreateOpen}
        onClose={() =>
          setIsCreateOpen(false)
        }
        onCreate={
          handleCreateEmployee
        }
      />

      {/* =====================================================
          EDIT
          ===================================================== */}

      <EditEmployeeModal
        isOpen={
          editingEmployee !== null
        }
        employee={editingEmployee}
        onClose={() =>
          setEditingEmployee(null)
        }
        onSave={handleUpdateEmployee}
      />
    </div>
  );
}

export default Employees;