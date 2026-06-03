// src/features/search/components/SearchCard.tsx

import type { LandfillSummaryEntity } from "@features/landfills/domain/entities/LandfillSummary";
import { useLanguageStore } from "@shared/state/languageStore";

interface SearchCardProps {
  item: LandfillSummaryEntity;
  active: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}

export default function SearchCard({
  item,
  active,
  onClick,
  onMouseEnter,
}: SearchCardProps) {
  const { t } = useLanguageStore()
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseEnter={(e) => {
        e.stopPropagation();
        onMouseEnter();
      }}
      className={`cursor-pointer rounded-xl border px-3 py-2 text-sm transition-colors ${active
        ? "border-emerald-300 bg-emerald-50"
        : "border-slate-200 bg-white hover:bg-slate-50"
        } `}
    >
      <div className="font-medium text-slate-900">{item.name ? item.name : t("domain.entities.landfill_summary.name_placeholder")}</div>
      <div className="text-xs text-slate-500">
        {item.municipality ? item.municipality : t("domain.entities.landfill_summary.municipality_placeholder")} · {item.code ? item.code : t("domain.entities.landfill_summary.code_placeholder")}
      </div>
    </div>
  );
}
