import { AttributionControl, MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useMemo } from "react";

import { ToolbarDesktop } from "@features/toolbar/components/ToolbarDesktop";
import { ZoomPanel } from "@features/map/components/ZoomPanel";
import { useLegendItems } from "@features/legend/hooks/useLegendItems";

import { LandfillsLayer } from "@features/landfills/components/LandfillsLayer";
import { MapViewportTracker } from "@features/map/components/MapViewportTracker";
import { LandfillIndexModal } from "@features/landfills/components/index/LandfillsIndexModal";
import { LandfillsLoadingOverlay } from "@features/landfills/components/LandfillsLoadingOverlay";
import { useLandfillsStore } from "@features/landfills/state/landfillsStore";
import { useUiStore } from "@features/map/state/uiStore";
import { ModalToggleButton } from "@shared/components/ModalToggleButton";
import { SelectionSidebar } from "@selection/layout/SelectionSidebar";
import { SelectionModal } from "@selection/modals/SelectionModal";
import { SearchDesktopPanel } from "@features/search/components/SearchDesktopPanel";
import { SearchModal } from "@features/search/components/SearchModal";
import { LegendModal } from "@features/legend/components/LegendModal";
import { LegendDesktopPanel } from "@features/legend/components/LegendDesktopPanel";
import { ToolbarModal } from "@features/toolbar/components/ToolbarModal";
import { SelectionGalleryModal } from "@selection/modals/SelectionGalleryModal";
import { MapClickDeselector } from "@features/map/components/MapClickDeselector";
import { RelatedDocumentationModal } from "@features/landfills/components/selection/modals/RelatedDocumentationModal";
import { useMapStore } from "@features/map/state/mapStore";
import { MobileRecenterButton } from "@features/map/components/MobileRecenterButton";
import { AttributionsModal } from "@features/attributions/components/AttributionsModal";
import { AboutModal } from "@features/about/components/AboutModal";
import { FutureFeatureModal } from "@shared/components/FutureFeatureModal";

import { useLanguageStore } from "@shared/state/languageStore";
import { ContactModal } from "@features/toolbar/components/ContactModal";
import { CHANGELOG_DATA } from "@features/about/data/changelogRepository";

function App() {
  const loadAll = useLandfillsStore((s) => s.loadAll);
  const landfills = useLandfillsStore((s) => s.landfills);

  const activeModal = useUiStore((s) => s.activeModal);
  const toggleModal = useUiStore((s) => s.toggleActiveModal);
  const setSearchQuery = useUiStore((s) => s.setSearchQuery);
  const searchQuery = useUiStore((s) => s.searchQuery);
  const selectedLandfillId = useUiStore((s) => s.selectedLandfillId);

  const openIndexWithQuery = useUiStore((s) => s.openIndexWithQuery);
  const indexQuery = useUiStore((s) => s.indexQuery);
  const closeModal = useUiStore((s) => s.closeModal);

  const { t } = useLanguageStore();

  const legendItems = useLegendItems();

  const hasQuery = searchQuery.trim().length > 0;

  const selectedLandfill = useMemo(
    () => landfills.find((l) => l.parcelId === selectedLandfillId),
    [landfills, selectedLandfillId],
  );

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  useEffect(() => {
    const latestUpdateDate = CHANGELOG_DATA[0]?.date;
    const lastSeenUpdate = localStorage.getItem("app_last_seen_update");
    const hasVisitedLegacy = localStorage.getItem("app_has_visited_before");
    if (latestUpdateDate && lastSeenUpdate !== latestUpdateDate) {
      toggleModal("about");
      localStorage.setItem("app_last_seen_update", latestUpdateDate);
      localStorage.setItem("app_has_visited_before", "true");
    } else if (!lastSeenUpdate && !hasVisitedLegacy) {
      toggleModal("about");
      if (latestUpdateDate) {
        localStorage.setItem("app_last_seen_update", latestUpdateDate);
      }
      localStorage.setItem("app_has_visited_before", "true");
    }
  }, [toggleModal]);

  // Wrapper para paneles móviles (Search, Legend, etc.)
  const renderModalWrapper = (content: React.ReactNode) => {
    const wrapperClasses = `
      absolute
      top-20 bottom-24 left-6 right-6
      z-960
      flex items-center justify-center
      pointer-events-none
    `;
    return (
      <div className={wrapperClasses}>
        <div className="pointer-events-auto h-full max-h-full w-full max-w-3xl">
          {content}
        </div>
      </div>
    );
  };

  // Wrapper para modales a pantalla completa (Index, Gallery...)
  const renderIndexWrapper = (content: React.ReactNode) => {
    return (
      <div
        className="absolute inset-0 z-2000 flex items-center justify-center bg-black/30 p-4 backdrop-blur-[2px] sm:p-8"
        onClick={() => toggleModal("none")}
      >
        <div
          className="h-[85vh] w-full max-w-5xl"
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </div>
      </div>
    );
  };

  // Wrapper para alertas pequeñas centradas (Future Feature)
  const renderCenteredAlertWrapper = (content: React.ReactNode) => {
    return (
      <div
        className="absolute inset-0 z-2000 flex items-center justify-center bg-slate-900/20 p-4 backdrop-blur-sm"
        onClick={() => toggleModal("none")}
      >
        {/* Contenedor sin tamaño fijo, se adapta al contenido */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="pointer-events-auto"
        >
          {content}
        </div>
      </div>
    );
  };

  const { setFocusLandfillId } = useMapStore();

  return (
    <>
      <MapContainer
        className="absolute inset-0 z-0"
        center={[43.4, -2.9]}
        zoom={9}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
      >
        <AttributionControl position="bottomright" prefix={false} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Datos: <a href="https://www.geo.euskadi.eus/">GeoEuskadi</a> & <a href="https://www.ihobe.eus/">Ihobe</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickDeselector />
        <MapViewportTracker />
        <LandfillsLayer />

        {/* ──────────────────────────────────────────────── */}
        {/* DESKTOP                                          */}
        {/* ──────────────────────────────────────────────── */}
        <div className="hidden lg:block">
          <ToolbarDesktop onOpenLandfillIndex={() => openIndexWithQuery("")} />

          <div className="absolute top-6 left-1/2 z-950 -translate-x-1/2">
            <SearchDesktopPanel onOpenIndex={openIndexWithQuery} />
          </div>

          <div className="absolute bottom-3 left-3 z-900 flex flex-col gap-3">
            <div className="self-start">
              <ZoomPanel />
            </div>
            <LegendDesktopPanel items={legendItems} />
          </div>

          <SelectionSidebar />
        </div>

        {/* ──────────────────────────────────────────────── */}
        {/* MOBILE                                           */}
        {/* ──────────────────────────────────────────────── */}
        <div className="block lg:hidden">
          <div className="absolute top-4 left-4 z-950">
            <ModalToggleButton
              label={t("app.menu")}
              orientation="vertical"
              isOpen={activeModal === "toolbar"}
              onToggle={() => toggleModal("toolbar")}
            />
          </div>

          <div className="absolute top-4 left-1/2 z-950 -translate-x-1/2">
            <ModalToggleButton
              label={t("app.search_placeholder")}
              orientation="horizontal"
              isOpen={activeModal === "search"}
              subtitle={hasQuery ? searchQuery : t("app.search_placeholder")}
              onClear={hasQuery ? () => setSearchQuery("") : undefined}
              onToggle={() => toggleModal("search")}
            />
          </div>

          <div className="absolute bottom-2 left-2 z-950">
            <ModalToggleButton
              label={t("app.legend")}
              orientation="vertical"
              isOpen={activeModal === "legend"}
              onToggle={() => toggleModal("legend")}
            />
          </div>

          {selectedLandfillId && (
            <div className="pointer-events-none absolute right-2 bottom-2 z-950 flex flex-col items-end gap-3">
              <MobileRecenterButton
                onClick={() => setFocusLandfillId(selectedLandfillId)}
              />

              <div className="animate-in fade-in slide-in-from-bottom-4 pointer-events-auto duration-300">
                <ModalToggleButton
                  label={selectedLandfill ? selectedLandfill.name : "Vertedero"}
                  orientation="vertical"
                  isOpen={activeModal === "selection"}
                  onToggle={() => toggleModal("selection")}
                />
              </div>
            </div>
          )}

          {/* MODALES */}
          {activeModal === "search" &&
            renderModalWrapper(
              <SearchModal onOpenIndex={openIndexWithQuery} />,
            )}

          {activeModal === "legend" &&
            renderModalWrapper(<LegendModal items={legendItems} />)}

          {activeModal === "toolbar" &&
            renderModalWrapper(
              <ToolbarModal onOpenIndex={() => openIndexWithQuery("")} />,
            )}

          {activeModal === "selection" &&
            renderModalWrapper(<SelectionModal />)}
        </div>

        {/* ──────────────────────────────────────────────── */}
        {/* GLOBAL MODALS                                   */}
        {/* ──────────────────────────────────────────────── */}

        {activeModal === "index" &&
          renderIndexWrapper(
            <LandfillIndexModal
              initialQuery={indexQuery}
              onClose={closeModal}
            />,
          )}

        {activeModal === "gallery" &&
          renderIndexWrapper(<SelectionGalleryModal />)}

        {activeModal === "related_documentation" &&
          renderIndexWrapper(<RelatedDocumentationModal />)}

        {activeModal === "attributions" &&
          renderIndexWrapper(<AttributionsModal />)}

        {activeModal === "about" && renderIndexWrapper(<AboutModal />)}

        {activeModal === ("future_feature" as any) &&
          renderCenteredAlertWrapper(<FutureFeatureModal />)}

        {activeModal === ("contact" as any) &&
          renderCenteredAlertWrapper(<ContactModal />)}
      </MapContainer>
      <LandfillsLoadingOverlay />
    </>
  );
}

export default App;
