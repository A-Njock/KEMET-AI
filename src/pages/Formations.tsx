import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { fetchTrainings } from '../lib/api';

interface Training {
  title: string;
  date: string;
  location: string;
  status: 'completed' | 'upcoming';
  signup?: string;
}

export default function Formations() {
  const { t } = useTranslation();
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrainings = async () => {
      try {
        const data = await fetchTrainings();
        setTrainings(data);
      } catch (error) {
        console.error('Error loading trainings:', error);
        // Fallback data if GitHub fetch fails
        setTrainings([
          {
            title: 'Formation IA: Introduction',
            date: '22 octobre 2025',
            location: 'Yaoundé',
            status: 'upcoming',
            signup: 'https://kemet.ai/inscription'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadTrainings();
  }, []);

  return (
    <div className="min-h-screen bg-black font-sans">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gold mb-8 text-center">
          {t('formations_title')}
        </h1>

        {loading ? (
          <div className="text-center text-gold">Chargement...</div>
        ) : (
          <div className="space-y-6">
            {trainings.map((training, index) => (
              <div
                key={index}
                className={`rounded-xl p-6 border-2 ${
                  training.status === 'completed'
                    ? 'bg-gray-800/50 border-gray-600 text-gray-400'
                    : 'bg-gold/10 border-gold text-white'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-heading font-bold mb-2">
                      {training.title}
                    </h3>
                    <p className="text-sm">
                      📅 {training.date} | 📍 {training.location}
                    </p>
                  </div>
                  {training.status === 'upcoming' && training.signup && (
                    <a
                      href={training.signup}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gold text-black font-bold px-6 py-2 rounded-lg hover:bg-gold/80 transition-colors duration-200 inline-block"
                    >
                      {t('inscrivez_vous')}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

