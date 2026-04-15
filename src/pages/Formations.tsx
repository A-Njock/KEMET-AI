import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

interface Training {
  id: string;
  title: { en: string; fr: string };
  subtitle: { en: string; fr: string };
  date: string;
  location: string;
  keyPoints: { en: string[]; fr: string[] };
  fullContent: { en: string; fr: string };
  signupUrl: string;
  status: 'upcoming' | 'coming_soon';
}

const trainings: Training[] = [
  {
    id: 'ai-business-foundations',
    title: {
      en: 'Stop Guessing. Start Using AI to Actually Grow Your Business',
      fr: 'Arrêtez de deviner. Utilisez l\'IA pour vraiment développer votre entreprise'
    },
    subtitle: {
      en: 'The step-by-step training that takes you from "What\'s ChatGPT?" to confidently using AI to save 10+ hours every week. No tech skills required.',
      fr: 'La formation étape par étape qui vous fait passer de "C\'est quoi ChatGPT?" à une utilisation confiante de l\'IA pour économiser plus de 10 heures par semaine. Aucune compétence technique requise.'
    },
    date: '16 August 2026',
    location: 'Yaounde/Douala',
    status: 'upcoming',
    keyPoints: {
      en: [
        'Your first AI assistant set up and working for you',
        '10+ ready-to-use prompts that generate actual business results',
        'The confidence to experiment and discover new ways AI can help your business',
        'Hours back in your week to focus on what actually grows your revenue'
      ],
      fr: [
        'Votre premier assistant IA configuré et fonctionnel',
        'Plus de 10 prompts prêts à l\'emploi qui génèrent de vrais résultats',
        'La confiance pour expérimenter et découvrir comment l\'IA peut aider votre entreprise',
        'Des heures récupérées pour vous concentrer sur ce qui fait vraiment croître votre chiffre d\'affaires'
      ]
    },
    fullContent: {
      en: `You've heard everyone talking about AI. You've seen the headlines. Maybe you've even felt that nagging worry that you're falling behind.\n\nBut here's the truth: You don't need to be a tech person to use AI. You just need someone to show you how it actually works for your business.\n\nThis isn't about robots or coding. It's about having a tool that can write your emails, create your marketing content, plan your projects, and handle the tedious work you've been putting off for months. All in minutes instead of hours.\n\nIn this program, you'll go from complete beginner to confidently using AI in your daily business operations. No jargon. No overwhelming theory. Just practical, proven strategies that work for real businesses like yours.`,
      fr: `Vous avez entendu tout le monde parler de l'IA. Vous avez vu les gros titres. Peut-être avez-vous ressenti cette inquiétude persistante d'être en retard.\n\nMais voici la vérité: Vous n'avez pas besoin d'être un technicien pour utiliser l'IA. Vous avez juste besoin de quelqu'un pour vous montrer comment ça fonctionne vraiment pour votre entreprise.\n\nCe n'est pas une question de robots ou de programmation. C'est avoir un outil qui peut rédiger vos emails, créer votre contenu marketing, planifier vos projets, et gérer le travail fastidieux que vous repoussez depuis des mois. Le tout en quelques minutes au lieu de plusieurs heures.\n\nDans ce programme, vous passerez de débutant complet à une utilisation confiante de l'IA dans vos opérations commerciales quotidiennes. Pas de jargon. Pas de théorie accablante. Juste des stratégies pratiques et éprouvées.`
    },
    signupUrl: 'https://kemet.ai/inscription'
  },
  {
    id: 'ai-automations',
    title: {
      en: 'Build Your First 5 AI Automations This Week. No Technical Skills Required',
      fr: 'Créez vos 5 premières automatisations IA cette semaine. Aucune compétence technique requise'
    },
    subtitle: {
      en: 'The hands-on training where you\'ll actually create working automations that save you 10+ hours every week, starting now.',
      fr: 'La formation pratique où vous créerez réellement des automatisations fonctionnelles qui vous font économiser plus de 10 heures par semaine.'
    },
    date: 'Coming soon',
    location: 'Yaounde/Douala',
    status: 'coming_soon',
    keyPoints: {
      en: [
        'Auto-responders that handle common customer questions intelligently',
        'Content pipelines that generate and schedule your marketing on autopilot',
        'Data processors that extract insights from your numbers',
        'Lead nurture sequences that personalize themselves based on behavior',
        'Report generators that compile your weekly updates automatically'
      ],
      fr: [
        'Des répondeurs automatiques qui gèrent intelligemment les questions courantes des clients',
        'Des pipelines de contenu qui génèrent et planifient votre marketing en autopilote',
        'Des processeurs de données qui extraient des insights de vos chiffres',
        'Des séquences de nurturing qui se personnalisent selon le comportement',
        'Des générateurs de rapports qui compilent automatiquement vos mises à jour hebdomadaires'
      ]
    },
    fullContent: {
      en: `Understanding AI is one thing. Making it do your work automatically? That's the real game-changer.\n\nThis isn't theory. You'll walk in as a beginner and walk out with 5 functioning automations handling real tasks in your business.\n\nBy the end of this training, you won't just understand automation. You'll have built it. And it will be working for your business.`,
      fr: `Comprendre l'IA, c'est une chose. La faire travailler automatiquement pour vous? C'est ça le vrai changement de jeu.\n\nCe n'est pas de la théorie. Vous entrerez en tant que débutant et sortirez avec 5 automatisations fonctionnelles gérant de vraies tâches dans votre entreprise.\n\nÀ la fin de cette formation, vous ne comprendrez pas seulement l'automatisation. Vous l'aurez construite. Et elle fonctionnera pour votre entreprise.`
    },
    signupUrl: 'https://kemet.ai/inscription'
  }
];

export default function Formations() {
  const { t, i18n } = useTranslation();
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const lang = i18n.language.startsWith('fr') ? 'fr' : 'en';
  const isFr = lang === 'fr';

  return (
    <div className="min-h-screen bg-ivory font-sans">
      <Header />

      {/* Page header */}
      <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        <p className="text-royal text-xs font-semibold tracking-[0.25em] uppercase mb-4">
          {isFr ? 'Apprendre avec GANP' : 'Learn with GANP'}
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-semibold text-navy mb-4 leading-tight">
          {t('formations_title')}
        </h1>
        <p className="text-slate text-lg max-w-xl leading-relaxed">
          {isFr
            ? 'Transformez votre entreprise avec des formations IA pratiques conçues pour des résultats concrets.'
            : 'Transform your business with hands-on AI training designed for real results.'
          }
        </p>
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        <hr className="rule mb-16" />

        <div className="space-y-8">
          {trainings.map((training) => (
            <div
              key={training.id}
              className={`luxury-card p-8 md:p-10 ${training.status === 'upcoming' ? 'border-royal/30' : ''}`}
            >
              {/* Status badge */}
              <div className="flex items-center gap-3 mb-6">
                {training.status === 'upcoming' ? (
                  <span className="inline-flex items-center gap-1.5 bg-royal-pale text-royal text-xs font-semibold px-3 py-1.5 rounded-full border border-royal/20">
                    <div className="w-1.5 h-1.5 bg-royal rounded-full animate-pulse" />
                    {isFr ? 'Événement à venir' : 'Upcoming Event'}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-[#DDE2EE] text-slate text-xs font-semibold px-3 py-1.5 rounded-full">
                    {isFr ? 'Bientôt disponible' : 'Coming Soon'}
                  </span>
                )}
              </div>

              <h2 className="font-display text-2xl md:text-3xl font-semibold text-navy mb-3 leading-tight">
                {training.title[lang]}
              </h2>

              <p className="text-slate text-base leading-relaxed mb-6 max-w-3xl">
                {training.subtitle[lang]}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap gap-5 mb-8 text-sm">
                <div className="flex items-center gap-2 text-royal">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  <span className="font-medium">
                    {training.date === 'Coming soon' && isFr ? 'Bientôt' : training.date}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>{training.location}</span>
                </div>
              </div>

              {/* Key points */}
              <div className="mb-8">
                <p className="text-royal text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                  {isFr ? 'Ce que vous apprendrez' : "What You'll Learn"}
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {training.keyPoints[lang].slice(0, 4).map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate text-sm">
                      <svg className="w-4 h-4 text-royal flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedTraining(training)}
                  className="btn-secondary"
                >
                  {isFr ? 'En savoir plus' : 'Learn More'}
                </button>
                {training.status === 'upcoming' && (
                  <a href={training.signupUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    {isFr ? 'S\'inscrire' : 'Sign Up'}
                  </a>
                )}
                {training.status === 'coming_soon' && (
                  <span className="inline-flex items-center px-5 py-2.5 bg-[#DDE2EE] text-slate/50 text-sm font-semibold rounded-lg cursor-not-allowed">
                    {isFr ? 'Inscription bientôt' : 'Sign Up Soon'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      {/* Modal */}
      {selectedTraining && (
        <div
          className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTraining(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#DDE2EE]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-[#DDE2EE] px-8 py-6 flex justify-between items-start">
              <div>
                <h2 className="font-display text-2xl font-semibold text-navy mb-1">
                  {selectedTraining.title[lang]}
                </h2>
                <div className="flex gap-4 text-sm text-slate">
                  <span>{selectedTraining.date === 'Coming soon' && isFr ? 'Bientôt' : selectedTraining.date}</span>
                  <span>·</span>
                  <span>{selectedTraining.location}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedTraining(null)}
                className="p-2 text-slate hover:text-navy hover:bg-ivory rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-8 py-6">
              <p className="font-display text-xl text-royal/80 italic mb-6">
                {selectedTraining.subtitle[lang]}
              </p>
              <div className="space-y-4">
                {selectedTraining.fullContent[lang].split('\n\n').map((para, idx) => (
                  <p key={idx} className="text-slate leading-relaxed">{para}</p>
                ))}
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-[#DDE2EE] px-8 py-5 flex gap-3">
              <button
                onClick={() => setSelectedTraining(null)}
                className="btn-secondary flex-1 justify-center"
              >
                {isFr ? 'Fermer' : 'Close'}
              </button>
              {selectedTraining.status === 'upcoming' && (
                <a
                  href={selectedTraining.signupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 justify-center"
                >
                  {isFr ? 'S\'inscrire maintenant' : 'Sign Up Now'}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
