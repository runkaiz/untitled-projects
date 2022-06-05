<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				code: status,
				message: error.message
			}
		};
	}
</script>

<script>
	import MainPanel from '$lib/components/layout/MainPanel.svelte';

	export let code;
	export let message;
</script>

<title>{`${code}: ${message}`}</title>

<MainPanel>
	<div class="flex min-h-[60vh] items-center justify-center">
		<div class="text-center space-y-2">
			<h1 class="text-lg">{message}</h1>
			<p class="text-lg text-gray-300">{code}</p>
		</div>
	</div>
</MainPanel>
