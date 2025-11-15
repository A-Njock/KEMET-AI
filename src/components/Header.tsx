import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full py-6 px-4 flex justify-between items-center bg-black border-b border-gold/20">
      <Link to="/" className="font-heading text-2xl text-gold hover:text-gold/80 transition-colors">
        Kemet AI
      </Link>
      <nav className="flex items-center gap-4">
        <Link to="/solutions" className="text-gold hover:text-gold/80 hover:underline transition-colors">
          Solutions
        </Link>
        <Link to="/outils" className="text-gold hover:text-gold/80 hover:underline transition-colors">
          Outils
        </Link>
        <Link to="/formations" className="text-gold hover:text-gold/80 hover:underline transition-colors">
          Formations
        </Link>
      </nav>
    </header>
  );
}

