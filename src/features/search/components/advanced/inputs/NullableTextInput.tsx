// src/features/search/components/advanced/inputs/NullableTextInput.tsx
import { useLanguageStore } from "@shared/state/languageStore";
import { useState, useEffect } from "react";

interface NullableTextInputProps {
  label: string;
  value?: string;
  onlyNull?: boolean;
  onChange: (value?: string, onlyNull?: boolean) => void;
  placeholder?: string;
}

export function NullableTextInput({ label, value, onlyNull, onChange, placeholder }: NullableTextInputProps) {
  const [text, setText] = useState(value || "");
  const { t } = useLanguageStore()

  useEffect(() => {
    setText(value || "");
  }, [value]);

  const handleTextChange = (newVal: string) => {
    setText(newVal);
    onChange(newVal ? newVal : undefined, onlyNull);
  };

  const handleNullChange = (checked: boolean) => {
    onChange(checked ? undefined : (text ? text : undefined), checked);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={text}
          disabled={onlyNull}
          onChange={(e) => handleTextChange(e.target.value)}

          placeholder={onlyNull ? t("search.advanced.inputs.searching_for_null") : placeholder || t("search.advanced.inputs.ti_placeholder")}
          className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 shadow-xs placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
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
