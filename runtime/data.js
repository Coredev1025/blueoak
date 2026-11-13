import content from '../data/content.json';

// This is a local replacement for the two public collections used by the export.
// It does not connect to YeshBe accounts or its database.
const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();
export const contactConfigured = Boolean(endpoint);

async function saveInquiry(collection, payload) {
  if (collection !== 'ContactMessage') throw new Error('This collection is not writable.');
  if (!endpoint) throw new Error('Online inquiries are not connected yet. Your message has not been sent.');
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15000),
    redirect: 'error',
  });
  if (!response.ok) throw new Error('Delivery could not be confirmed. Please try again later.');
  return { ok: true };
}

export const sdk = {
  async getPublicAll(collection, options = {}) {
    if (!['Project', 'Product'].includes(collection)) throw new Error('Unknown public collection.');
    const records = [...content[collection]];
    records.sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999));
    return { data: records.slice(0, options.limit ?? records.length) };
  },
  savePublic: saveInquiry,
  save: saveInquiry,
};
