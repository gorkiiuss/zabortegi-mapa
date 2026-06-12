// src/features/search/components/advanced/inputs/RangeInput.tsx

import { useLanguageStore } from "@shared/state/languageStore";

interface RangeInputProps {
  label: string;
  min?: number;
  max?: number;
  onlyNull?: boolean;
  onChange: (min?: number, max?: number, onlyNull?: boolean) => void;
  unit?: string;
}

export function RangeInput({ label, min, max, onlyNull, onChange, unit }: RangeInputProps) {
  const { t } = useLanguageStore()

  const handleMinChange = (val: string) => {
    const num = val === "" ? undefined : Number(val);
    onChange(num, max, onlyNull);
  };

  const handleMaxChange = (val: string) => {
    const num = val === "" ? undefined : Number(val);
    onChange(min, num, onlyNull);
  };

  const handleNullChange = (checked: boolean) => {
    onChange(checked ? undefined : min, checked ? undefined : max, checked);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
        {label} {unit ? `(${unit})` : ""}
      </span>
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Mín"
          value={min ?? ""}
          disabled={onlyNull}
          onChange={(e) => handleMinChange(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 shadow-xs placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
        />
        <span className="text-slate-400 text-xs font-semibold">-</span>
        <input
          type="number"
          placeholder="Máx"
          value={max ?? ""}
          disabled={onlyNull}
          onChange={(e) => handleMaxChange(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 shadow-xs placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
        />
        <label className="flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500 cursor-pointer hover:bg-slate-100 transition-colors">
          <input
            type="checkbox"
            checked={!!onlyNull}
            onChange={(e) => handleNullChange(e.target.checked)}
            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span>{t("search.advanced.inputs.null")}</span>
        </label>
      </div>
    </div>
  );
}
