import React, { useState } from 'react';
import axios from 'axios';

interface Props {
    username: string;
    onSuccess: () => void;
}

export const ChangePasswordModal: React.FC<Props> = ({ username, onSuccess }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            // Using direct axios or imported api service
            const API_URL = import.meta.env.VITE_API_URL || '/api';
            await axios.post(`${API_URL}/auth/change-password`, { username, newPassword });
            onSuccess();
        } catch (err) {
            setError('Failed to update password. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-96 max-w-full m-4">
                <h2 className="text-2xl font-serif text-center mb-2 text-dark">Security Update</h2>
                <p className="text-center text-gray-600 mb-6 text-sm">
                    You must change your temporary password to continue.
                </p>

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 p-2 border rounded-md"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 p-2 border rounded-md"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-wine-500 text-white py-2 rounded-md hover:bg-wine-600 transition disabled:opacity-50"
                    >
                        {loading ? 'Updating...' : 'Set New Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};
