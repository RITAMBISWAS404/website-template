import { Phone, MessageCircle } from 'lucide-react';
import { useSite } from '../../context/SiteContext.jsx';
import { telHref, whatsappHref } from '../../lib/format.js';

export const buildWhatsAppMessage = (owner, property) =>
  property
    ? `Hi ${owner.name}, I'm interested in ${property.name} (${property.locality}, ${property.city}). Is it available?`
    : `Hi ${owner.name}, I'd like to know more about your properties.`;

/**
 * Call + WhatsApp. Present in every plan: contact is never gated.
 * `tone` sets which button carries the primary weight.
 */
export default function ContactActions({ property, size = 'lg', tone = 'call', className = '' }) {
  const { owner } = useSite();
  const sizeCls = size === 'sm' ? 'btn--sm' : '';
  const callCls = tone === 'call' ? 'btn--primary' : 'btn--secondary';
  const waCls = tone === 'whatsapp' ? 'btn--primary' : 'btn--secondary';
  return (
    <div className={`contact-actions ${className}`}>
      <a className={`btn ${callCls} ${sizeCls}`} href={telHref(owner.phone)}>
        <Phone size={18} strokeWidth={2} aria-hidden="true" />
        Call
      </a>
      <a
        className={`btn ${waCls} ${sizeCls}`}
        href={whatsappHref(owner.whatsapp, buildWhatsAppMessage(owner, property))}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
        WhatsApp
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  );
}
