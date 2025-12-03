// src/features/toolbar/components/ToolbarDesktop.tsx
import { useState } from "react";
import { useToolbarMenu } from "../hooks/useToolbarMenu";
import { useMapPanelInteractions } from "@shared/hooks/useMapPanelInteractions";
import { DropdownMenu } from "@shared/components/DropdownMenu";

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
          <DropdownMenu
            key={section.id}
            isOpen={isOpen}
            onClose={() => setOpenSectionId(null)}
            items={section.items}
            align="left"
            trigger={
              <button
                onClick={() => toggle(section.id)}
                className={`flex items-center gap-2 rounded-b-lg border-x border-b border-slate-300 px-3 py-1 text-sm shadow-sm transition-colors ${isOpen ? "bg-slate-100 font-medium" : "bg-white/90 hover:bg-white"}`}
              >
                <span>{section.label}</span>
              </button>
            }
          />
        );
      })}
    </div>
  );
}
