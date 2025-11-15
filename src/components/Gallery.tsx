export default function Gallery() {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&h=400&fit=crop&q=80',
      caption: 'Événement Douala 2024'
    },
    {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=400&fit=crop&q=80',
      caption: 'Premier Chatbot Lancé'
    },
    {
      src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&h=400&fit=crop&q=80',
      caption: 'Formation Yaoundé'
    },
    {
      src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&h=400&fit=crop&q=80',
      caption: 'Partenariat Entreprise'
    },
  ];

  return (
    <section className="mb-20">
      <h2 className="text-3xl font-heading font-bold text-white text-center mb-12">
        Nos Réalisations
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <div key={i} className="group relative rounded-2xl overflow-hidden cursor-pointer border border-gold/10 hover:border-gold/30 transition-all duration-300">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm font-medium">{img.caption}</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 backdrop-blur-sm group-hover:opacity-0 transition-opacity duration-300">
              <p className="text-white text-xs font-medium text-center">{img.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

