<script>
    export let name;
    export let platform;
    export let language;
    export let status;
    export let link;
</script>

<tr class="border-t border-gray-300">
    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{name}</td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{platform}</td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{language}</td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{status}</td>
    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <a href={link} class="text-indigo-600 hover:text-indigo-900">Repository<span class="sr-only">Link to project</span></a>
    </td>
</tr>