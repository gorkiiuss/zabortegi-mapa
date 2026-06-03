// src/features/landfills/hooks/useDetailsLogic.ts

import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUiStore } from "@features/map/state/uiStore";
import { apiLandfillsRepository } from "@features/landfills/data/apiRepository";
import { generateLandfillHtml } from "@features/landfills/utils/htmlGenerator";
import { printHtmlInIframe } from "@features/landfills/utils/printer";
import { useLandfillDetails } from "./useLandfillDetails";

export function useDetailsLogic() {
  const selectedId = useUiStore((s) => s.selectedLandfillId);
  const activeModal = useUiStore((s) => s.activeModal);
  const openModal = useUiStore((s) => s.openModal);
  const closeModal = useUiStore((s) => s.closeModal);

  const [isDownloadingLegacy, setIsDownloadingLegacy] = useState(false);
  const prevSelectedIdRef = useRef<string | null>(selectedId);

  const { details, isLoading } = useLandfillDetails(selectedId);

  const { data: allVersions } = useQuery({
    queryKey: ["landfill-versions", selectedId],
    queryFn: () => apiLandfillsRepository.getVersions(selectedId!),
    enabled: !!selectedId,
  });

  const legacyVersion = allVersions?.find((v) => v.versionNumber === 0);
  const legacyVersionId = legacyVersion ? legacyVersion.versionId : null;

  useEffect(() => {
    if (selectedId !== prevSelectedIdRef.current) {
      prevSelectedIdRef.current = selectedId;

      if (selectedId) {
        if (activeModal !== "selection" && activeModal !== "full-details") {
          openModal("selection");
        }
      } else {
        if (activeModal === "selection") {
          closeModal();
        }
      }
    }
  }, [selectedId, openModal, closeModal, activeModal]);

  const handleClose = () => {
    closeModal();
  };

  const handleDownloadLegacyReport = async () => {
    if (!selectedId || !legacyVersionId || isDownloadingLegacy) return;
    setIsDownloadingLegacy(true);
    try {
      const legacyDetails = await apiLandfillsRepository.getDetails(selectedId, legacyVersionId);
      if (legacyDetails && legacyDetails.legacyRawData) {
        const htmlString = await generateLandfillHtml(legacyDetails.legacyRawData, selectedId);
        const properties = legacyDetails.legacyRawData.properties || legacyDetails.legacyRawData || {};
        const title = properties.NombreVertedero || properties.name || selectedId;
        printHtmlInIframe(htmlString, title);
      } else {
        alert("No se encontraron los datos originales para generar el informe.");
      }
    } catch (error) {
      console.error("Error al generar el PDF original:", error);
      alert("Hubo un error al generar el informe original.");
    } finally {
      setIsDownloadingLegacy(false);
    }
  };

  return {
    details,
    isLoadingDetails: isLoading,
    isDownloadingLegacy,
    legacyVersionId,
    handleClose,
    handleDownloadLegacyReport,
  };
}
