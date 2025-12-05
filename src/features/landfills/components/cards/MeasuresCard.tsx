// src/features/landfills/components/cards/MeasuresCard.tsx

import { useLanguageStore } from "@shared/state/languageStore";
import { CardShell } from "@shared/components/CardShell";

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

  const mainTitleClasses = "text-[12px] font-semibold text-amber-900";
  const bodyClasses = "text-[12px] leading-snug text-slate-900";
  const smallBodyClasses = "text-[11px] leading-snug text-slate-800";

  return (
    <CardShell 
      title={t("selection.cards.measures.title")}
      className="border-emerald-200 bg-emerald-50"
    >
      <div className="space-y-2">
        {titulo && <div className={mainTitleClasses}>{titulo}</div>}
        {descripcion && <p className={bodyClasses}>{descripcion}</p>}
        {otros && <p className={smallBodyClasses}>{otros}</p>}
      </div>
    </CardShell>
  );
}