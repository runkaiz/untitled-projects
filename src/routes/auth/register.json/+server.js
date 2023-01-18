import { json as json$1 } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import * as bcrypt from 'bcryptjs';
import { generateToken } from '$lib/utils/token';

export async function POST({ request, locals }) {
	const body = await request.json();
	try {
		if (!locals.user || !locals.user.isAdmin)
			throw new Error('Only admins can register new users for now');

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

		return json$1({
			error: null,
			user: {
				userId: user.id,
				name: user.name,
				isAdmin: user.role === 'ADMIN'
			}
		}, {
			headers: {
				'Set-Cookie': `token=${token}; HttpOnly`
			}
		});
	} catch (error) {
		return json$1({
			error: error.message
		}, {
			status: 401
		});
	}
}
