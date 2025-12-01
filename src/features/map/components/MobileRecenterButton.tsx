// src/features/map/components/MobileRecenterButton.tsx
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="22" y1="12" x2="18" y2="12" />
          <line x1="6" y1="12" x2="2" y2="12" />
          <line x1="12" y1="6" x2="12" y2="2" />
          <line x1="12" y1="22" x2="12" y2="18" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      </button>
    </div>
  );
}
