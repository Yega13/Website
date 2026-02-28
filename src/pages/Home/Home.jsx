import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { ThemeContext } from '../../context/ThemeContext';
import translations from '../../data/translations';
import ArmeniaMap from '../../components/ArmeniaMap/ArmeniaMap';
import SkyBackground from '../../components/SkyBackground/SkyBackground';
import './Home.css';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
    }),
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

export default function Home() {
    const { language } = useLanguage();
    const t = translations[language] || translations.en;
    const { theme } = useContext(ThemeContext);
    const isLight = theme === 'light';

    useEffect(() => {
        document.title = 'Airwall — Premium Decorative Sequin Walls in Armenia';
    }, []);

    const features = [
        {
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#c9a84c" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            ),
            title: t.home_feat_weddings,
            description: t.home_feat_weddings_desc,
        },
        {
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#c9a84c" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ),
            title: t.home_feat_events,
            description: t.home_feat_events_desc,
        },
        {
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#c9a84c" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
                </svg>
            ),
            title: t.home_feat_interiors,
            description: t.home_feat_interiors_desc,
        },
    ];

    const testimonials = [
        {
            quote: 'Airwall transformed our wedding venue into a fairy tale. The golden sequin wall was absolutely breathtaking!',
            author: 'Anahit K.',
            role: 'Bride, Yerevan',
        },
        {
            quote: 'We use Airwall for all our corporate events. The quality and professionalism are unmatched in Armenia.',
            author: 'Arman G.',
            role: 'Event Manager, Dilijan',
        },
        {
            quote: 'Our hotel lobby features a permanent sequin wall installation. Guests are always mesmerized!',
            author: 'Lusine M.',
            role: 'Hotel Owner, Tsaghkadzor',
        },
    ];

    return (
        <main className="home">
            {/* =================== HERO =================== */}
            <section className="home__hero" aria-label="Hero">
                <div className="home__hero-shimmer" />
                <SkyBackground />
                <div className="home__hero-content container">
                    <motion.span
                        className="home__hero-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {t.home_badge}
                    </motion.span>
                    <motion.h1
                        className="home__hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        {t.home_title_1}
                        <span className="home__hero-title--accent">{t.home_title_2}</span>
                    </motion.h1>
                    <motion.p
                        className="home__hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {t.home_subtitle}
                    </motion.p>
                    <motion.div
                        className="home__hero-actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <Link to="/gallery" className="home__btn home__btn--primary">
                            {t.home_cta_gallery}
                        </Link>
                        <Link to="/contact" className="home__btn home__btn--secondary">
                            {t.home_cta_quote}
                        </Link>
                    </motion.div>
                </div>
                <div className="home__hero-scroll-indicator" aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="7 13 12 18 17 13" />
                        <polyline points="7 6 12 11 17 6" />
                    </svg>
                </div>
            </section>

            {/* =================== FEATURES =================== */}
            <section className="home__features" aria-label="What we do">
                <div className="container">
                    <motion.div
                        className="home__section-header"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                    >
                        <span className="home__section-tag">{t.home_section_tag}</span>
                        <h2 className="home__section-title">{t.home_section_title}</h2>
                        <p className="home__section-desc">{t.home_section_desc}</p>
                    </motion.div>

                    <motion.div
                        className="home__features-grid"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        {features.map((feature, i) => (
                            <motion.article
                                className="home__feature-card"
                                key={i}
                                variants={fadeUp}
                                custom={i}
                            >
                                <div className="home__feature-icon">{feature.icon}</div>
                                <h3 className="home__feature-title">{feature.title}</h3>
                                <p className="home__feature-desc">{feature.description}</p>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* =================== SHOWCASE STATS =================== */}
            <section className="home__stats" aria-label="Our achievements">
                <div className="container">
                    <motion.div
                        className="home__stats-grid"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        {[
                            { number: '100+', label: t.home_stats_events },
                            { number: '7', label: t.home_stats_cities },
                            { number: '25+', label: t.home_stats_clients },
                            { number: '100%', label: t.home_stats_years },
                        ].map((stat, i) => (
                            <motion.div className="home__stat" key={stat.label} variants={fadeUp} custom={i}>
                                <span className="home__stat-number">{stat.number}</span>
                                <span className="home__stat-label">{stat.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* =================== TESTIMONIALS =================== */}
            <section className="home__testimonials" aria-label="Testimonials">
                <div className="container">
                    <motion.div
                        className="home__section-header"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                    >
                        <span className="home__section-tag">{t.home_testimonials_tag}</span>
                        <h2 className="home__section-title">{t.home_testimonials_title}</h2>
                    </motion.div>

                    <motion.div
                        className="home__testimonials-grid"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        {testimonials.map((tm, i) => (
                            <motion.blockquote
                                className="home__testimonial"
                                key={tm.author}
                                variants={fadeUp}
                                custom={i}
                            >
                                <div className="home__testimonial-stars">★★★★★</div>
                                <p className="home__testimonial-quote">&ldquo;{tm.quote}&rdquo;</p>
                                <footer className="home__testimonial-author">
                                    <strong>{tm.author}</strong>
                                    <span>{tm.role}</span>
                                </footer>
                            </motion.blockquote>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* =================== MAP =================== */}
            <section className="home__map" aria-label="Our locations across Armenia">
                <div className="container">
                    <motion.div
                        className="home__section-header"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                    >
                        <span className="home__section-tag">{t.home_map_tag}</span>
                        <h2 className="home__section-title">{t.home_map_title}</h2>
                        <p className="home__section-desc">{t.home_map_desc}</p>
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        <ArmeniaMap />
                    </motion.div>
                </div>
            </section>

            {/* =================== CTA =================== */}
            <section className="home__cta" aria-label="Call to action">
                <div className="container">
                    <motion.div
                        className="home__cta-inner"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="home__cta-title">{t.home_cta_title}</h2>
                        <p className="home__cta-desc">{t.home_cta_desc}</p>
                        <Link to="/contact" className="home__btn home__btn--primary home__btn--large">
                            {t.home_cta_button}
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
