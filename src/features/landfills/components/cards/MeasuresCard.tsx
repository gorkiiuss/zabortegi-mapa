// src/features/landfills/components/cards/MeasuresCard.tsx

import { useState } from "react";
import { useLanguageStore } from "@shared/state/languageStore";
import { CardShell } from "@shared/components/CardShell";
import { CorrectingMeasuresVO, type CorrectingMeasures } from "@features/landfills/domain/valueObjects/correctingMeasures/CorrectingMeasures";
import type { TxKeyPath } from "i18n/config";

interface MeasuresCardProps {
  measures: CorrectingMeasures | null;
  description: string | null;
  other: string | null;
}

export function MeasuresCard({
  measures,
  description,
  other,
}: MeasuresCardProps) {
  const { t } = useLanguageStore();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!measures && !description && !other) return null;

  const mainTitleClasses = "text-[12px] font-semibold text-amber-900";
  const bodyClasses = "text-[12px] leading-snug text-slate-900";
  const smallBodyClasses = "text-[11px] leading-snug text-slate-700 italic";

  const otherThreshold = 180;
  const isOtherLong = other && other.length > otherThreshold;
  const otherText = isOtherLong && !isExpanded
    ? `${other.slice(0, otherThreshold)}...`
    : other;

  return (
    <CardShell 
      title={t("details.cards.measures.title")}
      className="border-emerald-200 bg-emerald-50"
    >
      <div className="space-y-2">
        {measures && <div className={mainTitleClasses}>{t(CorrectingMeasuresVO.getTxKey(measures) as TxKeyPath)}</div>}
        {description && <p className={bodyClasses}>{description}</p>}
        {other && (
          <div className="mt-1 pt-1.5 border-t border-emerald-150/40">
            <span className="text-[9px] font-bold text-emerald-800/60 uppercase tracking-wider block mb-0.5">
              {t("domain.vos.correcting_measures.other")}
            </span>
            <p className={smallBodyClasses}>{otherText}</p>
            {isOtherLong && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-1 text-[10px] font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer focus:outline-hidden"
              >
                {isExpanded ? t("details.see_less") : t("details.see_more")}
              </button>
            )}
          </div>
        )}
      </div>
    </CardShell>
  );
}