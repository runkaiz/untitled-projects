import { prisma } from '$lib/prisma';
import * as bcrypt from 'bcrypt';
import { generateToken } from '$lib/utils/token';

export async function post({ body }) {
	try {
		const { email, password, name } = body;

		if (!email || !password || !name) {
			throw new Error('Invalid data');
		}

		const existingUser = await prisma.user.findFirst({
			where: { email }
		});

		if (existingUser) throw new Error('User already exists');

		const passwordHash = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				name,
				email,
				passwordHash
			}
		});

		const token = generateToken(user);

		return {
			status: 200,
			// Set token as a HTTP only cookie.
			// This is to prevent the token from being read by XSS.
			headers: {
				'Set-Cookie': `token=${token}; HttpOnly`
			},
			body: {
				message: 'User created'
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
