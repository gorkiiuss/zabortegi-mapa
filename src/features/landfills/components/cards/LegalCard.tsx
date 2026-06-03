// src/features/landfills/components/cards/LegalCard.tsx
import { useLanguageStore } from "@shared/state/languageStore";
import { CardShell } from "@shared/components/CardShell";
import { LegalStatusVO, type LegalStatus } from "@features/landfills/domain/valueObjects/operation/LegalStatus";
import { LandfillTypeVO, type LandfillType } from "@features/landfills/domain/valueObjects/operation/LandfillType";
import { WasteTypeVO, type WasteType } from "@features/landfills/domain/valueObjects/operation/WasteType";
import { WasteLegalCategoryVO, type WasteLegalCategory } from "@features/landfills/domain/valueObjects/operation/WasteLegalCategory";
import { OwnershipTypeVO } from "@features/landfills/domain/valueObjects/operation/ownership/OwnershipType";
import type { Ownership } from "@features/landfills/domain/valueObjects/operation/ownership/Ownership";
import type { TxKeyPath } from "i18n/config";

interface LegalCardProps {
  legalStatus: LegalStatus | null;
  landfillType: LandfillType | null;
  wasteLegalCategory: WasteLegalCategory | null;
  wasteType: WasteType | null;
  wasteDescription: string | null;
  ownership: Ownership | null;
}

export function LegalCard({
  legalStatus,
  landfillType,
  wasteLegalCategory,
  wasteType,
  wasteDescription,
  ownership,
}: LegalCardProps) {
  const { t } = useLanguageStore();

  const labelClasses = "text-[12px] text-slate-500";
  const valueClasses = "text-right font-medium text-[12px] text-slate-700";
  const bodySmallClasses = "text-[11px] text-slate-600";

  return (
    <CardShell title={t("details.cards.legal.title")}>      
      {legalStatus && (
        <div className="flex justify-between gap-2">
          <span className={labelClasses}>{t("domain.vos.operation.legal_status.title")}</span>
          <span className={valueClasses}>{t(LegalStatusVO.getTxKey(legalStatus) as TxKeyPath)}</span>
        </div>
      )}

      {landfillType && (
        <div className="flex justify-between gap-2">
          <span className={labelClasses}>{t("domain.vos.operation.landfill_type.title")}</span>
          <span className={valueClasses}>{t(LandfillTypeVO.getTxKey(landfillType) as TxKeyPath)}</span>
        </div>
      )}

      {wasteLegalCategory && (
        <div className="flex justify-between gap-2">
          <span className={labelClasses}>{t("domain.vos.operation.waste_legal_category.title")}</span>
          <span className={valueClasses}>{t(WasteLegalCategoryVO.getTxKey(wasteLegalCategory) as TxKeyPath)}</span>
        </div>
      )}

      {wasteType && (
        <div className="flex justify-between gap-2">
          <span className={labelClasses}>{t("domain.vos.operation.waste_type.title")}</span>
          <span className={valueClasses}>{t(WasteTypeVO.getTxKey(wasteType) as TxKeyPath)}</span>
        </div>
      )}

      {wasteDescription && (
        <div className="flex flex-col gap-0.5 mt-1">
           <span className={labelClasses}>{t("domain.vos.operation.waste_description")}</span>
           <span className={bodySmallClasses}>{wasteDescription}</span>
        </div>
      )}

      {ownership && (
        <>
          <div className="border-t border-slate-100 my-2" />
          <div className="flex justify-between items-center gap-2">
            <span className={labelClasses}>{t("domain.vos.operation.property_type")}</span>
            <div className="flex items-center gap-1.5">
              <span className={valueClasses}>
                {t(OwnershipTypeVO.getTxKey(ownership.type) as TxKeyPath)}
              </span>
              {ownership.is_heuristic && (
                <span className="inline-flex select-none items-center gap-0.5 rounded-sm bg-slate-100 px-1 py-0.5 text-[9px] font-medium text-slate-500 ring-1 ring-inset ring-slate-500/10">
                  <span className="h-1 w-1 animate-pulse rounded-full bg-slate-400" />
                  {t("details.cards.ownership.heuristic")}
                </span>
              )}
            </div>
          </div>
        </>
      )}
      
    </CardShell>
  );
}