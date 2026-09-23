const pad = (n) => String(n).padStart(2, '0');

/** Local-date ISO string (YYYY-MM-DD) without timezone drift. */
export const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const fromISO = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const todayISO = () => toISO(new Date());

export const daysFromNow = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return toISO(d);
};

const shortDate = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' });
const longDate = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
const weekday = new Intl.DateTimeFormat('en-IN', { weekday: 'short' });
const month = new Intl.DateTimeFormat('en-IN', { month: 'short' });

export const formatShortDate = (iso) => shortDate.format(fromISO(iso));
export const formatLongDate = (iso) => longDate.format(fromISO(iso));
export const formatWeekday = (iso) => weekday.format(fromISO(iso));
export const formatMonth = (iso) => month.format(fromISO(iso));
export const dayOfMonth = (iso) => fromISO(iso).getDate();

/** "14:30" -> "2:30 pm" */
export const formatTime = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${pad(m)} ${suffix}`;
};
