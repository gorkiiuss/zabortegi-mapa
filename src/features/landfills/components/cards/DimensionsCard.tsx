// src/features/landfills/components/cards/DimensionsCard.tsx

import { useLanguageStore } from "@shared/state/languageStore";
import { CardShell } from "@shared/components/CardShell";
import type { Dimensions } from "@features/landfills/domain/valueObjects/location/Dimensions";
import { getContinuousColor } from "../../config/styling";

interface DimensionsCardProps {
  dimensions: Dimensions
}

export function DimensionsCard({
  dimensions
}: DimensionsCardProps) {
  const { t } = useLanguageStore();

  const rowLabelClasses = "text-[12px] text-slate-600";
  const rowValueClasses = "font-medium text-[12px] text-slate-800";

  const surfaceHaDisplay = dimensions.surfaceHa ? `${dimensions.surfaceHa} Ha`
    : t("details.cards.no_data")
  const volumeM3Display = dimensions.volumeM3 ? `${dimensions.volumeM3} m3`
    : t("details.cards.no_data")
  const expectedTotalCapacityM3Display = dimensions.expectedTotalCapacityM3 ? `${dimensions.expectedTotalCapacityM3} m3`
    : t("details.cards.no_data")


  return (
    <CardShell title={t("domain.vos.location.dimensions.title")}>
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <span className={rowLabelClasses}>
            {t("domain.vos.location.dimensions.surface_ha")}
          </span>
          <span className={rowValueClasses}>
            {surfaceHaDisplay}
          </span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className={rowLabelClasses}>
            {t("domain.vos.location.dimensions.volume_m3")}
          </span>
          <span className={rowValueClasses}>
            {volumeM3Display}
          </span>
        </div>
        {dimensions.expectedTotalCapacityM3 != null && (
          <div className="flex justify-between items-baseline">
            <span className={rowLabelClasses}>
              {t("domain.vos.location.dimensions.expected_total_capacity_m3")}
            </span>
            <span className={rowValueClasses}>
              {expectedTotalCapacityM3Display}
            </span>
          </div>
        )}
        {dimensions.fillPercent() != null && dimensions.expectedTotalCapacityM3 != null && (
          <div className="mt-2 pt-2 border-t border-slate-50 space-y-1">
            <div className="flex items-center justify-between">
              <span className={rowLabelClasses}>
                {t("domain.vos.location.dimensions.fill_percent")}
              </span>
              <span className={rowValueClasses}>{dimensions.fillPercent()?.toFixed(2)}%</span>
            </div>
            <FillBar percent={dimensions.fillPercent()!} />
          </div>
        )}
      </div>
    </CardShell>
  );
}

interface FillBarProps {
  percent: number;
}



function FillBar({ percent }: FillBarProps) {
  const safe = Math.max(0, percent);

  let fillWidth: number;
  let capacityWidth: number;

  if (safe <= 100) {
    fillWidth = safe;
    capacityWidth = 100;
  } else {
    fillWidth = 100;
    capacityWidth = 10000 / safe;
  }

  const color = getContinuousColor(safe);

  return (
    <div className="relative mt-1 h-3.5 w-full overflow-visible rounded-full bg-slate-100">
      <div
        className="absolute inset-y-0 left-0 h-full rounded-full bg-slate-300/50"
        style={{ width: `${capacityWidth.toFixed(2)}%` }}
      />
      <div
        className="absolute top-1/2 left-0 h-2.5 -translate-y-1/2 rounded-full shadow-sm transition-all duration-500 ease-out"
        style={{
          width: `${fillWidth}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}