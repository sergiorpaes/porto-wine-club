
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getWines, addWine, deleteWine, updateWine } from '../services/api';
import { WineProduct } from '../../types';
import { useNavigate } from 'react-router-dom';

const LANGUAGES = ['pt', 'en', 'es', 'fr', 'de', 'ru', 'nl'];

const AdminDashboard: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [wines, setWines] = useState<WineProduct[]>([]);
    const [form, setForm] = useState<Partial<WineProduct>>({ category: 'Red' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) navigate('/login');
        fetchWines();
    }, [isAuthenticated, navigate]);

    const fetchWines = async () => {
        const res = await getWines();
        setWines(res.data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing && form.id) {
            await updateWine(form.id, form);
        } else {
            await addWine(form);
        }
        setForm({ category: 'Red' });
        setIsEditing(false);
        fetchWines();
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure?')) {
            await deleteWine(id);
            fetchWines();
        }
    };

    const handleEdit = (wine: WineProduct) => {
        setForm(wine);
        setIsEditing(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif text-dark">Cellar Management</h1>
                    <button onClick={logout} className="text-red-500 hover:text-red-700 font-bold">Log Out</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Wine' : 'Add New Wine'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                placeholder="Name"
                                className="w-full p-2 border rounded"
                                value={form.name || ''}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Region"
                                className="w-full p-2 border rounded"
                                value={form.region || ''}
                                onChange={e => setForm({ ...form, region: e.target.value })}
                                required
                            />
                            <select
                                className="w-full p-2 border rounded"
                                value={form.category}
                                onChange={e => setForm({ ...form, category: e.target.value as any })}
                            >
                                <option value="Red">Red</option>
                                <option value="White">White</option>
                                <option value="Rosé">Rosé</option>
                                <option value="Green">Green</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Price"
                                className="w-full p-2 border rounded"
                                value={form.price || ''}
                                onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })}
                                required
                            />
                            <label className="block text-sm font-bold text-gray-700 mt-2">Descriptions (Multilingual)</label>
                            <div className="space-y-2 border p-2 rounded max-h-60 overflow-y-auto">
                                {LANGUAGES.map((lang) => (
                                    <div key={lang}>
                                        <span className="text-xs uppercase font-bold text-gray-500">{lang}</span>
                                        <textarea
                                            placeholder={`Description (${lang})`}
                                            className="w-full p-2 border rounded"
                                            // @ts-ignore
                                            value={form.description?.[lang] || ''}
                                            onChange={e => setForm({
                                                ...form,
                                                description: {
                                                    ...form.description || {},
                                                    [lang]: e.target.value
                                                }
                                            })}
                                        />
                                    </div>
                                ))}
                            </div>
                            <input
                                placeholder="Image URL"
                                className="w-full p-2 border rounded"
                                value={form.image || ''}
                                onChange={e => setForm({ ...form, image: e.target.value })}
                                required
                            />
                            <div className="flex gap-2">
                                <button type="submit" className="flex-1 bg-wine-500 text-white py-2 rounded hover:bg-wine-600 transition">
                                    {isEditing ? 'Update' : 'Add'}
                                </button>
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={() => { setIsEditing(false); setForm({ category: 'Red' }); }}
                                        className="bg-gray-200 text-gray-700 px-4 rounded"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* List Section */}
                    <div className="md:col-span-2 space-y-4">
                        <h2 className="text-xl font-bold mb-4">Inventory ({wines.length})</h2>
                        {wines.map(wine => (
                            <div key={wine.id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center group">
                                <div className="flex items-center gap-4">
                                    <img src={wine.image} alt={wine.name} className="w-12 h-16 object-cover rounded" />
                                    <div>
                                        <h3 className="font-bold text-dark">{wine.name}</h3>
                                        <p className="text-sm text-gray-500">{wine.region} · {wine.year} · €{wine.price}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(wine)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(wine.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                ) : (
                <div className="max-w-2xl">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-medium mb-4 flex items-center">
                            <span className="mr-2">💳</span> Stripe Payments Mode
                        </h2>
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-900">Current Environment</p>
                                <p className={`text-sm mt-1 px-2 py-0.5 rounded-full inline-block font-bold ${stripeMode === 'live' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                    {stripeMode === 'live' ? '🔴 LIVE PRODUCTION' : '🟢 TEST MODE'}
                                </p>
                                <p className="text-gray-500 text-sm mt-2">
                                    {stripeMode === 'live'
                                        ? 'Real cards will be charged. Money moves.'
                                        : 'Use test card 4242 4242 4242 4242. No charge.'}
                                </p>
                            </div>
                            <button
                                onClick={toggleStripeMode}
                                className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-wine-500 focus:ring-offset-2 ${stripeMode === 'live' ? 'bg-red-600' : 'bg-gray-400'
                                    }`}
                            >
                                <span className="sr-only">Toggle Mode</span>
                                <span
                                    className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${stripeMode === 'live' ? 'translate-x-6' : 'translate-x-0'
                                        }`}
                                />
                            </button>
                        </div>
                        {stripeMode === 'live' && (
                            <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded border border-red-200 flex items-start">
                                <AlertTriangle className="mr-2 flex-shrink-0" size={18} />
                                <span>
                                    <b>Warning:</b> You are in LIVE mode. Ensure your Stripe Live API Keys are correctly set in the Netlify environment variables before testing.
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}
            </main>
        </div>
    );
};
                                                    <input
                                                        placeholder="Region"
                                                        className="w-full p-2 border rounded"
                                                        value={form.region || ''}
                                                        onChange={e => setForm({ ...form, region: e.target.value })}
                                                        required
                                                    />
                                                    <select
                                                        className="w-full p-2 border rounded"
                                                        value={form.category}
                                                        onChange={e => setForm({ ...form, category: e.target.value as any })}
                                                    >
                                                        <option value="Red">Red</option>
                                                        <option value="White">White</option>
                                                        <option value="Rosé">Rosé</option>
                                                        <option value="Green">Green</option>
                                                    </select>
                                                    <input
                                                        type="number"
                                                        placeholder="Price"
                                                        className="w-full p-2 border rounded"
                                                        value={form.price || ''}
                                                        onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })}
                                                        required
                                                    />
                                                    <label className="block text-sm font-bold text-gray-700 mt-2">Descriptions (Multilingual)</label>
                                                    <div className="space-y-2 border p-2 rounded max-h-60 overflow-y-auto">
                                                        {LANGUAGES.map((lang) => (
                                                            <div key={lang}>
                                                                <span className="text-xs uppercase font-bold text-gray-500">{lang}</span>
                                                                <textarea
                                                                    placeholder={`Description (${lang})`}
                                                                    className="w-full p-2 border rounded"
                                                                    // @ts-ignore
                                                                    value={form.description?.[lang] || ''}
                                                                    onChange={e => setForm({
                                                                        ...form,
                                                                        description: {
                                                                            ...form.description,
                                                                            [lang]: e.target.value
                                                                        }
                                                                    })}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <input
                                                        placeholder="Image URL"
                                                        className="w-full p-2 border rounded"
                                                        value={form.image || ''}
                                                        onChange={e => setForm({ ...form, image: e.target.value })}
                                                        required
                                                    />
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="number"
                                                            placeholder="Year"
                                                            className="w-full p-2 border rounded"
                                                            value={form.year || ''}
                                                            onChange={e => setForm({ ...form, year: parseInt(e.target.value) })}
                                                            required
                                                        />
                                                        <input
                                                            placeholder="Alcohol %"
                                                            className="w-full p-2 border rounded"
                                                            value={form.alcohol || ''}
                                                            onChange={e => setForm({ ...form, alcohol: e.target.value })}
                                                            required
                                                        />
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <button type="submit" className="flex-1 bg-wine-500 text-white py-2 rounded hover:bg-wine-600 transition">
                                                            {isEditing ? 'Update' : 'Add'}
                                                        </button>
                                                        <h3 className="font-bold text-dark">{wine.name}</h3>
                                                        <p className="text-sm text-gray-500">{wine.region} · {wine.year} · €{wine.price}</p>
                                                    </div>
                                            </div >
    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => handleEdit(wine)} className="text-blue-500 hover:underline">Edit</button>
        <button onClick={() => handleDelete(wine.id)} className="text-red-500 hover:underline">Delete</button>
    </div>
                                        </div >
                                    ))}
                            </div >
                    </div >
                </div >
            </div >
            );
};

export default AdminDashboard;
