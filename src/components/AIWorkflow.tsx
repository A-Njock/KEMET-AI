import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AIWorkflowProps {
  lang: 'fr' | 'en';
}

export default function AIWorkflow({ lang }: AIWorkflowProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const steps = lang === 'fr' ? [
    {
      number: '01',
      label: 'Vos Données',
      sublabel: 'Documents, bases de données, contexte métier — tout ce que vous possédez déjà.',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
          <rect x="8" y="4" width="18" height="24" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 28h18M14 10h6M14 14h6M14 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="29" cy="29" r="8" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M26 29h6M29 26v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      number: '02',
      label: 'IA GANP',
      sublabel: "Notre moteur d'IA analyse, comprend et transforme vos données en intelligence actionnable.",
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
          <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M20 8v4M20 28v4M8 20h4M28 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M15 20l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="20" cy="20" r="4" fill="currentColor" fillOpacity="0.12"/>
        </svg>
      ),
    },
    {
      number: '03',
      label: 'Résultats',
      sublabel: 'Insights clairs, automatisation fluide, décisions éclairées — une valeur immédiate.',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
          <path d="M8 32l8-10 6 6 10-16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="32" cy="12" r="4" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M30.5 12h3M32 10.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
  ] : [
    {
      number: '01',
      label: 'Your Data',
      sublabel: 'Documents, databases, business context — everything you already own.',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
          <rect x="8" y="4" width="18" height="24" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 28h18M14 10h6M14 14h6M14 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="29" cy="29" r="8" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M26 29h6M29 26v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      number: '02',
      label: 'GANP AI',
      sublabel: 'Our AI engine reads, understands and transforms your data into actionable intelligence.',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
          <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M20 8v4M20 28v4M8 20h4M28 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M15 20l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="20" cy="20" r="4" fill="currentColor" fillOpacity="0.12"/>
        </svg>
      ),
    },
    {
      number: '03',
      label: 'Results',
      sublabel: 'Clear insights, seamless automation, confident decisions — immediate business value.',
      icon: (
        <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
          <path d="M8 32l8-10 6 6 10-16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="32" cy="12" r="4" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M30.5 12h3M32 10.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div ref={ref} className="mt-20">
      {/* Section label */}
      <motion.p
        className="text-royal text-xs font-semibold tracking-[0.25em] uppercase mb-12 text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        {lang === 'fr' ? 'Comment ça fonctionne' : 'How It Works'}
      </motion.p>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">

        {/* Connecting line (desktop only) */}
        <div className="hidden md:block absolute top-12 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px">
          <motion.div
            className="h-full bg-gradient-to-r from-[#E2D9C8] via-royal/30 to-[#E2D9C8]"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left' }}
          />
        </div>

        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            className="relative flex flex-col items-center text-center px-8 pb-10"
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: idx * 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Step number + icon stacked */}
            <div className="relative mb-6">
              {/* Large ghost number */}
              <span
                className="font-display text-[80px] font-semibold leading-none select-none pointer-events-none"
                style={{ color: 'rgba(184,137,42,0.07)' }}
              >
                {step.number}
              </span>

              {/* Icon circle — centered over the number */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-royal
                  ${idx === 1
                    ? 'bg-navy text-white shadow-[0_8px_24px_rgba(12,27,74,0.20)]'
                    : 'bg-white border border-[#E2D9C8] shadow-[0_4px_16px_rgba(12,27,74,0.06)]'
                  }`}
                >
                  {step.icon}
                </div>
              </div>
            </div>

            {/* Label */}
            <h3 className={`font-display text-xl font-semibold mb-3 ${idx === 1 ? 'text-royal' : 'text-navy'}`}>
              {step.label}
            </h3>

            {/* Description */}
            <p className="text-slate text-sm leading-relaxed max-w-[220px]">
              {step.sublabel}
            </p>

            {/* Mobile connector */}
            {idx < steps.length - 1 && (
              <div className="md:hidden w-px h-8 bg-[#E2D9C8] my-4" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
