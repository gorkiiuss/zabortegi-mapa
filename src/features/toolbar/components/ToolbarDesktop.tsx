// src/features/toolbar/components/ToolbarDesktop.tsx

import { useToolbarMenu } from "../hooks/useToolbarMenu";
import { useMapPanelInteractions } from "@shared/hooks/useMapPanelInteractions";
import { DropdownMenu } from "@shared/components/DropdownMenu";
import { useUiStore } from "@features/map/state/uiStore";

interface ToolbarDesktopProps {
  onOpenLandfillIndex: () => void;
  id?: string;
}

export function ToolbarDesktop({ onOpenLandfillIndex, id }: ToolbarDesktopProps) {
  const { openToolbarDropdownId, setOpenToolbarDropdownId } = useUiStore();
  const { menuStructure } = useToolbarMenu({
    onOpenIndex: onOpenLandfillIndex,
    onCloseUi: () => setOpenToolbarDropdownId(null),
  });

  const toggle = (id: string) => {
    setOpenToolbarDropdownId(openToolbarDropdownId === id ? null : id);
  };

  const { ref, handleMouseEnter, handleMouseLeave } = useMapPanelInteractions();

  return (
    <div
      id={id}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="absolute top-3 left-3 z-1000 flex gap-3"
    >
      {menuStructure.map((section) => {
        const isOpen = openToolbarDropdownId === section.id;

        return (
          <DropdownMenu
            key={section.id}
            isOpen={isOpen}
            onClose={() => setOpenToolbarDropdownId(null)}
            items={section.items}
            align="left"
            idPrefix="desktop"
            trigger={
              <button
                id={`tutorial-menu-${section.id}`}
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
