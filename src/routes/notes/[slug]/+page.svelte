<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import md from '$lib/utils/markdown';
	import { afterUpdate } from 'svelte';

	export let data;

	let rendered = '';

	afterUpdate(() => {
		rendered = md.render(data.note.content);
	});

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

<svelte:head>
	<title>Notes • {data.note.title}</title>
</svelte:head>

{#if $page.data.user && $page.data.user.isAdmin}
	{#if data.note.isDraft}
		<!-- This example requires Tailwind CSS v2.0+ -->
		<div class="bg-gray-50 rounded-md sm:rounded-lg mb-6">
			<div class="px-4 py-5 sm:p-6">
				<h3 class="leading-6">This is a draft.</h3>
				<div class="mt-2 max-w-xl text-sm text-gray-500">
					<p>Visitors cannot see this post just yet. Enter edit mode to publish.</p>
				</div>
				<div class="mt-5">
					<button
						type="button"
						class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-paragraph bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
						on:click={() => {
							goto(`/compose/${data.note.slug}`);
						}}>Open Composer</button
					>
				</div>
			</div>
		</div>
	{:else}
		<div class="bg-gray-50 rounded-md sm:rounded-lg mb-6">
			<div class="px-4 py-5 sm:p-6">
				<h3 class="leading-6">Published!</h3>
				<div class="mt-2 max-w-xl text-sm text-gray-500">
					<p>This note had already been published</p>
				</div>
				<div class="mt-5">
					<button
						type="button"
						class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-paragraph bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
						on:click={() => {
							goto(`/compose/${data.note.slug}`);
						}}>Open Composer</button
					>
				</div>
			</div>
		</div>
	{/if}
{/if}

<h1>{data.note.title}</h1>

<p class="text-gray-600 pt-2 pb-4">
	{data.note.isDraft ? 'Updated' : 'Published'} on {convertDate(new Date(data.note.updatedAt))} by {data
		.note.author.name}
	{#if data.note.coauthors.length > 0}
		and
		{#each data.note.coauthors as coauthor, index}
			{#if index > 0}
				{#if index === data.note.coauthors.length - 1}
					and
				{:else}
					,
				{/if}
			{/if}
			{coauthor.name}
		{/each}
	{/if}
</p>



<article class="wrapper prose text-black">
	{@html rendered}
</article>

<!-- Svelte removes any CSS selector when it does not find it in plaintext so for @html this is the only way to apply style -->
<style>
	.wrapper > :global(whitespace-pre-wrap) {
		white-space: pre-wrap;
	}
	.wrapper > :global(p) > :global(img) {
		border-radius: 0.375rem;
	}

	@media (min-width: 640px) {
		.wrapper > :global(p) > :global(img) {
			border-radius: 0.5rem;
		}
	}
</style>
