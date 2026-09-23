import { useEffect, useRef, useState } from 'react';
import { FlaskConical } from 'lucide-react';
import { useSite } from '../../context/SiteContext.jsx';
import { PLANS } from '../../lib/capabilities.js';
import { THEMES } from '../../lib/themes.js';

/** Base is the default state: it is reached by un-selecting the active theme. */
const EXPERIMENT_THEMES = THEMES.filter((t) => t.id !== 'default');
const BASE = THEMES.find((t) => t.id === 'default').id;

/**
 * Experimental preview control: one small flask button that opens a compact
 * Theme + Plan popover. Enabled in production while the hosted site is used as a template/demo.
 */
export default function PlanSwitcher() {
  const { plan, setPlan, theme, setTheme } = useSite();
  const [open, setOpen] = useState(false);
  const root = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (!root.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="lab" ref={root}>
      <div id="lab-panel" className="lab__panel" role="group" aria-label="Experimental preview options" hidden={!open}>
        <p className="lab__group">Theme</p>
        <div className="lab__opts">
          {EXPERIMENT_THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={theme === t.id}
              onClick={() => setTheme(theme === t.id ? BASE : t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="lab__group">Plan</p>
        <div className="lab__opts">
          {PLANS.map((p) => (
            <button key={p} type="button" aria-pressed={plan === p} onClick={() => setPlan(p)}>
              {p === 'basic' ? 'Basic' : 'Advanced'}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="lab__btn"
        aria-label="Experimental preview options"
        aria-expanded={open}
        aria-controls="lab-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <FlaskConical size={18} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
}
