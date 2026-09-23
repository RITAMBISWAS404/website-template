import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSite } from '../../context/SiteContext.jsx';
import { useOverlays } from '../../context/OverlayContext.jsx';
import { Brand } from '../ui/Logo.jsx';

export default function Header() {
  const { owner, faqs } = useSite();
  const { openContact } = useOverlays();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const links = [
    { label: 'Properties', hash: '#properties' },
    { label: 'About', hash: '#about' },
    ...(faqs.length ? [{ label: 'FAQ', hash: '#faq' }] : []),
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onDown = (e) => !menuRef.current?.contains(e.target) && setMenuOpen(false);
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand" aria-label={`${owner.name}, home`}>
          <Brand owner={owner} size={36} />
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.hash} to={{ pathname: '/', hash: l.hash }} className="nav-link">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <button type="button" className="btn btn--primary btn--sm" onClick={() => openContact()}>
            Contact
          </button>
          <div className="menu" ref={menuRef}>
            <button
              type="button"
              className="icon-btn"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
            {menuOpen && (
              <div className="menu__panel" id="site-menu">
                {links.map((l) => (
                  <Link
                    key={l.hash}
                    to={{ pathname: '/', hash: l.hash }}
                    className="menu__item"
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
