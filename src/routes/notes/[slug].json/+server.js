import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';

export async function GET({ params }) {
	const { slug } = params;

	try {
		const note = await prisma.note.findFirst({
			where: { slug },
			include: {
				author: true,
				coauthors: true
			}
		});

		if (!note) throw new Error('Note not found');

        return new Response(JSON.stringify({ body: note }));
	} catch (error) {
		return json({
			error: error.message,
			code: error.code
		}, {
			status: 404
		});
	}
}
