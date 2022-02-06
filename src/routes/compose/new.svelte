<script>
	import MainPanel from '$lib/components/layout/MainPanel.svelte';
	// import { prisma } from '$lib/prisma';
	import SvelteMarkdown from 'svelte-markdown';

	export async function load({ session }) {
		if (!session.user) {
			return {
				status: 307,
				redirect: '/'
			};
		}
	}

	let source = '';
	let preview = false;
</script>

<MainPanel>
	<div class="flex flex-col h-full">
		<div class="mb-2 flex-none">
			<a
				href="/compose/edit"
				class="inline-flex items-center py-1.5 text-xs font-medium rounded text-gray-700"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="-ml-1 h-3 w-3"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
				Notes
			</a>
		</div>
		<input
			type="text"
			class="w-full py-1 mb-1 focus:ring-0 placeholder-gray-500 font-semibold text-xl focus:outline-none"
			placeholder="Title"
		/>
		<textarea
			class="{preview
				? 'hidden'
				: ''} block w-full min-h-[80vh] border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 focus:outline-none sm:text-sm"
			placeholder="Write something..."
			bind:value={source}
		/>
		{#if preview}
			<div class="w-full min-h-[80vh]">
				<prose class="prose">
					<SvelteMarkdown {source} />
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
					>Meta</button
				>
				<button
					type="button"
					class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>Save</button
				>
			</div>
		</div>
	</div>
</MainPanel>
