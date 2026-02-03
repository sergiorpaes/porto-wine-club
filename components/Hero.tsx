
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../App';

const HERO_IMAGES = [
  "/images/douro.png",     // Douro Valley Vineyards
  "/images/alentejo.png",  // Alentejo Landscape
  "/images/porto.png",     // Porto City
  "/images/lisbon.png",    // Lisbon Tram
  "/images/cellar.png",    // Wine Cellar
  "/images/grapes.png"     // Vineyard Grapes
];

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  // Initialize state function runs only once before render, preventing flash
  const [bgImage] = React.useState(() => {
    return HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)];
  });

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
          alt="Portuguese Vineyards"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-black/30"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <div className="mb-6 flex items-center space-x-2 bg-gold/20 border border-gold/40 px-4 py-1 rounded-full backdrop-blur-sm">
          <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
          <span className="text-gold text-xs font-bold uppercase tracking-widest">{t.hero.badge}</span>
        </div>

        <h1 className="font-serif text-5xl md:text-8xl text-white mb-6 max-w-5xl leading-tight">
          {t.hero.title.split(' ').slice(0, -2).join(' ')} <span className="text-gold italic">{t.hero.title.split(' ').slice(-2).join(' ')}</span>
        </h1>

        <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-10 font-light leading-relaxed">
          {t.hero.desc}
        </p>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <a
            href="#catalog"
            className="bg-gold hover:bg-gold-dark text-dark px-10 py-4 rounded-sm font-bold tracking-widest uppercase transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            {t.hero.cta1}
          </a>
          <a
            href="#benefits"
            className="border-2 border-white/30 hover:border-gold hover:text-gold text-white px-10 py-4 rounded-sm font-bold tracking-widest uppercase transition-all duration-300 backdrop-blur-sm"
          >
            {t.hero.cta2}
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50 animate-bounce cursor-pointer">
        <ChevronDown size={20} />
      </div>

      <div className="absolute -bottom-1 left-0 w-full h-16 bg-white torn-edge-top z-20"></div>
    </section>
  );
};
