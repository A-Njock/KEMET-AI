import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Gallery() {
  const { t } = useTranslation();
  const captions = t('gallery_captions', { returnObjects: true }) as string[];
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=450&fit=crop&q=80',
      caption: captions?.[0] ?? ''
    },
    {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=450&fit=crop&q=80',
      caption: captions?.[1] ?? ''
    },
    {
      src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=450&fit=crop&q=80',
      caption: captions?.[2] ?? ''
    },
    {
      src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=450&fit=crop&q=80',
      caption: captions?.[3] ?? ''
    },
  ];

  return (
    <section>
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy mb-10">
        {t('gallery_title')}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="group relative rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#EEF2FF]">
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-xs font-medium leading-snug">{img.caption}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
