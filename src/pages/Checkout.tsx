
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../App';

const Checkout: React.FC = () => {
    const { cartItems, totalCartCount, totalPrice, setIsCartOpen } = useCart();
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        country: 'Portugal'
    });

    const shippingCost = totalPrice > 100 ? 0 : 15;
    const finalTotal = totalPrice + shippingCost;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const API_URL = import.meta.env.VITE_API_URL || '/api';
            const response = await fetch(`${API_URL}/payments/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: cartItems }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Payment initialization failed');
            }

            const { url } = await response.json();
            window.location.href = url;

        } catch (error) {
            console.error(error);
            alert('Failed to initiate payment. Please try again.');
        }
    };

    return (
        <>
            <Navbar cartCount={totalCartCount} onCartClick={() => setIsCartOpen(true)} />

            <div className="min-h-screen bg-gray-50 pt-32 pb-12">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h1 className="text-4xl font-serif text-dark mb-8 text-center">{t.checkout.title}</h1>

                    {cartItems.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-xl text-gray-500 mb-6">{t.cart.empty}</p>
                            <Link to="/" className="bg-wine-500 text-white px-8 py-3 rounded-full uppercase tracking-widest text-sm hover:bg-wine-600 transition">
                                {t.checkout.return}
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Left Column: Shipping Form */}
                            <div className="bg-white p-8 rounded-sm shadow-sm">
                                <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b pb-4">{t.checkout.shipping}</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{t.checkout.firstName}</label>
                                            <input
                                                name="firstName"
                                                className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-wine-500 transition"
                                                required
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{t.checkout.lastName}</label>
                                            <input
                                                name="lastName"
                                                className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-wine-500 transition"
                                                required
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{t.checkout.email}</label>
                                        <input
                                            name="email"
                                            type="email"
                                            className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-wine-500 transition"
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{t.checkout.address}</label>
                                        <input
                                            name="address"
                                            className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-wine-500 transition"
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{t.checkout.city}</label>
                                            <input
                                                name="city"
                                                className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-wine-500 transition"
                                                required
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{t.checkout.zip}</label>
                                            <input
                                                name="zip"
                                                className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-wine-500 transition"
                                                required
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{t.checkout.country}</label>
                                        <select
                                            name="country"
                                            className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-wine-500 transition"
                                            onChange={handleInputChange}
                                            value={formData.country}
                                        >
                                            <option value="Portugal">Portugal</option>
                                            <option value="Spain">Spain</option>
                                            <option value="France">France</option>
                                            <option value="Germany">Germany</option>
                                            <option value="UK">United Kingdom</option>
                                        </select>
                                    </div>
                                </form>
                            </div>

                            {/* Right Column: Order Summary */}
                            <div className="space-y-8">
                                <div className="bg-white p-8 rounded-sm shadow-sm">
                                    <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b pb-4">{t.checkout.summary}</h2>
                                    <div className="space-y-4 mb-6">
                                        {cartItems.map(item => (
                                            <div key={item.id} className="flex justify-between items-center text-sm">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <img src={item.image} alt={item.name} className="w-12 h-16 object-cover rounded-sm" />
                                                        <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                                                            {item.quantity}
                                                        </span>
                                                    </div>
                                                    <span className="text-dark font-medium">{item.name}</span>
                                                </div>
                                                <span className="text-gray-600">€{(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-3 pt-6 border-t border-gray-100 text-sm">
                                        <div className="flex justify-between text-gray-600">
                                            <span>{t.cart.subtotal}</span>
                                            <span>€{totalPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>{t.cart.shipping}</span>
                                            <span>{shippingCost === 0 ? 'Free' : `€${shippingCost.toFixed(2)}`}</span>
                                        </div>
                                        <div className="flex justify-between text-xl font-bold text-dark pt-4 border-t border-gray-100">
                                            <span>{t.cart.total}</span>
                                            <span>€{finalTotal.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        className="w-full bg-wine-500 text-white py-4 mt-8 font-bold uppercase tracking-widest hover:bg-wine-600 transition shadow-lg"
                                    >
                                        {t.checkout.proceed}
                                    </button>

                                    <div className="text-center mt-4">
                                        <Link to="/" className="text-gray-500 text-xs uppercase tracking-widest hover:text-dark transition border-b border-transparent hover:border-gray-800 pb-1">
                                            {t.checkout.return}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;
