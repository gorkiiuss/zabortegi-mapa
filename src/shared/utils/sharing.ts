import { useLanguageStore } from "@shared/state/languageStore";

export const APP_URL = "https://zabortegiak.ekologistakmartxan.org";

const getShareMessages = () => {
  const t = useLanguageStore.getState().t;

  return {
    default:
      t("share.defaultMessage") ||
      "Mira este mapa de vertederos / Begiratu zabortegi mapa hau",
    bluesky:
      t("share.bluesky", { hashtags: "#Zabortegiak #EkologistakMartxan" }) ||
      "Mira este mapa #Zabortegiak",
  };
};

export const shareUtils = {
  whatsapp: () => {
    const msgs = getShareMessages();
    const text = encodeURIComponent(`${msgs.default} ${APP_URL}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  },

  bluesky: () => {
    const msgs = getShareMessages();
    const text = encodeURIComponent(`${msgs.bluesky} ${APP_URL}`);
    window.open(`https://bsky.app/intent/compose?text=${text}`, "_blank");
  },

  facebook: () => {
    const url = encodeURIComponent(APP_URL);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank",
    );
  },

  email: () => {
    const msgs = getShareMessages();
    const subject = encodeURIComponent("Mapa de vertederos / Zabortegien mapa");
    const body = encodeURIComponent(`${msgs.default}\n\n${APP_URL}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  },

  copyLink: async () => {
    try {
      await navigator.clipboard.writeText(APP_URL);
    } catch (err) {
      console.error("Error al copiar", err);
    }
  },
};
