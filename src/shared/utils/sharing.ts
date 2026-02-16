// src/shared/utils/sharing.ts

import { useLanguageStore } from "@shared/state/languageStore";

export const APP_URL = "https://zabortegiak.ekologistakmartxan.org";

// Interfaz para cuando compartimos algo específico
interface ShareData {
  title: string;
  id: string; // El ID del anuncio para el deep link
}

const getShareMessages = (data?: ShareData) => {
  const t = useLanguageStore.getState().t;

  // Si hay datos específicos (Noticia), generamos texto específico
  if (data) {
    const specificUrl = `${APP_URL}/?newsId=${data.id}`;
    return {
      whatsapp: `${data.title} - ${t("app.title") || "Zabortegiak"} ${specificUrl}`,
      bluesky: `${data.title} #Zabortegiak ${specificUrl}`,
      emailSubject: `${data.title} - Zabortegiak`,
      emailBody: `${t("share.defaultMessage") || "Mira esta noticia"}: ${data.title}\n\n${specificUrl}`,
      url: specificUrl
    };
  }

  // Si no, genérico (Home)
  return {
    whatsapp: `${t("share.defaultMessage") || "Mira este mapa"} ${APP_URL}`,
    bluesky: `${t("share.bluesky", { hashtags: "#Zabortegiak" })} ${APP_URL}`,
    emailSubject: "Mapa de vertederos / Zabortegien mapa",
    emailBody: `${t("share.defaultMessage") || "Mira este mapa"}\n\n${APP_URL}`,
    url: APP_URL
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
    // Facebook solo permite compartir URL, no texto predefinido fácilmente
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank",
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
      // Aquí podrías disparar un toast de "Copiado"
    } catch (err) {
      console.error("Error al copiar", err);
    }
  },
};