import type { ClpSymbol } from "../../../domain/types";
import { getClpIconPath } from "../../../domain/symbology";
import { useLanguageStore } from "@shared/state/languageStore";

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

// 0% amarillo -> 100% rojo
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

  const clpSet: ClpSymbol[] = [];
  if (mainClpSymbol) clpSet.push(mainClpSymbol);
  for (const s of clpSymbols) {
    if (!clpSet.includes(s)) clpSet.push(s);
  }
  const clpToShow = clpSet.slice(0, 3);

  const headerClasses =
    "mb-1.5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-slate-500";
  const cardPadding = "p-3";
  const globalLabelClasses = "text-[12px] text-slate-600";
  const globalValueClasses = "text-[14px] font-semibold text-slate-800";
  const sectionLabelClasses = "w-32 truncate text-[12px] text-slate-500";
  const sectionValueClasses = "w-10 text-right text-[11px] text-slate-500";

  return (
    <section>
      <div className={headerClasses}>
        <span>{t("selection.cards.risk.title")}</span>

        {clpToShow.length > 0 && (
          <div className="flex items-center gap-1.5">
            {clpToShow.map((symbol) => {
              const src = getClpIconPath(symbol);
              if (!src) return null;
              return (
                <img
                  key={symbol}
                  src={src}
                  alt=""
                  className={"h-4 w-4"}
                  draggable={false}
                />
              );
            })}
          </div>
        )}
      </div>

      <div
        className={`rounded-xl border border-slate-100 bg-slate-50/90 ${cardPadding} `}
      >
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

        {riskGlobalPercent != null && (
          <div className="mb-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full"
              style={{
                width: `${riskGlobalPercent}%`,
                backgroundColor: riskColor(riskGlobalPercent),
              }}
            />
          </div>
        )}

        {hasDetailedRisk ? (
          <div className="space-y-1.5">
            {sections.map(({ id, label, percent }) => (
              <div key={id} className="flex items-center gap-2">
                {/* CAMBIO: Usamos t(label) para traducir la clave que viene del SelectionPanelData */}
                <span className={sectionLabelClasses}>{t(label)}</span>
                {percent != null ? (
                  <>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full"
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
                  <span className="text-[11px] text-slate-400">
                    {t("selection.cards.risk.no_data")}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-[11px] text-slate-500">
            {t("selection.cards.risk.insufficient")}
          </div>
        )}
      </div>
    </section>
  );
}
