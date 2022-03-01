import { prisma } from '$lib/prisma';

export async function get({ locals }) {
	if (!locals.user || !locals.user.isAdmin) {
		return {
			status: 403,
			error: 'Unauthenticated.'
		};
	}

	const otherAdmins = await prisma.user.findMany({
		where: {
			role: 'ADMIN',
			NOT: {
				name: locals.user.name
			}
		}
	});

	let coauthors = [];

	otherAdmins.forEach((admin) => {
		coauthors = [...coauthors, admin.name];
	});

	return {
		status: 200,
		body: {
			payload: coauthors
		}
	};
}