// src/features/landfills/components/LandfillsLayer.tsx
import { Fragment, useEffect } from "react";
import type { LatLngExpression } from "leaflet";
import { Polygon } from "react-leaflet";

import { LandfillMarker } from "./LandfillMarker";
import type { Landfill } from "../domain/types";

import { useUiStore } from "@features/map/state/uiStore";
import { useMapStore } from "@features/map/state/mapStore";
import { useNoInfoLandfills } from "../hooks/useNoInfoLandfills";
import { getRiskScoreRange, getTopRiskLandfillIds } from "../domain/selectors";
import { useQueryFilteredVisibleLandfills } from "../hooks/useQueryFilteredVisibleLandfills";
import { getRiskFillColor } from "../domain/symbology";
import { useLandfillsStore } from "../state/landfillsStore";

/**
 * Convierte la geometría GeoJSON del vertedero en un array de coordenadas
 * entendibles por <Polygon /> de react-leaflet.
 *
 * - Para Polygon: usa todos los anillos (anillo exterior + holes).
 * - Para MultiPolygon: concatena todos los polígonos.
 */
function geometryToLatLngs(
  geometry: Landfill["geometry"],
): LatLngExpression[][] {
  if (geometry.type === "Polygon") {
    return geometry.coordinates.map((ring) =>
      ring.map(([lng, lat]) => [lat, lng] as LatLngExpression),
    );
  }

  if (geometry.type === "MultiPolygon") {
    const result: LatLngExpression[][] = [];
    for (const poly of geometry.coordinates) {
      for (const ring of poly) {
        result.push(ring.map(([lng, lat]) => [lat, lng] as LatLngExpression));
      }
    }
    return result;
  }

  return [];
}

export function LandfillsLayer() {
  const allLandfills = useNoInfoLandfills();
  const visibleLandfills = useQueryFilteredVisibleLandfills();

  const markAsRendered = useLandfillsStore((s) => s.markAsRendered);
  const loading = useLandfillsStore((s) => s.loading);

  useEffect(() => {
    if (!loading || allLandfills.length === 0) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        markAsRendered();
      });
    });
  }, [allLandfills, loading, markAsRendered]);

  const setSelectedLandfillId = useUiStore((s) => s.setSelectedLandfillId);
  const setFocusLandfillId = useMapStore((s) => s.setFocusLandfillId);

  const { selectedLandfillId } = useUiStore();

  if (!allLandfills.length) return null;

  const scoreRange = getRiskScoreRange(allLandfills);
  const minRiskScore = scoreRange?.min ?? 0;
  const maxRiskScore = scoreRange?.max ?? 100;

  const topPulsatingCount = Math.max(
    Math.ceil(visibleLandfills.length * 0.01),
    5,
  );
  const topVisibleIds = getTopRiskLandfillIds(
    visibleLandfills,
    topPulsatingCount,
  );

  return (
    <>
      {visibleLandfills.map((lf) => {
        const latlngs = geometryToLatLngs(lf.geometry);
        if (!latlngs.length) return null;

        const isSelected = selectedLandfillId === lf.parcelId;

        const handleClick = async () => {
          setSelectedLandfillId(lf.parcelId ?? null);
          setFocusLandfillId(lf.parcelId ?? null);
        };

        const color = getRiskFillColor(
          lf.riskLevel,
          lf.riskScore ?? 0,
          minRiskScore,
          maxRiskScore,
        );

        const isHighlighted = topVisibleIds.has(lf.parcelId ?? "");

        return (
          <Fragment key={lf.id}>
            <Polygon
              key={`poly-${lf.id}`}
              positions={latlngs}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: 0.16,
                weight: 1,
              }}
              eventHandlers={{
                click: () => handleClick,
              }}
            />

            <LandfillMarker
              key={`marker-${lf.id}`}
              landfill={lf}
              color={color}
              onClick={handleClick}
              minRiskScore={minRiskScore}
              maxRiskScore={maxRiskScore}
              isHighlighted={isHighlighted}
              isSelected={isSelected}
            />
          </Fragment>
        );
      })}
    </>
  );
}
