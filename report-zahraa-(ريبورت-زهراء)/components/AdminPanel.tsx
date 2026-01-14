
import React, { useState, useEffect, useRef } from 'react';
import { Category, NewsArticle, Language, LiveChannel } from '../types';
import { translations } from '../translations';
import { fetchNewsByCategorySync } from '../services/newsService';

const ADMIN_PASSWORD = "omar"; 

interface AdminPanelProps {
  onClose: () => void;
  onRefresh: () => void;
  language: Language;
  themeColor: string;
  onThemeColorChange: (color: string) => void;
}

interface BreakingItem {
  id: string;
  text: string;
  timestamp?: string;
}

const PRESET_COLORS = [
  { name: 'أحمر ملكي', hex: '#B80000' },
  { name: 'أحمر قرمزي', hex: '#8B0000' },
  { name: 'أزرق نبيل', hex: '#004aad' },
  { name: 'أزرق سماوي', hex: '#1E90FF' },
  { name: 'أزرق كحلي', hex: '#000080' },
  { name: 'أخضر زمردي', hex: '#006d5b' },
  { name: 'أخضر غابة', hex: '#228B22' },
  { name: 'فيروزي', hex: '#008080' },
  { name: 'بنفسجي داكن', hex: '#4B0082' },
  { name: 'بنفسجي مودرن', hex: '#5e2ced' },
  { name: 'ذهبي كلاسيك', hex: '#DAA520' },
  { name: 'برتقالي محروق', hex: '#D35400' },
  { name: 'وردي عميق', hex: '#C71585' },
  { name: 'رمادي صخري', hex: '#2F4F4F' },
  { name: 'أسود فحم', hex: '#1a1a1a' },
  { name: 'بني شوكولا', hex: '#3E2723' },
  { name: 'نيلي', hex: '#3F51B5' },
  { name: 'ماروني', hex: '#800000' }
];

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onRefresh, language, themeColor, onThemeColorChange }) => {
  const t = translations[language];
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Data States
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [breakingNews, setBreakingNews] = useState<BreakingItem[]>([]);
  const [liveChannels, setLiveChannels] = useState<LiveChannel[]>([]);
  const [categoryStreams, setCategoryStreams] = useState<Record<string, string>>({});
  
  // UI States
  const [activeTab, setActiveTab] = useState<'CONTENT' | 'CHANNELS' | 'URGENT' | 'APPEARANCE'>('CONTENT');
  const [editingArticle, setEditingArticle] = useState<Partial<NewsArticle> | null>(null);
  const [editingChannel, setEditingChannel] = useState<Partial<LiveChannel> | null>(null);
  const [filterCategory, setFilterCategory] = useState<Category | 'ALL'>('ALL');

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    const custom = JSON.parse(localStorage.getItem('nabd_custom_news') || '[]');
    const allSystemArticles: NewsArticle[] = [];
    const seenIds = new Set();

    Object.values(Category).forEach(cat => {
      const catNews = fetchNewsByCategorySync(cat);
      catNews.forEach(art => {
        if (!art.isCustom && !seenIds.has(art.id)) {
          allSystemArticles.push(art);
          seenIds.add(art.id);
        }
      });
    });

    const merged = [...custom, ...allSystemArticles];
    setArticles(merged);
    setLiveChannels(JSON.parse(localStorage.getItem('nabd_custom_live') || '[]'));
    setCategoryStreams(JSON.parse(localStorage.getItem('nabd_category_streams') || '{}'));
    setBreakingNews(JSON.parse(localStorage.getItem('nabd_breaking_news') || '[]'));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (editingArticle) {
          setEditingArticle({ ...editingArticle, imageUrl: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("كلمة المرور غير صحيحة");
    }
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    const item: NewsArticle = {
      id: editingArticle.id || `custom-${Date.now()}`,
      title: editingArticle.title || "",
      description: editingArticle.description || "",
      imageUrl: editingArticle.imageUrl || "",
      category: editingArticle.category || Category.NEWS,
      timestamp: editingArticle.timestamp || new Date().toLocaleString(),
      isCustom: editingArticle.isCustom ?? true,
      views: editingArticle.views || 0,
      priority: editingArticle.priority || 5
    };

    if (item.isCustom) {
      const custom = JSON.parse(localStorage.getItem('nabd_custom_news') || '[]');
      const index = custom.findIndex((a: any) => a.id === item.id);
      if (index > -1) {
        custom[index] = item;
      } else {
        custom.unshift(item);
      }
      localStorage.setItem('nabd_custom_news', JSON.stringify(custom));
    } else {
      const modified = JSON.parse(localStorage.getItem('nabd_system_modified') || '[]');
      const index = modified.findIndex((a: any) => a.id === item.id);
      if (index > -1) {
        modified[index] = item;
      } else {
        modified.push(item);
      }
      localStorage.setItem('nabd_system_modified', JSON.stringify(modified));
    }
    
    setEditingArticle(null);
    loadAllData();
    onRefresh();
  };

  const handleDeleteArticle = (article: NewsArticle) => {
    if (!confirm(language === Language.AR ? 'هل أنت متأكد من حذف هذا المنشور؟' : 'Are you sure you want to delete this article?')) return;

    if (article.isCustom) {
      const custom = JSON.parse(localStorage.getItem('nabd_custom_news') || '[]');
      const updated = custom.filter((a: any) => a.id !== article.id);
      localStorage.setItem('nabd_custom_news', JSON.stringify(updated));
    } else {
      const deletedIds = JSON.parse(localStorage.getItem('nabd_deleted_system_ids') || '[]');
      if (!deletedIds.includes(article.id)) {
        deletedIds.push(article.id);
        localStorage.setItem('nabd_deleted_system_ids', JSON.stringify(deletedIds));
      }
      const modified = JSON.parse(localStorage.getItem('nabd_system_modified') || '[]');
      const updatedMod = modified.filter((a: any) => a.id !== article.id);
      localStorage.setItem('nabd_system_modified', JSON.stringify(updatedMod));
    }
    
    loadAllData();
    onRefresh();
  };

  const handleSaveChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChannel) return;
    const item: LiveChannel = {
      id: editingChannel.id || `ch-${Date.now()}`,
      name: editingChannel.name || { ar: "قناة جديدة", en: "New Channel" },
      youtubeId: editingChannel.youtubeId || "",
      viewers: editingChannel.viewers || "100K",
      type: editingChannel.type || "Live",
      color: "var(--brand-color)",
      quality: "HD"
    };
    const newList = liveChannels.find(c => c.id === item.id)
      ? liveChannels.map(c => c.id === item.id ? item : c)
      : [...liveChannels, item];
    setLiveChannels(newList);
    localStorage.setItem('nabd_custom_live', JSON.stringify(newList));
    setEditingChannel(null);
    onRefresh();
  };

  const handleUpdateCategoryStream = (cat: string, youtubeId: string) => {
    const updated = { ...categoryStreams, [cat]: youtubeId };
    setCategoryStreams(updated);
    localStorage.setItem('nabd_category_streams', JSON.stringify(updated));
    onRefresh();
  };

  const handleDeleteUrgent = (id: string) => {
    const updated = breakingNews.filter(n => n.id !== id);
    setBreakingNews(updated);
    localStorage.setItem('nabd_breaking_news', JSON.stringify(updated));
    onRefresh();
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/95 z-[300] flex items-center justify-center p-4 font-arabic">
        <div className="bg-white p-10 rounded-[2.5rem] w-full max-sm:max-w-xs w-full max-w-sm shadow-2xl text-center">
          <div className="bg-brand text-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl font-black">Z</div>
          <h2 className="text-2xl font-black mb-6">لوحة التحكم الكاملة</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="أدخل كلمة المرور" 
              className="w-full bg-gray-50 p-5 rounded-2xl border border-gray-100 outline-none focus:border-brand text-center font-bold" 
              value={password} onChange={(e) => setPassword(e.target.value)} autoFocus 
            />
            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
            <button type="submit" className="w-full bg-brand text-white p-5 rounded-2xl font-black shadow-lg">دخول</button>
            <button type="button" onClick={onClose} className="text-gray-400 text-xs font-bold pt-4">إغلاق</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#f4f4f4] z-[300] flex flex-col font-arabic overflow-hidden text-right" dir="rtl">
      <header className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white font-black shadow-lg">Z</div>
          <h2 className="text-xl font-black text-[#111]">لوحة التحكم</h2>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-brand font-black text-xs uppercase tracking-widest">{language === Language.AR ? 'إغلاق' : 'Close'}</button>
      </header>
      <main className="flex-grow overflow-hidden flex flex-col">
        <div className="bg-white border-b border-gray-200 px-8 flex gap-8">
           {(['CONTENT', 'CHANNELS', 'URGENT', 'APPEARANCE'] as const).map(tab => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === tab ? 'border-brand text-brand' : 'border-transparent text-gray-400'}`}
             >
               {tab === 'CONTENT' ? 'المنشورات' : tab === 'CHANNELS' ? 'البث' : tab === 'URGENT' ? 'عاجل' : 'المظهر'}
             </button>
           ))}
        </div>

        <div className="flex-grow overflow-y-auto p-8">
           {activeTab === 'CONTENT' && (
             <div className="space-y-6">
                <div className="flex justify-between items-center">
                   <h3 className="font-black text-lg">المحتوى الإخباري</h3>
                   <button onClick={() => setEditingArticle({ isCustom: true })} className="bg-brand text-white px-6 py-2 rounded-xl font-black text-xs uppercase shadow-lg">إضافة خبر</button>
                </div>
                <div className="grid gap-4">
                   {articles.filter(a => filterCategory === 'ALL' || a.category === filterCategory).map(article => (
                     <div key={article.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                           <img src={article.imageUrl} className="w-12 h-12 rounded-lg object-cover" alt="" />
                           <div>
                              <p className="font-bold text-sm">{article.title}</p>
                              <p className="text-[10px] text-gray-400 uppercase font-black">{article.category} • {article.isCustom ? 'Custom' : 'System'}</p>
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <button onClick={() => setEditingArticle(article)} className="text-blue-600 font-bold text-xs uppercase">تعديل</button>
                           <button onClick={() => handleDeleteArticle(article)} className="text-red-600 font-bold text-xs uppercase">حذف</button>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           )}

           {activeTab === 'APPEARANCE' && (
             <div className="space-y-10 animate-in fade-in">
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                   <h3 className="text-lg font-black mb-6 text-gray-800">تخصيص هوية الموقع (الألوان)</h3>
                   <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
                      {PRESET_COLORS.map((color) => (
                        <div key={color.hex} className="flex flex-col items-center gap-2">
                           <button
                             onClick={() => onThemeColorChange(color.hex)}
                             className={`w-14 h-14 rounded-2xl border-4 transition-all hover:scale-110 shadow-lg ${themeColor === color.hex ? 'border-brand scale-110 rotate-3' : 'border-transparent'}`}
                             style={{ backgroundColor: color.hex }}
                             title={color.name}
                           />
                           <span className={`text-[10px] font-bold ${themeColor === color.hex ? 'text-brand' : 'text-gray-400'}`}>{color.name}</span>
                        </div>
                      ))}
                   </div>
                   <div className="mt-10 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                      <p className="text-xs text-gray-500 font-bold leading-relaxed">
                        * سيتم تطبيق اللون المختار فوراً على جميع الأقسام، القوائم، الأزرار، وشعار الموقع. هذا التغيير مرئي لجميع زوار المنصة.
                      </p>
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'URGENT' && (
             <div className="space-y-6">
                <h3 className="font-black text-lg">الشريط العاجل</h3>
                <div className="grid gap-4">
                   {breakingNews.map(item => (
                     <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex justify-between items-center">
                        <p className="font-bold text-sm">{item.text}</p>
                        <button onClick={() => handleDeleteUrgent(item.id)} className="text-red-600 font-bold text-xs uppercase">حذف</button>
                     </div>
                   ))}
                </div>
             </div>
           )}

           {activeTab === 'CHANNELS' && (
             <div className="space-y-6">
                <h3 className="font-black text-lg">القنوات المباشرة</h3>
                <div className="grid gap-4">
                   {liveChannels.map(ch => (
                     <div key={ch.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex justify-between items-center">
                        <p className="font-bold text-sm">{language === Language.AR ? ch.name.ar : ch.name.en}</p>
                        <button onClick={() => setEditingChannel(ch)} className="text-blue-600 font-bold text-xs uppercase">تعديل</button>
                     </div>
                   ))}
                </div>
             </div>
           )}
        </div>
      </main>

      {editingArticle && (
        <div className="fixed inset-0 bg-black/50 z-[400] flex items-center justify-center p-4">
           <div className="bg-white p-8 rounded-3xl w-full max-w-2xl">
              <h2 className="text-xl font-black mb-6">تحرير المقال</h2>
              <form onSubmit={handleSaveArticle} className="space-y-4">
                 <input className="w-full p-4 bg-gray-50 rounded-xl border" placeholder="العنوان" value={editingArticle.title || ''} onChange={e => setEditingArticle({...editingArticle, title: e.target.value})} />
                 <textarea className="w-full p-4 bg-gray-50 rounded-xl border h-32" placeholder="الوصف" value={editingArticle.description || ''} onChange={e => setEditingArticle({...editingArticle, description: e.target.value})} />
                 <div className="flex gap-4">
                    <button type="submit" className="flex-grow bg-brand text-white p-4 rounded-xl font-black uppercase">حفظ</button>
                    <button type="button" onClick={() => setEditingArticle(null)} className="flex-grow bg-gray-200 text-gray-600 p-4 rounded-xl font-black uppercase">إلغاء</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
