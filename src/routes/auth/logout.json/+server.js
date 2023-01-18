import { json } from '@sveltejs/kit';

export async function POST() {
	return json(
		{
			message: 'Logged out'
		},
		{
			headers: {
				'Set-Cookie': 'token=; Path=/; HttpOnly; Max-Age=0'
			}
		}
	);
}
