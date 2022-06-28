<script>
    export let title;
</script>

<div class="flex flex-row">
    <div class="basis-full border border-gray-200 rounded-md p-4 my-6">
        <h2>{title}</h2>
        <p class="pt-2">
            <slot />
        </p>
    </div>
</div>