// src/features/landfills/components/details/fullDetails/SamplingsSection.tsx

import React from "react";
import { useLanguageStore } from "@shared/state/languageStore";
import type { SamplingEntity } from "@features/landfills/domain/entities/Sampling";
import { SampleTypeVO } from "@features/landfills/domain/valueObjects/sampling/SampleType";
import { SampleMatrixVO } from "@features/landfills/domain/valueObjects/sampling/results/SampleMatrix";
import { parseDisplay } from "./parseDisplay";

interface SamplingsSectionProps {
  samplings: SamplingEntity[];
}

export const SamplingsSection: React.FC<SamplingsSectionProps> = ({ samplings }) => {
  const { t, formatSeparatedDate } = useLanguageStore();

  return (
    <section id="full-details-section-samplings" className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-3">
        <h3 className="text-sm font-semibold text-slate-700">
          {t("domain.vos.sampling.title")}
        </h3>
      </div>

      <div className="flex flex-col gap-5 p-5">
        {samplings.map((sampling, sIdx) => {
          const samplingKey = sampling.id || String(sIdx);

          return (
            <div key={samplingKey} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-slate-50/80 p-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:items-center">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-slate-200/60 px-2 py-0.5 text-[10px] font-bold tracking-wider text-slate-600 uppercase">
                      {t("domain.vos.sampling.description")}
                    </span>
                    <span className="text-sm font-bold text-slate-800" title={sampling.description}>
                      {sampling.description || t("domain.vos.sampling.description_placeholder", { count: sIdx + 1 })}
                    </span>
                  </div>

                  <div className="flex flex-col sm:items-center gap-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:self-start md:ml-4">
                      {t("domain.vos.sampling.date")}
                    </span>
                    <span className="text-xs font-medium text-slate-600 sm:self-start md:ml-4">
                      {formatSeparatedDate(
                        String(sampling.samplingDate.getFullYear()),
                        String(sampling.samplingDate.getMonth() + 1).padStart(2, "0"),
                        String(sampling.samplingDate.getDate()).padStart(2, "0")
                      )}
                    </span>
                  </div>

                  <div className="flex flex-col sm:items-end gap-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {t("domain.vos.sampling.sampling_type.title")}
                    </span>
                    <span className="text-xs font-medium text-slate-600">
                      {parseDisplay(sampling.sampleType, SampleTypeVO, sampling, t, formatSeparatedDate)}
                    </span>
                  </div>
                </div>

                {sampling.location && (
                  <div className="mt-3 border-t border-slate-200/60 pt-2">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {t("domain.vos.sampling.location")}
                    </span>
                    <p className="mt-0.5 whitespace-normal wrap-break-word text-xs leading-relaxed text-slate-500">
                      {sampling.location}
                    </p>
                  </div>
                )}
              </div>

              {sampling.results && sampling.results.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="border-b border-slate-100 bg-white text-[10px] uppercase tracking-wider text-slate-400">
                      <tr>
                        <th className="px-4 py-2 font-medium">{t("domain.vos.sampling.results.parameters")}</th>
                        <th className="px-4 py-2 font-medium">{t("domain.vos.sampling.results.sample_matrix.title")}</th>
                        <th className="px-4 py-2 text-right font-medium">{t("domain.vos.sampling.results.results")}</th>
                        <th className="px-4 py-2 text-right font-medium">{t("domain.vos.sampling.results.legal_limits")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {sampling.results.map((res, rIdx) => {
                        const isOverLimit = res.parameter.legalLimit !== null && res.resultValue > res.parameter.legalLimit;

                        return (
                          <tr key={rIdx} className="transition-colors hover:bg-slate-50/50">
                            <td className="px-4 py-2">
                              <span className="block font-medium text-slate-700">{res.parameter.name}</span>
                              {res.parameter.family && (
                                <span className="block text-[10px] text-slate-400">{res.parameter.family}</span>
                              )}
                            </td>
                            <td className="px-4 py-2">
                              <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                                {parseDisplay(res.matrix, SampleMatrixVO, res, t, formatSeparatedDate)}
                              </span>
                            </td>
                            <td className="px-4 py-2 text-right">
                              <span className={`font-semibold ${isOverLimit ? "text-red-600" : "text-slate-700"}`}>
                                {res.resultOperator || ""} {res.resultValue}
                              </span>
                              {res.unit && <span className="ml-1 text-[10px] text-slate-500">{res.unit}</span>}
                            </td>
                            <td className="px-4 py-2 text-right text-slate-400">
                              {res.parameter.legalLimit !== null ? (
                                <span>{res.parameter.legalLimit} {res.unit}</span>
                              ) : (
                                <span className="text-slate-300">-</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-white px-4 py-3 text-xs italic text-slate-400">
                  {t("domain.vos.sampling.results.no_results")}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
