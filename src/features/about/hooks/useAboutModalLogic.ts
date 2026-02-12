// src/features/about/hooks/useAboutModalLogic.ts

import { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useUiStore, type AboutData } from "@features/map/state/uiStore";
import { useNewsStore } from "../state/newsStore";

export type AboutTab = "announcements" | "changelog" | "project";

const PULSE_STYLES = `
@keyframes landfill-pulse-ui {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); }
  70% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(220, 38, 38, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
}
.landfill-pulse-target {
  position: relative; z-index: 10; animation: landfill-pulse-ui 2s ease-out infinite; border-color: rgba(220, 38, 38, 0.5) !important;
}
`;

function ensureStylesInjected() {
  if (document.getElementById("landfill-pulse-styles")) return;
  const styleEl = document.createElement("style");
  styleEl.id = "landfill-pulse-styles";
  styleEl.textContent = PULSE_STYLES;
  document.head.appendChild(styleEl);
}

export function useAboutModalLogic() {
  const { handleMouseEnter, handleMouseLeave, modalRef } =
    useMapModalInteractions();

  const { closeModal, openModal, modalData } = useUiStore();

  const announcements = useNewsStore((s) => s.announcements);
  const changelog = useNewsStore((s) => s.changelog);

  const data = (modalData as AboutData) || {};

  const targetTab = data.initialTab || "project";

  const [activeTab, setActiveTab] = useState<AboutTab>(targetTab);

  useEffect(() => {
    if (data.initialTab) {
      setActiveTab(data.initialTab);
    }
  }, [data.initialTab]);


  const lastSeenUpdate = localStorage.getItem("app_last_seen_update");
  const isLatestVersionNew = useMemo(() => {
    const latestEntry = changelog[0];
    if (!latestEntry) return false;
    return latestEntry.date !== lastSeenUpdate;
  }, [changelog, lastSeenUpdate]);

  const lastSeenAnnouncementId = localStorage.getItem("app_last_seen_announcement");
  const hasNewAnnouncement = useMemo(() => {
    const latestAnnouncement = announcements.find(a => a.active);
    if (!latestAnnouncement) return false;
    return latestAnnouncement.id !== lastSeenAnnouncementId;
  }, [announcements, lastSeenAnnouncementId]);


  const handleClose = () => closeModal();
  const handleOpenAttributions = () => openModal("attributions", true);

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

  const appVersion =
    typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "1.0.0";

  return {
    modalRef,
    handleMouseEnter,
    handleMouseLeave,
    handleClose,
    handleOpenAttributions,
    activeTab,
    setActiveTab,
    hasNewAnnouncement,
    isLatestVersionNew,
    appVersion,
  };
}