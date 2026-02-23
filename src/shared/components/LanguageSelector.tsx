import { useState } from "react";
import { useLanguageStore } from "@shared/state/languageStore";
import { DropdownMenu, type MenuItem } from "@shared/components/DropdownMenu";
import { ChevronDown, Globe } from "@shared/components/Icons";

interface LanguageSelectorProps {
  className?: string;
  direction?: "up" | "down";
}

export function LanguageSelector({ className = "", direction = "down" }: LanguageSelectorProps) {
  const { currentLanguage, setLanguage, t } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);

  const labelEs = t("toolbar.spanish") || "Castellano";
  const labelEu = t("toolbar.basque") || "Euskara";

  const items: MenuItem[] = [
    {
      label: labelEs,
      action: () => { setLanguage("es"); setIsOpen(false); },
      isActive: currentLanguage === "es",
    },
    {
      label: labelEu,
      action: () => { setLanguage("eu"); setIsOpen(false); },
      isActive: currentLanguage === "eu",
    },
  ];

  const currentLabel = currentLanguage === "es" ? labelEs : labelEu;

  return (
    <div className={className}>
      <DropdownMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={items}
        align="right"
        widthClass="w-40"
        trigger={
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`
              group flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-all
              ${isOpen ? "bg-slate-100 ring-2 ring-slate-100" : "bg-white hover:bg-slate-50 hover:border-slate-300"}
            `}
          >
            <Globe size={14} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
            <span>{currentLabel}</span>
            <ChevronDown
              size={12}
              className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        }
      />
    </div>
  );
}