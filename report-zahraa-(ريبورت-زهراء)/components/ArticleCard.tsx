
import React, { useState, useEffect } from 'react';
import { NewsArticle, Language } from '../types';
import { translations } from '../translations';

interface ArticleCardProps {
  article: NewsArticle;
  featured?: boolean;
  language: Language;
  onDelete?: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, featured, language, onDelete }) => {
  const t = translations[language];
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('nabd_bookmarks') || '[]');
    setIsBookmarked(bookmarks.some((a: NewsArticle) => a.id === article.id));
  }, [article.id]);

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const bookmarks = JSON.parse(localStorage.getItem('nabd_bookmarks') || '[]');
    if (isBookmarked) {
      const filtered = bookmarks.filter((a: NewsArticle) => a.id !== article.id);
      localStorage.setItem('nabd_bookmarks', JSON.stringify(filtered));
      setIsBookmarked(false);
    } else {
      if (!bookmarks.some((a: NewsArticle) => a.id === article.id)) {
        bookmarks.push({ ...article, timestamp: new Date().toLocaleString() });
        localStorage.setItem('nabd_bookmarks', JSON.stringify(bookmarks));
        setIsBookmarked(true);
      }
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: article.title,
      text: article.description,
      url: article.url || window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) { console.error('Error sharing:', err); }
    } else {
      try {
        await navigator.clipboard.writeText(`${article.title}\n${article.url || window.location.href}`);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch (err) { console.error('Failed to copy text: ', err); }
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) onDelete(article.id);
  };

  return (
    <>
      <div 
        onClick={() => setIsReadModalOpen(true)}
        className={`group relative bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all flex flex-col ${featured ? 'mb-8' : 'h-full'} border border-gray-100 rounded-[2.5rem] transform hover:-translate-y-1 duration-500 cursor-pointer`}
      >
        {onDelete && (
          <button 
            onClick={handleDelete}
            className="absolute top-4 right-4 z-[40] bg-red-600 text-white p-3 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-700 active:scale-90 border-2 border-white/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}

        <div className={`${featured ? 'grid md:grid-cols-2' : 'flex flex-col'}`}>
          <div className="relative aspect-video overflow-hidden bg-gray-100">
            <img src={article.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" loading="lazy" />
            {featured && (
              <div className={`absolute top-4 ${language === Language.AR ? 'right-4' : 'left-4'} bg-brand text-white px-4 py-1.5 font-black text-[10px] z-10 shadow-xl uppercase tracking-widest rounded-lg`}>
                {t.urgent}
              </div>
            )}
          </div>
          <div className="p-8 flex flex-col flex-grow">
            <h2 className={`${featured ? 'text-2xl md:text-4xl' : 'text-xl'} font-black line-clamp-2 leading-[1.2] group-hover:text-brand transition-colors tracking-tight mb-4`}>
              {article.title}
            </h2>
            <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed font-medium">
              {article.description}
            </p>
            
            <div className="flex flex-wrap gap-3 mt-auto">
              <button onClick={(e) => { e.stopPropagation(); setIsReadModalOpen(true); }} className="text-[10px] px-5 py-2.5 rounded-xl font-black uppercase transition-all shadow-sm bg-brand text-white hover:opacity-90">
                {language === Language.AR ? 'قراءة الخبر كاملاً' : 'Read Full Story'}
              </button>
              <button onClick={handleBookmark} className={`text-[10px] px-3 py-2.5 rounded-xl transition-all border ${isBookmarked ? 'bg-[#DAA520] border-[#DAA520] text-white' : 'bg-gray-50 border-gray-100 text-gray-500'}`}>
                 <svg className={`w-4 h-4 ${isBookmarked ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
              </button>
              <button onClick={handleShare} className={`text-[10px] px-3 py-2.5 rounded-xl transition-all border ${shareSuccess ? 'bg-green-600 text-white' : 'bg-gray-50 border-gray-100 text-gray-500'}`}>
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6a3 3 0 100-2.684m0 2.684l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
              </button>
            </div>

            <div className="flex items-center gap-4 text-[9px] text-gray-400 mt-6 pt-4 border-t border-gray-50 font-bold uppercase">
               <span className="text-brand">{t.categories[article.category]}</span>
               <span>•</span>
               <span>{article.timestamp}</span>
               <span>•</span>
               <span>{article.views?.toLocaleString()} {t.views}</span>
            </div>
          </div>
        </div>
      </div>

      {/* نافذة القراءة العميقة - Deep Reading Modal */}
      {isReadModalOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setIsReadModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            
            {/* زر الإغلاق العلوي */}
            <button 
              onClick={() => setIsReadModalOpen(false)}
              className="absolute top-6 left-6 z-50 bg-black/10 hover:bg-brand hover:text-white p-3 rounded-2xl transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div className="overflow-y-auto flex-grow scrollbar-hide">
              <div className="relative aspect-video md:aspect-[21/9]">
                <img src={article.imageUrl} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              </div>

              <div className="px-8 md:px-16 pb-16 -mt-12 relative z-10">
                <div className="inline-block bg-brand text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest mb-6 shadow-xl">
                  {t.categories[article.category]}
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-[1.1] mb-8 tracking-tight">
                  {article.title}
                </h1>
                
                <div className="flex items-center gap-6 mb-12 py-6 border-y border-gray-100">
                   <div className="flex flex-col">
                     <span className="text-[10px] font-black text-gray-400 uppercase">تاريخ النشر</span>
                     <span className="font-bold text-gray-800">{article.timestamp}</span>
                   </div>
                   <div className="w-px h-8 bg-gray-100"></div>
                   <div className="flex flex-col">
                     <span className="text-[10px] font-black text-gray-400 uppercase">المشاهدات</span>
                     <span className="font-bold text-gray-800">{article.views?.toLocaleString()} {t.views}</span>
                   </div>
                </div>

                {/* عرض النص مع الحفاظ على التنسيق والفقرات */}
                <div className="text-lg md:text-xl text-gray-700 leading-[1.8] font-medium text-right whitespace-pre-wrap">
                  {article.description}
                </div>

                <div className="mt-16 pt-10 border-t border-gray-100 flex justify-between items-center">
                   <div className="flex gap-4">
                      <button onClick={handleShare} className="bg-gray-100 px-6 py-3 rounded-xl font-black text-xs hover:bg-brand hover:text-white transition-all">مشاركة الخبر</button>
                      <button onClick={handleBookmark} className="bg-gray-100 px-6 py-3 rounded-xl font-black text-xs hover:bg-[#DAA520] hover:text-white transition-all">حفظ للمراجعة</button>
                   </div>
                   <p className="text-[10px] font-black text-gray-300 uppercase">REPORT ZAHRAA NEWS CORE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleCard;
