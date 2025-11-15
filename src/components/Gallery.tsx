export default function Gallery() {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop&q=80',
      caption: 'Événement Douala 2024'
    },
    {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&q=80',
      caption: 'Premier Chatbot Lancé'
    },
    {
      src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop&q=80',
      caption: 'Formation Yaoundé'
    },
    {
      src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=300&fit=crop&q=80',
      caption: 'Partenariat Entreprise'
    },
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 px-2">
      {images.map((img, i) => (
        <div key={i} className="rounded-xl overflow-hidden group cursor-pointer">
          <div className="relative overflow-hidden">
            <img
              src={img.src}
              alt={img.caption}
              loading="lazy"
              className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="text-center text-white bg-black/70 py-2 text-sm font-medium">
            {img.caption}
          </div>
        </div>
      ))}
    </section>
  );
}

