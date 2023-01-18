<script context="module">
	export async function load({ session }) {
		if (!session.user) {
			return {
				status: 307,
				redirect: '/'
			};
		} else {
			return {
				status: 200
			};
		}
	}
</script>

<script>
	import Composer from '$lib/components/feature/Composer.svelte';
	import MainPanel from '$lib/components/layout/MainPanel.svelte';
</script>

<MainPanel>
	<Composer />
</MainPanel>
