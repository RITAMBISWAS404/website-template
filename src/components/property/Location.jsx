import { MapPin } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';

/**
 * Approximate location only. The data model carries a fuzzed centre point and a
 * radius, never a street address, and the UI draws an area rather than a pin.
 */
const bboxFor = ({ lat, lng, radiusM }) => {
  const halfLat = (radiusM * 3.4) / 111320;
  const halfLng = halfLat / Math.cos((lat * Math.PI) / 180);
  return [lng - halfLng, lat - halfLat / 1.9, lng + halfLng, lat + halfLat / 1.9].map((n) => n.toFixed(5)).join('%2C');
};

export default function Location({ property }) {
  const { location } = property;
  if (!location) return null;

  return (
    <>
      <SectionHeading id="location-title" meta="Location" title="Where you’ll be" />
      <div className="location">
        <p className="location__place">
          <span className="icon-well icon-well--brand" aria-hidden="true">
            <MapPin size={20} strokeWidth={1.5} />
          </span>
          <span>
            <strong>{location.locality}, {location.city}</strong>
            <span className="location__hint">Approximate area shown</span>
          </span>
        </p>

      {location.approx && (
        <figure className="map">
          <div className="map__frame">
            <iframe
              title={`Map of the area around ${property.name}`}
              loading="lazy"
              tabIndex={-1}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${bboxFor(location.approx)}&layer=mapnik`}
            />
            <span className="map__area" aria-hidden="true">
              <span className="map__core" />
            </span>
          </div>
          <figcaption className="map__cap">
            Approximate area. The owner shares the exact address once you get in touch. Map ©{' '}
            <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="map__credit">
              OpenStreetMap contributors<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </figcaption>
        </figure>
      )}
      </div>
    </>
  );
}
