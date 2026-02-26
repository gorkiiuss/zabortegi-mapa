// src/features/about/utils/isNew.ts

import type { AnnouncementPost, ChangeLogEntry } from "../domain/types";

export function getAgeInDays(dateString: string): number {
    const itemDate = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - itemDate.getTime();
    return diffTime / (1000 * 60 * 60 * 24);
}

export function isItemNew(
    item: AnnouncementPost | ChangeLogEntry,
    type: "announcement" | "update",
    lastSeenDateStr: string | null
): boolean {
    const ageDays = getAgeInDays(item.date);

    // Consideramos que un elemento NO se ha visto si no hay fecha de última visita
    // o si la fecha del elemento es posterior a la de última visita.
    // Para las fechas del mismo día, consideramos que sí se ha visto.
    const isUnseen = !lastSeenDateStr || new Date(item.date) > new Date(lastSeenDateStr);

    if (isUnseen) {
        return ageDays <= 7;
    } else {
        // Si ya se ha visto, se mantiene "nuevo" (destacado) por unos días
        if (type === "update") {
            return ageDays <= 3;
        } else {
            return ageDays <= 1;
        }
    }
}

export function isItemUnseenAndNew(
    item: AnnouncementPost | ChangeLogEntry,
    lastSeenDateStr: string | null
): boolean {
    const isUnseen = !lastSeenDateStr || new Date(item.date) > new Date(lastSeenDateStr);
    if (!isUnseen) return false;

    return getAgeInDays(item.date) <= 7;
}
