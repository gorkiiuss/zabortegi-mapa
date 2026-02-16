// src/features/orchestrator/hooks/useAppOrchestrator.ts

import { useCallback } from "react";
import { useUiStore } from "@features/map/state/uiStore";
import type { AppAction } from "../domain/types";

export function useAppOrchestrator() {
    const { toggleActiveModal } = useUiStore();
    const openIndexWithQuery = useUiStore((s) => s.openIndexWithQuery);

    const dispatch = useCallback((action: AppAction) => {
        console.log("Orchestrator Dispatch:", action.type, action.payload);

        switch (action.type) {
            case 'TOGGLE_MODAL':
                toggleActiveModal(action.payload.modalId, action.payload.stackPrevious, action.payload.modalPayload);
                break;

            case 'TRIGGER_SEARCH':
                openIndexWithQuery(action.payload.query);
                break;

            case 'NAVIGATE_EXTERNAL':
                window.open(
                    action.payload.url,
                    action.payload.newTab !== false ? '_blank' : '_self'
                );
                break;

            default:
                console.warn("Acción no implementada en el orquestador:", action);
        }
    }, [toggleActiveModal, openIndexWithQuery]);

    return { dispatch };
}