// src/features/landfills/components/details/DetailsRelatedDocumentationModal.tsx

import { useEffect } from "react";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useUiStore } from "@features/map/state/uiStore";
import { useLandfills } from "@features/landfills/hooks/useLandfills";
import type { RawProperties } from "@features/landfills/domain/rawTypes";
import { buildLandfillMediaUrl } from "@shared/utils/media";
import { useLanguageStore } from "@shared/state/languageStore";
import { ExternalLink, FileDown, X } from "@shared/components/Icons";

export function DetailsRelatedDocumentationModal() {
  const { handleMouseEnter, handleMouseLeave, modalRef } =
    useMapModalInteractions();
  const { t } = useLanguageStore();

  const selectedLandfillId = useUiStore((s) => s.selectedLandfillId);
  const { closeModal } = useUiStore();

  const { landfills } = useLandfills();
  const currentLandfill = landfills.find(
    (l) => l.parcelId === selectedLandfillId,
  );

  const rawProps = currentLandfill?.rawProperties as unknown as
    | RawProperties
    | undefined;

  const docs = rawProps?.documentation || [];
  const idParcela = rawProps?.IdParcela;

  const handleClose = () => closeModal();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div
      ref={modalRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`pointer-events-auto flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">
            {t("selection.related_docs_modal.title")}
          </h2>
          {currentLandfill && (
            <p className="max-w-[200px] truncate text-[11px] text-slate-500">
              {currentLandfill.name}
            </p>
          )}
        </div>
        <button
          onClick={handleClose}
          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
          aria-label={t("selection.close")}
        >
          <X size={18}/>
        </button>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto overscroll-contain bg-slate-50/30 p-4">
        {docs.length > 0 ? (
          <div className="space-y-2">
            {docs.map((doc, idx) => {
              const fullUrl = buildLandfillMediaUrl(idParcela, doc.path);

              if (!fullUrl) return null;

              return (
                <a
                  key={`${doc.label}-${idx}`}
                  href={fullUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-all duration-200 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-100/50`}
                >
                  <div className="shrink-0 rounded-lg bg-red-50 p-2 text-red-500 transition-colors group-hover:bg-red-100">
                    <FileDown size={20} />
                  </div>

                  <div className="min-w-0 flex-1 pt-0.5">
                    <h3 className="line-clamp-2 text-sm font-medium text-slate-700 transition-colors group-hover:text-emerald-800">
                      {doc.label || t("selection.related_docs_modal.untitled")}
                    </h3>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
                      PDF
                      <span className="h-0.5 w-0.5 rounded-full bg-slate-300" />
                      <span>
                        {t("selection.related_docs_modal.open_new_tab")}
                      </span>
                    </p>
                  </div>

                  <div className="shrink-0 pt-1 text-slate-300 transition-colors group-hover:text-emerald-500">
                    <ExternalLink size={16} />
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center text-slate-400">
            <p className="text-sm font-medium text-slate-600">
              {t("selection.related_docs_modal.no_docs")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
