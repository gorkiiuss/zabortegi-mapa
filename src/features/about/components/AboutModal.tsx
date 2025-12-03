import { useLanguageStore } from "@shared/state/languageStore";

import { useAboutModalLogic } from "../hooks/useAboutModalLogic";
import {
  Chip,
  LanguageSelector,
  AccordionItem,
} from "./ui/AboutSharedComponents";
import { GithubIcon, WebIcon, InfoIcon, SparklesIcon } from "./ui/AboutIcons";
import { ChangelogSection } from "./sections/ChangelogSection";
import { ProjectInfoSection } from "./sections/ProjectInfoSection";
const BASE_URL = import.meta.env.BASE_URL;
const PORTADA = (import.meta.env.VITE_MEDIA_BASE_URL as string | undefined)
  ? `${import.meta.env.VITE_MEDIA_BASE_URL}/imagenes/portada.png`
  : `${BASE_URL}imagenes/portada.png`;

export function AboutModal() {
  const { t } = useLanguageStore();

  const {
    modalRef,
    handleMouseEnter,
    handleMouseLeave,
    handleClose,
    handleOpenAttributions,
    activeSection,
    toggleSection,
    isLatestVersionNew,
    appVersion,
  } = useAboutModalLogic();

  return (
    <div
      ref={modalRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="pointer-events-auto relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
    >
      {/* Botón Cerrar */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 z-50 rounded-full border border-slate-200 bg-white/80 p-2 text-slate-500 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-slate-800"
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

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto overscroll-contain bg-slate-50/30 pb-8">
        {/* 1. HERO SECTION */}
        <div className="group relative h-56 w-full bg-slate-900 sm:h-64">
          <img
            src={PORTADA}
            alt="Portada"
            className="h-full w-full object-cover object-top opacity-90"
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

        {/* 2. CONTENIDO PRINCIPAL */}
        <div className="relative z-10 -mt-6 space-y-6 px-6">
          {/* Navegación y Chips */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Chip
                href="https://github.com/gorkiiuss/zabortegi-mapa"
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
            <div className="flex shrink-0 items-center gap-3">
              <span className="font-mono text-[10px] font-medium text-slate-400 select-none">
                v{appVersion}
              </span>
              <LanguageSelector />
            </div>
          </div>

          {/* Acordeones */}
          <div className="space-y-3">
            {/* A. Novedades */}
            <AccordionItem
              title={t("about.accordion.whats_new") || "Novedades"}
              isOpen={activeSection === "updates"}
              onClick={() => toggleSection("updates")}
              icon={<SparklesIcon />}
              activeColorClass="emerald"
              badge={isLatestVersionNew ? t("about.accordion.new_excl") : null}
            >
              <ChangelogSection highlightLatest={isLatestVersionNew} />
            </AccordionItem>

            {/* B. Info Proyecto */}
            <AccordionItem
              title={
                t("about.accordion.project_info") || "Información del Proyecto"
              }
              isOpen={activeSection === "info"}
              onClick={() => toggleSection("info")}
              icon={<InfoIcon />}
              activeColorClass="slate"
            >
              <ProjectInfoSection />
            </AccordionItem>
          </div>
        </div>
      </div>
    </div>
  );
}
