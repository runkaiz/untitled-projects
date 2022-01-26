import { prisma } from '$lib/prisma';
import * as bcrypt from 'bcrypt';
import { generateToken } from '$lib/utils/token';

export async function post({ body }) {
	try {
		const { email, password } = body;
		const user = await prisma.user.findFirst({
			where: { email }
		});

		if (!user) throw new Error('User not found');

		const isValid = await bcrypt.compare(password, user.passwordHash);

		if (!isValid) throw new Error('Invalid password');

		const token = generateToken(user);

		return {
			status: 200,
			// Set token as a HTTP only cookie.
			// This is to prevent the token from being read by XSS.
			headers: {
				'Set-Cookie': `token=${token}; HttpOnly; Expires=${new Date(
					Date.now() + 5 * 365 * 24 * 60 * 60 * 1000
				).toUTCString()}; Path=/`
			},
			body: {
				error: null,
				user: {
					userId: user.id,
					name: user.name,
					isAdmin: user.role === 'ADMIN'
				}
			}
		};
	} catch (error) {
		return {
			status: 401,
			body: {
				error: error.message
			}
		};
	}
}
