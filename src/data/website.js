/**
 * Website configuration for this owner. `plan` is the only switch that decides
 * whether Advanced capabilities are exposed. Components never branch on the
 * plan string directly: they read capabilities via `useCapabilities()`.
 */
export const website = {
  ownerId: 'own_nilaya',
  plan: 'advanced', // 'basic' | 'advanced'
  theme: 'default',
  hero: {
    eyebrow: 'Direct owner · No brokerage',
    headline: 'Comfortable homes for students and professionals',
    subheadline:
      'Furnished PG and co-living rooms in Bengaluru and Pune, run directly by the owner. Browse our properties and reach us in one tap.',
    primaryCtaLabel: 'Browse properties',
  },
  // Advanced only: owner-chosen branding overrides applied on top of the theme.
  branding: { accent: null },
  showManagrAttribution: true,
};
