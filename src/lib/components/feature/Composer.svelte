<script>
	import { onMount } from 'svelte';
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import SelectionMenu from '$lib/components/base/SelectionMenu.svelte';
	import TextField from '$lib/components/base/TextField.svelte';
	import ReactivePanel from '$lib/components/layout/ReactivePanel.svelte';
	import SvelteMarkdown from 'svelte-markdown';

	export let title = '';
	export let content = '';
	export let isDraft = true;
	export let slug = null;
	export let author = $session.user;
	export let coauthors = [];

	let preview = false;
	let showMeta = false;
	let allAuthors = [];
	let selectedCoauthors = [];
	let isDeleting = false;

	onMount(async () => {
		// Load all the users who can be selected as a co-author.
		const { payload } = await fetch('/compose/meta/all-authors.json').then((res) => res.json());
		allAuthors = payload;
		selectedCoauthors = coauthors;
	});

	async function saveNote() {
		coauthors = selectedCoauthors;
		const { status } = await fetch('/compose/save.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title,
				content,
				isDraft,
				slug,
				coauthors
			})
		});

		// TODO: Better error/success handling.
		if (status === 200) {
			// If successful, redirect to the note.
			if (!slug) {
				// Generate a slug with note.title.
				slug = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
			}
			goto(`/notes/${slug}`);
		} else {
			// If not, show an error.
			alert('Error saving note.');
		}
	}

	async function deleteNote() {
		const { status } = await fetch('/compose/delete.json', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				slug
			})
		});

		// TODO: Better error/success handling.
		if (status === 200) {
			goto(`/notes`);
		} else {
			// If not, show an error.
			alert('Error deleting note.');
		}
	}
</script>

<div class="flex flex-col h-screen">
	<!-- Go back to view all notes. -->
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

	<form class="relative">
		<div class="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
		  <label for="title" class="sr-only">Title</label>
		  <input type="text" name="title" id="title" class="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0" placeholder="Title" bind:value={title} />
		  <label for="description" class="sr-only">Content</label>
		  {#if preview}
			<div class="m-3">
				<prose class="prose">
					<SvelteMarkdown source={content} />
				</prose>
			</div>
			{:else}
			<textarea rows="35" name="description" id="description" class="block w-full border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm" placeholder="Write something..." bind:value={content} />
		{/if}
	  
		  <!-- Spacer element to match the height of the toolbar -->
		  <div aria-hidden="true">
			<div class="py-2">
			  <div class="h-9"></div>
			</div>
			<div class="h-px"></div>
			<div class="py-2">
			  <div class="py-px">
				<div class="h-9"></div>
			  </div>
			</div>
		  </div>
		</div>
	  
		<div class="absolute bottom-0 inset-x-px">
			<div class="border-t border-gray-200 px-2 py-2 flex justify-between items-center space-x-3 sm:px-3">
				<div class="flex">
					<button type="button" class="-ml-2 -my-2 rounded-full px-3 py-2 inline-flex items-center text-left text-gray-400 group {preview ? 'bg-gray-50' : ''}" on:click={() => {
						preview = !preview;
					}}>
						<svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 h-5 w-5 mr-2 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2} aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					  	</svg>
						<span class="text-sm text-gray-500 group-hover:text-gray-600">Preview</span>
					</button>
				</div>
				<div class="px-2 py-2 flex justify-between items-center space-x-3 sm:px-3">
					<div class="flex-shrink-0">
						<button type="button" on:click={() => {
							isDeleting = !isDeleting;
						}} class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</button>
					</div>
					<div class="flex-shrink-0">
						<button type="button" on:click={() => {
							showMeta = !showMeta;
						}} class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Meta</button>
					</div>
					<div class="flex-shrink-0">
						<button type="button" on:click={saveNote} class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
					</div>
				</div>
			</div>
		</div>
	</form>
</div>

{#if isDeleting}
	<div
		class="fixed z-10 inset-0 overflow-y-auto"
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
	>
		<div
			class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
		>
			<!--
			Background overlay, show/hide based on modal state.

			Entering: "ease-out duration-300"
			From: "opacity-0"
			To: "opacity-100"
			Leaving: "ease-in duration-200"
			From: "opacity-100"
			To: "opacity-0"
		-->
			<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />

			<!-- This element is to trick the browser into centering the modal contents. -->
			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
				>&#8203;</span
			>

			<!--
			Modal panel, show/hide based on modal state.

			Entering: "ease-out duration-300"
			From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
			To: "opacity-100 translate-y-0 sm:scale-100"
			Leaving: "ease-in duration-200"
			From: "opacity-100 translate-y-0 sm:scale-100"
			To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
		-->
			<div
				class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
			>
				<div class="sm:flex sm:items-start">
					<div
						class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
					>
						<!-- Heroicon name: outline/exclamation -->
						<svg
							class="h-6 w-6 text-red-600"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
					</div>
					<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
						<h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
							Delete note
						</h3>
						<div class="mt-2">
							<p class="text-sm text-gray-500">
								Are you sure you want to delete this note? It will be permanently removed from our
								servers forever. This action cannot be undone.
							</p>
						</div>
					</div>
				</div>
				<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
					<button
						type="button"
						class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
						on:click={deleteNote}>Delete</button
					>
					<button
						type="button"
						class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
						on:click={() => {
							isDeleting = !isDeleting;
						}}>Cancel</button
					>
				</div>
			</div>
		</div>
	</div>
{/if}

<ReactivePanel active={showMeta} title="Edit Metadata">
	<div class="space-y-6">
		<TextField name="slug" label="Slug" autocomplete={false} bind:value={slug} />
		<TextField
			name="author"
			label="Author"
			autocomplete={false}
			value={author.name}
			disabled={true}
		/>
		<SelectionMenu label="Coauthors" options={allAuthors} bind:selected={selectedCoauthors} />

		<div class="flex items-center justify-between">
			<div class="flex items-center">
				<input
					id="publish"
					type="checkbox"
					class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
					on:change={(e) => {
						isDraft = !e.target.checked;
					}}
				/>
				<label for="publish" class="ml-2 block text-sm text-gray-900"> Publish </label>
			</div>
		</div>

		<div>
			<button
				on:click={() => {
					showMeta = !showMeta;
				}}
				class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				Save
			</button>
		</div>
	</div>
</ReactivePanel>
