import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import Picture from '../ui/Picture.jsx';
import AvailabilityBadge from './AvailabilityBadge.jsx';
import { useCapabilities } from '../../context/SiteContext.jsx';
import { formatRent } from '../../lib/format.js';
import { describePropertyAvailability, getSharingLabels, getStartingRent } from '../../lib/property.js';

const MAX_SLIDES = 5;

function CardImages({ property, to, sizes }) {
  const images = property.images.slice(0, MAX_SLIDES);
  const scroller = useRef(null);
  const [index, setIndex] = useState(0);

  const onScroll = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return undefined;
    let raf = 0;
    const handler = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(onScroll);
    };
    el.addEventListener('scroll', handler, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', handler);
    };
  }, [onScroll]);

  const go = (dir) => {
    const el = scroller.current;
    el?.scrollTo({ left: (index + dir) * el.clientWidth, behavior: 'smooth' });
  };

  if (!images.length) return <div className="pcard__media pcard__media--empty" />;

  return (
    <div className="pcard__media">
      <Link to={to} className="pcard__imglink" tabIndex={-1} aria-hidden="true">
        <div className="pcard__scroller" ref={scroller}>
          {images.map((img) => (
            <div className="pcard__slide" key={img.src}>
              <Picture src={img.src} alt={img.alt} sizes={sizes} />
            </div>
          ))}
        </div>
      </Link>

      {property.directOwner && <span className="badge pcard__badge">Direct owner</span>}

      {images.length > 1 && (
        <>
          <button
            type="button"
            className="pcard__arrow pcard__arrow--prev"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label={`Previous photo of ${property.name}`}
          >
            <ChevronLeft size={16} strokeWidth={2.25} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="pcard__arrow pcard__arrow--next"
            onClick={() => go(1)}
            disabled={index === images.length - 1}
            aria-label={`Next photo of ${property.name}`}
          >
            <ChevronRight size={16} strokeWidth={2.25} aria-hidden="true" />
          </button>
          <div className="pcard__dots" aria-hidden="true">
            {images.map((img, i) => (
              <span key={img.src} className={i === index ? 'is-active' : ''} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * The single reusable property card. Data in, card out: nothing here is
 * property-specific, and Advanced-only bits are gated by capabilities.
 */
export default function PropertyCard({ property, sizes = '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw' }) {
  const { liveAvailability } = useCapabilities();
  const to = `/property/${property.id}`;
  const rent = getStartingRent(property);
  const sharing = getSharingLabels(property);
  const availability = liveAvailability ? describePropertyAvailability(property) : null;

  return (
    <article className="pcard">
      <CardImages property={property} to={to} sizes={sizes} />
      <div className="pcard__body">
        <div className="pcard__top">
          <p className="pcard__type">{property.propertyType}</p>
          <AvailabilityBadge status={availability} />
        </div>
        <h3 className="pcard__title">
          <Link to={to} className="pcard__link">
            {property.name}
          </Link>
        </h3>
        <p className="pcard__loc">
          <MapPin size={14} strokeWidth={1.75} aria-hidden="true" />
          {property.locality}, {property.city}
        </p>
        {(rent != null || sharing.length > 0) && (
          <div className="pcard__foot">
            {rent != null && (
              <p className="pcard__price">
                <span className="pcard__from">From</span>
                <strong className="num">{formatRent(rent)}</strong>
                <span className="pcard__per">/ month</span>
              </p>
            )}
            {sharing.length > 0 && <p className="pcard__sharing">{sharing.join(' · ')}</p>}
          </div>
        )}
      </div>
    </article>
  );
}
