// src/features/about/utils/isNew.ts

import type { AnnouncementEntity } from "../domain/entities/Announcement";
import type { ChangeLogEntryEntity } from "../domain/entities/ChangeLogEntry";

export function getAgeInDays(dateString: string): number {
    const itemDate = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - itemDate.getTime();
    return diffTime / (1000 * 60 * 60 * 24);
}

export function isItemNew(
    item: AnnouncementEntity | ChangeLogEntryEntity,
    type: "announcement" | "update",
    lastSeenDateStr: string | null
): boolean {
    const ageDays = getAgeInDays(item.date);

    const isUnseen = !lastSeenDateStr || new Date(item.date) > new Date(lastSeenDateStr);

    if (isUnseen) {
        return ageDays <= 7;
    } else {
        if (type === "update") {
            return ageDays <= 3;
        } else {
            return ageDays <= 1;
        }
    }
}

export function isItemUnseenAndNew(
    item: AnnouncementEntity | ChangeLogEntryEntity,
    lastSeenDateStr: string | null
): boolean {
    const isUnseen = !lastSeenDateStr || new Date(item.date) > new Date(lastSeenDateStr);
    if (!isUnseen) return false;

    return getAgeInDays(item.date) <= 7;
}
