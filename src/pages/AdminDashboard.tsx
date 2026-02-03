
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
                                        <nav className="space-y-2">
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
                                    </aside>

            {/* Main Content */ }
                                    < main className = "flex-1 p-8 overflow-y-auto" >
                                    <div className="flex justify-between items-center mb-8">
                                        <h1 className="text-3xl font-serif text-dark">
                                            {activeTab === 'wines' ? 'Wine Management' : 'System Settings'}
                                        </h1>
                                        {activeTab === 'wines' && (
                                            <button
                                                onClick={() => {
                                                    setIsEditing(false);
                                                    setForm({ category: 'Red' });
                                                }}
                                                className="bg-wine-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-wine-700 transition"
                                            >
                                                <Plus size={20} className="mr-2" />
                                                Add New Wine
                                            </button>
                                        )}
                                    </div>

                { activeTab === 'wines' ? (
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
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleEdit(wine)} className="text-blue-500 hover:underline">Edit</button>
                                                <button onClick={() => handleDelete(wine.id)} className="text-red-500 hover:underline">Delete</button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                    </div>
                </div>
            </div>
            );
};

            export default AdminDashboard;
