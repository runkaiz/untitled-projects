import { prisma } from '$lib/prisma';

// export let note = {
// 	title: '',
// 	content: '',
// 	isDraft: true,
// 	slug: null,
// 	author: $session.user,
// 	coauthors: []
// };

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
		const { note } = body;

		// Check if note.slug is set.
		if (!note.slug) {
			// Generate a slug with note.title.
			note.slug = note.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
		}

		// Check if note.slug is unique.
		const noteRecord = await prisma.note.findFirst({
			where: {
				slug: note.slug
			}
		});

		if (noteRecord) {
			// Update existing note.
			noteRecord = await prisma.note.update({
				where: {
					slug: note.slug
				},
				data: {
					title: note.title,
					content: note.content,
					isDraft: note.isDraft,
					slug: note.slug,
					author: {
						connect: {
							userId: locals.user.userId
						}
					},
					coauthors: {
						connect: note.coauthors.map((coauthor) => ({
							userId: coauthor.userId
						}))
					}
				}
			});
		} else {
			// Create new note.
			noteRecord = await prisma.note.create({
				data: {
					title: note.title,
					content: note.content,
					isDraft: note.isDraft,
					slug: note.slug,
					author: {
						connect: {
							userId: locals.user.userId
						}
					},
					coauthors: {
						connect: note.coauthors.map((coauthor) => ({
							userId: coauthor.userId
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
