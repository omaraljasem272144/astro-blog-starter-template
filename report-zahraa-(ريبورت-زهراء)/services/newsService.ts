
import { Category, NewsArticle } from "../types";

const NEWS_DATA: Record<Category, NewsArticle[]> = {
  [Category.HOME]: [
    { id: 'h-1', title: 'ريبورت زهراء: انطلاقة النسخة الأسرع والأكثر استقراراً', description: 'تحديث شامل للبنية التحتية للموقع يضمن استجابة فورية لكافة الأقسام مع إلغاء كافة الاعتمادات على الخوادم الخارجية.', imageUrl: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800', category: Category.HOME, timestamp: 'الآن', views: 25000, priority: 10 },
    { id: 'h-2', title: 'عمر الجاسم يعلن عن نظام أرشفة المحتوى الجديد', description: 'تقنية "Zero-Latency" تتيح للمستخدمين الوصول للأخبار حتى في أوقات الضغط العالي دون تأخير.', imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800', category: Category.HOME, timestamp: 'منذ ساعة', views: 12000, priority: 9 },
    { id: 'h-3', title: 'توسعات استثمارية كبرى لمنصة ريبورت زهراء', description: 'المنصة تسجل نمواً قياسياً في أعداد المتابعين وتعلن عن شراكات إعلامية في 5 دول جديدة.', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', category: Category.HOME, timestamp: 'منذ ساعتين', views: 9000, priority: 8 }
  ],
  [Category.NEWS]: [
    { id: 'n-1', title: 'القمة العالمية للتكنولوجيا: التركيز على حماية البيانات', description: 'زعماء التكنولوجيا يجتمعون لمناقشة مستقبل الخصوصية في العصر الرقمي الحديث.', imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800', category: Category.NEWS, timestamp: 'منذ 10 دقائق', views: 45000, priority: 9, url: 'https://techcrunch.com' },
    { id: 'n-2', title: 'اكتشافات أثرية جديدة في قلب العاصمة', description: 'فرق التنقيب تعلن عن العثور على قطع نادرة تعود لآلاف السنين تعيد كتابة التاريخ.', imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800', category: Category.NEWS, timestamp: 'منذ ساعة', views: 22000, priority: 7 },
    { id: 'n-3', title: 'تطورات متسارعة في ملف المناخ العالمي', description: 'المنظمات الدولية تدعو لاتخاذ إجراءات عاجلة للحد من الانبعاثات الكربونية.', imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800', category: Category.NEWS, timestamp: 'منذ 3 ساعات', views: 15000, priority: 6 },
    { id: 'n-4', title: 'تقرير: الذكاء الاصطناعي يغير خارطة الوظائف', description: 'خبراء يتوقعون ظهور تخصصات جديدة واختفاء أخرى نتيجة الثورة التقنية.', imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800', category: Category.NEWS, timestamp: 'منذ 5 ساعات', views: 18000, priority: 5 }
  ],
  [Category.LIVE]: [{ id: 'l-1', title: 'بث مباشر: استوديو التحليل المسائي', description: 'تغطية حية لأهم القضايا الراهنة مع نخبة من المحللين السياسيين.', imageUrl: 'https://images.unsplash.com/photo-1540910419868-474947ce5ade?w=800', category: Category.LIVE, timestamp: 'مباشر', views: 120000, priority: 10 }],
  [Category.ECONOMY]: [
    { id: 'e-1', title: 'انتعاش مؤشرات البورصة العالمية اليوم', description: 'الأسهم تسجل مكاسب ملحوظة بعد تقارير إيجابية عن نمو الاقتصاد العالمي.', imageUrl: 'https://images.unsplash.com/photo-1611974717483-9b4802e3b2b8?w=800', category: Category.ECONOMY, timestamp: 'منذ ساعة', views: 33000, priority: 9 },
    { id: 'e-2', title: 'أسعار الذهب تسجل مستويات قياسية جديدة', description: 'المعدن الأصفر يواصل الارتفاع وسط مخاوف من التضخم العالمي.', imageUrl: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?w=800', category: Category.ECONOMY, timestamp: 'منذ ساعتين', views: 28000, priority: 8 },
    { id: 'e-3', title: 'اتفاقيات تجارية كبرى في منطقة الشرق الأوسط', description: 'توقيع عقود بمليارات الدولارات لتعزيز التعاون الاقتصادي الإقليمي.', imageUrl: 'https://images.unsplash.com/photo-1454165833968-4e71170b5b03?w=800', category: Category.ECONOMY, timestamp: 'منذ 4 ساعات', views: 19000, priority: 7 }
  ],
  [Category.HEALTH_SCIENCE]: [
    { id: 'hs-1', title: 'تطور علمي مذهل في تقنيات الطب الوقائي', description: 'دراسات جديدة تؤكد نجاح تقنيات النانو في الكشف المبكر عن الأمراض المستعصية.', imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800', category: Category.HEALTH_SCIENCE, timestamp: 'منذ يوم', views: 54000, priority: 9 },
    { id: 'hs-2', title: 'ناسا تكتشف كوكباً مشابهاً للأرض', description: 'التلسكوبات المتطورة ترصد تفاصيل جديدة تدعم فرضية وجود حياة خارج كوكبنا.', imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800', category: Category.HEALTH_SCIENCE, timestamp: 'منذ يومين', views: 42000, priority: 8 }
  ],
  [Category.SPORTS]: [
    { id: 's-1', title: 'نتائج قرعة البطولات القارية الكبرى', description: 'مواجهات نارية مرتقبة تجمع عمالقة القارة في الأدوار الإقصائية.', imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800', category: Category.SPORTS, timestamp: 'منذ ساعة', views: 98000, priority: 9 },
    { id: 's-2', title: 'انتقالات الموسم: صفقة القرن تقترب', description: 'تقارير تتحدث عن انتقال النجم العالمي إلى نادي العاصمة في صفقة تاريخية.', imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800', category: Category.SPORTS, timestamp: 'منذ 3 ساعات', views: 76000, priority: 8 }
  ],
  [Category.VIDEO]: [
    { id: 'v-1', title: 'وثائقي: رحلة في أعماق المحيطات', description: 'مشاهد حصرية لجمال الطبيعة البحرية بجودة 4K تعرض لأول مرة.', imageUrl: 'https://images.unsplash.com/photo-1492691523567-6170c360815e?w=800', category: Category.VIDEO, timestamp: 'منذ 3 ساعات', views: 150000, priority: 10 },
    { id: 'v-2', title: 'كواليس صناعة الروبوتات في اليابان', description: 'جولة داخل أحدث المختبرات العالمية لتطوير الذكاء الاصطناعي الحركي.', imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?w=800', category: Category.VIDEO, timestamp: 'منذ يوم', views: 88000, priority: 7 }
  ],
  [Category.INVESTIGATIONS]: [
    { id: 'i-1', title: 'تحقيق حصري: كواليس صناعة القرار الرقمي', description: 'كشف الأسرار وراء خوارزميات منصات التواصل الاجتماعي الكبرى.', imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800', category: Category.INVESTIGATIONS, timestamp: 'منذ يومين', views: 67000, priority: 10 },
    { id: 'i-2', title: 'سرقة البيانات: تحقيق في الثغرات الأمنية', description: 'كيف يتم اختراق الحسابات البنكية وما هي سبل الوقاية الحديثة؟', imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800', category: Category.INVESTIGATIONS, timestamp: 'أسبوع مضى', views: 45000, priority: 8 }
  ],
  [Category.PODCAST]: [
    { id: 'p-1', title: 'بودكاست: حوار مع العقل البشري', description: 'رحلة في أعماق التفكير والإبداع مع كبار علماء النفس والاجتماع.', imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800', category: Category.PODCAST, timestamp: 'أمس', views: 12000, priority: 8 }
  ],
  [Category.PROGRAMS]: [
    { id: 'pr-1', title: 'برنامج "عين على الحقيقة"', description: 'جولة يومية في أهم الحقائق والأخبار العالمية من زاوية مختلفة وحيادية.', imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800', category: Category.PROGRAMS, timestamp: 'يومياً', views: 89000, priority: 9 },
    { id: 'pr-2', title: 'برنامج "حديث التكنولوجيا"', description: 'كل ما هو جديد في عالم الابتكار الرقمي والتقنيات الناشئة.', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', category: Category.PROGRAMS, timestamp: 'أسبوعياً', views: 42000, priority: 7 }
  ]
};

export const fetchNewsByCategorySync = (category: Category): NewsArticle[] => {
  const systemModified = JSON.parse(localStorage.getItem('nabd_system_modified') || '[]');
  const deletedSystemIds = JSON.parse(localStorage.getItem('nabd_deleted_system_ids') || '[]');
  
  const defaultData = (NEWS_DATA[category] || NEWS_DATA[Category.HOME]).filter(art => !deletedSystemIds.includes(art.id));
  
  return defaultData.map(art => {
    const modified = systemModified.find((m: any) => m.id === art.id);
    return modified ? modified : art;
  });
};
