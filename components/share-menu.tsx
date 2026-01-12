"use client"

import { useState } from "react"
import { Share2, Facebook, Twitter, MessageCircle, Link } from "lucide-react"

interface ShareMenuProps {
  title: string
  url?: string
  label: string
}

export function ShareMenu({ title, url, label }: ShareMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      setIsOpen(false)
    }, 1500)
  }

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1.5 text-gray-500 hover:text-primary"
        title={label}
      >
        <Share2 size={16} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[60]" onClick={() => setIsOpen(false)}></div>
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-[70] min-w-[140px] animate-fade-in-up">
            <div className="grid grid-cols-4 gap-1">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 hover:bg-blue-50 text-blue-600 rounded-xl transition-all"
              >
                <Facebook size={18} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 hover:bg-gray-50 text-black rounded-xl transition-all"
              >
                <Twitter size={18} />
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 hover:bg-green-50 text-green-600 rounded-xl transition-all"
              >
                <MessageCircle size={18} />
              </a>
              <button
                onClick={handleCopy}
                className="p-2.5 hover:bg-red-50 text-primary rounded-xl transition-all relative"
              >
                <Link size={18} />
                {copied && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] px-2 py-1 rounded whitespace-nowrap">
                    تم النسخ
                  </span>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
