
import React, { useState, useRef, useEffect } from 'react';
import { PodcastEpisode } from '../types';

interface PodcastSectionProps {
  isFullPage?: boolean;
}

const DEFAULT_PODCASTS: PodcastEpisode[] = [
  { id: 'p1', title: 'مستقبل التقنية في الشرق الأوسط', duration: '24 دقيقة', date: 'الأمس', imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'p2', title: 'تغير المناخ وتأثيره الإقليمي', duration: '18 دقيقة', date: 'منذ يومين', imageUrl: 'https://images.unsplash.com/photo-1518384403044-838c95973f97?w=400', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' }
];

const PodcastSection: React.FC<PodcastSectionProps> = ({ isFullPage }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [podcasts, setPodcasts] = useState<PodcastEpisode[]>(DEFAULT_PODCASTS);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const custom = JSON.parse(localStorage.getItem('nabd_custom_podcasts') || '[]');
    setPodcasts([...custom, ...DEFAULT_PODCASTS].reduce((acc: PodcastEpisode[], curr) => {
      if(!acc.find(i => i.id === curr.id)) acc.push(curr);
      return acc;
    }, []));
  }, []);

  const togglePlay = (episode: PodcastEpisode) => {
    if (playingId === episode.id) {
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = episode.audioUrl;
        audioRef.current.play();
      }
      setPlayingId(episode.id);
    }
  };

  const activeEpisode = podcasts.find(e => e.id === playingId);

  return (
    <div className={`bg-white p-8 rounded-3xl shadow-sm border-t-8 border-brand animate-in fade-in ${isFullPage ? 'mb-20' : ''}`}>
      <audio ref={audioRef} onEnded={() => setPlayingId(null)} onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)} onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)} className="hidden" />
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <h2 className="text-3xl font-black flex items-center gap-4"><span className="w-4 h-4 bg-brand rounded-full animate-ping"></span>بودكاست حصري</h2>
        {playingId && activeEpisode && (
          <div className="flex-grow max-w-xl w-full flex items-center gap-6 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 shadow-inner">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0"><img src={activeEpisode.imageUrl} className="w-full h-full object-cover" alt="" /></div>
            <div className="flex-grow"><div className="text-[10px] font-black text-brand uppercase mb-1">LIVE</div><div className="text-xs font-bold line-clamp-1">{activeEpisode.title}</div></div>
            <input type="range" min="0" max={duration || 0} value={currentTime} onChange={e => { if(audioRef.current) audioRef.current.currentTime = Number(e.target.value); }} className="w-24 md:w-48 accent-brand h-1" />
          </div>
        )}
      </div>
      <div className={`grid grid-cols-1 ${isFullPage ? 'sm:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
        {podcasts.map((episode) => (
          <div key={episode.id} className={`group flex flex-col p-6 rounded-2xl border-2 transition-all cursor-pointer ${playingId === episode.id ? 'border-brand bg-brand/5' : 'bg-gray-50/50 hover:bg-gray-100'}`} onClick={() => togglePlay(episode)}>
            <div className="relative aspect-square rounded-xl overflow-hidden mb-6 shadow-md">
              <img src={episode.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center text-white">{playingId === episode.id ? <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>}</div></div>
            </div>
            <h4 className="font-black text-lg leading-tight mb-3 group-hover:text-brand transition-colors">{episode.title}</h4>
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100"><span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-[10px] font-black">{episode.duration}</span><span className="text-gray-400 text-[10px] font-bold">{episode.date}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastSection;
