import { CalendarDays, MessageCircle, Phone } from 'lucide-react';
import { useCapabilities, useSite } from '../../context/SiteContext.jsx';
import { useOverlays } from '../../context/OverlayContext.jsx';
import { formatRent, telHref, whatsappHref } from '../../lib/format.js';
import { getStartingRent } from '../../lib/property.js';
import { buildWhatsAppMessage } from '../site/ContactActions.jsx';

/** Phone/tablet action bar. Contact is always present; Advanced swaps in scheduling. */
export default function StickyBar({ property }) {
  const { owner } = useSite();
  const caps = useCapabilities();
  const { openVisit, openContact } = useOverlays();
  const rent = getStartingRent(property);

  return (
    <div className="stickybar">
      <div className="stickybar__inner container">
        {rent != null && (
          <p className="stickybar__price">
            <span>From</span>
            <strong>{formatRent(rent)}</strong>
            <span> /mo</span>
          </p>
        )}
        <div className="stickybar__actions">
          {caps.scheduleVisit ? (
            <>
              <button type="button" className="btn btn--secondary" onClick={() => openContact(property.id)}>
                Contact
              </button>
              <button type="button" className="btn btn--primary" onClick={() => openVisit(property.id)}>
                <CalendarDays size={18} strokeWidth={2} aria-hidden="true" />
                Schedule visit
              </button>
            </>
          ) : (
            <>
              <a className="btn btn--secondary" href={telHref(owner.phone)}>
                <Phone size={18} strokeWidth={2} aria-hidden="true" />
                Call
              </a>
              <a
                className="btn btn--primary"
                href={whatsappHref(owner.whatsapp, buildWhatsAppMessage(owner, property))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
                WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
