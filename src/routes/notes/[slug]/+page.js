import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const url = `/notes/${params.slug}.json`;
	const res = await fetch(url);

	if (res.ok) {
		return {
			note: await res.json()
		};
	}

	throw error(500, `Failed to load ${url}`);
}
