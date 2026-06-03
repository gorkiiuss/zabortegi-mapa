// src/features/media/domain/valueObjects/MediaContext.ts

const MEDIA_CONTEXTS = [
    "LANDFILL_IMAGE", "LANDFILL_DOC", "ANNOUNCEMENT"
] as const;

export type MediaContext = typeof MEDIA_CONTEXTS[number];

export const MediaContextVO = {
    hydrate: (value: string | null | undefined): MediaContext => {
        if (!value) return "LANDFILL_IMAGE";
        const normalized = value.toUpperCase();
        if (MEDIA_CONTEXTS.includes(normalized as MediaContext)) {
            return normalized as MediaContext;
        }
        return "LANDFILL_IMAGE";
    },
    values: (): readonly MediaContext[] => MEDIA_CONTEXTS
};
