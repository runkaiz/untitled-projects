import * as bcrypt from 'bcrypt';

export async function post({ request, locals }) {
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

		return {
			status: 200,
			body: {
				message: 'Password updated'
			}
		};
	} catch (error) {
		return {
			status: 400,
			body: {
				message: error.message
			}
		};
	}
}
