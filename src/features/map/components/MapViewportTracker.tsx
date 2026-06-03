// src/features/map/components/MapViewportTracker.tsx

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { useMapStore } from "../state/mapStore";
import { useLandfillsStore } from "@features/landfills/state/landfillsStore";

export function MapViewportTracker() {
  const map = useMap();
  const setViewport = useMapStore((s) => s.setViewport);
  const setBounds = useMapStore((s) => s.setBounds);

  const focusLandfillId = useMapStore((s) => s.focusLandfillId);
  const focusOffset = useMapStore((s) => s.focusOffset);
  const setFocusLandfillId = useMapStore((s) => s.setFocusLandfillId);

  const resetZoomSignal = useMapStore((s) => s.resetZoomSignal);

  const { landfillsSummary } = useLandfillsStore();

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
    if (!focusLandfillId || !landfillsSummary.length) return;

    const lf = landfillsSummary.find((l) => l.id === focusLandfillId);
    if (!lf) {
      setFocusLandfillId(null);
      return;
    }

    const currentZoom = map.getZoom();
    const targetZoom = Math.max(currentZoom, 14);

    const originalLatLng = L.latLng(lf.centroid.lat, lf.centroid.lng);
    if (focusOffset) {
      let targetPoint = map.project(originalLatLng, targetZoom);
      targetPoint = L.point(targetPoint.x - focusOffset[0], targetPoint.y - focusOffset[1]);
      const offsetLatLng = map.unproject(targetPoint, targetZoom);
      map.flyTo(offsetLatLng, targetZoom, { duration: 0.8 });
    } else {
      map.flyTo([lf.centroid.lat, lf.centroid.lng], targetZoom, {
        duration: 0.8,
      });
    }

    setFocusLandfillId(null);
  }, [focusLandfillId, focusOffset, landfillsSummary, map, setFocusLandfillId]);

  useEffect(() => {
    if (resetZoomSignal > 0) {
      map.flyTo([43.4, -2.9], 9, { duration: 0.8 });
    }
  }, [resetZoomSignal, map]);

  return null;
}
