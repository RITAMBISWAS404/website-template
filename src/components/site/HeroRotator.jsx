import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Picture from '../ui/Picture.jsx';

const PERIOD_MS = 7000;

/** One column of the hero: two stacked layers that cross-fade to the next photo. */
function RotatingTile({ pool, start, step, delay, position, priority }) {
  const n = pool.length;
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (n < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let interval;
    const advance = () => {
      if (!document.hidden) setTick((t) => t + 1);
    };
    const first = setTimeout(() => {
      advance();
      interval = setInterval(advance, PERIOD_MS);
    }, delay);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, [n, delay]);

  const at = (k) => pool[(((start + k * step) % n) + n) % n];
  const current = at(tick);
  const previous = tick > 0 ? at(tick - 1) : null;
  const front = tick % 2;

  return (
    <Link
      to={`/property/${current.propertyId}`}
      className={`hero__tile hero__tile--${position}`}
      aria-label={`${current.name}, ${current.locality}`}
    >
      {[0, 1].map((layer) => {
        const item = layer === front ? current : previous;
        return (
          <div key={layer} className={`hero__layer ${layer === front ? 'is-front' : ''}`} aria-hidden={layer !== front}>
            {item && <Picture src={item.src} alt="" sizes={position === 'center' ? '(min-width: 1024px) 40vw, 50vw' : '(min-width: 1024px) 20vw, 25vw'} priority={priority && layer === front} />}
          </div>
        );
      })}
      <span className="hero__tile-label">
        {current.name}
        <span> · {current.locality}</span>
      </span>
    </Link>
  );
}

/**
 * Premium hero: three containers at 25% / 50% / 25% whose photos rotate slowly
 * and out of phase, so the composition is always three different properties.
 */
export default function HeroRotator({ properties }) {
  const withImages = properties.filter((p) => p.images.length);
  // Interleave so consecutive pool entries come from different properties.
  const pool = [];
  for (let round = 0; round < 2; round += 1) {
    withImages.forEach((p) => {
      const img = p.images[round];
      if (img) pool.push({ src: img.src, propertyId: p.id, name: p.name, locality: p.locality });
    });
  }
  if (!pool.length) return null;

  return (
    <div className="hero__mosaic hero__mosaic--rotating rise" style={{ '--i': 2 }}>
      <RotatingTile pool={pool} start={1} step={3} delay={2400} position="left" />
      <RotatingTile pool={pool} start={0} step={3} delay={0} position="center" priority />
      <RotatingTile pool={pool} start={2} step={3} delay={4800} position="right" />
    </div>
  );
}
