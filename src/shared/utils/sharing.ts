// src/shared/utils/sharing.ts

import { useLanguageStore } from "@shared/state/languageStore";

export const APP_URL = "https://zabortegiak.ekologistakmartxan.org";

interface ShareData {
  title: string;
  id: string;
}

const getShareMessages = (data?: ShareData) => {
  const t = useLanguageStore.getState().t;

  const finalUrl = data ? `${APP_URL}/?newsId=${data.id}` : APP_URL;
  const title = data ? data.title : (t("app.title") || "Zabortegiak");
  const hashtags = "#Zabortegiak #EkologistakMartxan";

  return {
    whatsapp: `${title} - ${hashtags} ${finalUrl}`,
    bluesky: `${title} ${hashtags} ${finalUrl}`,
    mastodonText: `${title} ${hashtags}`,
    emailSubject: `${title} - Zabortegiak`,
    emailBody: `${t("share.defaultMessage") || "Mira esto"}: ${title}\n\n${finalUrl}`,
    url: finalUrl
  };
};

export const shareUtils = {
  whatsapp: (data?: ShareData) => {
    const msgs = getShareMessages(data);
    const text = encodeURIComponent(msgs.whatsapp);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  },

  bluesky: (data?: ShareData) => {
    const msgs = getShareMessages(data);
    const text = encodeURIComponent(msgs.bluesky);
    window.open(`https://bsky.app/intent/compose?text=${text}`, "_blank");
  },

  facebook: (data?: ShareData) => {
    const msgs = getShareMessages(data);
    const url = encodeURIComponent(msgs.url);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank",
    );
  },

  mastodon: (data?: ShareData) => {
    const msgs = getShareMessages(data);
    const text = encodeURIComponent(msgs.mastodonText);
    const url = encodeURIComponent(msgs.url);

    window.open(
      `https://mastodonshare.com/?text=${text}&url=${url}`,
      "_blank"
    );
  },

  email: (data?: ShareData) => {
    const msgs = getShareMessages(data);
    const subject = encodeURIComponent(msgs.emailSubject);
    const body = encodeURIComponent(msgs.emailBody);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  },

  copyLink: async (data?: ShareData) => {
    const msgs = getShareMessages(data);
    try {
      await navigator.clipboard.writeText(msgs.url);
    } catch (err) {
      console.error("Error al copiar", err);
    }
  },
};