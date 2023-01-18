import { json as json$1 } from '@sveltejs/kit';
import * as bcrypt from 'bcryptjs';
import { prisma } from '$lib/prisma';

export async function POST({ request, locals }) {
	try {
		const body = await request.json();
		const { currentPassword, newPassword } = body;
		const userId = locals.user.userId;

		if (!currentPassword || !newPassword || !userId) {
			throw new Error('Invalid data');
		}

		const user = await prisma.user.findFirst({
			where: {
				id: userId
			}
		});

		if (!bcrypt.compareSync(currentPassword, user.passwordHash)) {
			throw new Error('Invalid password');
		}

		const passwordHash = bcrypt.hashSync(newPassword, 10);

		await prisma.user.update({
			where: {
				id: userId
			},
			data: {
				passwordHash
			}
		});

		return json$1({
			message: 'Password updated'
		});
	} catch (error) {
		return json$1({
			message: error.message
		}, {
			status: 400
		});
	}
}
