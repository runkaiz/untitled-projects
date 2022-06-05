<<<<<<< HEAD
<script context="module">
	export async function load({ fetch }) {
		const url = `/notes/list.json`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					notes: await res.json()
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
	export let notes;
</script>

<div class="rounded-md bg-blue-50 p-4">
	<div class="flex">
	  <div class="flex-shrink-0">
		<!-- Heroicon name: solid/information-circle -->
		<svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
		  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
		</svg>
	  </div>
	  <div class="ml-3 flex-1 md:flex md:justify-between">
		<p class="text-sm text-blue-700">The notes directory is still quite incomplete, but feel free to browse if anything seems interesting.</p>
	  </div>
	</div>
</div>
<br />
<div class="rounded-md bg-blue-50 p-4">
	<div class="flex">
	  <div class="flex-shrink-0">
		<!-- Heroicon name: solid/information-circle -->
		<svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
		  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
		</svg>
	  </div>
	  <div class="ml-3 flex-1 md:flex md:justify-between">
		<p class="text-sm text-blue-700">The mailing list is not currently setup to work, but eventually it will be an option.</p>
	  </div>
	</div>
</div>

<div class="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
	<div class="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
	  <div>
		<h2 class="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Published Notes</h2>
		<div class="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
		  <p class="text-xl text-gray-500">A collection of interesting notes.</p>
		  <form class="mt-6 flex flex-col sm:flex-row lg:mt-0 lg:justify-end">
			<div>
			  <label for="email-address" class="sr-only">Email address</label>
			  <input id="email-address" name="email-address" type="email" autocomplete="email" required class="appearance-none w-full px-4 py-2 border border-gray-300 text-base rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 lg:max-w-xs" placeholder="Enter your email">
			</div>
			<div class="mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex">
			  <button type="button" class="w-full bg-indigo-600 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:inline-flex">Notify me</button>
			</div>
		  </form>
		</div>
	  </div>
	  <div class="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
		{#each notes as note}
			{#if !note.isDraft}
				<div>
					<p class="text-sm text-gray-500">
						<time datetime="2020-03-16">Written by {note.author} on {note.createdAt}</time>
					</p>
					<div class="mt-2 block">
						<p class="text-xl font-semibold text-gray-900">{note.title}</p>
						<p class="mt-3 text-base text-gray-500">{note.abstract}</p>
					</div>
					<div class="mt-3">
						<a href="/notes/{note.slug}" class="text-base font-semibold text-indigo-600 hover:text-indigo-500"> Read full story </a>
					</div>
				</div>
			{/if}
		{/each}
	  </div>
	</div>
 </div>
  
=======
>>>>>>> f9bf471 (Empty note index.)
