import type { LegendItem } from "../domain/types";
import { useLanguageStore } from "@shared/state/languageStore";

interface LegendBodyProps {
  items: LegendItem[];
  riskPercent: number;
  barRef: React.RefObject<HTMLDivElement | null>;
  onPointerDown: React.PointerEventHandler<HTMLDivElement>;
  title?: string | null;
}

export function LegendBody({
  items,
  riskPercent,
  barRef,
  onPointerDown,
  title,
}: LegendBodyProps) {
  const { t } = useLanguageStore();

  const showHeader = title !== null;
  const displayTitle = title || t("legend.title");

  return (
    <>
      {/* Renderizado condicional del título y separador */}
      {showHeader && (
        <>
          <div className="px-3 py-2 font-semibold">{displayTitle}</div>
          <div className="mx-2 mb-1 h-px bg-slate-200" />
        </>
      )}

      {/* Scrollable content container */}
      <div className="flex-1 space-y-3 overflow-y-auto px-3 pb-3">
        {/* Sección 1: color + pulsante */}
        <section>
          <div className="mb-1 text-xs font-semibold tracking-wide text-slate-500 uppercase">
            {t("legend.risk_color")}
          </div>

          <div className="flex items-center gap-2">
            <div
              ref={barRef}
              className="relative h-3 flex-1 cursor-pointer rounded-full bg-linear-to-r from-[#F7D44D] to-[#FF0000]"
              onPointerDown={onPointerDown}
            >
              {/* Thumb */}
              <div
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-slate-900/80 shadow"
                style={{ left: `${riskPercent}%` }}
              />
            </div>

            <div className="w-10 text-right text-xs text-slate-700">
              {riskPercent}%
            </div>
          </div>

          <div
            className="mt-1 text-[11px] text-slate-500"
            dangerouslySetInnerHTML={{ __html: t("legend.risk_desc") }}
          />
        </section>

        {/* Divider */}
        <div className="h-px bg-slate-200" />

        {/* Sección 2: pictogramas CLP */}
        <section>
          <div className="mb-1 text-xs font-semibold tracking-wide text-slate-500 uppercase">
            {t("legend.clp_pictograms")}
          </div>

          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.id} className="flex items-start gap-2 py-0.5">
                {item.icon.kind === "image" && (
                  <img
                    src={item.icon.src}
                    alt={item.icon.alt}
                    className="mt-0.5 h-6 w-6 object-contain"
                    draggable={false}
                  />
                )}

                <div className="flex-1">
                  <div className="text-xs font-medium text-slate-800">
                    {item.label}
                  </div>
                  {item.note && (
                    <div className="text-[11px] text-slate-500">
                      {item.note}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div
            className="mt-2 text-[11px] text-slate-500"
            dangerouslySetInnerHTML={{ __html: t("legend.clp_info") }}
          />
        </section>
      </div>
    </>
  );
}
