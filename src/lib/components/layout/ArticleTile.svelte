<svelte:options immutable={true} />

<script>
	import { page } from '$app/stores';
	export let title;
	export let author;
	export let abstract;
	export let createdAt;
	export let slug;
	export let isDraft;
</script>

<a
	href="/notes/{slug}"
	class="p-3 cursor-pointer {$page.url.pathname.split('/').pop() === slug
		? 'bg-gray-100'
		: ''} hover:bg-gray-100 transition-colors"
>
	<div class="flex justify-between space-x-3">
		<div class="min-w-0 flex-1">
			<div class="block focus:outline-none">
				<p class="text-sm font-medium text-gray-900 truncate">{title}</p>
				<p class="text-sm text-gray-500 truncate">{author}</p>
			</div>
		</div>
		<p class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
			{#if isDraft}
				Draft
			{:else}
				{createdAt}
			{/if}
		</p>
		<p />
	</div>
	<div class="mt-1">
		<p class="line-clamp-2 text-sm text-gray-600">
			{abstract}
		</p>
	</div>
</a>
