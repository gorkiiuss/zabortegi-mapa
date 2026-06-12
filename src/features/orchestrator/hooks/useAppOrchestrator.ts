// src/features/orchestrator/hooks/useAppOrchestrator.ts

import { useCallback } from "react";
import { useUiStore } from "@features/map/state/uiStore";
import { useTutorialStore } from "@features/tutorial/state/tutorialStore";
import { useMapStore } from "@features/map/state/mapStore";
import { useDataExtractorStore } from "@features/extractor/state/useDataExtractorStore";
import type { AppAction } from "../types";

export function useAppOrchestrator() {
    const { toggleActiveModal, setSelectedLandfillId, setOpenToolbarDropdownId } = useUiStore();
    const openIndexWithQuery = useUiStore((s) => s.openIndexWithQuery);
    const { startTutorial } = useTutorialStore();
    const setFocusedLandfillId = useMapStore((s) => s.setFocusLandfillId);
    const triggerResetZoom = useMapStore((s) => s.triggerResetZoom);

    const dispatch = useCallback((action: AppAction) => {
        switch (action.type) {
            case 'TOGGLE_MODAL': {
                const currentActive = useUiStore.getState().activeModal;
                if (action.payload.modalId === 'none') {
                    if (currentActive !== 'none') {
                        toggleActiveModal(currentActive);
                    }
                } else if (currentActive !== action.payload.modalId) {
                    toggleActiveModal(action.payload.modalId, action.payload.stackPrevious, action.payload.modalPayload);
                }
                break;
            }

            case 'TRIGGER_SEARCH':
                openIndexWithQuery(action.payload.query);
                break;

            case 'NAVIGATE_EXTERNAL':
                window.open(
                    action.payload.url,
                    action.payload.newTab !== false ? '_blank' : '_self'
                );
                break;

            case 'START_TUTORIAL':
                startTutorial(action.payload.tutorialId);
                break;

            case 'SELECT_LANDFILL':
                setSelectedLandfillId(action.payload.landfillId);
                setFocusedLandfillId(action.payload.landfillId, action.payload.offset);
                break;

            case 'RESET_MAP_ZOOM':
                triggerResetZoom();
                break;

            case 'OPEN_TOOLBAR_DROPDOWN':
                setOpenToolbarDropdownId(action.payload.dropdownId);
                break;

            case 'SET_EXTRACTOR_STEP' as any:
                useDataExtractorStore.getState().setStep((action as any).payload.step);
                break;

            default:
                console.warn("Acción no implementada en el orquestador:", action);
        }
    }, [toggleActiveModal, openIndexWithQuery, setSelectedLandfillId, setFocusedLandfillId, triggerResetZoom, setOpenToolbarDropdownId]);

    return { dispatch };
}