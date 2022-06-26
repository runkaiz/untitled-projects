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
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import md from '$lib/utils/markdown';
	import { afterUpdate } from 'svelte';

	export let note;

	let rendered = '';

	afterUpdate(() => {
		rendered = md.render(note.content);
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

{#if $session.user && $session.user.isAdmin}
	{#if note.isDraft}
		<!-- This example requires Tailwind CSS v2.0+ -->
		<div class="bg-gray-50 rounded-md sm:rounded-lg mb-6">
			<div class="px-4 py-5 sm:p-6">
				<h3 class="text-lg leading-6 font-medium text-gray-900">This is a draft.</h3>
				<div class="mt-2 max-w-xl text-sm text-gray-500">
					<p>Visitors cannot see this post just yet. Enter edit mode to publish.</p>
				</div>
				<div class="mt-5">
					<button
						type="button"
						class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
						on:click={() => {
							goto(`/compose/${note.slug}`);
						}}>Open Composer</button
					>
				</div>
			</div>
		</div>
	{:else}
		<div class="bg-gray-50 rounded-md sm:rounded-lg mb-6">
			<div class="px-4 py-5 sm:p-6">
				<h3 class="text-lg leading-6 font-medium text-gray-900">Published!</h3>
				<div class="mt-2 max-w-xl text-sm text-gray-500">
					<p>This note had already been published</p>
				</div>
				<div class="mt-5">
					<button
						type="button"
						class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
						on:click={() => {
							goto(`/compose/${note.slug}`);
						}}>Open Composer</button
					>
				</div>
			</div>
		</div>
	{/if}
{/if}

<h1 class="text-2xl font-bold">{note.title}</h1>

<p class="text-gray-600 pt-2 pb-4">
	{note.isDraft ? 'Updated' : 'Published'} on {convertDate(new Date(note.updatedAt))} by {note
		.author.name}
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
	{@html rendered}
</article>
