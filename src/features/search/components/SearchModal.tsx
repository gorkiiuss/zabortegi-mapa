import { useUiStore } from "@features/map/state/uiStore";
import { useSearchLogic } from "../hooks/useSearchLogic";
import { SearchBody } from "./SearchBody";
import { useLanguageStore } from "@shared/state/languageStore";

import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { X } from "@shared/components/Icons";

interface SearchModalProps {
  onOpenIndex?: (initialQuery: string) => void;
}

export function SearchModal({ onOpenIndex }: SearchModalProps) {
  const toggleModal = useUiStore((s) => s.toggleActiveModal);
  const handleClose = () => toggleModal("none");
  const logic = useSearchLogic(onOpenIndex, handleClose);
  const { handleMouseEnter, handleMouseLeave, modalRef } =
    useMapModalInteractions();

  const { t } = useLanguageStore();

  return (
    <div
      ref={modalRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`pointer-events-auto flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl`}
    >
      {/* ─── HEADER UNIFICADO ─── */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50/50 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">
            {t("search.title")}
          </h2>
          <p className="text-[11px] text-slate-500">{t("search.subtitle")}</p>
        </div>
        <button
          onClick={handleClose}
          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
          aria-label={t("search.aria_close")}
        >
          <X size={16} />
        </button>
      </div>

      {/* ─── BODY ─── */}
      <div className="flex-1 overflow-y-auto overscroll-contain bg-slate-50/30 p-4">
        <SearchBody
          {...logic}
          onSelect={logic.handleSelectLandfill}
          onOpenIndex={logic.handleOpenIndex}
          onSubmit={logic.handleSubmit}
          onKeyDown={logic.handleKeyDown}
          showInput={true}
          placeholderText={t("search.placeholder_default")}
        />
      </div>
    </div>
  );
}
