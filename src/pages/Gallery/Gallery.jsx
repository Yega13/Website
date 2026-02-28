import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import translations from '../../data/translations';
import { galleryImages } from '../../data/galleryData';
import GalleryModal from '../../components/GalleryModal/GalleryModal';
import SkyBackground from '../../components/SkyBackground/SkyBackground';
import './Gallery.css';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
    }),
};

export default function Gallery() {
    const { language } = useLanguage();
    const t = translations[language] || translations.en;
    const [modalOpen, setModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        document.title = 'Gallery — Airwall | Our Sequin Wall Portfolio';
    }, []);

    const openModal = (index) => {
        setCurrentIndex(index);
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    const goToPrev = useCallback(() => {
        setCurrentIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    }, []);

    const goToNext = useCallback(() => {
        setCurrentIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    }, []);

    return (
        <main className="gallery-page">
            <SkyBackground />
            {/* ——— HERO ——— */}
            <section className="gallery-page__hero" aria-label="Gallery hero">
                <div className="gallery-page__hero-overlay" />
                <div className="gallery-page__hero-content container">
                    <motion.span
                        className="gallery-page__hero-tag"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {t.gallery_hero_tag}
                    </motion.span>
                    <motion.h1
                        className="gallery-page__hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        {t.gallery_hero_title}
                    </motion.h1>
                    <motion.p
                        className="gallery-page__hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {t.gallery_hero_subtitle}
                    </motion.p>
                </div>
            </section>

            {/* ——— GALLERY GRID ——— */}
            <section className="gallery-page__content" aria-label="Gallery images">
                <div className="container">
                    <motion.div className="gallery-page__grid" layout>
                        {galleryImages.map((image, i) => (
                            <motion.div
                                className="gallery-page__item"
                                key={image.id}
                                layout
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-40px' }}
                                custom={i % 6}
                                onClick={() => openModal(i)}
                                role="button"
                                tabIndex={0}
                                aria-label={`View ${image.alt}`}
                                onKeyDown={(e) => e.key === 'Enter' && openModal(i)}
                            >
                                <div className="gallery-page__item-inner">
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="gallery-page__item-image"
                                        loading="lazy"
                                    />
                                    <div className="gallery-page__item-overlay">
                                        <span className="gallery-page__item-zoom">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="11" cy="11" r="8" />
                                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                                <line x1="11" y1="8" x2="11" y2="14" />
                                                <line x1="8" y1="11" x2="14" y2="11" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Modal */}
            <GalleryModal
                images={galleryImages}
                currentIndex={currentIndex}
                isOpen={modalOpen}
                onClose={closeModal}
                onPrev={goToPrev}
                onNext={goToNext}
            />
        </main>
    );
}
