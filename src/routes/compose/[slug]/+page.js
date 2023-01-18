import { redirect, error } from '@sveltejs/kit';

export async function load({ session, params, fetch }) {
	if (!session.user) {
		throw redirect(307, '/');
	}

	const url = `/notes/${params.slug}.json`;
	const res = await fetch(url);

	if (res.ok) {
		return {
			note: await res.json()
		};
	}

	throw error(500, `Failed to load ${url}`);
}
