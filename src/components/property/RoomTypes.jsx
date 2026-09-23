import { useCapabilities } from '../../context/SiteContext.jsx';
import { useOverlays } from '../../context/OverlayContext.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import CatalogIcon from '../ui/Icon.jsx';
import AvailabilityBadge from './AvailabilityBadge.jsx';
import { AMENITIES } from '../../data/catalog.js';
import { formatRent } from '../../lib/format.js';
import { describeRoomAvailability } from '../../lib/property.js';

export function RoomTypeCard({ property, room }) {
  const { liveAvailability, moveInRequest } = useCapabilities();
  const { openMoveIn } = useOverlays();
  const showAvailability = liveAvailability && property.availabilityMode !== 'off';
  const status = showAvailability ? describeRoomAvailability(room) : null;
  const canRequest = moveInRequest && property.availabilityMode === 'on';
  const amenities = room.amenities.filter((k) => AMENITIES[k]);

  return (
    <article className="room card">
      <h3 className="room__label">{room.label}</h3>

      <p className="room__rent">
        <strong className="num">{formatRent(room.monthlyRent)}</strong>
        <span>/ month</span>
      </p>
      {status && (
        <div className="room__status">
          <AvailabilityBadge status={status} showDetail />
        </div>
      )}

      <p className="room__deposit">
        <span>Security deposit</span>
        <strong className="num">{formatRent(room.securityDeposit)}</strong>
      </p>

      {amenities.length > 0 && (
        <ul className="room__pills" aria-label={`${room.label} amenities`}>
          {amenities.map((k) => (
            <li key={k} className="meta-pill">
              <CatalogIcon name={AMENITIES[k].icon} size={14} />
              {AMENITIES[k].short ?? AMENITIES[k].label}
            </li>
          ))}
        </ul>
      )}

      {canRequest && (
        <button type="button" className="btn btn--secondary btn--sm room__cta" onClick={() => openMoveIn(property.id, room.id)}>
          Request move-in
        </button>
      )}
    </article>
  );
}

export default function RoomTypes({ property }) {
  if (!property.roomTypes.length) return null;
  return (
    <>
      <SectionHeading id="rooms-title" meta="Rooms & pricing" title="Room types and rent" />
      <div className="room-list" data-count={property.roomTypes.length}>
        {property.roomTypes.map((room) => (
          <RoomTypeCard key={room.id} property={property} room={room} />
        ))}
      </div>
    </>
  );
}
