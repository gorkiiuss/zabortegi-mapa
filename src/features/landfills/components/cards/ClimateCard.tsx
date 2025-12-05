// src/features/landfills/components/cards/ClimateCard.tsx

import { useLanguageStore } from "@shared/state/languageStore";
import { CardShell } from "@shared/components/CardShell";

interface ClimateCardProps {
  precipitacion: string | null;
  lluviaUtil: string | null;
}

export function ClimateCard({ precipitacion, lluviaUtil }: ClimateCardProps) {
  const { t } = useLanguageStore();

  if (!precipitacion && !lluviaUtil) return null;

  const rowLabelClasses = "text-[12px] text-slate-600";
  const rowValueClasses = "text-right font-medium text-[12px] text-slate-800";

  return (
    <CardShell title={t("selection.cards.climate.title")}>
      <div className="space-y-1.5">
        {precipitacion && (
          <div className="flex justify-between items-center">
            <span className={rowLabelClasses}>
              {t("selection.cards.climate.precip")}
            </span>
            <span className={rowValueClasses}>{precipitacion}</span>
          </div>
        )}
        {lluviaUtil && (
          <div className="flex justify-between items-center">
            <span className={rowLabelClasses}>
              {t("selection.cards.climate.rain")}
            </span>
            <span className={rowValueClasses}>{lluviaUtil}</span>
          </div>
        )}
      </div>
    </CardShell>
  );
}