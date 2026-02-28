import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import translations from '../../data/translations';
import { sanitizeInput, isValidEmail, isValidPhone, createRateLimiter } from '../../utils/sanitize';
import ArmeniaMap from '../../components/ArmeniaMap/ArmeniaMap';
import SkyBackground from '../../components/SkyBackground/SkyBackground';
import './Contact.css';

const rateLimiter = createRateLimiter(3, 60000);

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
    }),
};

export default function Contact() {
    const { language } = useLanguage();
    const t = translations[language] || translations.en;

    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [errors, setErrors] = useState({});
    const [formStatus, setFormStatus] = useState('idle');
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterStatus, setNewsletterStatus] = useState('idle');
    const honeypotRef = useRef(null);

    useEffect(() => { document.title = 'Contact — Airwall | Get in Touch'; }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!isValidEmail(formData.email)) newErrors.email = 'Please enter a valid email';
        if (formData.phone && !isValidPhone(formData.phone)) newErrors.phone = 'Invalid phone number';
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        else if (formData.message.trim().length < 10) newErrors.message = 'At least 10 characters';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (honeypotRef.current?.value) return;
        if (!rateLimiter()) { setFormStatus('rate-limited'); return; }
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
        const sanitized = {
            name: sanitizeInput(formData.name),
            email: sanitizeInput(formData.email),
            phone: sanitizeInput(formData.phone),
            message: sanitizeInput(formData.message),
        };
        console.log('Contact form submitted:', sanitized);
        setFormStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
    };

    const handleNewsletter = (e) => {
        e.preventDefault();
        if (!isValidEmail(newsletterEmail)) { setNewsletterStatus('error'); return; }
        console.log('Newsletter signup:', sanitizeInput(newsletterEmail));
        setNewsletterStatus('success');
        setNewsletterEmail('');
        setTimeout(() => setNewsletterStatus('idle'), 5000);
    };

    return (
        <main className="contact">
            <SkyBackground />
            {/* HERO */}
            <section className="contact__hero" aria-label="Contact hero">
                <div className="contact__hero-overlay" />
                <div className="contact__hero-content container">
                    <motion.span className="contact__hero-tag" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        {t.contact_hero_tag}
                    </motion.span>
                    <motion.h1 className="contact__hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
                        {t.contact_hero_title}
                    </motion.h1>
                    <motion.p className="contact__hero-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                        {t.contact_hero_subtitle}
                    </motion.p>
                </div>
            </section>

            {/* FORM + INFO */}
            <section className="contact__main" aria-label="Contact form">
                <div className="container">
                    <div className="contact__grid">
                        <motion.div className="contact__form-wrapper" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
                            <h2 className="contact__form-title">{t.contact_form_title}</h2>
                            <form className="contact__form" onSubmit={handleSubmit} noValidate>
                                <div className="contact__honeypot" aria-hidden="true">
                                    <input type="text" name="website" ref={honeypotRef} tabIndex={-1} autoComplete="off" />
                                </div>

                                <div className="contact__field">
                                    <label htmlFor="contact-name" className="contact__label">{t.contact_name} *</label>
                                    <input id="contact-name" type="text" name="name" className={`contact__input ${errors.name ? 'contact__input--error' : ''}`} value={formData.name} onChange={handleChange} maxLength={100} required />
                                    {errors.name && <span className="contact__error">{errors.name}</span>}
                                </div>

                                <div className="contact__field">
                                    <label htmlFor="contact-email" className="contact__label">{t.contact_email} *</label>
                                    <input id="contact-email" type="email" name="email" className={`contact__input ${errors.email ? 'contact__input--error' : ''}`} value={formData.email} onChange={handleChange} placeholder="your@email.com" maxLength={200} required />
                                    {errors.email && <span className="contact__error">{errors.email}</span>}
                                </div>

                                <div className="contact__field">
                                    <label htmlFor="contact-phone" className="contact__label">{t.contact_phone}</label>
                                    <input id="contact-phone" type="tel" name="phone" className={`contact__input ${errors.phone ? 'contact__input--error' : ''}`} value={formData.phone} onChange={handleChange} placeholder="+374 XX XXX XXX" maxLength={20} />
                                    {errors.phone && <span className="contact__error">{errors.phone}</span>}
                                </div>

                                <div className="contact__field">
                                    <label htmlFor="contact-message" className="contact__label">{t.contact_message} *</label>
                                    <textarea id="contact-message" name="message" className={`contact__textarea ${errors.message ? 'contact__input--error' : ''}`} value={formData.message} onChange={handleChange} rows={5} maxLength={2000} required />
                                    {errors.message && <span className="contact__error">{errors.message}</span>}
                                </div>

                                <button type="submit" className="contact__submit" disabled={formStatus === 'success'}>
                                    {formStatus === 'success' ? `✓ ${t.contact_success}` : t.contact_send}
                                </button>
                                {formStatus === 'rate-limited' && <p className="contact__rate-limit">{t.contact_rate_limit}</p>}
                            </form>
                        </motion.div>

                        <motion.div className="contact__info" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} custom={1}>
                            <div className="contact__info-card">
                                <h3 className="contact__info-title">{t.contact_info_title}</h3>
                                <div className="contact__info-item">
                                    <div className="contact__info-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg></div>
                                    <div><strong>{t.contact_address_label}</strong><p>{t.contact_address}</p></div>
                                </div>
                                <div className="contact__info-item">
                                    <div className="contact__info-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg></div>
                                    <div><strong>{t.contact_phone_label}</strong><p><a href="tel:+37477371135">+374 77 371 135</a></p></div>
                                </div>
                                <div className="contact__info-item">
                                    <div className="contact__info-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg></div>
                                    <div><strong>{t.contact_email_label}</strong><p><a href="mailto:airwallam@gmail.com">airwallam@gmail.com</a></p></div>
                                </div>
                                <div className="contact__info-item">
                                    <div className="contact__info-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg></div>
                                    <div><strong>{t.contact_hours_label}</strong><p>{t.contact_hours}</p></div>
                                </div>
                            </div>

                            <div className="contact__socials-card">
                                <h3 className="contact__info-title">{t.contact_social_title}</h3>
                                <div className="contact__socials">
                                    <a href="https://www.instagram.com/airwall_official_" target="_blank" rel="noopener noreferrer" className="contact__social-link" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg></a>
                                    <a href="https://www.tiktok.com/@airwall_official" target="_blank" rel="noopener noreferrer" className="contact__social-link" aria-label="TikTok"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.01-12.07z" /></svg></a>
                                    <a href="https://www.facebook.com/profile.php?id=61553184104800" target="_blank" rel="noopener noreferrer" className="contact__social-link" aria-label="Facebook"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* NEWSLETTER */}
            <section className="contact__newsletter" aria-label="Newsletter">
                <div className="container">
                    <motion.div className="contact__newsletter-inner" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
                        <div className="contact__newsletter-text">
                            <h2 className="contact__newsletter-title">{t.contact_newsletter_title}</h2>
                            <p className="contact__newsletter-desc">{t.contact_newsletter_desc}</p>
                        </div>
                        <form className="contact__newsletter-form" onSubmit={handleNewsletter} noValidate>
                            <input type="email" className="contact__newsletter-input" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} placeholder={t.contact_newsletter_placeholder} maxLength={200} required aria-label="Newsletter email" />
                            <button type="submit" className="contact__newsletter-btn">
                                {newsletterStatus === 'success' ? `✓ ${t.contact_newsletter_success}` : t.contact_newsletter_button}
                            </button>
                        </form>
                        {newsletterStatus === 'error' && <p className="contact__newsletter-error">Please enter a valid email.</p>}
                    </motion.div>
                </div>
            </section>

            {/* MAP */}
            <section className="contact__map-section" aria-label="Location">
                <div className="container">
                    <motion.div className="contact__map-header" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
                        <span className="contact__section-tag">{t.contact_map_tag}</span>
                        <h2 className="contact__section-title">{t.contact_map_title}</h2>
                    </motion.div>
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
                        <ArmeniaMap singleLocation />
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
