// src/features/landfills/components/details/fullDetails/DetailSection.tsx

import React from "react";
import { ShieldAlert, Mail } from "lucide-react";
import { useLanguageStore } from "@shared/state/languageStore";
import type { TxKeyPath } from "i18n/config";
import { getAlertTagStyles } from "@features/landfills/config/styling";

interface DetailSectionProps {
  voKey?: string;
  titleKey: TxKeyPath;
  rows: {
    labelKey: TxKeyPath;
    value: string | null;
    score: number | null;
    fullWidth?: boolean;
  }[];
  hasSensitiveData: boolean;
  code: string | null;
}

export const DetailSection: React.FC<DetailSectionProps> = ({
  voKey,
  titleKey,
  rows,
  hasSensitiveData,
  code,
}) => {
  const { t } = useLanguageStore();

  return (
    <section
      id={voKey ? `full-details-section-${voKey}` : undefined}
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-3">
        <h3 className="text-sm font-semibold text-slate-700">{t(titleKey)}</h3>
      </div>

      <div className="grid grid-cols-1 gap-y-4 gap-x-6 px-5 py-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map(({ labelKey, value, score, fullWidth }) => (
          <div
            key={labelKey}
            className={`flex flex-col gap-1 ${fullWidth ? "sm:col-span-2 lg:col-span-3" : ""
              }`}
          >
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
              {t(labelKey)}
            </span>
            <div className="flex items-center">
              {score !== null ? (
                <span
                  style={getAlertTagStyles(score)}
                  className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold border transition-colors duration-350"
                >
                  {value}
                </span>
              ) : (
                <span className="text-sm text-slate-800 leading-snug whitespace-pre-wrap">
                  {value}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {voKey === "operation" && (
        <div className="border-t border-slate-100 bg-slate-50/30 px-5 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          {hasSensitiveData ? (
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 text-amber-900 max-w-2xl">
              <ShieldAlert size={18} className="mt-0.5 shrink-0 text-amber-600" />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold">
                  {t("details.cards.ownership.protected_title")}
                </span>
                <span className="text-[11px] text-amber-800/80 leading-normal">
                  {t("details.cards.ownership.protected_desc")}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500" />
          )}

          <a
            href={`mailto:pd.gorka.lab@gmail.com?subject=Revisión de privacidad - Vertedero ${code || "desconocido"}`}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-xs hover:bg-slate-50 transition-colors"
          >
            <Mail size={14} className="text-slate-400" />
            <span>
              {hasSensitiveData
                ? t("details.cards.ownership.report_protected")
                : t("details.cards.ownership.report_public")}
            </span>
          </a>
        </div>
      )}
    </section>
  );
};
