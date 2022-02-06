import { prisma } from '$lib/prisma';

export async function get({ locals }) {
	const result = await findSelf(locals);

	if (result.status !== 200) {
		return {
			status: result.status,
			body: {
				error: result.error
			}
		};
	}

	return {
		status: 200,
		body: {
			userId: result.user.id,
			name: result.user.name,
			email: result.user.email
		}
	};
}

export async function put({ request, locals }) {
	const result = await findSelf(locals);

	if (result.status !== 200) {
		return {
			status: result.status,
			body: {
				error: result.error
			}
		};
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

	return {
		status: 200,
		body: {
			userId: updatedUser.id,
			name: updatedUser.name,
			email: updatedUser.email
		}
	};
}

export async function del({ locals }) {
	const result = await findSelf(locals);

	if (result.status !== 200) {
		return {
			status: result.status,
			body: {
				error: result.error
			}
		};
	}

	const user = result.user;

	await prisma.user.delete({
		where: {
			id: user.id
		}
	});

	return {
		status: 200,
		headers: {
			'Set-Cookie': 'token=; Max-Age=0'
		},
		body: {
			message: 'User deleted'
		}
	};
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
