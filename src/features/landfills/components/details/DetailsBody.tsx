// src/features/landfills/components/details/DetailsBody.tsx

import { RiskCard } from "../cards/RiskCard";
import { DimensionsCard } from "../cards/DimensionsCard";
import { LegalCard } from "../cards/LegalCard";
import { ClimateCard } from "../cards/ClimateCard";
import { MeasuresCard } from "../cards/MeasuresCard";
import { MoreInfoAccordion } from "../cards/MoreInfoAccordion";
import type { buildSelectionPanelData } from "../../domain/mappers/landfillDetailsMapper";
import { useUiStore } from "@features/map/state/uiStore";
import { useLanguageStore } from "@shared/state/languageStore";
import { Download, Folder, Pen, Spinner } from "@shared/components/Icons";

interface DetailsBodyProps {
  data: ReturnType<typeof buildSelectionPanelData>;
  landfill: any;
  isDownloading: boolean;
  onDownload: () => void;
}

export function DetailsBody({
  data,
  landfill,
  isDownloading,
  onDownload,
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

  const unimplementedVariant = `
    border-dashed border-emerald-300 bg-emerald-50/50 text-emerald-700
    hover:border-emerald-400 hover:bg-emerald-50
  `;

  return (
    <div className="flex-1 space-y-3.5 pr-1.5 pb-1 text-slate-700 md:space-y-4">
      {/* BOTÓN 1: Descargar Informe */}
      <button
        onClick={onDownload}
        disabled={isDownloading}
        className={`${baseLayoutClasses} ${standardVariant} ${
          isDownloading ? "cursor-wait opacity-70" : ""
        }`}
      >
        {isDownloading ? (
          <Spinner className="h-4 w-4 animate-spin text-slate-600" />
        ) : (
          <Download size={18} className="text-slate-500" />
        )}
        <span>
          {isDownloading
            ? t("selection.generating_report")
            : t("selection.download_report")}
        </span>
      </button>

      {/* BOTÓN 2: Documentos Relacionados */}
      <button
        className={`${baseLayoutClasses} ${standardVariant}`}
        onClick={() => toggleActiveModal("related_documentation", true)}
      >
        <Folder size={18} className="text-slate-500"/>
        <span>{t("selection.related_docs")}</span>
      </button>

      <button
        className={`${baseLayoutClasses} ${unimplementedVariant}`}
        onClick={() => toggleActiveModal("future_feature" as any, true)}
      >
        <Pen size={18} className="text-emerald-400" />
        <span>{t("selection.add_correction")}</span>
      </button>

      <RiskCard
        hasRealRisk={data.hasRealRisk}
        riskGlobalPercent={data.riskGlobalPercent}
        hasDetailedRisk={data.hasDetailedRisk}
        sections={data.riskSectionsInfo}
        mainClpSymbol={landfill.mainClpSymbol}
        clpSymbols={landfill.clpSymbols}
      />

      {data.showDimensions && (
        <DimensionsCard
          superficieDisplay={data.superficieDisplay}
          volumenDisplay={data.volumenDisplay}
          capacidadDisplay={data.capacidadDisplay}
          fillPercent={data.fillPercent}
        />
      )}

      {data.showLegal && (
        <LegalCard
          situacionLegal={data.situacionLegal}
          tipoVertedero={data.tipoVertedero}
          tiposResiduos={data.tiposResiduos}
          descripcionResiduos={data.descripcionResiduos}
        />
      )}

      {data.showClimate && (
        <ClimateCard
          precipitacion={data.precipitacion}
          lluviaUtil={data.lluviaUtil}
        />
      )}

      {data.showMeasures && (
        <MeasuresCard
          titulo={data.medidasTitulo}
          descripcion={data.medidasDescripcion}
          otros={data.medidasOtros}
        />
      )}

      <MoreInfoAccordion sections={data.moreInfoSections} />
    </div>
  );
}
