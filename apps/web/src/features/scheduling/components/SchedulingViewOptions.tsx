import {
  CalendarDays,
  Check,
  Clock3,
  Columns3,
  Grid2X2,
  List,
  MapPin,
  Settings2,
  X,
} from "lucide-react";

export type SchedulingDensity =
  | "comfortable"
  | "compact";

export type SchedulingTimeFormat =
  | "24h"
  | "12h";

export type SchedulingViewOptionsState = {
  showWeekends: boolean;
  showCompleted: boolean;
  showConflicts: boolean;
  showInstructor: boolean;
  showAircraft: boolean;
  density: SchedulingDensity;
  timeFormat: SchedulingTimeFormat;
};

type SchedulingViewOptionsProps = {
  open: boolean;
  options: SchedulingViewOptionsState;
  onChange: (
    options: SchedulingViewOptionsState,
  ) => void;
  onClose: () => void;
  onReset?: () => void;
};

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg px-2 py-2.5 transition hover:bg-[#F9FAFB]">
      <span className="min-w-0">
        <span className="block text-xs font-semibold text-[#344054]">
          {label}
        </span>

        <span className="mt-0.5 block text-[10px] leading-4 text-[#98A2B3]">
          {description}
        </span>
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={[
          "relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition",
          checked
            ? "bg-[#1677FF]"
            : "bg-[#D0D5DD]",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition",
            checked
              ? "left-[18px]"
              : "left-0.5",
          ].join(" ")}
        />
      </button>
    </label>
  );
}

function OptionButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border text-[10px] font-semibold transition",
        active
          ? "border-[#1677FF] bg-[#EAF2FF] text-[#1355B5]"
          : "border-[#D0D5DD] bg-white text-[#667085] hover:bg-[#F9FAFB] hover:text-[#344054]",
      ].join(" ")}
    >
      {icon}

      {label}

      {active && (
        <Check className="h-3 w-3" />
      )}
    </button>
  );
}

export function SchedulingViewOptions({
  open,
  options,
  onChange,
  onClose,
  onReset,
}: SchedulingViewOptionsProps) {
  if (!open) {
    return null;
  }

  const update = <
    K extends keyof SchedulingViewOptionsState,
  >(
    key: K,
    value: SchedulingViewOptionsState[K],
  ) => {
    onChange({
      ...options,
      [key]: value,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end bg-[#172033]/10 p-4 pt-20 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-label="Scheduling view options"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="w-full max-w-[360px] overflow-hidden rounded-xl border border-[#E4E7EC] bg-white shadow-[0_12px_32px_rgba(16,24,40,0.12)]"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        {/* =====================================================
            HEADER
            ===================================================== */}

        <div className="flex items-center justify-between border-b border-[#E4E7EC] px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF2FF]">
              <Settings2 className="h-4 w-4 text-[#1677FF]" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-[#172033]">
                View Options
              </h2>

              <p className="text-[10px] text-[#98A2B3]">
                Customize the scheduling workspace
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-[#667085] transition hover:bg-[#F9FAFB] hover:text-[#172033]"
            aria-label="Close view options"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* =====================================================
            CONTENT
            ===================================================== */}

        <div className="max-h-[calc(100vh-150px)] overflow-y-auto px-4 py-4">
          <div className="space-y-5">
            {/* Calendar Display */}

            <section>
              <div className="mb-2.5 flex items-center gap-2">
                <CalendarDays className="h-3.5 w-3.5 text-[#667085]" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
                  Calendar Display
                </p>
              </div>

              <div className="space-y-1">
                <ToggleRow
                  label="Show weekends"
                  description="Include Saturday and Sunday in calendar views."
                  checked={
                    options.showWeekends
                  }
                  onChange={(value) =>
                    update(
                      "showWeekends",
                      value,
                    )
                  }
                />

                <ToggleRow
                  label="Show completed"
                  description="Display schedules that have already been completed."
                  checked={
                    options.showCompleted
                  }
                  onChange={(value) =>
                    update(
                      "showCompleted",
                      value,
                    )
                  }
                />

                <ToggleRow
                  label="Highlight conflicts"
                  description="Keep operational conflicts visually prominent."
                  checked={
                    options.showConflicts
                  }
                  onChange={(value) =>
                    update(
                      "showConflicts",
                      value,
                    )
                  }
                />
              </div>
            </section>

            {/* Resource Information */}

            <section>
              <div className="mb-2.5 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#667085]" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
                  Resource Information
                </p>
              </div>

              <div className="space-y-1">
                <ToggleRow
                  label="Show instructor"
                  description="Display assigned instructor information on schedules."
                  checked={
                    options.showInstructor
                  }
                  onChange={(value) =>
                    update(
                      "showInstructor",
                      value,
                    )
                  }
                />

                <ToggleRow
                  label="Show aircraft"
                  description="Display assigned aircraft information on schedules."
                  checked={
                    options.showAircraft
                  }
                  onChange={(value) =>
                    update(
                      "showAircraft",
                      value,
                    )
                  }
                />
              </div>
            </section>

            {/* Density */}

            <section>
              <div className="mb-2.5 flex items-center gap-2">
                <Columns3 className="h-3.5 w-3.5 text-[#667085]" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
                  Calendar Density
                </p>
              </div>

              <div className="flex gap-2">
                <OptionButton
                  active={
                    options.density ===
                    "comfortable"
                  }
                  icon={
                    <Grid2X2 className="h-3.5 w-3.5" />
                  }
                  label="Comfortable"
                  onClick={() =>
                    update(
                      "density",
                      "comfortable",
                    )
                  }
                />

                <OptionButton
                  active={
                    options.density ===
                    "compact"
                  }
                  icon={
                    <List className="h-3.5 w-3.5" />
                  }
                  label="Compact"
                  onClick={() =>
                    update(
                      "density",
                      "compact",
                    )
                  }
                />
              </div>
            </section>

            {/* Time Format */}

            <section>
              <div className="mb-2.5 flex items-center gap-2">
                <Clock3 className="h-3.5 w-3.5 text-[#667085]" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#98A2B3]">
                  Time Format
                </p>
              </div>

              <div className="flex gap-2">
                <OptionButton
                  active={
                    options.timeFormat ===
                    "24h"
                  }
                  icon={
                    <Clock3 className="h-3.5 w-3.5" />
                  }
                  label="24-hour"
                  onClick={() =>
                    update(
                      "timeFormat",
                      "24h",
                    )
                  }
                />

                <OptionButton
                  active={
                    options.timeFormat ===
                    "12h"
                  }
                  icon={
                    <Clock3 className="h-3.5 w-3.5" />
                  }
                  label="12-hour"
                  onClick={() =>
                    update(
                      "timeFormat",
                      "12h",
                    )
                  }
                />
              </div>
            </section>
          </div>
        </div>

        {/* =====================================================
            FOOTER
            ===================================================== */}

        <div className="flex items-center justify-between border-t border-[#E4E7EC] bg-[#F9FAFB] px-4 py-3">
          <button
            type="button"
            onClick={onReset}
            className="text-[10px] font-semibold text-[#667085] transition hover:text-[#1677FF]"
          >
            Reset to default
          </button>

          <button
            type="button"
            onClick={onClose}
            className="h-8 rounded-lg bg-[#1677FF] px-4 text-[10px] font-semibold text-white shadow-sm transition hover:bg-[#1264D8] active:scale-[0.98]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}