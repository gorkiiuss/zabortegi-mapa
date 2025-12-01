// src/features/legend/components/LegendDesktopPanel.tsx
import { useMapPanelInteractions } from "@shared/hooks/useMapPanelInteractions";
import { useLegendLogic } from "../hooks/useLegendLogic";
import { LegendBody } from "./LegendBody";
import type { LegendItem } from "../domain/types";

interface LegendDesktopPanelProps {
  items: LegendItem[];
}

export function LegendDesktopPanel({ items }: LegendDesktopPanelProps) {
  const logic = useLegendLogic();

  const { ref, handleMouseEnter, handleMouseLeave } = useMapPanelInteractions();

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="shadow-lh flex max-h-56 w-64 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/95 text-sm"
    >
      <LegendBody
        items={items}
        riskPercent={logic.riskPercent}
        barRef={logic.barRef}
        onPointerDown={logic.handlePointerDown}
      />
    </div>
  );
}
