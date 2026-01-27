import { useMemo } from "react";
import { useLandfillsStore } from "../state/landfillsStore";
import type { Territory } from "../domain/types";

export interface LandfillStats {
  total: number;
  byTerritory: Record<Territory, number>;
  undocumented: number;
}

export function useLandfillGeneralStats() {
  const landfills = useLandfillsStore((s) => s.landfills);
  const loading = useLandfillsStore((s) => s.loading);

  const stats = useMemo<LandfillStats>(() => {
    const counts = {
      total: 0,
      byTerritory: {
        Bizkaia: 0,
        Gipuzkoa: 0,
        Araba: 0,
      } as Record<Territory, number>,
      undocumented: 0,
    };

    if (!landfills || landfills.length === 0) return counts;

    counts.total = landfills.length;

    for (const lf of landfills) {
      if (lf.territory && counts.byTerritory[lf.territory] !== undefined) {
        counts.byTerritory[lf.territory]++;
      }

      if (!lf.hasInfo) {
        counts.undocumented++;
      }
    }

    return counts;
  }, [landfills]);

  return {
    stats,
    loading,
  };
}