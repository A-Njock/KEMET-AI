import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ConnectionsCounter() {
  const [count, setCount] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    // Track connection on mount
    const increment = async () => {
      try {
        // In a real implementation, this would call an API endpoint
        // For now, we'll use localStorage to simulate connection tracking
        const stored = localStorage.getItem('kemet_connections');
        const currentCount = stored ? parseInt(stored, 10) : 0;
        const newCount = currentCount + 1;
        localStorage.setItem('kemet_connections', newCount.toString());
        setCount(newCount);
      } catch (error) {
        console.error('Error tracking connection:', error);
      }
    };

    increment();

    // Simulate real-time updates with slight variations
    const interval = setInterval(() => {
      const stored = localStorage.getItem('kemet_connections');
      if (stored) {
        const baseCount = parseInt(stored, 10);
        // Add small random variation to simulate real-time activity (±2)
        const variation = Math.floor(Math.random() * 5) - 2;
        const displayCount = Math.max(1, baseCount + variation);
        setCount(displayCount);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-3 rounded-xl bg-gradient-to-r from-black/90 to-black/80 backdrop-blur-md px-5 py-3 border-2 border-gold/60 text-gold font-bold text-lg shadow-2xl shadow-gold/20 transition-all duration-300 hover:scale-110 hover:border-gold hover:shadow-gold/40 animate-pulse">
      <div className="relative">
        <span role="img" aria-label="users" className="text-2xl animate-bounce">👥</span>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black animate-ping" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-gold/70 font-normal">En ligne</span>
        <span className="text-xl font-bold">
          {count.toLocaleString()} {count > 1 ? t('connections_plural') : t('connections')}
        </span>
      </div>
    </div>
  );
}

