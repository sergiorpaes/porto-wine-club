
import React, { useEffect, useState } from 'react';
import { Hero } from '../../components/Hero';
import { Catalog } from '../../components/Catalog';
import { About } from '../../components/About';
import { Benefits } from '../../components/Benefits';
import { Testimonials } from '../../components/Testimonials';
import { Contact } from '../../components/Contact';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Cart } from '../../components/Cart';
import { WineProduct } from '../../types';
import { getWines } from '../services/api';
import { useCart } from '../context/CartContext';

const Home: React.FC = () => {
    const [wines, setWines] = useState<WineProduct[]>([]);
    const {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalCartCount
    } = useCart();

    // Fetch wines from API
    useEffect(() => {
        getWines()
            .then(res => setWines(res.data))
            .catch(err => console.error('Failed to fetch wines', err));
    }, []);

    return (
        <>
            <Navbar cartCount={totalCartCount} onCartClick={() => setIsCartOpen(true)} />
            <main>
                <Hero />
                <About />
                <div className="relative h-24 bg-white overflow-hidden -mt-1 z-10">
                    <div className="absolute inset-0 bg-gray-50 torn-edge-bottom"></div>
                </div>

                <Catalog wines={wines} onAddToCart={addToCart} />

                <div className="relative h-24 bg-gray-50 overflow-hidden z-10">
                    <div className="absolute inset-0 bg-dark torn-edge-bottom"></div>
                </div>
                <Benefits />
                <Testimonials />
                <Contact />
            </main>
            <Footer />
            <Cart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
            />
        </>
    );
};

export default Home;
