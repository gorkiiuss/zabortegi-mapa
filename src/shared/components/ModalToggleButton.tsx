// src/shared/components/ModalToggleButton.tsx

import { useMapPanelInteractions } from "@shared/hooks/useMapPanelInteractions";

interface ModalToggleButtonProps {
  label: string;
  orientation?: "horizontal" | "vertical";
  isOpen: boolean;
  onToggle: () => void;
  subtitle?: string;
  onClear?: () => void;
}

export function ModalToggleButton({
  label,
  orientation = "horizontal",
  isOpen,
  onToggle,
  subtitle,
  onClear,
}: ModalToggleButtonProps) {
  const arrow =
    orientation === "horizontal" ? (isOpen ? "▲" : "▼") : isOpen ? "◀" : "▶";

  const baseClasses =
    "border shadow-lh text-xs font-medium transition-colors " +
    "inline-flex items-center";

  const activeClasses =
    "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-lg";
  const inactiveClasses =
    "bg-white/95 border-slate-200 text-slate-700 hover:bg-slate-50";

  const containerClasses = `${baseClasses} ${
    isOpen ? activeClasses : inactiveClasses
  }`;

  const { ref, handleMouseEnter, handleMouseLeave } = useMapPanelInteractions();

  // ───────────── HORIZONTAL (buscador) ─────────────
  if (orientation === "horizontal") {
    const displayText =
      subtitle && subtitle.trim().length > 0 ? subtitle : label;

    return (
      <div
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          onClick={onToggle}
          className={` ${containerClasses} max-w-xs gap-2 rounded-full px-3 py-1.5`}
        >
          <span className="text-sm leading-none">🔍</span>

          <span className="truncate text-[11px] text-inherit">
            {displayText}
          </span>

          {onClear && subtitle && subtitle.trim().length > 0 && (
            <span
              className="ml-1 rounded-full border border-slate-300 px-1 text-[10px] leading-none hover:bg-slate-200"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onClear();
              }}
            >
              ✕
            </span>
          )}

          <span className="ml-1 text-[10px] leading-none">{arrow}</span>
        </button>
      </div>
    );
  }

  // ───────────── VERTICAL (leyenda) ─────────────
  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={onToggle}
        className={` ${containerClasses} flex-col items-center justify-center gap-1 rounded-2xl px-1 py-3`}
      >
        <span className="text-[10px] leading-tight">{label}</span>
        <span className="text-[10px] leading-none">{arrow}</span>
      </button>
    </div>
  );
}
