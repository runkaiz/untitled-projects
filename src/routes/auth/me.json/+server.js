import { json as json$1 } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import { generateToken } from '$lib/utils/token';

export async function GET({ locals }) {
	const result = await findSelf(locals);

	if (result.status !== 200) {
		return json$1(
			{
				error: result.error
			},
			{
				status: result.status
			}
		);
	}

	return json$1({
		userId: result.user.id,
		name: result.user.name,
		email: result.user.email
	});
}

export async function PUT({ request, locals }) {
	const result = await findSelf(locals);

	if (result.status !== 200) {
		return json$1(
			{
				error: result.error
			},
			{
				status: result.status
			}
		);
	}

	const user = result.user;

	const body = await request.json();

	const updatedUser = await prisma.user.update({
		where: {
			id: user.id
		},
		data: {
			name: body.name ? body.name : user.name,
			email: body.email ? body.email : user.email
		}
	});

	const token = generateToken(updatedUser);

	return json$1(
		{
			userId: updatedUser.id,
			name: updatedUser.name,
			email: updatedUser.email
		},
		{
			headers: {
				'Set-Cookie': `token=${token}; HttpOnly; Expires=${new Date(
					Date.now() + 5 * 365 * 24 * 60 * 60 * 1000
				).toUTCString()}; Path=/`
			}
		}
	);
}

export async function DELETE({ locals }) {
	const result = await findSelf(locals);

	if (result.status !== 200) {
		return json$1(
			{
				error: result.error
			},
			{
				status: result.status
			}
		);
	}

	const user = result.user;

	await prisma.user.delete({
		where: {
			id: user.id
		}
	});

	return json$1(
		{
			message: 'User deleted'
		},
		{
			headers: {
				'Set-Cookie': 'token=; Max-Age=0'
			}
		}
	);
}

// This function is used to find the user with a valid token.
async function findSelf(locals) {
	if (!locals.user || !locals.user.userId) {
		return {
			status: 403,
			error: 'Unauthenticated. Please provide a valid cookie.'
		};
	}

	const userId = locals.user.userId;

	const user = await prisma.user.findFirst({
		where: {
			id: userId
		}
	});

	if (!user) {
		return {
			status: 404,
			error: 'User not found. How weird!'
		};
	}

	return {
		status: 200,
		user: user
	};
}
