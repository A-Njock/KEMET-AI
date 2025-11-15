import { useNavigate } from 'react-router-dom';

interface CardProps {
  title: string;
  desc: string;
  to: string;
}

export default function Card({ title, desc, to }: CardProps) {
  const navigate = useNavigate();
  return (
    <div
      className="group cursor-pointer relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gold/20 rounded-2xl p-8 hover:border-gold/60 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-300 overflow-hidden"
      onClick={() => navigate(to)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
          <div className="w-6 h-6 rounded bg-gold/30 group-hover:bg-gold/50 transition-colors" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-white mb-3 group-hover:text-gold transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
          {desc}
        </p>
        <div className="mt-6 flex items-center text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          En savoir plus
          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

