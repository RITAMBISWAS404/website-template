/**
 * Data access facade. Everything the UI reads or submits goes through here so
 * the mock layer can be swapped for real ManagR endpoints without touching
 * components. All functions are async on purpose.
 */
import { owner } from './owner.js';
import { website } from './website.js';
import { properties } from './properties.js';
import { faqs } from './faqs.js';
import { visitConfigs } from './visits.js';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const clone = (v) => structuredClone(v);

export async function getSiteData() {
  // Only properties approved for public display are ever returned.
  const published = properties.filter((p) => p.approved);
  return { owner: clone(owner), website: clone(website), properties: clone(published), faqs: clone(faqs) };
}

export async function getVisitConfig(propertyId) {
  await delay(150);
  const config = visitConfigs[propertyId];
  return config ? clone(config) : null;
}

/** Mocked submissions: resolve with a reference id like a real endpoint would. */
const submit = async (kind, payload) => {
  await delay(700);
  const ref = `${kind.slice(0, 3).toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  if (import.meta.env.DEV) console.info(`[mock ${kind}]`, ref, payload);
  return { ok: true, ref };
};

export const submitEnquiry = (payload) => submit('enquiry', payload);
export const submitVisitRequest = (payload) => submit('visit', payload);
export const submitMoveInRequest = (payload) => submit('movein', payload);
