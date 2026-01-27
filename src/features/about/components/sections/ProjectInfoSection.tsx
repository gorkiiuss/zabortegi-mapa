import { useLanguageStore } from "@shared/state/languageStore";
import { StatBox, SectionTitle } from "../ui/AboutSharedComponents";
import { Droplet, Scale, Target } from "@shared/components/Icons";
import { useLandfillGeneralStats } from "@features/landfills/hooks/useLandfillGeneralStats";

export function ProjectInfoSection() {
  const { t } = useLanguageStore();
  const { stats, loading } = useLandfillGeneralStats();

  const fmt = (n: number) => 
    loading ? "..." : new Intl.NumberFormat("es-ES").format(n);

  return (
    <div className="space-y-8 pt-2">
      <section className="space-y-4">
        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
          <p className="mb-4 text-sm leading-relaxed text-slate-600">
            {t("about.stats.intro")}
          </p>

          <div className="mb-6 flex justify-center">
            <div className="landfill-pulse-target inline-flex flex-col items-center justify-center rounded-xl border-2 border-red-100 bg-red-50 px-8 py-3 text-red-700">
              <span className="text-4xl font-extrabold tracking-tight">
                {fmt(stats.total)}
              </span>
              <span className="mt-1 text-xs font-bold tracking-wider uppercase">
                {t("about.stats.total_label")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <StatBox label="Bizkaia" value={fmt(stats.byTerritory.Bizkaia)} />
            <StatBox label="Gipuzkoa" value={fmt(stats.byTerritory.Gipuzkoa)} />
            <StatBox label="Araba" value={fmt(stats.byTerritory.Araba)} />
            
            <StatBox
              label={t("about.stats.undocumented")}
              value={fmt(stats.undocumented)}
              isPulse
            />
          </div>
        </div>
      </section>

      <section>
        <SectionTitle icon={<Scale />}>{t("about.legal.title")}</SectionTitle>
        <div className="space-y-4 text-sm">
           <div className="rounded-r-lg border-l-4 border-red-400 bg-slate-50 py-2 pr-2 pl-4 text-slate-600 italic">
            <p className="mb-1 text-xs font-bold text-slate-800 uppercase not-italic">
              {t("about.legal.directive_name")}
            </p>
            {t("about.legal.directive_text")}
          </div>
          <p
            className="leading-relaxed text-slate-600"
            dangerouslySetInnerHTML={{ __html: t("about.legal.compliance") }}
          />
        </div>
      </section>

      <section>
        <SectionTitle icon={<Droplet />}>{t("about.impact.title")}</SectionTitle>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white text-sm shadow-sm">
          <div className="border-b border-slate-100 p-5 text-slate-600">
            <p dangerouslySetInnerHTML={{ __html: t("about.impact.problem") }} />
          </div>
          <div className="bg-linear-to-r from-emerald-50 to-white p-5 text-slate-700">
            <p className="mb-1 flex items-center gap-2 font-bold text-emerald-500">
              <Target /> {t("about.impact.goal_title")}
            </p>
            <p
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: t("about.impact.goal_text") }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}