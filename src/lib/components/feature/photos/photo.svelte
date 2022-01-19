<script>
    export let name;
    export let photographer;
    export let alt;
    export let src;
</script>

<photo>
    <li class="relative">
        <div class="group block w-full rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
            <img src={src} alt={alt} class="object-cover cursor-pointer group-hover:opacity-75">
            <button type="button" class="absolute inset-0 focus:outline-none">
                <span class="sr-only">View details for IMG_4985.HEIC</span>
            </button>
        </div>
        <p class="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{name}</p>
        <p class="block text-sm font-medium text-gray-500 pointer-events-none">{photographer}</p>
    </li>
</photo>