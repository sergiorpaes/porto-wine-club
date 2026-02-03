
import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { useLanguage } from '../App';
import { useNavigate } from 'react-router-dom';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-dark text-white">
            <div className="flex items-center space-x-3">
              <ShoppingBag size={20} className="text-gold" />
              <h2 className="text-xl font-serif font-bold uppercase tracking-wider">{t.cart.title}</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <ShoppingBag size={32} className="text-gray-300" />
                <h3 className="text-lg font-bold text-dark">{t.cart.empty}</h3>
                <button onClick={onClose} className="bg-gold text-dark px-8 py-3 rounded-sm font-bold text-xs uppercase tracking-widest">{t.cart.continue}</button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex space-x-4 pb-6 border-b border-gray-50 last:border-0">
                  <div className="w-20 h-28 flex-shrink-0 bg-gray-100">
                    <img src={item.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div className="flex justify-between">
                      <h4 className="text-dark font-bold text-sm">{item.name}</h4>
                      <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-gray-200 rounded-sm">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="px-2 py-1"><Minus size={12} /></button>
                        <span className="px-3 text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="px-2 py-1"><Plus size={12} /></button>
                      </div>
                      <span className="text-wine-500 font-bold">€{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-8 bg-gray-50 border-t border-gray-100 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{t.cart.subtotal}</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{t.cart.shipping}</span>
                  <span className="text-green-600 font-bold uppercase text-[10px]">Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-dark pt-4 border-t border-gray-200">
                  <span className="font-serif">{t.cart.total}</span>
                  <span className="text-wine-500">€{subtotal.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-wine-500 hover:bg-wine-600 text-white py-4 rounded-sm font-bold tracking-widest uppercase shadow-lg"
              >
                {t.cart.checkout}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
