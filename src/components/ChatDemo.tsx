import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const conversations = {
  fr: [
    {
      user: 'Quels sont mes droits en cas de licenciement ?',
      bot: "En cas de licenciement, vous avez droit à un préavis selon votre ancienneté, une indemnité de licenciement, et un certificat de travail. Le Code du Travail vous protège contre les licenciements abusifs.",
      sources: [{ article: 'Art. 34', law: 'Code du Travail du Cameroun' }]
    },
    {
      user: 'Comment créer une SARL au Cameroun ?',
      bot: "La création d'une SARL nécessite un capital minimum de 1 000 000 FCFA, au moins 2 associés et une immatriculation au RCCM. Le processus peut être complété en 72h via le CFCE.",
      sources: [{ article: 'Art. 309', law: 'Acte Uniforme OHADA' }]
    },
  ],
  en: [
    {
      user: 'What are my rights if dismissed?',
      bot: "If dismissed, you're entitled to a notice period based on seniority, severance pay, and a work certificate. The Labor Code protects you against unfair dismissal.",
      sources: [{ article: 'Art. 34', law: 'Cameroon Labor Code' }]
    },
    {
      user: 'How do I register a company in Cameroon?',
      bot: "Company registration requires a minimum capital of 1,000,000 FCFA, at least 2 shareholders, and RCCM registration. The process takes 72h through the CFCE.",
      sources: [{ article: 'Art. 309', law: 'OHADA Uniform Act' }]
    },
  ],
};

type Phase = 'user' | 'typing' | 'response' | 'pause';

export default function ChatDemo() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('fr') ? 'fr' : 'en';
  const convs = conversations[lang];

  const [convIdx, setConvIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('user');

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (phase === 'user')     timer = setTimeout(() => setPhase('typing'),   1400);
    else if (phase === 'typing')  timer = setTimeout(() => setPhase('response'), 1800);
    else if (phase === 'response') timer = setTimeout(() => setPhase('pause'),  4000);
    else timer = setTimeout(() => { setConvIdx(p => (p + 1) % convs.length); setPhase('user'); }, 1000);
    return () => clearTimeout(timer);
  }, [phase, convIdx, convs.length]);

  const conv = convs[convIdx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: 340, height: 420, flexShrink: 0 }}
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-[#E2D9C8]/20 shadow-[0_8px_40px_rgba(12,27,74,0.02)] overflow-hidden h-full flex flex-col">

        {/* Window chrome */}
        <div className="px-5 py-3 border-b border-[#E2D9C8] flex items-center gap-3 bg-ivory">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E2D9C8]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#E2D9C8]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#E2D9C8]" />
          </div>
          <div className="flex-1 flex items-center justify-center gap-2">
            <img src="/ganp-logo.png" alt="" className="w-4 h-4 object-contain" />
            <span className="text-xs font-semibold text-navy tracking-wide">Ganp-Chat</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 ml-0.5" />
          </div>
        </div>

        {/* Messages */}
        <div className="p-5 space-y-4 flex-1 flex flex-col justify-end overflow-hidden">

          {/* User bubble */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`u-${convIdx}`}
              className="flex gap-2.5 justify-end"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="max-w-[78%] bg-royal text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-xs leading-relaxed">
                {conv.user}
              </div>
              <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-navy flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bot response */}
          <AnimatePresence mode="wait">
            {phase === 'typing' && (
              <motion.div
                key="typing"
                className="flex gap-2.5 items-start"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-royal-pale border border-royal/20 flex items-center justify-center">
                  <img src="/ganp-logo.png" alt="" className="w-4 h-4 object-contain" />
                </div>
                <div className="bg-white border border-[#E2D9C8] rounded-2xl rounded-tl-sm px-4 py-3 shadow-card">
                  <div className="flex gap-1 items-center">
                    {[0, 0.15, 0.3].map((delay, i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-royal/50"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.65, delay, repeat: Infinity }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {(phase === 'response' || phase === 'pause') && (
              <motion.div
                key={`r-${convIdx}`}
                className="flex gap-2.5 items-start"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-royal-pale border border-royal/20 flex items-center justify-center">
                  <img src="/ganp-logo.png" alt="" className="w-4 h-4 object-contain" />
                </div>
                <div className="bg-white border border-[#E2D9C8] rounded-2xl rounded-tl-sm px-4 py-3 shadow-card max-w-[78%]">
                  <p className="text-xs text-navy leading-relaxed mb-3">{conv.bot}</p>
                  <div className="pt-2 border-t border-[#E2D9C8]">
                    <p className="text-[9px] font-bold text-royal uppercase tracking-widest mb-1.5">Source</p>
                    {conv.sources.map((s, i) => (
                      <div key={i} className="flex items-center gap-1.5 bg-royal-pale rounded-lg px-2.5 py-1.5">
                        <span className="text-[9px] font-bold text-royal">{s.article}</span>
                        <span className="text-[9px] text-slate truncate">— {s.law}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input bar */}
        <div className="px-5 pb-5">
          <div className="bg-ivory border border-[#E2D9C8] rounded-xl flex items-center gap-2 px-3 py-2">
            <span className="text-[11px] text-slate/40 flex-1 select-none">
              {lang === 'fr' ? 'Posez votre question juridique...' : 'Ask your legal question...'}
            </span>
            <div className="w-7 h-7 bg-royal rounded-lg flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
