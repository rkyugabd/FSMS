import {
  GraduationCap,
  Plus,
} from "lucide-react";

type TrainingEmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function TrainingEmptyState({
  title,
  description,
  actionLabel = "New Training",
  onAction,
}: TrainingEmptyStateProps) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center px-6 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF2FF]">
        <GraduationCap className="h-5 w-5 text-[#1677FF]" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-[#172033]">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-xs leading-5 text-[#667085]">
        {description}
      </p>

      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 flex h-9 items-center gap-2 rounded-lg bg-[#1677FF] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1264D8]"
        >
          <Plus className="h-3.5 w-3.5" />

          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default TrainingEmptyState;