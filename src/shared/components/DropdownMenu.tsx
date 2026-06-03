// src/shared/components/DropdownMenu.tsx

import type { ReactNode } from "react";
import { Plus } from "./Icons";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export interface MenuItem {
  label: string;
  action: () => void;
  isActive?: boolean;
  disabled?: boolean;
  isFutureFeature?: boolean;
  id?: string;
}

export interface DropdownMenuProps {
  trigger: ReactNode;
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
  align?: "left" | "right";
  widthClass?: string;
  idPrefix?: string;
}

export function DropdownMenu({
  trigger,
  items,
  isOpen,
  onClose,
  align = "left",
  widthClass = "w-56",
  idPrefix = "",
}: DropdownMenuProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updateCoords = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setCoords({
      top: rect.bottom,
      left: align === "left" ? rect.left : rect.right,
    });
  };

  useEffect(() => {
    if (!isOpen) return;

    updateCoords();

    const handleScrollOrResize = () => {
      updateCoords();
    };

    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isOpen, align]);

  const getItemClasses = (item: MenuItem) => {
    const base =
      "flex items-center justify-between px-4 py-2.5 transition-colors";

    if (item.disabled) {
      return `${base} cursor-not-allowed bg-slate-50 opacity-50 text-slate-400`;
    }

    if (item.isFutureFeature) {
      return `${base} cursor-pointer bg-emerald-50/40 text-emerald-700 hover:bg-emerald-100/50 hover:text-emerald-800`;
    }

    if (item.isActive) {
      return `${base} cursor-pointer bg-emerald-50/50 font-semibold text-emerald-700`;
    }

    return `${base} cursor-pointer hover:bg-emerald-50 hover:text-emerald-900 text-slate-700`;
  };

  const menuContent = isOpen && coords && (
    <>
      <div
        className="fixed inset-0 z-[9998] cursor-default"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />
      <div
        style={{
          position: "fixed",
          top: `${coords.top}px`,
          left: `${coords.left}px`,
          transform: align === "right" ? "translateX(-100%)" : undefined,
          transformOrigin: align === "right" ? "top right" : "top left",
          animation: "dropdown-fade-in 0.15s ease-out forwards",
        }}
        className={`z-[9999] mt-2 ${widthClass} overflow-hidden rounded-xl border border-slate-200 bg-white text-sm shadow-lg`}
      >
        <ul className="divide-y divide-slate-100">
          {items.map((item, idx) => (
            <li
              key={idx}
              id={item.id ? (idPrefix ? `${idPrefix}-${item.id}` : item.id) : undefined}
              onClick={() => {
                if (!item.disabled) {
                  item.action();
                  onClose();
                }
              }}
              className={getItemClasses(item)}
            >
              <span>{item.label}</span>

              {item.isFutureFeature && !item.disabled && (
                <Plus size={14} className="text-emerald-500" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <div ref={triggerRef} className="relative inline-block">
      {trigger}
      {isOpen && (
        <>
          <style>{`
            @keyframes dropdown-fade-in {
              from { opacity: 0; transform: translateY(-4px) ${align === "right" ? "translateX(-100%) scale(0.95)" : "scale(0.95)"}; }
              to { opacity: 1; transform: translateY(0) ${align === "right" ? "translateX(-100%) scale(1)" : "scale(1)"}; }
            }
          `}</style>
          {isMounted && createPortal(menuContent, document.body)}
        </>
      )}
    </div>
  );
}

