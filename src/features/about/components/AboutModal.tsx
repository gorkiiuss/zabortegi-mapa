import { useEffect, useLayoutEffect } from "react";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useUiStore } from "@features/map/state/uiStore";
import { useLanguageStore } from "@shared/state/languageStore";

// ─── 1. CONFIGURACIÓN E IMÁGENES ───
const BASE_URL = import.meta.env.BASE_URL;

const PORTADA = (import.meta.env.VITE_MEDIA_BASE_URL as string | undefined)
  ? `${import.meta.env.VITE_MEDIA_BASE_URL}/imagenes/portada.png`
  : `${BASE_URL}imagenes/portada.png`;

// ─── 2. INYECCIÓN DE ESTILOS DE ANIMACIÓN ───
const PULSE_STYLES = `
@keyframes landfill-pulse-ui {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4);
  }
  70% {
    transform: scale(1.02);
    box-shadow: 0 0 0 10px rgba(220, 38, 38, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(220, 38, 38, 0);
  }
}

.landfill-pulse-target {
  position: relative;
  z-index: 10;
  animation: landfill-pulse-ui 2s ease-out infinite;
  border-color: rgba(220, 38, 38, 0.5) !important;
}
`;

function ensureStylesInjected() {
  if (document.getElementById("landfill-pulse-styles")) return;
  const styleEl = document.createElement("style");
  styleEl.id = "landfill-pulse-styles";
  styleEl.textContent = PULSE_STYLES;
  document.head.appendChild(styleEl);
}

// ─── 3. COMPONENTE PRINCIPAL ───
export function AboutModal() {
  const { handleMouseEnter, handleMouseLeave, modalRef } =
    useMapModalInteractions();
  const { closeModal, toggleActiveModal } = useUiStore();
  const { t } = useLanguageStore();

  const handleClose = () => closeModal();
  const handleOpenAttributions = () => toggleActiveModal("attributions", true);

  useLayoutEffect(() => {
    ensureStylesInjected();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div
      ref={modalRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`pointer-events-auto relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl`}
    >
      {/* Botón de cierre flotante */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 z-50 rounded-full border border-slate-200 bg-white/80 p-2 text-slate-500 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-slate-800"
        aria-label="Cerrar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* ─── BODY (Scrollable) ─── */}
      <div className="flex-1 overflow-y-auto overscroll-contain bg-slate-50/30 pb-8">
        {/* HERO SECTION / PORTADA */}
        <div className="group relative h-56 w-full bg-slate-900 sm:h-64">
          <img
            src={PORTADA}
            alt="Portada"
            className="h-full w-full object-cover object-top opacity-90 transition-transform duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 w-full p-6 text-white">
            <div className="mb-2 inline-block animate-pulse rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold tracking-widest text-white uppercase shadow-lg">
              {t("about.hero.badge")}
            </div>
            <h1
              className="text-2xl leading-tight font-bold drop-shadow-md sm:text-3xl"
              dangerouslySetInnerHTML={{ __html: t("about.hero.title") }}
            />
            <p className="mt-2 mb-4 text-sm font-light text-slate-200 drop-shadow-sm">
              {t("about.hero.subtitle")}
            </p>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="relative z-10 -mt-6 space-y-8 px-6">
          {/* CHIPS */}
          <div className="flex flex-wrap justify-baseline gap-2 sm:justify-start">
            <Chip
              href="https://github.com/gorkiiuss/landfill-map"
              icon={<GithubIcon />}
              label={t("about.chips.code")}
            />
            <Chip
              href="https://ekologistakmartxan.org"
              icon={<WebIcon />}
              label="Ekologistak Martxan"
              iconHoverColor="text-green-600"
            />
            <button
              onClick={handleOpenAttributions}
              className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
              <InfoIcon /> {t("about.chips.credits")}
            </button>
          </div>

          {/* SECCIÓN 1: DATOS CLAVE */}
          <section className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="mb-4 text-sm leading-relaxed text-slate-600">
                {t("about.stats.intro")}
              </p>

              {/* Highlight Principal */}
              <div className="mb-6 flex justify-center">
                <div className="landfill-pulse-target inline-flex flex-col items-center justify-center rounded-xl border-2 border-red-100 bg-red-50 px-8 py-3 text-red-700">
                  <span className="text-4xl font-extrabold tracking-tight">
                    1.562
                  </span>
                  <span className="mt-1 text-xs font-bold tracking-wider uppercase">
                    {t("about.stats.total_label")}
                  </span>
                </div>
              </div>

              {/* Grid de Estadísticas */}
              <div className="grid grid-cols-2 gap-3">
                <StatBox label="Bizkaia" value="616" />
                <StatBox label="Gipuzkoa" value="451" />
                <StatBox label="Araba" value="258" />
                {/* Highlight Secundario */}
                <StatBox
                  label={t("about.stats.undocumented")}
                  value="237"
                  isPulse
                />
              </div>
            </div>
          </section>

          {/* SECCIÓN 2: MARCO LEGAL */}
          <section>
            <SectionTitle icon={<LegalIcon />}>
              {t("about.legal.title")}
            </SectionTitle>
            <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 text-sm shadow-sm">
              <div className="rounded-r-lg border-l-4 border-red-400 bg-slate-50 py-2 pr-2 pl-4 text-slate-600 italic">
                <p className="mb-1 text-xs font-bold text-slate-800 uppercase not-italic">
                  {t("about.legal.directive_name")}
                </p>
                {t("about.legal.directive_text")}
              </div>
              <p
                className="leading-relaxed text-slate-600"
                dangerouslySetInnerHTML={{
                  __html: t("about.legal.compliance"),
                }}
              />
            </div>
          </section>

          {/* SECCIÓN 3: IMPACTO */}
          <section>
            <SectionTitle icon={<DropIcon />}>
              {t("about.impact.title")}
            </SectionTitle>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white text-sm shadow-sm">
              <div className="border-b border-slate-100 p-5 text-slate-600">
                <p
                  dangerouslySetInnerHTML={{
                    __html: t("about.impact.problem"),
                  }}
                />
              </div>
              <div className="bg-linear-to-r from-emerald-50 to-white p-5 text-slate-700">
                <p className="mb-1 flex items-center gap-2 font-bold text-emerald-500">
                  <TargetIcon /> {t("about.impact.goal_title")}
                </p>
                <p
                  className="text-sm"
                  dangerouslySetInnerHTML={{
                    __html: t("about.impact.goal_text"),
                  }}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// ─── COMPONENTES AUXILIARES ───

function Chip({
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
      className={`group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50`}
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

function StatBox({
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
      className={`relative flex flex-col items-center justify-center overflow-hidden rounded-xl border p-3 text-center ${
        isPulse
          ? "landfill-pulse-target border-orange-200 bg-orange-50"
          : "border-slate-100 bg-slate-50"
      } `}
    >
      <span
        className={`text-xl font-black ${isPulse ? "text-orange-700" : "text-slate-700"}`}
      >
        {value}
      </span>
      <span
        className={`mt-0.5 text-[10px] font-bold tracking-wide uppercase ${isPulse ? "text-orange-600" : "text-slate-400"}`}
      >
        {label}
      </span>
    </div>
  );
}

function SectionTitle({
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

// ─── ICONOS ───
const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);
const WebIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);
const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);
const LegalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);
const DropIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
  </svg>
);
const TargetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);
