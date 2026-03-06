// src/features/about/components/sections/ChangelogSection.tsx

import { useNewsStore } from "@features/about/state/newsStore";
import { useLanguageStore } from "@shared/state/languageStore";
import { useAppOrchestrator } from "@features/orchestrator/hooks/useAppOrchestrator";
import { MousePointerClick, ArrowRightCircle, FlaskConical, GitCommitVertical } from "@shared/components/Icons";
import { isItemNew } from "@features/about/utils/isNew";
import { useMemo, useState } from "react";
import type { ChangeLogEntry } from "@features/about/domain/types";

export function ChangelogSection() {
  const { t, currentLanguage } = useLanguageStore();
  const lang = currentLanguage as "es" | "eu";

  const changelog = useNewsStore((s) => s.changelog);
  const [showSnapshots, setShowSnapshots] = useState(() => {
    return localStorage.getItem("app_show_snapshots") === "true";
  });

  const handleToggleSnapshots = () => {
    const newVal = !showSnapshots;
    setShowSnapshots(newVal);
    localStorage.setItem("app_show_snapshots", String(newVal));
  };

  const { dispatch } = useAppOrchestrator();
  const lastSeenUpdate = localStorage.getItem("app_last_seen_update");

  const groupedChangelog = useMemo(() => {
    const order: string[] = [];
    const groups: Record<string, { main: ChangeLogEntry | null; snapshots: ChangeLogEntry[] }> = {};

    changelog.forEach((entry) => {
      const v = entry.isSnapshot ? (entry.targetVersion || entry.version) : entry.version;

      if (!groups[v]) {
        groups[v] = { main: null, snapshots: [] };
        order.push(v);
      }

      if (entry.isSnapshot) {
        groups[v].snapshots.push(entry);
      } else {
        groups[v].main = entry;
      }
    });

    return order.map((v) => ({
      version: v,
      ...groups[v],
    })).filter(group => {
      if (!showSnapshots && !group.main) return false;
      return true;
    });
  }, [changelog, showSnapshots]);

  const renderEntryItems = (entry: ChangeLogEntry, isLatest: boolean, isSubVersion = false) => {
    return (
      <ul className={`space-y-1.5 ${isSubVersion ? "ml-4 border-l-2 border-slate-100 pl-4 py-2" : ""}`}>
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
    );
  };

  return (
    <div className="relative space-y-8 px-2 py-2">
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <FlaskConical size={16} className="text-blue-500" />
          <span>{t("changelog.show_development_versions")}</span>
        </div>
        <button
          onClick={handleToggleSnapshots}
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${showSnapshots ? 'bg-blue-500' : 'bg-slate-300'}`}
        >
          <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${showSnapshots ? 'translate-x-2' : '-translate-x-2'}`} />
        </button>
      </div>

      <div className="absolute top-20 bottom-4 left-[1.65rem] w-px bg-slate-200" />

      {groupedChangelog.map((group, groupIdx) => {
        const hasMain = !!group.main;
        const mainEntry = group.main;

        const isLatestMain = hasMain ? isItemNew(mainEntry!, "update", lastSeenUpdate) : false;

        return (
          <div key={groupIdx} className={`relative flex flex-col gap-5 ${isLatestMain ? "mb-2" : ""}`}>
            <div className="relative flex gap-5">
              <div
                className={`
                  z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-white transition-colors
                  ${isLatestMain
                    ? "bg-emerald-600 text-white shadow-lg ring-2 shadow-emerald-200 ring-emerald-50"
                    : (!hasMain ? "bg-amber-100 text-amber-600 border-dashed border-amber-200" : "bg-slate-100 text-slate-500 shadow-xs")
                  }
                `}
              >
                <span className={`text-[10px] font-bold ${!hasMain ? "text-amber-700" : ""}`}>
                  v{group.version}
                </span>
              </div>

              <div
                className={`
                  flex-1 space-y-2 pt-0.5
                  ${isLatestMain ? "-mt-2 -mr-2 rounded-xl bg-emerald-50/50 p-3 ring-1 ring-emerald-100/50" : ""}
                  ${!hasMain ? "opacity-90" : ""}
                `}
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-sm font-bold ${isLatestMain ? "text-emerald-900" : (!hasMain ? "text-amber-700" : "text-slate-700")}`}>
                      {hasMain ? mainEntry!.title[lang] : t("changelog.in_development")}
                    </h4>
                    {isLatestMain && (
                      <span className="inline-flex animate-pulse items-center rounded-full bg-emerald-600 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white uppercase shadow-sm">
                        {t("changelog.new")}
                      </span>
                    )}
                    {!hasMain && (
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-amber-700 uppercase shadow-xs">
                        {t("changelog.upcoming")}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] font-medium tracking-wide uppercase ${isLatestMain ? "text-emerald-400" : "text-slate-400"}`}>
                    {hasMain ? mainEntry!.date : "-"}
                  </span>
                </div>

                {hasMain && renderEntryItems(mainEntry!, isLatestMain, false)}
              </div>
            </div>

            {showSnapshots && group.snapshots.length > 0 && (
              <div className="ml-16 mt-[-10px] flex flex-col gap-6">
                {group.snapshots.map((snap, snapIdx) => {
                  const isLatestSnap = isItemNew(snap, "update", lastSeenUpdate);

                  return (
                    <div key={snapIdx} className="relative flex gap-4">
                      <div className="absolute -left-10 top-2 bottom-0 w-6 rounded-bl-xl border-b-2 border-l-2 border-slate-200" style={{ height: '0.5rem' }} />

                      <div className="z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-500 shadow-xs border-2 border-white">
                        <GitCommitVertical size={12} />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-blue-600">
                              {snap.version}
                            </span>
                            <span className="text-[11px] font-medium text-slate-500">
                              {snap.title[lang]}
                            </span>
                            {isLatestSnap && (
                              <span className="inline-flex animate-pulse items-center rounded-full bg-blue-500 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white uppercase shadow-sm">
                                {t("changelog.new")}
                              </span>
                            )}
                          </div>
                          <span className="text-[9px] font-medium tracking-wide uppercase text-slate-400">
                            {snap.date}
                          </span>
                        </div>
                        {renderEntryItems(snap, isLatestSnap, true)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}