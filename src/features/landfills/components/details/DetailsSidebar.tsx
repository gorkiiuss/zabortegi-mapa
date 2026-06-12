// src/features/landfills/components/details/DetailsSidebar.tsx

import { useMapPanelInteractions } from "@shared/hooks/useMapPanelInteractions";
import { useDetailsLogic } from "../../hooks/useDetailsLogic";
import { DetailsHeader } from "./DetailsHeader";
import { DetailsBody } from "./DetailsBody";
import { useUiStore } from "@features/map/state/uiStore";
import { useMapStore } from "@features/map/state/mapStore";
import { useLanguageStore } from "@shared/state/languageStore";
import { Crosshair, X, Spinner, Archive, Download } from "@shared/components/Icons";
import { useDataExtractorStore } from "@features/extractor/state/useDataExtractorStore";

export function DetailsSidebar() {
  const {
    details,
    isLoadingDetails,
    isDownloadingLegacy,
    legacyVersionId,
    handleClose,
    handleDownloadLegacyReport,
  } = useDetailsLogic();
  const { setSelectedLandfillId, toggleActiveModal } = useUiStore();
  const setFocusLandfillId = useMapStore((s) => s.setFocusLandfillId);
  const { t } = useLanguageStore();

  const { ref, handleMouseEnter, handleMouseLeave, unlockMap } =
    useMapPanelInteractions();

  const handleCloseInSidebar = () => {
    handleClose();
    setSelectedLandfillId(null);
    unlockMap();
  };

  if (!isLoadingDetails && !details) return null;

  return (
    <div
      id="tutorial-details-sidebar"
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`absolute top-[10vh] right-3 bottom-[3vh] z-900 flex w-[24vw] max-w-md min-w-[320px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 ease-out`}
    >
      {isLoadingDetails ? (
        <div className="flex flex-1 flex-col items-center justify-center p-6 bg-slate-50/10">
          <Spinner className="h-8 w-8 animate-spin text-emerald-600" />
          <p className="mt-3 text-xs font-medium text-slate-400">
            { t("details.loading") }
          </p>
        </div>
      ) : details ? (
        <>
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
                  id="desktop-tutorial-btn-pdf"
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
                onClick={() => {
                  useDataExtractorStore.setState({
                    selectedOption: "manual",
                    manualSelectedIds: { [details.id]: true },
                    currentStep: 1,
                  });
                  toggleActiveModal("data-extractor", true);
                }}
                className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                title={t("details.export_data_tooltip")}
                aria-label={t("details.export_data")}
              >
                <Download size={18} />
              </button>

              <button
                onClick={() => setFocusLandfillId(details.id)}
                className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                title={t("details.center_map")}
                aria-label={t("details.center_map")}
              >
                <Crosshair size={18} />
              </button>

              <div className="mx-1 h-4 w-px bg-slate-200" />

              <button
                onClick={handleCloseInSidebar}
                className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
                aria-label={t("details.close")}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain bg-white">
            <div className="flex flex-col gap-4 p-4 text-[13px] leading-snug md:p-5">
              <DetailsHeader
                details={details}
              />

              <DetailsBody
                details={details}
                idPrefix="desktop"
              />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
