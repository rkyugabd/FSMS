import {
  Bell,
  Mail,
  Smartphone,
} from "lucide-react";

import type {
  NotificationChannel,
  NotificationSettings,
} from "../settingsData";

type SettingsNotificationsProps = {
  data: NotificationSettings;
  onChange: (
    data: NotificationSettings,
  ) => void;
};

const notificationItems: Array<{
  key: keyof Omit<
    NotificationSettings,
    "channels"
  >;
  title: string;
  description: string;
}> = [
  {
    key: "flightDelayed",
    title: "Flight Delayed",
    description:
      "Receive alerts when a flight is delayed.",
  },
  {
    key: "maintenanceDue",
    title: "Maintenance Due",
    description:
      "Receive alerts for upcoming or overdue maintenance.",
  },
  {
    key: "studentTrainingAlert",
    title: "Student Training Alert",
    description:
      "Notify instructors when student training actions are required.",
  },
  {
    key: "documentExpiration",
    title: "Document Expiration",
    description:
      "Receive alerts when important documents are expiring.",
  },
  {
    key: "procurementApproval",
    title: "Procurement Approval",
    description:
      "Notify users when purchase approvals are required.",
  },
  {
    key: "financeApproval",
    title: "Finance Approval",
    description:
      "Notify finance users about pending approvals.",
  },
  {
    key: "dailyOperationsSummary",
    title: "Daily Operations Summary",
    description:
      "Receive a daily summary of flight school operations.",
  },
  {
    key: "weeklyManagementReport",
    title: "Weekly Management Report",
    description:
      "Receive a weekly management performance summary.",
  },
];

const channels: Array<{
  value: NotificationChannel;
  label: string;
  icon: typeof Mail;
}> = [
  {
    value: "Email",
    label: "Email",
    icon: Mail,
  },
  {
    value: "In-App",
    label: "In-App",
    icon: Bell,
  },
  {
    value: "SMS",
    label: "SMS",
    icon: Smartphone,
  },
];

export function SettingsNotifications({
  data,
  onChange,
}: SettingsNotificationsProps) {
  const toggleNotification = (
    key: keyof Omit<
      NotificationSettings,
      "channels"
    >,
  ) => {
    onChange({
      ...data,
      [key]: !data[key],
    });
  };

  const toggleChannel = (
    channel: NotificationChannel,
  ) => {
    const exists =
      data.channels.includes(
        channel,
      );

    onChange({
      ...data,
      channels: exists
        ? data.channels.filter(
            (item) =>
              item !== channel,
          )
        : [
            ...data.channels,
            channel,
          ],
    });
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <div className="border-b border-[#E4E7EC] px-5 py-4">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-[#667085]" />

            <div>
              <h2 className="text-sm font-semibold text-[#172033]">
                Notifications
              </h2>

              <p className="mt-0.5 text-[11px] text-[#667085]">
                Configure operational alerts and system notifications.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-5">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#667085]">
              Notification Channels
            </p>

            <div className="grid gap-2 sm:grid-cols-3">
              {channels.map(
                (channel) => {
                  const Icon =
                    channel.icon;

                  const selected =
                    data.channels.includes(
                      channel.value,
                    );

                  return (
                    <button
                      key={
                        channel.value
                      }
                      type="button"
                      onClick={() =>
                        toggleChannel(
                          channel.value,
                        )
                      }
                      className={[
                        "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left transition",

                        selected
                          ? "border-[#B2DDFF] bg-[#F5FAFF] text-[#1355B5]"
                          : "border-[#D0D5DD] bg-white text-[#667085] hover:bg-[#F9FAFB]",
                      ].join(" ")}
                    >
                      <Icon className="h-4 w-4" />

                      <span className="text-xs font-semibold">
                        {channel.label}
                      </span>
                    </button>
                  );
                },
              )}
            </div>
          </div>

          <div className="divide-y divide-[#F2F4F7]">
            {notificationItems.map(
              (item) => {
                const enabled =
                  Boolean(data[item.key]);

                return (
                  <div
                    key={item.key}
                    className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div>
                      <p className="text-xs font-semibold text-[#344054]">
                        {item.title}
                      </p>

                      <p className="mt-0.5 text-[11px] text-[#98A2B3]">
                        {item.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      aria-label={`Toggle ${item.title}`}
                      onClick={() =>
                        toggleNotification(
                          item.key,
                        )
                      }
                      className={[
                        "relative h-5 w-9 shrink-0 rounded-full transition",

                        enabled
                          ? "bg-[#1677FF]"
                          : "bg-[#D0D5DD]",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition",

                          enabled
                            ? "left-[18px]"
                            : "left-0.5",
                        ].join(" ")}
                      />
                    </button>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsNotifications;