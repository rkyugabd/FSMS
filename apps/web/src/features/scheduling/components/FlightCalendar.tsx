import { useMemo, useRef } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import type {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";

import { scheduleEvents } from "../schedulingData";

type FlightCalendarProps = {
  onEventClick: (event: EventClickArg) => void;
  onDateSelect: (selection: DateSelectArg) => void;
};

type ScheduleEventType =
  | "Flight"
  | "Simulator"
  | "Training"
  | "Maintenance";

type ScheduleEventStatus =
  | "Scheduled"
  | "Confirmed"
  | "In Flight"
  | "Completed"
  | "Delayed"
  | "Conflict"
  | "Cancelled";

type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  extendedProps: {
    type?: ScheduleEventType;
    status?: ScheduleEventStatus;
    aircraft?: string;
    instructor?: string;
    student?: string;
    trainingType?: string;
  };
};

const EVENT_STYLES: Record<
  ScheduleEventType | "Default",
  {
    background: string;
    border: string;
    text: string;
  }
> = {
  Flight: {
    background: "#EAF2FF",
    border: "#1677FF",
    text: "#1355B5",
  },

  Simulator: {
    background: "#F2EDFF",
    border: "#7F56D9",
    text: "#6941C6",
  },

  Training: {
    background: "#E8F8F1",
    border: "#12B76A",
    text: "#087443",
  },

  Maintenance: {
    background: "#FFF4E5",
    border: "#F79009",
    text: "#B54708",
  },

  Default: {
    background: "#F2F4F7",
    border: "#98A2B3",
    text: "#344054",
  },
};

const STATUS_STYLES: Partial<
  Record<
    ScheduleEventStatus,
    {
      background?: string;
      border?: string;
      text?: string;
    }
  >
> = {
  Conflict: {
    background: "#FEF3F2",
    border: "#F04438",
    text: "#B42318",
  },

  Delayed: {
    background: "#FFFAEB",
    border: "#F79009",
    text: "#B54708",
  },

  Completed: {
    background: "#F2F4F7",
    border: "#98A2B3",
    text: "#475467",
  },

  Cancelled: {
    background: "#FEF3F2",
    border: "#D92D20",
    text: "#B42318",
  },

  "In Flight": {
    background: "#EAF2FF",
    border: "#1677FF",
    text: "#1355B5",
  },
};

function getEventType(
  value: unknown,
): ScheduleEventType | "Default" {
  if (
    value === "Flight" ||
    value === "Simulator" ||
    value === "Training" ||
    value === "Maintenance"
  ) {
    return value;
  }

  return "Default";
}

function getEventStatus(
  value: unknown,
): ScheduleEventStatus | undefined {
  if (
    value === "Scheduled" ||
    value === "Confirmed" ||
    value === "In Flight" ||
    value === "Completed" ||
    value === "Delayed" ||
    value === "Conflict" ||
    value === "Cancelled"
  ) {
    return value;
  }

  return undefined;
}

function EventContent({
  eventInfo,
}: {
  eventInfo: EventContentArg;
}) {
  const type = getEventType(
    eventInfo.event.extendedProps.type,
  );

  const status = getEventStatus(
    eventInfo.event.extendedProps.status,
  );

  const aircraft =
    eventInfo.event.extendedProps.aircraft;

  const instructor =
    eventInfo.event.extendedProps.instructor;

  const student =
    eventInfo.event.extendedProps.student;

  const trainingType =
    eventInfo.event.extendedProps.trainingType;

  const isConflict = status === "Conflict";

  /*
   * Event text color.
   *
   * This is intentionally applied directly to the
   * individual text elements instead of relying only
   * on FullCalendar's parent event color.
   *
   * This prevents global calendar CSS from changing
   * the text back to white.
   */
  const eventTextColor =
    isConflict
      ? "#B42318"
      : EVENT_STYLES[type].text;

  const secondaryTextColor =
    isConflict
      ? "#B42318"
      : "#344054";

  const statusTextColor =
    status === "Conflict"
      ? "#B42318"
      : status === "Delayed"
        ? "#B54708"
        : status === "Completed"
          ? "#475467"
          : status === "Cancelled"
            ? "#B42318"
            : eventTextColor;

  return (
    <div
      className={[
        "h-full min-w-0 overflow-hidden px-2 py-1.5",
        "text-[#172033]",
        isConflict
          ? "border-l-2 border-[#F04438]"
          : "",
      ].join(" ")}
    >
      <div className="flex min-w-0 items-start gap-1.5">
        {/* Event Type Indicator */}

        <span
          className={[
            "mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full",
            isConflict
              ? "bg-[#F04438]"
              : type === "Flight"
                ? "bg-[#1677FF]"
                : type === "Simulator"
                  ? "bg-[#7F56D9]"
                  : type === "Training"
                    ? "bg-[#12B76A]"
                    : type === "Maintenance"
                      ? "bg-[#F79009]"
                      : "bg-[#98A2B3]",
          ].join(" ")}
        />

        <div className="min-w-0 flex-1">
          {/* =================================================
              EVENT / STUDENT NAME
              ================================================= */}

          <div
            className="truncate text-[11px] font-semibold leading-4"
            style={{
              color: eventTextColor,
            }}
          >
            {eventInfo.event.title}
          </div>

          {/* =================================================
              TIME
              ================================================= */}

          {eventInfo.timeText && (
            <div
              className="truncate text-[9px] font-medium leading-4"
              style={{
                color: secondaryTextColor,
              }}
            >
              {eventInfo.timeText}
            </div>
          )}

          {/* =================================================
              AIRCRAFT / INSTRUCTOR / STUDENT
              ================================================= */}

          {(aircraft ||
            instructor ||
            student) && (
            <div
              className="mt-0.5 truncate text-[9px] leading-3.5"
              style={{
                color: secondaryTextColor,
              }}
            >
              {aircraft ||
                instructor ||
                student}
            </div>
          )}

          {/* =================================================
              TRAINING TYPE
              ================================================= */}

          {trainingType && (
            <div
              className="truncate text-[9px] leading-3.5"
              style={{
                color: secondaryTextColor,
              }}
            >
              {trainingType}
            </div>
          )}

          {/* =================================================
              STATUS
              ================================================= */}

          {status && (
            <div
              className="mt-1 truncate text-[8px] font-semibold uppercase tracking-[0.06em]"
              style={{
                color: statusTextColor,
              }}
            >
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function FlightCalendar({
  onEventClick,
  onDateSelect,
}: FlightCalendarProps) {
  const calendarRef = useRef<FullCalendar | null>(
    null,
  );

  const events = useMemo<CalendarEvent[]>(() => {
    return scheduleEvents.map((event) => ({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,

      extendedProps: {
        type:
          event.type as ScheduleEventType,
        status:
          event.status as ScheduleEventStatus,
        aircraft: event.aircraft,
        instructor: event.instructor,
        student: event.student,
        trainingType: event.trainingType,
      },
    }));
  }, []);

  return (
    <div className="fsms-calendar h-[700px] overflow-hidden bg-white text-[#172033]">
      <FullCalendar
        ref={calendarRef}
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
        ]}
        initialView="timeGridDay"
        initialDate="2026-08-18"
        headerToolbar={false}
        allDaySlot={false}
        nowIndicator={true}
        selectable={true}
        selectMirror={true}
        unselectAuto={true}
        editable={false}
        eventStartEditable={false}
        eventDurationEditable={false}
        eventResizableFromStart={false}
        dayMaxEvents={false}
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        slotDuration="00:30:00"
        snapDuration="00:15:00"
        height="100%"
        expandRows={true}
        displayEventTime={true}
        displayEventEnd={true}
        eventOverlap={true}
        selectOverlap={true}
        eventClick={onEventClick}
        select={onDateSelect}
        events={events}
        eventContent={(eventInfo) => (
          <EventContent
            eventInfo={eventInfo}
          />
        )}

       

        eventDidMount={(info) => {
          const type = getEventType(
            info.event.extendedProps.type,
          );

          const status = getEventStatus(
            info.event.extendedProps.status,
          );

          const typeStyle =
            EVENT_STYLES[type];

          const statusStyle =
            status
              ? STATUS_STYLES[status]
              : undefined;

          const backgroundColor =
            statusStyle?.background ??
            typeStyle.background;

          const borderColor =
            statusStyle?.border ??
            typeStyle.border;

          const textColor =
            statusStyle?.text ??
            typeStyle.text;

          info.el.style.backgroundColor =
            backgroundColor;

          info.el.style.borderColor =
            borderColor;

          /*
           * Keep the event container's text color
           * consistent with the individual text nodes.
           */
          info.el.style.color =
            textColor;

          info.el.style.borderRadius =
            "7px";

          info.el.style.overflow =
            "hidden";

          info.el.style.cursor =
            "pointer";

          info.el.setAttribute(
            "title",
            [
              info.event.title,

              status
                ? `Status: ${status}`
                : "",

              info.event.extendedProps
                .aircraft
                ? `Aircraft: ${info.event.extendedProps.aircraft}`
                : "",

              info.event.extendedProps
                .instructor
                ? `Instructor: ${info.event.extendedProps.instructor}`
                : "",

              info.event.extendedProps
                .student
                ? `Student: ${info.event.extendedProps.student}`
                : "",
            ]
              .filter(Boolean)
              .join(" • "),
          );
        }}

        

        dayHeaderContent={(arg) => {
          const date =
            arg.date;

          const weekday =
            new Intl.DateTimeFormat(
              "en-US",
              {
                weekday: "short",
              },
            ).format(date);

          const day =
            date.getDate();

          return (
            <div className="flex flex-col items-center py-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#344054]">
                {weekday}
              </span>

              <span className="mt-0.5 text-xs font-semibold text-[#172033]">
                {day}
              </span>
            </div>
          );
        }}

       

        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}

        /* ===================================================
           EVENT TIME
           =================================================== */

        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
      />
    </div>
  );
}