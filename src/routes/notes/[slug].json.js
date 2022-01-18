import { prisma } from '$lib/prisma';

export async function get(params) {
	const { slug } = params;

	try {
		const note = await prisma.note.findFirst({
			where: { slug },
			include: {
				author: {
					select: {
						name: true
					}
				},
				coauthors: {
					select: {
						name: true
					}
				}
			}
		});

		if (!note) throw new Error('Note not found');

		return {
			status: 200,
			body: note
		};
	} catch (error) {
		return {
			status: 404,
			body: {
				error: error.message,
				code: error.code
			}
		};
	}
}
