// src/features/landfills/components/cards/LegalCard.tsx
import { useLanguageStore } from "@shared/state/languageStore";
import { CardShell } from "@shared/components/CardShell";

interface LegalCardProps {
  situacionLegal: string | null;
  tipoVertedero: string | null;
  tiposResiduos: string | null;
  descripcionResiduos: string | null;
}

export function LegalCard({
  situacionLegal,
  tipoVertedero,
  tiposResiduos,
  descripcionResiduos,
}: LegalCardProps) {
  const { t } = useLanguageStore();

  if (!situacionLegal && !tipoVertedero && !tiposResiduos && !descripcionResiduos) {
    return null;
  }

  const labelClasses = "text-[12px] text-slate-500";
  const valueClasses = "text-right font-medium text-[12px] text-slate-700";
  const bodySmallClasses = "text-[11px] text-slate-600";

  return (
    <CardShell title={t("selection.cards.legal.title")}>      
      {situacionLegal && (
        <div className="flex justify-between gap-2">
          <span className={labelClasses}>{t("selection.cards.legal.status")}</span>
          <span className={valueClasses}>{situacionLegal}</span>
        </div>
      )}

      {tipoVertedero && (
        <div className="flex justify-between gap-2">
          <span className={labelClasses}>{t("selection.cards.legal.type")}</span>
          <span className={valueClasses}>{tipoVertedero}</span>
        </div>
      )}

      {tiposResiduos && (
        <div className="flex flex-col gap-0.5 mt-1">
           <span className={labelClasses}>{t("selection.cards.legal.waste_type")}</span>
           <span className="text-[12px] font-medium md:text-[13px] text-slate-800">
             {tiposResiduos}
           </span>
        </div>
      )}

      {descripcionResiduos && (
        <div className="flex flex-col gap-0.5 mt-1">
           <span className={labelClasses}>{t("selection.cards.legal.waste_desc")}</span>
           <span className={bodySmallClasses}>{descripcionResiduos}</span>
        </div>
      )}
      
    </CardShell>
  );
}