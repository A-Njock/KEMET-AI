import LanguageToggle from './LanguageToggle';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col md:flex-row justify-center items-center gap-4 mt-8 py-6 px-4 text-gray-500 border-t border-gold/20">
      <LanguageToggle />
      <span className="text-sm">© {new Date().getFullYear()} Kemet AI</span>
    </footer>
  );
}

