import { prisma } from '$lib/prisma';

export async function get({ locals }) {
	if (!locals.user || !locals.user.isAdmin) {
		console.log('locals', locals);
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

	console.log('otherAdmins', otherAdmins);

	let coauthors = [];

	otherAdmins.forEach((admin) => {
		coauthors = [...coauthors, admin.name];
	});
	console.log('coauthors', coauthors);

	return {
		status: 200,
		body: {
			payload: coauthors
		}
	};
}
