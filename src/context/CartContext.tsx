
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, WineProduct } from '../types';

interface CartContextType {
    cartItems: CartItem[];
    isCartOpen: boolean;
    totalCartCount: number;
    totalPrice: number;
    addToCart: (wine: WineProduct) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    setIsCartOpen: (isOpen: boolean) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('cartItems');
        return saved ? JSON.parse(saved) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (wine: WineProduct) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === wine.id);
            if (existing) {
                return prev.map(item =>
                    item.id === wine.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...wine, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, delta: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            isCartOpen,
            totalCartCount,
            totalPrice,
            addToCart,
            removeFromCart,
            updateQuantity,
            setIsCartOpen,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
