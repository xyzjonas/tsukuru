import { createClient } from '@prismicio/client';

export const prerender = true;

export async function load({ fetch, params }) {
  // Fetch from Prismic at build time
  const client = createClient({ fetch });
  const document = await client.getByUID('page', params.uid);
  return { document };
}