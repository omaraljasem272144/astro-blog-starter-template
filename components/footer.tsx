"use client"

import { Facebook, Instagram, Youtube, Video } from "lucide-react"
import { SOCIAL_LINKS } from "@/lib/data"

const ICON_MAP = {
  Facebook,
  Instagram,
  Youtube,
  Video,
}

interface FooterProps {
  translations: any
  setShowBugModal: (show: boolean) => void
}

export function Footer({ translations, setShowBugModal }: FooterProps) {
  const t = translations

  return (
    <footer className="bg-foreground text-white py-12 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-right">
        <div className="md:col-span-2 space-y-4">
          <h2 className="font-black text-xl">زهراء ريبورت</h2>
          <p className="text-gray-400 text-xs italic">"عينك على الحقيقة.. لحظة بلحظة"</p>
          <div className="flex justify-center md:justify-start gap-4">
            {SOCIAL_LINKS.map((s, idx) => {
              const Icon = ICON_MAP[s.icon as keyof typeof ICON_MAP]
              return (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-primary transition-all"
                >
                  <Icon size={20} />
                </a>
              )
            })}
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-black text-xs text-primary uppercase">تواصل معنا</h3>
          <p className="text-gray-500 text-[10px] font-black">{t.dubai}</p>
          <a
            href="mailto:zahraamohamad131@gmail.com"
            className="block text-gray-500 text-[10px] font-black hover:text-white"
          >
            zahraamohamad131@gmail.com
          </a>
          <button onClick={() => setShowBugModal(true)} className="block text-red-500 text-[10px] font-black">
            إبلاغ عن مشكلة
          </button>
        </div>
      </div>
    </footer>
  )
}
