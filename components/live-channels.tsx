"use client"

import { useState, useEffect, useRef } from "react"
import { Tv, Signal, ShieldAlert, RotateCcw, Loader2 } from "lucide-react"
import { ShareMenu } from "./share-menu"
import { INITIAL_CHANNELS } from "@/lib/data"
import type { Language, LiveChannel } from "@/lib/types"

interface LiveChannelsProps {
  lang: Language
  translations: any
}

const extractYouTubeId = (url: string) => {
  if (!url) return ""

  // Handle direct video IDs
  if (url.length === 11 && !url.includes("/") && !url.includes("?")) {
    return url
  }

  // Handle various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/live\/)([^#&?/]{11})/,
    /youtube\.com\/shorts\/([^#&?/]{11})/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return ""
}

export function LiveChannels({ lang, translations }: LiveChannelsProps) {
  const [channels] = useState<LiveChannel[]>(INITIAL_CHANNELS)
  const [activeChannel, setActiveChannel] = useState<LiveChannel>(channels[0])
  const [playerError, setPlayerError] = useState(false)
  const [playerErrorMessage, setPlayerErrorMessage] = useState("")
  const [isRetrying, setIsRetrying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const playerRef = useRef<any>(null)
  const playerContainerId = "yt-player-container"
  const t = translations

  const initPlayer = () => {
    try {
      setIsLoading(true)

      if (playerRef.current) {
        try {
          playerRef.current.destroy()
        } catch (e) {
          // Ignore cleanup errors
        }
        playerRef.current = null
      }

      const container = document.getElementById(playerContainerId)
      if (!container) {
        return
      }

      if (!(window as any).YT || !(window as any).YT.Player) {
        return
      }

      const videoId = extractYouTubeId(activeChannel.videoId)

      playerRef.current = new (window as any).YT.Player(playerContainerId, {
        height: "100%",
        width: "100%",
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          mute: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          enablejsapi: 1,
          origin: typeof window !== "undefined" ? window.location.origin : "",
          fs: 1,
          cc_load_policy: 0,
          iv_load_policy: 3,
          disablekb: 0,
        },
        events: {
          onReady: (event: any) => {
            setPlayerError(false)
            setIsRetrying(false)
            setIsLoading(false)
            try {
              event.target.playVideo()
            } catch (e) {
              // Ignore autoplay errors
            }
          },
          onError: (event: any) => {
            let msg = t.errors.default
            if (event.data === 101 || event.data === 150) {
              msg = t.errors.restricted
            } else if (event.data === 100) {
              msg = t.errors.notFound
            } else if (event.data === 2) {
              msg = "معرف الفيديو غير صالح"
            }
            setPlayerErrorMessage(msg)
            setPlayerError(true)
            setIsRetrying(false)
            setIsLoading(false)
          },
          onStateChange: (event: any) => {
            // Player state tracking
          },
        },
      })
    } catch (e) {
      console.error("YouTube Player Init Error:", e)
      setPlayerError(true)
      setPlayerErrorMessage(t.errors.default)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setPlayerError(false)
    setIsLoading(true)

    if ((window as any).YT && (window as any).YT.Player) {
      initPlayer()
    } else {
      const checkAPI = setInterval(() => {
        if ((window as any).YT && (window as any).YT.Player) {
          clearInterval(checkAPI)
          initPlayer()
        }
      }, 100)

      return () => {
        clearInterval(checkAPI)
        if (playerRef.current && playerRef.current.destroy) {
          try {
            playerRef.current.destroy()
          } catch (e) {
            // Ignore cleanup errors
          }
        }
        playerRef.current = null
      }
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy()
        } catch (e) {
          // Ignore cleanup errors
        }
      }
      playerRef.current = null
    }
  }, [activeChannel])

  return (
    <div className="animate-fade-in max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col items-center gap-2 mb-6 text-center">
        <div className="p-2 bg-gradient-to-br from-primary to-primary-darker text-white rounded-lg shadow-sm flex items-center justify-center">
          <Tv size={16} aria-hidden="true" />
        </div>
        <h2 className="text-md md:text-lg font-black text-gray-900 leading-tight uppercase tracking-tight">{t.live}</h2>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white relative group">
            <div id={playerContainerId} className="w-full h-full"></div>

            {isLoading && !playerError && (
              <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-40">
                <Loader2 size={60} className="text-primary animate-spin mb-4" />
                <p className="text-white text-sm">جاري تحميل البث المباشر...</p>
              </div>
            )}

            {playerError && (
              <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center p-8 text-center z-50">
                <ShieldAlert size={60} className="text-red-500 mb-4" />
                <h3 className="text-xl font-black text-white mb-2">{t.videoError}</h3>
                <p className="text-gray-400 text-sm mb-6 max-w-md">{playerErrorMessage}</p>
                <button
                  onClick={() => {
                    setIsRetrying(true)
                    setPlayerError(false)
                    initPlayer()
                  }}
                  disabled={isRetrying}
                  className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-xs flex items-center gap-2 disabled:opacity-50"
                >
                  {isRetrying ? <Loader2 size={18} className="animate-spin" /> : <RotateCcw size={18} />} {t.retry}
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between p-4 bg-white rounded-3xl border">
            <div className="flex items-center gap-4">
              <img
                src={activeChannel.logo || "/placeholder.svg"}
                alt={activeChannel.name}
                className="w-12 h-12 rounded-full object-contain border p-1"
              />
              <div className="text-right">
                <h2 className="font-black text-lg leading-tight">{activeChannel.name}</h2>
                <p className="text-xs text-gray-400 font-bold">{activeChannel.country}</p>
              </div>
            </div>
            <ShareMenu title={activeChannel.name} label={t.share} />
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-5 shadow-sm border overflow-y-auto max-h-[600px] no-scrollbar">
          <h3 className="text-center font-black text-primary text-xs mb-4 flex items-center justify-center gap-2">
            <Signal size={14} className="animate-pulse" /> {t.followLive}
          </h3>
          <div className="space-y-2">
            {channels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChannel(ch)}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl border transition-all text-right ${activeChannel.id === ch.id ? "bg-primary text-white shadow-xl" : "bg-white hover:bg-red-50"}`}
              >
                <img
                  src={ch.logo || "/placeholder.svg"}
                  alt={ch.name}
                  className="w-10 h-10 object-contain bg-white rounded p-1 flex-shrink-0"
                />
                <div className="flex-1 text-right min-w-0">
                  <div className="text-sm font-black leading-tight truncate">{ch.name}</div>
                  <div className={`text-xs mt-0.5 ${activeChannel.id === ch.id ? "text-white/70" : "text-gray-400"}`}>
                    {ch.country}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
