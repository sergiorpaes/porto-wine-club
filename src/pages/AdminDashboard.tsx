import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { getWines, addWine, deleteWine, updateWine } from '../services/api';
import { WineProduct } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit2, Archive, LogOut, Settings as SettingsIcon, AlertTriangle } from 'lucide-react';

const LANGUAGES = ['pt', 'en', 'es', 'fr', 'de', 'ru', 'nl'];

const AdminDashboard: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    // Wines State
    const [wines, setWines] = useState<WineProduct[]>([]);
    const [form, setForm] = useState<Partial<WineProduct>>({ category: 'Red' });
    const [isEditing, setIsEditing] = useState(false);

    // Settings State
    const [activeTab, setActiveTab] = useState<'wines' | 'settings'>('wines');
    const [stripeMode, setStripeMode] = useState<'test' | 'live'>('test');

    useEffect(() => {
        if (!isAuthenticated) navigate('/login');
        fetchWines();
        fetchSettings();
    }, [isAuthenticated, navigate]);

    const fetchWines = async () => {
        try {
            const res = await getWines();
            setWines(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSettings = async () => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || '/api';
            const res = await axios.get(`${API_URL}/settings`);
            if (res.data && res.data.stripe_mode) {
                setStripeMode(res.data.stripe_mode);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    };

    const toggleStripeMode = async () => {
        const newMode = stripeMode === 'test' ? 'live' : 'test';
        if (newMode === 'live') {
            const confirmed = window.confirm('🛑 DANGER: Switching to LIVE mode will process REAL PAYMENTS. Are you sure?');
            if (!confirmed) return;
        }

        try {
            const API_URL = import.meta.env.VITE_API_URL || '/api';
            await axios.put(`${API_URL}/settings`, { key: 'stripe_mode', value: newMode });
            setStripeMode(newMode);
        } catch (error) {
            alert('Failed to update settings');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && form.id) {
                await updateWine(form.id, form);
            } else {
                await addWine(form);
            }
            setForm({ category: 'Red' });
            setIsEditing(false);
            fetchWines();
        } catch (err) {
            console.error(err);
            alert('Operation failed');
        }
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
        <div className="flex h-screen bg-gray-50 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col hidden md:flex">
                <div className="mb-8">
                    <h2 className="text-2xl font-serif text-wine-900">Cellar Admin</h2>
                </div>

                <nav className="flex-1 space-y-2">
                    <button
                        onClick={() => setActiveTab('wines')}
                        className={`w-full flex items-center p-3 rounded-md transition ${activeTab === 'wines' ? 'bg-wine-100 text-wine-800' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Archive size={20} className="mr-3" />
                        Inventory
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center p-3 rounded-md transition ${activeTab === 'settings' ? 'bg-wine-100 text-wine-800' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <SettingsIcon size={20} className="mr-3" />
                        Settings
                    </button>
                </nav>

                <button
                    onClick={logout}
                    className="w-full flex items-center p-3 rounded-md text-gray-600 hover:bg-gray-50 mt-auto"
                >
                    <LogOut size={20} className="mr-3" />
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto w-full">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif text-dark">
                        {activeTab === 'wines' ? 'Wine Management' : 'System Settings'}
                    </h1>
                    <div className="flex gap-2">
                        {/* Mobile Logout (visible only on small screens) */}
                        <button onClick={logout} className="md:hidden text-red-500 font-bold">Exit</button>

                        {activeTab === 'wines' && (
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setForm({ category: 'Red' });
                                }}
                                className="bg-wine-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-wine-700 transition"
                            >
                                <Plus size={20} className="mr-2" />
                                Add
                            </button>
                        )}
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'wines' ? (
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* Form */}
                        <div className="xl:col-span-1">
                            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-8">
                                <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Wine' : 'Add New Wine'}</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input placeholder="Name" className="w-full p-2 border rounded" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} required />
                                    <input placeholder="Region" className="w-full p-2 border rounded" value={form.region || ''} onChange={e => setForm({ ...form, region: e.target.value })} required />
                                    <select className="w-full p-2 border rounded" value={form.category} onChange={e => setForm({ ...form, category: e.target.value as any })}>
                                        <option value="Red">Red</option>
                                        <option value="White">White</option>
                                        <option value="Rosé">Rosé</option>
                                        <option value="Green">Green</option>
                                    </select>
                                    <input type="number" placeholder="Year" className="w-full p-2 border rounded" value={form.year || ''} onChange={e => setForm({ ...form, year: parseInt(e.target.value) })} required />
                                    <input placeholder="Alcohol %" className="w-full p-2 border rounded" value={form.alcohol || ''} onChange={e => setForm({ ...form, alcohol: e.target.value })} required />
                                    <input type="number" step="0.01" placeholder="Price" className="w-full p-2 border rounded" value={form.price || ''} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })} required />

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Image (URL or Upload)</label>
                                        <div className="flex gap-2">
                                            <input
                                                placeholder="https://..."
                                                className="flex-1 p-2 border rounded"
                                                value={form.image || ''}
                                                onChange={e => setForm({ ...form, image: e.target.value })}
                                                required={!form.image}
                                            />
                                            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 border rounded px-3 py-2 flex items-center justify-center">
                                                <span className="text-sm font-medium text-gray-600">Upload</span>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                setForm({ ...form, image: reader.result as string });
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                />
                                            </label>
                                        </div>
                                        {/* Preview */}
                                        {form.image && (
                                            <div className="mt-2 text-center">
                                                <img src={form.image} alt="Preview" className="h-32 mx-auto object-contain border rounded bg-gray-50" />
                                                <button
                                                    type="button"
                                                    onClick={() => setForm({ ...form, image: '' })}
                                                    className="text-xs text-red-500 hover:underline mt-1"
                                                >
                                                    Clear Image
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Descriptions</label>
                                        <div className="space-y-2 h-40 overflow-y-auto border p-2 rounded">
                                            {LANGUAGES.map(lang => (
                                                <div key={lang}>
                                                    <span className="text-xs font-bold uppercase text-gray-400">{lang}</span>
                                                    <textarea
                                                        className="w-full p-1 border rounded text-sm"
                                                        rows={2}
                                                        // @ts-ignore
                                                        value={form.description?.[lang] || ''}
                                                        onChange={e => setForm({
                                                            ...form,
                                                            description: { ...form.description || {}, [lang]: e.target.value }
                                                        })}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button type="submit" className="flex-1 bg-wine-600 text-white py-2 rounded hover:bg-wine-700">{isEditing ? 'Update' : 'Add Wine'}</button>
                                        {isEditing && (
                                            <button type="button" onClick={() => { setIsEditing(false); setForm({ category: 'Red' }) }} className="px-4 py-2 bg-gray-200 rounded text-gray-700">Cancel</button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* List */}
                        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 place-content-start">
                            {wines.map(wine => (
                                <div key={wine.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex gap-4">
                                    <img src={wine.image} alt={wine.name} className="w-20 h-24 object-cover rounded bg-gray-100" />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-lg">{wine.name}</h3>
                                                <p className="text-sm text-gray-500">{wine.region} · {wine.year}</p>
                                            </div>
                                            <span className="font-bold text-wine-600">€{wine.price}</span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">{wine.category} · {wine.alcohol}</p>

                                        <div className="mt-4 flex justify-end gap-2">
                                            <button onClick={() => handleEdit(wine)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete(wine.id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Settings Tab */
                    <div className="max-w-2xl">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-medium mb-6 flex items-center">
                                <span className="mr-2">💳</span> Stripe Payments Mode
                            </h2>

                            <div className="flex items-center justify-between bg-gray-50 p-6 rounded-lg mb-6">
                                <div>
                                    <p className="font-medium text-gray-900 text-lg">Current Environment</p>
                                    <div className="mt-2">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${stripeMode === 'live' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                            {stripeMode === 'live' ? '🔴 LIVE PRODUCTION' : '🟢 TEST MODE'}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 mt-3 max-w-sm">
                                        {stripeMode === 'live'
                                            ? 'Real credit cards will be charged. Use with caution.'
                                            : 'Use test card "4242 4242 4242 4242" to simulate payments.'}
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
                                <div className="p-4 bg-red-50 text-red-800 text-sm rounded-lg border border-red-200 flex items-start">
                                    <AlertTriangle className="mr-3 flex-shrink-0 mt-0.5" size={18} />
                                    <div>
                                        <p className="font-bold">Warning: Live Mode Active</p>
                                        <p className="mt-1 opacity-90">Ensure your Netlify Environment Variables (<code className="bg-red-100 px-1 rounded">STRIPE_LIVE_PK</code>, <code className="bg-red-100 px-1 rounded">STRIPE_LIVE_SK</code>) are correctly configured.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
