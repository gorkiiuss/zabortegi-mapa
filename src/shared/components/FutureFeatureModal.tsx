import { useEffect } from "react";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useUiStore } from "@features/map/state/uiStore";
import { useLanguageStore } from "@shared/state/languageStore";

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="flex flex-col items-center gap-4 text-center">
        {/* Icono de construcción / futuro */}
        <div className="rounded-full bg-emerald-50 p-3 text-emerald-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
          </svg>
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
