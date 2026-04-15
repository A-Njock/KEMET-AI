import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimateIn from '../components/AnimateIn';
import AIWorkflow from '../components/AIWorkflow';
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
        icon: '📋'
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
  const isFr = lang === 'fr';

  const [formData, setFormData] = useState({ name: '', company: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(isFr ? 'Merci pour votre message! Nous vous contacterons bientôt.' : 'Thank you for your message! We will contact you soon.');
    setFormData({ name: '', company: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-ivory font-sans">
      <Header />

      {/* Page header */}
      <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <motion.p
          className="text-royal text-xs font-semibold tracking-[0.25em] uppercase mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {isFr ? 'Ce que nous faisons' : 'What We Do'}
        </motion.p>
        <motion.h1
          className="font-display text-5xl md:text-6xl font-semibold text-navy mb-5 leading-tight"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('solutions_title')}
        </motion.h1>
        <motion.p
          className="text-slate text-lg max-w-2xl leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('solutions_text')}
        </motion.p>
        <motion.div
          className="inline-flex items-center gap-3 px-5 py-3 bg-royal-pale border border-royal/20 rounded-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg className="w-5 h-5 text-royal flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
          <p className="text-royal text-sm font-medium">
            {isFr
              ? 'Chaque entreprise est unique. Nous créons des solutions sur mesure adaptées à vos besoins spécifiques.'
              : 'Every business is unique. We build custom solutions tailored to your specific needs.'
            }
          </p>
        </motion.div>
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        {/* Workflow diagram */}
        <AIWorkflow lang={i18n.language.startsWith('fr') ? 'fr' : 'en'} />

        <hr className="rule my-20" />

        {/* Service categories */}
        <div className="space-y-20">
          {serviceCategories.map((category, catIdx) => (
            <AnimateIn key={category.id} delay={catIdx * 0.05}>
            <section key={category.id}>
              <div className="mb-8">
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy mb-2">
                  {category.name[lang]}
                </h2>
                <p className="text-slate">{category.description[lang]}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                {category.services.map((service) => (
                  <div
                    key={service.id}
                    className="luxury-card p-6"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-2xl mt-0.5">{service.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-navy mb-3">{service.title[lang]}</h3>
                        <ul className="space-y-1.5">
                          {service.bullets[lang].map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate text-sm">
                              <div className="w-1 h-1 bg-royal rounded-full mt-2 flex-shrink-0" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-slate text-sm italic">
                {isFr ? '…et bien plus encore' : '…and much more'}
              </p>
            </section>
            </AnimateIn>
          ))}
        </div>

        {/* CTA block */}
        <div className="mt-24 bg-navy rounded-2xl p-10 md:p-14 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
            {isFr ? 'Vous ne trouvez pas ce que vous cherchez?' : "Don't See What You're Looking For?"}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            {isFr
              ? 'Notre expertise est de comprendre vos défis uniques et de créer des solutions IA personnalisées qui résolvent vos problèmes spécifiques.'
              : 'Our expertise lies in understanding your unique challenges and building custom AI solutions that solve your specific problems.'
            }
          </p>
          <a href="#contact" className="btn-primary inline-flex">
            {isFr ? 'Parlons de votre projet' : 'Let\'s talk about your project'}
          </a>
        </div>

        {/* Contact form */}
        <div className="mt-20" id="contact">
          <p className="text-royal text-xs font-semibold tracking-[0.25em] uppercase mb-4">Contact</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy mb-10">
            {isFr ? 'Parlons de vos besoins' : "Let's Discuss Your Needs"}
          </h2>

          <div className="max-w-2xl bg-white rounded-2xl border border-[#DDE2EE] p-8 shadow-card">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-navy text-sm font-semibold mb-2">{t('contact_name')}</label>
                  <input
                    type="text" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-ivory border border-[#DDE2EE] rounded-lg text-navy placeholder-slate/50 focus:outline-none focus:border-royal transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-navy text-sm font-semibold mb-2">{t('contact_company')}</label>
                  <input
                    type="text" required value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-ivory border border-[#DDE2EE] rounded-lg text-navy placeholder-slate/50 focus:outline-none focus:border-royal transition-colors text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-navy text-sm font-semibold mb-2">{t('contact_email')}</label>
                <input
                  type="email" required value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-ivory border border-[#DDE2EE] rounded-lg text-navy placeholder-slate/50 focus:outline-none focus:border-royal transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-navy text-sm font-semibold mb-2">
                  {isFr ? 'Décrivez votre projet ou défi' : 'Describe your project or challenge'}
                </label>
                <textarea
                  required rows={5} value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={isFr ? 'Quel problème cherchez-vous à résoudre?' : 'What problem are you trying to solve?'}
                  className="w-full px-4 py-3 bg-ivory border border-[#DDE2EE] rounded-lg text-navy placeholder-slate/50 focus:outline-none focus:border-royal resize-none transition-colors text-sm"
                />
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                {isFr ? 'Demander une consultation gratuite' : 'Request Free Consultation'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
