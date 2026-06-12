// src/features/tutorial/components/TutorialSelectionModal.tsx

import { useEffect } from "react";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useUiStore } from "@features/map/state/uiStore";
import { useLanguageStore } from "@shared/state/languageStore";
import { useTutorialStore } from "@features/tutorial/state/tutorialStore";
import { Map, FileText, X, Download, Search } from "lucide-react";

export function TutorialSelectionModal() {
  const { handleMouseEnter, handleMouseLeave, modalRef } = useMapModalInteractions();
  const { closeModal } = useUiStore();
  const { t } = useLanguageStore();
  const { startTutorial } = useTutorialStore();

  const handleClose = () => closeModal();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleStartTutorial = (type: "onboarding" | "full-details" | "extractor" | "advanced-search") => {
    closeModal();
    const isMobile = window.innerWidth < 1024;

    if (type === "onboarding") {
      const id = isMobile ? "onboarding-mobile" : "onboarding";
      startTutorial(id);
    } else if (type === "full-details") {
      const id = isMobile ? "full-details-tour-mobile" : "full-details-tour";
      startTutorial(id);
    } else if (type === "extractor") {
      const id = isMobile ? "extractor-tour-mobile" : "extractor-tour";
      startTutorial(id);
    } else {
      const id = isMobile ? "advanced-search-tour-mobile" : "advanced-search-tour";
      startTutorial(id);
    }
  };

  return (
    <div
      ref={modalRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="pointer-events-auto relative flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 rounded-full p-1.5 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600"
        aria-label={t("tutorial_selection.btn_cancel")}
      >
        <X size={18} />
      </button>

      <div className="mb-5 pr-8">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          {t("tutorial_selection.title")}
        </h2>
        <p className="mt-1.5 text-xs text-slate-500 leading-normal">
          {t("tutorial_selection.subtitle")}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => handleStartTutorial("onboarding")}
          className="group flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-left transition-all hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-xs active:scale-[0.99] cursor-pointer"
        >
          <div className="rounded-lg bg-emerald-50 p-2.5 text-emerald-600 transition-colors group-hover:bg-emerald-100">
            <Map size={20} />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-slate-700 transition-colors group-hover:text-emerald-800">
              {t("tutorial_selection.onboarding_title")}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t("tutorial_selection.onboarding_desc")}
            </p>
          </div>
        </button>

        <button
          onClick={() => handleStartTutorial("full-details")}
          className="group flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-left transition-all hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-xs active:scale-[0.99] cursor-pointer"
        >
          <div className="rounded-lg bg-emerald-50 p-2.5 text-emerald-600 transition-colors group-hover:bg-emerald-100">
            <FileText size={20} />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-slate-700 transition-colors group-hover:text-emerald-800">
              {t("tutorial_selection.full_details_title")}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t("tutorial_selection.full_details_desc")}
            </p>
          </div>
        </button>

        <button
          onClick={() => handleStartTutorial("extractor")}
          className="group flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-left transition-all hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-xs active:scale-[0.99] cursor-pointer"
        >
          <div className="rounded-lg bg-emerald-50 p-2.5 text-emerald-600 transition-colors group-hover:bg-emerald-100">
            <Download size={20} />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-slate-700 transition-colors group-hover:text-emerald-800">
              {t("tutorial_selection.extractor_title")}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t("tutorial_selection.extractor_desc")}
            </p>
          </div>
        </button>

        <button
          onClick={() => handleStartTutorial("advanced-search")}
          className="group flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-left transition-all hover:border-emerald-200 hover:bg-emerald-50/20 hover:shadow-xs active:scale-[0.99] cursor-pointer"
        >
          <div className="rounded-lg bg-emerald-50 p-2.5 text-emerald-600 transition-colors group-hover:bg-emerald-100">
            <Search size={20} />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-slate-700 transition-colors group-hover:text-emerald-800">
              {t("tutorial_selection.advanced_search_title")}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t("tutorial_selection.advanced_search_desc")}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
