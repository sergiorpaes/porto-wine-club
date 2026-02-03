
import React from 'react';
import { Truck, ShieldCheck, Tag, Star, Award, Zap } from 'lucide-react';
import { useLanguage } from '../App';

export const Benefits: React.FC = () => {
  const { t } = useLanguage();

  const items = [
    { icon: <Truck className="text-gold" size={32} />, title: t.benefits.item1, desc: t.benefits.item1_desc },
    { icon: <Tag className="text-gold" size={32} />, title: t.benefits.item2, desc: t.benefits.item2_desc },
    { icon: <Award className="text-gold" size={32} />, title: t.benefits.item3, desc: t.benefits.item3_desc },
    { icon: <ShieldCheck className="text-gold" size={32} />, title: t.benefits.item4, desc: t.benefits.item4_desc },
    { icon: <Star className="text-gold" size={32} />, title: t.benefits.item5, desc: t.benefits.item5_desc },
    { icon: <Zap className="text-gold" size={32} />, title: t.benefits.item6, desc: t.benefits.item6_desc }
  ];

  return (
    <section id="benefits" className="py-24 bg-dark text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
         <span className="text-[400px] font-serif font-bold text-gold">PWC</span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
          <div className="lg:w-2/3">
            <h4 className="text-gold font-bold tracking-[0.3em] uppercase text-sm mb-4">{t.benefits.badge}</h4>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">{t.benefits.title}</h2>
          </div>
          <div className="lg:w-1/3">
             <p className="text-white/60 font-light text-lg">{t.benefits.p}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {items.map((item, idx) => (
            <div key={idx} className="group p-8 border border-white/10 hover:border-gold/50 transition-all duration-500 rounded-sm">
              <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-wide">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-wine-500 p-12 rounded-sm relative overflow-hidden">
           <div className="flex flex-col lg:flex-row items-center justify-between relative z-10 gap-8">
              <div className="text-center lg:text-left">
                 <h3 className="text-3xl font-serif mb-2">{t.benefits.cta_title}</h3>
                 <p className="text-white/80">{t.benefits.cta_sub}</p>
              </div>
              <button className="bg-white text-wine-500 hover:bg-gold hover:text-dark px-12 py-4 rounded-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-2xl">
                 {t.benefits.cta_btn}
              </button>
           </div>
        </div>
      </div>
    </section>
  );
};
