export type VideoType = 'single' | 'playlist';

export interface Video {
  id: string;
  title: string;
  youtubeId?: string; // For Single Videos
  playlistId?: string; // For Playlist Videos
  type: VideoType;
  duration?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Tool {
  name: string;
  url: string;
  description?: string;
}

export interface LanguageContent {
  lessons: Video[];
  projects: Video[];
  faqs: FAQ[];
}

export interface Subject {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  icon: string; // Icon Name Lucide
  content: {
    arabic: LanguageContent;
    english: LanguageContent;
  };
  tools: Tool[];
}