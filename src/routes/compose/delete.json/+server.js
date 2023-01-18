import { json as json$1 } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';

export async function POST({ request, locals }) {
	// Check auth.
	if (!locals.user || !locals.user.userId) {
		return new Response(undefined, { status: 403 });
	}

	try {
		const body = await request.json();
		let { slug } = body;

		await prisma.note.delete({
			where: { slug: slug }
		});

		return json$1({
			message: 'Note deleted.'
		});
	} catch (error) {
		return json$1(
			{
				message: error.message
			},
			{
				status: 400
			}
		);
	}
}
