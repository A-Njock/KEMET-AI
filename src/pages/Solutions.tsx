import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimateIn from '../components/AnimateIn';
import AIWorkflow from '../components/AIWorkflow';
import { useTranslation } from 'react-i18next';

interface Service {
  id: string;
  title: { en: string; fr: string };
  bullets: { en: string[]; fr: string[] };
  icon: ReactNode;
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
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>
      },
      {
        id: 'voice-ai',
        title: { en: 'Voice AI for Call Centers', fr: 'IA Vocale pour Centres d\'Appels' },
        bullets: {
          en: ['Automated call routing and initial customer qualification', 'Voice-based assistant for common inquiries'],
          fr: ['Routage automatique des appels et qualification initiale', 'Assistant vocal pour les demandes courantes']
        },
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>
      },
      {
        id: 'feedback-analysis',
        title: { en: 'Customer Feedback Analysis', fr: 'Analyse des Retours Clients' },
        bullets: {
          en: ['Sentiment analysis across reviews and social media', 'Actionable insights to improve customer experience'],
          fr: ['Analyse des sentiments sur les avis et réseaux sociaux', 'Recommandations concrètes pour améliorer l\'expérience']
        },
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
      },
      {
        id: 'personalization',
        title: { en: 'Smart Personalization', fr: 'Personnalisation Intelligente' },
        bullets: {
          en: ['Tailored product and content recommendations', 'Dynamic pricing and offer optimization'],
          fr: ['Recommandations personnalisées de produits et contenus', 'Optimisation dynamique des prix et offres']
        },
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>
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
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
      },
      {
        id: 'data-entry',
        title: { en: 'Data Entry & Spreadsheet Automation', fr: 'Saisie de Données & Automatisation Tableur' },
        bullets: {
          en: ['Eliminate manual data entry errors', 'Auto-sync data across your business systems'],
          fr: ['Éliminez les erreurs de saisie manuelle', 'Synchronisation automatique des données entre vos systèmes']
        },
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m0-3.75h1.5A1.125 1.125 0 006 5.625M3.375 7.5H2.25" /></svg>
      },
      {
        id: 'workflow-automation',
        title: { en: 'Workflow Automation', fr: 'Automatisation des Flux de Travail' },
        bullets: {
          en: ['Connect your tools and automate repetitive tasks', 'Smart approval workflows and notifications'],
          fr: ['Connectez vos outils et automatisez les tâches répétitives', 'Workflows d\'approbation intelligents et notifications']
        },
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
      },
      {
        id: 'inventory-management',
        title: { en: 'Smart Inventory Management', fr: 'Gestion Intelligente des Stocks' },
        bullets: {
          en: ['Demand forecasting to optimize stock levels', 'Automated reorder alerts and supplier coordination'],
          fr: ['Prévision de la demande pour optimiser les niveaux de stock', 'Alertes de réapprovisionnement automatiques']
        },
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
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
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
      },
      {
        id: 'business-intelligence',
        title: { en: 'AI Business Intelligence', fr: 'Intelligence d\'Affaires IA' },
        bullets: {
          en: ['Natural language queries on your business data', 'Automated report generation and insights'],
          fr: ['Requêtes en langage naturel sur vos données', 'Génération automatique de rapports et insights']
        },
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
      },
      {
        id: 'predictive-analytics',
        title: { en: 'Predictive Analytics', fr: 'Analytique Prédictive' },
        bullets: {
          en: ['Sales and revenue forecasting', 'Customer churn prediction and prevention'],
          fr: ['Prévision des ventes et revenus', 'Prédiction et prévention du churn client']
        },
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
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
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
      },
      {
        id: 'translation',
        title: { en: 'Smart Translation', fr: 'Traduction Intelligente' },
        bullets: {
          en: ['Context-aware translations for business documents', 'Multilingual support for global and local markets'],
          fr: ['Traductions contextuelles pour documents business', 'Support multilingue pour les marchés locaux et internationaux']
        },
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" /></svg>
      },
      {
        id: 'email-automation',
        title: { en: 'Email & Communication Automation', fr: 'Automatisation Emails & Communication' },
        bullets: {
          en: ['Personalized email campaigns at scale', 'Smart response suggestions and drafting'],
          fr: ['Campagnes email personnalisées à grande échelle', 'Suggestions de réponses et rédaction intelligente']
        },
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
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
                      <div className="w-9 h-9 rounded-lg bg-royal-pale border border-royal/15 flex items-center justify-center text-royal flex-shrink-0 mt-0.5">
                        {service.icon}
                      </div>
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
