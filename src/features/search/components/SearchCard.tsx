// src/features/search/components/SearchCard.tsx
import type { LandfillSummary } from "@features/landfills/domain/types";

interface SearchCardProps {
  item: LandfillSummary;
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
      className={`cursor-pointer rounded-xl border px-3 py-2 text-sm transition-colors ${
        active
          ? "border-emerald-300 bg-emerald-50"
          : "border-slate-200 bg-white hover:bg-slate-50"
      } `}
    >
      <div className="font-medium text-slate-900">{item.name}</div>
      <div className="text-xs text-slate-500">
        {item.municipality} · {item.id}
      </div>
    </div>
  );
}
