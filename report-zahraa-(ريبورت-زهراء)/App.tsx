
import React, { useState, useEffect, useMemo, useCallback, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import ArticleCard from './components/ArticleCard';
import PodcastSection from './components/PodcastSection';
import SkeletonCard from './components/SkeletonCard';
import AdminPanel from './components/AdminPanel';
import Certificate from './components/Certificate';
import SettingsModal from './components/SettingsModal';
import { Category, NewsArticle, Language } from './types';
import { fetchNewsByCategorySync } from './services/newsService';
import { translations } from './translations';

const LiveSection = lazy(() => import('./components/LiveSection'));
const VideoSection = lazy(() => import('./components/VideoSection'));
const NewsSection = lazy(() => import('./components/NewsSection'));
const EconomySection = lazy(() => import('./components/EconomySection'));
const ProgramsSection = lazy(() => import('./components/ProgramsSection'));
const InvestigationsSection = lazy(() => import('./components/InvestigationsSection'));
const HealthScienceSection = lazy(() => import('./components/HealthScienceSection'));
const SportsSection = lazy(() => import('./components/SportsSection'));

const INITIAL_VISIBLE_COUNT = 9;
const LOAD_MORE_INCREMENT = 8;

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('nabd_language');
    return (saved as Language) || Language.AR;
  });
  
  const [themeColor, setThemeColor] = useState<string>(() => {
    return localStorage.getItem('nabd_theme_color') || '#B80000';
  });

  const t = translations[language];

  useEffect(() => {
    document.documentElement.style.setProperty('--brand-color', themeColor);
    document.documentElement.style.setProperty('--brand-color-soft', `${themeColor}1a`);
    localStorage.setItem('nabd_theme_color', themeColor);
  }, [themeColor]);

  const [activeCategory, setActiveCategory] = useState<Category>(Category.HOME);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [breakingNews, setBreakingNews] = useState<{id: string, text: string}[]>([]);
  const [tickerSpeed, setTickerSpeed] = useState<number>(30);
  const [categoryCounts, setCategoryCounts] = useState<Record<Category, number>>({} as Record<Category, number>);

  const calculateCounts = useCallback(() => {
    const counts: Record<string, number> = {} as Record<Category, number>;
    const custom = JSON.parse(localStorage.getItem('nabd_custom_news') || '[]');
    
    Object.values(Category).forEach(cat => {
      const staticArticles = fetchNewsByCategorySync(cat);
      const customArticles = custom.filter((a: NewsArticle) => a.category === cat);
      counts[cat as Category] = staticArticles.length + customArticles.length;
    });
    setCategoryCounts(counts as Record<Category, number>);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = t.dir;
    localStorage.setItem('nabd_language', language);
  }, [language, t.dir]);

  useEffect(() => {
    const updateTickers = () => {
      setBreakingNews(JSON.parse(localStorage.getItem('nabd_breaking_news') || '[]'));
      setTickerSpeed(Number(localStorage.getItem('nabd_ticker_speed')) || 30);
      calculateCounts();
    };

    updateTickers();
    window.addEventListener('storage', updateTickers);
    return () => window.removeEventListener('storage', updateTickers);
  }, [calculateCounts]);

  const loadNews = useCallback((category: Category) => {
    setIsLoading(true);
    const data = fetchNewsByCategorySync(category);
    const custom = JSON.parse(localStorage.getItem('nabd_custom_news') || '[]');
    
    let merged: NewsArticle[];
    if (category === Category.HOME) {
      merged = [...custom, ...data];
    } else {
      const filteredCustom = custom.filter((a: NewsArticle) => a.category === category);
      merged = [...filteredCustom, ...data];
    }
    
    merged.sort((a, b) => (b.priority || 0) - (a.priority || 0));
    
    setArticles(merged);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
    calculateCounts();
    setTimeout(() => setIsLoading(false), 200); 
  }, [calculateCounts]);

  useEffect(() => {
    loadNews(activeCategory);
  }, [activeCategory, loadNews, showAdmin]);

  const handleDeleteArticle = (id: string) => {
    if (window.confirm(language === Language.AR ? 'هل أنت متأكد من حذف هذا المقال؟' : 'Are you sure you want to delete this article?')) {
      const custom = JSON.parse(localStorage.getItem('nabd_custom_news') || '[]');
      const modified = JSON.parse(localStorage.getItem('nabd_system_modified') || '[]');
      const deletedIds = JSON.parse(localStorage.getItem('nabd_deleted_system_ids') || '[]');

      const isCustom = custom.some((a: any) => a.id === id);
      
      if (isCustom) {
        localStorage.setItem('nabd_custom_news', JSON.stringify(custom.filter((a: any) => a.id !== id)));
      } else {
        if (!deletedIds.includes(id)) {
          deletedIds.push(id);
          localStorage.setItem('nabd_deleted_system_ids', JSON.stringify(deletedIds));
        }
        localStorage.setItem('nabd_system_modified', JSON.stringify(modified.filter((a: any) => a.id !== id)));
      }
      loadNews(activeCategory);
    }
  };

  const visibleArticles = useMemo(() => articles.slice(0, visibleCount), [articles, visibleCount]);
  const hasMore = articles.length > visibleCount;

  return (
    <div className={`min-h-screen flex flex-col bg-[#fcfcfc] ${language === Language.AR ? 'font-arabic' : 'font-sans'}`} dir={t.dir}>
      <Navbar 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
        notifications={[]}
        onClearNotifications={() => {}}
        language={language}
        onLanguageChange={setLanguage}
        onOpenSettings={() => setShowSettings(true)}
        onOpenAdmin={() => setShowAdmin(true)}
        categoryCounts={categoryCounts}
      />
      
      {breakingNews.length > 0 && (activeCategory === Category.HOME || activeCategory === Category.NEWS) && (
        <div className="bg-brand text-white h-12 overflow-hidden relative z-40 shadow-xl border-b-4 border-black/10 flex items-stretch">
           <div className="flex-shrink-0 bg-white text-brand px-6 flex items-center font-black text-xs uppercase tracking-[0.2em] shadow-xl z-10">
             <div className="animate-pulse">{t.urgent}</div>
           </div>
           
           <div className="flex-grow bg-black/5 overflow-hidden relative h-full flex items-center">
              <div 
                className="flex whitespace-nowrap" 
                style={{ 
                  animation: `marquee ${tickerSpeed}s linear infinite`,
                  width: 'max-content',
                  display: 'flex'
                }}
              >
                 {breakingNews.concat(breakingNews).map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="font-black text-lg mx-12 flex items-center gap-2">
                       <span className="w-2 h-2 bg-white rounded-full"></span>
                       {item.text}
                    </div>
                 ))}
              </div>
           </div>

           <div className="flex-shrink-0 bg-black/20 px-6 flex items-center font-mono text-[10px] font-black z-10 border-l border-white/10">
              <div className="text-sm">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
           </div>
        </div>
      )}

      {showSettings && (
        <SettingsModal 
          onClose={() => setShowSettings(false)} 
          language={language} 
          onLanguageChange={setLanguage} 
          onOpenAdmin={() => setShowAdmin(true)}
          themeColor={themeColor}
          onThemeColorChange={setThemeColor}
        />
      )}

      {showAdmin && (
        <AdminPanel 
          onClose={() => { setShowAdmin(false); loadNews(activeCategory); }} 
          onRefresh={() => loadNews(activeCategory)} 
          language={language} 
          themeColor={themeColor}
          onThemeColorChange={setThemeColor}
        />
      )}

      <main className="flex-grow max-w-7xl mx-auto px-4 md:px-8 py-10 w-full">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b-2 border-gray-100 pb-8">
          <div className="flex items-center gap-6">
            <div className="w-3 h-12 bg-brand rounded-full"></div>
            <h1 className="text-4xl md:text-6xl font-black text-[#111] tracking-tighter">{t.categories[activeCategory]}</h1>
          </div>
        </div>

        <div className="transition-all duration-300">
          {isLoading ? (
            <div className="space-y-12"><SkeletonCard featured={true} /><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">{[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}</div></div>
          ) : (
            <Suspense fallback={<SkeletonCard featured={true} />}>
              {activeCategory === Category.LIVE && <LiveSection articles={articles} language={language} />}
              {activeCategory === Category.VIDEO && <VideoSection articles={articles} language={language} onDelete={handleDeleteArticle} />}
              {activeCategory === Category.NEWS && <NewsSection articles={articles} language={language} onDelete={handleDeleteArticle} />}
              {activeCategory === Category.ECONOMY && <EconomySection articles={articles} language={language} onDelete={handleDeleteArticle} />}
              {activeCategory === Category.PODCAST && <PodcastSection isFullPage={true} />}
              {activeCategory === Category.PROGRAMS && <ProgramsSection articles={articles} language={language} onDelete={handleDeleteArticle} />}
              {activeCategory === Category.INVESTIGATIONS && <InvestigationsSection articles={articles} language={language} onDelete={handleDeleteArticle} />}
              {activeCategory === Category.HEALTH_SCIENCE && <HealthScienceSection articles={articles} language={language} onDelete={handleDeleteArticle} />}
              {activeCategory === Category.SPORTS && <SportsSection articles={articles} language={language} onDelete={handleDeleteArticle} />}
              {activeCategory === Category.HOME && (
                <div className="animate-in fade-in duration-500">
                  <div className="grid lg:grid-cols-4 gap-8 mb-12">
                     <div className="lg:col-span-3">
                        {visibleArticles.length > 0 && <ArticleCard article={visibleArticles[0]} featured={true} language={language} onDelete={visibleArticles[0].id ? handleDeleteArticle : undefined} />}
                     </div>
                     <div className="lg:col-span-1 hidden lg:block space-y-6">
                        <h3 className="text-sm font-black text-brand uppercase tracking-widest border-b border-gray-100 pb-2">{t.latestNews}</h3>
                        {articles.slice(1, 6).map((a, i) => (
                           <div key={i} className="group cursor-pointer border-b border-gray-50 pb-2 last:border-0" onClick={() => setActiveCategory(a.category)}>
                              <h4 className="text-sm font-bold leading-tight group-hover:text-brand transition-colors">{a.title}</h4>
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {visibleArticles.slice(1).map(article => (
                      <ArticleCard 
                        key={article.id} 
                        article={article} 
                        language={language} 
                        onDelete={handleDeleteArticle}
                      />
                    ))}
                  </div>
                  {hasMore && (
                    <div className="flex justify-center pt-16">
                      <button onClick={() => setVisibleCount(v => v + LOAD_MORE_INCREMENT)} className="px-12 py-4 border-2 border-brand text-brand font-black rounded-full hover:bg-brand hover:text-white transition-all shadow-lg active:scale-95">{t.loadMore}</button>
                    </div>
                  )}
                  <div className="mt-20"><PodcastSection /></div>
                </div>
              )}
            </Suspense>
          )}
        </div>
        {activeCategory === Category.HOME && <Certificate language={language} />}
      </main>

      <footer className="bg-[#0a0a0a] text-white py-24 px-4 md:px-8 mt-24 border-t-[16px] border-brand">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-6 mb-12">
            <div className="bg-brand text-white px-6 py-2 font-black text-4xl shadow-2xl">REPORT</div>
            <span className="text-4xl font-bold tracking-[0.2em]">ZAHRAA</span>
          </div>
          <p className="text-gray-500 text-xl max-w-3xl mb-16 leading-relaxed font-medium">{t.footerDesc}</p>
          <div className="w-full h-px bg-white/5 mb-12"></div>
          <p className="text-gray-600 text-sm font-bold">© {new Date().getFullYear()} REPORT ZAHRAA. {t.rights}</p>
          <p className="text-gray-800 text-[10px] mt-6 opacity-40 font-mono tracking-widest uppercase">
            ENGINEERED BY <span className="text-[#DAA520]">{t.devName}</span> | PROPRIETOR <span className="text-[#DAA520]">{t.ownerName}</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
