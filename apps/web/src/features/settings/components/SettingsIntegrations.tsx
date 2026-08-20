import {
  CheckCircle2,
  Link2,
  PlugZap,
} from "lucide-react";

import type {
  Integration,
} from "../settingsData";

type SettingsIntegrationsProps = {
  integrations: Integration[];
  onConnect: (
    integrationId: string,
  ) => void;
};

export function SettingsIntegrations({
  integrations,
  onConnect,
}: SettingsIntegrationsProps) {
  return (
    <div className="rounded-xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <div className="border-b border-[#E4E7EC] px-5 py-4">
        <div className="flex items-center gap-2">
          <Link2 className="h-4 w-4 text-[#667085]" />

          <div>
            <h2 className="text-sm font-semibold text-[#172033]">
              Integrations
            </h2>

            <p className="mt-0.5 text-[11px] text-[#667085]">
              Connect external services to extend FSMS capabilities.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 p-5 md:grid-cols-2">
        {integrations.map(
          (integration) => {
            const connected =
              integration.status ===
              "Connected";

            const comingSoon =
              integration.status ===
              "Coming Soon";

            return (
              <div
                key={integration.id}
                className="rounded-xl border border-[#E4E7EC] p-4 transition hover:border-[#D0D5DD] hover:bg-[#FCFCFD]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2F4F7]">
                    <PlugZap className="h-5 w-5 text-[#667085]" />
                  </div>

                  <span
                    className={[
                      "rounded-full px-2 py-1 text-[9px] font-semibold",

                      connected
                        ? "bg-[#ECFDF3] text-[#027A48]"
                        : comingSoon
                          ? "bg-[#F2F4F7] text-[#667085]"
                          : "bg-[#FFF7ED] text-[#B54708]",
                    ].join(" ")}
                  >
                    {integration.status}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-[#172033]">
                    {integration.name}
                  </h3>

                  <p className="mt-1 text-[11px] leading-5 text-[#667085]">
                    {integration.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] font-medium text-[#98A2B3]">
                      {integration.category}
                    </span>

                    {connected ? (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-[#027A48]">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Connected
                      </span>
                    ) : (
                      <button
                        type="button"
                        disabled={comingSoon}
                        onClick={() =>
                          onConnect(
                            integration.id,
                          )
                        }
                        className={[
                          "h-7 rounded-lg px-3 text-[10px] font-semibold transition",

                          comingSoon
                            ? "cursor-not-allowed bg-[#F2F4F7] text-[#98A2B3]"
                            : "bg-[#1677FF] text-white hover:bg-[#1264D8]",
                        ].join(" ")}
                      >
                        {comingSoon
                          ? "Coming Soon"
                          : "Connect"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}

export default SettingsIntegrations;