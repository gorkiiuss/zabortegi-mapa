// src/features/landfills/hooks/useLandfillDetails.ts

import { useState, useMemo, useEffect, useRef } from "react";
import { useUiStore } from "@features/map/state/uiStore";
import { useNoInfoLandfills } from "@features/landfills/hooks/useNoInfoLandfills";
import { buildSelectionPanelData } from "../domain/mappers/landfillDetailsMapper";
import { generateLandfillHtml } from "@features/landfills/utils/htmlGenerator";
import { printHtmlInIframe } from "@features/landfills/utils/printer";

export function useSelectionLogic() {
  const selectedId = useUiStore((s) => s.selectedLandfillId);
  const activeModal = useUiStore((s) => s.activeModal);
  const setActiveModal = useUiStore((s) => s.openModal);

  const landfills = useNoInfoLandfills();
  const [isDownloading, setIsDownloading] = useState(false);

  const prevSelectedIdRef = useRef<string | null>(selectedId);

  const landfill = useMemo(() => {
    if (!selectedId) return undefined;
    return landfills.find((lf) => lf.parcelId === selectedId);
  }, [landfills, selectedId]);

  useEffect(() => {
    if (selectedId !== prevSelectedIdRef.current) {
      prevSelectedIdRef.current = selectedId;

      if (selectedId) {
        setActiveModal("selection");
      } else {
        if (activeModal === "selection") {
          setActiveModal("none");
        }
      }
    }
  }, [selectedId, setActiveModal]); //

  const handleClose = () => {
    setActiveModal("none");
  };

  const handleDownloadReport = async () => {
    if (!landfill || isDownloading) return;

    setIsDownloading(true);
    try {
      const htmlString = await generateLandfillHtml(landfill);
      printHtmlInIframe(htmlString);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Hubo un error al generar el informe.");
    } finally {
      setIsDownloading(false);
    }
  };

  const data = landfill ? buildSelectionPanelData(landfill) : null;

  return {
    landfill,
    data,
    isDownloading,
    handleClose,
    handleDownloadReport,
  };
}
