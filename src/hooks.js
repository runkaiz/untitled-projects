import * as cookie from 'cookie';
import { verifyToken } from '$lib/utils/token';

// I am really debating whether or not to use hooks for auth.
//  Pro: Stores the user's information in httpOnly cookies; xss can't steal user's name easily.
//  Con: I hate to add this performance hit to every request.

export async function handle({ event, resolve }) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	const token = cookies.token;

	if (token) {
		const payload = verifyToken(token);
		if (payload) {
			event.locals.user = payload;
			const response = await resolve(event);

			return response;
		} else {
			// Remove token from the cookie, so future requests won't go through verification again.
			const response = await resolve(event);
			response.headers = { 'Set-Cookie': 'token=; Max-Age=0; HttpOnly; Path=/' };
			return response;
		}
	}

	return resolve(event);
}

export async function getSession(event) {
	const user = event.locals.user;

	return {
		user: user ? user : null
	};
}
