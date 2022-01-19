<script>
    import Photo from "$lib/components/feature/photos/photo.svelte";

    const promise = fetch(`https://api.untitled.workers.dev?` + new URLSearchParams({
    imagesIndex: 0,
    imagesSize: 50,
}), {
        method: "GET",
    })
        .then(response => response.text())
        .then(result => {
            return JSON.parse(result).result.images
        })
</script>

<div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <ul role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {#await promise then value}
            {#each value as photo}
                <Photo name={photo.filename} alt="" photographer="Anon" src={photo.variants[0]} />
            {/each}
        {/await}
    </ul>
</div>