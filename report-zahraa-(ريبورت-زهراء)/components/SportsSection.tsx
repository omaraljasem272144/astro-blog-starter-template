
import React, { useState, useEffect } from 'react';
import { NewsArticle, Language } from '../types';
import { translations } from '../translations';
import ArticleCard from './ArticleCard';

interface SportsSectionProps {
  articles: NewsArticle[];
  language: Language;
  onDelete?: (id: string) => void;
}

const SportsSection: React.FC<SportsSectionProps> = ({ articles, language, onDelete }) => {
  const t = translations[language];
  const [leagueTable, setLeagueTable] = useState<{rank: number, team: string, pts: number}[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('nabd_sports_table');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) {
        setLeagueTable(parsed);
      } else {
        setDefaultTable();
      }
    } else {
      setDefaultTable();
    }
  }, []);

  const setDefaultTable = () => {
    setLeagueTable([
      { rank: 1, team: "Real Madrid", pts: 70 },
      { rank: 2, team: "Girona", pts: 62 },
      { rank: 3, team: "Barcelona", pts: 61 },
      { rank: 4, team: "Atlético Madrid", pts: 55 },
    ]);
  };

  if (!articles || articles.length === 0) {
    return <div className="text-center py-20 text-gray-400 font-bold uppercase tracking-widest">{t.noNews}</div>;
  }

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-5">
      <div className="bg-[#1a1a1a] rounded-3xl p-8 flex flex-wrap justify-center gap-6 shadow-2xl overflow-hidden relative">
         <div className="absolute top-0 right-0 p-4 opacity-5">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
         </div>
         
         {[
           { t1: "MUN", t2: "LIV", s1: 2, s2: 1, min: "85'", live: true },
           { t1: "RMA", t2: "BAR", s1: 0, s2: 0, min: "15'", live: true },
           { t1: "ACM", t2: "INT", s1: 1, s2: 3, min: "FT", live: false },
           { t1: "ARS", t2: "CHE", s1: 4, s2: 1, min: "FT", live: false }
         ].map((match, i) => (
           <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-6 backdrop-blur-md min-w-[220px]">
              <div className="text-center">
                 <div className="text-white font-black text-lg">{match.t1}</div>
              </div>
              <div className="flex flex-col items-center">
                 <div className="text-brand font-black text-xl">{match.s1} - {match.s2}</div>
                 <div className={`text-[9px] font-bold ${match.live ? 'text-red-500 animate-pulse' : 'text-gray-500'}`}>{match.min}</div>
              </div>
              <div className="text-center">
                 <div className="text-white font-black text-lg">{match.t2}</div>
              </div>
           </div>
         ))}
      </div>

      <div className="grid lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3">
          <ArticleCard article={articles[0]} featured={true} language={language} onDelete={onDelete} />
          <div className="grid sm:grid-cols-2 gap-8 mt-12">
            {articles.slice(1, 5).map(a => <ArticleCard key={a.id} article={a} language={language} onDelete={onDelete} />)}
          </div>
        </div>
        
        <div className="lg:col-span-1 space-y-10">
           <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <div className="w-2 h-2 bg-brand rounded-full"></div>
                 {language === Language.AR ? 'ترتيب الدوري' : 'League Table'}
              </h3>
              <div className="space-y-4">
                 {leagueTable.filter(item => item.team).map((item, i) => (
                   <div key={i} className="flex justify-between items-center text-xs font-bold border-b border-gray-50 pb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-300 w-4">{i + 1}</span>
                        <span className="text-gray-800">{item.team}</span>
                      </div>
                      <span className="text-brand font-black">{item.pts}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="space-y-6">
              <h3 className="text-xl font-black text-[#222] border-r-4 border-brand pr-3 mb-6">{t.latestNews}</h3>
              {articles.slice(5).map(a => (
                <div key={a.id} className="flex gap-4 group cursor-pointer border-b border-gray-100 pb-4 relative">
                   <img src={a.imageUrl} className="w-16 h-16 rounded-xl object-cover shadow-sm" alt="" />
                   <div className="min-w-0">
                     <h4 className="text-xs font-bold line-clamp-2 leading-tight group-hover:text-brand transition-colors">{a.title}</h4>
                     <span className="text-[9px] text-gray-400 font-bold mt-2 inline-block uppercase">{a.timestamp}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default SportsSection;
