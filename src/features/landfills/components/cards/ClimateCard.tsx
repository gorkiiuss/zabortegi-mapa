// src/features/landfills/components/cards/ClimateCard.tsx

import { useLanguageStore } from "@shared/state/languageStore";
import { CardShell } from "@shared/components/CardShell";
import type { NumberRange } from "@features/landfills/domain/valueObjects/NumberRange";
import { formatNumberRange } from "../details/fullDetails/parseDisplay";

interface ClimateCardProps {
  annualPrecipitation: NumberRange | null;
  effectiveRainfall: NumberRange | null;
}

export function ClimateCard(
  { 
    annualPrecipitation, 
    effectiveRainfall 
  }: ClimateCardProps) {
  const { t } = useLanguageStore();

  if (!annualPrecipitation && !effectiveRainfall) return null;

  const rowLabelClasses = "text-[12px] text-slate-600";
  const rowValueClasses = "text-right font-medium text-[12px] text-slate-800";

  return (
    <CardShell title={t("details.cards.climate.title")}>
      <div className="space-y-1.5">
        {annualPrecipitation && (
          <div className="flex justify-between items-center">
            <span className={rowLabelClasses}>
              {t("domain.vos.hydrology.annual_precipitation")}
            </span>
            <span className={rowValueClasses}>{formatNumberRange(annualPrecipitation)} mm</span>
          </div>
        )}
        {effectiveRainfall && (
          <div className="flex justify-between items-center">
            <span className={rowLabelClasses}>
              {t("domain.vos.hydrology.effective_rainfall")}
            </span>
            <span className={rowValueClasses}>{formatNumberRange(effectiveRainfall)} mm</span>
          </div>
        )}
      </div>
    </CardShell>
  );
}