import { useCallback } from "react";
import { useLandfillsStore } from "../state/landfillsStore";
import { useUiStore } from "@features/map/state/uiStore";
import { useMapStore } from "@features/map/state/mapStore";

export function useLandfillNavigation() {
  const navigateByCode = useCallback((code: string) => {
    const allLandfills = useLandfillsStore.getState().landfills;
    const target = allLandfills.find((l) => l.code === code);

    if (!target) {
      console.warn(`[Navigation] Vertedero con código ${code} no encontrado.`);
      return;
    }

    const uiStore = useUiStore.getState();
    const mapStore = useMapStore.getState();

    uiStore.openModal("selection", true);

    uiStore.setSelectedLandfillId(target.id);
    mapStore.setFocusLandfillId(target.id);
    
  }, []);

  return { navigateByCode };
}