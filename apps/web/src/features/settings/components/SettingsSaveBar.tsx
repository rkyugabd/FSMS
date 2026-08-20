import {
  Check,
  Save,
} from "lucide-react";

type SettingsSaveBarProps = {
  hasChanges: boolean;
  isSaving: boolean;
  saved: boolean;
  onSave: () => void;
  onReset: () => void;
};

export function SettingsSaveBar({
  hasChanges,
  isSaving,
  saved,
  onSave,
  onReset,
}: SettingsSaveBarProps) {
  return (
    <div className="sticky bottom-4 z-20 flex items-center justify-between gap-4 rounded-xl border border-[#D0D5DD] bg-white/95 px-4 py-3 shadow-[0_8px_30px_rgba(16,24,40,0.10)] backdrop-blur">
      <div>
        {saved ? (
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ECFDF3]">
              <Check className="h-3.5 w-3.5 text-[#039855]" />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#027A48]">
                Changes saved
              </p>

              <p className="text-[10px] text-[#667085]">
                Your settings have been updated.
              </p>
            </div>
          </div>
        ) : hasChanges ? (
          <div>
            <p className="text-xs font-semibold text-[#344054]">
              Unsaved changes
            </p>

            <p className="text-[10px] text-[#98A2B3]">
              Save your changes before leaving this page.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-xs font-semibold text-[#344054]">
              Settings
            </p>

            <p className="text-[10px] text-[#98A2B3]">
              All settings are up to date.
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={!hasChanges || isSaving}
          onClick={onReset}
          className="h-9 rounded-lg border border-[#D0D5DD] bg-white px-4 text-xs font-semibold text-[#344054] transition hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reset
        </button>

        <button
          type="button"
          disabled={!hasChanges || isSaving}
          onClick={onSave}
          className="flex h-9 items-center gap-1.5 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1264D8] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save className="h-3.5 w-3.5" />

          {isSaving
            ? "Saving..."
            : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default SettingsSaveBar;