
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface CertificateProps { language: Language; }

const Certificate: React.FC<CertificateProps> = ({ language }) => {
  const t = translations[language];

  const CertificateCard = ({ title, name, role, id, type }: { title: string, name: string, role: string, id: string, type: 'dev' | 'owner' }) => (
    <div className={`relative p-1 rounded-2xl shadow-2xl mb-20 ${type === 'dev' ? 'bg-gradient-to-br from-blue-900 via-slate-100 to-blue-900' : 'bg-gradient-to-br from-[#D4AF37] via-[#FFFACD] to-[#D4AF37]'}`}>
      <div className="bg-white p-1 rounded-xl">
        <div className="border-[6px] border-double border-gray-200 p-8 md:p-12 text-center relative overflow-hidden bg-[#fffdfa]">
          {/* Watermark */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex flex-wrap gap-10 p-10 rotate-12">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="text-2xl font-black">{type === 'dev' ? 'OMAR ALJASEM' : 'ZAHRAA MOHAMMED'}</div>
            ))}
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-10">
              <div className="text-left">
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Document No.</p>
                <p className="text-[10px] font-mono font-bold text-gray-800">{id}</p>
              </div>
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center font-black text-white shadow-lg rotate-3 ${type === 'dev' ? 'bg-blue-800' : 'bg-[#B80000]'}`}>
                {type === 'dev' ? 'OA' : 'ZM'}
              </div>
              <div className="text-right">
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Date Issued</p>
                <p className="text-[10px] font-mono font-bold text-gray-800">2025/01/01</p>
              </div>
            </div>

            <h3 className={`text-sm font-black uppercase tracking-[0.4em] mb-4 ${type === 'dev' ? 'text-blue-900' : 'text-[#DAA520]'}`}>{title}</h3>
            
            <div className="flex flex-col items-center gap-4 mb-8">
               <div className="h-px w-32 bg-gray-200"></div>
               <h2 className="text-5xl md:text-6xl font-serif italic font-black text-gray-900 tracking-tight">{name}</h2>
               <div className="h-px w-32 bg-gray-200"></div>
            </div>

            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-12 max-w-md mx-auto leading-relaxed">
              {role}
            </p>

            <div className="flex justify-center gap-20 items-end">
               <div className="text-center">
                  <div className="w-24 h-px bg-gray-300 mb-2"></div>
                  <p className="text-[8px] font-black text-gray-400 uppercase">Lead Verification</p>
               </div>
               <div className="relative">
                  <div className={`w-24 h-24 rounded-full border-4 border-double flex flex-col items-center justify-center bg-white shadow-xl ${type === 'dev' ? 'border-blue-800 text-blue-900' : 'border-[#DAA520] text-[#DAA520]'}`}>
                    <span className="text-[8px] font-black">ORIGINAL</span>
                    <span className="text-xl font-black">CERT</span>
                    <span className="text-[8px] font-black">SECURE</span>
                  </div>
               </div>
               <div className="text-center">
                  <div className="w-24 h-px bg-gray-300 mb-2"></div>
                  <p className="text-[8px] font-black text-gray-400 uppercase">Board of Directors</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-20">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-4xl font-black mb-4">{language === Language.AR ? 'التراخيص والشهادات الرسمية' : 'Official Licenses & Certificates'}</h2>
        <div className="w-20 h-1.5 bg-[#B80000] rounded-full"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
        {/* Certificate 1: Omar Aljasem */}
        <CertificateCard 
          title={language === Language.AR ? 'شهادة التميز التقني والتطوير' : 'CERTIFICATE OF TECHNICAL EXCELLENCE'} 
          name="Omar Aljasem" 
          role={language === Language.AR ? 'المصمم والمطور الرئيسي للمنصة، المسؤول عن هندسة النظم وتكامل الذكاء الاصطناعي وتجربة المستخدم.' : 'The lead designer and developer of the platform, responsible for systems architecture, AI integration, and user experience engineering.'}
          id="#OA-TECH-2025-PLATINUM"
          type="dev"
        />

        {/* Certificate 2: Zahraa Mohammed */}
        <CertificateCard 
          title={language === Language.AR ? 'شهادة الملكية الفكرية والإدارة' : 'CERTIFICATE OF OWNERSHIP & DIRECTION'} 
          name="Zahraa Mohammed" 
          role={language === Language.AR ? 'المالكة الرسمية للعلامة التجارية "ريبورت زهراء"، والمديرة التنفيذية للسياسة التحريرية والمحتوى الإعلامي.' : 'Official proprietor of the "Report Zahraa" brand, and Executive Director of editorial policy and media content.'}
          id="#ZM-OWN-2025-GOLD"
          type="owner"
        />
      </div>
    </div>
  );
};

export default Certificate;
