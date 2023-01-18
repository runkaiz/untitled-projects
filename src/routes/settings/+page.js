import { redirect, error } from '@sveltejs/kit';

export async function load({ session, fetch }) {
	if (!session.user) {
		throw redirect(307, '/');
	}

	const url = `/auth/me.json`;
	const res = await fetch(url);

	if (res.ok) {
		return {
			user: await res.json()
		};
	}

	throw error(500, 'Failed to load user');
}
