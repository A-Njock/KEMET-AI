import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  // Split content by double newlines to create paragraphs
  const content = t('about_content');
  const paragraphs = content.split('\n\n').filter(p => p.trim());

  return (
    <div className="min-h-screen bg-black font-sans">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-16 md:py-24">
        {/* Content */}
        <div className="space-y-8">
          <div 
            className="text-gray-300 leading-relaxed text-base md:text-lg space-y-6 italic"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-justify">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Signature */}
          <div className="mt-12 pt-8 border-t border-gold/20 text-right">
            <p className="text-white font-medium mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
              {t('about_signature_name')}
            </p>
            <p className="text-gold text-sm">
              {t('about_signature_title')}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
