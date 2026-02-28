import { useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './GalleryModal.css';

export default function GalleryModal({ images, currentIndex, isOpen, onClose, onPrev, onNext }) {
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handleKeyDown = useCallback((e) => {
        if (!isOpen) return;
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') onPrev();
        if (e.key === 'ArrowRight') onNext();
    }, [isOpen, onClose, onPrev, onNext]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.classList.add('modal-open');
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
            document.body.classList.remove('modal-open');
        };
    }, [handleKeyDown, isOpen]);

    const handleTouchStart = (e) => {
        touchStartX.current = e.changedTouches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        touchEndX.current = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 50) {
            if (diff > 0) onNext();
            else onPrev();
        }
    };

    // Click on the content area (but not on image/arrows/buttons) should close
    const handleContentClick = (e) => {
        // Only close if clicking the content div itself, not child elements
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen || !images[currentIndex]) return null;

    const image = images[currentIndex];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="gallery-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Gallery image viewer"
                >
                    <div
                        className="gallery-modal__content"
                        onClick={handleContentClick}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <button
                            className="gallery-modal__close"
                            onClick={(e) => { e.stopPropagation(); onClose(); }}
                            aria-label="Close gallery"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        <button
                            className="gallery-modal__arrow gallery-modal__arrow--left"
                            onClick={(e) => { e.stopPropagation(); onPrev(); }}
                            aria-label="Previous image"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>

                        <motion.div
                            className="gallery-modal__image-wrapper"
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="gallery-modal__image"
                                loading="eager"
                            />
                        </motion.div>

                        <button
                            className="gallery-modal__arrow gallery-modal__arrow--right"
                            onClick={(e) => { e.stopPropagation(); onNext(); }}
                            aria-label="Next image"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>

                        <div className="gallery-modal__counter" onClick={(e) => e.stopPropagation()}>
                            {currentIndex + 1} / {images.length}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
