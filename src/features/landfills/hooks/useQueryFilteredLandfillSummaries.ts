// src/features/landfills/hooks/useQueryFilteredLandfillSummaries.ts

import { useMemo } from "react";
import { useLandfillsStore } from "../state/landfillsStore";
import { matchesQuery } from "../state/selectors";
import type { LandfillSummaryEntity } from "../domain/entities/LandfillSummary";

export function useQueryFilteredLandfillSummaries(
  query: string,
  limit?: number,
): LandfillSummaryEntity[] {
  const landfillsSummary = useLandfillsStore((s) => s.landfillsSummary);
  return useMemo(() => {
    if (!landfillsSummary || landfillsSummary.length === 0) return [];
    const filtered = landfillsSummary.filter((lf) => matchesQuery(lf, query));
    const sorted = filtered.sort((a, b) => {
      if (a.riskScore == null && b.riskScore == null) return 0;
      if (a.riskScore == null) return 1;
      if (b.riskScore == null) return -1;
      return b.riskScore - a.riskScore;
    });
    return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
  }, [landfillsSummary, query, limit]);
}