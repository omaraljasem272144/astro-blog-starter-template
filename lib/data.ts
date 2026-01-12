import type { NewsItem, LiveChannel, BreakingAlert } from "./types"

export const INITIAL_CHANNELS: LiveChannel[] = [
  {
    id: "aljazeera",
    name: "الجزيرة مباشر",
    videoId: "gCNeDWCI0vo",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Aljazeera_eng.svg/1200px-Aljazeera_eng.svg.png",
    country: "قطر",
  },
  {
    id: "alarabiya",
    name: "قناة العربية",
    videoId: "kVK0U85R7t0",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Al_Arabiya_logo.svg/512px-Al_Arabiya_logo.svg.png",
    country: "السعودية",
  },
  {
    id: "alhadath",
    name: "قناة الحدث",
    videoId: "Y12sguKbLLo",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Al_Hadath_Logo.svg/512px-Al_Hadath_Logo.svg.png",
    country: "السعودية",
  },
  {
    id: "skynews",
    name: "سكاي نيوز عربية",
    videoId: "Zp-73_vfcYg",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Sky_News_Arabia_logo.svg/512px-Sky_News_Arabia_logo.svg.png",
    country: "الإمارات",
  },
  {
    id: "asharq",
    name: "الشرق للأخبار",
    videoId: "0kFqeZd3cgE",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Asharq_News_Logo.svg/512px-Asharq_News_Logo.svg.png",
    country: "السعودية",
  },
  {
    id: "bbc_arabic",
    name: "بي بي سي عربي",
    videoId: "BN87Bgwxamk",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/BBC_News_Arabic.svg/512px-BBC_News_Arabic.svg.png",
    country: "بريطانيا",
  },
  {
    id: "france24",
    name: "فرانس 24 عربي",
    videoId: "mNfInL28Dvo",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/France_24_logo.svg/512px-France_24_logo.svg.png",
    country: "فرنسا",
  },
  {
    id: "rt_arabic",
    name: "روسيا اليوم",
    videoId: "fS_gD-8I5u4",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/RT_logo.svg/512px-RT_logo.svg.png",
    country: "روسيا",
  },
  {
    id: "dwarabic",
    name: "DW عربي",
    videoId: "8V88W6Pj2-o",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Deutsche_Welle_logo.svg/512px-Deutsche_Welle_logo.svg.png",
    country: "ألمانيا",
  },
  {
    id: "euronews",
    name: "يورونيوز عربي",
    videoId: "x0_S6I2-vY8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Euronews_logo_2016.svg/512px-Euronews_logo_2016.svg.png",
    country: "أوروبا",
  },
  {
    id: "trtarabic",
    name: "TRT عربي",
    videoId: "4uF0h0o2y9M",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/TRT_Logo.svg/512px-TRT_Logo.svg.png",
    country: "تركيا",
  },
  {
    id: "almashhad",
    name: "قناة المشهد",
    videoId: "Ym7L6uX89p8",
    logo: "https://yt3.googleusercontent.com/y8Fst6vC5YI8Oq_uUvJ8LqL_X8oXG7uK9z9LqL_X8oXG7uK9z=s160-c-k-c0x00ffffff-no-rj",
    country: "الإمارات",
  },
]

export const INITIAL_NEWS_DATA: Record<string, NewsItem[]> = {
  latest: [
    {
      id: "hero_fixed",
      title: "تغطية حصرية: كواليس العمل في Zahra Report وتجهيزات البث المباشر لعام 2024",
      image: "https://img.youtube.com/vi/gCNeDWCI0vo/maxresdefault.jpg",
      category: "تغطية خاصة",
      timeAgo: "الآن",
      duration: "0:55",
      isShort: true,
      youtubeId: "gCNeDWCI0vo",
    },
    {
      id: "l1",
      title: "تحولات استراتيجية في المشهد السياسي الإقليمي وتوقعات بنمو اقتصادي متسارع",
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800",
      category: "سياسة",
      timeAgo: "15m",
    },
    {
      id: "l2",
      title: "تقرير Zahra Report: كيف غيرت التكنولوجيا ملامح القطاع المالي في الشرق الأوسط",
      image: "https://images.unsplash.com/photo-1611974717482-48ec95a04961?w=800",
      category: "اقتصاد",
      timeAgo: "2h",
    },
    {
      id: "l3",
      title: "السياحة المستدامة: مشاريع ضخمة تفتح أبواباً جديدة للاستثمار في المنطقة",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      category: "استثمار",
      timeAgo: "5h",
    },
    {
      id: "l4",
      title: "مستقبل الطاقة البديلة في الدول العربية: آفاق وتحديات",
      image: "https://images.unsplash.com/photo-1466611653911-95281773ad90?w=800",
      category: "بيئة",
      timeAgo: "6h",
    },
    {
      id: "l5",
      title: "الذكاء الاصطناعي في التعليم: هل سيحل المعلم الرقمي مكان المعلم البشري؟",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
      category: "تكنولوجيا",
      timeAgo: "8h",
    },
    {
      id: "l6",
      title: "المدن الذكية: كيف ستغير التكنولوجيا ملامح الحياة الحضرية؟",
      image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800",
      category: "تطوير",
      timeAgo: "10h",
    },
  ],
  economy: [
    {
      id: "e1",
      title: "أسواق الأسهم العالمية تسجل مستويات قياسية جديدة وسط تفاؤل حذر",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800",
      category: "اقتصاد",
      timeAgo: "1h",
    },
    {
      id: "e2",
      title: "دراسة: العملات الرقمية تعيد تشكيل مستقبل التداولات البنكية والمصرفية",
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800",
      category: "تكنولوجيا مالية",
      timeAgo: "3h",
    },
  ],
  sport: [
    {
      id: "s1",
      title: "تتويج تاريخي في بطولة دوري أبطال آسيا بمشاركة عربية واسعة",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
      category: "رياضة",
      timeAgo: "4h",
    },
    {
      id: "s2",
      title: "استعدادات مكثفة للألعاب الأولمبية القادمة وطموحات عربية كبيرة",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
      category: "أولمبياد",
      timeAgo: "6h",
    },
  ],
  video: [
    {
      id: "v1",
      title: "وثائقي: كنوز مدفونة وأسرار من قلب الصحراء العربية الكبرى",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
      category: "وثائقي",
      duration: "12:30",
      timeAgo: "اليوم",
      youtubeId: "mNfInL28Dvo",
    },
    {
      id: "v2",
      title: "مقابلة حصرية: رحلة Zahra Report نحو التميز الإعلامي العالمي",
      image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800",
      category: "مقابلات",
      duration: "15:00",
      timeAgo: "أمس",
      youtubeId: "fS_gD-8I5u4",
    },
  ],
  photos: [
    {
      id: "ph1",
      title: "جمال الطبيعة الساحر في جبال الأطلس العربية",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
      category: "صور",
      timeAgo: "اليوم",
    },
    {
      id: "ph2",
      title: "مناظر خلابة من شواطئ مدينة صلالة العمانية",
      image: "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=800",
      category: "صور",
      timeAgo: "أمس",
    },
  ],
  podcast: [
    {
      id: "p1",
      title: "بودكاست زهراء: مستقبل الذكاء الاصطناعي في حياتنا اليومية",
      image: "https://images.unsplash.com/photo-1478737270239-2fccd27ea043?w=800",
      category: "بودكاست",
      timeAgo: "1d",
    },
  ],
  breaking: [
    {
      id: "b1",
      title: "عاجل: اتفاقية تجارية كبرى بين عدة دول في المنطقة تهدف لدعم الاستقرار",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800",
      category: "عاجل",
      timeAgo: "الآن",
    },
    {
      id: "b2",
      title: "عاجل: زهراء ريبورت يتابع آخر التطورات الميدانية والسياسية في المنطقة والعالم لحظة بلحظة",
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800",
      category: "عاجل",
      timeAgo: "الآن",
    },
  ],
}

export const INITIAL_BREAKING_ALERTS: BreakingAlert[] = [
  {
    id: "1",
    text: "عاجل: زهراء ريبورت يتابع آخر التطورات لحظة بلحظة",
    timestamp: new Date().toISOString(),
  },
]

export const NAV_ITEMS = [
  { id: "main", label: "Main" },
  { id: "breaking", label: "Breaking", isBreaking: true },
  { id: "live", label: "Live", isLive: true },
  { id: "video", label: "Video" },
  { id: "photos", label: "Photos" },
  { id: "economy", label: "Economy" },
  { id: "sport", label: "Sport" },
] as const

export const SOCIAL_LINKS = [
  { icon: "Facebook", url: "https://www.facebook.com/share/1EstoEEoYU/" },
  { icon: "Instagram", url: "https://www.instagram.com/zahraa_mohmeed1?igsh=ZjRmamkyaHZkbjZx" },
  { icon: "Youtube", url: "https://youtube.com/@-zahramohmad5995?si=8Is_YXz5Qb2CpmZY" },
  { icon: "Video", url: "https://www.tiktok.com/@zahraamohmad1990?_r=1&_t=ZG-92zSRDtfm8e" },
] as const
