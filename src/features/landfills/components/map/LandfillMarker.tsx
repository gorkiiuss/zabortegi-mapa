// src/features/landfills/components/map/LandfillMarker.tsx

import { Marker } from "react-leaflet";
import L from "leaflet";
import type { LandfillSummaryEntity } from "../../domain/entities/LandfillSummary";
import { getMarkerSize, getClpIconPath } from "../../config/styling";

let pulseCssInjected = false;

const HIGHLIGHTED_SIZE = 50;

const STYLES_CSS = `
.landfill-marker {
  position: relative;
  transition: transform 0.2s ease-out;
}
.landfill-marker-selected {
  box-shadow: 0 0 0 2px #ffffff, 0 0 0 5px #334155;
  z-index: 1000;
}
.landfill-marker-pulse {
  animation: landfill-pulse 1.6s ease-out infinite;
}
@keyframes landfill-pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 28px rgba(220, 38, 38, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
}
`;

interface Props {
  landfill: LandfillSummaryEntity;
  color: string;
  onClick: () => void;
  isHighlighted: boolean;
  isSelected: boolean;
  useBigSize?: boolean;
}



export function LandfillMarker({
  landfill,
  color,
  onClick,
  isHighlighted,
  isSelected,
  useBigSize = true,
}: Props) {
  if (!pulseCssInjected && typeof document !== "undefined") {
    const style = document.createElement("style");
    style.innerHTML = STYLES_CSS;
    document.head.appendChild(style);
    pulseCssInjected = true;
  }

  if (!landfill.centroid) return null;
  const position: [number, number] = [landfill.centroid.lat, landfill.centroid.lng];

  const baseSize = getMarkerSize(landfill.riskScore);
  const size = isHighlighted ? HIGHLIGHTED_SIZE : baseSize;

  let extraClass = "";
  if (isSelected) extraClass = "landfill-marker-selected";
  else if (isHighlighted) extraClass = "landfill-marker-pulse";

  const emblemSrc = getClpIconPath(landfill.mainClpSymbol);
  const hasEmblem = Boolean(emblemSrc);

  const showOnlyIcon = useBigSize && hasEmblem && (isHighlighted || isSelected);

  const innerHtml = showOnlyIcon
    ? `
      <img
        src="${emblemSrc}"
        alt=""
        draggable="false"
        style="
          width:${size}px;
          height:${size}px;
          object-fit:contain;
          pointer-events:none;
        "
      />
    `
    : "";

  const background = showOnlyIcon ? "rgba(255, 255, 255, 0.4)" : color;

  const html = `
    <div
      class="landfill-marker ${extraClass}"
      style="
        width:${size}px;
        height:${size}px;
        border-radius:9999px;
        background:${background};
        display:flex;
        align-items:center;
        justify-content:center;
        overflow:visible;
      "
    >
      ${innerHtml}
    </div>
  `;

  const icon = L.divIcon({
    html,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });

  const zIndexOffset = isSelected ? 2000 : isHighlighted ? 1000 : 0;

  return (
    <Marker
      position={position}
      icon={icon}
      zIndexOffset={zIndexOffset}
      eventHandlers={{
        click: onClick,
      }}
    />
  );
}