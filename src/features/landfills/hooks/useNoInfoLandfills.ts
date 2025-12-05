// src/features/landfills/hooks/useNoInfoLandfills.ts

import { useMemo } from "react";
import { useMapStore } from "../../map/state/mapStore";
import { useLandfills } from "./useLandfills";

export function useNoInfoLandfills() {
  const { landfills } = useLandfills();
  const showNoInfoLandfills = useMapStore((s) => s.showNoInfoLandfills);

  return useMemo(() => {
    if (showNoInfoLandfills) return landfills;
    return landfills.filter((l) => l.hasInfo);
  }, [landfills, showNoInfoLandfills]);
}
