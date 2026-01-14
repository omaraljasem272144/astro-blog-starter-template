
import React, { useState, useEffect } from 'react';
import { Language, Category } from '../types';
import { translations } from '../translations';

interface SettingsModalProps {
  onClose: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenAdmin: () => void;
  themeColor: string;
  onThemeColorChange: (color: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  onClose, 
  language, 
  onLanguageChange, 
  onOpenAdmin
}) => {
  const t = translations[language];
  const [subscriptions, setSubscriptions] = useState<Category[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('nabd_subscriptions');
    if (saved) setSubscriptions(JSON.parse(saved));
  }, []);

  const toggleSubscription = (cat: Category) => {
    const updated = subscriptions.includes(cat)
      ? subscriptions.filter(c => c !== cat)
      : [...subscriptions, cat];
    setSubscriptions(updated);
    localStorage.setItem('nabd_subscriptions', JSON.stringify(updated));
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95">
        <div className="bg-brand p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
             </svg>
            <h2 className="text-xl font-bold">{t.settings}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          {/* Admin Control Section */}
          <section className="bg-red-50 p-6 rounded-2xl border border-red-100 flex items-center justify-between group">
            <div className="flex items-center gap-4">
               <div className="bg-brand text-white p-3 rounded-xl shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
               </div>
               <div>
                  <h3 className="text-base font-black text-brand">{t.adminPanel}</h3>
                  <p className="text-[10px] text-red-600 font-bold uppercase tracking-widest">{t.adminDesc}</p>
               </div>
            </div>
            <button 
              onClick={() => { onClose(); onOpenAdmin(); }}
              className="bg-brand text-white px-6 py-2.5 rounded-xl font-black text-xs hover:scale-105 transition-all shadow-xl active:scale-95 uppercase"
            >
              {language === Language.AR ? 'دخول' : 'Access'}
            </button>
          </section>

          {/* Language Selection */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
               {language === Language.AR ? 'لغة الموقع' : 'Site Language'}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => onLanguageChange(Language.AR)}
                className={`p-4 rounded-xl border-2 transition-all font-bold ${language === Language.AR ? 'border-brand bg-red-50 text-brand' : 'border-gray-100 hover:border-gray-200'}`}
              >
                العربية
              </button>
              <button 
                onClick={() => onLanguageChange(Language.EN)}
                className={`p-4 rounded-xl border-2 transition-all font-bold ${language === Language.EN ? 'border-brand bg-red-50 text-brand' : 'border-gray-100 hover:border-gray-200'}`}
              >
                English
              </button>
            </div>
          </section>

          {/* Notifications / Subscriptions */}
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
               {language === Language.AR ? 'متابعة الأقسام' : 'Follow Categories'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.values(Category).map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleSubscription(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                    subscriptions.includes(cat)
                      ? 'bg-brand text-white border-brand'
                      : 'bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-200'
                  }`}
                >
                  {t.categories[cat]}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-brand text-white font-bold rounded-xl shadow-lg hover:shadow-red-200 transition-all active:scale-95"
          >
            {t.saveSettings}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
