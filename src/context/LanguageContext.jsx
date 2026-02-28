import { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

const STORAGE_KEY = 'airwall-language';

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved || 'en';
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, language);
        document.documentElement.setAttribute('lang', language === 'am' ? 'hy' : language);
    }, [language]);

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}
