import { prisma } from '$lib/prisma';

// TODO: Handle errors
// TODO: Add pagination ()
//			 https://www.prisma.io/docs/concepts/components/prisma-client/pagination
export async function get() {
	const notes = await prisma.note.findMany({
		take: 10,
		orderBy: {
			createdAt: 'desc'
		},
		include: {
			author: {
				select: {
					name: true
				}
			}
		}
	});

	const data = notes.map((note) => ({
		title: note.title,
		slug: note.slug,
		author: note.author.name,
		coauthors: note.coauthors,
		createdAt: note.createdAt.toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		}),
		abstract: note.content.substring(0, 120),
		isDraft: note.isDraft
	}));

	return {
		status: 200,
		body: data
	};
}
