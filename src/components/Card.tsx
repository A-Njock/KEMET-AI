import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

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
    <div
      className="glass-card group cursor-pointer rounded-2xl p-8 overflow-hidden"
      onClick={() => navigate(to)}
    >
      <div className="relative z-10">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-6 group-hover:from-gold/30 group-hover:to-gold/10 transition-all duration-300 text-gold">
          {icon || (
            <div className="w-6 h-6 rounded bg-gold/40 group-hover:bg-gold/60 transition-colors" />
          )}
        </div>

        {/* Title */}
        <h3 className="font-heading text-2xl font-bold text-white mb-4 group-hover:text-gold transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors mb-6">
          {desc}
        </p>

        {/* CTA Link */}
        <div className="flex items-center text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          {i18n.language.startsWith('fr') ? 'En savoir plus' : 'Learn more'}
          <svg
            className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}
