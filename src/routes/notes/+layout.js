import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
	const url = `/notes/list.json`;
	const res = await fetch(url);

	if (res.ok) {
		return {
			notes: await res.json()
		};
	}

	throw error(500, `Failed to load ${url}`);
}
