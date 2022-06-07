import { prisma } from '$lib/prisma';

export async function get({ url }) {
	try {
		const notes = await prisma.note.findMany({
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
	} catch (error) {
		return {
			status: 500,
			body: {
				error: 'Internal Server Error'
			}
		};
	}
}
