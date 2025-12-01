import { RiskCard } from "../cards/SelectionRiskCard";
import { DimensionsCard } from "../cards/SelectionDimensionsCard";
import { LegalCard } from "../cards/SelectionLegalCard";
import { ClimateCard } from "../cards/SelectionClimateCard";
import { MeasuresCard } from "../cards/SelectionMeasuresCard";
import { MoreInfoAccordion } from "../cards/SelectionMoreInfoAccordion";
import type { buildSelectionPanelData } from "../SelectionPanelData";
import { useUiStore } from "@features/map/state/uiStore";
import { useLanguageStore } from "@shared/state/languageStore";

interface SelectionBodyProps {
  data: ReturnType<typeof buildSelectionPanelData>;
  landfill: any;
  isDownloading: boolean;
  onDownload: () => void;
}

export function SelectionBody({
  data,
  landfill,
  isDownloading,
  onDownload,
}: SelectionBodyProps) {
  const toggleActiveModal = useUiStore((s) => s.toggleActiveModal);
  const { t } = useLanguageStore();

  const buttonBaseClasses = `
    w-full flex items-center justify-center gap-2
    px-4 py-2.5 rounded-lg border border-slate-200
    bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm
    shadow-sm transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1
    hover:border-slate-300
  `;

  return (
    <div className="flex-1 space-y-3.5 pr-1.5 pb-1 text-slate-700 md:space-y-4">
      {/* BOTÓN 1: Descargar Informe */}
      <button
        onClick={onDownload}
        disabled={isDownloading}
        className={` ${buttonBaseClasses} ${isDownloading ? "cursor-wait opacity-70" : ""} `}
      >
        {isDownloading ? (
          <svg
            className="h-4 w-4 animate-spin text-slate-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-500"
          >
            <path d="M6 9V2h12v7" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <path d="M6 14h12v8H6z" />
          </svg>
        )}
        <span>
          {isDownloading
            ? t("selection.generating_report")
            : t("selection.download_report")}
        </span>
      </button>

      {/* BOTÓN 2: Documentos Relacionados */}
      <button
        className={buttonBaseClasses}
        onClick={() => toggleActiveModal("related_documentation", true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-500"
        >
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
        </svg>
        <span>{t("selection.related_docs")}</span>
      </button>

      <button
        className={` ${buttonBaseClasses} border-dashed border-emerald-300 bg-emerald-50/50 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50`}
        onClick={() => toggleActiveModal("future_feature" as any, true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-emerald-400"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
        <span>{t("selection.add_suggestion")}</span>
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
