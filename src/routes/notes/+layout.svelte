<script>
	import ArticleTile from '$lib/components/layout/ArticleTile.svelte';
	import MainPanel from '$lib/components/layout/MainPanel.svelte';
	import SidePanel from '$lib/components/layout/SidePanel.svelte';
	import { page, navigating } from '$app/stores';
	import { beforeUpdate, afterUpdate } from 'svelte';

	export let data;

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
		{#if $navigating} Loading... {:else} <slot /> {/if}
	</div>
</MainPanel>
{#if showSidePanel || innerWidth > 640}
	{#if innerWidth < 1024}
		<div class="mt-11 flex">
			<SidePanel>
				{#each data.notes as note}
					{#if $page.data.user !== null && $page.data.user.isAdmin}
						<ArticleTile {...note} />
					{:else if !note.isDraft}
						<ArticleTile {...note} />
					{/if}
				{/each}
			</SidePanel>
		</div>
	{:else}
		<SidePanel>
			{#each data.notes as note}
				{#if $page.data.user !== null && $page.data.user.isAdmin}
					<ArticleTile {...note} />
				{:else if !note.isDraft}
					<ArticleTile {...note} />
				{/if}
			{/each}
		</SidePanel>
	{/if}
{/if}
