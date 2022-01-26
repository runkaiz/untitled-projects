import * as cookie from 'cookie';
import { verifyToken } from '$lib/utils/token';

// I am really debating whether or not to use hooks for auth.
//  Pro: Stores the user's information in httpOnly cookies; xss can't steal user's name easily.
//  Con: I hate to add this performance hit to every request.
// TODO: Should we use localStorage instead?

export async function handle({ request, resolve }) {
	const cookies = cookie.parse(request.headers.cookie || '');
	const token = cookies.token;

	if (token) {
		const payload = verifyToken(token);
		if (payload) {
			request.locals.user = payload;
			const response = await resolve(request);

			return response;
		} else {
			// Remove token from the cookie, so future requests won't go through verification again.
			const response = await resolve(request);
			response.headers = { 'Set-Cookie': 'token=; Max-Age=0; Path=/' };
			return response;
		}
	}

	return resolve(request);
}

export async function getSession(request) {
	const user = request.locals.user;

	return {
		user: user ? user : null
	};
}
