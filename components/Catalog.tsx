
import React, { useState } from 'react';
import { WineCategory, WineProduct } from '../types';
import { ShoppingCart, Heart, Search } from 'lucide-react';
import { useLanguage } from '../App';

interface CatalogProps {
  wines: WineProduct[];
  onAddToCart: (wine: WineProduct) => void;
}

export const Catalog: React.FC<CatalogProps> = ({ wines, onAddToCart }) => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<WineCategory | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWines = wines.filter(wine => {
    const matchesCategory = activeFilter === 'All' || wine.category === activeFilter;
    const matchesSearch = wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wine.region.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filters: { key: WineCategory | 'All'; label: string }[] = [
    { key: 'All', label: t.catalog.filters.all },
    { key: 'Red', label: t.catalog.filters.red },
    { key: 'White', label: t.catalog.filters.white },
    { key: 'Rosé', label: t.catalog.filters.rose },
    { key: 'Green', label: t.catalog.filters.green },
  ];

  return (
    <section id="catalog" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h4 className="text-gold font-bold tracking-[0.3em] uppercase text-sm mb-4">{t.catalog.badge}</h4>
          <h2 className="text-4xl md:text-5xl font-serif text-dark mb-6">{t.catalog.title}</h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 ${activeFilter === filter.key
                  ? 'bg-wine-500 text-white shadow-lg'
                  : 'bg-white text-gray-400 hover:text-wine-500 border border-gray-200'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={t.catalog.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-full py-3 pl-12 pr-6 focus:outline-none focus:border-gold transition-colors shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredWines.map((wine) => (
            <div key={wine.id} className="bg-white group rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={wine.image}
                  alt={wine.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-dark">
                  {wine.category}
                </div>
                <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                  <button
                    onClick={() => onAddToCart(wine)}
                    className="bg-white text-dark w-full py-4 font-bold tracking-widest uppercase flex items-center justify-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                  >
                    <ShoppingCart size={18} />
                    <span>{t.catalog.add}</span>
                  </button>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-gold text-xs font-bold tracking-widest uppercase">{wine.region}</span>
                  <span className="text-gray-400 text-xs">{wine.year}</span>
                </div>
                <h3 className="text-2xl font-serif text-dark mb-4 group-hover:text-wine-500 transition-colors">{wine.name}</h3>
                <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">
                  {/* @ts-ignore - Dynamic description access */}
                  {wine.description?.[language] || wine.description?.['en'] || (wine.description ? Object.values(wine.description)[0] : 'No description available')}
                </p>
                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-[10px] uppercase">{t.catalog.memberPrice}</span>
                    <span className="text-2xl font-bold text-wine-500">€{wine.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="border-b-2 border-gold text-dark font-bold tracking-widest uppercase hover:text-gold transition-colors pb-1">
            {t.catalog.sommelier}
          </button>
        </div>
      </div>
    </section>
  );
};
