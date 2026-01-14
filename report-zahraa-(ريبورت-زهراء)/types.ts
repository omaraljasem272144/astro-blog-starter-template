
export enum Language {
  AR = 'ar',
  EN = 'en'
}

export enum Category {
  HOME = 'home',
  LIVE = 'live',
  NEWS = 'news',
  ECONOMY = 'economy',
  HEALTH_SCIENCE = 'health',
  SPORTS = 'sports',
  VIDEO = 'video',
  INVESTIGATIONS = 'investigations',
  PODCAST = 'podcast',
  PROGRAMS = 'programs'
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: Category;
  timestamp: string;
  url?: string;
  views?: number;
  priority?: number;
  isCustom?: boolean;
}

export interface LiveChannel {
  id: string;
  name: { ar: string, en: string };
  youtubeId: string; 
  viewers: string;
  type: string;
  color: string;
  quality: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  duration: string;
  date: string;
  imageUrl: string;
  audioUrl: string;
}
