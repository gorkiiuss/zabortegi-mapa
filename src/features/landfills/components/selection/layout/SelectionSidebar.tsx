import { useMapPanelInteractions } from "@shared/hooks/useMapPanelInteractions";
import { useSelectionLogic } from "../hooks/useSelectionLogic";
import { SelectionHeader } from "../layout/SelectionHeader";
import { SelectionBody } from "../layout/SelectionBody";
import { useUiStore } from "@features/map/state/uiStore";
import { useMapStore } from "@features/map/state/mapStore";
import { useLanguageStore } from "@shared/state/languageStore";

export function SelectionSidebar() {
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
              <circle cx="12" cy="12" r="10" />
              <line x1="22" y1="12" x2="18" y2="12" />
              <line x1="6" y1="12" x2="2" y2="12" />
              <line x1="12" y1="6" x2="12" y2="2" />
              <line x1="12" y1="22" x2="12" y2="18" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </button>

          <div className="mx-1 h-4 w-px bg-slate-200" />

          {/* BOTÓN CERRAR */}
          <button
            onClick={handleCloseInSidebar}
            className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
            aria-label={t("selection.close")}
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
        </div>
      </div>

      {/* ─── 2. ZONA SCROLLEABLE ─── */}
      <div className="flex-1 overflow-y-auto overscroll-contain bg-white">
        <div className="flex flex-col gap-4 p-4 text-[13px] leading-snug md:p-5">
          <SelectionHeader
            imgsCount={data.imgsCount}
            coverImageUrl={data.coverImageUrl ?? undefined}
          />

          <SelectionBody
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
