/**
 * Shared vocabularies. Properties reference these by key so labels and
 * iconography stay consistent everywhere. `icon` is a name resolved by the UI.
 */
export const AMENITIES = {
  bed: { label: 'Bed with mattress', short: 'Bed', icon: 'bed' },
  wardrobe: { label: 'Wardrobe', short: 'Wardrobe', icon: 'wardrobe' },
  ac: { label: 'Air conditioning', short: 'AC', icon: 'ac' },
  geyser: { label: 'Geyser', short: 'Geyser', icon: 'geyser' },
  wifi: { label: 'Wi-Fi', short: 'Wi-Fi', icon: 'wifi' },
  'study-table': { label: 'Study table', short: 'Study table', icon: 'desk' },
  'attached-bath': { label: 'Attached bathroom', short: 'Attached bath', icon: 'bath' },
  balcony: { label: 'Balcony', short: 'Balcony', icon: 'balcony' },
  fan: { label: 'Ceiling fan', short: 'Fan', icon: 'fan' },
  'power-backup': { label: 'Power backup', short: 'Power backup', icon: 'power' },
  tv: { label: 'Common room TV', short: 'TV', icon: 'tv' },
  fridge: { label: 'Shared refrigerator', short: 'Fridge', icon: 'fridge' },
};

export const SERVICES = {
  'ro-water': { label: 'RO drinking water', icon: 'water' },
  'washing-area': { label: 'Washing area', icon: 'laundry' },
  security: { label: '24×7 security', icon: 'security' },
  cctv: { label: 'CCTV in common areas', icon: 'cctv' },
  housekeeping: { label: 'Daily housekeeping', icon: 'housekeeping' },
  meals: { label: 'Home-style meals', icon: 'meals' },
  parking: { label: 'Two-wheeler parking', icon: 'parking' },
  lift: { label: 'Lift access', icon: 'lift' },
};

export const PROPERTY_TYPES = ['PG for women', 'PG for men', 'Co-living', 'Hostel'];
