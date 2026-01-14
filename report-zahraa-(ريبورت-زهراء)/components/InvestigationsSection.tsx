
import React from 'react';
import { NewsArticle, Language } from '../types';
import { translations } from '../translations';

interface InvestigationsSectionProps {
  articles: NewsArticle[];
  language: Language;
  onDelete?: (id: string) => void;
}

const InvestigationsSection: React.FC<InvestigationsSectionProps> = ({ articles, language, onDelete }) => {
  const t = translations[language];

  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      {articles.map((story, idx) => (
        <div key={story.id} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center group relative`}>
          {onDelete && (
            <button onClick={() => onDelete(story.id)} className="absolute top-0 right-0 z-20 bg-red-600 text-white p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          )}
          <div className="lg:w-1/2 relative">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 group-hover:bg-red-100 transition-colors"></div>
             <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img src={story.imageUrl} className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand/40 to-transparent"></div>
             </div>
          </div>
          
          <div className="lg:w-1/2 space-y-6">
            <span className="text-brand font-black text-xs uppercase tracking-[0.5em] block">{language === Language.AR ? 'تحقيق خاص' : 'SPECIAL REPORT'}</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] leading-tight group-hover:text-brand transition-colors">
              {story.title}
            </h2>
            <p className="text-xl text-gray-500 font-serif leading-relaxed italic border-r-4 border-gray-200 pr-6">
              {story.description}
            </p>
            <div className="pt-6 flex items-center gap-6">
               {story.url ? (
                 <a href={story.url} target="_blank" rel="noopener noreferrer" className="bg-[#1a1a1a] text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-brand transition-all">Read Full Report</a>
               ) : (
                 <button className="bg-[#1a1a1a] text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-brand transition-all">Coming Soon</button>
               )}
               <span className="text-gray-400 font-bold text-xs">12 MIN READ</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvestigationsSection;
