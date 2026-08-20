import {
  useMemo,
  useState,
} from "react";

import type {
  Report,
  ReportCategory,
  ReportFormat,
  ReportStatus,
} from "./reportsData";

import {
  reportData,
} from "./reportsData";

import { ReportsHeader } from "./components/ReportsHeader";
import { ReportsFilters } from "./components/ReportsFilters";
import { ReportsKpiCards } from "./components/ReportsKpiCards";
import { ReportsTable } from "./components/ReportsTable";
import { ReportDetails } from "./components/ReportDetails";
import { CreateReportModal } from "./components/CreateReportModal";
import { EditReportModal } from "./components/EditReportModal";
import { ReportsPagination } from "./components/ReportsPagination";
import { ReportsEmptyState } from "./components/ReportsEmptyState";

const PAGE_SIZE = 8;

type SortField =
  | "name"
  | "category"
  | "createdAt"
  | "status"
  | "format";

type SortDirection =
  | "asc"
  | "desc";

export function Reports() {
  const [reports, setReports] =
    useState<Report[]>(
      reportData,
    );

  const [search, setSearch] =
    useState("");

  const [
    categoryFilter,
    setCategoryFilter,
  ] = useState<
    ReportCategory | "All"
  >("All");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState<
    ReportStatus | "All"
  >("All");

  const [
    formatFilter,
    setFormatFilter,
  ] = useState<
    ReportFormat | "All"
  >("All");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const [sortField, setSortField] =
    useState<SortField>(
      "createdAt",
    );

  const [
    sortDirection,
    setSortDirection,
  ] =
    useState<SortDirection>(
      "desc",
    );

  const [
    selectedReport,
    setSelectedReport,
  ] =
    useState<Report | null>(
      null,
    );

  const [
    editingReport,
    setEditingReport,
  ] =
    useState<Report | null>(
      null,
    );

  const [
    isCreateOpen,
    setIsCreateOpen,
  ] = useState(false);

  /*
   * =========================================================
   * FILTER
   * =========================================================
   */

  const filteredReports =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return reports.filter(
        (report) => {
          const matchesSearch =
            query.length === 0 ||
            [
              report.id,
              report.reportNumber,
              report.name,
              report.category,
              report.description,
              report.generatedBy,
              report.format,
              report.status,
            ]
              .join(" ")
              .toLowerCase()
              .includes(query);

          const matchesCategory =
            categoryFilter ===
              "All" ||
            report.category ===
              categoryFilter;

          const matchesStatus =
            statusFilter ===
              "All" ||
            report.status ===
              statusFilter;

          const matchesFormat =
            formatFilter ===
              "All" ||
            report.format ===
              formatFilter;

          return (
            matchesSearch &&
            matchesCategory &&
            matchesStatus &&
            matchesFormat
          );
        },
      );
    }, [
      reports,
      search,
      categoryFilter,
      statusFilter,
      formatFilter,
    ]);

  /*
   * =========================================================
   * SORT
   * =========================================================
   */

  const sortedReports =
    useMemo(() => {
      const result = [
        ...filteredReports,
      ];

      result.sort(
        (a, b) => {
          let aValue = "";
          let bValue = "";

          switch (
            sortField
          ) {
            case "name":
              aValue = a.name;
              bValue = b.name;
              break;

            case "category":
              aValue =
                a.category;
              bValue =
                b.category;
              break;

            case "createdAt":
              aValue =
                a.createdAt;
              bValue =
                b.createdAt;
              break;

            case "status":
              aValue =
                a.status;
              bValue =
                b.status;
              break;

            case "format":
              aValue =
                a.format;
              bValue =
                b.format;
              break;
          }

          const comparison =
            String(
              aValue,
            ).localeCompare(
              String(
                bValue,
              ),
              undefined,
              {
                numeric: true,
                sensitivity:
                  "base",
              },
            );

          return sortDirection ===
            "asc"
            ? comparison
            : -comparison;
        },
      );

      return result;
    }, [
      filteredReports,
      sortField,
      sortDirection,
    ]);

  /*
   * =========================================================
   * PAGINATION
   * =========================================================
   */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        sortedReports.length /
          PAGE_SIZE,
      ),
    );

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages,
    );

  const paginatedReports =
    useMemo(() => {
      const start =
        (safeCurrentPage -
          1) *
        PAGE_SIZE;

      return sortedReports.slice(
        start,
        start + PAGE_SIZE,
      );
    }, [
      sortedReports,
      safeCurrentPage,
    ]);

  /*
   * =========================================================
   * KPI
   * =========================================================
   */

  const kpis = useMemo(
    () => ({
      total: reports.length,

      ready: reports.filter(
        (report) =>
          report.status ===
          "Ready",
      ).length,

      scheduled:
        reports.filter(
          (report) =>
            report.scheduled,
        ).length,

      failed: reports.filter(
        (report) =>
          report.status ===
          "Failed",
      ).length,
    }),
    [reports],
  );

  /*
   * =========================================================
   * HANDLERS
   * =========================================================
   */

  const handleSearchChange =
    (value: string) => {
      setSearch(value);
      setCurrentPage(1);
    };

  const handleCategoryChange =
    (
      value:
        | ReportCategory
        | "All",
    ) => {
      setCategoryFilter(
        value,
      );
      setCurrentPage(1);
    };

  const handleStatusChange =
    (
      value:
        | ReportStatus
        | "All",
    ) => {
      setStatusFilter(
        value,
      );
      setCurrentPage(1);
    };

  const handleFormatChange =
    (
      value:
        | ReportFormat
        | "All",
    ) => {
      setFormatFilter(
        value,
      );
      setCurrentPage(1);
    };

  const handleSort = (
    field: SortField,
  ) => {
    if (
      sortField === field
    ) {
      setSortDirection(
        (previous) =>
          previous ===
          "asc"
            ? "desc"
            : "asc",
      );
    } else {
      setSortField(field);
      setSortDirection(
        "asc",
      );
    }

    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setReports([
      ...reportData,
    ]);

    setSearch("");
    setCategoryFilter(
      "All",
    );
    setStatusFilter(
      "All",
    );
    setFormatFilter("All");
    setCurrentPage(1);
    setSortField(
      "createdAt",
    );
    setSortDirection(
      "desc",
    );
    setSelectedReport(
      null,
    );
    setEditingReport(
      null,
    );
  };

  const handleCreateReport = (
    report: Report,
  ) => {
    setReports(
      (previous) => [
        report,
        ...previous,
      ],
    );

    setIsCreateOpen(
      false,
    );

    setCurrentPage(1);
  };

  const handleUpdateReport = (
    updatedReport: Report,
  ) => {
    setReports(
      (previous) =>
        previous.map(
          (report) =>
            report.id ===
            updatedReport.id
              ? updatedReport
              : report,
        ),
    );

    setEditingReport(
      null,
    );

    if (
      selectedReport?.id ===
      updatedReport.id
    ) {
      setSelectedReport(
        updatedReport,
      );
    }
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <div className="space-y-5 text-[#172033]">
      <ReportsHeader
        onRefresh={
          handleRefresh
        }
        onCreate={() =>
          setIsCreateOpen(
            true,
          )
        }
      />

      <ReportsKpiCards
        total={kpis.total}
        ready={kpis.ready}
        scheduled={
          kpis.scheduled
        }
        failed={kpis.failed}
      />

      <ReportsFilters
        search={search}
        categoryFilter={
          categoryFilter
        }
        statusFilter={
          statusFilter
        }
        formatFilter={
          formatFilter
        }
        onSearchChange={
          handleSearchChange
        }
        onCategoryChange={
          handleCategoryChange
        }
        onStatusChange={
          handleStatusChange
        }
        onFormatChange={
          handleFormatChange
        }
      />

      <section>
        {paginatedReports.length >
        0 ? (
          <>
            <ReportsTable
              reports={
                paginatedReports
              }
              sortField={
                sortField
              }
              sortDirection={
                sortDirection
              }
              onSort={
                handleSort
              }
              onReportClick={
                setSelectedReport
              }
            />

            <ReportsPagination
              currentPage={
                safeCurrentPage
              }
              totalPages={
                totalPages
              }
              totalItems={
                sortedReports.length
              }
              pageSize={
                PAGE_SIZE
              }
              onPageChange={
                setCurrentPage
              }
            />
          </>
        ) : (
          <div className="overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <ReportsEmptyState
              title={
                search ||
                categoryFilter !==
                  "All" ||
                statusFilter !==
                  "All" ||
                formatFilter !==
                  "All"
                  ? "No matching reports"
                  : "No reports found"
              }
              description={
                search ||
                categoryFilter !==
                  "All" ||
                statusFilter !==
                  "All" ||
                formatFilter !==
                  "All"
                  ? "Try changing your search or filter criteria."
                  : "There are currently no reports in the reporting center."
              }
              actionLabel="Generate Report"
              onAction={() =>
                setIsCreateOpen(
                  true,
                )
              }
            />
          </div>
        )}
      </section>

      {selectedReport && (
        <ReportDetails
          report={
            selectedReport
          }
          onClose={() =>
            setSelectedReport(
              null,
            )
          }
          onEdit={(report) => {
            setEditingReport(
              report,
            );

            setSelectedReport(
              null,
            );
          }}
        />
      )}

      <CreateReportModal
        isOpen={
          isCreateOpen
        }
        onClose={() =>
          setIsCreateOpen(
            false,
          )
        }
        onCreate={
          handleCreateReport
        }
      />

      <EditReportModal
        isOpen={
          editingReport !==
          null
        }
        report={
          editingReport
        }
        onClose={() =>
          setEditingReport(
            null,
          )
        }
        onSave={
          handleUpdateReport
        }
      />
    </div>
  );
}

export default Reports;