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
		let { title, content, isDraft, slug, author, coauthors } = body;

		// Check if slug is set.
		if (!slug) {
			// Generate a slug with note.title.
			slug = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
		}

		// Check if slug exists in db.
		let noteFound = await prisma.note.findFirst({
			where: {
				slug: slug
			}
		});

		if (noteFound) {
			// Update existing note.
			noteFound = await prisma.note.update({
				where: {
					slug: slug
				},
				data: {
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
							name: coauthor
						}))
					}
				}
			});
		} else {
			// Create new note.
			noteRecord = await prisma.note.create({
				data: {
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
							name: coauthor
						}))
					}
				}
			});
		}

		return {
			status: 200,
			body: {
				message: 'Note saved.',
				note: noteRecord
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
