// src/shared/hooks/useMapModalInteractions.ts
import { useCallback, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { DomEvent } from "leaflet";

export function useMapModalInteractions() {
  const map = useMap();

  const isLockedRef = useRef(false);

  const modalRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      DomEvent.disableClickPropagation(node);
      DomEvent.disableScrollPropagation(node);
    }
  }, []);

  const enableMap = useCallback(() => {
    if (!map) return;
    if (!map.scrollWheelZoom.enabled()) map.scrollWheelZoom.enable();
    if (!map.doubleClickZoom.enabled()) map.doubleClickZoom.enable();
    if (!map.dragging.enabled()) map.dragging.enable();

    isLockedRef.current = false;
  }, [map]);

  const disableMap = useCallback(() => {
    if (!map) return;
    if (map.scrollWheelZoom.enabled()) map.scrollWheelZoom.disable();
    if (map.doubleClickZoom.enabled()) map.doubleClickZoom.disable();
    if (map.dragging.enabled()) map.dragging.disable();

    isLockedRef.current = true;
  }, [map]);

  const handleMouseEnter = useCallback(() => {
    disableMap();
  }, [disableMap]);

  const handleMouseLeave = useCallback(() => {
    enableMap();
  }, [enableMap]);

  useEffect(() => {
    return () => {
      if (isLockedRef.current) {
        enableMap();
      }
    };
  }, [enableMap]);

  return {
    modalRef,
    handleMouseEnter,
    handleMouseLeave,
  };
}
