// src/features/orchestrator/types.ts

import type { ModalId } from "@features/map/state/uiStore";

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

export interface StartTutorialAction {
    type: 'START_TUTORIAL';
    payload: {
        tutorialId: string;
    };
}

export interface SelectLandfillAction {
    type: 'SELECT_LANDFILL';
    payload: {
        landfillId: string | null;
        offset?: [number, number];
    };
}

export interface ResetMapZoomAction {
    type: 'RESET_MAP_ZOOM';
    payload: {};
}

export interface OpenToolbarDropdownAction {
    type: 'OPEN_TOOLBAR_DROPDOWN';
    payload: {
        dropdownId: string | null;
    };
}

export type AppAction =
    | ToggleModalAction
    | NavigateExternalAction
    | TriggerSearchAction
    | StartTutorialAction
    | SelectLandfillAction
    | ResetMapZoomAction
    | OpenToolbarDropdownAction;