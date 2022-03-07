<script context="module">
	export async function load({ session, params, fetch }) {
		if (!session.user) {
			return {
				status: 307,
				redirect: '/'
			};
		}

		const url = `/notes/${params.slug}.json`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					note: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Failed to load ${url}`)
		};
	}
</script>

<script>
	import Composer from '$lib/components/feature/Composer.svelte';
	import MainPanel from '$lib/components/layout/MainPanel.svelte';

	export let note;
</script>

<MainPanel>
	<Composer
		title={note.title}
		content={note.content}
		isDraft={note.isDraft}
		slug={note.slug}
		author={note.author}
	/>
</MainPanel>
