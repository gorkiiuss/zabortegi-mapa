import { useMapEvents } from "react-leaflet";
import { useUiStore } from "../state/uiStore";

export function MapClickDeselector() {
  const setSelectedLandfillId = useUiStore((s) => s.setSelectedLandfillId);
  const activeModal = useUiStore((s) => s.activeModal);
  const closeModal = useUiStore((s) => s.closeModal);

  useMapEvents({
    click: (_e) => {
      setSelectedLandfillId(null);

      if (activeModal === "selection") {
        closeModal();
      }
    },
  });

  return null;
}
