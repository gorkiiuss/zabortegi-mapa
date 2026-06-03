// src/features/landfills/components/list/LandfillsListModal.tsx

import { useEffect, useMemo, useState } from "react";
import {
  groupLandfills,
  type LandfillListGroupingResult,
} from "@features/landfills/components/list/utils/listGrouping";
import { useUiStore } from "@features/map/state/uiStore";
import { useMapStore } from "@features/map/state/mapStore";

import { LandfillListHeader } from "./LandfillListHeader";
import { TerritorySection } from "./TerritorySection";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useLanguageStore } from "@shared/state/languageStore";
import { useLandfillsStore } from "@features/landfills/state/landfillsStore";
import type { LandfillSummaryEntity } from "@features/landfills/domain/entities/LandfillSummary";

interface LandfillListModalProps {
  initialQuery: string;
  onClose: () => void;
}

type OpenStateMap = Record<string, boolean>;

export function LandfillListModal({
  initialQuery,
  onClose,
}: LandfillListModalProps) {
  const [query, setQuery] = useState(initialQuery);
  const [openTerritories, setOpenTerritories] = useState<OpenStateMap>({});
  const [openMunicipalities, setOpenMunicipalities] = useState<OpenStateMap>(
    {},
  );

  const { modalRef, handleMouseEnter, handleMouseLeave } =
    useMapModalInteractions();

  const { landfillsSummary } = useLandfillsStore();
  const setSelectedLandfillId = useUiStore((s) => s.setSelectedLandfillId);
  const setFocusLandfillId = useMapStore((s) => s.setFocusLandfillId);

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

  const grouped: LandfillListGroupingResult = useMemo(
    () => groupLandfills(landfillsSummary, query),
    [landfillsSummary, query],
  );

  const handleSelect = (lf: LandfillSummaryEntity) => {
    setSelectedLandfillId(lf.id);
    setFocusLandfillId(lf.id);
    onClose();
  };

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
      className={`pointer-events-auto flex h-full w-full flex-col overflow-hidden rounded-none sm:rounded-2xl border-0 sm:border border-slate-200 bg-white shadow-2xl`}
    >
      <LandfillListHeader
        query={query}
        totalCount={grouped.totalCount}
        matchCount={grouped.matchCount}
        onQueryChange={setQuery}
        onClose={onClose}
      />

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
          <div className="flex h-full flex-col items-center justify-center p-8 text-center text-slate-400">
            <p className="text-sm">{t("list.not_found")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
