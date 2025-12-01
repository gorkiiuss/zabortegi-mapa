// src/shared/hooks/useMapPanelInteractions.ts
import { useCallback, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { DomEvent } from "leaflet";

interface UseMapPanelInteractionsOptions {
  disableScrollWheelZoom?: boolean;
  disableDoubleClickZoom?: boolean;
  shieldDomEvents?: boolean;
}

export function useMapPanelInteractions(
  options: UseMapPanelInteractionsOptions = {},
) {
  const map = useMap();
  const {
    disableScrollWheelZoom = true,
    disableDoubleClickZoom = true,
    shieldDomEvents = true,
  } = options;

  const isLockedRef = useRef(false);

  const panelRef = useCallback(
    (node: HTMLElement | null) => {
      if (node && shieldDomEvents) {
        DomEvent.disableClickPropagation(node);
        DomEvent.disableScrollPropagation(node);
      }
    },
    [shieldDomEvents],
  );

  const lockMap = useCallback(() => {
    if (!map) return;
    if (disableScrollWheelZoom && map.scrollWheelZoom.enabled())
      map.scrollWheelZoom.disable();
    if (disableDoubleClickZoom && map.doubleClickZoom.enabled())
      map.doubleClickZoom.disable();
    isLockedRef.current = true;
  }, [map, disableScrollWheelZoom, disableDoubleClickZoom]);

  const unlockMap = useCallback(() => {
    if (!map) return;
    if (disableScrollWheelZoom && !map.scrollWheelZoom.enabled())
      map.scrollWheelZoom.enable();
    if (disableDoubleClickZoom && !map.doubleClickZoom.enabled())
      map.doubleClickZoom.enable();
    isLockedRef.current = false;
  }, [map, disableScrollWheelZoom, disableDoubleClickZoom]);

  const handleMouseEnter = useCallback(() => lockMap(), [lockMap]);
  const handleMouseLeave = useCallback(() => unlockMap(), [unlockMap]);

  useEffect(() => {
    return () => {
      if (isLockedRef.current) unlockMap();
    };
  }, [unlockMap]);

  return {
    ref: panelRef,
    handleMouseEnter,
    handleMouseLeave,
    unlockMap,
  };
}
