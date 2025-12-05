import React, { useEffect } from "react";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useLanguageStore } from "@shared/state/languageStore";
import { X } from "@shared/components/Icons";

interface LandfillModalLayoutProps {
  title: string;
  subtitle?: string;
  handleClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode; // Slot opcional para botones de acción
}

export const LandfillModalLayout = ({
  title,
  subtitle,
  handleClose,
  children,
  footer,
}: LandfillModalLayoutProps) => {
  const { handleMouseEnter, handleMouseLeave, modalRef } = useMapModalInteractions();
  const { t } = useLanguageStore();

  // Manejo de tecla Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose]);

  return (
    <div
      ref={modalRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="pointer-events-auto flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 ease-in-out"
    >
      {/* ─── HEADER UNIFICADO ─── */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50/50 px-4 py-3">
        <div className="min-w-0 pr-2">
          <h2 className="truncate text-sm font-semibold text-slate-800">
            {title}
          </h2>
          {subtitle && (
            <p className="truncate text-[11px] text-slate-500">{subtitle}</p>
          )}
        </div>

        <button
          onClick={handleClose}
          className="shrink-0 rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
          aria-label={t("selection.close")}
        >
          <X size={16} />
        </button>
      </div>

      {/* ─── BODY (Scrollable) ─── */}
      <div className="flex-1 overflow-y-auto overscroll-contain bg-slate-50/30">
        <div className="flex flex-col gap-4 p-4">
          {children}
        </div>
      </div>

      {/* ─── FOOTER (Opcional, Sticky bottom) ─── */}
      {footer && (
        <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-3 flex justify-end gap-3">
          {footer}
        </div>
      )}
    </div>
  );
};