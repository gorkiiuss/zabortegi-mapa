import { create } from "zustand";
import type { AnnouncementEntity } from "../domain/entities/Announcement";
import type { ChangeLogEntryEntity } from "../domain/entities/ChangeLogEntry";
import { apiNewsRepository } from "../data/apiRepository";

interface NewsState {
  announcements: AnnouncementEntity[];
  changelog: ChangeLogEntryEntity[];
  loading: boolean;
  error: boolean;

  fetchNews: () => Promise<void>;
}

export const useNewsStore = create<NewsState>((set, get) => ({
  announcements: [],
  changelog: [],
  loading: false,
  error: false,

  fetchNews: async () => {
    if (get().announcements.length > 0 || get().loading) return;

    set({ loading: true, error: false });

    try {
      const [announcements, changelog] = await Promise.all([
        apiNewsRepository.getAnnouncements(),
        apiNewsRepository.getChangelog()
      ]);

      set({
        announcements,
        changelog,
        loading: false
      });
    } catch (e) {
      console.error("Error fetching news:", e);
      set({ loading: false, error: true });
    }
  }
}));