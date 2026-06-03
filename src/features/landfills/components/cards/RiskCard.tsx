// src/features/landfills/components/cards/RiskCard.tsx

import { useLanguageStore } from "@shared/state/languageStore";
import { CardShell } from "@shared/components/CardShell";
import type { Risks } from "@features/landfills/domain/valueObjects/Risks";
import { CLPSymbolVO } from "@features/landfills/domain/valueObjects/CLPSymbol";
import { getContinuousColor, getClpIconPath } from "../../config/styling";
import type { WasteLegalCategory } from "@features/landfills/domain/valueObjects/operation/WasteLegalCategory";
import type { LandfillType } from "@features/landfills/domain/valueObjects/operation/LandfillType";
import type { WasteComponent } from "@features/landfills/domain/valueObjects/operation/WasteComponent";
import type { TxKeyPath } from "i18n/config";

export interface RiskSectionInfo {
  id: string;
  label: string;
  percent: number | null;
}

interface CardInfo {
  id: string;
  label: TxKeyPath;
  risk: number | null;
}

interface RiskCardProps {
  risks: Risks;
  wasteLegalCategory: WasteLegalCategory | null,
  landfillType: LandfillType,
  wasteComponents: WasteComponent[] | null
}



export function RiskCard({
  risks,
  wasteLegalCategory,
  landfillType,
  wasteComponents
}: RiskCardProps) {
  const { t } = useLanguageStore();

  const clps = CLPSymbolVO.derive(wasteLegalCategory, landfillType, wasteComponents)

  const clpElements = clps.length > 0 ? (
    <div className="flex items-center gap-1">
      {clps.map((clp) => {
        const src = getClpIconPath(clp);
        if (!src) return null;
        return (
          <img
            key={clp}
            src={src}
            alt={t("details.cards.risk.clp_alt")}
            className="h-4 w-4"
            draggable={false}
          />
        );
      })}
    </div>
  ) : undefined;

  const globalLabelClasses = "text-[12px] text-slate-600";
  const globalValueClasses = "text-[14px] font-semibold text-slate-800";
  const sectionLabelClasses = "w-32 truncate text-[12px] text-slate-500";
  const sectionValueClasses = "w-10 text-right text-[11px] text-slate-500";

  const hasEnoughData = risks.hasEnoughData()

  function mapToCardInfo(risks: Risks): CardInfo[] {
    return [
      {
        id: 'infra',
        label: 'domain.vos.risks.infra',
        risk: risks.infra
      },
      {
        id: 'hydro',
        label: 'domain.vos.risks.hydro',
        risk: risks.hydro
      },
      {
        id: 'geology',
        label: 'domain.vos.risks.geo',
        risk: risks.geo
      },
      {
        id: 'human',
        label: 'domain.vos.risks.social',
        risk: risks.social
      },
      {
        id: 'impacts',
        label: 'domain.vos.risks.impacts',
        risk: risks.impacts
      }
    ]
  }

  return (
    <CardShell
      title={t("domain.vos.risks.title")}
      clps={clpElements}
      className="bg-slate-50/90"
    >
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className={globalLabelClasses}>
            {t("domain.vos.risks.global")}
            {hasEnoughData ? "" : ` ${t("details.cards.risk.incomplete")}`}
          </span>
          {risks.global != null && (
            <span className={globalValueClasses}>
              {risks.global}%
            </span>
          )}
        </div>

        {hasEnoughData && (
          <div className="mb-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-200 shadow-inner">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${risks.global}%`,
                backgroundColor: getContinuousColor(risks.global!),
              }}
            />
          </div>
        )}

        {hasEnoughData ? (
          <div className="space-y-2 border-t border-slate-200/50 pt-2">
            {mapToCardInfo(risks).map(({ id, label, risk }) => (
              <div key={id} className="flex items-center gap-2">
                <span className={sectionLabelClasses}>{t(label)}</span>
                {risk != null ? (
                  <>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${risk}%`,
                          backgroundColor: getContinuousColor(risk),
                        }}
                      />
                    </div>
                    <span className={sectionValueClasses}>
                      {risk}%
                    </span>
                  </>
                ) : (
                  <span className="text-[11px] text-slate-400 italic">
                    {t("details.cards.risk.no_data")}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-[11px] text-slate-500 italic mt-2">
            {t("details.cards.risk.insufficient")}
          </div>
        )}
      </div>
    </CardShell>
  );
}