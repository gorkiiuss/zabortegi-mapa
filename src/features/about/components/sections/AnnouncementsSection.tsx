import { useLanguageStore } from "@shared/state/languageStore";
import { FileText, ExternalLink, MapPin } from "@shared/components/Icons";
import { useLandfillsStore } from "@features/landfills/state/landfillsStore";
import { useLandfillNavigation } from "@features/landfills/hooks/useLandfillNavigation";
import { useNewsStore } from "@features/about/state/newsStore";

export function AnnouncementsSection() {
  const { currentLanguage, t } = useLanguageStore();
  
  const landfills = useLandfillsStore((s) => s.landfills);
  const { navigateByCode } = useLandfillNavigation();
  const announcements = useNewsStore((s) => s.announcements);

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
    <div className="space-y-8 py-2">
      {sortedPosts.map((post) => (
        <article
          key={post.id}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
        >
          {post.image && (
            <div className="h-48 w-full overflow-hidden bg-slate-100">
              <img
                src={post.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          )}

          <div className="p-5">
            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {post.date}
              </span>
              <h3 className="mt-1 text-lg font-bold leading-tight text-slate-800">
                {post.title[currentLanguage]}
              </h3>
            </div>

            <div
              className="prose prose-sm prose-slate max-w-none text-slate-600"
              dangerouslySetInnerHTML={{ __html: post.content[currentLanguage] }}
            />

            {post.relatedLandfillCodes && post.relatedLandfillCodes.length > 0 && (
              <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/50 p-3">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-wide text-blue-400">
                  {currentLanguage === "es" ? "Afecta a:" : "Eragina dauka:"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {post.relatedLandfillCodes.map((code) => {
                    const lf = landfills.find((l) => l.code === code);
                    if (!lf) return null;

                    return (
                      <button
                        key={code}
                        onClick={() => navigateByCode(code)}
                        className="group flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-all hover:border-blue-400 hover:text-blue-700 hover:shadow-md active:scale-95"
                      >
                        <MapPin size={12} className="text-blue-400 transition-colors group-hover:text-blue-600" />
                        {lf.name} <span className="text-slate-400 font-normal">({code})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Adjuntos */}
            {post.attachments && post.attachments.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                {post.attachments.map((att, idx) => (
                  <a
                    key={idx}
                    href={att.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    {att.type === "pdf" ? (
                      <FileText size={14} className="text-slate-400 group-hover:text-emerald-500" />
                    ) : (
                      <ExternalLink size={14} className="text-slate-400 group-hover:text-emerald-500" />
                    )}
                    <span>{att.label[currentLanguage]}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}