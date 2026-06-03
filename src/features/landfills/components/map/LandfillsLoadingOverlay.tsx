// src/features/landfills/components/map/LandfillsLoadingOverlay.tsx

import { useLandfillsStore } from "../../state/landfillsStore";
import { useLanguageStore } from "@shared/state/languageStore";
import { Spinner } from "@shared/components/Icons";

export function LandfillsLoadingOverlay() {
  const isLoadingSummary = useLandfillsStore((s) => s.isLoadingSummary);
  const { t } = useLanguageStore();

  if (!isLoadingSummary) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 backdrop-blur-md transition-all duration-300">
      <div className="flex max-w-sm flex-col items-center gap-4 rounded-2xl border border-slate-100 bg-white/95 px-8 py-7 shadow-2xl text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <Spinner className="h-6 w-6 animate-spin" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-sm font-semibold text-slate-800 tracking-tight">
            {t("loading.title")}
          </h2>
        </div>
      </div>
    </div>
  );
}
