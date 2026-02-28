import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import './LanguageSwitcher.css';

/* Inline SVG flag components — render properly on all OS unlike emoji flags */
const FlagUS = () => (
    <svg className="lang-switch__flag-svg" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
        <rect width="640" height="480" fill="#bd3d44" />
        <rect y="37" width="640" height="37" fill="#fff" />
        <rect y="111" width="640" height="37" fill="#fff" />
        <rect y="185" width="640" height="37" fill="#fff" />
        <rect y="259" width="640" height="37" fill="#fff" />
        <rect y="333" width="640" height="37" fill="#fff" />
        <rect y="407" width="640" height="37" fill="#fff" />
        <rect width="260" height="259" fill="#192f5d" />
    </svg>
);

const FlagAM = () => (
    <svg className="lang-switch__flag-svg" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
        <rect width="640" height="160" fill="#d90012" />
        <rect y="160" width="640" height="160" fill="#0033a0" />
        <rect y="320" width="640" height="160" fill="#f2a800" />
    </svg>
);

const FlagRU = () => (
    <svg className="lang-switch__flag-svg" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
        <rect width="640" height="160" fill="#fff" />
        <rect y="160" width="640" height="160" fill="#0039a6" />
        <rect y="320" width="640" height="160" fill="#d52b1e" />
    </svg>
);

const languages = [
    { code: 'en', label: 'English', Flag: FlagUS, short: 'EN' },
    { code: 'am', label: 'Հայerեն', Flag: FlagAM, short: 'ՀY' },
    { code: 'ru', label: 'Русский', Flag: FlagRU, short: 'RU' },
];

export default function LanguageSwitcher() {
    const { language, changeLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const current = languages.find(l => l.code === language) || languages[0];
    const CurrentFlag = current.Flag;

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="lang-switch" ref={ref}>
            <button
                className="lang-switch__trigger"
                onClick={() => setIsOpen(prev => !prev)}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-label="Select language"
            >
                <CurrentFlag />
                <span className="lang-switch__short">{current.short}</span>
                <svg className={`lang-switch__chevron ${isOpen ? 'lang-switch__chevron--open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {isOpen && (
                <div className="lang-switch__dropdown" role="listbox" aria-label="Language options">
                    {languages.map(lang => {
                        const LangFlag = lang.Flag;
                        return (
                            <button
                                key={lang.code}
                                className={`lang-switch__option ${lang.code === language ? 'lang-switch__option--active' : ''}`}
                                onClick={() => { changeLanguage(lang.code); setIsOpen(false); }}
                                role="option"
                                aria-selected={lang.code === language}
                            >
                                <LangFlag />
                                <span className="lang-switch__option-label">{lang.label}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
