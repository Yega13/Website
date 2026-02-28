import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import translations from '../../data/translations';
import SkyBackground from '../../components/SkyBackground/SkyBackground';
import './About.css';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' },
    }),
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

export default function About() {
    const { language } = useLanguage();
    const t = translations[language] || translations.en;

    useEffect(() => {
        document.title = 'About Us — Airwall | Our Story & Values';
    }, []);

    const values = [
        {
            icon: (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="#c9a84c" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 3h12l4 6-10 13L2 9z" />
                </svg>
            ),
            title: t.about_val_quality,
            description: t.about_val_quality_desc,
        },
        {
            icon: (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="#c9a84c" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    <circle cx="7.5" cy="11.5" r="2" fill="#b89840" />
                    <circle cx="14" cy="7" r="2" fill="#b89840" />
                    <circle cx="16.5" cy="14.5" r="2" fill="#b89840" />
                </svg>
            ),
            title: t.about_val_creativity,
            description: t.about_val_creativity_desc,
        },
        {
            icon: (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="#c9a84c" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
            ),
            title: t.about_val_customer,
            description: t.about_val_customer_desc,
        },
        {
            icon: (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="#c9a84c" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
            ),
            title: t.about_val_reliability,
            description: t.about_val_reliability_desc,
        },
    ];

    const milestones = [
        { year: '2021', title: t.about_ms_2021, description: t.about_ms_2021_desc },
        { year: '2022', title: t.about_ms_2022, description: t.about_ms_2022_desc },
        { year: '2023', title: t.about_ms_2023, description: t.about_ms_2023_desc },
        { year: '2024', title: t.about_ms_2024, description: t.about_ms_2024_desc },
        { year: '2025', title: t.about_ms_2025, description: t.about_ms_2025_desc },
    ];

    return (
        <main className="about">
            <SkyBackground />
            {/* ——— HERO ——— */}
            <section className="about__hero" aria-label="About hero">
                <div className="about__hero-overlay" />
                <div className="about__hero-content container">
                    <motion.span
                        className="about__hero-tag"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {t.about_hero_tag}
                    </motion.span>
                    <motion.h1
                        className="about__hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        {t.about_hero_title}
                    </motion.h1>
                    <motion.p
                        className="about__hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {t.about_hero_subtitle}
                    </motion.p>
                </div>
            </section>

            {/* ——— STORY ——— */}
            <section className="about__story" aria-label="Our story">
                <div className="container">
                    <div className="about__story-grid">
                        <motion.div
                            className="about__story-image"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="about__story-image-wrapper">
                                <div className="about__story-image-placeholder">
                                    <span className="about__story-image-icon">✦</span>
                                    <span>Our Workshop</span>
                                </div>
                            </div>
                            <div className="about__story-image-accent" />
                        </motion.div>

                        <motion.div
                            className="about__story-text"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <span className="about__section-tag">{t.about_story_tag}</span>
                            <h2 className="about__section-title">{t.about_story_title}</h2>
                            <p>{t.about_story_p1}</p>
                            <p>{t.about_story_p2}</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ——— VALUES ——— */}
            <section className="about__values" aria-label="Our values">
                <div className="container">
                    <motion.div
                        className="about__section-header"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                    >
                        <span className="about__section-tag">{t.about_values_tag}</span>
                        <h2 className="about__section-title">{t.about_values_title}</h2>
                    </motion.div>

                    <motion.div
                        className="about__values-grid"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        {values.map((value, i) => (
                            <motion.article
                                className="about__value-card"
                                key={i}
                                variants={fadeUp}
                                custom={i}
                            >
                                <div className="about__value-icon">{value.icon}</div>
                                <h3 className="about__value-title">{value.title}</h3>
                                <p className="about__value-desc">{value.description}</p>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ——— MILESTONES ——— */}
            <section className="about__milestones" aria-label="Company milestones">
                <div className="container">
                    <motion.div
                        className="about__section-header"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                    >
                        <span className="about__section-tag">{t.about_milestones_tag}</span>
                        <h2 className="about__section-title">{t.about_milestones_title}</h2>
                    </motion.div>

                    <div className="about__milestones-track">
                        <div className="about__milestones-line" />
                        <div className="about__milestones-scroll">
                            {milestones.map((milestone, i) => (
                                <motion.div
                                    className="about__milestone-card"
                                    key={milestone.year}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ duration: 0.5, delay: i * 0.12 }}
                                >
                                    <div className="about__milestone-year-badge">
                                        {milestone.year}
                                    </div>
                                    <div className="about__milestone-dot" />
                                    <div className="about__milestone-body">
                                        <h3 className="about__milestone-title">{milestone.title}</h3>
                                        <p className="about__milestone-desc">{milestone.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
