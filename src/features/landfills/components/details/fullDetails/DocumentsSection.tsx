// src/features/landfills/components/details/fullDetails/DocumentsSection.tsx

import React from "react";
import { FileDown, ExternalLink } from "@shared/components/Icons";
import { useLanguageStore } from "@shared/state/languageStore";
import type { MultimediaEntity } from "@features/landfills/domain/entities/Multimedia";

interface DocumentsSectionProps {
  docs: MultimediaEntity[];
}

export const DocumentsSection: React.FC<DocumentsSectionProps> = ({ docs }) => {
  const { t } = useLanguageStore();

  return (
    <section id="full-details-section-docs" className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-3">
        <h3 className="text-sm font-semibold text-slate-700">
          {t("domain.vos.multimedia.doc.title")}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
        {docs.map((doc) => {
          return (
            <a
              key={doc.filePath + doc.description}
              href={doc.filePath}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/30 p-3.5 transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md hover:shadow-emerald-100/50"
            >
              <div className="shrink-0 rounded-lg bg-red-50 p-2 text-red-500 transition-colors group-hover:bg-red-100">
                <FileDown size={20} />
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <h4 className="line-clamp-2 text-xs font-semibold text-slate-700 transition-colors group-hover:text-emerald-800">
                  {doc.description || t("domain.vos.multimedia.doc.description_placeholder")}
                </h4>
                <p className="mt-1 flex items-center gap-1 text-[10px] font-medium text-slate-400">
                  <span>PDF</span>
                  <span className="h-0.5 w-0.5 rounded-full bg-slate-300" />
                  <span>
                    {t("domain.vos.multimedia.doc.open")}
                  </span>
                </p>
              </div>

              <div className="shrink-0 pt-1 text-slate-300 transition-colors group-hover:text-emerald-500">
                <ExternalLink size={14} />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};
