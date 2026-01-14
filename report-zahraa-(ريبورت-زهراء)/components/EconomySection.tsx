
import React, { useState, useEffect } from 'react';
import { NewsArticle, Language } from '../types';
import ArticleCard from './ArticleCard';
import { translations } from '../translations';

interface EconomySectionProps {
  articles: NewsArticle[];
  language: Language;
  onDelete?: (id: string) => void;
}

interface MarketStat {
  label: string;
  value: string;
  change: string;
  isUp: boolean;
}

const EconomySection: React.FC<EconomySectionProps> = ({ articles, language, onDelete }) => {
  const t = translations[language];
  const [marketStats, setMarketStats] = useState<MarketStat[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('nabd_market_pulse');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) {
        setMarketStats(parsed);
      } else {
        setDefaultStats();
      }
    } else {
      setDefaultStats();
    }
  }, []);

  const setDefaultStats = () => {
    setMarketStats([
      { label: "BRENT OIL", value: "$84.12", change: "1.4%", isUp: true },
      { label: "GOLD", value: "$2,150", change: "0.2%", isUp: false },
      { label: "S&P 500", value: "5,210", change: "0.4%", isUp: true },
      { label: "BTC/USD", value: "67,400", change: "2.1%", isUp: true }
    ]);
  };
  
  if (!articles || articles.length === 0) {
    return <div className="text-center py-20 text-gray-400 font-bold uppercase tracking-widest">{t.noNews}</div>;
  }

  return (
    <div className="space-y-12 animate-in slide-in-from-right-10 duration-500">
      {/* Market Pulse Dashboard */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-8">
        {marketStats.filter(s => s.label).map((stat, i) => (
          <div key={i} className={`space-y-2 ${i > 0 ? 'md:border-r border-gray-100 md:pr-8' : ''}`}>
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
             <div className="flex items-end gap-2">
                <span className="text-2xl font-black">{stat.value}</span>
                <span className={`${stat.isUp ? 'text-green-500' : 'text-red-500'} font-bold text-xs mb-1`}>
                  {stat.isUp ? '▲' : '▼'} {stat.change}
                </span>
             </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {/* Main Chart Simulation */}
          <div className="bg-[#111] p-8 rounded-3xl mb-12 relative overflow-hidden h-[300px]">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-white font-black">{language === Language.AR ? 'أداء السوق العالمي' : 'Global Market Performance'}</h3>
                <div className="flex gap-2">
                   <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                   <span className="text-[10px] text-gray-400 uppercase font-bold">Realtime</span>
                </div>
             </div>
             <div className="flex items-end gap-2 h-32">
                {[40, 60, 45, 70, 85, 65, 90, 100, 80, 95, 110, 105, 120].map((h, i) => (
                  <div key={i} className="flex-grow bg-[#DAA520]/20 rounded-t-lg relative group transition-all" style={{height: `${h}%`}}>
                     <div className="absolute inset-0 bg-[#DAA520] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ))}
             </div>
             <div className="mt-8 flex justify-between text-[10px] font-mono text-gray-500 uppercase">
                <span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span><span>00:00</span>
             </div>
          </div>

          <ArticleCard article={articles[0]} featured={true} language={language} onDelete={onDelete && articles[0].isCustom ? onDelete : undefined} />
          <div className="grid sm:grid-cols-2 gap-8 mt-12">
            {articles.slice(1, 5).map(a => <ArticleCard key={a.id} article={a} language={language} onDelete={onDelete && a.isCustom ? onDelete : undefined} />)}
          </div>
        </div>
        
        <div className="space-y-8">
           <div className="bg-[#111] p-8 rounded-3xl text-white">
              <h3 className="text-xl font-black mb-6 text-[#DAA520]">{language === Language.AR ? 'تحليل الأسواق' : 'Market Analysis'}</h3>
              <div className="space-y-8">
                 {articles.slice(5).map(a => (
                   <div key={a.id} className="group cursor-pointer border-b border-white/5 pb-4 relative">
                     <p className="text-[#DAA520] text-[10px] font-black tracking-widest uppercase mb-1">Analysis</p>
                     <h4 className="text-sm font-bold line-clamp-2 leading-tight group-hover:text-white transition-colors">{a.title}</h4>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-8 py-4 border border-[#DAA520] text-[#DAA520] rounded-xl font-black text-xs uppercase hover:bg-[#DAA520] hover:text-black transition-all">
                 {language === Language.AR ? 'تنزيل التقرير المالي' : 'Download Report'}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EconomySection;
