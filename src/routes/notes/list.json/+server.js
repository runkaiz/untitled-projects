import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';

export async function GET() {
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

		return new Response(JSON.stringify({ body: data }));
	} catch (error) {
		return json(
			{
				error: 'Internal Server Error'
			},
			{
				status: 500
			}
		);
	}
}
