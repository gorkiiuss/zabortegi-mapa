// src/features/map/components/MobileRecenterButton.tsx
import { Crosshair } from "@shared/components/Icons";
import { useMapPanelInteractions } from "@shared/hooks/useMapPanelInteractions";

interface MobileRecenterButtonProps {
  onClick: () => void;
}

export function MobileRecenterButton({ onClick }: MobileRecenterButtonProps) {
  const { ref, handleMouseEnter, handleMouseLeave } = useMapPanelInteractions();

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="pointer-events-auto"
    >
      <button
        onClick={onClick}
        className="animate-in fade-in slide-in-from-bottom-8 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-600 shadow-lg shadow-slate-200/50 backdrop-blur-sm transition-all duration-200 active:scale-95 active:bg-slate-50"
        aria-label="Centrar mapa en vertedero"
        type="button"
      >
        <Crosshair size={24} />
      </button>
    </div>
  );
}
