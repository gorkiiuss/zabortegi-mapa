import { useLanguageStore } from "@shared/state/languageStore";

interface ClimateCardProps {
  precipitacion: string | null;
  lluviaUtil: string | null;
}

export function ClimateCard({ precipitacion, lluviaUtil }: ClimateCardProps) {
  const { t } = useLanguageStore();

  if (!precipitacion && !lluviaUtil) return null;

  const titleClasses =
    "mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500";
  const cardPadding = "p-2.5";
  const rowLabelClasses = "text-[12px]";
  const rowValueClasses = "text-right font-medium text-[12px]";

  return (
    <section>
      <div className={titleClasses}>{t("selection.cards.climate.title")}</div>
      <div
        className={`space-y-1.5 rounded-xl border border-slate-100 bg-white ${cardPadding} `}
      >
        {precipitacion && (
          <div className="flex justify-between">
            <span className={rowLabelClasses}>
              {t("selection.cards.climate.precip")}
            </span>
            <span className={rowValueClasses}>{precipitacion}</span>
          </div>
        )}
        {lluviaUtil && (
          <div className="flex justify-between">
            <span className={rowLabelClasses}>
              {t("selection.cards.climate.rain")}
            </span>
            <span className={rowValueClasses}>{lluviaUtil}</span>
          </div>
        )}
      </div>
    </section>
  );
}
