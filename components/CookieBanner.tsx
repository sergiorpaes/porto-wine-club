import React, { useState, useEffect } from 'react';

interface Props {
    t: any;
}

export const CookieBanner: React.FC<Props> = ({ t }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-inner flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-700">
            <p className="text-sm md:text-base text-center md:text-left">
                {t.cookieConsent?.message || 'We use cookies to improve your experience.'}
            </p>
            <button
                onClick={handleAccept}
                className="bg-yellow-600 text-white font-bold px-6 py-2 rounded-full hover:bg-yellow-500 transition text-sm whitespace-nowrap"
            >
                {t.cookieConsent?.accept || 'Accept'}
            </button>
        </div>
    );
};
