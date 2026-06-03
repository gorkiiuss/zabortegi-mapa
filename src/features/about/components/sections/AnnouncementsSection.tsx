// src/features/about/components/sections/AnnouncementsSection.tsx

import { useLanguageStore } from "@shared/state/languageStore";
import { FileText, ExternalLink, MapPin, Calendar, Folder } from "@shared/components/Icons";
import { useLandfillsStore } from "@features/landfills/state/landfillsStore";
import { useLandfillNavigation } from "@features/landfills/hooks/useLandfillNavigation";
import { useNewsStore } from "@features/about/state/newsStore";
import { WidgetRenderer } from "../widgets/WidgetRenderer";
import { DropdownMenu } from "@shared/components/DropdownMenu";
import { useEffect, useState } from "react";
import { shareUtils } from "@shared/utils/sharing";
import { Share } from "@shared/components/Icons";
import { isItemNew } from "@features/about/utils/isNew";
import { useUiStore } from "@features/map/state/uiStore";
interface AnnouncementsSectionProps {
  targetId?: string;
  isActive: boolean;
}

export function AnnouncementsSection({ targetId, isActive }: AnnouncementsSectionProps) {
  const { currentLanguage, t, formatDate } = useLanguageStore();

  const { toggleActiveModal } = useUiStore();
  const { landfillsSummary } = useLandfillsStore();
  const { navigateById } = useLandfillNavigation();
  const announcements = useNewsStore((s) => s.announcements);

  const [openShareId, setOpenShareId] = useState<string | null>(null);

  useEffect(() => {
    if (targetId && isActive) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`announcement-${targetId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });

          useUiStore.setState((state) => {
            if (!state.modalData || !('initialTab' in state.modalData)) return state;

            return {
              ...state,
              modalData: {
                ...state.modalData,
                targetAnnouncementId: undefined
              }
            };
          });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [targetId, isActive]);

  const activePosts = announcements.filter((a) => a.active);
  const sortedPosts = activePosts.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (sortedPosts.length === 0) {
    return (
      <div className="flex h-40 flex-col items-center justify-center text-sm text-slate-400">
        <p>{t("about.tabs.announcements.no_active_announcements")}</p>
      </div>
    );
  }

  const lastSeenAnnouncementId = localStorage.getItem("app_last_seen_announcement");
  const lastSeenAnnouncementDate = lastSeenAnnouncementId
    ? announcements.find((a) => a.id === lastSeenAnnouncementId)?.date || null
    : null;

  return (
    <div className="space-y-12 py-4">
      {sortedPosts.map((post) => {
        const isLatest = isItemNew(post, "announcement", lastSeenAnnouncementDate);

        return (
          <article
            key={post.id}
            id={`announcement-${post.id}`}
            className={`group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-md ${isLatest ? "border-emerald-200 ring-1 ring-emerald-100" : "border-slate-200"
              }`}
          >
            <div className={`absolute left-0 top-0 h-full w-1 transition-opacity ${isLatest ? "bg-emerald-500 opacity-100" : "bg-linear-to-b from-blue-400 to-emerald-400 opacity-0 group-hover:opacity-100"}`} />

            <div className="p-4 sm:p-8">

              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <Calendar className="h-3 w-3" />
                  <time dateTime={post.date}>
                    {formatDate ? formatDate(post.date, 'numeric') : post.date}
                  </time>
                </div>

                <div className="relative">
                  <DropdownMenu
                    isOpen={openShareId === post.id}
                    onClose={() => setOpenShareId(null)}
                    align="right"
                    trigger={
                      <button
                        onClick={() => setOpenShareId(openShareId === post.id ? null : post.id)}
                        className="group flex items-center gap-2 rounded-full border border-transparent bg-white px-3 py-1.5 text-xs font-medium text-slate-400 transition-all hover:border-slate-100 hover:bg-slate-50 hover:text-blue-600 hover:shadow-sm"
                        aria-label="Compartir"
                      >
                        <Share size={14} />
                        <span>{t("about.announcements.share")}</span>
                      </button>
                    }
                    items={[
                      {
                        label: "WhatsApp",
                        action: () => {
                          shareUtils.whatsapp({ title: post.title[currentLanguage], id: post.id });
                          setOpenShareId(null);
                        }
                      },
                      {
                        label: "Bluesky",
                        action: () => {
                          shareUtils.bluesky({ title: post.title[currentLanguage], id: post.id });
                          setOpenShareId(null);
                        }
                      },
                      {
                        label: "Mastodon",
                        action: () => {
                          shareUtils.mastodon({ title: post.title[currentLanguage], id: post.id });
                          setOpenShareId(null);
                        }
                      },
                      {
                        label: "Facebook",
                        action: () => {
                          shareUtils.facebook({ title: post.title[currentLanguage], id: post.id });
                          setOpenShareId(null);
                        }
                      },
                      {
                        label: "Email",
                        action: () => {
                          shareUtils.email({ title: post.title[currentLanguage], id: post.id });
                          setOpenShareId(null);
                        }
                      },
                      {
                        label: t("toolbar.copy_link") || "Copiar enlace",
                        action: () => {
                          shareUtils.copyLink({ title: post.title[currentLanguage], id: post.id });
                          setOpenShareId(null);
                        }
                      }
                    ]}
                  />
                </div>
              </div>

              <h3 className="mb-3 sm:mb-4 flex items-center flex-wrap gap-2 text-xl sm:text-2xl font-bold leading-tight text-slate-800">
                {post.title[currentLanguage]}
                {isLatest && (
                  <span className="inline-flex animate-pulse items-center rounded-full bg-emerald-600 px-2 py-0.5 text-[11px] sm:text-xs font-bold tracking-wider text-white uppercase shadow-sm">
                    {currentLanguage === "es" ? "Nuevo" : "Berria"}
                  </span>
                )}
              </h3>

              <WidgetRenderer widgets={post.widgets} />

              <div
                className="text-sm prose prose-sm prose-slate max-w-none text-slate-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content[currentLanguage] }}
              />

              {(post.relatedLandfillIds?.length || post.attachments?.length) ? (
                <div className="mt-8 flex flex-col gap-6 border-t border-slate-100 pt-6">

                  {post.relatedLandfillIds && post.relatedLandfillIds.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        {t("about.announcements.mentioned_in")}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {post.relatedLandfillIds.map((id) => {
                          const lf = landfillsSummary.find((l) => l.id === id);
                          if (!lf) return null;
                          return (
                            <button
                              key={id}
                              onClick={() => navigateById(id)}
                              className="group/btn flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                            >
                              <MapPin size={12} className="text-slate-400 transition-colors group-hover/btn:text-blue-500" />
                              {lf.name ? lf.name : t("domain.entities.landfill_summary.name_placeholder")}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {post.attachments && post.attachments.length > 0 && (
                    <div className="flex flex-col gap-3">
                      {post.attachments.map((att, idx) => {
                        const lang = currentLanguage;
                        if (att.type === "pdf" || att.type === "folder") {
                          const isFolder = att.type === "folder";
                          const Icon = isFolder ? Folder : FileText;
                          const label = typeof att.label === 'object' ? (att.label[lang] || att.label.es) : att.label;

                          if (isFolder) {
                            return (
                              <button
                                key={idx}
                                onClick={() => toggleActiveModal("folder_explorer", true, { targetFolder: att.url })}
                                className="flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-left transition-all hover:border-emerald-300 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              >
                                <div className="shrink-0 rounded-md bg-amber-50 p-2 text-amber-500">
                                  <Icon size={20} />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                  <p className="truncate text-sm font-medium text-slate-700">
                                    {label}
                                  </p>
                                  <p className="text-[11px] text-slate-500 uppercase">Carpeta</p>
                                </div>
                                <div className="shrink-0 text-slate-300">
                                  <ExternalLink size={16} />
                                </div>
                              </button>
                            );
                          }

                          return (
                            <a
                              key={idx}
                              href={att.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 transition-all hover:border-emerald-300 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                              <div className="shrink-0 rounded-md bg-red-50 p-2 text-red-500">
                                <Icon size={20} />
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <p className="truncate text-sm font-medium text-slate-700">
                                  {label}
                                </p>
                                <p className="text-[11px] text-slate-500">PDF Document</p>
                              </div>
                              <div className="shrink-0 text-slate-300">
                                <ExternalLink size={16} />
                              </div>
                            </a>
                          );
                        }
                        return (
                          <a
                            key={idx}
                            href={att.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white! shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md active:translate-y-0"
                          >
                            <ExternalLink size={14} />
                            {att.label[currentLanguage]}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}