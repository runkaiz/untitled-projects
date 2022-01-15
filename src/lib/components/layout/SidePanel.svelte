<script>
	export let title;
</script>

<aside
	class="hidden divide-y relative xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200 overflow-y-auto"
>
	<!-- Hidden on smaller screens -->
	<slot />
</aside>
