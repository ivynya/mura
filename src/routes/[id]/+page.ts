import { getMura } from '$lib/api';
import type { PageLoad } from './$types';

// Fetching Mura doesn't work with SSR
export const ssr = false;

// Get Mura JSON object and return it to page
export const load = (async ({ params }) => {
	const { id } = params;
	return { mura: await getMura(id) };
}) satisfies PageLoad;