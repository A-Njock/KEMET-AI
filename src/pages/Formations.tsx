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
      en: `You've heard everyone talking about AI. You've seen the headlines. Maybe you've even felt that nagging worry that you're falling behind.

But here's the truth: You don't need to be a tech person to use AI. You just need someone to show you how it actually works for your business.

This isn't about robots or coding. It's about having a tool that can write your emails, create your marketing content, plan your projects, and handle the tedious work you've been putting off for months. All in minutes instead of hours.

In this program, you'll go from complete beginner to confidently using AI in your daily business operations. No jargon. No overwhelming theory. Just practical, proven strategies that work for real businesses like yours.

What you'll walk away with:

• Your first AI assistant set up and working for you (we'll do it together, step by step)
• 10+ ready-to-use prompts that generate actual business results
• The confidence to experiment and discover new ways AI can help your specific business
• Hours back in your week to focus on what actually grows your revenue

Stop watching from the sidelines while your competitors get ahead. Your business deserves every advantage, and AI is the most powerful one available to you right now.`,
      fr: `Vous avez entendu tout le monde parler de l'IA. Vous avez vu les gros titres. Peut-être même avez-vous ressenti cette inquiétude persistante d'être en retard.

Mais voici la vérité: Vous n'avez pas besoin d'être un technicien pour utiliser l'IA. Vous avez juste besoin de quelqu'un pour vous montrer comment ça fonctionne vraiment pour votre entreprise.

Ce n'est pas une question de robots ou de programmation. C'est avoir un outil qui peut rédiger vos emails, créer votre contenu marketing, planifier vos projets, et gérer le travail fastidieux que vous repoussez depuis des mois. Le tout en quelques minutes au lieu de plusieurs heures.

Dans ce programme, vous passerez de débutant complet à une utilisation confiante de l'IA dans vos opérations commerciales quotidiennes. Pas de jargon. Pas de théorie accablante. Juste des stratégies pratiques et éprouvées qui fonctionnent pour de vraies entreprises comme la vôtre.

Ce que vous obtiendrez:

• Votre premier assistant IA configuré et fonctionnel (nous le ferons ensemble, étape par étape)
• Plus de 10 prompts prêts à l'emploi qui génèrent de vrais résultats commerciaux
• La confiance pour expérimenter et découvrir de nouvelles façons dont l'IA peut aider votre entreprise spécifique
• Des heures récupérées dans votre semaine pour vous concentrer sur ce qui fait vraiment croître votre chiffre d'affaires

Arrêtez de regarder depuis les coulisses pendant que vos concurrents prennent de l'avance. Votre entreprise mérite tous les avantages, et l'IA est le plus puissant disponible pour vous en ce moment.`
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
      en: `Understanding AI is one thing. Making it do your work automatically? That's the real game-changer.

This isn't theory. You'll walk in as a beginner and walk out with 5 functioning automations handling real tasks in your business.

We're building together:

• Auto-responders that handle common customer questions intelligently, not robotically
• Content pipelines that generate, review, and schedule your marketing on autopilot
• Data processors that extract insights from your numbers without spreadsheet headaches
• Lead nurture sequences that personalize themselves based on prospect behavior
• Report generators that compile your weekly updates while you focus on strategy

By the end of this training, you won't just understand automation. You'll have built it. And it will be working for your business.`,
      fr: `Comprendre l'IA, c'est une chose. La faire travailler automatiquement pour vous? C'est ça le vrai changement de jeu.

Ce n'est pas de la théorie. Vous entrerez en tant que débutant et sortirez avec 5 automatisations fonctionnelles gérant de vraies tâches dans votre entreprise.

Nous construisons ensemble:

• Des répondeurs automatiques qui gèrent intelligemment les questions courantes des clients, pas de façon robotique
• Des pipelines de contenu qui génèrent, vérifient et planifient votre marketing en autopilote
• Des processeurs de données qui extraient des insights de vos chiffres sans maux de tête de tableur
• Des séquences de nurturing de leads qui se personnalisent selon le comportement des prospects
• Des générateurs de rapports qui compilent vos mises à jour hebdomadaires pendant que vous vous concentrez sur la stratégie

À la fin de cette formation, vous ne comprendrez pas seulement l'automatisation. Vous l'aurez construite. Et elle fonctionnera pour votre entreprise.`
    },
    signupUrl: 'https://kemet.ai/inscription'
  }
];

export default function Formations() {
  const { t, i18n } = useTranslation();
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);

  const lang = i18n.language.startsWith('fr') ? 'fr' : 'en';

  const closeModal = () => setSelectedTraining(null);

  return (
    <div className="min-h-screen bg-[#151520] font-sans">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4">
            {t('formations_title')}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {lang === 'fr'
              ? 'Transformez votre entreprise avec des formations IA pratiques conçues pour des résultats concrets'
              : 'Transform your business with hands-on AI training designed for real results'
            }
          </p>
        </div>

        {/* Training Cards */}
        <div className="space-y-8">
          {trainings.map((training) => (
            <div
              key={training.id}
              className={`rounded-2xl p-8 border backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] ${training.status === 'upcoming'
                  ? 'bg-gradient-to-br from-gold/10 to-transparent border-gold/40 hover:border-gold'
                  : 'bg-white/5 border-white/20 hover:border-white/40'
                }`}
            >
              {/* Status Badge */}
              <div className="flex items-center gap-3 mb-4">
                {training.status === 'upcoming' ? (
                  <span className="bg-gold/20 text-gold text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    {lang === 'fr' ? 'Événement à venir' : 'Upcoming Event'}
                  </span>
                ) : (
                  <span className="bg-white/10 text-white/60 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    {lang === 'fr' ? 'Bientôt disponible' : 'Coming Soon'}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                {training.title[lang]}
              </h2>

              {/* Subtitle */}
              <p className="text-white/70 text-lg mb-6 leading-relaxed">
                {training.subtitle[lang]}
              </p>

              {/* Date & Location */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2 text-gold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">
                    {training.date === 'Coming soon' && lang === 'fr' ? 'Bientôt' : training.date}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{training.location}</span>
                </div>
              </div>

              {/* Key Points */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-3">
                  {lang === 'fr' ? 'Ce que vous apprendrez' : 'What You\'ll Learn'}
                </h4>
                <ul className="space-y-2">
                  {training.keyPoints[lang].slice(0, 4).map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-white/80">
                      <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setSelectedTraining(training)}
                  className="px-6 py-3 border-2 border-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-black transition-all duration-200"
                >
                  {lang === 'fr' ? 'En savoir plus' : 'Learn More'}
                </button>
                {training.status === 'upcoming' && (
                  <a
                    href={training.signupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold/90 transition-all duration-200"
                  >
                    {lang === 'fr' ? 'S\'inscrire' : 'Sign Up'}
                  </a>
                )}
                {training.status === 'coming_soon' && (
                  <span className="px-6 py-3 bg-white/10 text-white/50 font-semibold rounded-lg cursor-not-allowed">
                    {lang === 'fr' ? 'Inscription (Bientôt)' : 'Sign Up (Coming Soon)'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      {/* Modal for Full Content */}
      {selectedTraining && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-[#1a1a25] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#1a1a25] border-b border-white/10 p-6 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedTraining.title[lang]}
                </h2>
                <div className="flex gap-4 text-sm">
                  <span className="text-gold">
                    {selectedTraining.date === 'Coming soon' && lang === 'fr' ? 'Bientôt' : selectedTraining.date}
                  </span>
                  <span className="text-white/60">{selectedTraining.location}</span>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-lg text-gold/80 mb-6 italic">
                {selectedTraining.subtitle[lang]}
              </p>
              <div className="prose prose-invert max-w-none">
                {selectedTraining.fullContent[lang].split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-white/80 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-[#1a1a25] border-t border-white/10 p-6 flex gap-4">
              <button
                onClick={closeModal}
                className="flex-1 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                {lang === 'fr' ? 'Fermer' : 'Close'}
              </button>
              {selectedTraining.status === 'upcoming' && (
                <a
                  href={selectedTraining.signupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold/90 transition-all duration-200 text-center"
                >
                  {lang === 'fr' ? 'S\'inscrire maintenant' : 'Sign Up Now'}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
