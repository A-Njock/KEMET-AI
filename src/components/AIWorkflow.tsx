import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AIWorkflowProps {
  lang: 'fr' | 'en';
}

// ─── Step 1: Your Data ──────────────────────────────────────────────────────
function DataIllustration({ inView }: { inView: boolean }) {
  return (
    <svg viewBox="0 0 180 130" fill="none" className="w-full h-full">
      {/* Back document */}
      <motion.rect x="28" y="30" width="60" height="78" rx="5"
        fill="#EDE8DF" stroke="#E2D9C8" strokeWidth="1.5"
        initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }} />

      {/* Middle document */}
      <motion.rect x="60" y="18" width="60" height="78" rx="5"
        fill="#F9F7F3" stroke="#D4CCBE" strokeWidth="1.5"
        initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.55, ease: [0.16, 1, 0.3, 1] }} />

      {/* Lines on middle doc */}
      {[34, 43, 52, 61, 70].map((y, i) => (
        <motion.line key={y} x1="70" y1={y} x2={i === 2 || i === 4 ? 106 : 112} y2={y}
          stroke={i >= 3 ? '#B8892A' : '#D4CCBE'} strokeWidth="2" strokeLinecap="round"
          strokeOpacity={i >= 3 ? 0.45 : 1}
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5 + i * 0.06, duration: 0.35 }}
          style={{ transformOrigin: '70px 0' }} />
      ))}

      {/* Front document (gold-framed) */}
      <motion.rect x="92" y="36" width="60" height="78" rx="5"
        fill="white" stroke="#B8892A" strokeWidth="1.5" strokeOpacity="0.55"
        initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.55, ease: [0.16, 1, 0.3, 1] }} />

      {/* Database cylinder */}
      <motion.g initial={{ opacity: 0, y: 6 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.7, duration: 0.45 }}>
        <ellipse cx="90" cy="116" rx="16" ry="5.5"
          fill="#FAF4E6" stroke="#B8892A" strokeWidth="1.2" strokeOpacity="0.5" />
        <rect x="74" y="104" width="32" height="12" fill="#FAF4E6" stroke="#B8892A" strokeWidth="1.2" strokeOpacity="0.3" />
        <ellipse cx="90" cy="104" rx="16" ry="5.5"
          fill="#FAF4E6" stroke="#B8892A" strokeWidth="1.2" strokeOpacity="0.5" />
        <line x1="90" y1="100" x2="90" y2="108" stroke="#B8892A" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
        <line x1="86" y1="104" x2="94" y2="104" stroke="#B8892A" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
      </motion.g>

      {/* Floating upload pulse */}
      <motion.path d="M 152 72 L 152 58 M 147 63 L 152 58 L 157 63"
        stroke="#B8892A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: [0, 0.9, 0.9, 0], y: [8, 0, 0, -8] } : {}}
        transition={{ delay: 0.9, duration: 1.6, repeat: Infinity, repeatDelay: 0.6, ease: 'easeInOut' }} />
    </svg>
  );
}

// ─── Step 2: GANP AI ────────────────────────────────────────────────────────
function AIIllustration({ inView }: { inView: boolean }) {
  const satellite = [
    { cx: 90, cy: 28, r: 5 },
    { cx: 138, cy: 55, r: 4.5 },
    { cx: 128, cy: 108, r: 5 },
    { cx: 52, cy: 108, r: 4.5 },
    { cx: 42, cy: 55, r: 5 },
  ];

  return (
    <svg viewBox="0 0 180 130" fill="none" className="w-full h-full">
      {/* Orbit ring */}
      <motion.circle cx="90" cy="68" r="44"
        stroke="#B8892A" strokeWidth="0.75" strokeOpacity="0.18" strokeDasharray="3 5"
        initial={{ opacity: 0, scale: 0.6 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.15, duration: 0.6 }}
        style={{ transformOrigin: '90px 68px' }} />

      {/* Spokes to satellites */}
      {satellite.map((s, i) => (
        <motion.path key={i} d={`M 90 68 L ${s.cx} ${s.cy}`}
          stroke="#B8892A" strokeWidth="1" strokeOpacity="0.2"
          initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
          transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }} />
      ))}

      {/* Satellite nodes */}
      {satellite.map((s, i) => (
        <motion.circle key={i} cx={s.cx} cy={s.cy} r={s.r}
          fill="#FAF4E6" stroke="#B8892A" strokeWidth="1.5" strokeOpacity="0.5"
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.35 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${s.cx}px ${s.cy}px` }} />
      ))}

      {/* Centre glow rings */}
      {[28, 18].map((r, i) => (
        <motion.circle key={i} cx="90" cy="68" r={r}
          fill="none" stroke="#B8892A"
          strokeWidth={i === 0 ? 0.75 : 0.5} strokeOpacity={i === 0 ? 0.12 : 0.08}
          animate={inView ? { r: [r, r + 10, r], opacity: [0.6, 0, 0.6] } : {}}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.7, ease: 'easeOut' }} />
      ))}

      {/* Centre node */}
      <motion.circle cx="90" cy="68" r="16"
        fill="#0C1B4A"
        initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '90px 68px' }} />
      <motion.circle cx="90" cy="68" r="16"
        fill="none" stroke="#B8892A" strokeWidth="1.5"
        animate={inView ? { opacity: [0.5, 1, 0.5] } : {}}
        transition={{ duration: 2, repeat: Infinity }} />

      {/* Centre checkmark */}
      <motion.path d="M 83 68 L 87.5 72.5 L 97 62"
        stroke="#B8892A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
        transition={{ delay: 0.85, duration: 0.45, ease: 'easeOut' }} />

      {/* Orbiting bright dot */}
      <motion.circle r="3.5" fill="#B8892A"
        animate={inView ? {
          cx: [90, 134, 90, 46, 90],
          cy: [24, 68, 112, 68, 24],
        } : { cx: 90, cy: 24 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 1 }}>
        <feGaussianBlur stdDeviation="2" />
      </motion.circle>
    </svg>
  );
}

// ─── Step 3: Results ────────────────────────────────────────────────────────
function ResultsIllustration({ inView }: { inView: boolean }) {
  const bars = [
    { x: 26, h: 38, gold: false, delay: 0.15 },
    { x: 60, h: 58, gold: false, delay: 0.22 },
    { x: 94, h: 48, gold: false, delay: 0.19 },
    { x: 128, h: 78, gold: true, delay: 0.27 },
  ];
  const base = 108;

  return (
    <svg viewBox="0 0 180 130" fill="none" className="w-full h-full">
      {/* Grid lines */}
      {[0, 26, 52, 78].map((offset, i) => (
        <line key={i} x1="18" y1={base - offset} x2="162" y2={base - offset}
          stroke="#E2D9C8" strokeWidth="0.75" strokeDasharray="4 5" />
      ))}

      {/* Bars — animate height from baseline */}
      {bars.map((b, i) => (
        <motion.rect key={i} x={b.x} rx="4" width="26"
          fill={b.gold ? '#B8892A' : '#EDE8DF'}
          stroke={b.gold ? '#B8892A' : '#D4CCBE'} strokeWidth="1"
          y={base} height={0}
          animate={inView ? { y: base - b.h, height: b.h } : { y: base, height: 0 }}
          transition={{ delay: b.delay + 0.3, duration: 0.65, ease: [0.16, 1, 0.3, 1] }} />
      ))}

      {/* Trend line */}
      <motion.path d="M 39 82 L 73 62 L 107 70 L 141 40"
        stroke="#B8892A" strokeWidth="2.2" strokeLinecap="round"
        strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ delay: 0.75, duration: 0.75, ease: [0.16, 1, 0.3, 1] }} />

      {/* Rising arrow badge */}
      <motion.g initial={{ opacity: 0, scale: 0.4 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.4, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '141px 40px' }}>
        <circle cx="141" cy="40" r="9" fill="#B8892A" />
        <path d="M 137.5 42 L 141 37.5 L 144.5 42" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>

      {/* Sparkle dots */}
      {[[22, 26], [155, 22], [20, 115]].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="2"
          fill="#B8892A" fillOpacity="0.45"
          animate={inView ? { scale: [1, 1.6, 1], opacity: [0.4, 0.9, 0.4] } : {}}
          transition={{ duration: 1.8, repeat: Infinity, delay: 1.2 + i * 0.4 }}
          style={{ transformOrigin: `${x}px ${y}px` }} />
      ))}
    </svg>
  );
}

// ─── Animated connector arrow ────────────────────────────────────────────────
function Connector({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <div className="hidden md:flex items-center justify-center w-16 lg:w-20 flex-shrink-0 self-stretch">
      <div className="relative w-full flex flex-col items-center justify-center gap-1">
        {/* Dashed track */}
        <div className="w-full h-px" style={{ background: 'repeating-linear-gradient(90deg, #E2D9C8 0px, #E2D9C8 4px, transparent 4px, transparent 10px)' }} />

        {/* Animated gold dot traveling */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-royal shadow-gold-glow"
          style={{ left: '-4px' }}
          animate={inView ? { left: ['−4px', '100%', '-4px'] } : {}}
          transition={{ duration: 2, delay: delay + 0.6, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }} />

        {/* Arrowhead */}
        <motion.svg width="10" height="14" viewBox="0 0 10 14" fill="none"
          className="absolute right-0"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.4, duration: 0.3 }}>
          <path d="M 1 2 L 8 7 L 1 12" stroke="#B8892A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </div>
    </div>
  );
}

// Mobile vertical connector
function VerticalConnector() {
  return (
    <div className="md:hidden flex flex-col items-center py-2">
      <div className="w-px h-8" style={{ background: 'repeating-linear-gradient(180deg, #E2D9C8 0px, #E2D9C8 4px, transparent 4px, transparent 10px)' }} />
      <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
        <path d="M 2 1 L 7 7 L 12 1" stroke="#B8892A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function AIWorkflow({ lang }: AIWorkflowProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const isFr = lang === 'fr';

  const steps = [
    {
      number: '01',
      label: isFr ? 'Vos Données' : 'Your Data',
      sublabel: isFr
        ? 'Documents, bases de données, contexte métier — tout ce que vous possédez déjà.'
        : 'Documents, databases, business context — everything you already own.',
      Illustration: DataIllustration,
    },
    {
      number: '02',
      label: isFr ? 'IA GANP' : 'GANP AI',
      sublabel: isFr
        ? "Notre moteur d'IA lit, comprend et transforme vos données en intelligence actionnable."
        : 'Our AI engine reads, understands and transforms your data into actionable intelligence.',
      Illustration: AIIllustration,
      highlight: true,
    },
    {
      number: '03',
      label: isFr ? 'Résultats' : 'Results',
      sublabel: isFr
        ? 'Insights clairs, automatisation fluide, décisions éclairées — valeur immédiate.'
        : 'Clear insights, seamless automation, confident decisions — immediate value.',
      Illustration: ResultsIllustration,
    },
  ];

  return (
    <div ref={ref} className="py-6">
      {/* Section label */}
      <motion.p
        className="text-royal text-[10px] font-semibold tracking-[0.28em] uppercase mb-8 text-center"
        initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}>
        {isFr ? 'Comment ça fonctionne' : 'How It Works'}
      </motion.p>

      {/* Cards row */}
      <div className="flex flex-col md:flex-row items-stretch gap-0">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col md:flex-row items-stretch flex-1">

            {/* ── Card ── */}
            <motion.div
              className="flex-1 rounded-2xl overflow-hidden flex flex-col"
              style={{
                border: step.highlight ? '1.5px solid rgba(184,137,42,0.35)' : '1.5px solid #E2D9C8',
                background: step.highlight ? '#FAF4E6' : 'white',
                boxShadow: step.highlight
                  ? '0 0 32px rgba(184,137,42,0.10), 0 4px 20px rgba(12,27,74,0.06)'
                  : '0 1px 3px rgba(12,27,74,0.04), 0 8px 24px rgba(12,27,74,0.05)',
              }}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: idx * 0.18, ease: [0.16, 1, 0.3, 1] }}>

              {/* Illustration zone */}
              <div className="relative flex items-center justify-center px-6 pt-8 pb-4"
                style={{ minHeight: '160px', background: step.highlight ? 'rgba(184,137,42,0.04)' : '#F9F7F3' }}>
                {/* Step number watermark */}
                <span className="absolute top-3 left-4 font-display font-bold leading-none select-none"
                  style={{ fontSize: '52px', color: step.highlight ? 'rgba(184,137,42,0.10)' : 'rgba(12,27,74,0.05)' }}>
                  {step.number}
                </span>
                <div className="w-full" style={{ maxWidth: '180px', height: '130px' }}>
                  <step.Illustration inView={isInView} />
                </div>
              </div>

              {/* Bottom separator */}
              <div className="h-px mx-6" style={{ background: step.highlight ? 'rgba(184,137,42,0.2)' : '#EDE8DF' }} />

              {/* Text zone */}
              <div className="px-6 py-5 flex-1">
                <h3
                  className="font-display text-xl font-semibold mb-2"
                  style={{ color: step.highlight ? '#B8892A' : '#0C1B4A' }}>
                  {step.label}
                </h3>
                <p className="text-slate text-sm leading-relaxed">{step.sublabel}</p>
              </div>
            </motion.div>

            {/* ── Connector (between cards) ── */}
            {idx < steps.length - 1 && (
              <>
                <Connector inView={isInView} delay={idx * 0.18 + 0.3} />
                <VerticalConnector />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
