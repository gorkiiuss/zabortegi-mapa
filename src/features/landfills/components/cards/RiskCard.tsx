// src/features/landfills/components/cards/RiskCard.tsx

import type { ClpSymbol } from "../../domain/types";
import { getClpIconPath } from "../../domain/symbology";
import { useLanguageStore } from "@shared/state/languageStore";
import { CardShell } from "@shared/components/CardShell"; // Ajusta el import según tu estructura

export interface RiskSectionInfo {
  id: string;
  label: string;
  percent: number | null;
}

interface RiskCardProps {
  hasRealRisk: boolean;
  riskGlobalPercent: number | null;
  hasDetailedRisk: boolean;
  sections: RiskSectionInfo[];
  mainClpSymbol: ClpSymbol | null;
  clpSymbols: ClpSymbol[];
}

// Helper de color (Lógica de vista pura)
function riskColor(percent: number): string {
  if (percent >= 70) return "#b91c1c"; // rojo
  if (percent >= 40) return "#f97316"; // naranja
  return "#eab308"; // amarillo
}

export function RiskCard({
  hasRealRisk,
  riskGlobalPercent,
  hasDetailedRisk,
  sections,
  mainClpSymbol,
  clpSymbols,
}: RiskCardProps) {
  const { t } = useLanguageStore();

  // 1. Lógica de Símbolos CLP
  const clpSet: ClpSymbol[] = [];
  if (mainClpSymbol) clpSet.push(mainClpSymbol);
  for (const s of clpSymbols) {
    if (!clpSet.includes(s)) clpSet.push(s);
  }
  const clpToShow = clpSet.slice(0, 3);

  // 2. Preparamos el elemento de Iconos para el CardShell
  const iconsElement = clpToShow.length > 0 ? (
    <div className="flex items-center gap-1">
      {clpToShow.map((symbol) => {
        const src = getClpIconPath(symbol);
        if (!src) return null;
        return (
          <img
            key={symbol}
            src={src}
            alt="Hazard symbol"
            className="h-4 w-4"
            draggable={false}
          />
        );
      })}
    </div>
  ) : undefined;

  // 3. Clases "Atómicas" para el contenido interno
  const globalLabelClasses = "text-[12px] text-slate-600";
  const globalValueClasses = "text-[14px] font-semibold text-slate-800";
  const sectionLabelClasses = "w-32 truncate text-[12px] text-slate-500";
  const sectionValueClasses = "w-10 text-right text-[11px] text-slate-500";

  return (
    <CardShell
      title={t("selection.cards.risk.title")}
      icon={iconsElement} // Inyectamos los iconos en el slot estándar
      className="bg-slate-50/90" // Sobrescribimos el fondo blanco por defecto
    >
      {/* Contenido del Body */}
      <div>
        {/* Global Risk Header */}
        <div className="mb-2 flex items-center justify-between">
          <span className={globalLabelClasses}>
            {t("selection.cards.risk.global")}
            {hasRealRisk ? "" : ` ${t("selection.cards.risk.incomplete")}`}
          </span>
          {riskGlobalPercent != null && (
            <span className={globalValueClasses}>
              {riskGlobalPercent.toFixed(0)}%
            </span>
          )}
        </div>

        {/* Global Risk Bar */}
        {riskGlobalPercent != null && (
          <div className="mb-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-200 shadow-inner">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${riskGlobalPercent}%`,
                backgroundColor: riskColor(riskGlobalPercent),
              }}
            />
          </div>
        )}

        {/* Detailed Sections */}
        {hasDetailedRisk ? (
          <div className="space-y-2 border-t border-slate-200/50 pt-2">
            {sections.map(({ id, label, percent }) => (
              <div key={id} className="flex items-center gap-2">
                <span className={sectionLabelClasses}>{t(label)}</span>
                {percent != null ? (
                  <>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percent}%`,
                          backgroundColor: riskColor(percent),
                        }}
                      />
                    </div>
                    <span className={sectionValueClasses}>
                      {percent.toFixed(0)}%
                    </span>
                  </>
                ) : (
                  <span className="text-[11px] text-slate-400 italic">
                    {t("selection.cards.risk.no_data")}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-[11px] text-slate-500 italic mt-2">
            {t("selection.cards.risk.insufficient")}
          </div>
        )}
      </div>
    </CardShell>
  );
}