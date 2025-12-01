// src/features/toolbar/components/ToolbarDesktop.tsx
import { useState } from "react";
import { useToolbarMenu } from "../hooks/useToolbarMenu";
import { useMapPanelInteractions } from "@shared/hooks/useMapPanelInteractions";

interface ToolbarDesktopProps {
  onOpenLandfillIndex: () => void;
}

export function ToolbarDesktop({ onOpenLandfillIndex }: ToolbarDesktopProps) {
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);

  const { menuStructure } = useToolbarMenu({
    onOpenIndex: onOpenLandfillIndex,
    onCloseUi: () => setOpenSectionId(null),
  });

  const toggle = (id: string) => {
    setOpenSectionId((current) => (current === id ? null : id));
  };

  const { ref, handleMouseEnter, handleMouseLeave } = useMapPanelInteractions();

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="absolute top-3 left-3 z-1000 flex gap-3"
    >
      {menuStructure.map((section) => {
        const isOpen = openSectionId === section.id;

        return (
          <div key={section.id} className="relative">
            {/* Botón de la pestaña */}
            <button
              onClick={() => toggle(section.id)}
              className={`flex items-center gap-2 rounded-b-lg border-x border-b border-slate-300 px-3 py-1 text-sm shadow-sm transition-colors ${isOpen ? "bg-slate-100 font-medium" : "bg-white/90 hover:bg-white"} `}
            >
              <span>{section.label}</span>
            </button>

            {/* Menú Dropdown */}
            <div
              className={`absolute top-full left-0 mt-1 w-56 origin-top-left overflow-hidden rounded-xl border border-slate-200 bg-white text-sm shadow-lg transition-all duration-150 ${
                isOpen
                  ? "translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none -translate-y-1 scale-95 opacity-0"
              } `}
            >
              <ul className="divide-y divide-slate-100">
                {section.items.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={!item.disabled ? item.action : undefined}
                    className={`px-3 py-2 text-slate-700 ${
                      item.disabled
                        ? "cursor-not-allowed bg-slate-50 opacity-50"
                        : "cursor-pointer hover:bg-emerald-50 hover:text-emerald-900"
                    } `}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
