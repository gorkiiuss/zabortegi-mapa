import { useLanguageStore } from "@shared/state/languageStore";

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

  if (
    !situacionLegal &&
    !tipoVertedero &&
    !tiposResiduos &&
    !descripcionResiduos
  ) {
    return null;
  }

  const titleClasses =
    "mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500";
  const cardPadding = "p-2.5";
  const labelClasses = "text-[12px]";
  const valueClasses = "text-right font-medium text-[12px]";
  const bodySmallClasses = "text-[11px] text-slate-600";

  return (
    <section>
      <div className={titleClasses}>{t("selection.cards.legal.title")}</div>
      <div
        className={`space-y-1.5 rounded-xl border border-slate-100 bg-white ${cardPadding} `}
      >
        {situacionLegal && (
          <div className="flex justify-between gap-2">
            <span className={labelClasses}>
              {t("selection.cards.legal.status")}
            </span>
            <span className={valueClasses}>{situacionLegal}</span>
          </div>
        )}
        {tipoVertedero && (
          <div className="flex justify-between gap-2">
            <span className={labelClasses}>
              {t("selection.cards.legal.type")}
            </span>
            <span className={valueClasses}>{tipoVertedero}</span>
          </div>
        )}
        {tiposResiduos && (
          <div className="flex flex-col gap-0.5">
            <span className={labelClasses}>
              {t("selection.cards.legal.waste_type")}
            </span>
            <span className="text-[12px] font-medium md:text-[13px]">
              {tiposResiduos}
            </span>
          </div>
        )}
        {descripcionResiduos && (
          <div className="flex flex-col gap-0.5">
            <span className={labelClasses}>
              {t("selection.cards.legal.waste_desc")}
            </span>
            <span className={bodySmallClasses}>{descripcionResiduos}</span>
          </div>
        )}
      </div>
    </section>
  );
}
