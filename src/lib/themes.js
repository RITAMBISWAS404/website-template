/**
 * Visual themes. `default` is the approved Base design and has no override
 * stylesheet. The others are additive: styles/themes/<name>.css, scoped to
 * [data-theme='<name>'], redefine tokens and layout variants only.
 */
export const THEMES = [
  { id: 'default', label: 'Base' },
  { id: 'essential', label: 'Essential' },
  { id: 'modern', label: 'Modern' },
  { id: 'premium', label: 'Premium' },
];

export const THEME_IDS = THEMES.map((t) => t.id);
