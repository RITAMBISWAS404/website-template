const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });

export const formatRent = (n) => `₹${inr.format(n)}`;

export const digitsOnly = (s = '') => s.replace(/\D/g, '');

/** "+91 98450 12345" -> "tel:+919845012345" */
export const telHref = (phone) => `tel:+${digitsOnly(phone)}`;

export const whatsappHref = (phone, message) =>
  `https://wa.me/${digitsOnly(phone)}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

/** Accepts 10-digit Indian mobile numbers, with optional +91 / 0 prefix and spaces. */
export const normalizeIndianMobile = (raw = '') => {
  let d = digitsOnly(raw);
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
};

export const plural = (n, one, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/** "9876543210" -> "+91 98765 43210" */
export const formatMobile = (raw) => {
  const d = normalizeIndianMobile(raw);
  return d ? `+91 ${d.slice(0, 5)} ${d.slice(5)}` : raw;
};
