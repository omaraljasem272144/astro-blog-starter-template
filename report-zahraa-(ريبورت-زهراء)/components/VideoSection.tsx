
import React from 'react';
import { NewsArticle, Language } from '../types';
import { translations } from '../translations';

interface VideoSectionProps {
  articles: NewsArticle[];
  language: Language;
  onDelete?: (id: string) => void;
}

const VideoSection: React.FC<VideoSectionProps> = ({ articles, language, onDelete }) => {
  const t = translations[language];
  const featuredVideo = articles[0];

  const VideoLink = ({ article, children, className }: { article: NewsArticle, children?: React.ReactNode, className?: string }) => {
    if (article.url) {
      return <a href={article.url} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
    }
    return <div className={className}>{children}</div>;
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {featuredVideo && (
        <div className="bg-[#0f0f0f] rounded-3xl overflow-hidden shadow-2xl relative group/main">
          {onDelete && (
            <button onClick={() => onDelete(featuredVideo.id)} className="absolute top-6 left-6 z-30 bg-red-600 text-white p-4 rounded-2xl opacity-0 group-hover/main:opacity-100 transition-opacity hover:bg-red-700 shadow-2xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          )}
          <div className="grid lg:grid-cols-5">
            <div className="lg:col-span-3 aspect-video bg-black relative group">
              <VideoLink article={featuredVideo} className="block w-full h-full">
                <img src={featuredVideo.imageUrl} className="w-full h-full object-cover opacity-60" alt="" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-brand rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              </VideoLink>
              <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                <span className="bg-brand text-white px-3 py-1 text-[10px] font-black rounded uppercase mb-2 inline-block tracking-widest">{t.featuredVideo}</span>
                <h2 className="text-white text-3xl font-black leading-tight drop-shadow-lg">{featuredVideo.title}</h2>
              </div>
            </div>
            <div className="lg:col-span-2 p-8 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10">
              <h3 className="text-brand font-black text-xs uppercase tracking-[0.3em] mb-4">Inside the Story</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">{featuredVideo.description}</p>
              <div className="flex items-center gap-6">
                 <div className="flex flex-col">
                   <span className="text-white font-black text-xl">{featuredVideo.views?.toLocaleString()}</span>
                   <span className="text-gray-500 text-[10px] font-bold uppercase">{t.views}</span>
                 </div>
                 <div className="h-10 w-px bg-white/10"></div>
                 <div className="flex flex-col">
                   <span className="text-white font-black text-xl">{featuredVideo.timestamp}</span>
                   <span className="text-gray-500 text-[10px] font-bold uppercase">Published</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.slice(1).map(article => (
          <div key={article.id} className="group cursor-pointer relative">
            {onDelete && (
              <button onClick={(e) => { e.stopPropagation(); onDelete(article.id); }} className="absolute top-4 left-4 z-20 bg-red-600 text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            )}
            <VideoLink article={article}>
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-black">
                <img src={article.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" alt="" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                     <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                   </div>
                </div>
              </div>
              <h4 className="font-black text-lg text-[#222] line-clamp-2 leading-snug group-hover:text-brand transition-colors">{article.title}</h4>
            </VideoLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSection;
