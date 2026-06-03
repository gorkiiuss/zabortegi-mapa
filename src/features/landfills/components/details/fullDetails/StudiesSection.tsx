// src/features/landfills/components/details/fullDetails/StudiesSection.tsx

import React from "react";
import { useLanguageStore } from "@shared/state/languageStore";
import type { Study } from "@features/landfills/domain/valueObjects/Study";

interface StudiesSectionProps {
  studies: Study[];
}

export const StudiesSection: React.FC<StudiesSectionProps> = ({ studies }) => {
  const { t } = useLanguageStore();

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-3">
        <h3 className="text-sm font-semibold text-slate-700">
          {t("domain.vos.studies")}
        </h3>
      </div>

      <div className="divide-y divide-slate-100">
        {studies.map((studyItem, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 px-5 py-3.5 transition-colors hover:bg-slate-50/40"
          >
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[10px] font-bold text-slate-500">
              {String(idx + 1).padStart(2, "0")}
            </span>

            <div className="min-w-0 flex-1">
              <p className="whitespace-normal wrap-break-word text-xs leading-relaxed text-slate-600">
                {studyItem.study}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
