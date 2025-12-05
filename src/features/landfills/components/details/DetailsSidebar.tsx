// src/features/landfills/components/details/DetailsSidebar.tsx

import { useMapPanelInteractions } from "@shared/hooks/useMapPanelInteractions";
import { useSelectionLogic } from "../../hooks/useLandfillDetails";
import { DetailsHeader } from "./DetailsHeader";
import { DetailsBody } from "./DetailsBody";
import { useUiStore } from "@features/map/state/uiStore";
import { useMapStore } from "@features/map/state/mapStore";
import { useLanguageStore } from "@shared/state/languageStore";
import { Crosshair, X } from "@shared/components/Icons";

export function DetailsSidebar() {
  const { landfill, data, isDownloading, handleClose, handleDownloadReport } =
    useSelectionLogic();
  const { setSelectedLandfillId } = useUiStore();
  const setFocusLandfillId = useMapStore((s) => s.setFocusLandfillId);
  const { t } = useLanguageStore();

  const { ref, handleMouseEnter, handleMouseLeave, unlockMap } =
    useMapPanelInteractions();

  const handleCloseInSidebar = () => {
    handleClose();
    setSelectedLandfillId(null);
    unlockMap();
  };

  if (!landfill || !data) return null;

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`absolute top-[10vh] right-3 bottom-[3vh] z-900 flex w-[24vw] max-w-md min-w-[320px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 ease-out`}
    >
      {/* ─── 1. BARRA FIJA SUPERIOR ─── */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50/50 px-4 py-3">
        <div className="min-w-0 pr-2">
          <h2 className="truncate text-sm font-semibold text-slate-800">
            {landfill.name}
          </h2>
          <p className="truncate text-[11px] text-slate-500">{data.subtitle}</p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {/* BOTÓN CENTRAR */}
          <button
            onClick={() => setFocusLandfillId(landfill.parcelId ?? null)}
            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
            title={t("selection.center_map")}
            aria-label={t("selection.center_map")}
          >
            <Crosshair size={18} />
          </button>

          <div className="mx-1 h-4 w-px bg-slate-200" />

          {/* BOTÓN CERRAR */}
          <button
            onClick={handleCloseInSidebar}
            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
            aria-label={t("selection.close")}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* ─── 2. ZONA SCROLLEABLE ─── */}
      <div className="flex-1 overflow-y-auto overscroll-contain bg-white">
        <div className="flex flex-col gap-4 p-4 text-[13px] leading-snug md:p-5">
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
