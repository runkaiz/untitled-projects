<script context="module">
	export async function load({ params, fetch }) {
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
	export let note;

	function convertDate(date) {
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		const str = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
		return str;
	}
</script>

<h1 class="text-2xl font-bold">{note.title}</h1>

<p class="text-gray-600 pt-2 pb-4">
	Published on {convertDate(new Date(note.createdAt))} by {note.author.name}
	{#if note.coauthors.length > 0}
		and
		{#each note.coauthors as coauthor, index}
			{#if index > 0}
				{#if index === note.coauthors.length - 1}
					and
				{:else}
					,
				{/if}
			{/if}
			{coauthor.name}
		{/each}
	{/if}
</p>

<article class="prose text-black">
	{note.content}
</article>
