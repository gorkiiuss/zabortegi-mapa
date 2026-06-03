// src/features/landfills/components/details/DetailsBody.tsx

import { RiskCard } from "../cards/RiskCard";
import { DimensionsCard } from "../cards/DimensionsCard";
import { LegalCard } from "../cards/LegalCard";
import { ClimateCard } from "../cards/ClimateCard";
import { MeasuresCard } from "../cards/MeasuresCard";
import { useUiStore } from "@features/map/state/uiStore";
import { useLanguageStore } from "@shared/state/languageStore";
import { Plus } from "@shared/components/Icons";
import type { LandfillDetailsEntity } from "@features/landfills/domain/entities/LandfillDetails";

interface DetailsBodyProps {
  details: LandfillDetailsEntity;
  idPrefix?: string;
}

function showCard(values: (any | null)[]) {
  return values.every((value) => value != null)
}

export function DetailsBody({
  details,
  idPrefix = "",
}: DetailsBodyProps) {
  const toggleActiveModal = useUiStore((s) => s.toggleActiveModal);
  const { t } = useLanguageStore();

  const baseLayoutClasses = `
    w-full flex items-center justify-center gap-2
    px-4 py-2.5 rounded-lg border
    font-medium text-sm
    shadow-sm transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1
  `;

  const standardVariant = `
    border-slate-200 bg-white text-slate-700
    hover:bg-slate-50 hover:border-slate-300
  `;

  return (
    <div className="flex-1 space-y-3.5 pr-1.5 pb-1 text-slate-700 md:space-y-4">
      <button 
        id={idPrefix ? `${idPrefix}-tutorial-btn-more-info` : undefined}
        className={`${baseLayoutClasses} ${standardVariant}`}
        onClick={() => toggleActiveModal("full-details", true)}
      >
        <Plus size={18} className="text-slate-500"/>
        <span>{t("details.cards.more_info.button")}</span>
      </button>

      <RiskCard
        risks={details.risks}
        wasteLegalCategory={details.operation.wasteLegalCategory}
        landfillType={details.operation.landfillType}
        wasteComponents={details.operation.wasteComponents}
      />

      {showCard([
        details.location.dimensions.surfaceHa, 
        details.location.dimensions.volumeM3, 
        details.location.dimensions.expectedTotalCapacityM3
      ]) && (
        <DimensionsCard dimensions={details.location.dimensions}/>
      )}

      <LegalCard
        legalStatus={details.operation.legalStatus}
        landfillType={details.operation.landfillType}
        wasteLegalCategory={details.operation.wasteLegalCategory}
        wasteType={details.operation.wasteType}
        wasteDescription={details.operation.wasteDescription}
        ownership={details.operation.ownership}
      />

      {showCard([details.hydrology.annualPrecipitation, details.hydrology.effectiveRainfall]) && (
        <ClimateCard
          annualPrecipitation={details.hydrology.annualPrecipitation}
          effectiveRainfall={details.hydrology.effectiveRainfall}
        />
      )}

      {showCard([details.correctingMeasures.measures, details.correctingMeasures.description, details.correctingMeasures.other]) && (
        <MeasuresCard
          measures={details.correctingMeasures.measures}
          description={details.correctingMeasures.description}
          other={details.correctingMeasures.other}
        />
      )}
    </div>
  );
}
