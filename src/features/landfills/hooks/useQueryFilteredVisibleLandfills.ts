// src/features/landfills/hooks/useQueryFilteredVisibleLandfills.ts

import { useMemo } from "react";
import { useMapStore } from "@features/map/state/mapStore";
import { useUiStore } from "@features/map/state/uiStore";
import { useLandfillsStore } from "../state/landfillsStore";
import { useAdvancedSearchStore } from "@features/search/state/useAdvancedSearchStore";
import { isLandfillInBounds, matchesQuery } from "../state/selectors";
import type { LandfillSummaryEntity } from "../domain/entities/LandfillSummary";

export function useQueryFilteredVisibleLandfills(): LandfillSummaryEntity[] {
  const landfillsSummary = useLandfillsStore((s) => s.landfillsSummary);
  const advancedSearchResults = useAdvancedSearchStore((s) => s.advancedSearchResults);
  
  const bounds = useMapStore((s) => s.viewport.bounds);
  const searchQuery = useUiStore((s) => s.searchQuery);
  const selectedLandfillId = useUiStore((s) => s.selectedLandfillId);

  return useMemo(() => {
    const baseLandfills = advancedSearchResults !== null ? advancedSearchResults : landfillsSummary;
    if (!baseLandfills || baseLandfills.length === 0) return [];

    const queryFilteredAndInView = baseLandfills
      .filter((lf) => isLandfillInBounds(lf, bounds))
      .filter((lf) => matchesQuery(lf, searchQuery));

    const resultList = [...queryFilteredAndInView];

    if (selectedLandfillId) {
      const alreadyInList = resultList.some((lf) => lf.id === selectedLandfillId);

      if (!alreadyInList) {
        const selectedLandfill = landfillsSummary.find((lf) => lf.id === selectedLandfillId);
        if (selectedLandfill) {
          resultList.push(selectedLandfill);
        }
      }
    }
    return resultList.sort((a, b) => {
      if (a.riskScore == null && b.riskScore == null) return 0;
      if (a.riskScore == null) return 1;
      if (b.riskScore == null) return -1;
      return b.riskScore - a.riskScore;
    });

  }, [landfillsSummary, advancedSearchResults, bounds, searchQuery, selectedLandfillId]);
}