
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// ... imports
import { ChangePasswordModal } from '../components/ChangePasswordModal';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showChangePassword, setShowChangePassword] = useState(false);

    // apiLogin needs to be called directly or login() modified to return user data
    // Ideally update useAuth to return the data, but for now we'll peek at the response
    // Actually, useAuth.login is void. Let's modify it or just trust the logic.
    // Wait, useAuth calls apiLogin. We need the response.
    // Let's import api directly here for the specific login check OR update AuthContext.
    // Updating AuthContext is cleaner but harder. 
    // Let's modify this component to call api.login directly for the check, then useAuth.login to set state.

    const { login } = useAuth(); // We'll use this if no change needed
    const navigate = useNavigate();

    // We need to import the raw api login function to check the flag before setting global auth
    // But useAuth.login does the setting. 
    // Let's modify the handleSubmit to use the apiLogin from services directly first.

    // Oops, I can't easily import apiLogin here if it's not exported or if I want to keep consistency.
    // Best path: Update this component to call the context login, but we need to know if it requires password change.
    // Let's simple fetch:

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // We need to capture the response. The context likely swallows it.
            // Let's try to login via context. If context saves the user with "mustChangePassword", we can check "user" from context!
            // But context updates asynchronously.

            // Hack: Valid login flow
            // 1. Call logic. logic returns true/false?
            await login({ username, password });

            // Login success. Now check localStorage or context?
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const u = JSON.parse(storedUser);
                if (u.mustChangePassword) {
                    setShowChangePassword(true);
                    return; // Don't navigate
                }
            }

            navigate('/cellar');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    const handlePasswordChanged = () => {
        setShowChangePassword(false);
        setError('');
        setUsername('');
        setPassword('');
        alert('Password updated! Please log in with your new password.');
        localStorage.clear(); // Force logout to require re-login
        // window.location.reload(); // Simple reset
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            {showChangePassword && (
                <ChangePasswordModal
                    username={username}
                    onSuccess={handlePasswordChanged}
                />
            )}
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-serif text-center mb-6 text-dark">Admin Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            className="w-full mt-1 p-2 border rounded-md"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 p-2 border rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-wine-500 text-white py-2 rounded-md hover:bg-wine-600 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
