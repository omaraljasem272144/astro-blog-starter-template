
import React from 'react';
import { NewsArticle, Language } from '../types';
import ArticleCard from './ArticleCard';
import { translations } from '../translations';

interface NewsSectionProps {
  articles: NewsArticle[];
  language: Language;
  onDelete?: (id: string) => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ articles, language, onDelete }) => {
  const t = translations[language];
  const breaking = articles.filter(a => (a.priority || 0) > 8);
  const others = articles.filter(a => (a.priority || 0) <= 8);

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Top News Stories */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {breaking.length > 0 && <ArticleCard article={breaking[0]} featured={true} language={language} onDelete={onDelete && breaking[0].isCustom ? onDelete : undefined} />}
        </div>
        <div className="space-y-6">
          <h3 className="text-xl font-black border-r-4 border-[#B80000] pr-4 mb-6 uppercase tracking-tight">
            {language === Language.AR ? 'أهم العناوين' : 'Top Headlines'}
          </h3>
          <div className="space-y-4">
            {breaking.slice(1, 4).map(a => (
              <div key={a.id} className="relative p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow cursor-pointer group overflow-hidden">
                {onDelete && a.isCustom && (
                  <button onClick={(e) => { e.stopPropagation(); onDelete(a.id); }} className="absolute top-2 left-2 bg-red-600 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                )}
                <span className="text-[10px] text-[#B80000] font-black">{a.timestamp}</span>
                <h4 className="text-sm font-bold line-clamp-2 group-hover:text-[#B80000] transition-colors">{a.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* General Feed */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {others.map(article => (
          <ArticleCard key={article.id} article={article} language={language} onDelete={onDelete && article.isCustom ? onDelete : undefined} />
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
