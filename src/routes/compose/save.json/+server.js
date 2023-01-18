import { json as json$1 } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';

export async function POST({ request, locals }) {
	// Check auth.
	if (!locals.user || !locals.user.userId) {
		return new Response(undefined, { status: 403 });
	}

	try {
		const body = await request.json();
		let { title, content, isDraft, slug, coauthors } = body;

		// Check if slug is set.
		if (!slug) {
			// Generate a slug with note.title.
			slug = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
		}

		const note = await prisma.note.upsert({
			update: {
				title: title,
				content: content,
				isDraft: isDraft,
				slug: slug,
				coauthors: {
					set: [],
					connect: coauthors.map((coauthor) => ({
						id: coauthor.id
					}))
				}
			},
			where: {
				slug: slug
			},
			create: {
				title: title,
				content: content,
				isDraft: isDraft,
				slug: slug,
				author: {
					connect: {
						id: locals.user.userId
					}
				},
				coauthors: {
					connect: coauthors.map((coauthor) => ({
						id: coauthor.id
					}))
				}
			}
		});

		return json$1({
			message: 'Note saved.',
			note: note
		});
	} catch (error) {
		return json$1({
			message: error.message
		}, {
			status: 400
		});
	}
}
