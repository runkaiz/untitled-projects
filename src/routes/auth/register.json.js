import { prisma } from '$lib/prisma';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function post({ body }) {
	try {
		const { email, password, name } = body;

		if (!email || !password || !name) {
			throw new Error('Invalid data');
		}

		const user = await prisma.user.findFirst({
			where: { email }
		});

		if (user) throw new Error('User already exists');

		const passwordHash = await bcrypt.hash(password, 10);

		await prisma.user.create({
			data: {
				name,
				email,
				passwordHash
			}
		});

		return {
			status: 200,
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
