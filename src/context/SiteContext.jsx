import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getSiteData } from '../data/api.js';
import { getCapabilities, PLANS } from '../lib/capabilities.js';
import { THEME_IDS } from '../lib/themes.js';

const SiteContext = createContext(null);

/** Plan override (?plan= or the experimental switcher) so Basic and Advanced can be compared quickly. */
const readPlanOverride = () => {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('plan');
    if (PLANS.includes(fromUrl)) {
      sessionStorage.setItem('managr.plan', fromUrl);
      return fromUrl;
    }
    const stored = sessionStorage.getItem('managr.plan');
    return PLANS.includes(stored) ? stored : null;
  } catch {
    return null;
  }
};

/** `?theme=` is honoured in every build (dev and production); an explicit URL value beats the stored one. */
const readThemeOverride = () => {
  try {
    const q = new URLSearchParams(window.location.search).get('theme');
    const fromUrl = q === 'base' ? 'default' : q;
    if (THEME_IDS.includes(fromUrl)) {
      sessionStorage.setItem('managr.theme', fromUrl);
      return fromUrl;
    }
    const stored = sessionStorage.getItem('managr.theme');
    return THEME_IDS.includes(stored) ? stored : null;
  } catch {
    return null;
  }
};

export function SiteProvider({ children }) {
  const [data, setData] = useState(null);
  const [planOverride, setPlanOverride] = useState(readPlanOverride);
  const [themeOverride, setThemeOverride] = useState(readThemeOverride);

  useEffect(() => {
    let alive = true;
    getSiteData().then((d) => alive && setData(d));
    return () => {
      alive = false;
    };
  }, []);

  const plan = planOverride ?? data?.website.plan ?? 'basic';
  const capabilities = useMemo(() => getCapabilities(plan), [plan]);

  // Theme + (Advanced only) owner accent override. Content never depends on these.
  useEffect(() => {
    if (!data) return;
    const root = document.documentElement;
    root.dataset.theme = themeOverride ?? data.website.theme;
    const accent = capabilities.customBranding ? data.website.branding?.accent : null;
    if (accent) root.style.setProperty('--color-accent', accent);
    else root.style.removeProperty('--color-accent');
  }, [data, themeOverride, capabilities.customBranding]);

  const setPlan = useCallback((next) => {
    setPlanOverride(next);
    try {
      sessionStorage.setItem('managr.plan', next);
    } catch {
      /* storage unavailable: state alone is fine */
    }
  }, []);

  const setTheme = useCallback((next) => {
    setThemeOverride(next);
    try {
      sessionStorage.setItem('managr.theme', next);
    } catch {
      /* state alone is fine */
    }
  }, []);

  const value = useMemo(() => {
    if (!data) return null;
    const byId = new Map(data.properties.map((p) => [p.id, p]));
    return {
      ...data,
      plan,
      capabilities,
      setPlan,
      theme: themeOverride ?? data.website.theme,
      setTheme,
      getProperty: (id) => byId.get(id) ?? null,
    };
  }, [data, plan, capabilities, setPlan, themeOverride, setTheme]);

  if (!value) return <div className="boot" aria-busy="true" aria-label="Loading" />;
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export const useSite = () => {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within SiteProvider');
  return ctx;
};

export const useCapabilities = () => useSite().capabilities;
