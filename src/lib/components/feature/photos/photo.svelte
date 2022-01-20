<script>
    export let photo;
    let name = photo.filename;
    let photographer = "Anon";
    let alt = "";
    let src = photo.variants[0];

    export let highlighted = false;
</script>

<photo>
    <li class="relative">
        {#if highlighted}
            <!-- Current: "ring-2 ring-offset-2 ring-indigo-500", Default: "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500" -->
            <div class="ring-2 ring-offset-2 ring-indigo-500 group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden">
                <!-- Current: "", Default: "group-hover:opacity-75" -->
                <img src={src} alt={alt} class="object-cover pointer-events-none">
                <button type="button" class="absolute inset-0 focus:outline-none">
                <span class="sr-only">View details for {photographer}</span>
                </button>
            </div>
            <p class="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{name}</p>
            <p class="block text-sm font-medium text-gray-500 pointer-events-none">{photographer}</p>
        {:else}
            <!-- Current: "ring-2 ring-offset-2 ring-indigo-500", Default: "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500" -->
            <div class="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden">
                <!-- Current: "", Default: "group-hover:opacity-75" -->
                <img src={src} alt={alt} class="object-cover pointer-events-none">
                <button type="button" class="absolute inset-0 focus:outline-none">
                <span class="sr-only">View details for {photographer}</span>
                </button>
            </div>
            <p class="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{name}</p>
            <p class="block text-sm font-medium text-gray-500 pointer-events-none">{photographer}</p>
        {/if}
    </li>
</photo>