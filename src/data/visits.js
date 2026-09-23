import { daysFromNow as addDaysISO } from '../lib/dates.js';

/**
 * Owner-configured visit availability, keyed by property id.
 * Shape mirrors what a scheduling API would return; components consume it via
 * lib/visits.js and never invent times outside this configuration.
 *
 * weekdays: 0 = Sunday … 6 = Saturday
 * slots:    per visit type, 24h "HH:mm"
 * booked:   slots already taken on a given date (opaque, no visitor info)
 */
const base = {
  leadHours: 3,
  horizonDays: 21,
};

export const visitConfigs = {
  'aster-koramangala': {
    ...base,
    types: ['physical', 'virtual'],
    weekdays: [1, 2, 3, 4, 5, 6],
    slots: {
      physical: ['10:00', '11:30', '14:00', '16:00', '17:30'],
      virtual: ['09:30', '13:00', '18:30', '20:00'],
    },
    blackoutDates: [addDaysISO(5), addDaysISO(13)],
    booked: { [addDaysISO(1)]: ['10:00', '11:30'], [addDaysISO(2)]: ['14:00'] },
  },
  'sage-hsr': {
    ...base,
    types: ['physical', 'virtual'],
    weekdays: [1, 2, 3, 4, 5, 6, 0],
    slots: {
      physical: ['11:00', '12:30', '15:00', '17:00'],
      virtual: ['10:00', '19:00'],
    },
    blackoutDates: [addDaysISO(6)],
    booked: { [addDaysISO(1)]: ['11:00'] },
  },
  'lofts-indiranagar': {
    ...base,
    types: ['physical'], // this owner only offers in-person visits here
    weekdays: [2, 3, 4, 5, 6],
    slots: { physical: ['10:30', '12:00', '16:00', '18:00'] },
    blackoutDates: [addDaysISO(9)],
    booked: { [addDaysISO(2)]: ['10:30', '12:00', '16:00'] },
  },
  'cedar-kharadi': {
    ...base,
    types: ['physical', 'virtual'],
    weekdays: [1, 2, 3, 4, 5, 6],
    slots: {
      physical: ['10:00', '15:30', '17:00'],
      virtual: ['12:00', '19:30'],
    },
    blackoutDates: [],
    booked: {},
  },
  'willow-whitefield': {
    ...base,
    types: ['virtual'], // virtual only
    weekdays: [1, 2, 3, 4, 5, 6, 0],
    slots: { virtual: ['09:00', '13:30', '19:00', '20:30'] },
    blackoutDates: [addDaysISO(3)],
    booked: {},
  },
  'banyan-viman-nagar': {
    ...base,
    types: ['physical'],
    weekdays: [1, 3, 5, 6],
    slots: { physical: ['11:00', '16:30'] },
    blackoutDates: [],
    booked: {},
  },
};
