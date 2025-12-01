// src/features/map/components/ZoomPanel.tsx

import { useMap } from "react-leaflet";

export function ZoomPanel() {
  const map = useMap();

  const changeZoom = (delta: number) => {
    const current = map.getZoom();
    map.setZoom(current + delta);
  };

  return (
    <div className="inline-flex items-center overflow-hidden rounded-2xl border border-slate-200 bg-white/95 text-sm shadow-lg transition-transform duration-300">
      <button
        type="button"
        onClick={() => changeZoom(-1)}
        className="px-3 py-1.5 transition hover:bg-slate-100"
      >
        −
      </button>

      <div className="h-6 w-px bg-slate-200" />

      <button
        type="button"
        onClick={() => changeZoom(1)}
        className="px-3 py-1.5 transition hover:bg-slate-100"
      >
        +
      </button>
    </div>
  );
}
