
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark pt-20 pb-10 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border border-gold rounded-full flex items-center justify-center">
                <span className="text-gold font-serif font-bold text-sm">P</span>
              </div>
              <span className="text-white font-serif font-bold text-lg tracking-wider uppercase">Porto Wine Club</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Dedicados a levar o melhor do terroir português diretamente para as mãos de quem aprecia a verdadeira arte da vinicultura.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Explore</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li><a href="#hero" className="hover:text-gold transition-colors">Início</a></li>
              <li><a href="#catalog" className="hover:text-gold transition-colors">Catálogo de Vinhos</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">Nossa História</a></li>
              <li><a href="#benefits" className="hover:text-gold transition-colors">Clube de Membros</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Categorias</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li><a href="#" className="hover:text-gold transition-colors">Vinhos Tintos</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Vinhos Brancos</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Vinhos Verdes</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Vinhos do Porto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Newsletter</h4>
            <p className="text-white/40 text-xs mb-4">Receba ofertas exclusivas e avisos de novas safras.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="bg-white/5 border border-white/10 px-4 py-2 rounded-l-sm outline-none focus:border-gold w-full text-sm"
              />
              <button className="bg-gold text-dark px-4 py-2 rounded-r-sm font-bold text-xs uppercase hover:bg-gold-dark transition-colors">
                OK
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-[10px] uppercase tracking-widest">
            © 2024 Porto Wine Club. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 text-[10px] text-white/20 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>

        {/* Warning Badge */}
        <div className="mt-8 text-center">
           <span className="inline-block border border-white/10 px-6 py-2 text-[10px] text-white/30 uppercase tracking-[0.2em]">
              Beba com responsabilidade. A venda de álcool para menores de 18 anos é proibida.
           </span>
        </div>
      </div>
    </footer>
  );
};
