<script>
	import DescriptionBox from '$lib/components/content/DescriptionBox.svelte';
	import HyperLink from '$lib/components/content/HyperLink.svelte';
	import MainPanel from '$lib/components/layout/MainPanel.svelte';
	import { site_title } from '$lib/environment';
</script>

<svelte:head>
	<title>{site_title} • Yao</title>
</svelte:head>

<MainPanel>
	<h1>Yaoyu Chen</h1>
	<p class="pt-2">
		This is a placeholder.
	</p>
</MainPanel>
