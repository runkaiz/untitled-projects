import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';

export async function GET({ locals }) {
	if (!locals.user || !locals.user.isAdmin) {
		return new Response(undefined, { status: 403 });
	}

	const otherAdmins = await prisma.user.findMany({
		where: {
			role: 'ADMIN'
		}
	});

	let coauthors = [];

	otherAdmins.forEach((admin) => {
		coauthors = [...coauthors, admin];
	});

	return json({
		payload: coauthors
	});
}
