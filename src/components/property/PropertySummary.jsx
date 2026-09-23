import { BadgeCheck, HandCoins } from 'lucide-react';
import { plural } from '../../lib/format.js';
import PropertyActions from './PropertyActions.jsx';

/**
 * One deliberate summary: status pills, name, place, ownership, then price and
 * actions. Pills are limited to semantic metadata (type, verification, ownership).
 */
export default function PropertySummary({ property }) {
  const rooms = property.roomTypes.length;

  return (
    <section className="psummary" aria-labelledby="property-title">
      <ul className="psummary__pills">
        <li className="tag tag--type">{property.propertyType}</li>
        {property.verified && (
          <li className="tag">
            <BadgeCheck size={16} strokeWidth={1.75} className="tag__icon" aria-hidden="true" />
            Verified by ManagR
          </li>
        )}
        {property.directOwner && (
          <li className="tag">
            <HandCoins size={16} strokeWidth={1.75} className="tag__icon" aria-hidden="true" />
            Direct owner · No brokerage
          </li>
        )}
      </ul>

      <h1 id="property-title" className="psummary__title">{property.name}</h1>
      <p className="psummary__sub">
        {property.locality}, {property.city}
        {rooms > 0 && <span> · {plural(rooms, 'room type')}</span>}
      </p>

      <PropertyActions property={property} />
    </section>
  );
}
