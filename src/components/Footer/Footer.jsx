import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import translations from '../../data/translations';
import './Footer.css';

const socialLinks = [
    {
        label: 'Instagram',
        url: 'https://www.instagram.com/airwall_official_',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        label: 'TikTok',
        url: 'https://www.tiktok.com/@airwall_official',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.01-12.07z" />
            </svg>
        ),
    },
    {
        label: 'Facebook',
        url: 'https://www.facebook.com/profile.php?id=61553184104800',
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
    },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { language } = useLanguage();
    const t = translations[language] || translations.en;

    const footerLinks = [
        { label: t.nav_home, path: '/' },
        { label: t.nav_about, path: '/about' },
        { label: t.nav_gallery, path: '/gallery' },
        { label: t.nav_pricing, path: '/pricing' },
        { label: t.nav_contact, path: '/contact' },
    ];

    return (
        <footer className="footer" role="contentinfo">
            {/* Decorative top edge */}
            <div className="footer__edge" aria-hidden="true">
                <div className="footer__edge-line" />
                <div className="footer__edge-diamond">✦</div>
                <div className="footer__edge-line" />
            </div>

            <div className="footer__inner container">
                {/* Brand area — centered, large */}
                <div className="footer__brand">
                    <Link to="/" className="footer__logo" aria-label="Airwall Home">
                        <svg className="footer__logo-icon" width="36" height="36" viewBox="0 0 28 28" fill="none">
                            <path d="M14 0L17.5 10.5L28 14L17.5 17.5L14 28L10.5 17.5L0 14L10.5 10.5L14 0Z" fill="url(#footer-logo-grad)" />
                            <defs>
                                <linearGradient id="footer-logo-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#d4b35a" />
                                    <stop offset="0.5" stopColor="#e8cc78" />
                                    <stop offset="1" stopColor="#c9a84c" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <span className="footer__logo-text">Airwall</span>
                    </Link>
                    <p className="footer__tagline">{t.footer_tagline}</p>
                </div>

                {/* Main grid columns */}
                <div className="footer__grid">
                    {/* Navigation */}
                    <div className="footer__col">
                        <h3 className="footer__heading">{t.footer_quick_links}</h3>
                        <ul className="footer__links">
                            {footerLinks.map(link => (
                                <li key={link.path}>
                                    <Link to={link.path} className="footer__link">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer__col">
                        <h3 className="footer__heading">{t.footer_contact}</h3>
                        <ul className="footer__links">
                            <li>
                                <a href="tel:+37477371135" className="footer__link footer__link--contact">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                    +374 77 371 135
                                </a>
                            </li>
                            <li>
                                <a href="mailto:airwallam@gmail.com" className="footer__link footer__link--contact">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                    airwallam@gmail.com
                                </a>
                            </li>
                            <li>
                                <span className="footer__link footer__link--contact footer__link--static">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                    {t.contact_address}
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div className="footer__col">
                        <h3 className="footer__heading">{t.contact_hours_label}</h3>
                        <p className="footer__hours">{t.contact_hours}</p>
                        <div className="footer__socials-block">
                            <h3 className="footer__heading">{t.footer_follow}</h3>
                            <div className="footer__socials">
                                {socialLinks.map(social => (
                                    <a
                                        key={social.label}
                                        href={social.url}
                                        className="footer__social-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Visit our ${social.label}`}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="footer__bottom">
                    <p className="footer__copyright">{t.footer_copyright}</p>
                    <div className="footer__bottom-links">
                        <a href="#" className="footer__bottom-link">Privacy Policy</a>
                        <span className="footer__bottom-dot">·</span>
                        <a href="#" className="footer__bottom-link">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
