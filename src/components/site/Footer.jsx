import { Link } from 'react-router-dom';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { useSite } from '../../context/SiteContext.jsx';
import { Brand } from '../ui/Logo.jsx';
import { telHref, whatsappHref } from '../../lib/format.js';

export default function Footer() {
  const { owner, website, properties, faqs, plan } = useSite();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link to="/" aria-label={`${owner.name}, home`}>
              <Brand owner={owner} size={40} />
            </Link>
            {owner.tagline && <p className="site-footer__tag">{owner.tagline}</p>}
          </div>

          <nav aria-label="Explore" className="site-footer__col">
            <h2 className="site-footer__head">Explore</h2>
            <ul>
              <li><Link to={{ pathname: '/', hash: '#properties' }}>Properties</Link></li>
              <li><Link to={{ pathname: '/', hash: '#about' }}>About us</Link></li>
              {faqs.length > 0 && <li><Link to={{ pathname: '/', hash: '#faq' }}>FAQ</Link></li>}
            </ul>
          </nav>

          {properties.length > 0 && (
            <nav aria-label="Our properties" className="site-footer__col">
              <h2 className="site-footer__head">Our properties</h2>
              <ul>
                {properties.map((p) => (
                  <li key={p.id}><Link to={`/property/${p.id}`}>{p.name}</Link></li>
                ))}
              </ul>
            </nav>
          )}

          <div className="site-footer__col">
            <h2 className="site-footer__head">Contact</h2>
            <ul>
              <li>
                <a href={telHref(owner.phone)} className="footer-contact">
                  <Phone size={16} aria-hidden="true" /> {owner.phone}
                </a>
              </li>
              <li>
                <a href={whatsappHref(owner.whatsapp)} target="_blank" rel="noopener noreferrer" className="footer-contact">
                  <MessageCircle size={16} aria-hidden="true" /> WhatsApp
                </a>
              </li>
              {owner.email && (
                <li>
                  <a href={`mailto:${owner.email}`} className="footer-contact">
                    <Mail size={16} aria-hidden="true" /> {owner.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="site-footer__bar">
          <p>© {year} {owner.legalName ?? owner.name}</p>
          {website.showManagrAttribution && (
            <p className={plan === 'basic' ? 'attribution' : 'attribution attribution--quiet'}>
              Website powered by <strong>ManagR</strong>
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
