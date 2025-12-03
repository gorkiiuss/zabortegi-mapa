import { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { useMapModalInteractions } from "@shared/hooks/useMapModalInteractions";
import { useUiStore } from "@features/map/state/uiStore";
import { CHANGELOG_DATA } from "../data/changelogRepository";

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
  const { closeModal, toggleActiveModal } = useUiStore();

  const isLatestVersionNew = useMemo(() => {
    const latestEntry = CHANGELOG_DATA[0];
    if (!latestEntry) return false;

    const today = new Date();
    const updateDate = new Date(latestEntry.date);

    const diffTime = today.getTime() - updateDate.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);

    return diffDays >= 0 && diffDays <= 3;
  }, []);

  const [activeSection, setActiveSection] = useState<"updates" | "info" | null>(
    isLatestVersionNew ? "updates" : "info",
  );

  const handleClose = () => closeModal();
  const handleOpenAttributions = () => toggleActiveModal("attributions", true);
  const toggleSection = (section: "updates" | "info") => {
    setActiveSection(activeSection === section ? null : section);
  };

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
    activeSection,
    toggleSection,
    isLatestVersionNew,
    appVersion,
  };
}
