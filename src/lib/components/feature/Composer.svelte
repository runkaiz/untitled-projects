<script>
	import { session } from '$app/stores';
	import SvelteMarkdown from 'svelte-markdown';
	import SelectionMenu from '$lib/components/base/SelectionMenu.svelte';
	import TextField from '$lib/components/base/TextField.svelte';
	import ReactivePanel from '$lib/components/layout/ReactivePanel.svelte';
	import { onMount } from 'svelte';

	export let note = {
		title: '',
		content: '',
		isDraft: true,
		slug: null,
		author: $session.user,
		coauthors: []
	};

	let preview = false;
	let showMeta = false;
	let allAuthors = [];

	onMount(async () => {
		const { payload } = await fetch('/compose/meta/all-authors.json').then((res) => res.json());
		allAuthors = payload;
	});

	async function saveNote(event) {
		// Post the content of `note` with fetch.
		const { status } = await fetch('/compose/save', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(note)
		});

		if (status === 200) {
			// If successful, redirect to the note.
			window.location.href = `/notes/${note.slug}`;
		}
	}
</script>

<div class="flex flex-col h-full">
	<div class="mb-2 flex-none">
		<a
			href="/notes"
			class="inline-flex items-center py-1.5 text-xs font-medium rounded text-gray-700"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="-ml-1 h-3 w-3"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			Notes
		</a>
	</div>
	<input
		type="text"
		class="w-full py-1 mb-1 focus:ring-0 placeholder-gray-500 font-semibold text-xl focus:outline-none"
		placeholder="Title"
		bind:value={note.title}
	/>
	<textarea
		class="{preview
			? 'hidden'
			: ''} block w-full h-[75vh] border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 focus:outline-none sm:text-sm"
		placeholder="Write something..."
		bind:value={note.content}
	/>
	{#if preview}
		<div class="w-full min-h-[80vh]">
			<prose class="prose">
				<SvelteMarkdown source={note.content} />
			</prose>
		</div>
	{/if}
	<div class="flex flex-row grow-0 justify-between space-x-2">
		<button
			type="button"
			class="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 {preview
				? 'bg-gray-50'
				: ''} focus:outline-none"
			on:click={() => {
				preview = !preview;
			}}>Preview</button
		>
		<div>
			<button
				type="button"
				class="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
				on:click={() => {
					showMeta = !showMeta;
				}}>Meta</button
			>
			<button
				type="button"
				class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>Save</button
			>
		</div>
	</div>
</div>
<ReactivePanel active={showMeta} title="Edit Metadata">
	<div class="space-y-6">
		<TextField name="slug" label="Slug" autocomplete="off" bind:value={note.slug} />
		<TextField
			name="author"
			label="Author"
			autocomplete="off"
			value={note.author.name}
			disabled={true}
		/>
		<SelectionMenu label="Coauthors" options={allAuthors} bind:selected={note.coauthors} />

		<div class="flex items-center justify-between">
			<div class="flex items-center">
				<input
					id="publish"
					type="checkbox"
					class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
					on:change={(e) => {
						note.isDraft = !e.target.checked;
					}}
				/>
				<label for="publish" class="ml-2 block text-sm text-gray-900"> Publish </label>
			</div>
		</div>

		<div>
			<button
				class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				on:click={saveNote}
			>
				Save
			</button>
		</div>
	</div>
</ReactivePanel>