import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

interface Service {
  id: string;
  title: { en: string; fr: string };
  bullets: { en: string[]; fr: string[] };
  icon: string;
}

interface ServiceCategory {
  id: string;
  name: { en: string; fr: string };
  description: { en: string; fr: string };
  services: Service[];
}

const serviceCategories: ServiceCategory[] = [
  {
    id: 'customer-engagement',
    name: { en: 'Customer Engagement', fr: 'Engagement Client' },
    description: {
      en: 'AI solutions that transform how you connect with and serve your customers',
      fr: 'Des solutions IA qui transforment la façon dont vous interagissez avec vos clients'
    },
    services: [
      {
        id: 'chatbots',
        title: { en: 'Custom AI Chatbots', fr: 'Chatbots IA Personnalisés' },
        bullets: {
          en: ['24/7 intelligent customer support in local languages', 'Seamless handoff to human agents when needed'],
          fr: ['Support client intelligent 24/7 dans les langues locales', 'Transfert fluide vers des agents humains si nécessaire']
        },
        icon: '💬'
      },
      {
        id: 'voice-ai',
        title: { en: 'Voice AI for Call Centers', fr: 'IA Vocale pour Centres d\'Appels' },
        bullets: {
          en: ['Automated call routing and initial customer qualification', 'Voice-based assistant for common inquiries'],
          fr: ['Routage automatique des appels et qualification initiale', 'Assistant vocal pour les demandes courantes']
        },
        icon: '📞'
      },
      {
        id: 'feedback-analysis',
        title: { en: 'Customer Feedback Analysis', fr: 'Analyse des Retours Clients' },
        bullets: {
          en: ['Sentiment analysis across reviews and social media', 'Actionable insights to improve customer experience'],
          fr: ['Analyse des sentiments sur les avis et réseaux sociaux', 'Recommandations concrètes pour améliorer l\'expérience']
        },
        icon: '📊'
      },
      {
        id: 'personalization',
        title: { en: 'Smart Personalization', fr: 'Personnalisation Intelligente' },
        bullets: {
          en: ['Tailored product and content recommendations', 'Dynamic pricing and offer optimization'],
          fr: ['Recommandations personnalisées de produits et contenus', 'Optimisation dynamique des prix et offres']
        },
        icon: '🎯'
      }
    ]
  },
  {
    id: 'operations-automation',
    name: { en: 'Operations & Automation', fr: 'Opérations & Automatisation' },
    description: {
      en: 'Streamline your business processes and eliminate repetitive manual work',
      fr: 'Optimisez vos processus métier et éliminez le travail manuel répétitif'
    },
    services: [
      {
        id: 'document-processing',
        title: { en: 'Document Processing & Automation', fr: 'Traitement de Documents & Automatisation' },
        bullets: {
          en: ['Automatic extraction of data from invoices, contracts, and forms', 'Smart document classification and archiving'],
          fr: ['Extraction automatique des données des factures, contrats et formulaires', 'Classification et archivage intelligent des documents']
        },
        icon: '📄'
      },
      {
        id: 'data-entry',
        title: { en: 'Data Entry & Spreadsheet Automation', fr: 'Saisie de Données & Automatisation Tableur' },
        bullets: {
          en: ['Eliminate manual data entry errors', 'Auto-sync data across your business systems'],
          fr: ['Éliminez les erreurs de saisie manuelle', 'Synchronisation automatique des données entre vos systèmes']
        },
        icon: '📊'
      },
      {
        id: 'workflow-automation',
        title: { en: 'Workflow Automation', fr: 'Automatisation des Flux de Travail' },
        bullets: {
          en: ['Connect your tools and automate repetitive tasks', 'Smart approval workflows and notifications'],
          fr: ['Connectez vos outils et automatisez les tâches répétitives', 'Workflows d\'approbation intelligents et notifications']
        },
        icon: '⚙️'
      },
      {
        id: 'inventory-management',
        title: { en: 'Smart Inventory Management', fr: 'Gestion Intelligente des Stocks' },
        bullets: {
          en: ['Demand forecasting to optimize stock levels', 'Automated reorder alerts and supplier coordination'],
          fr: ['Prévision de la demande pour optimiser les niveaux de stock', 'Alertes de réapprovisionnement automatiques']
        },
        icon: '📦'
      }
    ]
  },
  {
    id: 'analytics-insights',
    name: { en: 'Analytics & Insights', fr: 'Analytique & Insights' },
    description: {
      en: 'Turn your data into actionable business intelligence',
      fr: 'Transformez vos données en intelligence décisionnelle'
    },
    services: [
      {
        id: 'fraud-detection',
        title: { en: 'Simple Fraud Detection', fr: 'Détection de Fraude Simple' },
        bullets: {
          en: ['Real-time transaction anomaly detection', 'Risk scoring for suspicious activities'],
          fr: ['Détection d\'anomalies transactionnelles en temps réel', 'Scoring de risque pour activités suspectes']
        },
        icon: '🛡️'
      },
      {
        id: 'business-intelligence',
        title: { en: 'AI Business Intelligence', fr: 'Intelligence d\'Affaires IA' },
        bullets: {
          en: ['Natural language queries on your business data', 'Automated report generation and insights'],
          fr: ['Requêtes en langage naturel sur vos données', 'Génération automatique de rapports et insights']
        },
        icon: '📈'
      },
      {
        id: 'predictive-analytics',
        title: { en: 'Predictive Analytics', fr: 'Analytique Prédictive' },
        bullets: {
          en: ['Sales and revenue forecasting', 'Customer churn prediction and prevention'],
          fr: ['Prévision des ventes et revenus', 'Prédiction et prévention du churn client']
        },
        icon: '🔮'
      }
    ]
  },
  {
    id: 'content-creation',
    name: { en: 'Content & Communication', fr: 'Contenu & Communication' },
    description: {
      en: 'AI-powered content creation and communication tools',
      fr: 'Outils de création de contenu et communication alimentés par l\'IA'
    },
    services: [
      {
        id: 'content-generation',
        title: { en: 'Content Generation Services', fr: 'Services de Génération de Contenu' },
        bullets: {
          en: ['Blog posts, social media content, and marketing copy', 'Multilingual content adapted to local contexts'],
          fr: ['Articles de blog, contenu réseaux sociaux et textes marketing', 'Contenu multilingue adapté aux contextes locaux']
        },
        icon: '✍️'
      },
      {
        id: 'translation',
        title: { en: 'Smart Translation', fr: 'Traduction Intelligente' },
        bullets: {
          en: ['Context-aware translations for business documents', 'Multilingual support for global and local markets'],
          fr: ['Traductions contextuelles pour documents business', 'Support multilingue pour les marchés locaux et internationaux']
        },
        icon: '🌍'
      },
      {
        id: 'email-automation',
        title: { en: 'Email & Communication Automation', fr: 'Automatisation Emails & Communication' },
        bullets: {
          en: ['Personalized email campaigns at scale', 'Smart response suggestions and drafting'],
          fr: ['Campagnes email personnalisées à grande échelle', 'Suggestions de réponses et rédaction intelligente']
        },
        icon: '📧'
      }
    ]
  }
];

export default function Solutions() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith('fr') ? 'fr' : 'en';

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(lang === 'fr' ? 'Merci pour votre message! Nous vous contacterons bientôt.' : 'Thank you for your message! We will contact you soon.');
    setFormData({ name: '', company: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#151520] font-sans">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4">
            {t('solutions_title')}
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto mb-6">
            {t('solutions_text')}
          </p>

          {/* Custom Solutions Emphasis */}
          <div className="inline-block bg-gold/10 border border-gold/30 rounded-xl px-6 py-4 mt-4">
            <p className="text-gold font-medium">
              {lang === 'fr'
                ? '✨ Chaque entreprise est unique. Nous créons des solutions sur mesure adaptées à vos besoins spécifiques.'
                : '✨ Every business is unique. We build custom solutions tailored to your specific needs.'
              }
            </p>
          </div>
        </div>

        {/* Service Categories */}
        <div className="space-y-16">
          {serviceCategories.map((category) => (
            <section key={category.id} className="scroll-mt-20">
              {/* Category Header */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {category.name[lang]}
                </h2>
                <p className="text-white/60">
                  {category.description[lang]}
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {category.services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-gold/40 transition-all duration-300 hover:bg-white/[0.08]"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{service.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-3">
                          {service.title[lang]}
                        </h3>
                        <ul className="space-y-2">
                          {service.bullets[lang].map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-white/70 text-sm">
                              <span className="text-gold mt-1">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* "And much more" tag */}
              <p className="text-gold/80 text-sm italic">
                {lang === 'fr' ? '...et bien plus encore' : '...and much more'}
              </p>
            </section>
          ))}
        </div>

        {/* Custom Solutions CTA */}
        <div className="mt-20 bg-gradient-to-br from-gold/10 to-transparent rounded-2xl p-8 md:p-12 border border-gold/30 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {lang === 'fr'
              ? 'Vous ne trouvez pas ce que vous cherchez?'
              : 'Don\'t See What You\'re Looking For?'
            }
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            {lang === 'fr'
              ? 'Ces solutions ne sont que quelques exemples de ce que nous pouvons faire. Notre expertise est de comprendre vos défis uniques et de créer des solutions IA personnalisées qui résolvent vos problèmes spécifiques.'
              : 'These solutions are just a glimpse of what we can do. Our expertise lies in understanding your unique challenges and building custom AI solutions that solve your specific problems.'
            }
          </p>
        </div>

        {/* Contact Form */}
        <div className="mt-16" id="contact">
          <h2 className="text-2xl md:text-3xl font-bold text-gold text-center mb-8">
            {lang === 'fr' ? 'Parlons de vos besoins' : 'Let\'s Discuss Your Needs'}
          </h2>

          <div className="max-w-2xl mx-auto bg-white/5 rounded-xl p-8 border border-gold/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gold mb-2 font-medium">
                    {t('contact_name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gold mb-2 font-medium">
                    {t('contact_company')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gold mb-2 font-medium">
                  {t('contact_email')}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="block text-gold mb-2 font-medium">
                  {lang === 'fr' ? 'Décrivez votre projet ou défi' : 'Describe your project or challenge'}
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={lang === 'fr'
                    ? 'Quel problème cherchez-vous à résoudre? Quels sont vos objectifs?'
                    : 'What problem are you trying to solve? What are your goals?'
                  }
                  className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold resize-none transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gold text-black font-bold py-4 rounded-lg hover:bg-gold/90 transition-all duration-200 text-lg"
              >
                {lang === 'fr' ? 'Demander une consultation gratuite' : 'Request Free Consultation'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
