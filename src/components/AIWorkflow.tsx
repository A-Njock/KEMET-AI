import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AIWorkflowProps {
  lang: 'fr' | 'en';
}

function FlowBeam({ inView, delay, id }: { inView: boolean; delay: number; id: string }) {
  return (
    <div className="hidden md:flex items-center justify-center flex-shrink-0 w-20 lg:w-28">
      <svg width="100%" height="24" viewBox="0 0 100 24" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`beam-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(184,137,42,0.15)" />
            <stop offset="100%" stopColor="rgba(184,137,42,0.6)" />
          </linearGradient>
          <filter id={`beam-glow-${id}`} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Static faint track */}
        <path d="M 0 12 L 100 12" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        {/* Animated beam draw */}
        <motion.path
          d="M 0 12 L 100 12"
          stroke={`url(#beam-grad-${id})`}
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Arrowhead */}
        <motion.path
          d="M 88 7 L 100 12 L 88 17"
          fill="none"
          stroke="rgba(184,137,42,0.55)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: delay + 0.85 }}
        />

        {/* Flowing data packet */}
        <motion.circle
          cy="12"
          r="3"
          fill="#B8892A"
          filter={`url(#beam-glow-${id})`}
          initial={{ cx: -6, opacity: 0 }}
          animate={
            inView
              ? { cx: [-6, 106, -6], opacity: [0, 1, 1, 0] }
              : {}
          }
          transition={{
            duration: 1.8,
            delay: delay + 1.1,
            repeat: Infinity,
            repeatDelay: 1.4,
            ease: 'easeInOut',
          }}
        />
      </svg>
    </div>
  );
}

function MobileConnector() {
  return (
    <div className="md:hidden flex flex-col items-center my-1">
      <div className="w-px h-6 bg-white/10" />
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
        <path d="M 1 1 L 5 5 L 9 1" stroke="rgba(184,137,42,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function AIWorkflow({ lang }: AIWorkflowProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const steps = [
    {
      number: '01',
      label: lang === 'fr' ? 'Vos Données' : 'Your Data',
      sublabel:
        lang === 'fr'
          ? 'Documents, bases de données, contexte métier — tout ce que vous possédez déjà.'
          : 'Documents, databases, business context — everything you already own.',
      isCenter: false,
      icon: (
        <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
          <rect x="5" y="2" width="15" height="21" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 8h7M9 12h7M9 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="24" cy="24" r="6" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M21.5 24h5M24 21.5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      number: '02',
      label: lang === 'fr' ? 'IA GANP' : 'GANP AI',
      sublabel:
        lang === 'fr'
          ? "Notre moteur d'IA analyse, comprend et transforme vos données en intelligence actionnable."
          : 'Our AI engine reads, understands and transforms your data into actionable intelligence.',
      isCenter: true,
      icon: (
        <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
          <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 6v3M16 23v3M6 16h3M23 16h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M11 16l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      number: '03',
      label: lang === 'fr' ? 'Résultats' : 'Results',
      sublabel:
        lang === 'fr'
          ? 'Insights clairs, automatisation fluide, décisions éclairées — une valeur immédiate.'
          : 'Clear insights, seamless automation, confident decisions — immediate business value.',
      isCenter: false,
      icon: (
        <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
          <path d="M4 26l7-9 5 5 9-14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="27" cy="8" r="3.5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
  ];

  return (
    <div
      ref={ref}
      className="relative rounded-2xl overflow-hidden py-14 px-6 md:px-12 lg:px-16 my-8"
      style={{
        background: 'linear-gradient(140deg, #0C1B4A 0%, #0e2058 60%, #0a1840 100%)',
      }}
    >
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />

      {/* Gold radial glow — center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 60% at 50% 50%, rgba(184,137,42,0.07) 0%, transparent 75%)',
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col md:flex-row md:items-center md:justify-center gap-0">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col md:flex-row md:items-center">
            {/* ── Card ── */}
            <motion.div
              className="relative flex-shrink-0 w-full md:w-52 lg:w-64 rounded-xl p-6 text-center overflow-hidden"
              style={{
                background: step.isCenter
                  ? 'rgba(184,137,42,0.09)'
                  : 'rgba(255,255,255,0.03)',
                border: step.isCenter
                  ? '1px solid rgba(184,137,42,0.35)'
                  : '1px solid rgba(255,255,255,0.07)',
              }}
              initial={{ opacity: 0, y: 36 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: idx * 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Ghost step number */}
              <span
                className="absolute bottom-2 right-3 font-display font-bold leading-none select-none pointer-events-none"
                style={{
                  fontSize: '64px',
                  color: step.isCenter ? 'rgba(184,137,42,0.1)' : 'rgba(255,255,255,0.04)',
                  lineHeight: 1,
                }}
              >
                {step.number}
              </span>

              {/* Icon container */}
              <div
                className="relative mx-auto mb-5 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: step.isCenter
                    ? '#B8892A'
                    : 'rgba(255,255,255,0.07)',
                  color: step.isCenter ? '#fff' : 'rgba(255,255,255,0.65)',
                }}
              >
                {step.icon}
                {/* Icon inner glow for center */}
                {step.isCenter && (
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{ background: 'rgba(184,137,42,0.4)' }}
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </div>

              {/* Label */}
              <h3
                className="font-display text-lg font-semibold mb-2 relative"
                style={{ color: step.isCenter ? '#C9A040' : 'rgba(255,255,255,0.9)' }}
              >
                {step.label}
              </h3>

              {/* Description */}
              <p className="text-xs leading-relaxed relative" style={{ color: 'rgba(255,255,255,0.42)' }}>
                {step.sublabel}
              </p>

              {/* Pulsing border ring — center card only */}
              {step.isCenter && (
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{ border: '1px solid rgba(184,137,42,0.5)' }}
                  animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.015, 1] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </motion.div>

            {/* ── Connectors ── */}
            {idx < steps.length - 1 && (
              <>
                <FlowBeam inView={isInView} delay={idx * 0.22 + 0.55} id={`${idx}`} />
                <MobileConnector />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Bottom label strip */}
      <motion.div
        className="relative mt-10 pt-8 border-t flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-center"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        {[
          { value: '< 30j', label: lang === 'fr' ? 'Déploiement' : 'Deployment' },
          { value: '100%', label: lang === 'fr' ? 'Sur Mesure' : 'Custom-built' },
          { value: '24/7', label: lang === 'fr' ? 'Support IA' : 'AI Support' },
        ].map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center gap-0.5">
            <span className="font-display text-2xl font-semibold" style={{ color: '#B8892A' }}>
              {value}
            </span>
            <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
