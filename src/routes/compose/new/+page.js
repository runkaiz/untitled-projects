import { redirect } from '@sveltejs/kit';

export async function load({ session }) {
	if (!session.user) {
		throw redirect(307, '/');
	} else {
		return ;
	}
}
