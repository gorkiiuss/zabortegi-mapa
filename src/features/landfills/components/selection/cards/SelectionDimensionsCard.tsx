import { useLanguageStore } from "@shared/state/languageStore";

interface DimensionsCardProps {
  superficieDisplay: string;
  volumenDisplay: string;
  capacidadDisplay: string | null;
  fillPercent: number | null;
}

export function DimensionsCard({
  superficieDisplay,
  volumenDisplay,
  capacidadDisplay,
  fillPercent,
}: DimensionsCardProps) {
  const { t } = useLanguageStore();

  const titleClasses =
    "mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500";
  const cardPadding = "p-3";
  const rowLabelClasses = "text-[12px]";
  const rowValueClasses = "font-medium text-[12px]";

  return (
    <section>
      <div className={titleClasses}>
        {t("selection.cards.dimensions.title")}
      </div>
      <div
        className={`space-y-2 rounded-xl border border-slate-100 bg-white ${cardPadding} `}
      >
        <div className="flex justify-between">
          <span className={rowLabelClasses}>
            {t("selection.cards.dimensions.surface")}
          </span>
          <span className={rowValueClasses}>
            {superficieDisplay}{" "}
            {superficieDisplay !== "—" &&
              t("selection.cards.dimensions.unit_has")}
          </span>
        </div>
        <div className="flex justify-between">
          <span className={rowLabelClasses}>
            {t("selection.cards.dimensions.volume")}
          </span>
          <span className={rowValueClasses}>
            {volumenDisplay}{" "}
            {volumenDisplay !== "—" && t("selection.cards.dimensions.unit_m3")}
          </span>
        </div>

        {capacidadDisplay != null && (
          <div className="flex justify-between">
            <span className={rowLabelClasses}>
              {t("selection.cards.dimensions.capacity")}
            </span>
            <span className={rowValueClasses}>
              {capacidadDisplay}{" "}
              {capacidadDisplay !== "—" &&
                t("selection.cards.dimensions.unit_m3")}
            </span>
          </div>
        )}

        {fillPercent != null && capacidadDisplay != null && (
          <div className="mt-1 space-y-1">
            <div className="flex items-center justify-between">
              <span className={rowLabelClasses}>
                {t("selection.cards.dimensions.fill")}
              </span>
              <span className={rowValueClasses}>{fillPercent.toFixed(0)}%</span>
            </div>
            <FillBar percent={fillPercent} />
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------------- Barra de llenado ---------------------- */

interface FillBarProps {
  percent: number;
}

// 0% -> verde, 100%+ -> rojo
function fillColor(percent: number): string {
  if (percent >= 100) return "#b91c1c"; // rojo
  if (percent >= 70) return "#f97316"; // naranja
  if (percent >= 40) return "#eab308"; // amarillo
  return "#22c55e"; // verde
}

function FillBar({ percent }: FillBarProps) {
  const safe = Math.max(0, percent);

  let fillWidth: number;
  let capacityWidth: number;

  if (safe <= 100) {
    fillWidth = safe;
    capacityWidth = 100;
  } else {
    fillWidth = 100;
    capacityWidth = 10000 / safe;
  }

  const color = fillColor(safe);

  return (
    <div className="relative mt-0.5 h-4 overflow-visible rounded-full">
      <div
        className="absolute inset-y-0 left-0 h-full rounded-full bg-slate-300"
        style={{ width: `${capacityWidth}%` }}
      />
      <div
        className="absolute top-1/2 left-0 ml-1 h-2 -translate-y-1/2 rounded-full shadow-sm"
        style={{
          width: `${fillWidth}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}
