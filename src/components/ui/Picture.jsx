import { useEffect, useRef, useState } from 'react';

const WIDTHS = [400, 640, 960, 1440];

const build = (src, w) => `${src}?auto=format&fit=crop&w=${w}&q=72`;

/**
 * Responsive image with a quiet placeholder and fade-in. Works with any image
 * URL that accepts Unsplash-style width params; alt text always comes from data.
 */
export default function Picture({ src, alt, sizes = '100vw', priority = false, className = '', ...rest }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // Cached images can finish before React attaches onLoad.
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true);
  }, [src]);

  if (failed) return <div className={`pic pic--failed ${className}`} role="img" aria-label={alt} />;
  return (
    <img
      ref={ref}
      className={`pic ${loaded ? 'is-loaded' : ''} ${className}`}
      src={build(src, 960)}
      srcSet={WIDTHS.map((w) => `${build(src, w)} ${w}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchpriority={priority ? "high" : undefined}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      draggable={false}
      {...rest}
    />
  );
}
