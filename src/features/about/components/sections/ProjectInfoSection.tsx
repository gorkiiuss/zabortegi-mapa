import { useLanguageStore } from "@shared/state/languageStore";
import { useUiStore } from "@features/map/state/uiStore";
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
        {/* BLOQUE DESTACADO: 40.404 Presiones */}
        <div className="flex justify-center mb-2">
          <div className="relative inline-flex flex-col items-center justify-center rounded-xl border-2 border-amber-200 bg-amber-50 px-8 py-3 pb-8 text-amber-800 shadow-sm transition-all hover:shadow-md w-full sm:w-auto">
            <span className="text-4xl font-extrabold tracking-tight drop-shadow-xs">
              40.404
            </span>
            <span className="mt-1 text-xs font-bold tracking-wider uppercase text-center">
              {t("about.stats.contaminated_soils")}
            </span>
            <button
              onClick={() =>
                useUiStore.getState().openModal("about", false, {
                  initialTab: "announcements",
                  targetAnnouncementId: "aclaracion-40404-2026",
                })
              }
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-amber-300 bg-white px-3 py-1 text-[10px] font-bold text-amber-700 shadow-sm hover:scale-105 hover:bg-amber-100 transition-transform cursor-pointer"
            >
              {t("about.stats.contaminated_soils" as any)} + Info
            </button>
          </div>
        </div>

        {/* CONTENEDOR INVENTARIO (Texto introductorio + Resto de estadísticas) */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
          <p className="mb-4 text-sm leading-relaxed text-slate-600">
            {t("about.stats.intro")}
          </p>

          <div className="mb-6 flex flex-col gap-4">

            <div className="flex justify-center">
              <div className="landfill-pulse-target inline-flex flex-col items-center justify-center rounded-xl border-2 border-red-100 bg-red-50 px-8 py-3 text-red-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <span className="text-4xl font-extrabold tracking-tight drop-shadow-xs">
                  {fmt(stats.total)}
                </span>
                <span className="mt-1 text-xs font-bold tracking-wider uppercase text-center">
                  {t("about.stats.total_label")}
                </span>
              </div>
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