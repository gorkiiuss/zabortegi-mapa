// src/features/landfills/hooks/useLandfillGeneralStats.ts

import { useMemo } from "react";
import { useLandfillsStore } from "../state/landfillsStore";
import type { HistoricTerritory } from "../domain/valueObjects/location/HistoricTerritory";

export interface LandfillStats {
  total: number;
  byTerritory: Record<HistoricTerritory, number>;
  undocumented: number;
}

export function useLandfillGeneralStats() {
  const landfillsSummary = useLandfillsStore((s) => s.landfillsSummary);
  const loading = useLandfillsStore((s) => s.isLoadingSummary);

  const stats = useMemo<LandfillStats>(() => {
    const counts = {
      total: 0,
      byTerritory: {
        BIZKAIA: 0,
        GIPUZKOA: 0,
        ARABA: 0,
      } as Record<HistoricTerritory, number>,
      undocumented: 0,
    };

    if (!landfillsSummary || landfillsSummary.length === 0) return counts;

    counts.total = landfillsSummary.length;

    for (const lf of landfillsSummary) {
      if (lf.historicTerritory && counts.byTerritory[lf.historicTerritory] !== undefined) {
        counts.byTerritory[lf.historicTerritory]++;
      }
    }

    return counts;
  }, [landfillsSummary]);

  return {
    stats,
    loading,
  };
}