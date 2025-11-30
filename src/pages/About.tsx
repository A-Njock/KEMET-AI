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
      <main className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gold mb-6">
            {t('about_title')}
          </h1>
        </div>

        {/* Content */}
        <div className="bg-white/5 rounded-2xl p-8 md:p-12 border border-gold/20">
          <div 
            className="text-gray-300 leading-relaxed text-lg md:text-xl space-y-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {paragraphs.map((paragraph, index) => {
              // Check if this is the signature paragraph (contains "Pierre Guy Njock" or "CEO")
              const isSignature = paragraph.includes('Pierre Guy Njock') || paragraph.includes('CEO');
              
              if (isSignature) {
                // Split signature into lines
                const signatureLines = paragraph.split('\n').filter(l => l.trim());
                return (
                  <div key={index} className="mt-8 pt-8 border-t border-gold/20">
                    {signatureLines.map((line, lineIndex) => (
                      <p 
                        key={lineIndex}
                        className={lineIndex === signatureLines.length - 1 ? 'text-gold font-semibold' : 'text-gray-400'}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                );
              }
              
              return (
                <p key={index} className="text-justify">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

