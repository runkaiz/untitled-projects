import { getNotes } from '$lib/utils/getNotes';

export async function get() {
    const notes = await getNotes();
    const body = xml(notes);

	const headers = {
		'Cache-Control': 'max-age=0, s-maxage=3600',
		'Content-Type': 'application/xml'
	}
	return {
		headers,
		body,
	}
}

const xml = notes => `<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
<channel>
  <title>Untitled Notes</title>
  <link>https://untitled.codes/notes</link>
  <description>A blog built with SvelteKit about tech and stuff!</description>
  ${notes
      .map(
        note =>
          `
        <item>
          <title>${note.title}</title>
          <description>A blog built with SvelteKit about tech and stuff!</description>
          <link>https://untitled.codes/notes/${note.slug}</link>
          <pubDate>${note.createdAt}</pubDate>
          <content:encoded>
          ${note.content}
          </content:encoded>
        </item>
      `
      )
      .join('')}
</channel>
</rss>`