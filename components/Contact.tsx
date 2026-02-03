
import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '../App';

export const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col lg:flex-row">
          
          <div className="lg:w-1/3 bg-dark text-white p-12 relative overflow-hidden">
            <h3 className="text-3xl font-serif mb-12 relative z-10">{t.contact.title}</h3>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-start space-x-4">
                <MapPin className="text-gold mt-1" size={24} />
                <div>
                  <h5 className="font-bold uppercase tracking-widest text-xs text-gold mb-1">{t.contact.loc}</h5>
                  <p className="text-white/70 text-sm">La Nucia, Alicante, ES</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="text-gold mt-1" size={24} />
                <div>
                  <h5 className="font-bold uppercase tracking-widest text-xs text-gold mb-1">{t.nav.call}</h5>
                  <p className="text-white/70 text-sm">+34 622 892 418</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Mail className="text-gold mt-1" size={24} />
                <div>
                  <h5 className="font-bold uppercase tracking-widest text-xs text-gold mb-1">E-mail</h5>
                  <p className="text-white/70 text-sm">contact@portowineclub.com</p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white p-4 inline-block rounded-lg relative z-10 shadow-xl group cursor-pointer transform hover:scale-105 transition-transform">
               <div className="w-32 h-32 bg-gray-200 flex flex-col items-center justify-center text-dark text-[10px] font-bold">
                  <span className="mb-2">SCAN ME</span>
                  <div className="grid grid-cols-4 gap-1 w-20 h-20 opacity-40">
                    {[...Array(16)].map((_, i) => <div key={i} className="bg-dark rounded-sm"></div>)}
                  </div>
               </div>
               <p className="text-dark text-center text-[10px] mt-2 font-bold uppercase tracking-widest">{t.contact.scan}</p>
            </div>
          </div>

          <div className="lg:w-2/3 p-12">
            <h4 className="text-wine-500 font-bold tracking-[0.3em] uppercase text-xs mb-8">{t.contact.badge}</h4>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">{t.contact.name}</label>
                  <input type="text" className="w-full border-b-2 border-gray-100 focus:border-gold py-3 outline-none transition-colors text-dark" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">{t.contact.email}</label>
                  <input type="email" className="w-full border-b-2 border-gray-100 focus:border-gold py-3 outline-none transition-colors text-dark" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">{t.contact.message}</label>
                <textarea rows={4} className="w-full border-b-2 border-gray-100 focus:border-gold py-3 outline-none transition-colors text-dark resize-none"></textarea>
              </div>
              <button className="bg-wine-500 hover:bg-wine-600 text-white px-12 py-4 rounded-sm font-bold tracking-widest uppercase transition-all duration-300 w-full md:w-auto">
                {t.contact.send}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
