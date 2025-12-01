// src/features/landfills/components/index/TerrotorySection.tsx

import { useState } from "react";
import type {
  TerritoryGroup,
  MunicipalityGroup,
} from "@features/landfills/domain/indexGrouping";
import type { Landfill } from "@features/landfills/domain/types";
import { MunicipalitySection } from "./MunicipalitySection";
import { useLanguageStore } from "@shared/state/languageStore";

interface TerritorySectionProps {
  territoryKey: string;
  group: TerritoryGroup;
  isOpen?: boolean;
  onToggle: () => void;
  isMunicipalityOpen: (tKey: string, mKey: string) => boolean;
  onToggleMunicipality: (tKey: string, mKey: string) => void;
  onSelect: (lf: Landfill) => void;
}

export function TerritorySection({ group, onSelect }: TerritorySectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const tKey = String(group.key);

  const renderMunicipality = (muni: MunicipalityGroup) => (
    <MunicipalitySection
      key={`${tKey}::${muni.key}`}
      group={muni}
      onSelect={onSelect}
    />
  );

  const { t } = useLanguageStore();

  return (
    <section className="mb-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/60">
      {/* Cabecera territorio (desplegable) */}
      <button
        type="button"
        className="flex w-full items-center justify-between bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100/80"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{group.label}</span>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>{t("misc.landfill_count", { count: group.totalCount })}</span>
          <span className="text-base">{isOpen ? "▾" : "▸"}</span>
        </div>
      </button>

      {/* Contenido territorio */}
      {isOpen && (
        <div className="space-y-3 bg-white px-4 py-3">
          {group.municipalities.map(renderMunicipality)}
        </div>
      )}
    </section>
  );
}
