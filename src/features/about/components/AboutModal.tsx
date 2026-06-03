// src/features/about/components/AboutModal.tsx

import { useRef, useCallback, useEffect } from "react";
import { useLanguageStore } from "@shared/state/languageStore";

import { useAboutModalLogic, type AboutTab } from "../hooks/useAboutModalLogic";
import { Chip } from "./ui/AboutSharedComponents";
import { LanguageSelector } from "@shared/components/LanguageSelector";
import { ChangelogSection } from "./sections/ChangelogSection";
import { ProjectInfoSection } from "./sections/ProjectInfoSection";
import { Github, Globe, Info, Megaphone, Sparkles, X } from "@shared/components/Icons";
import { AnnouncementsSection } from "./sections/AnnouncementsSection";

const BASE_URL = import.meta.env.BASE_URL;
const PORTADA = (import.meta.env.VITE_MEDIA_BASE_URL as string | undefined)
  ? `${import.meta.env.VITE_MEDIA_BASE_URL}/imagenes/portada.png`
  : `${BASE_URL}assets/ui/portada.png`;

export function AboutModal() {
  const { t } = useLanguageStore();

  const {
    modalRef,
    handleMouseEnter,
    handleMouseLeave,
    handleClose,
    handleOpenAttributions,
    activeTab,
    setActiveTab,
    hasUnseenAnnouncement,
    hasUnseenUpdate,
    appVersion,
    targetAnnouncementId,
    scrollTop,
    setScrollTop,
  } = useAboutModalLogic();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current && scrollTop > 0) {
      scrollContainerRef.current.scrollTop = scrollTop;
    }
  }, []);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    },
    [setScrollTop]
  );

  const renderTab = (
    id: AboutTab,
    icon: React.ReactNode,
    label: string,
    hasNotificationDot: boolean
  ) => {
    const isActive = activeTab === id;
    return (
      <button
        onClick={() => {
          setActiveTab(id);
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
          }
        }}
        className={`relative flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors outline-none ${isActive
          ? "border-emerald-500 text-emerald-700 bg-emerald-50/10"
          : "border-transparent text-slate-500 hover:border-slate-200 hover:text-slate-700"
          }`}
      >
        {icon}
        {label}
        {hasNotificationDot && (
          <span className="absolute top-2 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
        )}
      </button>
    );
  };

  return (
    <div
      ref={modalRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="pointer-events-auto relative flex h-full w-full flex-col overflow-hidden rounded-none sm:rounded-2xl border-0 sm:border border-slate-200 bg-white shadow-2xl"
    >
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 z-50 rounded-full border border-slate-200 bg-white/80 p-2 text-slate-500 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-slate-800"
      >
        <X />
      </button>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto overscroll-contain bg-slate-50/30"
      >
        <div className="group relative h-24 w-full shrink-0 bg-slate-900 sm:h-56">
          <img
            src={PORTADA}
            alt="Portada"
            className="h-full w-full object-cover object-top opacity-90"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 text-white">
            <div className="mb-1 sm:mb-2 inline-block animate-pulse rounded bg-red-600 px-2 py-0.5 text-[10px] sm:text-xs font-bold tracking-widest text-white uppercase shadow-lg">
              {t("about.hero.badge")}
            </div>
            <h1
              className="text-xl sm:text-3xl leading-tight font-bold drop-shadow-md"
              dangerouslySetInnerHTML={{ __html: t("about.hero.title") }}
            />
            <p className="mt-1 sm:mt-2 mb-0 text-xs sm:text-sm font-light text-slate-200 drop-shadow-sm">
              {t("about.hero.subtitle")}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-white px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
          <div className="flex flex-wrap gap-2">
            <Chip href="https://github.com/gorkiiuss/zabortegi-mapa" icon={<Github />} label={t("about.chips.code")} />
            <Chip href="https://ekologistakmartxan.org" icon={<Globe />} label="Ekologistak Martxan" iconHoverColor="text-green-600" />
            <button onClick={handleOpenAttributions} className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
              <Info /> {t("about.chips.credits")}
            </button>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="font-mono text-[10px] font-medium text-slate-400 select-none">{appVersion}</span>
            <LanguageSelector />
          </div>
        </div>

        <div className="sticky top-0 z-20 flex w-full overflow-x-auto whitespace-nowrap hide-scrollbar border-b border-slate-200 bg-white px-2 sm:px-4 shadow-xs">
          {renderTab("announcements", <Megaphone size={16} />, t("about.tabs.announcements_title") || "Avisos", hasUnseenAnnouncement)}
          {renderTab("changelog", <Sparkles size={16} />, t("about.tabs.whats_new") || "Novedades", hasUnseenUpdate)}
          {renderTab("project", <Info size={16} />, t("about.tabs.project_info") || "Proyecto", false)}
        </div>

        <div className="p-4 pb-12 sm:p-6 sm:pb-12">
          <div className="mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className={activeTab === "announcements" ? "block" : "hidden"}>
              <AnnouncementsSection targetId={targetAnnouncementId} isActive={activeTab === "announcements"} />
            </div>
            <div className={activeTab === "changelog" ? "block" : "hidden"}>
              <ChangelogSection />
            </div>
            <div className={activeTab === "project" ? "block" : "hidden"}>
              <ProjectInfoSection />
            </div>
          </div>
        </div>
      </div>
    </div>);
}
