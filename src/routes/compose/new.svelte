<script>
	import Composer from '$lib/components/feature/Composer.svelte';
	import MainPanel from '$lib/components/layout/MainPanel.svelte';

	import { session } from '$app/stores';
	import { onMount } from 'svelte';

	let coauthors = [];

	onMount(async () => {
		const { payload } = await fetch('/compose/meta/coauthors.json').then((res) => res.json());
		coauthors = payload;
	});
</script>

<MainPanel>
	<Composer author={$session.user} {coauthors} />
</MainPanel>
