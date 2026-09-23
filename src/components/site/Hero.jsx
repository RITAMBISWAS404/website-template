import { Link } from 'react-router-dom';
import { BadgeCheck } from 'lucide-react';
import { useSite } from '../../context/SiteContext.jsx';
import { useOverlays } from '../../context/OverlayContext.jsx';
import Picture from '../ui/Picture.jsx';
import HeroRotator from './HeroRotator.jsx';

export default function Hero() {
  const { website, properties, theme } = useSite();
  const { openContact } = useOverlays();
  const { hero } = website;
  const featured = properties.filter((p) => p.images.length).slice(0, 3);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__copy">
          {hero.eyebrow && (
            <p className="pill hero__eyebrow rise" style={{ '--i': 0 }}>
              <BadgeCheck size={16} strokeWidth={2} aria-hidden="true" />
              {hero.eyebrow}
            </p>
          )}
          <h1 id="hero-title" className="hero__title rise" style={{ '--i': 1 }}>
            {hero.headline}
          </h1>
          <p className="hero__lede rise" style={{ '--i': 2 }}>
            {hero.subheadline}
          </p>
          <div className="hero__cta rise" style={{ '--i': 3 }}>
            <Link to={{ pathname: '/', hash: '#properties' }} className="btn btn--primary">
              {hero.primaryCtaLabel}
            </Link>
            <button type="button" className="btn btn--secondary" onClick={() => openContact()}>
              Contact owner
            </button>
          </div>
        </div>

        {theme === 'premium' ? (
          <HeroRotator properties={properties} />
        ) : (
          featured.length > 0 && (
          <div className={`hero__mosaic hero__mosaic--${featured.length} rise`} style={{ '--i': 2 }}>
            {featured.map((p, i) => (
              <Link key={p.id} to={`/property/${p.id}`} className="hero__tile" data-slot={i}>
                <Picture
                  src={p.images[0].src}
                  alt={p.images[0].alt}
                  sizes="(min-width: 1024px) 34vw, 90vw"
                  priority={i === 0}
                />
                <span className="hero__tile-label">
                  {p.name}
                  <span> · {p.locality}</span>
                </span>
              </Link>
            ))}
          </div>
          )
        )}
      </div>
    </section>
  );
}
