// src/features/landfills/components/index/LandfillIndexModal.tsx

import { useEffect, useMemo, useState } from "react";
import type { Landfill } from "@features/landfills/domain/types";
import {
  groupLandfillsForIndex,
  type LandfillIndexGroupingResult,
} from "@features/landfills/domain/indexGrouping";
import { useUiStore } from "@features/map/state/uiStore";
import { useMapStore } from "@features/map/state/mapStore";

import { LandfillIndexHeader } from "./LandfillIndexHeader";
import { TerritorySection } from "./TerritorySection";
import { useNoInfoLandfills } from "@features/landfills/hooks/useNoInfoLandfills";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useLanguageStore } from "@shared/state/languageStore";

interface LandfillIndexModalProps {
  initialQuery: string;
  onClose: () => void;
}

type OpenStateMap = Record<string, boolean>;

export function LandfillIndexModal({
  initialQuery,
  onClose,
}: LandfillIndexModalProps) {
  const [query, setQuery] = useState(initialQuery);
  const [openTerritories, setOpenTerritories] = useState<OpenStateMap>({});
  const [openMunicipalities, setOpenMunicipalities] = useState<OpenStateMap>(
    {},
  );

  const { modalRef, handleMouseEnter, handleMouseLeave } =
    useMapModalInteractions();

  const landfills = useNoInfoLandfills();
  const setSelectedLandfillId = useUiStore((s) => s.setSelectedLandfillId);
  const setFocusLandfillId = useMapStore((s) => s.setFocusLandfillId);

  // Sincronizar query cuando cambia la prop
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const grouped: LandfillIndexGroupingResult = useMemo(
    () => groupLandfillsForIndex(landfills, query),
    [landfills, query],
  );

  const handleSelect = (lf: Landfill) => {
    setSelectedLandfillId(lf.parcelId ?? null);
    setFocusLandfillId(lf.parcelId ?? null);
    onClose();
  };

  // ─── Helpers de estado para acordeones ───
  const makeTerritoryKey = (tKey: string) => `t::${tKey}`;
  const makeMunicipalityKey = (tKey: string, mKey: string) =>
    `m::${tKey}::${mKey}`;

  const isTerritoryOpen = (tKey: string): boolean =>
    openTerritories[makeTerritoryKey(tKey)] ?? false;

  const toggleTerritory = (tKey: string) => {
    const key = makeTerritoryKey(tKey);
    setOpenTerritories((prev) => ({
      ...prev,
      [key]: !(prev[key] ?? false),
    }));
  };

  const isMunicipalityOpen = (tKey: string, mKey: string): boolean =>
    openMunicipalities[makeMunicipalityKey(tKey, mKey)] ?? false;

  const toggleMunicipality = (tKey: string, mKey: string) => {
    const key = makeMunicipalityKey(tKey, mKey);
    setOpenMunicipalities((prev) => ({
      ...prev,
      [key]: !(prev[key] ?? false),
    }));
  };

  const { t } = useLanguageStore();

  return (
    <div
      ref={modalRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`pointer-events-auto flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl`}
    >
      <LandfillIndexHeader
        query={query}
        totalCount={grouped.totalCount}
        matchCount={grouped.matchCount}
        onQueryChange={setQuery}
        onClose={onClose}
      />

      {/* Body con scroll */}
      <div className="flex-1 overflow-y-auto overscroll-contain bg-slate-50/30 px-4 py-4">
        {grouped.territories.length > 0 ? (
          grouped.territories.map((territoryGroup) => {
            const tKey = String(territoryGroup.key);
            const open = isTerritoryOpen(tKey);

            return (
              <TerritorySection
                key={tKey}
                group={territoryGroup}
                isOpen={open}
                onToggle={() => toggleTerritory(tKey)}
                isMunicipalityOpen={isMunicipalityOpen}
                onToggleMunicipality={toggleMunicipality}
                onSelect={handleSelect}
                territoryKey={tKey}
              />
            );
          })
        ) : (
          /* Estado vacío si la búsqueda no arroja resultados */
          <div className="flex h-full flex-col items-center justify-center p-8 text-center text-slate-400">
            <p className="text-sm">{t("index.not_found")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
