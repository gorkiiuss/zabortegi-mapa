import { useLanguageStore } from "@shared/state/languageStore";
import { CHANGELOG_DATA } from "../../data/changelogRepository";

interface ChangelogSectionProps {
  highlightLatest?: boolean;
}

export function ChangelogSection({
  highlightLatest = false,
}: ChangelogSectionProps) {
  const { currentLanguage } = useLanguageStore();
  const lang = currentLanguage as "es" | "eu";

  return (
    <div className="relative space-y-8 px-2 py-2">
      <div className="absolute top-4 bottom-4 left-[1.65rem] w-px bg-slate-200" />

      {CHANGELOG_DATA.map((item, idx) => {
        const isLatest = idx === 0 && highlightLatest;

        return (
          <div
            key={idx}
            className={`relative flex gap-5 ${isLatest ? "mb-2" : ""}`}
          >
            {/* Bolita del timeline */}
            <div
              className={`z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-white transition-colors ${
                isLatest
                  ? "bg-emerald-600 text-white shadow-lg ring-2 shadow-emerald-200 ring-emerald-50"
                  : "bg-slate-100 text-slate-500 shadow-xs"
              } `}
            >
              <span className="text-[10px] font-bold">{item.version}</span>
            </div>

            <div
              className={`flex-1 space-y-2 pt-0.5 ${isLatest ? "-mt-2 -mr-2 rounded-xl bg-emerald-50/50 p-3 ring-1 ring-emerald-100/50" : ""}`}
            >
              {/* Cabecera */}
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <h4
                    className={`text-sm font-bold ${isLatest ? "text-emerald-900" : "text-slate-700"}`}
                  >
                    {item.title[lang]}
                  </h4>
                  {isLatest && (
                    <span className="inline-flex animate-pulse items-center rounded-full bg-emerald-600 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white uppercase shadow-sm">
                      {lang === "es" ? "Nuevo" : "Berria"}
                    </span>
                  )}
                </div>

                <span
                  className={`text-[10px] font-medium tracking-wide uppercase ${isLatest ? "text-emerald-400" : "text-slate-400"}`}
                >
                  {item.date}
                </span>
              </div>

              {/* Lista de cambios */}
              <ul className="list-inside space-y-1.5 text-xs marker:text-slate-300 sm:text-sm">
                {item.changes[lang]?.map((change, cIdx) => (
                  <li
                    key={cIdx}
                    className={`flex items-start gap-2.5 ${isLatest ? "text-emerald-800" : "text-slate-600"}`}
                  >
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isLatest ? "bg-emerald-500" : "bg-slate-300"}`}
                    />
                    <span className="leading-relaxed">{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
