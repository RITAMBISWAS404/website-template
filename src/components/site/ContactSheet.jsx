import { CalendarDays, ChevronRight, MessageCircle, Phone, Send } from 'lucide-react';
import Sheet from '../ui/Sheet.jsx';
import { useSite } from '../../context/SiteContext.jsx';
import { useOverlays } from '../../context/OverlayContext.jsx';
import { telHref, whatsappHref } from '../../lib/format.js';
import { buildWhatsAppMessage } from './ContactActions.jsx';

export default function ContactSheet({ open, onClose, propertyId }) {
  const { owner, capabilities, getProperty } = useSite();
  const overlays = useOverlays();
  const property = propertyId ? getProperty(propertyId) : null;

  return (
    <Sheet open={open} onClose={onClose} title={`Contact ${owner.name}`} size="sm">
      <p className="sheet__lede">
        {property ? `Ask about ${property.name}` : 'Talk to the owner directly.'} We usually reply the same day.
      </p>
      <ul className="action-list">
        <li>
          <a className="action-row" href={telHref(owner.phone)}>
            <span className="action-row__icon"><Phone size={20} strokeWidth={1.75} aria-hidden="true" /></span>
            <span className="action-row__text">
              <span className="action-row__title">Call</span>
              <span className="action-row__sub">{owner.phone}</span>
            </span>
            <ChevronRight size={18} aria-hidden="true" />
          </a>
        </li>
        <li>
          <a
            className="action-row"
            href={whatsappHref(owner.whatsapp, buildWhatsAppMessage(owner, property))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="action-row__icon"><MessageCircle size={20} strokeWidth={1.75} aria-hidden="true" /></span>
            <span className="action-row__text">
              <span className="action-row__title">WhatsApp</span>
              <span className="action-row__sub">Message the owner</span>
            </span>
            <ChevronRight size={18} aria-hidden="true" />
          </a>
        </li>
        {capabilities.scheduleVisit && property && (
          <li>
            <button type="button" className="action-row" onClick={() => overlays.openVisit(property.id)}>
              <span className="action-row__icon"><CalendarDays size={20} strokeWidth={1.75} aria-hidden="true" /></span>
              <span className="action-row__text">
                <span className="action-row__title">Schedule a visit</span>
                <span className="action-row__sub">In person or on video</span>
              </span>
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </li>
        )}
        {capabilities.enquiry && (
          <li>
            <button type="button" className="action-row" onClick={() => overlays.openEnquiry(property?.id)}>
              <span className="action-row__icon"><Send size={20} strokeWidth={1.75} aria-hidden="true" /></span>
              <span className="action-row__text">
                <span className="action-row__title">Send an enquiry</span>
                <span className="action-row__sub">Tell us what you need</span>
              </span>
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </li>
        )}
      </ul>
    </Sheet>
  );
}
