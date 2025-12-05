// src/features/landfills/components/cards/DimensionsCard.tsx

import { useLanguageStore } from "@shared/state/languageStore";
import { CardShell } from "@shared/components/CardShell";

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

  const rowLabelClasses = "text-[12px] text-slate-600";
  const rowValueClasses = "font-medium text-[12px] text-slate-800";

  return (
    <CardShell title={t("selection.cards.dimensions.title")}>
      <div className="space-y-2">
        
        {/* Superficie */}
        <div className="flex justify-between items-baseline">
          <span className={rowLabelClasses}>
            {t("selection.cards.dimensions.surface")}
          </span>
          <span className={rowValueClasses}>
            {superficieDisplay}{" "}
            {superficieDisplay !== "—" &&
              t("selection.cards.dimensions.unit_has")}
          </span>
        </div>

        {/* Volumen */}
        <div className="flex justify-between items-baseline">
          <span className={rowLabelClasses}>
            {t("selection.cards.dimensions.volume")}
          </span>
          <span className={rowValueClasses}>
            {volumenDisplay}{" "}
            {volumenDisplay !== "—" && t("selection.cards.dimensions.unit_m3")}
          </span>
        </div>

        {/* Capacidad */}
        {capacidadDisplay != null && (
          <div className="flex justify-between items-baseline">
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

        {/* Barra de Llenado */}
        {fillPercent != null && capacidadDisplay != null && (
          <div className="mt-2 pt-2 border-t border-slate-50 space-y-1">
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
    </CardShell>
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
    <div className="relative mt-1 h-3.5 w-full overflow-visible rounded-full bg-slate-100">
      <div
        className="absolute inset-y-0 left-0 h-full rounded-full bg-slate-300/50"
        style={{ width: `${capacityWidth}%` }}
      />
      <div
        className="absolute top-1/2 left-0 h-2.5 -translate-y-1/2 rounded-full shadow-sm transition-all duration-500 ease-out"
        style={{
          width: `${fillWidth}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}