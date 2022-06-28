<script>
	import HyperLink from './HyperLink.svelte';

	export let title;
	export let subtitle;
	export let buttonText;
	export let buttonLink;
</script>

<div>
	<div class="sm:flex sm:items-center">
		<div class="sm:flex-auto">
			<h1>{title}</h1>
			<p class="mt-2">{subtitle}</p>
		</div>
		<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
			<HyperLink link={buttonLink}
				><button
					type="button"
					class="inline-flex items-center justify-center rounded-md border border-transparent bg-link px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
					>{buttonText}</button
				></HyperLink
			>
		</div>
	</div>
	<div class="mt-8 flex flex-col">
		<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
				<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
					<table class="min-w-full">
						<thead class="bg-white">
							<tr>
								<th
									scope="col"
									class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-title sm:pl-6"
									>Name</th
								>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-title"
									>Platform</th
								>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-title"
									>Language</th
								>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-title"
									>Status</th
								>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-title">
									Source<span class="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody class="bg-white">
							<slot />
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
