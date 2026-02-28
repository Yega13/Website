import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import translations from '../../data/translations';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import './Header.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { language } = useLanguage();
    const t = translations[language] || translations.en;

    const navLinks = [
        { path: '/', label: t.nav_home },
        { path: '/about', label: t.nav_about },
        { path: '/gallery', label: t.nav_gallery },
        { path: '/pricing', label: t.nav_pricing },
        { path: '/contact', label: t.nav_contact },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
            <div className="header__inner container">
                <NavLink to="/" className="header__logo" onClick={closeMenu} aria-label="Airwall Home">
                    <svg className="header__logo-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 0L17.5 10.5L28 14L17.5 17.5L14 28L10.5 17.5L0 14L10.5 10.5L14 0Z" fill="url(#logo-gradient)" />
                        <defs>
                            <linearGradient id="logo-gradient" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#d4b35a" />
                                <stop offset="0.5" stopColor="#e8cc78" />
                                <stop offset="1" stopColor="#c9a84c" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span className="header__logo-text">Airwall</span>
                </NavLink>

                <nav className="header__nav" aria-label="Main navigation">
                    <ul className="header__nav-list">
                        {navLinks.map(link => (
                            <li key={link.path} className="header__nav-item">
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                                    }
                                    end={link.path === '/'}
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="header__actions">
                    <LanguageSwitcher />
                    <ThemeToggle />
                    <button
                        className={`header__burger ${isMenuOpen ? 'header__burger--open' : ''}`}
                        onClick={() => setIsMenuOpen(prev => !prev)}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                        <span className="header__burger-line" />
                        <span className="header__burger-line" />
                        <span className="header__burger-line" />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="header__mobile-menu"
                        id="mobile-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <nav aria-label="Mobile navigation">
                            <ul className="header__mobile-list">
                                {navLinks.map((link, i) => (
                                    <motion.li
                                        key={link.path}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.08, duration: 0.3 }}
                                    >
                                        <NavLink
                                            to={link.path}
                                            className={({ isActive }) =>
                                                `header__mobile-link ${isActive ? 'header__mobile-link--active' : ''}`
                                            }
                                            onClick={closeMenu}
                                            end={link.path === '/'}
                                        >
                                            {link.label}
                                        </NavLink>
                                    </motion.li>
                                ))}
                            </ul>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
