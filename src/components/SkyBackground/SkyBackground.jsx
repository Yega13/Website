import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import './SkyBackground.css';

export default function SkyBackground() {
    const { theme } = useContext(ThemeContext);
    const isLight = theme === 'light';

    return (
        <div className="sky-background" aria-hidden="true">
            {/* Dark mode: star particles */}
            {!isLight && (
                <div className="sky-particles">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <span
                            key={i}
                            className="sky-particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${2 + Math.random() * 3}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Light mode: photorealistic image clouds */}
            {isLight && (
                <div className="sky-clouds" aria-hidden="true">
                    <img src="/cloud.png" alt="" className="sky-cloud-img sky-cloud-img--1" />
                    <img src="/cloud.png" alt="" className="sky-cloud-img sky-cloud-img--2" />
                    <img src="/cloud.png" alt="" className="sky-cloud-img sky-cloud-img--3" />
                    <img src="/cloud.png" alt="" className="sky-cloud-img sky-cloud-img--4" />
                </div>
            )}
        </div>
    );
}
