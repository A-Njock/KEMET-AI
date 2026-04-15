import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Step {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  color: string;
}

interface AIWorkflowProps {
  lang: 'fr' | 'en';
}

export default function AIWorkflow({ lang }: AIWorkflowProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const steps: Step[] = lang === 'fr' ? [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      label: 'Vos données',
      sublabel: 'Documents, données, contexte',
      color: '#FAF4E6',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      ),
      label: 'IA GANP',
      sublabel: 'Analyse & traitement intelligent',
      color: '#0C1B4A',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      label: 'Résultats',
      sublabel: 'Insights, automatisation, décisions',
      color: '#B8892A',
    },
  ] : [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      label: 'Your Data',
      sublabel: 'Documents, data, context',
      color: '#FAF4E6',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      ),
      label: 'GANP AI',
      sublabel: 'Intelligent analysis & processing',
      color: '#0C1B4A',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      label: 'Results',
      sublabel: 'Insights, automation, decisions',
      color: '#B8892A',
    },
  ];

  return (
    <div ref={ref} className="bg-white rounded-2xl border border-[#DDE2EE] p-8 md:p-12 mt-16 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-0">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col md:flex-row items-center w-full md:w-auto">
            {/* Step card */}
            <motion.div
              className="flex flex-col items-center text-center flex-shrink-0 w-full md:w-48"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Icon circle */}
              <motion.div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-card"
                style={{
                  backgroundColor: step.color,
                  color: step.color === '#0C1B4A' ? 'white' : step.color === '#B8892A' ? 'white' : '#B8892A',
                }}
                animate={isInView ? {
                  boxShadow: step.color === '#0C1B4A'
                    ? ['0 0 0 0px rgba(12,27,74,0)', '0 0 0 10px rgba(12,27,74,0.1)', '0 0 0 0px rgba(12,27,74,0)']
                    : 'none',
                } : {}}
                transition={{ duration: 2.5, delay: idx * 0.25 + 0.6, repeat: Infinity }}
              >
                {step.icon}
              </motion.div>

              <p className="font-semibold text-navy text-base mb-1">{step.label}</p>
              <p className="text-slate text-xs leading-relaxed max-w-[140px]">{step.sublabel}</p>
            </motion.div>

            {/* Connector arrow */}
            {idx < steps.length - 1 && (
              <div className="flex items-center justify-center my-4 md:my-0 md:mx-4 flex-shrink-0">
                <div className="relative w-16 h-px">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#E2D9C8] to-royal h-px"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.5, delay: idx * 0.25 + 0.4, ease: 'easeOut' }}
                  />
                  <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                    initial={{ opacity: 0, x: -8 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: idx * 0.25 + 0.8 }}
                  >
                    <svg className="w-3 h-3 text-royal" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
