import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full py-4 px-6 lg:px-8 border-b border-gold/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-heading text-2xl font-bold text-gold hover:text-gold-light transition-colors">
          Kemet AI
        </Link>
        <nav className="flex items-center gap-6">
          <Link 
            to="/solutions" 
            className="text-gray-300 hover:text-gold transition-colors text-sm font-medium"
          >
            Solutions
          </Link>
          <Link 
            to="/outils" 
            className="text-gray-300 hover:text-gold transition-colors text-sm font-medium"
          >
            Outils
          </Link>
          <Link 
            to="/formations" 
            className="text-gray-300 hover:text-gold transition-colors text-sm font-medium"
          >
            Formations
          </Link>
        </nav>
      </div>
    </header>
  );
}

