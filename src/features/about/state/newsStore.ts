import { create } from "zustand";

export interface Attachment {
  type: "pdf" | "link";
  label: { es: string; eu: string };
  url: string;
}

export interface AnnouncementPost {
  id: string;
  date: string;
  active: boolean;
  title: { es: string; eu: string };
  content: { es: string; eu: string };
  image?: string;
  attachments?: Attachment[];
  relatedLandfillCodes?: string[];
}

export interface ChangeLogEntry {
  version: string;
  date: string;
  title: { es: string; eu: string };
  changes: { es: string[]; eu: string[] };
}

interface NewsState {
  announcements: AnnouncementPost[];
  changelog: ChangeLogEntry[];
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
      const baseUrl = import.meta.env.BASE_URL;
      
      const [annRes, logRes] = await Promise.all([
        fetch(`${baseUrl}data/announcements.json`),
        fetch(`${baseUrl}data/changelog.json`)
      ]);

      if (!annRes.ok || !logRes.ok) throw new Error("Error loading data");

      const announcements = await annRes.json();
      const changelog = await logRes.json();

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