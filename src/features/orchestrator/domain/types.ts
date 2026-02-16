// src/features/orchestrator/domain/types.ts

import type { ModalId } from "@features/map/state/uiStore";

export type ActionType =
    | 'TOGGLE_MODAL'
    | 'NAVIGATE_EXTERNAL'
    | 'TRIGGER_SEARCH';
// TODO  | 'START_TUTORIAL';

export interface ToggleModalAction {
    type: 'TOGGLE_MODAL';
    payload: {
        modalId: ModalId;
        stackPrevious?: boolean;
        modalPayload?: any;
    };
}

export interface NavigateExternalAction {
    type: 'NAVIGATE_EXTERNAL';
    payload: {
        url: string;
        newTab?: boolean;
    };
}

export interface TriggerSearchAction {
    type: 'TRIGGER_SEARCH';
    payload: {
        query: string;
    };
}

export type AppAction =
    | ToggleModalAction
    | NavigateExternalAction
    | TriggerSearchAction;