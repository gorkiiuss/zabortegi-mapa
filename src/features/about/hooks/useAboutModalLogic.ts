// src/features/about/hooks/useAboutModalLogic.ts

import { useEffect, useLayoutEffect, useMemo } from "react";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useUiStore, type AboutData } from "@features/map/state/uiStore";
import { useNewsStore } from "../state/newsStore";
import { isItemUnseenAndNew } from "../utils/isNew";

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

  const aboutModalState = useUiStore((s) => s.aboutModalState);
  const setAboutModalState = useUiStore((s) => s.setAboutModalState);

  const activeTab = aboutModalState.activeTab;

  useEffect(() => {
    if (data.initialTab && data.initialTab !== activeTab) {
      setAboutModalState({ activeTab: data.initialTab });
    }
  }, [data.initialTab, data.targetAnnouncementId]);

  useEffect(() => {
    if (activeTab === "announcements" && announcements.length > 0) {
      const latestActive = announcements.find(a => a.active);
      if (latestActive) {
        localStorage.setItem("app_last_seen_announcement", latestActive.id);
      }
    }
    if (activeTab === "changelog" && changelog.length > 0) {
      const latestUpdate = changelog[0];
      if (latestUpdate) {
        localStorage.setItem("app_last_seen_update", latestUpdate.date);
      }
    }
  }, [activeTab, announcements, changelog]);


  const lastSeenUpdate = localStorage.getItem("app_last_seen_update");
  const hasUnseenUpdate = useMemo(() => {
    return changelog.some(c => isItemUnseenAndNew(c, lastSeenUpdate));
  }, [changelog, lastSeenUpdate]);

  const lastSeenAnnouncementId = localStorage.getItem("app_last_seen_announcement");
  const lastSeenAnnouncementDate = useMemo(() => {
    return lastSeenAnnouncementId
      ? announcements.find((a) => a.id === lastSeenAnnouncementId)?.date || null
      : null;
  }, [announcements, lastSeenAnnouncementId]);

  const hasUnseenAnnouncement = useMemo(() => {
    return announcements.filter(a => a.active).some(a => isItemUnseenAndNew(a, lastSeenAnnouncementDate));
  }, [announcements, lastSeenAnnouncementDate]);


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
    setActiveTab: (tab: AboutTab) => setAboutModalState({ activeTab: tab }),
    scrollTop: aboutModalState.scrollTop,
    setScrollTop: (scroll: number) => setAboutModalState({ scrollTop: scroll }),
    hasUnseenAnnouncement,
    hasUnseenUpdate,
    appVersion,
    targetAnnouncementId: data.targetAnnouncementId,
  };
}