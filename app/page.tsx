"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BreakingNews } from "@/components/breaking-news"
import { SplashScreen } from "@/components/splash-screen"
import { BugReportModal } from "@/components/bug-report-modal"
import { FeedbackModal } from "@/components/feedback-modal"
import { MobileDrawer } from "@/components/mobile-drawer"
import { NewsGrid } from "@/components/news-grid"
import { LiveChannels } from "@/components/live-channels"
import { TRANSLATIONS } from "@/lib/translations"
import type { CategoryId, Language } from "@/lib/types"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<CategoryId>("main")
  const [lang, setLang] = useState<Language>("ar")
  const [showSplash, setShowSplash] = useState(true)
  const [showBugModal, setShowBugModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const t = TRANSLATIONS[lang]

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [showSplash])

  useEffect(() => {
    if (activeTab === "admin") {
      router.push("/admin")
    }
  }, [activeTab, router])

  const renderContent = () => {
    if (activeTab === "live") {
      return <LiveChannels lang={lang} translations={t} />
    }

    return <NewsGrid activeTab={activeTab} lang={lang} translations={t} />
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <BugReportModal isOpen={showBugModal} onClose={() => setShowBugModal(false)} lang={lang} translations={t} />
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        lang={lang}
        translations={t}
      />
      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeTab={activeTab}
        onTabSelect={setActiveTab}
        lang={lang}
        onLangSwitch={() => setLang(lang === "ar" ? "en" : "ar")}
        translations={t}
      />

      <div
        className={`min-h-screen flex flex-col overflow-x-hidden ${showSplash ? "h-screen overflow-hidden" : ""}`}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          lang={lang}
          setLang={setLang}
          setIsMenuOpen={setIsMenuOpen}
          translations={t}
        />

        <BreakingNews translations={t} />

        <main className="max-w-[1200px] mx-auto px-4 py-8 flex-grow w-full">{renderContent()}</main>

        <Footer translations={t} setShowBugModal={setShowBugModal} />
      </div>
    </>
  )
}
