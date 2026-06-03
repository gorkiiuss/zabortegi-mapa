// src/features/tutorial/types.ts

import type { AppAction } from "@features/orchestrator/types";

export type TutorialPosition = 'top' | 'bottom' | 'left' | 'right' | 'center';

export interface TutorialStep {
    id: string;
    title: { es: string; eu: string };
    content: { es: string; eu: string };
    targetId?: string;
    position?: TutorialPosition;
    onEnterAction?: AppAction | AppAction[];
}

export interface TutorialDefinition {
    id: string;
    title: { es: string; eu: string };
    steps: TutorialStep[];
    onCompleteAction?: AppAction | AppAction[];
}