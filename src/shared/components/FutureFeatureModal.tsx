import { useEffect } from "react";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useUiStore } from "@features/map/state/uiStore";
import { useLanguageStore } from "@shared/state/languageStore";
import { Wrench, X } from "./Icons";

export function FutureFeatureModal() {
  const { handleMouseEnter, handleMouseLeave, modalRef } =
    useMapModalInteractions();
  const { closeModal } = useUiStore();
  const { t } = useLanguageStore();

  const handleClose = () => closeModal();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div
      ref={modalRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`pointer-events-auto relative flex w-full max-w-sm flex-col self-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl`}
    >
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        aria-label="Cerrar"
      >
        <X size={16} />
      </button>

      <div className="flex flex-col items-center gap-4 text-center">
        {/* Icono de construcción / futuro */}
        <div className="rounded-full bg-emerald-50 p-3 text-emerald-500">
          <Wrench size={32} />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-800">
            {t("future_feature.title")}
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            {t("future_feature.description")}
          </p>
        </div>

        <button
          onClick={handleClose}
          className="mt-2 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          {t("future_feature.button")}
        </button>
      </div>
    </div>
  );
}
