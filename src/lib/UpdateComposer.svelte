<script>
	import { fly } from 'svelte/transition';
	let showTagPopover = false;

	let tagged = {
		nico: true,
		yao: false
	};

	function postUpdate(event) {
		// Get form input:
		// - title (string)
		// - content (string)
		// - image-upload (file)

		let form = event.target;
		let formData = new FormData(form);
	}

	function handleImagePreview(event) {
		// TODO: Show image preview
		const fileInput = event.target;
		const file = fileInput.files[0];
		console.log(file.name);
	}
</script>

<form on:submit|preventDefault={postUpdate} class="relative mb-6">
	<div
		class="border border-gray-300 px-3 rounded-lg shadow-sm overflow-hidden focus-within:shadow-lg transition-shadow"
	>
		<label for="title" class="sr-only">Title</label>
		<input
			type="text"
			name="title"
			id="title"
			class="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-400 focus:ring-0 focus:outline-none mb-1"
			placeholder="Title"
		/>
		<label for="content" class="sr-only">content</label>
		<textarea
			rows="4"
			name="content"
			id="content"
			class="block w-full border-0 py-0 resize-none placeholder-gray-400 focus:ring-0 text-gray-700 focus:outline-none"
			placeholder="Write something..."
		/>

		<!-- Spacer element to match the height of the toolbar -->
		<div aria-hidden="true">
			<div class="h-px" />
			<div class="py-2">
				<div class="py-px">
					<div class="h-9" />
				</div>
			</div>
		</div>
	</div>

	<div class="absolute bottom-0 inset-x-px">
		<div
			class="border-t border-gray-200 px-2 py-2 flex justify-between items-center space-x-3 sm:px-3"
		>
			<div class="flex">
				<label
					for="image-upload"
					class="-ml-2 -my-2 rounded-full px-3 py-2 inline-flex items-center text-left text-gray-500 group transition-colors cursor-pointer"
					on:change={handleImagePreview}
				>
					<!-- Heroicon name: solid/photograph -->
					<svg
						class="-ml-1 h-5 w-5 mr-2 group-hover:text-indigo-600"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
							clip-rule="evenodd"
						/>
					</svg>
					<span class="text-sm text-gray-500 group-hover:text-indigo-600 italic"
						>Attach an image</span
					>
					<input
						id="image-upload"
						name="image-upload"
						accept="image/*"
						type="file"
						class="sr-only"
					/>
				</label>
			</div>
			<div class="flex flex-row">
				<div class="flex-shrink-0 mr-2">
					<div class="relative">
						<button
							type="button"
							class="relative inline-flex items-center rounded-full py-2 px-2 bg-gray-50 text-sm font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100 transition-colors sm:px-3"
							aria-haspopup="listbox"
							aria-expanded="true"
							aria-labelledby="listbox-label"
							on:click={() => (showTagPopover = !showTagPopover)}
						>
							<!-- Selected user avatar, show/hide based on listbox state. -->
							{#if tagged.nico}
								<img
									src="https://avatars.githubusercontent.com/u/34772239?v=4"
									alt=""
									class="flex-shrink-0 h-5 w-5 rounded-full ring-1 ring-gray-50 mr-2"
								/>
							{/if}

							{#if tagged.yao}
								<img
									src="https://avatars.githubusercontent.com/u/43839115?v=4"
									alt=""
									class="flex-shrink-0 h-5 w-5 rounded-full ring-1 ring-gray-50 mr-2"
								/>
							{/if}

							<!-- Selected: "text-gray-900" -->
							<span class="hidden truncate sm:block"> Tag </span>
						</button>

						{#if showTagPopover}
							<ul
								class="absolute right-0 z-10 mt-1 w-52 bg-white shadow-xl max-h-56 rounded-lg py-3 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
								tabindex="-1"
								role="listbox"
								aria-labelledby="listbox-label"
								aria-activedescendant="listbox-option-0"
								transition:fly={{ y: -4, duration: 200 }}
							>
								<li
									class="cursor-default select-none relative py-2 px-3 bg-white hover:bg-gray-100 transition-colors"
									id="listbox-option-0"
									role="option"
									on:click={() => (tagged.nico = !tagged.nico)}
								>
									<div class="flex items-center relative">
										<img
											src="https://avatars.githubusercontent.com/u/34772239?v=4"
											alt=""
											class="flex-shrink-0 h-5 w-5 rounded-full {tagged.nico
												? 'ring-indigo-700 ring-2'
												: ''} transition-all"
										/>
										<span class="ml-3 block font-medium truncate"> Nico </span>
									</div>
								</li>

								<li
									class=" cursor-default select-none relative py-2 px-3 bg-white hover:bg-gray-100 transition-colors"
									id="listbox-option-1"
									role="option"
									on:click={() => (tagged.yao = !tagged.yao)}
								>
									<div class="flex items-center">
										<img
											src="https://avatars.githubusercontent.com/u/43839115?v=4"
											alt=""
											class="flex-shrink-0 h-5 w-5 rounded-full  {tagged.yao
												? 'ring-indigo-700 ring-2'
												: ''} transition-all"
										/>
										<span class="ml-3 block font-medium truncate"> Yao </span>
									</div>
								</li>
							</ul>
						{/if}
					</div>
				</div>

				<div class="flex-shrink-0">
					<button
						type="submit"
						class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
					>
						Post
					</button>
				</div>
			</div>
		</div>
	</div>
</form>
