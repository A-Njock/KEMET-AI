import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  desc: string;
  to: string;
  icon?: ReactNode;
}

export default function Card({ title, desc, to, icon }: CardProps) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  return (
    <motion.div
      className="bg-white border border-[#DDE2EE] rounded-2xl p-8 cursor-pointer overflow-hidden relative group h-full flex flex-col"
      onClick={() => navigate(to)}
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(12,27,74,0.10)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Icon */}
      <motion.div
        className="w-12 h-12 rounded-xl bg-royal-pale border border-royal/15 flex items-center justify-center mb-6 text-royal"
        whileHover={{ backgroundColor: '#B8892A', color: 'white' }}
        transition={{ duration: 0.2 }}
      >
        {icon || <div className="w-5 h-5 rounded bg-royal/30" />}
      </motion.div>

      {/* Title */}
      <h3 className="font-display text-2xl font-semibold text-navy mb-3 group-hover:text-royal transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-slate text-sm leading-relaxed mb-6 flex-1">{desc}</p>

      {/* CTA */}
      <motion.div
        className="flex items-center text-royal text-sm font-semibold gap-1.5"
        initial={{ opacity: 0, x: -4 }}
        whileHover={{ opacity: 1, x: 0 }}
        animate={{ opacity: 0 }}
      >
        {i18n.language.startsWith('fr') ? 'En savoir plus' : 'Learn more'}
        <motion.svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </motion.svg>
      </motion.div>

      {/* Corner accent */}
      <motion.div
        className="absolute bottom-0 right-0 w-20 h-20 bg-royal-pale rounded-tl-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.6 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
