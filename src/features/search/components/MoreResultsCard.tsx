import { useLanguageStore } from "@shared/state/languageStore";

interface MoreResultsCardProps {
  query: string;
  active: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}

export default function MoreResultsCard({
  query,
  active,
  onClick,
  onMouseEnter,
}: MoreResultsCardProps) {
  const trimmed = query.trim();
  const { t } = useLanguageStore();

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
      <div className="font-medium text-slate-900">
        {t("search.more_results.title")}
      </div>
      <div className="text-[11px] text-slate-500">
        {trimmed
          ? t("search.more_results.subtitle_filtered", { query: trimmed })
          : t("search.more_results.subtitle_all")}
      </div>
    </div>
  );
}
