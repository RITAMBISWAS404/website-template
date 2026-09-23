import { Link } from 'react-router-dom';
import Picture from '../ui/Picture.jsx';

/**
 * Premium hero gallery: a slow, continuous editorial strip. The photo list is rendered
 * twice and the track travels exactly one copy's width, so the loop has no visible reset.
 * Pure CSS transform animation; motion is off under prefers-reduced-motion.
 */
export default function HeroRotator({ properties }) {
  const withImages = properties.filter((p) => p.images.length);
  // Interleave so neighbouring photos come from different properties.
  const items = [];
  for (let round = 0; round < 2; round += 1) {
    withImages.forEach((p) => {
      const img = p.images[round];
      if (img) items.push({ key: `${p.id}-${round}`, src: img.src, propertyId: p.id, name: p.name, locality: p.locality });
    });
  }
  if (!items.length) return null;

  const renderSet = (hidden) =>
    items.map((item) => (
      <Link
        key={item.key}
        to={`/property/${item.propertyId}`}
        className="hero__tile hero__strip-item"
        aria-label={hidden ? undefined : `${item.name}, ${item.locality}`}
        aria-hidden={hidden || undefined}
        tabIndex={hidden ? -1 : undefined}
      >
        <Picture src={item.src} alt="" sizes="(min-width: 768px) 32vw, 76vw" priority />
        <span className="hero__tile-label">
          {item.name}
          <span> · {item.locality}</span>
        </span>
      </Link>
    ));

  return (
    <div className="hero__strip rise" style={{ '--i': 2, '--n': items.length }}>
      <div className="hero__strip-track">
        {renderSet(false)}
        {renderSet(true)}
      </div>
    </div>
  );
}
