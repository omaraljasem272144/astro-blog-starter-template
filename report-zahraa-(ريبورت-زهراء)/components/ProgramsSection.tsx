
import React from 'react';
import { NewsArticle, Language } from '../types';
import { translations } from '../translations';

interface ProgramsSectionProps {
  articles: NewsArticle[];
  language: Language;
  onDelete?: (id: string) => void;
}

const ProgramsSection: React.FC<ProgramsSectionProps> = ({ articles, language, onDelete }) => {
  const t = translations[language];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-black mb-8 flex items-center gap-4">
          <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          {language === Language.AR ? 'جدول البرامج' : 'Program Schedule'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((program) => (
            <div key={program.id} className="relative group overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-all">
              {onDelete && (
                <button onClick={(e) => { e.stopPropagation(); onDelete(program.id); }} className="absolute top-4 left-4 z-20 bg-red-600 text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              )}
              <div className="aspect-[3/4] overflow-hidden">
                <img src={program.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              </div>
              
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold">
                Daily • 21:00 GMT
              </div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-xl font-black leading-tight mb-2">{program.title}</h3>
                <p className="text-gray-300 text-[10px] font-medium line-clamp-2">{program.description}</p>
              </div>
              
              <div className="absolute inset-0 bg-brand/90 flex items-center justify-center p-8 opacity-0 group-hover:opacity-100 transition-opacity translate-y-full group-hover:translate-y-0 duration-300">
                <div className="text-center">
                   <h4 className="text-white font-black text-lg mb-4">Upcoming Episode</h4>
                   <p className="text-white/80 text-xs mb-6">"Challenges of the Digital Era" - Tonight 9:00 PM</p>
                   {program.url ? (
                     <a href={program.url} target="_blank" rel="noopener noreferrer" className="bg-white text-brand px-6 py-2 rounded-full font-black text-xs block">Watch Now</a>
                   ) : (
                     <button className="bg-white text-brand px-6 py-2 rounded-full font-black text-xs">Set Reminder</button>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramsSection;
