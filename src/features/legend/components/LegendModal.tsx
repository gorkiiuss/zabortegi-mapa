import { useLegendLogic } from "../hooks/useLegendLogic";
import { LegendBody } from "./LegendBody";
import type { LegendItem } from "../domain/types";

import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useUiStore } from "@features/map/state/uiStore";
import { useLanguageStore } from "@shared/state/languageStore";
import { X } from "@shared/components/Icons";

interface LegendModalProps {
  items: LegendItem[];
}

export function LegendModal({ items }: LegendModalProps) {
  const logic = useLegendLogic();
  const { closeModal } = useUiStore();
  const { modalRef, handleMouseEnter, handleMouseLeave } =
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
            {t("legend.title")}
          </h2>
          <p className="text-[11px] text-slate-500">{t("legend.subtitle")}</p>
        </div>
        <button
          onClick={() => closeModal()}
          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
          aria-label={t("search.aria_close")}
        >
          <X size={16} />
        </button>
      </div>

      {/* ─── BODY ─── */}
      <div className="flex-1 overflow-y-auto overscroll-contain bg-slate-50/30 p-4">
        <LegendBody
          items={items}
          riskPercent={logic.riskPercent}
          barRef={logic.barRef}
          onPointerDown={logic.handlePointerDown}
          title={null}
        />
      </div>
    </div>
  );
}
