import { prisma } from '$lib/prisma';

export async function getNotes() {
	const notes = await prisma.note.findMany({
		where: {
			isDraft: false, // Return all published notes
		},
	});

	return notes
}
