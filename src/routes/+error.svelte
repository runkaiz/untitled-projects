<script>
    import { page } from '$app/stores';
	import MainPanel from '$lib/components/layout/MainPanel.svelte';
</script>

<title>{`${$page.status}: ${$page.error.message}`}</title>


<MainPanel>
	<div class="flex min-h-[60vh] items-center justify-center">
		<div class="text-center space-y-2">
			<h1>{$page.error.message}</h1>
			<p class="text-lg text-gray-300">{$page.status}</p>
		</div>
	</div>
</MainPanel>
