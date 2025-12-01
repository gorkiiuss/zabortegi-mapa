// src/features/landfills/components/LandfillMarker.tsx
import { Marker } from "react-leaflet";
import L from "leaflet";
import type { Landfill } from "../domain/types";
import { getMarkerSize, getClpIconPath } from "../domain/symbology";

let pulseCssInjected = false;

const HIGHLIGHTED_SIZE = 50;

const STYLES_CSS = `
.landfill-marker {
  position: relative;
  transition: transform 0.2s ease-out; /* Suavizar cambios de tamaño */
}

/* Selección: Doble anillo (blanco interno, gris oscuro externo) */
.landfill-marker-selected {
  box-shadow: 0 0 0 2px #ffffff, 0 0 0 5px #334155;
  z-index: 1000; /* Asegura que el div esté por encima visualmente */
}

/* Aura pulsante (solo si NO está seleccionado) */
.landfill-marker-pulse {
  animation: landfill-pulse 1.6s ease-out infinite;
}

@keyframes landfill-pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 28px rgba(220, 38, 38, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(220, 38, 38, 0);
  }
}
`;

function ensureStylesInjected() {
  if (pulseCssInjected) return;
  const styleEl = document.createElement("style");
  styleEl.textContent = STYLES_CSS;
  document.head.appendChild(styleEl);
  pulseCssInjected = true;
}

interface LandfillMarkerProps {
  landfill: Landfill;
  color: string;
  onClick?: (id: string) => void;
  minRiskScore: number;
  maxRiskScore: number;
  isHighlighted?: boolean;
  isSelected?: boolean;
  customId?: string;
}

export function LandfillMarker({
  landfill,
  color,
  onClick,
  minRiskScore,
  maxRiskScore,
  isHighlighted = false,
  isSelected = false,
  customId,
}: LandfillMarkerProps) {
  ensureStylesInjected();

  const targetId = customId ?? landfill.parcelId;

  const useBigSize = isSelected || isHighlighted;

  const size = useBigSize
    ? HIGHLIGHTED_SIZE
    : getMarkerSize(
        landfill.riskLevel,
        landfill.riskScore,
        minRiskScore,
        maxRiskScore,
      );

  let extraClass = "";
  if (isSelected) {
    extraClass = "landfill-marker-selected";
  } else if (isHighlighted) {
    extraClass = "landfill-marker-pulse";
  }

  const zIndexOffset = isSelected ? 2000 : isHighlighted ? 1000 : 0;
  const emblemSrc = getClpIconPath(landfill.mainClpSymbol);
  const hasEmblem = Boolean(emblemSrc);

  const showOnlyIcon = useBigSize && hasEmblem;

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

  return (
    <Marker
      position={[landfill.centroid.lat, landfill.centroid.lng]}
      icon={icon}
      zIndexOffset={zIndexOffset}
      eventHandlers={
        onClick ? { click: () => onClick(targetId ?? "") } : undefined
      }
    />
  );
}
