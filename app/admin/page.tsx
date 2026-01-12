"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Shield, LogOut, Plus, Edit2, Trash2, Save, X, FileText, Megaphone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { NewsItem, LiveChannel, BreakingAlert } from "@/lib/types"
import { INITIAL_NEWS_DATA, INITIAL_CHANNELS, INITIAL_BREAKING_ALERTS } from "@/lib/data"

// Authorized passports
const AUTHORIZED_PASSPORT = "omar"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passport, setPassport] = useState("")
  const [error, setError] = useState("")
  const [newsData, setNewsData] = useState(INITIAL_NEWS_DATA)
  const [channels, setChannels] = useState(INITIAL_CHANNELS)
  const [breakingAlerts, setBreakingAlerts] = useState(INITIAL_BREAKING_ALERTS)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [editingChannel, setEditingChannel] = useState<LiveChannel | null>(null)
  const [editingAlert, setEditingAlert] = useState<BreakingAlert | null>(null)
  const [showCertificate, setShowCertificate] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth")
    if (auth) {
      setIsAuthenticated(true)
    }
    const storedNews = localStorage.getItem("admin_news")
    if (storedNews) {
      try {
        setNewsData(JSON.parse(storedNews))
      } catch (e) {
        console.error("Failed to load news data:", e)
      }
    }
    const stored = localStorage.getItem("breaking_alerts")
    if (stored) {
      try {
        setBreakingAlerts(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to load breaking alerts:", e)
      }
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("admin_news", JSON.stringify(newsData))
      localStorage.setItem("breaking_alerts", JSON.stringify(breakingAlerts))
    }
  }, [newsData, breakingAlerts, isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passport.trim().toLowerCase() === AUTHORIZED_PASSPORT) {
      localStorage.setItem("admin_auth", passport)
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("رمز الدخول غير صحيح")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_auth")
    setIsAuthenticated(false)
    setPassport("")
  }

  const handleDeleteNews = (category: string, id: string) => {
    setNewsData((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item.id !== id),
    }))
  }

  const handleSaveNews = (category: string, news: NewsItem) => {
    if (editingNews && editingNews.id) {
      setNewsData((prev) => ({
        ...prev,
        [category]: prev[category].map((item) => (item.id === news.id ? news : item)),
      }))
    } else {
      const newNews = { ...news, id: Date.now().toString() }
      setNewsData((prev) => ({
        ...prev,
        [category]: [...prev[category], newNews],
      }))
    }
    setEditingNews(null)
  }

  const handleDeleteChannel = (id: string) => {
    setChannels((prev) => prev.filter((ch) => ch.id !== id))
  }

  const handleSaveChannel = (channel: LiveChannel) => {
    if (editingChannel && editingChannel.id) {
      setChannels((prev) => prev.map((ch) => (ch.id === channel.id ? channel : ch)))
    } else {
      const newChannel = { ...channel, id: Date.now().toString() }
      setChannels((prev) => [...prev, newChannel])
    }
    setEditingChannel(null)
  }

  const handleDeleteAlert = (id: string) => {
    setBreakingAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }

  const handleSaveAlert = (alert: BreakingAlert) => {
    if (editingAlert && editingAlert.id) {
      setBreakingAlerts((prev) => prev.map((a) => (a.id === alert.id ? alert : a)))
    } else {
      const newAlert = { ...alert, id: Date.now().toString(), timestamp: new Date().toISOString() }
      setBreakingAlerts((prev) => [newAlert, ...prev])
    }
    setEditingAlert(null)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <Shield className="w-16 h-16 text-red-600 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة التحكم</h1>
            <p className="text-gray-600 text-center">Zahra Report Admin Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="passport" className="text-lg mb-2 block">
                رمز الدخول
              </Label>
              <Input
                id="passport"
                type="password"
                value={passport}
                onChange={(e) => setPassport(e.target.value)}
                placeholder="أدخل رمز الدخول"
                className="text-lg py-6"
                required
              />
            </div>

            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6">
              <Shield className="w-5 h-5 ml-2" />
              تسجيل الدخول
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t">
            <Button variant="outline" onClick={() => setShowCertificate(!showCertificate)} className="w-full">
              <FileText className="w-5 h-5 ml-2" />
              عرض شهادة الإنشاء
            </Button>
          </div>

          {showCertificate && <CertificateCard />}
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-red-600" />
            <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم - Zahra Report</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className="bg-red-600 hover:bg-red-700"
            >
              <ArrowRight className="w-5 h-5 ml-2" />
              العودة للموقع
            </Button>
            <Button variant="outline" onClick={() => setShowCertificate(!showCertificate)}>
              <FileText className="w-5 h-5 ml-2" />
              الشهادة
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="w-5 h-5 ml-2" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {showCertificate && <CertificateCard />}

        <Tabs defaultValue="news" className="mt-6">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="news" className="text-lg py-3">
              إدارة الأخبار
            </TabsTrigger>
            <TabsTrigger value="channels" className="text-lg py-3">
              إدارة القنوات
            </TabsTrigger>
            <TabsTrigger value="breaking" className="text-lg py-3">
              الأخبار العاجلة
            </TabsTrigger>
          </TabsList>

          <TabsContent value="news">
            <NewsManagement
              newsData={newsData}
              editingNews={editingNews}
              setEditingNews={setEditingNews}
              onDelete={handleDeleteNews}
              onSave={handleSaveNews}
            />
          </TabsContent>

          <TabsContent value="channels">
            <ChannelsManagement
              channels={channels}
              editingChannel={editingChannel}
              setEditingChannel={setEditingChannel}
              onDelete={handleDeleteChannel}
              onSave={handleSaveChannel}
            />
          </TabsContent>

          <TabsContent value="breaking">
            <BreakingAlertsManagement
              alerts={breakingAlerts}
              editingAlert={editingAlert}
              setEditingAlert={setEditingAlert}
              onDelete={handleDeleteAlert}
              onSave={handleSaveAlert}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function CertificateCard() {
  return (
    <Card className="mt-6 p-8 bg-gradient-to-br from-amber-50 to-amber-100 border-4 border-amber-400 shadow-2xl">
      <div className="text-center space-y-6">
        <div className="border-b-2 border-amber-600 pb-4">
          <h2 className="text-4xl font-bold text-amber-900 mb-2">شهادة إنشاء</h2>
          <p className="text-xl text-amber-800">Certificate of Creation</p>
        </div>

        <div className="py-8 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-1 bg-amber-600"></div>
            <Shield className="w-12 h-12 text-amber-700" />
            <div className="w-16 h-1 bg-amber-600"></div>
          </div>

          <p className="text-2xl text-gray-800 leading-relaxed">هذا الموقع تم إنشاؤه وتطويره بواسطة</p>

          <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-amber-500">
            <h3 className="text-5xl font-bold text-red-600 mb-2">Omar Aljasem</h3>
            <p className="text-xl text-gray-700">عمر الجاسم</p>
          </div>

          <p className="text-lg text-gray-700 mt-6">
            منصة زهراء ريبورت الإخبارية
            <br />
            Zahra Report News Platform
          </p>

          <div className="text-sm text-gray-600 mt-4">{new Date().getFullYear()} ©</div>
        </div>

        <div className="border-t-2 border-amber-600 pt-4">
          <p className="text-amber-800 text-sm italic">"الصحافة المهنية هي صوت الحقيقة في عالم متغير"</p>
        </div>
      </div>
    </Card>
  )
}

function NewsManagement({
  newsData,
  editingNews,
  setEditingNews,
  onDelete,
  onSave,
}: {
  newsData: Record<string, NewsItem[]>
  editingNews: NewsItem | null
  setEditingNews: (news: NewsItem | null) => void
  onDelete: (category: string, id: string) => void
  onSave: (category: string, news: NewsItem) => void
}) {
  const [selectedCategory, setSelectedCategory] = useState("latest")

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">إدارة الأخبار</h2>
          <Button onClick={() => setEditingNews({ id: "", title: "", image: "", category: "", timeAgo: "" })}>
            <Plus className="w-5 h-5 ml-2" />
            إضافة خبر جديد
          </Button>
        </div>

        {editingNews && (
          <Card className="p-6 mb-6 bg-blue-50 border-2 border-blue-300">
            <h3 className="text-xl font-bold mb-4">{editingNews.id ? "تعديل خبر" : "إضافة خبر جديد"}</h3>
            <NewsForm
              news={editingNews}
              onChange={setEditingNews}
              onSave={(news) => onSave(selectedCategory, news)}
              onCancel={() => setEditingNews(null)}
            />
          </Card>
        )}

        <div className="mb-4">
          <Label>اختر القسم</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">آخر الأخبار</SelectItem>
              <SelectItem value="breaking">عاجل</SelectItem>
              <SelectItem value="economy">اقتصاد</SelectItem>
              <SelectItem value="sport">رياضة</SelectItem>
              <SelectItem value="video">فيديو</SelectItem>
              <SelectItem value="photos">صور</SelectItem>
              <SelectItem value="podcast">بودكاست</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {newsData[selectedCategory]?.map((item) => (
            <Card key={item.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-4 flex-1">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-32 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-600">
                      {item.category} • {item.timeAgo}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingNews(item)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => onDelete(selectedCategory, item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  )
}

function NewsForm({
  news,
  onChange,
  onSave,
  onCancel,
}: {
  news: NewsItem
  onChange: (news: NewsItem) => void
  onSave: (news: NewsItem) => void
  onCancel: () => void
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label>عنوان الخبر</Label>
        <Input value={news.title} onChange={(e) => onChange({ ...news, title: e.target.value })} />
      </div>
      <div>
        <Label>رابط الصورة</Label>
        <Input value={news.image} onChange={(e) => onChange({ ...news, image: e.target.value })} />
      </div>
      <div>
        <Label>الفئة</Label>
        <Input value={news.category} onChange={(e) => onChange({ ...news, category: e.target.value })} />
      </div>
      <div>
        <Label>الوقت</Label>
        <Input value={news.timeAgo} onChange={(e) => onChange({ ...news, timeAgo: e.target.value })} />
      </div>
      <div>
        <Label>معرف YouTube (اختياري)</Label>
        <Input value={news.youtubeId || ""} onChange={(e) => onChange({ ...news, youtubeId: e.target.value })} />
      </div>
      <div className="flex gap-2">
        <Button onClick={() => onSave(news)} className="flex-1">
          <Save className="w-4 h-4 ml-2" />
          حفظ
        </Button>
        <Button variant="outline" onClick={onCancel}>
          <X className="w-4 h-4 ml-2" />
          إلغاء
        </Button>
      </div>
    </div>
  )
}

function ChannelsManagement({
  channels,
  editingChannel,
  setEditingChannel,
  onDelete,
  onSave,
}: {
  channels: LiveChannel[]
  editingChannel: LiveChannel | null
  setEditingChannel: (channel: LiveChannel | null) => void
  onDelete: (id: string) => void
  onSave: (channel: LiveChannel) => void
}) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">إدارة قنوات البث المباشر</h2>
          <Button onClick={() => setEditingChannel({ id: "", name: "", videoId: "", logo: "", country: "" })}>
            <Plus className="w-5 h-5 ml-2" />
            إضافة قناة جديدة
          </Button>
        </div>

        {editingChannel && (
          <Card className="p-6 mb-6 bg-green-50 border-2 border-green-300">
            <h3 className="text-xl font-bold mb-4">{editingChannel.id ? "تعديل قناة" : "إضافة قناة جديدة"}</h3>
            <ChannelForm
              channel={editingChannel}
              onChange={setEditingChannel}
              onSave={onSave}
              onCancel={() => setEditingChannel(null)}
            />
          </Card>
        )}

        <div className="grid gap-4">
          {channels.map((channel) => (
            <Card key={channel.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center gap-4">
                <div className="flex gap-4 items-center flex-1">
                  <img
                    src={channel.logo || "/placeholder.svg"}
                    alt={channel.name}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{channel.name}</h3>
                    <p className="text-sm text-gray-600">
                      {channel.country} • ID: {channel.videoId}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingChannel(channel)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => onDelete(channel.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  )
}

function ChannelForm({
  channel,
  onChange,
  onSave,
  onCancel,
}: {
  channel: LiveChannel
  onChange: (channel: LiveChannel) => void
  onSave: (channel: LiveChannel) => void
  onCancel: () => void
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label>اسم القناة</Label>
        <Input value={channel.name} onChange={(e) => onChange({ ...channel, name: e.target.value })} />
      </div>
      <div>
        <Label>معرف YouTube</Label>
        <Input value={channel.videoId} onChange={(e) => onChange({ ...channel, videoId: e.target.value })} />
      </div>
      <div>
        <Label>رابط الشعار</Label>
        <Input value={channel.logo} onChange={(e) => onChange({ ...channel, logo: e.target.value })} />
      </div>
      <div>
        <Label>الدولة</Label>
        <Input value={channel.country} onChange={(e) => onChange({ ...channel, country: e.target.value })} />
      </div>
      <div className="flex gap-2">
        <Button onClick={() => onSave(channel)} className="flex-1 bg-red-600 hover:bg-red-700 text-lg py-6">
          <Save className="w-4 h-4 ml-2" />
          حفظ ونشر
        </Button>
        <Button variant="outline" onClick={onCancel} className="text-lg py-6 bg-transparent">
          <X className="w-4 h-4 ml-2" />
          إلغاء
        </Button>
      </div>
    </div>
  )
}

function BreakingAlertsManagement({
  alerts,
  editingAlert,
  setEditingAlert,
  onDelete,
  onSave,
}: {
  alerts: BreakingAlert[]
  editingAlert: BreakingAlert | null
  setEditingAlert: (alert: BreakingAlert | null) => void
  onDelete: (id: string) => void
  onSave: (alert: BreakingAlert) => void
}) {
  const [scrollSpeed, setScrollSpeed] = useState(30)

  useEffect(() => {
    const stored = localStorage.getItem("marquee_speed")
    if (stored) {
      setScrollSpeed(Number(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("marquee_speed", scrollSpeed.toString())
  }, [scrollSpeed])

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Megaphone className="w-8 h-8 text-red-600" />
            <h2 className="text-2xl font-bold">إدارة الأخبار العاجلة</h2>
          </div>
          <Button
            onClick={() => setEditingAlert({ id: "", text: "", timestamp: new Date().toISOString() })}
            className="bg-red-600 hover:bg-red-700"
          >
            <Plus className="w-5 h-5 ml-2" />
            إضافة خبر عاجل
          </Button>
        </div>

        <Card className="p-6 mb-6 bg-purple-50 border-2 border-purple-300">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">⚡ التحكم في سرعة الشريط المتحرك</h3>
          <div className="space-y-4">
            <div>
              <Label className="text-lg mb-2 block">سرعة التمرير (ثواني)</Label>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  min="5"
                  max="100"
                  step="5"
                  value={scrollSpeed}
                  onChange={(e) => setScrollSpeed(Number(e.target.value))}
                  className="text-lg py-3"
                />
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  {scrollSpeed < 15
                    ? "سريع جداً ⚡"
                    : scrollSpeed < 30
                      ? "سريع 🚀"
                      : scrollSpeed < 50
                        ? "متوسط ⏱️"
                        : "بطيء 🐢"}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">القيمة الافتراضية: 30 ثانية. كلما قلت القيمة، زادت السرعة.</p>
            </div>
          </div>
        </Card>

        {editingAlert && (
          <Card className="p-6 mb-6 bg-red-50 border-2 border-red-300">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Megaphone className="w-6 h-6 text-red-600" />
              {editingAlert.id ? "تعديل خبر عاجل" : "إضافة خبر عاجل جديد"}
            </h3>
            <AlertForm
              alert={editingAlert}
              onChange={setEditingAlert}
              onSave={onSave}
              onCancel={() => setEditingAlert(null)}
            />
          </Card>
        )}

        <div className="space-y-3">
          {alerts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Megaphone className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-lg">لا توجد أخبار عاجلة حالياً</p>
            </div>
          ) : (
            alerts.map((alert) => (
              <Card key={alert.id} className="p-4 hover:shadow-lg transition-shadow border-r-4 border-red-600">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Megaphone className="w-5 h-5 text-red-600" />
                      <span className="text-xs text-gray-500">{new Date(alert.timestamp).toLocaleString("ar-SA")}</span>
                    </div>
                    <p className="font-bold text-lg text-gray-900">{alert.text}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingAlert(alert)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => onDelete(alert.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}

function AlertForm({
  alert,
  onChange,
  onSave,
  onCancel,
}: {
  alert: BreakingAlert
  onChange: (alert: BreakingAlert) => void
  onSave: (alert: BreakingAlert) => void
  onCancel: () => void
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="alert-text" className="text-base font-semibold mb-2 block">
          نص الخبر العاجل
        </Label>
        <Textarea
          id="alert-text"
          value={alert.text}
          onChange={(e) => onChange({ ...alert, text: e.target.value })}
          placeholder="أدخل نص الخبر العاجل هنا..."
          className="min-h-[120px] text-base"
          required
        />
        <p className="text-sm text-gray-500 mt-1">نص فقط - لا صور أو روابط</p>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => onSave(alert)} className="flex-1 bg-red-600 hover:bg-red-700 text-lg py-6">
          <Save className="w-4 h-4 ml-2" />
          حفظ وينشر
        </Button>
        <Button variant="outline" onClick={onCancel} className="text-lg py-6 bg-transparent">
          <X className="w-4 h-4 ml-2" />
          إلغاء
        </Button>
      </div>
    </div>
  )
}
