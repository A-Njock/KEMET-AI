import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

interface Training {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  keyPoints: string[];
  fullContent: string;
  signupUrl: string;
  status: 'upcoming' | 'coming_soon';
}

const trainings: Training[] = [
  {
    id: 'ai-business-foundations',
    title: 'Stop Guessing. Start Using AI to Actually Grow Your Business.',
    subtitle: 'The step-by-step training that takes you from "What\'s ChatGPT?" to confidently using AI to save 10+ hours every week. No tech skills required.',
    date: '16 August 2026',
    location: 'Yaounde/Douala',
    status: 'upcoming',
    keyPoints: [
      'Your first AI assistant set up and working for you',
      '10+ ready-to-use prompts that generate actual business results',
      'The confidence to experiment and discover new ways AI can help your business',
      'Hours back in your week to focus on what actually grows your revenue'
    ],
    fullContent: `You've heard everyone talking about AI. You've seen the headlines. Maybe you've even felt that nagging worry that you're falling behind.

But here's the truth: You don't need to be a tech person to use AI. You just need someone to show you how it actually works for your business.

This isn't about robots or coding. It's about having a tool that can write your emails, create your marketing content, plan your projects, and handle the tedious work you've been putting off for months. All in minutes instead of hours.

In this program, you'll go from complete beginner to confidently using AI in your daily business operations. No jargon. No overwhelming theory. Just practical, proven strategies that work for real businesses like yours.

What you'll walk away with:

• Your first AI assistant set up and working for you (we'll do it together, step by step)
• 10+ ready-to-use prompts that generate actual business results
• The confidence to experiment and discover new ways AI can help your specific business
• Hours back in your week to focus on what actually grows your revenue

Stop watching from the sidelines while your competitors get ahead. Your business deserves every advantage, and AI is the most powerful one available to you right now.`,
    signupUrl: 'https://kemet.ai/inscription'
  },
  {
    id: 'ai-automations',
    title: 'Build Your First 5 AI Automations This Week. No Technical Skills Required.',
    subtitle: 'The hands-on training where you\'ll actually create working automations that save you 10+ hours every week, starting now.',
    date: 'Coming soon',
    location: 'Yaounde/Douala',
    status: 'coming_soon',
    keyPoints: [
      'Auto-responders that handle common customer questions intelligently',
      'Content pipelines that generate and schedule your marketing on autopilot',
      'Data processors that extract insights from your numbers',
      'Lead nurture sequences that personalize themselves based on behavior',
      'Report generators that compile your weekly updates automatically'
    ],
    fullContent: `Understanding AI is one thing. Making it do your work automatically? That's the real game-changer.

This isn't theory. You'll walk in as a beginner and walk out with 5 functioning automations handling real tasks in your business.

We're building together:

• Auto-responders that handle common customer questions intelligently, not robotically
• Content pipelines that generate, review, and schedule your marketing on autopilot
• Data processors that extract insights from your numbers without spreadsheet headaches
• Lead nurture sequences that personalize themselves based on prospect behavior
• Report generators that compile your weekly updates while you focus on strategy

By the end of this training, you won't just understand automation. You'll have built it. And it will be working for your business.`,
    signupUrl: 'https://kemet.ai/inscription'
  }
];

export default function Formations() {
  const { t } = useTranslation();
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);

  const closeModal = () => setSelectedTraining(null);

  return (
    <div className="min-h-screen bg-[#0f0f14] font-sans">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gold mb-4">
            {t('formations_title')}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Transform your business with hands-on AI training designed for real results
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
                    Upcoming Event
                  </span>
                ) : (
                  <span className="bg-white/10 text-white/60 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    Coming Soon
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3 leading-tight">
                {training.title}
              </h2>

              {/* Subtitle */}
              <p className="text-white/70 text-lg mb-6 leading-relaxed">
                {training.subtitle}
              </p>

              {/* Date & Location */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2 text-gold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">{training.date}</span>
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
                <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-3">What You'll Learn</h4>
                <ul className="space-y-2">
                  {training.keyPoints.slice(0, 4).map((point, idx) => (
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
                  Learn More
                </button>
                {training.status === 'upcoming' && (
                  <a
                    href={training.signupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold/90 transition-all duration-200"
                  >
                    Sign Up
                  </a>
                )}
                {training.status === 'coming_soon' && (
                  <span className="px-6 py-3 bg-white/10 text-white/50 font-semibold rounded-lg cursor-not-allowed">
                    Sign Up (Coming Soon)
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
            className="bg-[#1a1a22] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#1a1a22] border-b border-white/10 p-6 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-heading font-bold text-white mb-2">
                  {selectedTraining.title}
                </h2>
                <div className="flex gap-4 text-sm">
                  <span className="text-gold">{selectedTraining.date}</span>
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
                {selectedTraining.subtitle}
              </p>
              <div className="prose prose-invert max-w-none">
                {selectedTraining.fullContent.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-white/80 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-[#1a1a22] border-t border-white/10 p-6 flex gap-4">
              <button
                onClick={closeModal}
                className="flex-1 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                Close
              </button>
              {selectedTraining.status === 'upcoming' && (
                <a
                  href={selectedTraining.signupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold/90 transition-all duration-200 text-center"
                >
                  Sign Up Now
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
