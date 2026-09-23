import { useEffect, useRef, useState } from 'react';
import { Grid2x2 } from 'lucide-react';
import Picture from '../ui/Picture.jsx';
import { useOverlays } from '../../context/OverlayContext.jsx';

/**
 * Desktop: one large photo + up to four thumbnails.
 * Mobile: full-bleed swipe carousel with a position counter.
 * Either way, every photo opens the full-screen viewer.
 */
export default function Gallery({ property }) {
  const { openPhotos } = useOverlays();
  const { images } = property;
  const scroller = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return undefined;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setIndex(Math.round(el.scrollLeft / el.clientWidth)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (!images.length) return <div className="gallery gallery--empty" role="img" aria-label="No photos available yet" />;

  // 4 photos read better as 1 + 2 than 1 + 3 with a hole.
  const shown = images.length >= 5 ? 5 : images.length === 4 ? 3 : images.length;
  const tiles = images.slice(0, shown);

  return (
    <div className="gallery">
      <div className={`gallery__grid gallery__grid--${shown}`}>
        {tiles.map((img, i) => (
          <button
            key={img.src}
            type="button"
            className="gallery__tile"
            onClick={() => openPhotos(property.id, i)}
            aria-label={`Open photo ${i + 1} of ${images.length}: ${img.alt}`}
          >
            <Picture
              src={img.src}
              alt=""
              sizes={i === 0 ? '(min-width: 1024px) 45vw, 60vw' : '(min-width: 1024px) 22vw, 30vw'}
              priority={i === 0}
            />
          </button>
        ))}
        <button type="button" className="gallery__all btn btn--light btn--sm" onClick={() => openPhotos(property.id, 0)}>
          <Grid2x2 size={16} strokeWidth={2} aria-hidden="true" />
          Show all {images.length} photos
        </button>
      </div>

      <div className="gallery__carousel">
        <div className="gallery__scroller" ref={scroller}>
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              className="gallery__slide"
              onClick={() => openPhotos(property.id, i)}
              aria-label={`Open photo ${i + 1} of ${images.length}: ${img.alt}`}
            >
              <Picture src={img.src} alt="" sizes="100vw" priority={i === 0} />
            </button>
          ))}
        </div>
        {images.length > 1 && (
          <span className="gallery__count" aria-hidden="true">
            {index + 1} / {images.length}
          </span>
        )}
      </div>
    </div>
  );
}
