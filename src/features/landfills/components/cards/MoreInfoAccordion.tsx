// src/features/landfills/components/cards/MoreInfoAccordion.tsx

import { useState } from "react";
import { useLanguageStore } from "@shared/state/languageStore";

interface MoreInfoAccordionProps {
  sections: Record<string, unknown>;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPrimitive(value: unknown): value is string | number | boolean {
  const t = typeof value;
  return t === "string" || t === "number" || t === "boolean";
}

function formatValue(value: unknown): string {
  if (value == null) return "";
  if (isPrimitive(value)) return String(value);
  return JSON.stringify(value);
}

function KeyValueList({ data }: { data: Record<string, unknown> }) {
  const entries = Object.entries(data).filter(([_, v]) => v != null);
  if (!entries.length) return null;

  return (
    <dl className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-x-2 gap-y-1 text-[11px]">
      {entries.map(([key, value]) => (
        <div key={key} className="contents">
          <dt className="truncate text-slate-500 font-medium">{key}</dt>
          <dd className="text-right text-slate-700">{formatValue(value)}</dd>
        </div>
      ))}
    </dl>
  );
}

function TableBlock({ title, rows }: { title: string; rows: Record<string, unknown>[] }) {
  if (!rows.length) return null;
  const allKeys = Array.from(new Set(rows.flatMap((r) => Object.keys(r))));

  return (
    <div className="space-y-1 rounded-lg border border-slate-200 bg-slate-50/50 p-2">
      <div className="text-[11px] font-semibold text-slate-600">{title}</div>
      <div className="max-h-40 overflow-auto rounded border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full border-collapse text-[10px]">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr>
              {allKeys.map((k) => (
                <th key={k} className="border-b border-slate-200 px-2 py-1.5 text-left font-semibold text-slate-500">
                  {k}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="odd:bg-white even:bg-slate-50/60 hover:bg-slate-50 transition-colors">
                {allKeys.map((k) => (
                  <td key={k} className="border-b border-slate-100 px-2 py-1 align-top text-slate-700">
                    {formatValue(row[k])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SubSectionBlock({ title, value }: { title: string; value: unknown }) {
  if (Array.isArray(value)) {
    const array = value.filter(isPlainObject) as Record<string, unknown>[];
    if (!array.length) return null;
    return <TableBlock title={title} rows={array} />;
  }

  if (isPlainObject(value)) {
    const entries = Object.entries(value).filter(([_, v]) => v != null);
    if (!entries.length) return null;

    const leaf: Record<string, unknown> = {};
    const nested: [string, Record<string, unknown>][] = [];

    for (const [k, v] of entries) {
      if (isPlainObject(v)) nested.push([k, v]);
      else leaf[k] = v;
    }

    return (
      <div className="space-y-1 rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm">
        <div className="text-[11px] font-bold text-slate-700 pb-1 border-b border-slate-50 mb-1">{title}</div>
        {Object.keys(leaf).length > 0 && <KeyValueList data={leaf} />}
        {nested.length > 0 && (
          <div className="mt-2 space-y-2">
            {nested.map(([k, v]) => (
              <div key={k} className="space-y-0.5 rounded border border-slate-200 bg-slate-50/50 p-2">
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{k}</div>
                <KeyValueList data={v} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const display = formatValue(value);
  if (!display) return null;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm flex justify-between items-center">
      <div className="text-[11px] font-semibold text-slate-600">{title}</div>
      <div className="text-[11px] text-slate-800 font-medium">{display}</div>
    </div>
  );
}

function TopLevelSection({ title, data }: { title: string; data: Record<string, unknown> }) {
  const [open, setOpen] = useState(false);
  const subEntries = Object.entries(data).filter(([_, v]) => v != null);
  if (!subEntries.length) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all duration-200">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-3 py-2.5 text-left text-[11px] font-bold text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <span>{title}</span>
        <span className={`ml-2 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
           ▾
        </span>
      </button>
      {open && (
        <div className="space-y-2 border-t border-slate-100 bg-slate-50/30 px-2.5 py-3 animate-in slide-in-from-top-1 duration-200">
          {subEntries.map(([subTitle, value]) => (
            <SubSectionBlock key={subTitle} title={subTitle} value={value} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------- Componente Principal ------------------- */

export function MoreInfoAccordion({ sections }: MoreInfoAccordionProps) {
  const [open, setOpen] = useState(false);
  const { t, currentLanguage } = useLanguageStore();

  const entries = Object.entries(sections ?? {}).filter(
    ([_, value]) => value && typeof value === "object",
  );

  if (!entries.length) return null;

  return (
    <section className="pt-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`
          flex w-full items-center justify-between rounded-xl border px-3 py-2.5 transition-all duration-200
          ${open 
            ? "bg-white border-slate-300 shadow-md ring-1 ring-slate-100" 
            : "bg-slate-100/50 border-transparent hover:bg-slate-200/50 hover:border-slate-200"
          }
        `}
      >
        <span className="text-[11px] font-semibold text-slate-700">
          {t("selection.cards.more_info.button")}
        </span>
        <span className={`ml-2 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {open && (
        <div className="mt-3 max-h-[40vh] space-y-2 overflow-y-auto rounded-xl border border-slate-200 bg-slate-100/50 p-2 shadow-inner animate-in fade-in slide-in-from-top-2 duration-200">
          {entries
            .sort(([a], [b]) => a.localeCompare(b, currentLanguage))
            .map(([title, value]) =>
              isPlainObject(value) ? (
                <TopLevelSection key={title} title={title} data={value} />
              ) : null,
            )}
        </div>
      )}
    </section>
  );
}