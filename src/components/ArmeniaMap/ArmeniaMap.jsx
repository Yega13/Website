import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { customerLocations, armeniaCenter, armeniaZoom } from '../../data/mapLocations';
import './ArmeniaMap.css';

export default function ArmeniaMap({ singleLocation = false }) {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);

    useEffect(() => {
        if (mapInstanceRef.current || !mapRef.current) return;

        const map = L.map(mapRef.current, {
            center: armeniaCenter,
            zoom: armeniaZoom,
            scrollWheelZoom: false,
            attributionControl: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 18,
        }).addTo(map);

        const goldIcon = L.divIcon({
            className: 'map-marker',
            html: `<div class="map-marker__pin">
               <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
                 <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="#c9a84c"/>
                 <circle cx="14" cy="14" r="6" fill="#fff"/>
               </svg>
             </div>`,
            iconSize: [28, 36],
            iconAnchor: [14, 36],
            popupAnchor: [0, -36],
        });

        const locations = singleLocation
            ? customerLocations.filter(loc => loc.name === 'Yerevan')
            : customerLocations;

        locations.forEach(location => {
            L.marker(location.coords, { icon: goldIcon })
                .addTo(map)
                .bindPopup(
                    `<div class="map-popup">
            <strong>${location.name}</strong>
            <p>${location.description}</p>
          </div>`,
                    { className: 'map-popup-wrapper' }
                );
        });

        mapInstanceRef.current = map;

        return () => {
            map.remove();
            mapInstanceRef.current = null;
        };
    }, [singleLocation]);

    return (
        <div className="armenia-map" ref={mapRef} role="img" aria-label="Map of Armenia showing Airwall customer locations" />
    );
}
