<script>
    import Photo from "$lib/components/feature/photos/photo.svelte";

    let selectedPhoto;

    const promise = fetch(`https://api.untitled.workers.dev?` + new URLSearchParams({
                        imagesIndex: 0,
                        imagesSize: 50,
                    }), { method: "GET" })
                        .then(response => response.text())
                        .then(result => {
                            return JSON.parse(result).result.images
                        })

    function selectPhoto(photo) {
        selectedPhoto = photo;
        console.log(photo)
    }

    function close() {
        selectedPhoto = null;
    }
</script>

<!-- Content area -->
<div class="flex-1 flex flex-col overflow-hidden">
    <!-- Main content -->
    <div class="flex-1 flex items-stretch overflow-hidden">
      <main class="flex-1 overflow-y-auto">
        <div class="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex">
            <h1 class="flex-1 text-2xl font-bold text-gray-900">Photos</h1>
          </div>

          <!-- Gallery -->
          <section class="mt-8 pb-16" aria-labelledby="gallery-heading">
            <ul class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {#await promise then value}
                {#each value as photo}
                    <button on:click={() => selectPhoto(photo)}><Photo photo={photo} /></button>
                {/each}
                {/await}
            </ul>
          </section>
        </div>
         </main>

        <!-- Details sidebar -->
        {#if selectedPhoto}
        <aside class="hidden w-96 bg-white p-8 border-l border-gray-200 overflow-y-auto lg:block">
            <div class="pb-16 space-y-6">
                <button on:click={() => close()} type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span class="sr-only">Close panel</span>
                    <!-- Heroicon name: outline/x -->
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            <div>
                <div class="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                <img src={selectedPhoto.variants[0]} alt="" class="object-cover">
                </div>
                <div class="mt-4 flex items-start justify-between">
                <div>
                    <h2 class="text-lg font-medium text-gray-900"><span class="sr-only">Details for </span>{selectedPhoto.filename}</h2>
                    <p class="text-sm font-medium text-gray-500">3.9 MB</p>
                </div>
                <button type="button" class="ml-4 bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <!-- Heroicon name: outline/heart -->
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span class="sr-only">Favorite</span>
                </button>
                </div>
            </div>
            <div>
                <h3 class="font-medium text-gray-900">Information</h3>
                <dl class="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                <div class="py-3 flex justify-between text-sm font-medium">
                    <dt class="text-gray-500">Uploaded by</dt>
                    <dd class="text-gray-900">Anon</dd>
                </div>

                <div class="py-3 flex justify-between text-sm font-medium">
                    <dt class="text-gray-500">Uploaded</dt>
                    <dd class="text-gray-900">{selectedPhoto.uploaded}</dd>
                </div>
            </div>
            <div>
                <h3 class="font-medium text-gray-900">Description</h3>
                <div class="mt-2 flex items-center justify-between">
                <p class="text-sm text-gray-500 italic">Add a description to this image.</p>
                <button type="button" class="bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <!-- Heroicon name: solid/pencil -->
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <span class="sr-only">Add description</span>
                </button>
                </div>
            </div>
            <div class="flex">
                <button type="button" class="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Download
                </button>
                <button type="button" class="flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Delete
                </button>
            </div>
            </div>
        </aside>
        {/if}
    </div>
</div>