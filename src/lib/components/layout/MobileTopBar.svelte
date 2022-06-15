<script>
	export let shouldShowOffCanvasMenu;
	export let shouldShowOffCanvasNoteMenu;

	export let isANoteOpen = false;
	let innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<!-- Top nav bar for toggling navigation on mobile devices. -->
<div class="lg:hidden z-40 print:hidden">
	<div
		class="flex fixed w-full top-0 items-center justify-between bg-white/90 backdrop-blur border-b border-gray-200 pr-4"
	>
		<div>
			<button
				type="button"
				on:click={() => (shouldShowOffCanvasMenu = !shouldShowOffCanvasMenu)}
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

		{#if isANoteOpen && innerWidth < 640}
			<div>
				<button
					type="button"
					on:click={() => (shouldShowOffCanvasNoteMenu = !shouldShowOffCanvasNoteMenu)}
					class="-mr-3 h-11 w-11 inline-flex items-center justify-center"
				>
					<span class="sr-only">Open sidebar</span>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-current"
						><path fill="none" d="M0 0h24v24H0z" /><path
							d="M20.005 2C21.107 2 22 2.898 22 3.99v16.02c0 1.099-.893 1.99-1.995 1.99H4v-4H2v-2h2v-3H2v-2h2V8H2V6h2V2h16.005zM8 4H6v16h2V4zm12 0H10v16h10V4z"
						/></svg
					>
				</button>
			</div>
		{/if}
	</div>
</div>
