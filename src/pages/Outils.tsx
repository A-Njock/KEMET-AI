import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Outils() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');

  const tools = [
    {
      title: t('kemet_chat_title'),
      titleNode: <>Ganp<span style={{ fontFamily: '"Josefin Sans", sans-serif', fontWeight: 100 }}>-</span>Chat</>,
      description: t('kemet_chat_desc'),
      details: t('kemet_chat_details'),
      link: '/chatbot',
      linkText: t('use_kemet_chat'),
      badge: isFr ? 'Disponible' : 'Available',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-ivory font-sans">
      <Header />

      {/* Page header */}
      <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        <p className="text-royal text-xs font-semibold tracking-[0.25em] uppercase mb-4">
          {isFr ? 'Nos Outils' : 'Our Tools'}
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-semibold text-navy mb-4 leading-tight">
          {t('outils_title')}
        </h1>
        <p className="text-slate text-lg max-w-xl leading-relaxed">
          {t('outils_sub')}
        </p>
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        <hr className="rule mb-16" />

        {/* Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <div key={index} className="luxury-card p-8 group flex flex-col">
              {/* Badge */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span className="text-xs font-semibold text-green-600 tracking-widest uppercase">
                  {tool.badge}
                </span>
              </div>

              {/* Icon */}
              <div className="w-14 h-14 bg-royal-pale border border-royal/15 rounded-xl flex items-center justify-center text-royal mb-6 group-hover:bg-royal group-hover:text-white transition-all duration-300">
                {tool.icon}
              </div>

              <h2 className="font-display text-2xl font-semibold text-navy mb-3">
                {tool.titleNode ?? tool.title}
              </h2>

              <p className="text-slate text-sm leading-relaxed mb-3 flex-1">
                {tool.description}
              </p>

              <p className="text-slate/70 text-xs leading-relaxed mb-8">
                {tool.details}
              </p>

              <Link to={tool.link} className="btn-primary justify-center">
                {tool.linkText}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}

          {/* Coming soon placeholder */}
          <div className="luxury-card p-8 opacity-60 flex flex-col items-center justify-center text-center min-h-[320px] border-dashed">
            <div className="w-14 h-14 bg-[#DDE2EE] rounded-xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-slate/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <p className="text-slate text-sm italic">{t('more_tools_coming')}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
