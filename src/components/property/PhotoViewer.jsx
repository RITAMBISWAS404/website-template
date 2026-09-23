import { useEffect, useRef } from 'react';
import Sheet from '../ui/Sheet.jsx';
import Picture from '../ui/Picture.jsx';
import { useSite } from '../../context/SiteContext.jsx';

function Photos({ property, index }) {
  const ref = useRef(null);
  useEffect(() => {
    // The dialog opens a tick after mount, so wait before scrolling to the tapped photo.
    const t = setTimeout(() => ref.current?.children[index]?.scrollIntoView({ block: 'start' }), 80);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <ul className="viewer" ref={ref}>
      {property.images.map((img, i) => (
        <li key={img.src} className="viewer__item">
          <Picture src={img.src} alt={img.alt} sizes="(min-width: 1024px) 860px, 100vw" priority={i === index} />
          <p className="viewer__cap">
            {i + 1} / {property.images.length} · {img.alt}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function PhotoViewer({ open, onClose, propertyId, index = 0 }) {
  const { getProperty } = useSite();
  const property = getProperty(propertyId);
  if (!property) return null;
  return (
    <Sheet open={open} onClose={onClose} title={`${property.name} photos`} size="full">
      <Photos property={property} index={index} />
    </Sheet>
  );
}
