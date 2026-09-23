import { CalendarDays, DoorOpen, MessageCircle, Phone, Send } from 'lucide-react';
import { useCapabilities, useSite } from '../../context/SiteContext.jsx';
import { useOverlays } from '../../context/OverlayContext.jsx';
import { LogoMark } from '../ui/Logo.jsx';
import AvailabilityBadge from './AvailabilityBadge.jsx';
import { buildWhatsAppMessage } from '../site/ContactActions.jsx';
import { formatRent, telHref, whatsappHref } from '../../lib/format.js';
import { describePropertyAvailability, getStartingRent } from '../../lib/property.js';

/**
 * One action module with two rows, grouped by purpose:
 *   1. What it costs (price + availability) and what you can do (Advanced: visit, move-in, enquire)
 *   2. Who to talk to (owner identity + Call / WhatsApp)
 * Call and WhatsApp are in every plan. Advanced actions come from capabilities.
 */
export default function PropertyActions({ property }) {
  const { owner } = useSite();
  const caps = useCapabilities();
  const { openVisit, openEnquiry, openMoveIn } = useOverlays();
  const rent = getStartingRent(property);
  const availability = caps.liveAvailability ? describePropertyAvailability(property) : null;
  const canMoveIn = caps.moveInRequest && property.availabilityMode === 'on' && property.roomTypes.length > 0;
  const hasActions = caps.scheduleVisit || canMoveIn || caps.enquiry;

  return (
    <div className="pmod" role="group" aria-label={`Price and contact for ${property.name}`}>
      <div className="pmod__row">
        <div className="pmod__price">
          {rent != null && (
            <p className="pmod__rent">
              <span className="pmod__label">Starting from</span>
              <span>
                <strong className="num">{formatRent(rent)}</strong>
                <span className="pmod__per"> / month</span>
              </span>
            </p>
          )}
          {availability && <AvailabilityBadge status={availability} />}
        </div>

        {hasActions && (
          <div className="pmod__actions">
            {caps.scheduleVisit && (
              <button type="button" className="btn btn--primary" onClick={() => openVisit(property.id)}>
                <CalendarDays size={18} strokeWidth={2} aria-hidden="true" />
                Schedule a visit
              </button>
            )}
            {canMoveIn && (
              <button type="button" className="btn btn--secondary" onClick={() => openMoveIn(property.id)}>
                <DoorOpen size={18} strokeWidth={2} aria-hidden="true" />
                Request move-in
              </button>
            )}
            {caps.enquiry && (
              <button type="button" className="btn btn--secondary" onClick={() => openEnquiry(property.id)}>
                <Send size={18} strokeWidth={2} aria-hidden="true" />
                Enquire
              </button>
            )}
          </div>
        )}
      </div>

      <div className="pmod__row pmod__row--owner">
        <div className="pmod__owner">
          <LogoMark owner={owner} size={40} />
          <p>
            <span className="pmod__owner-name">Managed by {owner.name}</span>
            <span className="pmod__owner-sub">Owner-run since {owner.foundedYear}</span>
          </p>
        </div>
        <div className="pmod__contact">
          <a className={`btn ${hasActions ? 'btn--soft' : 'btn--primary'}`} href={telHref(owner.phone)}>
            <Phone size={18} strokeWidth={2} aria-hidden="true" />
            Call
          </a>
          <a
            className={`btn ${hasActions ? 'btn--soft' : 'btn--secondary'}`}
            href={whatsappHref(owner.whatsapp, buildWhatsAppMessage(owner, property))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
            WhatsApp
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
