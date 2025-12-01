import { useRef } from "react";
import { useLandfillsStore } from "../state/landfillsStore";
import { useLanguageStore } from "@shared/state/languageStore";

export function LandfillsLoadingOverlay() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const loading = useLandfillsStore((s) => s.loading);
  const { t } = useLanguageStore();

  if (!loading) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-70 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300"
    >
      <div className="mx-4 flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white/95 px-6 py-5 shadow-xl">
        {/* Spinner */}
        <div className="flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
        </div>

        {/* Texto principal */}
        <div className="space-y-1 text-center">
          <h2 className="text-base font-semibold text-slate-900">
            {t("loading.title")}
          </h2>
          <p className="text-xs text-slate-500">{t("loading.subtitle")}</p>
        </div>

        {/* Barra de “progreso” visual */}
        <div className="mt-1 w-full">
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-1/2 animate-[pulse_1.4s_ease-in-out_infinite] rounded-full bg-amber-400" />
          </div>
        </div>

        {/* Mensaje pequeño opcional */}
        <p className="mt-1 text-center text-[11px] text-slate-400">
          {t("loading.hint")}
        </p>
      </div>
    </div>
  );
}
