<script>
	import { fly, scale } from 'svelte/transition';
	import { bounceIn } from 'svelte/easing';

	let showTagPopover = false;

	let imageUploader = {
		isUploading: false,
		textPrompt: 'Attach an image',
		imageReady: false,
		error: false
	};

	let newUpdate = {
		title: '',
		content: '',
		imgUrl: '',
		tagged: {
			nico: true,
			yao: false
		}
	};

	function refreshUpdates() {
		// TODO: fetch updates from server and update the state
	}

	function postUpdate(event) {
		// Get form input:
		// - title (string)
		// - content (string)
		// - image-upload (file)

		const form = event.target;
		const formData = new FormData(form);

		// Validate form input:
		// - title is not empty
		// - content is not empty

		if (newUpdate.title.length === 0) {
			alert('Title is required');
			return;
		}

		if (newUpdate.content.length === 0) {
			alert('Content is required');
			return;
		}

		// Send form data to server:
		// - title
		// - content
		// - imgUrl (optional)

		// If successful, refresh the page
		const baseUrl = import.meta.env.VITE_API_BASE_URL;
		// A list of authors who were tagged in the update
		const tagged = [];
		if (newUpdate.tagged.nico) {
			tagged.push('nico');
		}
		if (newUpdate.tagged.yao) {
			tagged.push('yao');
		}
		// Set the request headers
		const headers = new Headers();
		const token = import.meta.env.VITE_API_TOKEN;
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		headers.append('Authorization', `Token ${token}`);
		fetch(`${baseUrl}/updates/`, {
			method: 'POST',
			headers,
			body: {
				title: newUpdate.title,
				content: newUpdate.content,
				imgUrl: newUpdate.imgUrl,
				date: Date.now(),
				tagged: tagged
			}
		})
			.then((response) => response.json())
			.then((data) => {
				if (!data.error) {
					refreshUpdates();
				} else {
					// TODO handle error in UI
					alert(data.message);
				}
			});
	}

	async function handleImagePreview(event) {
		imageUploader.isUploading = true;
		imageUploader.textPrompt = 'Uploading...';
		// TODO: Show image preview
		const fileInput = event.target;
		const file = fileInput.files[0];

		// Validate file type
		if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
			alert('Only jpeg and png images are allowed');
			imageUploader.isUploading = false;
			imageUploader.textPrompt = 'Select another image?';
			return;
		}

		// Validate file size (less than 10MB)
		if (file.size > 10 * 1024 * 1024) {
			alert('Image size must be less than 10MB');
			imageUploader.isUploading = false;
			imageUploader.textPrompt = 'Select another image?';
			return;
		}

		let uploadUrl = '';
		const token = import.meta.env.VITE_IMAGE_SERVICE_TOKEN;
		await fetch('https://ych.npkn.net/image-service', {
			method: 'POST',
			headers: {
				Authorization: `Token ${token}`
			}
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					uploadUrl = data.result;
				} else {
					imageUploader.error = true;
					imageUploader.textPrompt = 'Something went wrong';
				}
			});

		// Send file as a multipart/form data to uploadUrl
		const formData = new FormData();
		formData.append('file', file);
		await fetch(uploadUrl, {
			method: 'POST',
			body: formData
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					newUpdate.imgUrl = data.result.variants[0];
					imageUploader.imageReady = true;
					imageUploader.textPrompt = 'Image uploaded';
				} else {
					imageUploader.error = true;
					imageUploader.textPrompt = 'Something went wrong';
				}
			});

		imageUploader.isUploading = false;
		imageUploader.textPrompt = 'Replace image?';
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
			bind:value={newUpdate.title}
		/>
		<label for="content" class="sr-only">content</label>
		<textarea
			rows="4"
			name="content"
			id="content"
			class="block w-full border-0 py-0 resize-none placeholder-gray-400 focus:ring-0 text-gray-700 focus:outline-none"
			placeholder="Write something..."
			bind:value={newUpdate.content}
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
					class="-ml-2 -my-2 relative rounded-full px-3 py-2 inline-flex items-center text-left text-gray-500 group transition-colors {imageUploader.isUploading
						? 'cursor-default'
						: 'cursor-pointer'}"
					on:change={handleImagePreview}
				>
					{#if imageUploader.isUploading}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							class="-ml-1 h-5 w-5 animate-spin absolute"
							fill="currentColor"
							in:scale={{
								duration: 100,
								delay: 150,
								opacity: 0.5,
								start: 0.5,
								easing: bounceIn
							}}
							out:scale={{
								duration: 100,
								delay: 0,
								opacity: 0.5,
								start: 0.5,
								easing: bounceIn
							}}
							><path fill="none" d="M0 0h24v24H0z" /><path
								d="M3.055 13H5.07a7.002 7.002 0 0 0 13.858 0h2.016a9.001 9.001 0 0 1-17.89 0zm0-2a9.001 9.001 0 0 1 17.89 0H18.93a7.002 7.002 0 0 0-13.858 0H3.055z"
							/></svg
						>
					{:else if imageUploader.imageReady}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							class="-ml-1 h-5 w-5 text-green-500 group-hover:text-indigo-600 absolute"
							fill="currentColor"
							in:scale={{
								duration: 100,
								delay: 150,
								opacity: 0.5,
								start: 0.5,
								easing: bounceIn
							}}
							out:scale={{
								duration: 100,
								opacity: 0.5,
								start: 0.5,
								easing: bounceIn
							}}
							><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" /></svg
						>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							class="-ml-1 h-5 w-5 group-hover:text-indigo-600 {imageUploader.error
								? 'text-red-600'
								: ''} absolute"
							fill="currentColor"
							in:scale={{
								duration: 100,
								delay: 150,
								opacity: 0.5,
								start: 0.5,
								easing: bounceIn
							}}
							out:scale={{
								duration: 100,
								opacity: 0.5,
								start: 0.5,
								easing: bounceIn
							}}
							><path fill="none" d="M0 0h24v24H0z" /><path
								d="M21 15v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2zm.008-12c.548 0 .992.445.992.993V13h-2V5H4v13.999L14 9l3 3v2.829l-3-3L6.827 19H14v2H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016zM8 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
							/></svg
						>
					{/if}
					<span
						class="text-sm ml-6 {imageUploader.error ? 'text-red-600' : 'text-gray-500'} 
							{imageUploader.isUploading ? '' : 'group-hover:text-indigo-600'} italic"
						>{imageUploader.textPrompt}</span
					>
					<input
						id="image-upload"
						name="image-upload"
						accept="image/*"
						type="file"
						class="sr-only"
						disabled={imageUploader.isUploading}
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
							{#if newUpdate.tagged.nico}
								<img
									src="https://avatars.githubusercontent.com/u/34772239?v=4"
									alt=""
									class="flex-shrink-0 h-5 w-5 rounded-full ring-1 ring-gray-50 mr-2"
								/>
							{/if}

							{#if newUpdate.tagged.yao}
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
									on:click={() => (newUpdate.tagged.nico = !newUpdate.tagged.nico)}
								>
									<div class="flex items-center relative">
										<img
											src="https://avatars.githubusercontent.com/u/34772239?v=4"
											alt=""
											class="flex-shrink-0 h-5 w-5 rounded-full {newUpdate.tagged.nico
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
									on:click={() => (newUpdate.tagged.yao = !newUpdate.tagged.yao)}
								>
									<div class="flex items-center">
										<img
											src="https://avatars.githubusercontent.com/u/43839115?v=4"
											alt=""
											class="flex-shrink-0 h-5 w-5 rounded-full  {newUpdate.tagged.yao
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
						class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white {!newUpdate.content ||
						imageUploader.isUploading
							? 'bg-gray-300 cursor-default'
							: 'cursor-pointer bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 '} transition-colors"
						disabled={!newUpdate.content || imageUploader.isUploading}
					>
						Post
					</button>
				</div>
			</div>
		</div>
	</div>
</form>
