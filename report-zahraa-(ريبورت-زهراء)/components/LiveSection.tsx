
import React, { useState, useEffect, useRef } from 'react';
import { NewsArticle, Language, LiveChannel, Category } from '../types';
import { translations } from '../translations';

interface LiveSectionProps {
  articles: NewsArticle[];
  language: Language;
}

const DEFAULT_CHANNELS: LiveChannel[] = [
  { id: 'c1', name: { ar: 'نبض الحدث - مباشر', en: 'Al Hadath Live' }, youtubeId: '2n6S6q7F_W0', viewers: '142K', type: 'Breaking', color: '#B80000', quality: '4K Ultra HD' },
  { id: 'c2', name: { ar: 'نبض الإخبارية - الجزيرة', en: 'Al Jazeera Live' }, youtubeId: 'bNyUshYnBpM', viewers: '98K', type: 'News', color: '#0056b3', quality: '1080p 60fps' },
  { id: 'c3', name: { ar: 'نبض الاقتصاد - سكاي نيوز', en: 'Sky News Arabia' }, youtubeId: 'w_Ma8oQLmSM', viewers: '55K', type: 'Finance', color: '#DAA520', quality: 'HD' }
];

const LiveSection: React.FC<LiveSectionProps> = ({ articles, language }) => {
  const t = translations[language];
  const [channels, setChannels] = useState<LiveChannel[]>(DEFAULT_CHANNELS);
  const [activeChannel, setActiveChannel] = useState<LiveChannel>(DEFAULT_CHANNELS[0]);
  const [chatMessages, setChatMessages] = useState<{user: string, text: string}[]>([]);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const customChannels = JSON.parse(localStorage.getItem('nabd_custom_live') || '[]');
    if (customChannels.length > 0) {
      setChannels(customChannels);
      setActiveChannel(customChannels[0]);
    } else {
      setChannels(DEFAULT_CHANNELS);
      setActiveChannel(DEFAULT_CHANNELS[0]);
    }
  }, []);

  useEffect(() => {
    const chatInterval = setInterval(() => {
      const users = ["Omar", "Zahraa", "Ahmed", "Sarah", "User123", "AdminBot"];
      const msgs = language === Language.AR 
        ? ["تغطية ممتازة", "الله يحفظ الجميع", "شكراً ريبورت زهراء", "بث سريع جداً"]
        : ["Great coverage!", "Stay safe everyone", "Love from Dubai", "Fast stream!"];
      const newMsg = { user: users[Math.floor(Math.random() * users.length)], text: msgs[Math.floor(Math.random() * msgs.length)] };
      setChatMessages(prev => [...prev.slice(-15), newMsg]);
    }, 4000);
    return () => clearInterval(chatInterval);
  }, [language]);

  useEffect(() => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  }, [chatMessages]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="relative aspect-video bg-black rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
             <iframe 
               className="w-full h-full" 
               src={`https://www.youtube.com/embed/${activeChannel.youtubeId}?autoplay=1&mute=1&rel=0&modestbranding=1&enablejsapi=1`} 
               title={activeChannel.name.ar} 
               frameBorder="0" 
               allow="autoplay; fullscreen"
             ></iframe>
             <div className="absolute top-8 right-8 flex items-center gap-3 z-20">
                <div className="bg-brand text-white text-[11px] font-black px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-2xl backdrop-blur-xl">
                   <span className="flex h-2.5 w-2.5 relative">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                   </span>
                   {language === Language.AR ? 'بث مباشر' : 'LIVE'}
                </div>
                <div className="bg-black/70 text-white text-[11px] font-black px-4 py-2.5 rounded-xl backdrop-blur-xl">
                  {activeChannel.viewers} {t.viewers}
                </div>
             </div>
             <div className="absolute bottom-0 inset-x-0 bg-brand text-white h-12 flex items-center z-30">
                <div className="flex-shrink-0 bg-white text-brand h-full flex items-center px-8 font-black text-[10px] uppercase tracking-widest">NEWS Ticker</div>
                <div className="flex-grow overflow-hidden relative h-full flex items-center">
                  <div className="flex whitespace-nowrap animate-marquee-seamless">
                    {articles.length > 0 ? articles.map((a, i) => <span key={i} className="mx-10 font-bold text-sm">● {a.title}</span>) : <span className="mx-10 font-bold text-sm">● {language === Language.AR ? 'نوافيكم بآخر المستجدات على مدار الساعة' : 'Bringing you the latest updates 24/7'}</span>}
                  </div>
                </div>
             </div>
          </div>
          <div className="mt-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
             <h2 className="text-2xl font-black mb-2">{language === Language.AR ? activeChannel.name.ar : activeChannel.name.en}</h2>
             <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">{activeChannel.quality} • {activeChannel.type}</p>
          </div>
        </div>
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="flex-grow bg-[#111] rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col shadow-2xl h-[450px]">
             <div className="p-5 border-b border-white/5 flex justify-between items-center">
               <h3 className="text-white text-[10px] font-black uppercase tracking-widest">LIVE CHAT</h3>
               <span className="w-2 h-2 bg-green-500 rounded-full"></span>
             </div>
             <div 
               ref={chatContainerRef}
               className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-hide"
               style={{ scrollBehavior: 'smooth', overflowAnchor: 'none' }}
             >
               {chatMessages.map((m, i) => (
                 <div key={i} className="animate-in fade-in slide-in-from-bottom-1 duration-300">
                   <span className="text-[#DAA520] font-black text-[10px] uppercase mr-2">{m.user}:</span>
                   <span className="text-gray-300 text-xs">{m.text}</span>
                 </div>
               ))}
             </div>
          </div>
          <div className="space-y-3 overflow-y-auto max-h-[300px] scrollbar-hide pr-1">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2 mb-2">{language === Language.AR ? 'اختر القناة' : 'Select Channel'}</h3>
            {channels.map((channel) => (
              <button 
                key={channel.id} 
                onClick={() => setActiveChannel(channel)} 
                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${activeChannel.id === channel.id ? 'border-brand bg-white shadow-md' : 'border-transparent bg-white hover:bg-gray-50'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-white shrink-0 ${activeChannel.id === channel.id ? 'bg-brand' : 'bg-gray-300'}`}>Z</div>
                <div className="text-right flex-grow min-w-0">
                  <p className="font-black text-[11px] truncate">{language === Language.AR ? channel.name.ar : channel.name.en}</p>
                  <p className="text-[9px] text-gray-400 font-black">{channel.viewers} LIVE</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSection;
