// src/features/landfills/hooks/useVisibleLandfills.ts
import { useMemo } from "react";
import { useMapStore } from "@features/map/state/mapStore";
import { hasId, isLandfillInBounds, matchesQuery } from "../domain/selectors";
import type { Landfill } from "../domain/types";
import { useNoInfoLandfills } from "./useNoInfoLandfills";
import { useUiStore } from "@features/map/state/uiStore";

export function useQueryFilteredVisibleLandfills(): Landfill[] {
  const landfills = useNoInfoLandfills();
  const bounds = useMapStore((s) => s.viewport.bounds);
  const searchQuery = useUiStore((s) => s.searchQuery);

  const { selectedLandfillId } = useUiStore();

  return useMemo(() => {
    const queryFilteredAndInView = landfills
      .filter((lf) => isLandfillInBounds(lf, bounds))
      .filter((lf) => matchesQuery(lf, searchQuery));

    const resultList = [...queryFilteredAndInView];

    if (selectedLandfillId) {
      const selectedLandfill = landfills.find((lf) =>
        hasId(lf, selectedLandfillId),
      );

      if (selectedLandfill) {
        const alreadyInList = resultList.some((lf) =>
          hasId(lf, selectedLandfillId),
        );

        if (!alreadyInList) {
          resultList.push(selectedLandfill);
        }
      }
    }

    return resultList.sort((a, b) => b.riskScore - a.riskScore);
  }, [landfills, bounds, searchQuery, selectedLandfillId]);
}
