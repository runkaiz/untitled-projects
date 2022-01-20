<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import OffCanvasMenu from './OffCanvasMenu.svelte';
	let showOffCanvasMenu = false;
</script>

<OffCanvasMenu bind:show={showOffCanvasMenu} />
<main class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
	<!-- Top nav bar for toggling navigation on mobile devices. -->
	<div class="lg:hidden">
		<div
			class="flex fixed w-full top-0 items-center justify-between bg-white/90 backdrop-blur border-b border-gray-200 pr-4"
		>
			<div>
				<a href=".." class="h-11 w-11 inline-flex items-center justify-center">
					<span class="sr-only">Open sidebar</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						class="h-6 w-6 fill-current text-gray-900"
					>
						><path fill="none" d="M0 0h24v24H0z" /><path
							d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"
						/></svg
					>
				</a>
			</div>
			<div>
				<button
					type="button"
					on:click={() => (showOffCanvasMenu = !showOffCanvasMenu)}
					class="-mr-3 h-11 w-11 inline-flex items-center justify-center"
				>
					<span class="sr-only">Open sidebar</span>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-current">
						><path fill="none" d="M0 0h24v24H0z" /><path
							d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"
						/></svg
					>
				</button>
			</div>
		</div>
	</div>
	<div class="max-w-2xl mx-auto px-4 pt-16 pb-3 lg:px-8">
		<slot />
	</div>
</main>
