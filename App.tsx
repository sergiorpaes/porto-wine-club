
import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TRANSLATIONS, Language } from './translations';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { AgeVerificationModal } from './components/AgeVerificationModal';
import { CookieBanner } from './components/CookieBanner';

// Pages
import Home from './src/pages/Home';
import Login from './src/pages/Login';
import AdminDashboard from './src/pages/AdminDashboard';
import Checkout from './src/pages/Checkout';

// Language Context
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  // Simple check: if not authenticated, redirect to login
  // Note: Ideally show a loading spinner while checking auth status if using async check
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('pt');
  const t = TRANSLATIONS[language];

  return (
    <Router>
      <LanguageContext.Provider value={{ language, setLanguage, t }}>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/cellar"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </CartProvider>
        </AuthProvider>
        <AgeVerificationModal />
        <CookieBanner t={t} />
      </LanguageContext.Provider>
    </Router>
  );
};

export default App;
