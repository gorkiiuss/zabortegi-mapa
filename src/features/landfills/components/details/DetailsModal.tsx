// src/features/landfills/components/details/DetailsModal.tsx

import { useEffect } from "react";
import { useSelectionLogic } from "../../hooks/useLandfillDetails";
import { DetailsHeader } from "./DetailsHeader";
import { DetailsBody } from "./DetailsBody";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useLanguageStore } from "@shared/state/languageStore";
import { X } from "@shared/components/Icons";

export function DetailsModal() {
  const { landfill, data, isDownloading, handleClose, handleDownloadReport } =
    useSelectionLogic();
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

  if (!landfill || !data) return null;

  return (
    <div
      ref={modalRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`pointer-events-auto flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl`}
    >
      {/* ─── 1. HEADER UNIFICADO (Fijo) ─── */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50/50 px-4 py-3">
        <div className="min-w-0 pr-2">
          <h2 className="truncate text-sm font-semibold text-slate-800">
            {landfill.name}
          </h2>
          <p className="truncate text-[11px] text-slate-500">{data.subtitle}</p>
        </div>

        <button
          onClick={handleClose}
          className="shrink-0 rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
          aria-label={t("selection.close")}
        >
          <X size={18} />
        </button>
      </div>

      {/* ─── 2. BODY (Scrollable) ─── */}
      <div className="flex-1 overflow-y-auto overscroll-contain bg-slate-50/30">
        <div className="flex flex-col gap-4 p-4">
          <DetailsHeader
            imgsCount={data.imgsCount}
            coverImageUrl={data.coverImageUrl ?? undefined}
          />

          <DetailsBody
            data={data}
            landfill={landfill}
            isDownloading={isDownloading}
            onDownload={handleDownloadReport}
          />
        </div>
      </div>
    </div>
  );
}
