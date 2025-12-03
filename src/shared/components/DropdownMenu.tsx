import type { ReactNode } from "react";

export interface MenuItem {
  label: string;
  action: () => void;
  isActive?: boolean;
  disabled?: boolean;
  isFutureFeature?: boolean;
}

export interface DropdownMenuProps {
  trigger: ReactNode;
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
  align?: "left" | "right";
  widthClass?: string;
}

export function DropdownMenu({
  trigger,
  items,
  isOpen,
  onClose,
  align = "left",
  widthClass = "w-56",
}: DropdownMenuProps) {
  const originClass =
    align === "left" ? "origin-top-left left-0" : "origin-top-right right-0";

  const getItemClasses = (item: MenuItem) => {
    const base =
      "flex items-center justify-between px-4 py-2.5 transition-colors";

    if (item.disabled) {
      return `${base} cursor-not-allowed bg-slate-50 opacity-50 text-slate-400`;
    }

    if (item.isFutureFeature) {
      return `${base} cursor-pointer bg-emerald-50/40 text-emerald-700 hover:bg-emerald-100/50 hover:text-emerald-800`;
    }

    if (item.isActive) {
      return `${base} cursor-pointer bg-emerald-50/50 font-semibold text-emerald-700`;
    }

    return `${base} cursor-pointer hover:bg-emerald-50 hover:text-emerald-900 text-slate-700`;
  };

  return (
    <div className="relative">
      {trigger}

      <div
        className={`absolute top-full z-50 mt-2 ${widthClass} ${originClass} overflow-hidden rounded-xl border border-slate-200 bg-white text-sm shadow-lg transition-all duration-150 ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-95 opacity-0"
        }`}
      >
        <ul className="divide-y divide-slate-100">
          {items.map((item, idx) => (
            <li
              key={idx}
              onClick={() => {
                if (!item.disabled) {
                  item.action();
                  onClose();
                }
              }}
              className={getItemClasses(item)}
            >
              <span>{item.label}</span>

              {item.isFutureFeature && !item.disabled && (
                <svg
                  className="h-3.5 w-3.5 text-emerald-500/70"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              )}
            </li>
          ))}
        </ul>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 cursor-default"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        />
      )}
    </div>
  );
}
