"use client"

import { X, Languages, Signal, Zap, Layers, CheckCircle } from "lucide-react"
import { NAV_ITEMS } from "@/lib/data"
import type { CategoryId, Language } from "@/lib/types"

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  activeTab: CategoryId
  onTabSelect: (id: CategoryId) => void
  lang: Language
  onLangSwitch: () => void
  translations: any
}

export function MobileDrawer({
  isOpen,
  onClose,
  activeTab,
  onTabSelect,
  lang,
  onLangSwitch,
  translations,
}: MobileDrawerProps) {
  if (!isOpen) return null
  const t = translations

  return (
    <div className="fixed inset-0 z-[100] flex animate-fade-in" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div
        className={`relative bg-white w-[80%] max-w-xs h-full flex flex-col shadow-2xl transition-transform duration-300 ${lang === "ar" ? "translate-x-0 ml-auto animate-slide-in-right" : "translate-x-0 mr-auto animate-slide-in-left"}`}
      >
        <div className="p-6 flex items-center justify-between border-b border-gray-50">
          <div className="flex items-center gap-1.5">
            <div className="bg-primary text-white font-black px-2 py-0.5 text-md rounded-lg">{t.zahra}</div>
            <div className="text-primary font-black text-md">{t.report}</div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-gray-50 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <button
            onClick={() => {
              onLangSwitch()
              onClose()
            }}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-xs font-black text-gray-700 bg-gray-50 hover:bg-red-50 transition-all mb-4"
          >
            <Languages size={18} className="text-primary" />
            <span>{t.switchLang}</span>
          </button>
          <h3 className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">{t.sections}</h3>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabSelect(item.id as CategoryId)
                onClose()
              }}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-xs font-black transition-all ${activeTab === item.id ? "bg-red-50 text-primary" : "text-gray-700 hover:bg-gray-50"}`}
            >
              {item.isLive && <Signal size={16} className="text-red-500 animate-pulse" />}
              {item.isBreaking && <Zap size={16} className="text-yellow-500 fill-yellow-500" />}
              {!item.isLive && !item.isBreaking && <Layers size={16} className="text-gray-400" />}
              {t.nav[item.id as keyof typeof t.nav]}
              {activeTab === item.id && <CheckCircle size={14} className="ms-auto" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
