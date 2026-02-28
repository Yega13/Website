import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import translations from '../../data/translations';
import SkyBackground from '../../components/SkyBackground/SkyBackground';
import './Pricing.css';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
    }),
};

const sequinTypeIcons = [
    (<svg width="36" height="36" viewBox="0 0 24 24" fill="var(--color-accent-gold)" stroke="none"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" /></svg>),
    (<svg width="36" height="36" viewBox="0 0 24 24" fill="var(--color-accent-gold)" stroke="none"><rect x="2" y="2" width="20" height="20" rx="3" /></svg>),
    (<svg width="36" height="36" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="holo" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#ff6b9d" /><stop offset="33%" stopColor="#c9a84c" /><stop offset="66%" stopColor="#51c4d3" /><stop offset="100%" stopColor="#b76cfd" /></linearGradient></defs><polygon points="12,2 22,8 22,16 12,22 2,16 2,8" fill="url(#holo)" /></svg>),
    (<svg width="36" height="36" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e8e8e8" /><stop offset="50%" stopColor="#a0a0a0" /><stop offset="100%" stopColor="#e8e8e8" /></linearGradient></defs><rect x="2" y="2" width="20" height="20" rx="2" fill="url(#chrome)" /><line x1="6" y1="6" x2="18" y2="18" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" /><line x1="6" y1="10" x2="14" y2="18" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" /></svg>),
];

const sequinTypeColors = [
    ['#c9a84c', '#d4af37', '#f5d060', '#e6c35c'],
    ['#8b7355', '#a0522d', '#c9a84c', '#6b5b3e'],
    ['#ff6b9d', '#c9a84c', '#51c4d3', '#b76cfd'],
    ['#c0c0c0', '#e8e8e8', '#a0a0a0', '#d4d4d4'],
];

export default function Pricing() {
    const { language } = useLanguage();
    const t = translations[language] || translations.en;

    useEffect(() => {
        document.title = 'Pricing & Variety — Airwall | Sequin Wall Packages';
    }, []);

    const sequinTypes = [
        { name: t.pricing_type_classic, desc: t.pricing_type_classic_desc, icon: sequinTypeIcons[0], colors: sequinTypeColors[0] },
        { name: t.pricing_type_matte, desc: t.pricing_type_matte_desc, icon: sequinTypeIcons[1], colors: sequinTypeColors[1] },
        { name: t.pricing_type_holographic, desc: t.pricing_type_holographic_desc, icon: sequinTypeIcons[2], colors: sequinTypeColors[2] },
        { name: t.pricing_type_mirror, desc: t.pricing_type_mirror_desc, icon: sequinTypeIcons[3], colors: sequinTypeColors[3] },
    ];

    const plans = [
        {
            name: t.pricing_plan_starter,
            price: t.pricing_plan_starter_price,
            unit: t.pricing_plan_starter_unit,
            desc: t.pricing_plan_starter_desc,
            features: [t.pricing_plan_starter_f1, t.pricing_plan_starter_f2, t.pricing_plan_starter_f3, t.pricing_plan_starter_f4],
            badge: null,
            highlight: false,
        },
        {
            name: t.pricing_plan_pro,
            price: t.pricing_plan_pro_price,
            unit: t.pricing_plan_pro_unit,
            desc: t.pricing_plan_pro_desc,
            features: [t.pricing_plan_pro_f1, t.pricing_plan_pro_f2, t.pricing_plan_pro_f3, t.pricing_plan_pro_f4, t.pricing_plan_pro_f5],
            badge: t.pricing_plan_pro_badge,
            highlight: true,
        },
        {
            name: t.pricing_plan_premium,
            price: t.pricing_plan_premium_price,
            unit: t.pricing_plan_premium_unit,
            desc: t.pricing_plan_premium_desc,
            features: [t.pricing_plan_premium_f1, t.pricing_plan_premium_f2, t.pricing_plan_premium_f3, t.pricing_plan_premium_f4, t.pricing_plan_premium_f5, t.pricing_plan_premium_f6],
            badge: null,
            highlight: false,
        },
    ];

    return (
        <main className="pricing-page">
            <SkyBackground />
            {/* ——— HERO ——— */}
            <section className="pricing-page__hero" aria-label="Pricing hero">
                <div className="pricing-page__hero-overlay" />
                <div className="pricing-page__hero-content container">
                    <motion.span
                        className="pricing-page__hero-tag"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {t.pricing_hero_tag}
                    </motion.span>
                    <motion.h1
                        className="pricing-page__hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        {t.pricing_hero_title}
                    </motion.h1>
                    <motion.p
                        className="pricing-page__hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {t.pricing_hero_subtitle}
                    </motion.p>
                </div>
            </section>

            {/* ——— SEQUIN TYPES ——— */}
            <section className="pricing-page__types" aria-label="Sequin wall types">
                <div className="container">
                    <motion.div
                        className="pricing-page__section-header"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        <span className="pricing-page__section-tag">{t.pricing_types_tag}</span>
                        <h2 className="pricing-page__section-title">{t.pricing_types_title}</h2>
                        <p className="pricing-page__section-desc">{t.pricing_types_desc}</p>
                    </motion.div>

                    <div className="pricing-page__types-grid">
                        {sequinTypes.map((type, i) => (
                            <motion.div
                                className="pricing-page__type-card"
                                key={type.name}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-40px' }}
                                custom={i}
                            >
                                <div className="pricing-page__type-icon">{type.icon}</div>
                                <h3 className="pricing-page__type-name">{type.name}</h3>
                                <p className="pricing-page__type-desc">{type.desc}</p>
                                <div className="pricing-page__type-colors">
                                    {type.colors.map((c, j) => (
                                        <span
                                            key={j}
                                            className="pricing-page__type-swatch"
                                            style={{ background: c }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ——— PRICING PLANS (staircase) ——— */}
            <section className="pricing-page__plans" aria-label="Pricing plans">
                <div className="container">
                    <motion.div
                        className="pricing-page__section-header"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        <span className="pricing-page__section-tag">{t.pricing_plans_tag}</span>
                        <h2 className="pricing-page__section-title">{t.pricing_plans_title}</h2>
                        <p className="pricing-page__section-desc">{t.pricing_plans_desc}</p>
                    </motion.div>

                    <div className="pricing-page__plans-grid">
                        {plans.map((plan, i) => (
                            <motion.div
                                className={`pricing-page__plan-card pricing-page__plan-card--step-${i} ${plan.highlight ? 'pricing-page__plan-card--highlight' : ''}`}
                                key={plan.name}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-40px' }}
                                custom={i}
                            >
                                {plan.badge && (
                                    <span className="pricing-page__plan-badge">{plan.badge}</span>
                                )}
                                <h3 className="pricing-page__plan-name">{plan.name}</h3>
                                <div className="pricing-page__plan-price">
                                    <span className="pricing-page__plan-amount">{plan.price}</span>
                                    <span className="pricing-page__plan-unit">{plan.unit}</span>
                                </div>
                                <p className="pricing-page__plan-period">{t.pricing_per_event}</p>
                                <p className="pricing-page__plan-desc">{plan.desc}</p>
                                <ul className="pricing-page__plan-features">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="pricing-page__plan-feature">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-gold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/contact" className="pricing-page__plan-cta">
                                    {t.pricing_cta_button}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ——— CUSTOM CTA ——— */}
            <section className="pricing-page__custom" aria-label="Custom pricing">
                <div className="container">
                    <motion.div
                        className="pricing-page__custom-inner"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                    >
                        <span className="pricing-page__section-tag">{t.pricing_custom_tag}</span>
                        <h2 className="pricing-page__custom-title">{t.pricing_custom_title}</h2>
                        <p className="pricing-page__custom-desc">{t.pricing_custom_desc}</p>
                        <Link to="/contact" className="pricing-page__custom-btn">
                            {t.pricing_custom_button}
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
