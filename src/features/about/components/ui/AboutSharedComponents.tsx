// src/features/about/components/ui/AboutSharedComponents.tsx

import { useState } from "react";
import { useLanguageStore } from "@shared/state/languageStore";
import { DropdownMenu, type MenuItem } from "@shared/components/DropdownMenu";
import { ChevronDown, Globe } from "@shared/components/Icons";

// ─── ACCORDION ITEM ───
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  badge?: string | null;
  activeColorClass?: string;
}

export function AccordionItem({
  title,
  children,
  isOpen,
  onClick,
  icon,
  badge,
  activeColorClass = "emerald",
}: AccordionItemProps) {
  const borderColor = isOpen
    ? `border-${activeColorClass}-200`
    : "border-slate-200";
  const bgColor = isOpen
    ? "bg-white shadow-md"
    : "bg-white hover:border-slate-300";
  const iconBg = isOpen
    ? `bg-${activeColorClass}-50 text-${activeColorClass}-600`
    : "bg-slate-100 text-slate-500";

  return (
    <div
      className={`overflow-hidden rounded-xl border transition-all duration-300 ${borderColor} ${bgColor}`}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between p-4 text-left outline-none select-none"
      >
        <div className="flex items-center gap-3">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${iconBg}`}
          >
            {icon}
          </span>
          <span
            className={`text-sm font-semibold ${isOpen ? "text-slate-800" : "text-slate-600"}`}
          >
            {title}
          </span>
          {badge && !isOpen && (
            <span
              className={`rounded-full bg-${activeColorClass}-100 px-2 py-0.5 text-[10px] font-bold text-${activeColorClass}-600 tracking-wide uppercase`}
            >
              {badge}
            </span>
          )}
        </div>
        <div
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <ChevronDown />
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-slate-100 p-5 pt-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

// ─── CHIP ───
export function Chip({
  href,
  icon,
  label,
  iconHoverColor = "text-slate-800",
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  iconHoverColor?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
    >
      <span
        className={`text-slate-500 group-hover:${iconHoverColor} transition-colors`}
      >
        {icon}
      </span>
      {label}
    </a>
  );
}

// ─── STAT BOX ───
export function StatBox({
  label,
  value,
  isPulse = false,
}: {
  label: string;
  value: string;
  isPulse?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden rounded-xl border p-3 text-center ${
        isPulse
          ? "landfill-pulse-target border-orange-200 bg-orange-50"
          : "border-slate-100 bg-slate-50"
      } `}
    >
      <span
        className={`text-xl font-black ${isPulse ? "text-orange-700" : "text-slate-700"}`}
      >
        {value}
      </span>
      <span
        className={`mt-0.5 text-[10px] font-bold tracking-wide uppercase ${isPulse ? "text-orange-600" : "text-slate-400"}`}
      >
        {label}
      </span>
    </div>
  );
}

// ─── SECTION TITLE ───
export function SectionTitle({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <h3 className="mb-3 flex items-center gap-2 pl-1 text-xs font-bold tracking-wider text-slate-400 uppercase">
      {icon}
      {children}
    </h3>
  );
}

// ─── LANGUAGE SELECTOR ───
export function LanguageSelector() {
  const { currentLanguage, setLanguage, t } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);
  const items: MenuItem[] = [
    {
      label: t("toolbar.spanish"),
      isActive: currentLanguage === "es",
      action: () => setLanguage("es"),
    },
    {
      label: t("toolbar.basque"),
      isActive: currentLanguage === "eu",
      action: () => setLanguage("eu"),
    },
  ];
  const currentLabel =
    currentLanguage === "es" ? t("toolbar.spanish") : t("toolbar.basque");

  return (
    <DropdownMenu
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      items={items}
      align="right"
      widthClass="w-40"
      trigger={
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-colors ${isOpen ? "bg-slate-100 ring-2 ring-slate-100" : "bg-white hover:bg-slate-50"}`}
        >
          <span className="text-slate-400">
            <Globe />
          </span>
          <span>{currentLabel}</span>
          <span
            className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          >
            <ChevronDown size={12} />
          </span>
        </button>
      }
    />
  );
}
