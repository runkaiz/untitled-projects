<script>
	import MainPanel from '$lib/components/layout/MainPanel.svelte';
	import Changelog from '$lib/changelog.md';
	import { site_title } from '$lib/environment';
</script>

<svelte:head>
	<title>{site_title} • Changelog</title>
</svelte:head>

<MainPanel>
	<article class="prose text-black">
		<Changelog />
	</article>
</MainPanel>
