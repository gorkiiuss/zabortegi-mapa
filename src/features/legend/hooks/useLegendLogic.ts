// src/features/legend/hooks/useLegendLogic.ts
import { useState, useRef } from "react";

export function useLegendLogic() {
  const [riskPercent, setRiskPercent] = useState(75);
  const barRef = useRef<HTMLDivElement | null>(null);

  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!barRef.current) return;

    e.stopPropagation();

    const updateFromClientX = (clientX: number) => {
      if (!barRef.current) return;
      const rect = barRef.current.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const pct = rect.width > 0 ? Math.round((x / rect.width) * 100) : 0;
      setRiskPercent(pct);
    };

    updateFromClientX(e.clientX);

    const handleMove = (ev: PointerEvent) => {
      updateFromClientX(ev.clientX);
    };
    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  };

  return {
    riskPercent,
    barRef,
    handlePointerDown,
  };
}
