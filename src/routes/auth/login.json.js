import { prisma } from '$lib/prisma';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
				'Set-Cookie': `token=${token}; HttpOnly`
			},
			body: {
				message: 'Successfully logged in'
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

function generateToken(user) {
	const payload = {
		userId: user.id,
		isAdmin: user.role === 'ADMIN',
		iat: Date.now()
	};

	// No expiry date for now.
	return jwt.sign(payload, 'process.env.JWT_SECRET');
}
