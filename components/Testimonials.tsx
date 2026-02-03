
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '../App';

export const Testimonials: React.FC = () => {
  const { t } = useLanguage();

  const testimonialsList = [
    {
      id: 1,
      content: t.testimonials.t1,
      name: t.testimonials.t1_author,
      rating: 5,
      role: 'Member since 2024'
    },
    {
      id: 2,
      content: t.testimonials.t2,
      name: t.testimonials.t2_author,
      rating: 5,
      role: 'Member since 2024'
    },
    {
      id: 3,
      content: t.testimonials.t3,
      name: t.testimonials.t3_author,
      rating: 5,
      role: 'Member since 2023'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h4 className="text-gold font-bold tracking-[0.3em] uppercase text-sm mb-4">Experiências Reais</h4>
          <h2 className="text-4xl md:text-5xl font-serif text-dark mb-6">{t.testimonials.title}</h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonialsList.map((t) => (
            <div key={t.id} className="bg-gray-50 p-10 rounded-sm relative flex flex-col h-full hover:bg-wine-50 transition-colors duration-500 group">
              <Quote className="absolute top-6 right-8 text-gold/20" size={60} />
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < t.rating ? 'text-gold fill-gold' : 'text-gray-300'} />
                ))}
              </div>
              <p className="text-gray-600 italic text-lg mb-8 relative z-10 flex-grow">
                "{t.content}"
              </p>
              <div className="flex items-center space-x-4 border-t border-gray-200 pt-6 group-hover:border-wine-200 transition-colors">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold font-serif text-xl font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h5 className="font-bold text-dark">{t.name}</h5>
                  <span className="text-xs text-gray-400 uppercase tracking-widest">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
