// src/features/search/hooks/useSearchLogic.ts
import { useState, useEffect } from "react";
import { useUiStore } from "@features/map/state/uiStore";
import { useMapStore } from "@features/map/state/mapStore";
import { useNoInfoLandfills } from "@features/landfills/hooks/useNoInfoLandfills";
import { useQueryFilteredLandfillSummaries } from "@features/landfills/hooks/useQueryFilteredLandfillSummaries";
import type { LandfillSummary } from "@features/landfills/domain/types";

export function useSearchLogic(
  onOpenIndex?: (q: string) => void,
  onClose?: () => void,
) {
  const searchQuery = useUiStore((s) => s.searchQuery);
  const setSearchQuery = useUiStore((s) => s.setSearchQuery);
  const setSelectedLandfillId = useUiStore((s) => s.setSelectedLandfillId);
  const setFocusLandfillId = useMapStore((s) => s.setFocusLandfillId);

  const landfills = useNoInfoLandfills();

  const suggestions = useQueryFilteredLandfillSummaries(searchQuery.trim(), 9);
  const hasQuery = searchQuery.trim().length > 0;
  const hasMoreCard = hasQuery && !!onOpenIndex;
  const totalItems = suggestions.length + (hasMoreCard ? 1 : 0);

  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  useEffect(() => {
    setHighlightedIndex(totalItems > 0 ? 0 : -1);
  }, [totalItems]);

  const handleSelectLandfill = (item: LandfillSummary) => {
    const target = landfills.find((lf) => lf.parcelId === item.id);
    if (target) {
      setSelectedLandfillId(target.parcelId ?? null);
      setFocusLandfillId(target.parcelId ?? null);
      onClose?.();
    }
  };

  const handleOpenIndex = () => {
    if (onOpenIndex) onOpenIndex(searchQuery.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || totalItems === 0) return;

    const index =
      highlightedIndex >= 0 ? Math.min(highlightedIndex, totalItems - 1) : 0;

    if (index < suggestions.length) {
      handleSelectLandfill(suggestions[index]);
    } else if (hasMoreCard && index === suggestions.length) {
      handleOpenIndex();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (totalItems === 0) return;
      setHighlightedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (totalItems === 0) return;
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Escape") {
      onClose?.();
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    suggestions,
    hasQuery,
    hasMoreCard,
    highlightedIndex,
    setHighlightedIndex,
    handleSelectLandfill,
    handleOpenIndex,
    handleSubmit,
    handleKeyDown,
    totalItems,
  };
}
