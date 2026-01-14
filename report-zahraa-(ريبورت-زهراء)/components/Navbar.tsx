
import React, { useEffect, useState } from 'react';
import { Category, NewsArticle, Language } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  notifications: NewsArticle[];
  onClearNotifications: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSettings: () => void;
  onOpenAdmin: () => void;
  categoryCounts: Record<Category, number>;
}

const Navbar: React.FC<NavbarProps> = ({ 
  activeCategory, 
  onCategoryChange, 
  notifications,
  onClearNotifications,
  language,
  onLanguageChange,
  onOpenSettings,
  onOpenAdmin,
  categoryCounts
}) => {
  const t = translations[language];
  const categories = Object.values(Category);
  const [isScrolled, setIsScrolled] = useState(false);
  const [subscribedCategories, setSubscribedCategories] = useState<Category[]>([]);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    const saved = localStorage.getItem('nabd_subscriptions');
    if (saved) setSubscribedCategories(JSON.parse(saved));

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCategoryClick = (cat: Category) => {
    onCategoryChange(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSubscription = (e: React.MouseEvent) => {
    e.stopPropagation();
    let updated = subscribedCategories.includes(activeCategory)
      ? subscribedCategories.filter(c => c !== activeCategory)
      : [...subscribedCategories, activeCategory];
    setSubscribedCategories(updated);
    localStorage.setItem('nabd_subscriptions', JSON.stringify(updated));
  };

  const isSubscribed = subscribedCategories.includes(activeCategory);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'nav-scrolled shadow-xl' : ''}`}>
      <div className={`bg-brand text-white transition-all duration-300 px-4 md:px-8 flex justify-between items-center ${isScrolled ? 'py-2' : 'py-3'}`}>
        <div className="flex items-center gap-3">
          <div className="bg-white text-brand px-2 py-1 font-black text-xl tracking-tighter shadow-sm rounded-sm">
            {t.brand}
          </div>
          <span className={`${isScrolled ? 'text-xl' : 'text-2xl'} font-black transition-all tracking-tight uppercase`}>
            {t.brandSuffix}
          </span>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4 text-sm font-medium">
          <button 
            onClick={onOpenAdmin}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl transition-all border border-white/5 group"
            title={t.adminPanel}
          >
            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span className="hidden lg:inline text-[10px] font-black uppercase tracking-widest">{language === Language.AR ? 'لوحة التحكم' : 'Control'}</span>
          </button>

          <button 
            onClick={onOpenSettings}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          </button>

          <div className="relative">
            <button 
              onClick={() => {
                setShowNotificationDropdown(!showNotificationDropdown);
                if (showNotificationDropdown) onClearNotifications();
              }}
              className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <svg className={`w-6 h-6 ${notifications.length > 0 ? 'animate-swing' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 bg-yellow-400 text-brand text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand">
                  {notifications.length}
                </span>
              )}
            </button>
            {showNotificationDropdown && (
              <div className={`absolute top-full ${language === Language.AR ? 'left-0' : 'right-0'} mt-4 w-80 bg-white text-[#222] rounded-2xl shadow-2xl z-[100] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2`}>
                <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                  <span className="font-black text-xs uppercase tracking-widest">Alerts</span>
                  <button onClick={() => onClearNotifications()} className="text-[10px] text-brand font-bold hover:underline">Clear</button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? notifications.map((n, i) => (
                    <div key={i} className="p-4 border-b border-gray-50 hover:bg-red-50/30 transition-colors cursor-pointer" onClick={() => handleCategoryClick(n.category)}>
                      <p className="text-sm font-bold mt-1 line-clamp-2">{n.title}</p>
                    </div>
                  )) : <div className="p-10 text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest">Quiet for now</div>}
                </div>
              </div>
            )}
          </div>
          <button className="hidden sm:block font-black hover:underline uppercase tracking-tighter text-xs">{t.login}</button>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 overflow-x-auto relative">
        <div className="max-w-7xl mx-auto flex items-center gap-4 md:gap-10 px-4 py-1 whitespace-nowrap scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`group flex items-center gap-2 pb-1 pt-3 text-[14px] font-black transition-all duration-200 border-b-4 uppercase tracking-tight ${
                activeCategory === cat 
                  ? 'border-brand text-brand' 
                  : 'border-transparent text-gray-400 hover:text-brand'
              }`}
            >
              <span>{t.categories[cat]}</span>
              {categoryCounts[cat] > 0 && (
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono transition-colors ${
                  activeCategory === cat 
                    ? 'bg-red-50 text-brand' 
                    : 'bg-gray-100 text-gray-400 group-hover:bg-red-50 group-hover:text-brand'
                }`}>
                  {categoryCounts[cat]}
                </span>
              )}
            </button>
          ))}
          <div className="flex-grow"></div>
          <button 
            onClick={toggleSubscription}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black transition-all uppercase tracking-widest ${
              isSubscribed ? 'bg-brand text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {isSubscribed ? t.subscribed : t.subscribe}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
