import {
  CalendarDays,
  Plus,
  SlidersHorizontal,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import type {
  DateSelectArg,
  EventClickArg,
} from "@fullcalendar/core";

import { SchedulingFilters } from "./components/SchedulingFilters";
import {
  SchedulingToolbar,
  type SchedulingView,
} from "./components/SchedulingToolbar";
import { FlightCalendar } from "./components/FlightCalendar";

/* =========================================================
   DEFAULT OPERATIONAL DATE
   ========================================================= */

const DEFAULT_DATE = new Date(
  "2026-08-18T00:00:00",
);

/* =========================================================
   DATE FORMATTERS
   ========================================================= */

function formatSchedulingDate(
  date: Date,
): string {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  ).format(date);
}

function formatSchedulingWeekday(
  date: Date,
): string {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      weekday: "long",
    },
  ).format(date);
}

/* =========================================================
   SCHEDULING PAGE
   ========================================================= */

export function Scheduling() {
  /* =======================================================
     PAGE STATE
     ======================================================= */

  const [currentDate, setCurrentDate] =
    useState<Date>(
      new Date(DEFAULT_DATE),
    );

  const [activeView, setActiveView] =
    useState<SchedulingView>("day");

  /* =======================================================
     DISPLAY DATE
     ======================================================= */

  const formattedDate = useMemo(
    () =>
      formatSchedulingDate(
        currentDate,
      ),
    [currentDate],
  );

  const formattedWeekday = useMemo(
    () =>
      formatSchedulingWeekday(
        currentDate,
      ),
    [currentDate],
  );

  /* =======================================================
     TODAY
     ======================================================= */

  const handleToday = () => {
    setCurrentDate(
      new Date(DEFAULT_DATE),
    );
  };

  /* =======================================================
     PREVIOUS
     ======================================================= */

  const handlePrevious = () => {
    setCurrentDate((previousDate) => {
      const nextDate =
        new Date(previousDate);

      if (activeView === "month") {
        nextDate.setMonth(
          nextDate.getMonth() - 1,
        );
      } else if (
        activeView === "week"
      ) {
        nextDate.setDate(
          nextDate.getDate() - 7,
        );
      } else {
        nextDate.setDate(
          nextDate.getDate() - 1,
        );
      }

      return nextDate;
    });
  };

  /* =======================================================
     NEXT
     ======================================================= */

  const handleNext = () => {
    setCurrentDate((previousDate) => {
      const nextDate =
        new Date(previousDate);

      if (activeView === "month") {
        nextDate.setMonth(
          nextDate.getMonth() + 1,
        );
      } else if (
        activeView === "week"
      ) {
        nextDate.setDate(
          nextDate.getDate() + 7,
        );
      } else {
        nextDate.setDate(
          nextDate.getDate() + 1,
        );
      }

      return nextDate;
    });
  };

  /* =======================================================
     VIEW CHANGE
     ======================================================= */

  const handleViewChange = (
    view: SchedulingView,
  ) => {
    setActiveView(view);
  };

  /* =======================================================
     CREATE NEW BOOKING
     ======================================================= */

  const handleCreate = () => {
    console.log(
      "FSMS: Create new schedule",
    );
  };

  /* =======================================================
     EVENT CLICK
     ======================================================= */

  const handleEventClick = (
    event: EventClickArg,
  ) => {
    console.log(
      "FSMS: Scheduling event selected",
      event.event.id,
    );
  };

  /* =======================================================
     DATE / TIME SLOT SELECT
     ======================================================= */

  const handleDateSelect = (
    selection: DateSelectArg,
  ) => {
    console.log(
      "FSMS: Scheduling time slot selected",
      {
        start: selection.start,
        end: selection.end,
      },
    );
  };

  /* =======================================================
     PAGE
     ======================================================= */

  return (
    <div className="space-y-5 text-[#172033]">

      {/* ===================================================
          PAGE HEADER
          =================================================== */}

      <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">

        {/* Header Information */}

        <div>
          <div className="mb-2 flex items-center gap-2">

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2FF]">
              <CalendarDays className="h-4 w-4 text-[#1677FF]" />
            </div>

            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#344054]">
              Flight Operations
            </span>

          </div>

          <h1 className="text-[25px] font-semibold tracking-tight text-[#172033]">
            Scheduling
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-[#475467]">
            Manage flights, simulators,
            instructors, students and
            aircraft availability.
          </p>
        </div>

        {/* Header Actions */}

        <div className="flex items-center gap-2">

          <button
            type="button"
            className="flex h-9 items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-3 text-xs font-medium text-[#344054] shadow-sm transition hover:bg-[#F9FAFB]"
          >
            <SlidersHorizontal className="h-4 w-4 text-[#667085]" />

            <span className="text-[#172033]">
              View Options
            </span>
          </button>

          <button
            type="button"
            onClick={handleCreate}
            className="flex h-9 items-center gap-2 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white shadow-sm shadow-blue-900/20 transition hover:bg-[#1264D8] active:scale-[0.98]"
          >
            <Plus className="h-4 w-4 text-white" />

            <span className="text-white">
              New Booking
            </span>
          </button>

        </div>
      </section>

      {/* ===================================================
          SCHEDULING TOOLBAR
          =================================================== */}

      <SchedulingToolbar
        activeView={activeView}
        onViewChange={
          handleViewChange
        }
        onToday={handleToday}
        onPrevious={
          handlePrevious
        }
        onNext={handleNext}
        onCreate={handleCreate}
      />

      {/* ===================================================
          CURRENT OPERATIONAL DATE
          =================================================== */}

      <section className="flex flex-col gap-2 rounded-xl border border-[#E4E7EC] bg-white px-5 py-3 text-[#172033] shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#667085]">
            Operational Date
          </p>

          <h2 className="mt-0.5 text-sm font-semibold text-[#172033]">
            {formattedDate}
          </h2>
        </div>

        <div className="flex items-center gap-2">

          <span className="flex h-2 w-2 rounded-full bg-[#12B76A]" />

          <span className="text-[11px] font-medium text-[#344054]">
            {formattedWeekday} · Local
            Operations Time
          </span>

        </div>

      </section>

      {/* ===================================================
          SCHEDULING WORKSPACE
          =================================================== */}

      <section className="flex flex-col gap-4 xl:flex-row xl:items-start">

        {/* =================================================
            FILTER PANEL
            ================================================= */}

        <div className="text-[#172033]">
          <SchedulingFilters />
        </div>

        {/* =================================================
            CALENDAR
            ================================================= */}

        <section className="min-w-0 flex-1 overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-sm">

          <FlightCalendar
            onEventClick={
              handleEventClick
            }
            onDateSelect={
              handleDateSelect
            }
          />

        </section>

      </section>

      {/* ===================================================
          OPERATIONAL STATUS FOOTER
          =================================================== */}

      <section className="flex flex-col gap-2 rounded-lg border border-[#E4E7EC] bg-white px-4 py-3 text-[#172033] sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-2">

          <span className="flex h-2 w-2 rounded-full bg-[#12B76A]" />

          <span className="text-[10px] font-medium text-[#344054]">
            Scheduling workspace active
          </span>

        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-[#667085]">

          <span>
            View:{" "}

            <span className="font-semibold text-[#172033]">
              {activeView
                .charAt(0)
                .toUpperCase() +
                activeView.slice(1)}
            </span>
          </span>

          <span>
            FSMS Operational System
          </span>

        </div>

      </section>

    </div>
  );
}