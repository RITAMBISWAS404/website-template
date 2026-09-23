import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useSite } from '../context/SiteContext.jsx';
import Gallery from '../components/property/Gallery.jsx';
import PropertySummary from '../components/property/PropertySummary.jsx';
import RoomTypes from '../components/property/RoomTypes.jsx';
import { About, Amenities, Policies, Rules, Services } from '../components/property/InfoSections.jsx';
import Location from '../components/property/Location.jsx';
import StickyBar from '../components/property/StickyBar.jsx';
import CardRow from '../components/property/CardRow.jsx';
import NotFound from './NotFound.jsx';
import { resolveAmenities, resolveServices } from '../lib/property.js';

/** A full-bleed surface band; the content stays inside the page container. */
const Band = ({ tone, children }) => (
  <section className={`band band--${tone}`}>
    <div className="container">{children}</div>
  </section>
);

export default function PropertyPage() {
  const { id } = useParams();
  const { owner, properties, getProperty } = useSite();
  const property = getProperty(id);

  useEffect(() => {
    if (!property) return;
    document.title = `${property.name}, ${property.locality} | ${owner.name}`;
  }, [property, owner.name]);

  // Other properties from this same owner, same city first.
  const similar = useMemo(() => {
    if (!property) return [];
    return properties
      .filter((p) => p.id !== property.id)
      .sort((a, b) => Number(b.city === property.city) - Number(a.city === property.city))
      .slice(0, 4);
  }, [properties, property]);

  if (!property) return <NotFound />;

  // Sections that have data, in order. Surfaces alternate after the header
  // (off-white first) so a missing section never leaves two bands the same.
  const sections = [
    property.description.length > 0 && { key: 'about', node: <About property={property} /> },
    property.roomTypes.length > 0 && { key: 'rooms', node: <RoomTypes property={property} /> },
    resolveAmenities(property.amenities).length > 0 && { key: 'amenities', node: <Amenities property={property} /> },
    resolveServices(property.services).length > 0 && { key: 'services', node: <Services property={property} /> },
    property.policies.length > 0 && { key: 'policies', node: <Policies property={property} /> },
    property.rules.length > 0 && { key: 'rules', node: <Rules property={property} /> },
    property.location && { key: 'location', node: <Location property={property} /> },
  ].filter(Boolean);
  const related = [
    similar.length > 0 && (
      <CardRow key="similar" meta="Same owner" title={`More from ${owner.name}`} properties={similar} headingId="similar-title" />
    ),
  ].filter(Boolean);

  const tones = ['canvas', 'white'];
  return (
    <div className="detail">
      <Band tone="white">
        <Link to="/" className="backlink">
          <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" />
          All properties
        </Link>
        <Gallery property={property} />
        <PropertySummary property={property} />
      </Band>

      {sections.map((s, i) => (
        <Band key={s.key} tone={tones[i % 2]}>
          {s.node}
        </Band>
      ))}

      {related.length > 0 && (
        <Band tone={tones[sections.length % 2]}>
          <div className="related">{related}</div>
        </Band>
      )}
      <StickyBar property={property} />
    </div>
  );
}
