import { daysFromNow } from '../lib/dates.js';

/**
 * Property records as ManagR would return them for the public website.
 * - `startingRent` is intentionally NOT stored: it is derived from room types
 *   so the website can never contradict inventory (see lib/property.js).
 * - `location.approx` is a deliberately fuzzed centre point. The exact street
 *   address is never part of the public payload.
 * - Availability carries no tenant or bed-level information.
 */

const U = (id) => `https://images.unsplash.com/photo-${id}`;
const photos = (name, list) =>
  list.map(([id, kind]) => ({ src: U(id), alt: `${kind} at ${name}` }));

const ROOM = (id, label, monthlyRent, securityDeposit, amenities, availability) => ({
  id,
  label,
  monthlyRent,
  securityDeposit,
  amenities,
  availability,
});

export const properties = [
  {
    id: 'aster-koramangala',
    name: 'Nilaya Aster',
    propertyType: 'PG for women',
    locality: 'Koramangala',
    city: 'Bengaluru',
    approved: true,
    verified: true,
    directOwner: true,
    availabilityMode: 'on',
    images: photos('Nilaya Aster', [
      ['1522708323590-d24dbb6b0267', 'Common lounge'],
      ['1540518614846-7eded433c457', 'Private room'],
      ['1512918728675-ed5a9ecdebfd', 'Double sharing room'],
      ['1555854877-bab0e564b8d5', 'Triple sharing room'],
      ['1484154218962-a197022b5858', 'Shared kitchen'],
      ['1560185007-cde436f6a4d0', 'Dining area'],
    ]),
    description: [
      'A bright, quiet home for women, a short walk from the Koramangala 5th Block cafés and offices. Rooms are fully furnished and cleaned daily, and the building has a warden and 24×7 security.',
      'The ground-floor lounge is where most residents meet for meals and weekend movies. Study-friendly rooms and fast Wi-Fi make it a good fit for both students and working professionals.',
    ],
    roomTypes: [
      ROOM('private', 'Private room', 18500, 37000, ['bed', 'wardrobe', 'ac', 'attached-bath', 'study-table'], {
        status: 'available',
        bedsAvailable: 1,
      }),
      ROOM('double', '2 sharing', 12500, 25000, ['bed', 'wardrobe', 'ac', 'geyser', 'study-table'], {
        status: 'partial',
        bedsAvailable: 2,
      }),
      ROOM('triple', '3 sharing', 9500, 19000, ['bed', 'wardrobe', 'fan', 'geyser'], {
        status: 'from-date',
        availableFrom: daysFromNow(19),
      }),
    ],
    amenities: ['bed', 'wardrobe', 'ac', 'geyser', 'wifi', 'study-table', 'power-backup', 'tv', 'fridge'],
    services: ['ro-water', 'washing-area', 'security', 'cctv', 'housekeeping', 'meals'],
    policies: [
      { id: 'payment', label: 'Payment terms', value: 'Rent is payable monthly in advance, on or before the 5th of every month.' },
      { id: 'direct', label: 'Direct payment', value: 'Pay the owner directly by UPI or bank transfer. No agent or platform fee.' },
      { id: 'notice', label: 'Notice period', value: '30 days written notice before move-out.' },
    ],
    rules: [
      { id: 'smoke', label: 'No smoking' },
      { id: 'drink', label: 'No alcohol on the premises' },
      { id: 'visitors', label: 'Visitors only in the lounge until 8 pm' },
      { id: 'gate', label: 'Gate closes at 10:30 pm' },
    ],
    location: { locality: 'Koramangala', city: 'Bengaluru', approx: { lat: 12.9352, lng: 77.6245, radiusM: 450 } },
  },
  {
    id: 'sage-hsr',
    name: 'Nilaya Sage',
    propertyType: 'Co-living',
    locality: 'HSR Layout',
    city: 'Bengaluru',
    approved: true,
    verified: true,
    directOwner: true,
    availabilityMode: 'on',
    images: photos('Nilaya Sage', [
      ['1502672260266-1c1ef2d93688', 'Common area'],
      ['1631049307264-da0ec9d70304', 'Private room'],
      ['1522156373667-4c7234bbd804', 'Kitchen and dining'],
      ['1595526114035-0d45ed16cfbf', 'Double sharing room'],
      ['1554995207-c18c203602cb', 'Lounge'],
      ['1493809842364-78817add7ffb', 'Workspace corner'],
      ['1586023492125-27b2c045efd7', 'Reading corner'],
    ]),
    description: [
      'A modern co-living apartment in HSR Layout with a shared kitchen, a work-from-home corner and a balcony overlooking a tree-lined lane. Open to both men and women, in separate floors.',
      'Rooms are set up for people who work from home: good lighting, quiet hours after 10 pm and reliable internet on every floor.',
    ],
    roomTypes: [
      ROOM('private', 'Private room', 16000, 32000, ['bed', 'wardrobe', 'ac', 'wifi', 'balcony', 'study-table'], {
        status: 'available',
        bedsAvailable: 2,
      }),
      ROOM('double', '2 sharing', 11000, 22000, ['bed', 'wardrobe', 'ac', 'wifi', 'geyser'], {
        status: 'full',
        availableFrom: daysFromNow(33),
      }),
    ],
    amenities: ['bed', 'wardrobe', 'ac', 'geyser', 'wifi', 'balcony', 'study-table', 'power-backup', 'fridge'],
    services: ['ro-water', 'washing-area', 'security', 'housekeeping', 'lift'],
    policies: [
      { id: 'payment', label: 'Payment terms', value: 'Rent is payable monthly in advance, by the 3rd of each month.' },
      { id: 'notice', label: 'Notice period', value: '30 days notice. Deposit refunded within 7 working days of move-out.' },
    ],
    rules: [
      { id: 'smoke', label: 'No smoking indoors' },
      { id: 'quiet', label: 'Quiet hours from 10 pm to 7 am' },
      { id: 'pets', label: 'No pets' },
    ],
    location: { locality: 'HSR Layout', city: 'Bengaluru', approx: { lat: 12.9116, lng: 77.6474, radiusM: 450 } },
  },
  {
    id: 'lofts-indiranagar',
    name: 'Nilaya Lofts',
    propertyType: 'PG for men',
    locality: 'Indiranagar',
    city: 'Bengaluru',
    approved: true,
    verified: true,
    directOwner: true,
    availabilityMode: 'on',
    images: photos('Nilaya Lofts', [
      ['1545324418-cc1a3fa10c00', 'Building exterior'],
      ['1505693416388-ac5ce068fe85', 'Private room'],
      ['1618221195710-dd6b41faaea6', 'Common lounge'],
      ['1522771739844-6a9f6d5f14af', 'Double sharing room'],
      ['1502005229762-cf1b2da7c5d6', 'Staircase to the lofts'],
      ['1616594039964-ae9021a400a0', 'Room interior'],
    ]),
    description: [
      'Loft-style rooms in a renovated building, five minutes from the Indiranagar metro station. High ceilings, large windows and a rooftop sit-out make it one of our most popular properties.',
    ],
    roomTypes: [
      ROOM('private', 'Private room', 20000, 40000, ['bed', 'wardrobe', 'ac', 'attached-bath', 'wifi'], {
        status: 'full',
        availableFrom: daysFromNow(12),
      }),
      ROOM('double', '2 sharing', 13500, 27000, ['bed', 'wardrobe', 'ac', 'geyser'], {
        status: 'available',
        bedsAvailable: 1,
      }),
      ROOM('triple', 'Triple sharing', 10000, 20000, ['bed', 'wardrobe', 'fan', 'geyser'], {
        status: 'available',
        bedsAvailable: 3,
      }),
    ],
    amenities: ['bed', 'wardrobe', 'ac', 'geyser', 'wifi', 'power-backup', 'tv'],
    services: ['ro-water', 'washing-area', 'security', 'housekeeping', 'parking'],
    policies: [
      { id: 'payment', label: 'Payment terms', value: 'Rent is payable monthly in advance, on or before the 1st.' },
      { id: 'direct', label: 'Direct payment', value: 'Pay the owner directly by UPI or bank transfer.' },
      { id: 'notice', label: 'Notice period', value: '30 days notice before move-out.' },
    ],
    rules: [
      { id: 'smoke', label: 'No smoking' },
      { id: 'drink', label: 'No drinking' },
      { id: 'guests', label: 'No overnight guests' },
    ],
    location: { locality: 'Indiranagar', city: 'Bengaluru', approx: { lat: 12.9784, lng: 77.6408, radiusM: 450 } },
  },
  {
    id: 'cedar-kharadi',
    name: 'Nilaya Cedar',
    propertyType: 'Co-living',
    locality: 'Kharadi',
    city: 'Pune',
    approved: true,
    verified: true,
    directOwner: true,
    availabilityMode: 'on',
    images: photos('Nilaya Cedar', [
      ['1600607687939-ce8a6c25118c', 'Living area'],
      ['1631049307264-da0ec9d70304', 'Private room'],
      ['1502672023488-70e25813eb80', 'Common area'],
      ['1536376072261-38c75010e6c9', 'Lounge'],
      ['1567767292278-a4f21aa2d36e', 'Sitting area'],
    ]),
    description: [
      'A newly furnished co-living home in Kharadi, close to EON IT Park and World Trade Center. Every room has an attached bathroom and the building includes a small gym corner.',
      'Ideal for working professionals who want a short commute and a hassle-free monthly bill.',
    ],
    roomTypes: [
      ROOM('private', 'Private room', 17000, 34000, ['bed', 'wardrobe', 'ac', 'attached-bath', 'wifi'], {
        status: 'partial',
        bedsAvailable: 1,
      }),
      ROOM('double', '2 sharing', 11500, 23000, ['bed', 'wardrobe', 'ac', 'attached-bath', 'wifi'], {
        status: 'available',
        bedsAvailable: 2,
      }),
    ],
    amenities: ['bed', 'wardrobe', 'ac', 'attached-bath', 'wifi', 'geyser', 'power-backup', 'balcony'],
    services: ['ro-water', 'washing-area', 'security', 'cctv', 'lift', 'parking'],
    policies: [
      { id: 'payment', label: 'Payment terms', value: 'Rent is payable monthly in advance by the 5th.' },
      { id: 'notice', label: 'Notice period', value: '30 days notice. One month rent forfeited if notice is not served.' },
    ],
    rules: [
      { id: 'smoke', label: 'No smoking' },
      { id: 'drink', label: 'No drinking in common areas' },
    ],
    location: { locality: 'Kharadi', city: 'Pune', approx: { lat: 18.5515, lng: 73.94, radiusM: 500 } },
  },
  {
    id: 'willow-whitefield',
    name: 'Nilaya Willow',
    propertyType: 'PG for men',
    locality: 'Whitefield',
    city: 'Bengaluru',
    approved: true,
    verified: true,
    directOwner: true,
    availabilityMode: 'on',
    images: photos('Nilaya Willow', [
      ['1600210492486-724fe5c67fb0', 'Common area'],
      ['1555854877-bab0e564b8d5', 'Triple sharing room'],
      ['1540518614846-7eded433c457', 'Double sharing room'],
      ['1560185007-cde436f6a4d0', 'Dining area'],
    ]),
    description: [
      'A no-frills, well-kept PG close to ITPL and the Whitefield tech corridor. Simple rooms, clean bathrooms and home-style meals at a price that works for freshers.',
    ],
    roomTypes: [
      ROOM('double', '2 sharing', 9000, 18000, ['bed', 'wardrobe', 'fan', 'geyser'], {
        status: 'available',
        bedsAvailable: 2,
      }),
      ROOM('triple', '3 sharing', 7500, 15000, ['bed', 'wardrobe', 'fan', 'geyser'], {
        status: 'available',
        bedsAvailable: 4,
      }),
    ],
    amenities: ['bed', 'wardrobe', 'geyser', 'wifi', 'fan', 'power-backup'],
    services: ['ro-water', 'washing-area', 'meals', 'security'],
    policies: [
      { id: 'payment', label: 'Payment terms', value: 'Rent is payable monthly in advance by the 7th.' },
      { id: 'notice', label: 'Notice period', value: '30 days notice before move-out.' },
    ],
    rules: [
      { id: 'smoke', label: 'No smoking' },
      { id: 'drink', label: 'No drinking' },
      { id: 'gate', label: 'Gate closes at 11 pm' },
    ],
    location: { locality: 'Whitefield', city: 'Bengaluru', approx: { lat: 12.9698, lng: 77.75, radiusM: 500 } },
  },
  {
    id: 'banyan-viman-nagar',
    name: 'Nilaya Banyan',
    propertyType: 'PG for women',
    locality: 'Viman Nagar',
    city: 'Pune',
    approved: true,
    verified: true,
    directOwner: true,
    availabilityMode: 'off', // owner has turned public availability off
    images: photos('Nilaya Banyan', [
      ['1513694203232-719a280e022f', 'Common area'],
      ['1512918728675-ed5a9ecdebfd', 'Double sharing room'],
      ['1560448204-e02f11c3d0e2', 'Lounge'],
    ]),
    description: [
      'A calm, women-only PG in Viman Nagar with easy access to the airport road and Phoenix Marketcity. The house has a small garden and a shared terrace.',
    ],
    roomTypes: [
      ROOM('double', '2 sharing', 10500, 21000, ['bed', 'wardrobe', 'ac', 'geyser'], {
        status: 'available',
        bedsAvailable: 1,
      }),
      ROOM('triple', '3 sharing', 8500, 17000, ['bed', 'wardrobe', 'fan', 'geyser'], {
        status: 'available',
        bedsAvailable: 2,
      }),
    ],
    amenities: ['bed', 'wardrobe', 'geyser', 'wifi', 'ac', 'fan'],
    services: ['ro-water', 'washing-area', 'security', 'housekeeping'],
    // No published rules or policy text yet: the page must handle missing sections gracefully.
    policies: [],
    rules: [],
    location: { locality: 'Viman Nagar', city: 'Pune', approx: { lat: 18.5679, lng: 73.9143, radiusM: 500 } },
  },
  {
    // Not approved for public display: must never appear anywhere.
    id: 'draft-property',
    name: 'Nilaya Draft',
    propertyType: 'Hostel',
    locality: 'Electronic City',
    city: 'Bengaluru',
    approved: false,
    verified: false,
    directOwner: true,
    availabilityMode: 'on',
    images: [],
    description: [],
    roomTypes: [],
    amenities: [],
    services: [],
    policies: [],
    rules: [],
    location: { locality: 'Electronic City', city: 'Bengaluru', approx: { lat: 12.845, lng: 77.66, radiusM: 500 } },
  },
];
