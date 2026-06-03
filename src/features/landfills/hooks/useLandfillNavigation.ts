// src/features/landfills/hooks/useLandfillNavigation.ts

import { useCallback } from "react";
import { useLandfillsStore } from "../state/landfillsStore";
import { useUiStore } from "@features/map/state/uiStore";
import { useMapStore } from "@features/map/state/mapStore";

export function useLandfillNavigation() {
  const { landfillsSummary } = useLandfillsStore();

  const navigateById = useCallback((id: string) => {
    const target = landfillsSummary.find((l) => l.id === id);

    if (!target) {
      console.warn(`[Navigation] Vertedero con id ${id} no encontrado.`);
      return;
    }

    const uiStore = useUiStore.getState();
    const mapStore = useMapStore.getState();

    uiStore.openModal("selection", true);

    uiStore.setSelectedLandfillId(target.id);
    mapStore.setFocusLandfillId(target.id);
    
  }, []);

  return { navigateById: navigateById };
}