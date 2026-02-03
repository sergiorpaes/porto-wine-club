import React, { useEffect, useState } from 'react';
import { useLanguage } from '../App';
import { Wine } from 'lucide-react';

export const AgeVerificationModal: React.FC = () => {
    const { t, language, setLanguage } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const [isUnderage, setIsUnderage] = useState(false);

    useEffect(() => {
        const verified = localStorage.getItem('ageVerified');
        if (!verified) {
            setIsVisible(true);
        }
    }, []);

    const handleYes = () => {
        localStorage.setItem('ageVerified', 'true');
        setIsVisible(false);
    };

    const handleNo = () => {
        setIsUnderage(true);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with blur */}
            <div className="absolute inset-0 bg-dark/95 backdrop-blur-md"></div>

            <div className="relative bg-white max-w-md w-full p-10 shadow-2xl rounded-sm border-t-4 border-gold text-center animate-fade-in-up">
                <div className="flex justify-center mb-6 text-wine-500">
                    <Wine size={48} strokeWidth={1} />
                </div>

                <h2 className="text-3xl font-serif text-dark mb-4 tracking-wide">
                    {t.ageVerification.title}
                </h2>

                <div className="w-16 h-0.5 bg-gold mx-auto mb-6"></div>

                <div className="flex justify-center gap-3 mb-8">
                    {['pt', 'en', 'es', 'fr', 'de', 'ru', 'nl'].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang as any)}
                            className={`text-xs uppercase font-bold tracking-widest transition-colors ${language === lang ? 'text-wine-500' : 'text-gray-300 hover:text-gray-500'
                                }`}
                        >
                            {lang}
                        </button>
                    ))}
                </div>

                {isUnderage ? (
                    <div className="text-red-500 font-bold py-8 animate-pulse">
                        {t.ageVerification.fail}
                    </div>
                ) : (
                    <>
                        <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                            {t.ageVerification.message}
                        </p>

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={handleYes}
                                className="w-full bg-wine-500 text-white py-4 font-bold uppercase tracking-widest hover:bg-wine-600 transition shadow-lg text-sm"
                            >
                                {t.ageVerification.yes}
                            </button>
                            <button
                                onClick={handleNo}
                                className="w-full bg-transparent text-gray-400 py-2 text-xs uppercase tracking-widest hover:text-dark transition border-b border-transparent hover:border-gray-300"
                            >
                                {t.ageVerification.no}
                            </button>
                        </div>
                    </>
                )}

                <div className="mt-8 text-[10px] text-gray-300 uppercase tracking-widest">
                    Porto Wine Club
                </div>
            </div>
        </div>
    );
};
