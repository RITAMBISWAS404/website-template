import { toISO, fromISO } from './dates.js';

const pad = (n) => String(n).padStart(2, '0');

/**
 * Build the list of bookable dates for a visit type from owner configuration.
 * A date is selectable only if it falls on an allowed weekday, is not a
 * blackout date and still has at least one bookable slot.
 */
export const getVisitDays = (config, type, now = new Date()) => {
  const days = [];
  for (let i = 0; i < config.horizonDays; i += 1) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const iso = toISO(d);
    const slots = getVisitSlots(config, type, iso, now);
    days.push({ iso, available: slots.some((s) => s.available) });
  }
  return days;
};

/** Slots for one date + type, each flagged with whether it can still be picked. */
export const getVisitSlots = (config, type, iso, now = new Date()) => {
  const date = fromISO(iso);
  if (!config.types.includes(type)) return [];
  if (!config.weekdays.includes(date.getDay())) return [];
  if (config.blackoutDates.includes(iso)) return [];
  const booked = config.booked?.[iso] ?? [];
  const cutoff = now.getTime() + config.leadHours * 3600 * 1000;
  return (config.slots[type] ?? []).map((time) => {
    const [h, m] = time.split(':').map(Number);
    const at = new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m).getTime();
    return { time, available: at >= cutoff && !booked.includes(time), id: `${iso}T${pad(h)}:${pad(m)}` };
  });
};
