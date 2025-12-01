// src/features/map/components/MapViewportTracker.tsx
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useMapStore } from "../state/mapStore";
import { useNoInfoLandfills } from "@features/landfills/hooks/useNoInfoLandfills";

export function MapViewportTracker() {
  const map = useMap();
  const setViewport = useMapStore((s) => s.setViewport);
  const setBounds = useMapStore((s) => s.setBounds);

  const focusLandfillId = useMapStore((s) => s.focusLandfillId);
  const setFocusLandfillId = useMapStore((s) => s.setFocusLandfillId);

  const landfills = useNoInfoLandfills();

  useEffect(() => {
    function updateViewport() {
      const center = map.getCenter();
      const zoom = map.getZoom();
      const bounds = map.getBounds();

      setViewport({
        center: { lat: center.lat, lng: center.lng },
        zoom,
      });

      setBounds([
        bounds.getSouth(),
        bounds.getWest(),
        bounds.getNorth(),
        bounds.getEast(),
      ]);
    }

    updateViewport();

    map.on("moveend", updateViewport);
    map.on("zoomend", updateViewport);

    return () => {
      map.off("moveend", updateViewport);
      map.off("zoomend", updateViewport);
    };
  }, [map, setViewport, setBounds]);

  useEffect(() => {
    if (!focusLandfillId) return;
    if (!landfills.length) return;

    const lf = landfills.find((l) => l.parcelId === focusLandfillId);

    if (!lf) {
      setFocusLandfillId(null);
      return;
    }

    const currentZoom = map.getZoom();
    const targetZoom = Math.max(currentZoom, 14);

    map.flyTo([lf.centroid.lat, lf.centroid.lng], targetZoom, {
      duration: 0.8,
    });

    setFocusLandfillId(null);
  }, [focusLandfillId, landfills, map, setFocusLandfillId]);
  return null;
}
