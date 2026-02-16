import { useNewsStore } from "@features/about/state/newsStore";
import { useLanguageStore } from "@shared/state/languageStore";
import { useAppOrchestrator } from "@features/orchestrator/hooks/useAppOrchestrator";
import { MousePointerClick, ArrowRightCircle } from "lucide-react"; // Nuevos iconos para indicar acción

interface ChangelogSectionProps {
  highlightLatest?: boolean;
}

export function ChangelogSection({
  highlightLatest = false,
}: ChangelogSectionProps) {
  const { currentLanguage } = useLanguageStore();
  const lang = currentLanguage as "es" | "eu";

  const changelog = useNewsStore((s) => s.changelog);
  const { dispatch } = useAppOrchestrator();

  return (
    <div className="relative space-y-8 px-2 py-2">
      <div className="absolute top-4 bottom-4 left-[1.65rem] w-px bg-slate-200" />

      {changelog.map((entry, idx) => {
        const isLatest = idx === 0 && highlightLatest;

        return (
          <div key={idx} className={`relative flex gap-5 ${isLatest ? "mb-2" : ""}`}>

            <div
              className={`
                z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-white transition-colors
                ${isLatest
                  ? "bg-emerald-600 text-white shadow-lg ring-2 shadow-emerald-200 ring-emerald-50"
                  : "bg-slate-100 text-slate-500 shadow-xs"
                }
              `}
            >
              <span className="text-[10px] font-bold">{entry.version}</span>
            </div>

            <div
              className={`
                flex-1 space-y-2 pt-0.5
                ${isLatest ? "-mt-2 -mr-2 rounded-xl bg-emerald-50/50 p-3 ring-1 ring-emerald-100/50" : ""}
              `}
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <h4 className={`text-sm font-bold ${isLatest ? "text-emerald-900" : "text-slate-700"}`}>
                    {entry.title[lang]}
                  </h4>
                  {isLatest && (
                    <span className="inline-flex animate-pulse items-center rounded-full bg-emerald-600 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white uppercase shadow-sm">
                      {lang === "es" ? "Nuevo" : "Berria"}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-medium tracking-wide uppercase ${isLatest ? "text-emerald-400" : "text-slate-400"}`}>
                  {entry.date}
                </span>
              </div>

              <ul className="space-y-1.5">
                {entry.items.map((item, cIdx) => {
                  const hasAction = !!item.action;

                  return (
                    <li
                      key={cIdx}
                      onClick={() => hasAction && item.action && dispatch(item.action)}
                      className={`
                        group/item flex items-start gap-2.5 text-xs sm:text-sm transition-all duration-200 rounded-md p-1 -ml-1
                        ${hasAction ? "cursor-pointer hover:bg-white hover:shadow-sm hover:ring-1 hover:ring-slate-200" : ""}
                        ${isLatest && !hasAction ? "text-emerald-800" : "text-slate-600"}
                      `}
                    >
                      <div className="mt-1.5 shrink-0">
                        {hasAction ? (
                          <MousePointerClick size={14} className="text-blue-500 animate-pulse" />
                        ) : (
                          <div className={`h-1.5 w-1.5 rounded-full ${isLatest ? "bg-emerald-500" : "bg-slate-300"}`} />
                        )}
                      </div>

                      <span
                        className={`
                          leading-relaxed
                          ${hasAction ? "font-medium text-blue-700 underline decoration-dotted decoration-blue-300 underline-offset-4 group-hover/item:text-blue-800" : ""}
                        `}
                      >
                        {item.text[lang]}

                        {hasAction && (
                          <ArrowRightCircle size={12} className="inline-block ml-2 mb-0.5 opacity-50 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}