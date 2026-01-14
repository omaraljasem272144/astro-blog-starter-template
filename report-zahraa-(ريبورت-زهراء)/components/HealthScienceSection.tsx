
import React from 'react';
import { NewsArticle, Language } from '../types';
import { translations } from '../translations';
import ArticleCard from './ArticleCard';

interface HealthScienceSectionProps {
  articles: NewsArticle[];
  language: Language;
  onDelete?: (id: string) => void;
}

const HealthScienceSection: React.FC<HealthScienceSectionProps> = ({ articles, language, onDelete }) => {
  const t = translations[language];

  if (!articles || articles.length === 0) {
    return <div className="text-center py-20 text-gray-400 font-bold uppercase tracking-widest">{t.noNews}</div>;
  }

  return (
    <div className="grid lg:grid-cols-3 gap-12 animate-in fade-in">
      <div className="lg:col-span-2 space-y-12">
        <ArticleCard article={articles[0]} featured={true} language={language} onDelete={onDelete && articles[0].isCustom ? onDelete : undefined} />
        <div className="grid sm:grid-cols-2 gap-8">
          {articles.slice(1).map(a => <ArticleCard key={a.id} article={a} language={language} onDelete={onDelete && a.isCustom ? onDelete : undefined} />)}
        </div>
      </div>
      
      <div className="lg:col-span-1 space-y-8">
        <div className="bg-[#f0f9ff] p-8 rounded-3xl border border-blue-100 shadow-sm sticky top-32">
          <h3 className="text-xl font-black text-blue-900 mb-6 flex items-center gap-3">
             <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
             {t.healthTips}
          </h3>
          <div className="space-y-6">
            {[
              "Stay hydrated: Drink at least 8 glasses of water daily for metabolic health.",
              "Sleep cycles: Prioritize 7-9 hours of consistent sleep to boost cognitive function.",
              "Mental focus: 10 minutes of meditation can reduce cortisol levels by 25%.",
              "Nutrient balance: Include a variety of seasonal vegetables for micro-nutrients."
            ].map((tip, i) => (
              <div key={i} className="flex gap-4">
                 <div className="text-blue-200 font-black text-2xl">0{i+1}</div>
                 <p className="text-blue-800 text-sm font-bold leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthScienceSection;
