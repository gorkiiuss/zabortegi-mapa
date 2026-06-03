// src/features/landfills/components/details/DetailsModal.tsx

import { useEffect } from "react";
import { useDetailsLogic } from "../../hooks/useDetailsLogic";
import { DetailsHeader } from "./DetailsHeader";
import { DetailsBody } from "./DetailsBody";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useLanguageStore } from "@shared/state/languageStore";
import { X, Spinner, Archive } from "@shared/components/Icons";

export function DetailsModal() {
  const {
    details,
    isDownloadingLegacy,
    legacyVersionId,
    handleClose,
    handleDownloadLegacyReport,
  } = useDetailsLogic();
  const { handleMouseEnter, handleMouseLeave, modalRef } =
    useMapModalInteractions();
  const { t } = useLanguageStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose]);

  if (!details) return null;

  return (
    <div
      id="tutorial-mobile-details"
      ref={modalRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`pointer-events-auto flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl`}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50/50 px-4 py-3">
        <div className="min-w-0 pr-2">
          <h2 className="truncate text-sm font-semibold text-slate-800">
            {details.name}
          </h2>
          <p className="truncate text-[11px] text-slate-500">{details.location.municipalityName}</p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {legacyVersionId && (
            <button
              id="mobile-tutorial-btn-pdf"
              onClick={handleDownloadLegacyReport}
              disabled={isDownloadingLegacy}
              className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-50"
              title={t("details.legacy_report_tooltip")}
              aria-label={t("details.legacy_report")}
            >
              {isDownloadingLegacy ? (
                <Spinner size={18} className="animate-spin text-emerald-600" />
              ) : (
                <Archive size={18} />
              )}
            </button>
          )}

          <button
            onClick={handleClose}
            className="shrink-0 rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
            aria-label={t("details.close")}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain bg-slate-50/30">
        <div className="flex flex-col gap-4 p-4">
          <DetailsHeader
            details={details}
          />

          <DetailsBody
            details={details}
            idPrefix="mobile"
          />
        </div>
      </div>
    </div>
  );
}
