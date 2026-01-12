"use client"

import { useState, useEffect } from "react"
import { Globe, Clock, Play, ChevronDown } from "lucide-react"
import { ShareMenu } from "./share-menu"
import { INITIAL_NEWS_DATA } from "@/lib/data"
import type { CategoryId, Language } from "@/lib/types"

interface NewsGridProps {
  activeTab: CategoryId
  lang: Language
  translations: any
}

export function NewsGrid({ activeTab, lang, translations }: NewsGridProps) {
  const [visibleCount, setVisibleCount] = useState(6)
  const [newsData, setNewsData] = useState(INITIAL_NEWS_DATA)
  const [mounted, setMounted] = useState(false)
  const t = translations

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || !mounted) return

    const loadNews = () => {
      try {
        const stored = localStorage.getItem("admin_news")
        if (stored) {
          const parsedNews = JSON.parse(stored)
          if (parsedNews && typeof parsedNews === "object") {
            setNewsData(parsedNews)
          }
        }
      } catch (e) {
        console.error("Failed to load news:", e)
      }
    }

    loadNews()

    // تحديث الأخبار كل ثانية للحصول على أحدث البيانات
    const interval = setInterval(loadNews, 1000)
    return () => clearInterval(interval)
  }, [mounted])

  useEffect(() => {
    setVisibleCount(6)
  }, [activeTab])

  const items = newsData[activeTab] || newsData.latest

  return (
    <div className="animate-fade-in max-w-6xl mx-auto space-y-12">
      <div className="flex flex-col items-center gap-2 mb-6 text-center">
        <div className="p-2 bg-gradient-to-br from-primary to-primary-darker text-white rounded-lg shadow-sm flex items-center justify-center">
          <Globe size={16} aria-hidden="true" />
        </div>
        <h2 className="text-md md:text-lg font-black text-gray-900 leading-tight uppercase tracking-tight">
          {t.nav[activeTab as keyof typeof t.nav] || activeTab}
        </h2>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.slice(0, visibleCount).map((item) => (
          <div
            key={item.id}
            className="group cursor-pointer bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play size={40} className="text-white fill-white" />
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="font-black text-[13px] line-clamp-2 leading-relaxed mb-4">{item.title}</h3>
              <div className="pt-4 border-t flex justify-between items-center text-[10px] text-gray-400 font-black">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-primary" /> {item.timeAgo}
                </div>
                <ShareMenu title={item.title} label={t.share} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length > visibleCount && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisibleCount((v) => v + 6)}
            className="group relative px-10 py-5 bg-white border-2 border-gray-100 text-gray-900 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-lg hover:border-primary hover:text-primary transition-all active:scale-95 flex items-center gap-3"
          >
            <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
            {t.loadMore}
          </button>
        </div>
      )}
    </div>
  )
}
