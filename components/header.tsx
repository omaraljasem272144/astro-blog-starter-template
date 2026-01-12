"use client"

import { Menu, Languages, LayoutDashboard } from "lucide-react"
import { NAV_ITEMS } from "@/lib/data"
import type { CategoryId, Language } from "@/lib/types"

interface HeaderProps {
  activeTab: CategoryId
  setActiveTab: (tab: CategoryId) => void
  lang: Language
  setLang: (lang: Language) => void
  setIsMenuOpen: (open: boolean) => void
  translations: any
}

export function Header({ activeTab, setActiveTab, lang, setLang, setIsMenuOpen, translations }: HeaderProps) {
  const t = translations

  return (
    <header className="sticky top-0 z-50 bg-primary text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2.5 bg-white/10 rounded-xl"
            aria-label={t.menu}
          >
            <Menu size={20} />
          </button>
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="p-2 bg-white/10 rounded-xl flex items-center gap-2 text-[9px] font-black uppercase"
          >
            <Languages size={18} />
            <span className="hidden lg:inline">{t.switchLang}</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setActiveTab("main")}>
          <div className="text-white font-black text-lg md:text-xl">ريبورت</div>
          <div className="bg-white text-primary font-black px-2 py-0.5 text-lg md:text-xl rounded-xl shadow-xl">
            زهراء
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("admin")}
            className={`p-2.5 rounded-xl ${activeTab === "admin" ? "bg-white text-primary" : "bg-white/10"}`}
            aria-label={t.aria.dashboard}
          >
            <LayoutDashboard size={20} />
          </button>
        </div>
      </div>

      <div className="bg-primary-dark border-t border-white/10">
        <nav className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-6 py-2.5 text-[10px] font-black uppercase overflow-x-auto no-scrollbar">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as CategoryId)}
              className={`relative py-1 transition-all flex items-center gap-1.5 ${activeTab === item.id ? "opacity-100 scale-110" : "opacity-60 hover:opacity-100"}`}
            >
              {t.nav[item.id as keyof typeof t.nav]}
              {item.isLive && <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
