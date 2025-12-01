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
          <dt className="truncate text-slate-500">{key}</dt>
          <dd className="text-right text-slate-700">{formatValue(value)}</dd>
        </div>
      ))}
    </dl>
  );
}

function TableBlock({
  title,
  rows,
}: {
  title: string;
  rows: Record<string, unknown>[];
}) {
  if (!rows.length) return null;

  const allKeys = Array.from(new Set(rows.flatMap((r) => Object.keys(r))));

  return (
    <div className="space-y-1 rounded-lg border border-slate-100 bg-slate-50/80 p-2">
      <div className="text-[11px] font-medium text-slate-600">{title}</div>
      <div className="max-h-40 overflow-auto rounded border border-slate-100 bg-white">
        <table className="min-w-full border-collapse text-[10px]">
          <thead className="bg-slate-50">
            <tr>
              {allKeys.map((k) => (
                <th
                  key={k}
                  className="border-b border-slate-100 px-2 py-1 text-left font-semibold text-slate-500"
                >
                  {k}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="odd:bg-white even:bg-slate-50/60">
                {allKeys.map((k) => (
                  <td
                    key={k}
                    className="border-b border-slate-100 px-2 py-1 align-top"
                  >
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
      if (isPlainObject(v)) {
        nested.push([k, v]);
      } else {
        leaf[k] = v;
      }
    }

    return (
      <div className="space-y-1 rounded-lg border border-slate-100 bg-white p-2">
        <div className="text-[11px] font-semibold text-slate-600">{title}</div>
        {Object.keys(leaf).length > 0 && <KeyValueList data={leaf} />}
        {nested.length > 0 && (
          <div className="mt-1 space-y-1.5">
            {nested.map(([k, v]) => (
              <div
                key={k}
                className="space-y-0.5 rounded border border-slate-100 bg-slate-50/80 p-1.5"
              >
                <div className="text-[10px] font-medium text-slate-600">
                  {k}
                </div>
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
    <div className="rounded-lg border border-slate-100 bg-white p-2">
      <div className="text-[11px] font-semibold text-slate-600">{title}</div>
      <div className="text-[11px] text-slate-700">{display}</div>
    </div>
  );
}

function TopLevelSection({
  title,
  data,
}: {
  title: string;
  data: Record<string, unknown>;
}) {
  const [open, setOpen] = useState(false);
  const subEntries = Object.entries(data).filter(([_, v]) => v != null);
  if (!subEntries.length) return null;

  return (
    <div className="rounded-xl border border-slate-100 bg-white/80">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-2.5 py-1.5 text-left text-[11px] font-semibold text-slate-700"
      >
        <span>{title}</span>
        <span className="ml-2 text-slate-400">{open ? "▾" : "▸"}</span>
      </button>
      {open && (
        <div className="space-y-1.5 border-t border-slate-100 px-2.5 py-2 text-[11px]">
          {subEntries.map(([subTitle, value]) => (
            <SubSectionBlock key={subTitle} title={subTitle} value={value} />
          ))}
        </div>
      )}
    </div>
  );
}

export function MoreInfoAccordion({ sections }: MoreInfoAccordionProps) {
  const [open, setOpen] = useState(false);
  const { t, currentLanguage } = useLanguageStore(); // Traemos idioma actual

  const entries = Object.entries(sections ?? {}).filter(
    ([_, value]) => value && typeof value === "object",
  );

  if (!entries.length) return null;

  const buttonTextClasses = "text-[11px] font-semibold";

  return (
    <section>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 hover:bg-slate-100`}
      >
        <span className={buttonTextClasses}>
          {t("selection.cards.more_info.button")}
        </span>
        <span className="ml-2 text-slate-400">{open ? "▾" : "▸"}</span>
      </button>

      {open && (
        <div className="mt-2 max-h-[30vh] space-y-2 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50/70 p-2">
          {entries
            // Usamos el idioma actual para la ordenación
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
