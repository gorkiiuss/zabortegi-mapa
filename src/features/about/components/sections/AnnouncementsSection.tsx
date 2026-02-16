// src/features/about/components/sections/AnnouncementsSection.tsx

import { useLanguageStore } from "@shared/state/languageStore";
import { FileText, ExternalLink, MapPin, Calendar } from "@shared/components/Icons";
import { useLandfillsStore } from "@features/landfills/state/landfillsStore";
import { useLandfillNavigation } from "@features/landfills/hooks/useLandfillNavigation";
import { useNewsStore } from "@features/about/state/newsStore";
import { WidgetRenderer } from "../widgets/WidgetRenderer";
import { DropdownMenu } from "@shared/components/DropdownMenu";
import { useState } from "react";
import { shareUtils } from "@shared/utils/sharing";
import { Share2 } from "lucide-react";

export function AnnouncementsSection() {
  const { currentLanguage, t, formatDate } = useLanguageStore();

  const landfills = useLandfillsStore((s) => s.landfills);
  const { navigateByCode } = useLandfillNavigation();
  const announcements = useNewsStore((s) => s.announcements);

  const [openShareId, setOpenShareId] = useState<string | null>(null);

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

  return (
    <div className="space-y-12 py-4">
      {sortedPosts.map((post) => (
        <article
          key={post.id}
          className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
        >
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 to-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />

          <div className="p-6 sm:p-8">
            
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Calendar className="h-3 w-3" />
                <time dateTime={post.date}>
                  {formatDate ? formatDate(post.date, 'numeric') : post.date}
                </time>
              </div>

              {/* BOTÓN COMPARTIR */}
<div className="relative">
                <DropdownMenu
                  isOpen={openShareId === post.id}
                  onClose={() => setOpenShareId(null)}
                  align="right"
                  trigger={
                    <button
                      onClick={() => setOpenShareId(openShareId === post.id ? null : post.id)}
                      // Cambio de estilo: quitamos h-8 w-8, añadimos padding y gap para el texto
                      className="group flex items-center gap-2 rounded-full border border-transparent bg-white px-3 py-1.5 text-xs font-medium text-slate-400 transition-all hover:border-slate-100 hover:bg-slate-50 hover:text-blue-600 hover:shadow-sm"
                      aria-label="Compartir"
                    >
                      <Share2 size={14} />
                      <span>{currentLanguage === 'es' ? 'Compartir' : 'Partekatu'}</span>
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

            <h3 className="mb-4 text-2xl font-bold leading-tight text-slate-800">
              {post.title[currentLanguage]}
            </h3>

            <WidgetRenderer widgets={post.widgets} />

            <div
              className="prose prose-sm prose-slate max-w-none text-slate-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content[currentLanguage] }}
            />

            {(post.relatedLandfillCodes?.length || post.attachments?.length) ? (
              <div className="mt-8 flex flex-col gap-6 border-t border-slate-100 pt-6">

                {post.relatedLandfillCodes && post.relatedLandfillCodes.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      {currentLanguage === "es" ? "Mencionado en:" : "Aipatua:"}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {post.relatedLandfillCodes.map((code) => {
                        const lf = landfills.find((l) => l.code === code);
                        if (!lf) return null;
                        return (
                          <button
                            key={code}
                            onClick={() => navigateByCode(code)}
                            className="group/btn flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                          >
                            <MapPin size={12} className="text-slate-400 transition-colors group-hover/btn:text-blue-500" />
                            {lf.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {post.attachments && post.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {post.attachments.map((att, idx) => (
                      <a
                        key={idx}
                        href={att.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold !text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md active:translate-y-0"                      >
                        {att.type === "pdf" ? <FileText size={14} /> : <ExternalLink size={14} />}
                        {att.label[currentLanguage]}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}