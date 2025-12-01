// src/features/landfills/components/index/MunicipalitySection.tsx

import { useState } from "react";
import type { MunicipalityGroup } from "@features/landfills/domain/indexGrouping";
import type { Landfill } from "@features/landfills/domain/types";
import { useLanguageStore } from "@shared/state/languageStore";

interface MunicipalitySectionProps {
  group: MunicipalityGroup;
  onSelect: (lf: Landfill) => void;
}

export function MunicipalitySection({
  group,
  onSelect,
}: MunicipalitySectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguageStore();

  return (
    <div className="rounded-lg border border-slate-200 bg-white/60">
      {/* Cabecera municipio */}
      <button
        type="button"
        className="flex w-full items-center justify-between bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100/80"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{group.label}</span>
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <span>{t("misc.landfill_count", { count: group.totalCount })}</span>
          <span className="text-xs">{isOpen ? "▾" : "▸"}</span>
        </div>
      </button>

      {/* Contenido municipio */}
      {isOpen && (
        <ul className="space-y-1 px-2 py-2">
          {group.landfills.map((lf) => (
            <li
              key={lf.id}
              className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs hover:bg-slate-50"
              onClick={() => onSelect(lf)}
            >
              <div>
                <div className="font-medium text-slate-900">{lf.name}</div>
                <div className="text-[11px] text-slate-500">
                  {(lf.municipality ?? "").trim() || "Sin municipio"} ·{" "}
                  {lf.code}
                </div>
              </div>
              <div className="text-[11px] font-semibold text-slate-700">
                {lf.riskLevel === "unknown"
                  ? "Sin datos"
                  : `${lf.riskScore} pts`}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
