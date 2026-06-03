// src/features/landfills/components/map/LandfillsLayer.tsx

import { Fragment } from "react";
import { Polygon } from "react-leaflet";
import { LandfillMarker } from "./LandfillMarker";

import { useUiStore } from "@features/map/state/uiStore";
import { useMapStore } from "@features/map/state/mapStore";
import { getRiskFillColor } from "../../config/styling";

import { geometryToLatLngs } from "../../utils/geo";

import { getTopRiskLandfillIds } from "../../state/selectors";
import { useQueryFilteredVisibleLandfills } from "../../hooks/useQueryFilteredVisibleLandfills";

export function LandfillsLayer() {
  const visibleLandfills = useQueryFilteredVisibleLandfills();

  const selectedLandfillId = useUiStore((s) => s.selectedLandfillId);
  const setSelectedLandfillId = useUiStore((s) => s.setSelectedLandfillId);
  const setFocusLandfillId = useMapStore((s) => s.setFocusLandfillId);

  const topPulsatingCount = Math.max(Math.ceil(visibleLandfills.length * 0.01), 5);
  const topVisibleIds = getTopRiskLandfillIds(visibleLandfills, topPulsatingCount);

  const minRiskScore = 0;
  const maxRiskScore = 100;

  return (
    <>
      {visibleLandfills.map((lf) => {
        const latlngs = geometryToLatLngs(lf.geometry as any);
        if (!latlngs || !latlngs.length) return null;

        const isSelected = selectedLandfillId === lf.id;
        const isHighlighted = topVisibleIds.has(lf.id);

        const handleClick = () => {
          setSelectedLandfillId(lf.id);
          setFocusLandfillId(lf.id);
        };

        const color = getRiskFillColor(
          lf.riskScore,
          minRiskScore,
          maxRiskScore,
        );

        return (
          <Fragment key={lf.id}>
            <Polygon
              positions={latlngs}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: 0.16,
                weight: 1,
              }}
              eventHandlers={{
                click: handleClick,
              }}
            />

            <LandfillMarker
              landfill={lf}
              color={color}
              onClick={handleClick}
              isHighlighted={isHighlighted}
              isSelected={isSelected}
            />
          </Fragment>
        );
      })}
    </>
  );
}