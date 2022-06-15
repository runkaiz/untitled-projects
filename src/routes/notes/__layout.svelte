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
	import { session, page } from '$app/stores';
	import { beforeUpdate, afterUpdate } from 'svelte';

	export let notes;

	let showSidePanel = false;
	let innerWidth = 0;

	beforeUpdate(() => {
		showSidePanel = false;

		if ($page.url.pathname === '/notes') {
			showSidePanel = true;
		}
	});

	afterUpdate(() => {
		showSidePanel = false;

		if ($page.url.pathname === '/notes') {
			showSidePanel = true;
		}
	});
</script>

<svelte:window bind:innerWidth />

<MainPanel>
	<div class="mt-6 lg:mt-0">
		<slot />
	</div>
</MainPanel>
{#if showSidePanel || innerWidth > 640}
	{#if innerWidth < 1024}
		<div class="mt-11 flex">
			<SidePanel>
				{#each notes as note}
					{#if $session.user !== null && $session.user.isAdmin}
						<ArticleTile {...note} />
					{:else if !note.isDraft}
						<ArticleTile {...note} />
					{/if}
				{/each}
			</SidePanel>
		</div>
	{:else}
		<SidePanel>
			{#each notes as note}
				{#if $session.user !== null && $session.user.isAdmin}
					<ArticleTile {...note} />
				{:else if !note.isDraft}
					<ArticleTile {...note} />
				{/if}
			{/each}
		</SidePanel>
	{/if}
{/if}
