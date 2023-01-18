import { json as json$1 } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import * as bcrypt from 'bcryptjs';
import { generateToken } from '$lib/utils/token';

export async function POST({ request }) {
	const body = await request.json();
	try {
		const { email, password, remember } = body;
		const user = await prisma.user.findFirst({
			where: { email }
		});

		if (!user) throw new Error('User not found');

		const isValid = await bcrypt.compare(password, user.passwordHash);

		if (!isValid) throw new Error('Invalid password');

		const token = generateToken(user);

		if (!remember) {
			return json$1({
				error: null,
				user: {
					userId: user.id,
					name: user.name,
					isAdmin: user.role === 'ADMIN'
				}
			});
		}

		return json$1(
			{
				error: null,
				user: {
					userId: user.id,
					name: user.name,
					isAdmin: user.role === 'ADMIN'
				}
			},
			{
				headers: {
					'Set-Cookie': `token=${token}; HttpOnly; Expires=${new Date(
						Date.now() + 5 * 365 * 24 * 60 * 60 * 1000
					).toUTCString()}; Path=/`
				}
			}
		);
	} catch (error) {
		return json$1(
			{
				error: error.message
			},
			{
				status: 401
			}
		);
	}
}
