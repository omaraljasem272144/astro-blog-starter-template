"use client"

import { useState, useEffect } from "react"
import { Signal } from "lucide-react"
import type { BreakingAlert } from "@/lib/types"

interface BreakingNewsProps {
  translations: any
}

export function BreakingNews({ translations }: BreakingNewsProps) {
  const t = translations
  const [alerts, setAlerts] = useState<BreakingAlert[]>([])
  const [scrollSpeed, setScrollSpeed] = useState(30)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || !mounted) return

    // Load initial data from localStorage
    const loadAlerts = () => {
      try {
        const stored = localStorage.getItem("breaking_alerts")
        if (stored) {
          const parsed = JSON.parse(stored)
          setAlerts(Array.isArray(parsed) ? parsed : [])
        }
      } catch (e) {
        console.error("Failed to parse breaking alerts:", e)
        setAlerts([])
      }
    }

    const loadScrollSpeed = () => {
      try {
        const storedSpeed = localStorage.getItem("marquee_speed")
        if (storedSpeed) {
          const speed = Number(storedSpeed)
          if (!isNaN(speed) && speed > 0) {
            setScrollSpeed(speed)
          }
        }
      } catch (e) {
        console.error("Failed to load scroll speed:", e)
      }
    }

    loadAlerts()
    loadScrollSpeed()

    // Listen for storage changes to update in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "breaking_alerts") {
        loadAlerts()
      }
      if (e.key === "marquee_speed") {
        loadScrollSpeed()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Also check for updates periodically
    const interval = setInterval(() => {
      loadAlerts()
      loadScrollSpeed()
    }, 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [mounted])

  if (!mounted || alerts.length === 0) {
    return null
  }

  return (
    <div className="bg-white border-b py-2">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-6">
        <div className="bg-primary text-white text-[8px] font-black px-3 py-1 rounded-lg flex items-center gap-2 uppercase animate-pulse">
          <Signal size={12} /> {t.breaking}
        </div>
        <div className="text-[11px] font-black text-gray-800 flex-1 overflow-hidden">
          <div
            key={scrollSpeed}
            className="whitespace-nowrap inline-block py-1"
            style={{
              animation: `marquee ${scrollSpeed}s linear infinite`,
            }}
          >
            {alerts.map((alert) => (
              <span key={alert.id} className="mx-4">
                • {alert.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
