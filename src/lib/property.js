import { AMENITIES, SERVICES } from '../data/catalog.js';
import { todayISO, formatShortDate } from './dates.js';

/** Starting rent is derived from inventory so the website can't contradict it. */
export const getStartingRent = (property) =>
  property.roomTypes.length ? Math.min(...property.roomTypes.map((r) => r.monthlyRent)) : null;

export const getSharingLabels = (property) => property.roomTypes.map((r) => r.label);

export const resolveAmenities = (keys = []) =>
  keys.filter((k) => AMENITIES[k]).map((k) => ({ key: k, ...AMENITIES[k] }));

export const resolveServices = (keys = []) =>
  keys.filter((k) => SERVICES[k]).map((k) => ({ key: k, ...SERVICES[k] }));

/** Top few amenities for the compact card highlight line. */
export const getHighlights = (property, max = 3) =>
  resolveAmenities(property.amenities)
    .slice(0, max)
    .map((a) => a.label);

/**
 * Public availability for one room type, as a display-ready state.
 * tone: 'open' | 'limited' | 'closed'
 */
export const describeRoomAvailability = (room) => {
  const a = room.availability || {};
  const today = todayISO();
  switch (a.status) {
    case 'available':
      return {
        state: 'available',
        tone: 'open',
        label: 'Available now',
        detail: a.bedsAvailable ? `${a.bedsAvailable} ${a.bedsAvailable === 1 ? 'bed' : 'beds'} left` : null,
      };
    case 'partial':
      return {
        state: 'partial',
        tone: 'limited',
        label: 'Partly available',
        detail: a.bedsAvailable ? `${a.bedsAvailable} ${a.bedsAvailable === 1 ? 'bed' : 'beds'} left` : null,
      };
    case 'from-date':
      if (a.availableFrom && a.availableFrom > today) {
        return { state: 'from-date', tone: 'limited', label: `Available from ${formatShortDate(a.availableFrom)}`, detail: null };
      }
      return { state: 'available', tone: 'open', label: 'Available now', detail: null };
    case 'full':
      return {
        state: 'full',
        tone: 'closed',
        label: 'Fully booked',
        detail: a.availableFrom ? `Next availability ${formatShortDate(a.availableFrom)}` : null,
      };
    default:
      return { state: 'unknown', tone: 'closed', label: 'Ask the owner', detail: null };
  }
};

/**
 * Property-level availability, or null when the owner turned availability off.
 * Roll-up: any open room -> available; else any limited -> partial; else full / later.
 */
export const describePropertyAvailability = (property) => {
  if (property.availabilityMode === 'off') return null;
  if (property.availabilityMode === 'unavailable') {
    return { state: 'unavailable', tone: 'closed', label: 'Temporarily unavailable', detail: null };
  }
  const states = property.roomTypes.map(describeRoomAvailability);
  if (!states.length) return null;
  if (states.some((s) => s.state === 'available')) {
    return { state: 'available', tone: 'open', label: 'Available now', detail: null };
  }
  const later = states.filter((s) => s.state === 'from-date' || s.state === 'partial');
  if (later.length) {
    const partial = later.find((s) => s.state === 'partial');
    return partial
      ? { state: 'partial', tone: 'limited', label: 'Partly available', detail: null }
      : { ...later[0], detail: null };
  }
  return { state: 'full', tone: 'closed', label: 'Fully booked', detail: null };
};

/**
 * Mock of the move-in feasibility check a backend would run.
 * Returns { result: 'available' | 'later' | 'unavailable', availableFrom? }
 */
export const checkMoveIn = (room, isoDate) => {
  const a = room.availability || {};
  if (a.status === 'available' || a.status === 'partial') return { result: 'available' };
  if ((a.status === 'from-date' || a.status === 'full') && a.availableFrom) {
    return isoDate >= a.availableFrom
      ? { result: 'available' }
      : { result: 'later', availableFrom: a.availableFrom };
  }
  return { result: 'unavailable' };
};
