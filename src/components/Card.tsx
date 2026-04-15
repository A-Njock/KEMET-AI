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
      className="luxury-card group cursor-pointer p-8 overflow-hidden relative"
      onClick={() => navigate(to)}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-royal-pale border border-royal/15 flex items-center justify-center mb-6 group-hover:bg-royal group-hover:border-royal transition-all duration-300 text-royal group-hover:text-white">
        {icon || <div className="w-5 h-5 rounded bg-royal/30" />}
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl font-semibold text-navy mb-3 group-hover:text-royal transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-slate text-sm leading-relaxed mb-6">
        {desc}
      </p>

      {/* CTA */}
      <div className="flex items-center text-royal text-sm font-semibold gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
        {i18n.language.startsWith('fr') ? 'En savoir plus' : 'Learn more'}
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>

      {/* Subtle corner accent */}
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-royal-pale rounded-tl-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
