// src/features/search/components/advanced/inputs/TriStateCheckbox.tsx
import { useLanguageStore } from "@shared/state/languageStore";

interface TriStateCheckboxProps {
  label: string;
  value?: boolean;
  onlyNull?: boolean;
  onChange: (value?: boolean, onlyNull?: boolean) => void;
}

export function TriStateCheckbox({ label, value, onlyNull, onChange }: TriStateCheckboxProps) {
  const { t } = useLanguageStore();

  let stateLabel = t("search.advanced.inputs.ignore");
  let bg = "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200/50";

  if (value === true && !onlyNull) {
    stateLabel = t("domain.boolean.yes");
    bg = "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100/50";
  } else if (value === false && !onlyNull) {
    stateLabel = t("domain.boolean.no");
    bg = "bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100/50";
  } else if (onlyNull) {
    stateLabel = t("search.advanced.inputs.no_data") + " (" + t("search.advanced.inputs.null") + ")";
    bg = "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100/50";
  }

  const handleClick = () => {
    if (value === undefined && !onlyNull) {
      onChange(true, false);
    } else if (value === true && !onlyNull) {
      onChange(false, false);
    } else if (value === false && !onlyNull) {
      onChange(undefined, true);
    } else {
      onChange(undefined, false);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
      <button
        type="button"
        onClick={handleClick}
        className={`flex items-center justify-between rounded-xl border px-3 py-2 text-xs font-semibold shadow-xs transition-all ${bg}`}
      >
        <span>{stateLabel}</span>
        <span className="text-[9px] opacity-60 font-normal">{t("search.advanced.inputs.rotate")}</span>
      </button>
    </div>
  );
}
