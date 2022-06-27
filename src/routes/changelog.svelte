<script>
	import MainPanel from '$lib/components/layout/MainPanel.svelte';
	import Changelog from '$lib/changelog.md';
</script>

<MainPanel>
	<article class="prose text-black">
		<Changelog />
	</article>
</MainPanel>
