<!-- TODO: Change this into ListPanel -->
<svelte:options immutable={true} />

<script>
	export let title;
	export let author;
	export let abstract;
	export let date;
</script>

<div class="p-3 cursor-pointer hover:bg-gray-200 transition-colors">
	<div class="flex justify-between space-x-3">
		<div class="min-w-0 flex-1">
			<a href="#" class="block focus:outline-none">
				<p class="text-sm font-medium text-gray-900 truncate">{title}</p>
				<p class="text-sm text-gray-500 truncate">{author}</p>
			</a>
		</div>
		<p class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
			{date}
		</p>
		<p />
	</div>
	<div class="mt-1">
		<p class="line-clamp-2 text-sm text-gray-600">
			{abstract}
		</p>
	</div>
</div>
