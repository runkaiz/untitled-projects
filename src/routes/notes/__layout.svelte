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
	import { session } from '$app/stores';
	export let notes;
</script>

<MainPanel>
	<slot />
</MainPanel>
<SidePanel>
	{#each notes as note}
		{#if $session.user !== null}
			{#if $session.user.isAdmin}
				<ArticleTile {...note} />
			{/if}
		{:else}
			{#if !note.isDraft}
				<ArticleTile {...note} />
			{/if}
		{/if}
	{/each}
</SidePanel>
