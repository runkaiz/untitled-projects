<script>
	import ArticleTile from '$lib/components/layout/ArticleTile.svelte';
	import SidePanel from '$lib/components/layout/SidePanel.svelte';
	import classes from 'svelte-transition-classes';
	import { session } from '$app/stores';
	import { onMount } from 'svelte';

	export let show = false;
	let notes = [];

	onMount(async function () {
		const url = `/notes/list.json`;
		const res = await fetch(url);

		if (res.ok) {
			notes = await res.json();
		}

		return {
			status: res.status,
			error: new Error(`Failed to load ${url}`)
		};
	});
</script>

{#if show}
	<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
	<div class="fixed inset-0 flex z-50 lg:hidden print:hidden" role="dialog" aria-modal="true">
		<!--
      Off-canvas menu overlay, show/hide based on off-canvas menu state.
    -->
		<div
			in:classes={{
				duration: 200,
				base: 'transition-opacity ease-linear duration-200',
				from: 'opacity-0',
				to: 'opacity-100'
			}}
			out:classes={{
				duration: 200,
				base: 'transition-opacity ease-linear duration-200',
				from: 'opacity-100',
				to: 'opacity-0'
			}}
			class="fixed inset-0 bg-gray-600 bg-opacity-75"
			aria-hidden="true"
		/>

		<!--
      Off-canvas menu, show/hide based on off-canvas menu state.
    -->
		<div
			in:classes={{
				duration: 200,
				base: 'transition ease-in-out duration-200 transform',
				from: '-translate-x-full',
				to: 'translate-x-0'
			}}
			out:classes={{
				duration: 200,
				base: 'transition ease-in-out duration-200 transform',
				from: 'translate-x-0',
				to: '-translate-x-full'
			}}
			class="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none"
		>
			<!--
        Close button, show/hide based on off-canvas menu state.
      -->
			<div
				in:classes={{
					duration: 200,
					base: 'transition ease-in-out duration-200',
					from: 'opacity-0',
					to: 'opacity-100'
				}}
				out:classes={{
					duration: 200,
					base: 'transition ease-in-out duration-200',
					from: 'opacity-100',
					to: 'opacity-0'
				}}
				class="absolute top-0 right-0 -mr-12 pt-2"
			>
				<button
					on:click={() => (show = !show)}
					type="button"
					class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none"
				>
					<span class="sr-only">Close sidebar</span>
					<!-- Heroicon name: outline/x -->
					<svg
						class="h-6 w-6 text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<div on:click={() => (show = !show)}>
				<SidePanel>
					{#each notes as note}
						{#if $session.user !== null && $session.user.isAdmin}
							<ArticleTile {...note} />
						{:else if !note.isDraft}
							<ArticleTile {...note} />
						{/if}
					{/each}
				</SidePanel>
			</div>
		</div>

		<div class="flex-shrink-0 w-14" aria-hidden="true">
			<!-- Force sidebar to shrink to fit close icon -->
		</div>
	</div>
{/if}
