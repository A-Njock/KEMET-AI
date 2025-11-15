import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

export default function Solutions() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to /api/contact
    console.log('Form submitted:', formData);
    alert('Merci pour votre message! Nous vous contacterons bientôt.');
    setFormData({ name: '', company: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-black font-sans">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gold mb-6 text-center">
          {t('solutions_title')}
        </h1>
        <p className="text-lg text-gray-300 mb-8 text-center">
          {t('solutions_text')}
        </p>

        <div className="bg-white/5 rounded-xl p-8 border border-gold/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gold mb-2 font-medium">
                {t('contact_name')}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold"
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
                className="w-full px-4 py-2 bg-black border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold"
              />
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
                className="w-full px-4 py-2 bg-black border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-gold mb-2 font-medium">
                {t('contact_message')}
              </label>
              <textarea
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 bg-black border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gold text-black font-bold py-3 rounded-lg hover:bg-gold/80 transition-colors duration-200"
            >
              {t('contact_submit')}
            </button>
          </form>
        </div>

        <div className="mt-12 bg-gold/10 rounded-xl p-6 border border-gold/20">
          <p className="text-gold italic text-lg text-center">
            "{t('testimonial')}"
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

