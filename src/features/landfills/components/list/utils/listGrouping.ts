// src/features/landfills/components/list/utils/listGrouping.ts

import type { LandfillSummaryEntity } from "@features/landfills/domain/entities/LandfillSummary";
import { matchesQuery } from "../../../state/selectors";
import { HistoricTerritoryVO, type HistoricTerritory } from "@features/landfills/domain/valueObjects/location/HistoricTerritory";
import { useLanguageStore } from "@shared/state/languageStore";

export interface MunicipalityGroup {
  readonly key: string;
  readonly label: string;
  readonly landfills: LandfillSummaryEntity[];
  readonly totalCount: number;
}

export interface HistoricTerritoryGroup {
  readonly key: HistoricTerritory | null;
  readonly label: string;
  readonly municipalities: MunicipalityGroup[];
  readonly totalCount: number;
}

export interface LandfillListGroupingResult {
  readonly territories: HistoricTerritoryGroup[];
  readonly totalCount: number;
  readonly matchCount: number;
}

function getTerritorySortIndex(key: HistoricTerritory | null): number {
  if (key == null) return HistoricTerritoryVO.values().length;
  return HistoricTerritoryVO.values().indexOf(key);
}

export function groupLandfills(
  landfills: LandfillSummaryEntity[],
  query: string,
): LandfillListGroupingResult {
  const unknownMunicipalityLabel = useLanguageStore.getState().t("domain.entities.landfill_summary.municipality_placeholder");
  const filtered = landfills.filter((lf) => matchesQuery(lf, query));

  const totalCount = landfills.length;
  const matchCount = filtered.length;

  const groupingMap = new Map<HistoricTerritory | null, Map<string, LandfillSummaryEntity[]>>();

  for (const territory of HistoricTerritoryVO.values()) {
    groupingMap.set(territory, new Map<string, LandfillSummaryEntity[]>());
  }

  for (const lf of filtered) {
    const territoryKey = lf.historicTerritory;
    const municipalityKey = lf.municipality || unknownMunicipalityLabel;

    if (!groupingMap.has(territoryKey)) {
      groupingMap.set(territoryKey, new Map<string, LandfillSummaryEntity[]>());
    }
    const municipalityMap = groupingMap.get(territoryKey)!;

    if (!municipalityMap.has(municipalityKey)) {
      municipalityMap.set(municipalityKey, []);
    }
    municipalityMap.get(municipalityKey)!.push(lf);
  }

  const territories: HistoricTerritoryGroup[] = [];

  const sortedTerritoryEntries = [...groupingMap.entries()].sort(
    ([keyA], [keyB]) => getTerritorySortIndex(keyA) - getTerritorySortIndex(keyB)
  );

  for (const [territoryKey, municipalityMap] of sortedTerritoryEntries) {
    if (municipalityMap.size === 0 && territoryKey === null) continue;

    const municipalities: MunicipalityGroup[] = [...municipalityMap.entries()]
      .sort(([muniA], [muniB]) => {
        const isAUnknown = muniA === unknownMunicipalityLabel;
        const isBUnknown = muniB === unknownMunicipalityLabel;
        if (isAUnknown && !isBUnknown) return 1;
        if (!isAUnknown && isBUnknown) return -1;
        return muniA.localeCompare(muniB, "es");
      })
      .map(([municipalityKey, list]) => {
        const sortedLandfills = [...list].sort((a, b) => {
          if (a.riskScore === null && b.riskScore === null) return 0;
          if (a.riskScore === null) return 1;
          if (b.riskScore === null) return -1;
          return b.riskScore - a.riskScore;
        });

        return {
          key: municipalityKey,
          label: municipalityKey,
          landfills: sortedLandfills,
          totalCount: sortedLandfills.length,
        };
      })
      .filter((muniGroup) => muniGroup.totalCount > 0);

    const territoryTotalCount = municipalities.reduce((acc, muni) => acc + muni.totalCount, 0);

    if (municipalities.length > 0 || !query.trim()) {
      const label = territoryKey
        ? useLanguageStore.getState().t(`domain.vos.location.historic_territory.types.${territoryKey.toLowerCase()}` as any)
        : useLanguageStore.getState().t("details.no_historic_territory");

      territories.push({
        key: territoryKey,
        label,
        municipalities,
        totalCount: territoryTotalCount,
      });
    }
  }

  return {
    territories,
    totalCount,
    matchCount,
  };
}