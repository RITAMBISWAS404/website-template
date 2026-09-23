import { CalendarClock, Check, CigaretteOff, Clock, CreditCard, FileText, HandCoins, Moon, PawPrint, Users, WineOff, Ban } from 'lucide-react';
import CatalogIcon from '../ui/Icon.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import AboutCarousel from './AboutCarousel.jsx';
import { resolveAmenities, resolveServices } from '../../lib/property.js';

/**
 * Detail-page sections. Amenities, services, policies and rules share one
 * card family (`.card` + `.icon-well`); only their composition differs.
 */

const IconWell = ({ children, tone = 'brand', round = false }) => (
  <span className={`icon-well icon-well--${tone} ${round ? 'icon-well--round' : ''}`} aria-hidden="true">
    {children}
  </span>
);

export function About({ property }) {
  if (!property.description.length) return null;
  const photos = property.images.slice(0, 8);
  return (
    <div className={`about-prop ${photos.length > 0 ? 'about-prop--media' : ''}`}>
      <div className="about-prop__text">
        <SectionHeading id="about-prop-title" meta="About this property" title={`Life at ${property.name}`} />
        <div className="reading">
          {property.description.map((p) => (
            <p key={p} className="prose">{p}</p>
          ))}
        </div>
      </div>
      <AboutCarousel images={photos} name={property.name} />
    </div>
  );
}

/** Amenities: compact horizontal cards, icon left. */
export function Amenities({ property }) {
  const items = resolveAmenities(property.amenities);
  if (!items.length) return null;
  return (
    <>
      <SectionHeading id="amenities-title" meta="What’s included" title="Amenities" />
      <ul className="tiles-grid tiles-grid--amenities">
        {items.map((it) => (
          <li key={it.key} className="card card--compact">
            <IconWell><CatalogIcon name={it.icon} size={20} /></IconWell>
            <span className="card__label">{it.label}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

/** Services: same family, round icon well plus a confirmation tick. */
export function Services({ property }) {
  const items = resolveServices(property.services);
  if (!items.length) return null;
  return (
    <>
      <SectionHeading id="services-title" meta="On-site" title="Services" />
      <ul className="tiles-grid tiles-grid--services">
        {items.map((it) => (
          <li key={it.key} className="card card--compact">
            <IconWell round><CatalogIcon name={it.icon} size={20} /></IconWell>
            <span className="card__label">{it.label}</span>
            <Check size={18} strokeWidth={2.25} className="card__tick" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </>
  );
}

const POLICY_ICONS = { payment: CreditCard, direct: HandCoins, notice: CalendarClock };
const RULE_ICONS = { smoke: CigaretteOff, drink: WineOff, visitors: Users, guests: Users, gate: Clock, quiet: Moon, pets: PawPrint };

/** Policies: one card each, label + description beside an icon. */
export function Policies({ property }) {
  if (!property.policies.length) return null;
  return (
    <>
      <SectionHeading id="policies-title" meta="House policies" title="Policies" />
      <dl className="tiles-grid tiles-grid--policies">
        {property.policies.map((p) => {
          const Icon = POLICY_ICONS[p.id] ?? FileText;
          return (
            <div key={p.id} className="card card--info">
              <IconWell><Icon size={20} strokeWidth={1.5} /></IconWell>
              <div className="card__text">
                <dt>{p.label}</dt>
                <dd>{p.value}</dd>
              </div>
            </div>
          );
        })}
      </dl>
    </>
  );
}

/** Rules: one card each, neutral icon well. */
export function Rules({ property }) {
  if (!property.rules.length) return null;
  return (
    <>
      <SectionHeading id="rules-title" meta="House rules" title="Rules and regulations" />
      <ul className="tiles-grid tiles-grid--rules">
        {property.rules.map((r) => {
          const Icon = RULE_ICONS[r.id] ?? Ban;
          return (
            <li key={r.id} className="card card--compact">
              <IconWell tone="neutral"><Icon size={20} strokeWidth={1.5} /></IconWell>
              <span className="card__label">{r.label}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
