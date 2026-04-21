// src/features/about/components/ui/AboutSharedComponents.tsx

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
      className={`relative flex flex-col items-center justify-center overflow-hidden rounded-xl border p-3 text-center ${isPulse
        ? "landfill-pulse-target border-orange-200 bg-orange-50"
        : "border-slate-100 bg-slate-50"
        } `}
    >
      <span
        className={`text-xl sm:text-2xl font-black ${isPulse ? "text-orange-700" : "text-slate-700"}`}
      >
        {value}
      </span>
      <span
        className={`mt-0.5 text-[10px] sm:text-[11px] font-bold tracking-wide uppercase ${isPulse ? "text-orange-600" : "text-slate-400"}`}
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