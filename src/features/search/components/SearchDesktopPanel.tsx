import { useState, useEffect } from "react";
import { useSearchLogic } from "../hooks/useSearchLogic";
import { SearchBody } from "./SearchBody";
import { useMapPanelInteractions } from "@shared/hooks/useMapPanelInteractions";
import { useLanguageStore } from "@shared/state/languageStore";
import { X } from "@shared/components/Icons";

interface SearchDesktopPanelProps {
  onOpenIndex?: (initialQuery: string) => void;
}

export function SearchDesktopPanel({ onOpenIndex }: SearchDesktopPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLanguageStore();

  const { ref, handleMouseEnter, handleMouseLeave, unlockMap } =
    useMapPanelInteractions();

  const close = () => {
    setIsExpanded(false);
    unlockMap();
  };

  const logic = useSearchLogic(onOpenIndex, close);

  const handleClickOpen = () => {
    if (!isExpanded) setIsExpanded(true);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const containerClasses = isExpanded
    ? "w-[450px] shadow-2xl ring-1 ring-slate-900/5"
    : "w-72 shadow-lg hover:shadow-xl hover:border-emerald-300/50 cursor-pointer";

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClickOpen}
      className={` ${containerClasses} flex origin-top-left flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]`}
    >
      {/* ─── CABECERA ─── */}
      <div
        className={`flex items-center justify-between overflow-hidden border-b border-slate-200 bg-slate-50/50 transition-all duration-300 ${isExpanded ? "h-12 px-4 opacity-100" : "h-0 border-none px-0 opacity-0"} `}
      >
        <span className="text-sm font-semibold text-slate-800">
          {t("search.title")}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            close();
          }}
          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
          aria-label={t("search.aria_close")}
        >
          <X size={16} />
        </button>
      </div>

      {/* ─── CUERPO ─── */}
      <div
        className={`transition-all duration-300 ${isExpanded ? "bg-slate-50/30 p-4" : "p-0"} `}
      >
        <SearchBody
          {...logic}
          onSelect={logic.handleSelectLandfill}
          onOpenIndex={logic.handleOpenIndex}
          onSubmit={logic.handleSubmit}
          onKeyDown={logic.handleKeyDown}
          showInput={isExpanded}
          placeholderText={t("search.placeholder_default")}
        />
      </div>

      {/* Footer con HTML inyectado (para la tecla ESC) */}
      {isExpanded && (
        <div
          className="rounded-b-2xl bg-slate-50/30 px-4 pt-0 pb-3 text-center text-[10px] text-slate-400"
          dangerouslySetInnerHTML={{ __html: t("search.footer_esc") }}
        />
      )}
    </div>
  );
}
