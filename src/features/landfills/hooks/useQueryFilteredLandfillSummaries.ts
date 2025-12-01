// src/features/landfills/hooks/useQueryFilteredLandfillSummaires.ts

import { useMemo } from "react";
import type { LandfillSummary } from "../domain/types";
import {
  filterRankingByQuery as filterSummaryByQuery,
  sortRankingByScore as sortSummaryByScore,
  summarize,
} from "../domain/selectors";
import { useNoInfoLandfills } from "./useNoInfoLandfills";

export function useQueryFilteredLandfillSummaries(
  query: string,
  limit?: number,
) {
  const landfills = useNoInfoLandfills();

  return useMemo<LandfillSummary[]>(() => {
    const items: LandfillSummary[] = landfills.map((lf) => summarize(lf));

    const filtered = filterSummaryByQuery(items, query);
    const sorted = sortSummaryByScore(filtered);

    return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
  }, [landfills, query, limit]);
}
