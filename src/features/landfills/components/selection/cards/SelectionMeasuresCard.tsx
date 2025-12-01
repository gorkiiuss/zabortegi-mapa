import { useLanguageStore } from "@shared/state/languageStore";

interface MeasuresCardProps {
  titulo: string | null;
  descripcion: string | null;
  otros: string | null;
}

export function MeasuresCard({
  titulo,
  descripcion,
  otros,
}: MeasuresCardProps) {
  const { t } = useLanguageStore();

  if (!titulo && !descripcion && !otros) return null;

  const titleClasses =
    "mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500";
  const cardPadding = "p-3";
  const mainTitleClasses = "text-[12px] font-semibold text-amber-900";
  const bodyClasses = "text-[12px] leading-snug text-slate-900";
  const smallBodyClasses = "text-[11px] leading-snug text-slate-800";

  return (
    <section>
      <div className={titleClasses}>{t("selection.cards.measures.title")}</div>
      <div
        className={`space-y-2 rounded-xl border border-amber-200 bg-amber-50 ${cardPadding} `}
      >
        {titulo && <div className={mainTitleClasses}>{titulo}</div>}
        {descripcion && <p className={bodyClasses}>{descripcion}</p>}
        {otros && <p className={smallBodyClasses}>{otros}</p>}
      </div>
    </section>
  );
}
