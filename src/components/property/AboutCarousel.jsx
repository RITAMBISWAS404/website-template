import { useEffect, useRef, useState } from 'react';
import Picture from '../ui/Picture.jsx';

const INTERVAL_MS = 5000;

/**
 * Editorial image that cross-fades through the property's photos on its own.
 * No arrows: the dots are a passive progress hint. Autoplay pauses on hover
 * and focus, while off-screen, in a hidden tab, and with reduced motion.
 */
export default function AboutCarousel({ images, name }) {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const count = images.length;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (count < 2 || paused || !visible || reduced) return undefined;
    const tick = () => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    };
    const id = setInterval(tick, INTERVAL_MS);
    return () => clearInterval(id);
  }, [count, paused, visible, reduced]);

  if (count === 0) return null;

  return (
    <div
      ref={ref}
      className="acarousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="img"
      aria-label={`Photos of ${name}`}
    >
      {images.map((img, i) => (
        <div key={img.src} className={`acarousel__slide ${i === index ? 'is-active' : ''}`} aria-hidden={i !== index}>
          <Picture src={img.src} alt={i === index ? img.alt : ''} sizes="(min-width: 900px) 520px, 92vw" priority={i === 0} />
        </div>
      ))}
      {count > 1 && (
        <div className="acarousel__dots" aria-hidden="true">
          {images.map((img, i) => (
            <span key={img.src} className={i === index ? 'is-active' : ''} />
          ))}
        </div>
      )}
    </div>
  );
}
