
import React from 'react';
import { useLanguage } from '../App';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 grid grid-cols-2 gap-4 relative">
            <div className="pt-12">
              <img
                src="https://images.unsplash.com/photo-1547595628-c61a29f496f0?auto=format&fit=crop&q=80&w=800"
                alt="Vinho Porto"
                className="rounded-lg shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&q=80&w=800"
                alt="Douro Valley"
                className="rounded-lg shadow-2xl transform rotate(3deg) hover:rotate-0 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 border-4 border-gold/20 -z-10 rounded-full"></div>
          </div>

          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-2">
              <h4 className="text-gold font-bold tracking-[0.3em] uppercase text-sm">{t.about.badge}</h4>
              <h2 className="text-4xl md:text-5xl font-serif text-dark leading-tight">
                {t.about.title.split(' ').slice(0, -2).join(' ')} <br />
                <span className="text-wine-500 italic">{t.about.title.split(' ').slice(-2).join(' ')}</span>
              </h2>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              {t.about.p1}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-wine-50 flex-shrink-0 flex items-center justify-center rounded-sm">
                  <span className="text-wine-500 font-bold text-xl">01</span>
                </div>
                <div>
                  <h5 className="font-bold text-dark mb-1">{t.about.feat1}</h5>
                  <p className="text-sm text-gray-500">{t.about.feat1_desc}</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-wine-50 flex-shrink-0 flex items-center justify-center rounded-sm">
                  <span className="text-wine-500 font-bold text-xl">02</span>
                </div>
                <div>
                  <h5 className="font-bold text-dark mb-1">{t.about.feat2}</h5>
                  <p className="text-sm text-gray-500">{t.about.feat2_desc}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center space-x-8">
              <div className="flex flex-col">
                <span className="text-3xl font-serif text-dark font-bold">500+</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">{t.about.stat1}</span>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-serif text-dark font-bold">100%</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">{t.about.stat2}</span>
              </div>
            </div>

            <button className="bg-wine-500 hover:bg-wine-600 text-white px-8 py-4 rounded-sm font-bold tracking-widest uppercase transition-all duration-300">
              {t.about.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
