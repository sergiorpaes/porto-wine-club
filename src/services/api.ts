
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: API_URL,
});

// Interceptor to add Token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (credentials: any) => api.post('/auth/login', credentials);
export const getWines = () => api.get('/wines');
export const addWine = (wine: any) => api.post('/wines', wine);
export const updateWine = (id: string, wine: any) => api.put(`/wines/${id}`, wine);
export const deleteWine = (id: string) => api.delete(`/wines/${id}`);

export default api;
