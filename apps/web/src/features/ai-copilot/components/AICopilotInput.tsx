import {
  ArrowUp,
  Paperclip,
  Sparkles,
} from "lucide-react";

import {
  useState,
  type FormEvent,
} from "react";

type AICopilotInputProps = {
  onSend: (message: string) => void;
};

export function AICopilotInput({
  onSend,
}: AICopilotInputProps) {
  const [value, setValue] =
    useState("");

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const trimmed = value.trim();

    if (!trimmed) {
      return;
    }

    onSend(trimmed);
    setValue("");
  };

  return (
    <div className="shrink-0 border-t border-[#E4E7EC] bg-white px-4 py-4 sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-3xl"
      >
        <div className="rounded-xl border border-[#D0D5DD] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition focus-within:border-[#1677FF] focus-within:ring-2 focus-within:ring-[#EAF2FF]">
          <textarea
            value={value}
            onChange={(event) =>
              setValue(event.target.value)
            }
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey
              ) {
                event.preventDefault();

                const trimmed =
                  value.trim();

                if (trimmed) {
                  onSend(trimmed);
                  setValue("");
                }
              }
            }}
            rows={2}
            placeholder="Ask AI Copilot about your operations..."
            className="w-full resize-none border-0 bg-transparent px-3.5 py-3 text-xs leading-5 text-[#344054] outline-none placeholder:text-[#98A2B3]"
          />

          <div className="flex items-center justify-between border-t border-[#F2F4F7] px-3 py-2">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="flex h-7 items-center gap-1.5 rounded-md px-2 text-[9px] font-medium text-[#667085] transition hover:bg-[#F2F4F7]"
              >
                <Paperclip className="h-3 w-3" />

                Attach
              </button>

              <span className="hidden items-center gap-1 text-[9px] text-[#98A2B3] sm:flex">
                <Sparkles className="h-3 w-3 text-[#6941C6]" />

                AI uses your current FSMS context
              </span>
            </div>

            <button
              type="submit"
              disabled={!value.trim()}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1677FF] text-white transition hover:bg-[#1264D8] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send message"
              title="Send message"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <p className="mt-2 text-center text-[8px] text-[#98A2B3]">
          AI-generated insights should be reviewed before making operational decisions.
        </p>
      </form>
    </div>
  );
}

export default AICopilotInput;