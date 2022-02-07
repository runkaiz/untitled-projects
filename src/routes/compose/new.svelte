<script>
	import Composer from '$lib/components/feature/Composer.svelte';
	import MainPanel from '$lib/components/layout/MainPanel.svelte';

	import { session } from '$app/stores';
</script>

<MainPanel>
	<Composer author={$session.user} />
</MainPanel>
