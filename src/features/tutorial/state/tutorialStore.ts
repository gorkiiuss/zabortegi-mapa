// src/features/tutorial/state/tutorialStore.ts

import { create } from "zustand";
import type { TutorialDefinition } from "../types";
import { onboardingTutorial } from "../data/onboardingTutorial";
import { onboardingTutorialMobile } from "../data/onboardingTutorialMobile";
import { fullDetailsTutorial } from "../data/fullDetailsTutorial";
import { fullDetailsTutorialMobile } from "../data/fullDetailsTutorialMobile";
import { extractorTutorial } from "../data/extractorTutorial";
import { extractorTutorialMobile } from "../data/extractorTutorialMobile";
import { advancedSearchTutorial } from "../data/advancedSearchTutorial";
import { advancedSearchTutorialMobile } from "../data/advancedSearchTutorialMobile";

interface TutorialState {
    tutorials: Record<string, TutorialDefinition>;
    activeTutorialId: string | null;
    currentStepIndex: number;
    registerTutorial: (def: TutorialDefinition) => void;
    startTutorial: (id: string) => void;
    nextStep: () => void;
    prevStep: () => void;
    endTutorial: () => void;
}

export const useTutorialStore = create<TutorialState>((set, get) => ({
    tutorials: {
        [onboardingTutorial.id]: onboardingTutorial,
        [onboardingTutorialMobile.id]: onboardingTutorialMobile,
        [fullDetailsTutorial.id]: fullDetailsTutorial,
        [fullDetailsTutorialMobile.id]: fullDetailsTutorialMobile,
        [extractorTutorial.id]: extractorTutorial,
        [extractorTutorialMobile.id]: extractorTutorialMobile,
        [advancedSearchTutorial.id]: advancedSearchTutorial,
        [advancedSearchTutorialMobile.id]: advancedSearchTutorialMobile
    },

    activeTutorialId: null,
    currentStepIndex: 0,

    registerTutorial: (def) =>
        set(state => ({ tutorials: { ...state.tutorials, [def.id]: def } })),

    startTutorial: (id) => {
        const tutorial = get().tutorials[id];
        if (!tutorial) {
            console.warn(`Tutorial ${id} not found`);
            return;
        }
        set({ activeTutorialId: id, currentStepIndex: 0 });
    },

    nextStep: () => {
        const { activeTutorialId, currentStepIndex, tutorials } = get();
        if (!activeTutorialId) return;

        const tutorial = tutorials[activeTutorialId];
        if (currentStepIndex < tutorial.steps.length - 1) {
            set({ currentStepIndex: currentStepIndex + 1 });
        } else {
            get().endTutorial();
        }
    },

    prevStep: () => {
        const { currentStepIndex } = get();
        if (currentStepIndex > 0) {
            set({ currentStepIndex: currentStepIndex - 1 });
        }
    },

    endTutorial: () => {
        set({ activeTutorialId: null, currentStepIndex: 0 });
    }
}));