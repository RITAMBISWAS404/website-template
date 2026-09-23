import { useSite } from '../../context/SiteContext.jsx';
import { PLANS } from '../../lib/capabilities.js';
import { THEMES } from '../../lib/themes.js';

/** Development-only helper to compare plans and themes. Never shipped in production builds. */
export default function PlanSwitcher() {
  const { plan, setPlan, theme, setTheme } = useSite();
  if (!import.meta.env.DEV) return null;
  return (
    <div className="devbar" role="group" aria-label="Preview options (development only)">
      <div className="devplan">
        <span>Theme</span>
        {THEMES.map((t) => (
          <button key={t.id} type="button" aria-pressed={theme === t.id} onClick={() => setTheme(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="devplan">
        <span>Plan</span>
        {PLANS.map((p) => (
          <button key={p} type="button" aria-pressed={plan === p} onClick={() => setPlan(p)}>
            {p === 'basic' ? 'Basic' : 'Advanced'}
          </button>
        ))}
      </div>
    </div>
  );
}
