"use client"

import type React from "react"

import { useState } from "react"
import { X, Bug, Send, CheckCircle, Loader2 } from "lucide-react"
import type { Language } from "@/lib/types"

interface BugReportModalProps {
  isOpen: boolean
  onClose: () => void
  lang: Language
  translations: any
}

export function BugReportModal({ isOpen, onClose, lang, translations }: BugReportModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const t = translations.bugForm

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-gray-50 rounded-full hover:bg-red-50 hover:text-red-600 transition-all z-10"
        >
          <X size={20} aria-hidden="true" />
        </button>
        {submitted ? (
          <div className="p-12 text-center space-y-6 animate-fade-in-up">
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto ring-8 ring-green-50/50">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-2xl font-black text-gray-900">تم الإرسال!</h2>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">{t.success}</p>
            <button
              onClick={onClose}
              className="w-full py-4 bg-black text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-gray-800 transition-all"
            >
              إغلاق
            </button>
          </div>
        ) : (
          <div className="p-8 md:p-10 space-y-6">
            <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
              <div className="p-4 bg-red-600 text-white rounded-2xl shadow-lg shadow-red-100">
                <Bug size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900 leading-none">{t.title}</h2>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                required
                className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl text-[11px] font-black outline-none focus:bg-white focus:border-primary transition-all"
                placeholder={t.subject}
              />
              <textarea
                required
                rows={4}
                className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl text-[11px] font-black outline-none focus:bg-white focus:border-primary transition-all resize-none"
                placeholder={t.detail}
              ></textarea>
              <button
                disabled={loading}
                type="submit"
                className="w-full py-5 bg-primary text-white rounded-2xl font-black text-[11px] shadow-xl shadow-red-100 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>
                    <Send size={18} /> {t.send}
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
