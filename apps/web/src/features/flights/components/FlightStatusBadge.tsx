import type { ReactNode } from "react";

import type { FlightStatus } from "../flightsData";

export type { FlightStatus } from "../flightsData";

type FlightStatusBadgeProps = {
  status: FlightStatus | string;
  className?: string;
};

type StatusConfig = {
  label: string;
  className: string;
  dotClassName: string;
  icon?: ReactNode;
};

const STATUS_CONFIG: Record<
  string,
  StatusConfig
> = {
  Scheduled: {
    label: "Scheduled",
    className:
      "border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]",
    dotClassName: "bg-[#3B82F6]",
  },

  Confirmed: {
    label: "Confirmed",
    className:
      "border-[#C7D2FE] bg-[#EEF2FF] text-[#4338CA]",
    dotClassName: "bg-[#6366F1]",
  },

  Boarding: {
    label: "Boarding",
    className:
      "border-[#DDD6FE] bg-[#F5F3FF] text-[#6D28D9]",
    dotClassName: "bg-[#8B5CF6]",
  },

  "In Flight": {
    label: "In Flight",
    className:
      "border-[#A7F3D0] bg-[#ECFDF5] text-[#047857]",
    dotClassName: "bg-[#10B981]",
  },

  Landed: {
    label: "Landed",
    className:
      "border-[#A7F3D0] bg-[#ECFDF5] text-[#047857]",
    dotClassName: "bg-[#10B981]",
  },

  Completed: {
    label: "Completed",
    className:
      "border-[#D0D5DD] bg-[#F2F4F7] text-[#475467]",
    dotClassName: "bg-[#98A2B3]",
  },

  Delayed: {
    label: "Delayed",
    className:
      "border-[#FEDF89] bg-[#FFFAEB] text-[#B54708]",
    dotClassName: "bg-[#F79009]",
  },

  Cancelled: {
    label: "Cancelled",
    className:
      "border-[#FECDCA] bg-[#FEF3F2] text-[#B42318]",
    dotClassName: "bg-[#F04438]",
  },

  Diverted: {
    label: "Diverted",
    className:
      "border-[#FECDCA] bg-[#FEF3F2] text-[#B42318]",
    dotClassName: "bg-[#F04438]",
  },

  Maintenance: {
    label: "Maintenance",
    className:
      "border-[#FEDF89] bg-[#FFF7E8] text-[#B54708]",
    dotClassName: "bg-[#F79009]",
  },
};

const DEFAULT_STATUS: StatusConfig = {
  label: "Unknown",
  className:
    "border-[#D0D5DD] bg-[#F9FAFB] text-[#475467]",
  dotClassName: "bg-[#98A2B3]",
};

function getStatusConfig(
  status: string,
): StatusConfig {
  return (
    STATUS_CONFIG[status] ?? {
      ...DEFAULT_STATUS,
      label:
        status || DEFAULT_STATUS.label,
    }
  );
}

export function FlightStatusBadge({
  status,
  className = "",
}: FlightStatusBadgeProps) {
  const config =
    getStatusConfig(status);

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
        "text-[10px] font-semibold leading-none",
        "whitespace-nowrap",
        config.className,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={`Flight status: ${config.label}`}
    >
      <span
        className={[
          "h-1.5 w-1.5 shrink-0 rounded-full",
          config.dotClassName,
        ].join(" ")}
        aria-hidden="true"
      />

      <span>
        {config.label}
      </span>
    </span>
  );
}

export default FlightStatusBadge;