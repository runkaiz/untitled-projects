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
	let coauthorOptions = [];
	let selectedCoauthors = [];
	let isDeleting = false;
	let noTitleError = false;

	onMount(async () => {
		// Load all the users who can be selected as a co-author.
		const { payload } = await fetch('/compose/meta/all-authors.json').then((res) => res.json());
		allAuthors = payload;
		coauthorOptions = allAuthors.filter((item) => item.name !== author.name);
		selectedCoauthors = coauthors;
	});

	async function saveNote() {
		if (title.trim() === '') {
			noTitleError = true;
			return;
		}

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

<div class="flex flex-col h-full">
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

	<input
		type="text"
		class="w-full py-1 mb-1 placeholder-gray-500 font-semibold text-xl focus:ring-0 focus:outline-none border-none"
		placeholder="Title"
		bind:value={title}
	/>
	<textarea
		class="{preview
			? 'hidden'
			: ''} block w-full h-[75vh] border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 focus:outline-none sm:text-sm"
		placeholder="Write something..."
		bind:value={content}
	/>
	{#if preview}
		<div class="w-full min-h-[80vh]">
			<prose class="prose">
				<SvelteMarkdown source={content} />
			</prose>
		</div>
	{/if}

	<!-- Bottom toolbar -->
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
			{#if slug !== null}
				<button
					type="button"
					class="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded text-red-700 bg-white hover:bg-gray-50 focus:outline-none"
					on:click={() => {
						isDeleting = !isDeleting;
					}}>Delete</button
				>
			{/if}
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
				on:click={saveNote}
			>
				Save
			</button>
		</div>
	</div>
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

<ReactivePanel bind:active={showMeta} title="Edit Metadata">
	<div class="space-y-6">
		<TextField name="slug" label="Slug" autocomplete={false} bind:value={slug} />
		<TextField
			name="author"
			label="Author"
			autocomplete={false}
			value={author.name}
			disabled={true}
		/>
		<SelectionMenu label="Coauthors" options={coauthorOptions} bind:selected={selectedCoauthors} />

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
					showMeta = true;
				}}
				class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				Save
			</button>
		</div>
	</div>
</ReactivePanel>
