"use client"

import { useState, useEffect } from "react"

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [exit, setExit] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setExit(true)
      setTimeout(onComplete, 800)
    }, 1500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-700 ${exit ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      role="status"
      aria-live="polite"
      aria-label="Welcome Screen"
    >
      <div className="relative flex flex-col items-center gap-6">
        <div className="absolute inset-0 bg-red-600/20 blur-[100px] scale-150 animate-pulse"></div>
        <div className="relative animate-bounce-slow">
          <div className="flex items-center gap-2 drop-shadow-[0_0_30px_rgba(184,0,0,0.5)]">
            <div className="text-white font-black text-4xl md:text-6xl tracking-tighter">ريبورت</div>
            <div className="bg-primary text-white font-black px-4 py-1 text-4xl md:text-6xl rounded-2xl shadow-2xl">
              زهراء
            </div>
          </div>
        </div>
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mt-4">
          <div className="h-full bg-red-600 animate-loading-bar"></div>
        </div>
      </div>
    </div>
  )
}
