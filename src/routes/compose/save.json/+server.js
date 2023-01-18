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

		return {
			status: 200,
			body: {
				message: 'Note saved.',
				note: note
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
