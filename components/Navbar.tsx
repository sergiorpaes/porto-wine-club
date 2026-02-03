
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Phone, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../App';
import { Language } from '../translations';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages: { code: Language; label: string }[] = [
    { code: 'pt', label: 'PT' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
    { code: 'fr', label: 'FR' },
    { code: 'de', label: 'DE' },
    { code: 'ru', label: 'RU' },
    { code: 'nl', label: 'NL' },
  ];

  const navLinks = [
    { name: t.nav.home, href: '#hero' },
    { name: t.nav.wines, href: '#catalog' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.benefits, href: '#benefits' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-dark py-4 shadow-xl' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="w-10 h-10 border-2 border-gold rounded-full flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
            <span className="text-gold group-hover:text-dark font-serif font-bold text-xl">P</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-serif font-bold text-xl tracking-wider uppercase">Porto Wine Club</span>
            <span className="text-gold text-[10px] uppercase tracking-[0.2em]">Excellence from Portugal</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white hover:text-gold transition-colors duration-300 text-sm font-medium tracking-wide uppercase"
            >
              {link.name}
            </a>
          ))}

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center space-x-2 text-white hover:text-gold transition-colors duration-300 text-xs font-bold"
            >
              <Globe size={16} />
              <span className="uppercase">{language}</span>
              <ChevronDown size={12} className={`transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            {isLangMenuOpen && (
              <div className="absolute top-full mt-2 right-0 bg-dark border border-white/10 rounded-sm shadow-2xl py-2 min-w-[80px]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-xs hover:bg-white/5 transition-colors ${language === lang.code ? 'text-gold font-bold' : 'text-white/60'}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-white/20"></div>
          <button
            onClick={onCartClick}
            className="relative p-2 text-white hover:text-gold transition-colors duration-300"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-wine-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <a
            href="tel:+34622892418"
            className="flex items-center space-x-2 bg-gold hover:bg-gold-dark text-dark px-5 py-2 rounded-sm transition-all duration-300 font-bold text-sm"
          >
            <Phone size={16} />
            <span>{t.nav.call}</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center space-x-4">
          <button onClick={onCartClick} className="relative text-white">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-wine-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-dark absolute top-full left-0 w-full h-screen flex flex-col items-center pt-12 space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white text-2xl font-serif hover:text-gold transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-wrap justify-center gap-4 px-6 py-4 border-t border-white/10 mt-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-sm px-3 py-1 rounded-sm border ${language === lang.code ? 'border-gold text-gold' : 'border-white/10 text-white/40'}`}
              >
                {lang.label}
              </button>
            ))}
          </div>
          <a
            href="tel:+34622892418"
            className="bg-gold text-dark px-8 py-3 rounded-sm font-bold text-lg"
          >
            {t.nav.call}
          </a>
        </div>
      )}
    </nav>
  );
};
