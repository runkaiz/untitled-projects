import { prisma } from '$lib/prisma';

export async function post({ request, locals }) {
	// Check auth.
	if (!locals.user || !locals.user.userId) {
		return {
			status: 403,
			error: 'Unauthenticated. Please provide a valid cookie.'
		};
	}

	try {
		const body = await request.json();
		let { slug } = body;

		await prisma.note.delete({
			where: { slug: slug }
		});

		return {
			status: 200,
			body: {
				message: 'Note deleted.'
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
