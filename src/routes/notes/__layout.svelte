<script context="module">
	export async function load({ fetch }) {
		const url = `/notes/list.json`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					notes: await res.json()
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
	import ArticleTile from '$lib/components/layout/ArticleTile.svelte';
	import MainPanel from '$lib/components/layout/MainPanel.svelte';
	import SidePanel from '$lib/components/layout/SidePanel.svelte';
	export let notes;

	console.log(notes);
</script>

<MainPanel>
	<slot />
</MainPanel>
<SidePanel>
	{#each notes as note}
		<ArticleTile {...note} />
	{/each}
</SidePanel>
