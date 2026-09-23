import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import PropertyCard from './PropertyCard.jsx';

/** Horizontal, snap-scrolling row of property cards with arrow controls (desktop). */
export default function CardRow({ title, meta, properties, headingId }) {
  const ref = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    });
  }, []);

  useEffect(() => {
    measure();
    const el = ref.current;
    if (!el) return undefined;
    el.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      el.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [measure, properties.length]);

  const scrollBy = (dir) => {
    const el = ref.current;
    el?.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
  };

  const canScroll = !(edges.start && edges.end);

  return (
    <section className="row" aria-labelledby={headingId}>
      <div className="row__head">
        <SectionHeading id={headingId} meta={meta} title={title} size="sm" />
        {canScroll && (
          <div className="row__arrows">
            <button type="button" className="icon-btn icon-btn--raised" onClick={() => scrollBy(-1)} disabled={edges.start} aria-label={`Scroll ${title} left`}>
              <ChevronLeft size={16} strokeWidth={2.25} aria-hidden="true" />
            </button>
            <button type="button" className="icon-btn icon-btn--raised" onClick={() => scrollBy(1)} disabled={edges.end} aria-label={`Scroll ${title} right`}>
              <ChevronRight size={16} strokeWidth={2.25} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      <ul className="row__track" ref={ref}>
        {properties.map((p) => (
          <li className="row__item" key={p.id}>
            <PropertyCard property={p} sizes="(min-width: 1024px) 22vw, 70vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}
