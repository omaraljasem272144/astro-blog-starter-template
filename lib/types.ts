export type CategoryId = "main" | "breaking" | "live" | "video" | "photos" | "economy" | "sport" | "podcast" | "admin"
export type Language = "ar" | "en"

export interface NewsItem {
  id: string
  title: string
  image: string
  category: string
  timeAgo: string
  duration?: string
  isShort?: boolean
  youtubeId?: string
}

export interface LiveChannel {
  id: string
  name: string
  videoId: string
  logo: string
  country: string
}

export interface BreakingAlert {
  id: string
  text: string
  timestamp: string
}
