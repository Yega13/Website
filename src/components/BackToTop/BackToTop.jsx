import { AnimatePresence, motion } from 'framer-motion';
import { useScrollTop } from '../../hooks/useScrollTop';
import './BackToTop.css';

export default function BackToTop() {
    const { isVisible, scrollToTop } = useScrollTop(300);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    className="back-to-top"
                    onClick={scrollToTop}
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ duration: 0.3, type: 'spring', stiffness: 260 }}
                    aria-label="Back to top"
                    title="Back to top"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="18 15 12 9 6 15" />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
