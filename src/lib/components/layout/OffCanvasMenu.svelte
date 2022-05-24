<script>
	import classes from 'svelte-transition-classes';
	import { page, session } from '$app/stores';
	import { menuItems } from '$lib/menu-items';
	export let show = false;
	export let shouldShowLogin;
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

			<div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
				<div class="flex-shrink-0 flex items-center px-4">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
						><path fill="none" d="M0 0h24v24H0z" /><path
							d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm9 12v2h6v-2h-6zm-3.586-3l-2.828 2.828L7 16.243 11.243 12 7 7.757 5.586 9.172 8.414 12z"
						/></svg
					>
				</div>
				<nav aria-label="Sidebar" class="mt-5">
					<div class="px-2">
						{#each menuItems as group}
							<div class="pt-3 first:pt-0">
								{#if group.name}
									<div
										class="text-gray-900 flex items-center px-2 py-2 font-medium text-sm rounded-md"
									>
										{group.name}
									</div>
								{/if}
								{#each group.items as item}
									<a
										href={item.href}
										target={item.href.startsWith('http') ? '_blank' : ''}
										class="{$page.url.pathname === item.href
											? 'text-gray-900 bg-gray-50'
											: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors'} flex items-center px-2 py-2 mb-1 text-sm rounded-md"
									>
										<i class="{item.iconClass} mr-2 items-center" />
										{item.label}
										{#if item.href.startsWith('http')}
											<i class="ri-arrow-right-up-line ml-auto text-gray-400" />
										{/if}
									</a>
								{/each}
							</div>
						{/each}
					</div>
				</nav>
			</div>
			<div class="flex-shrink-0 flex border-t border-gray-200 p-4">
				{#if !$session.user}
					<button
						on:click={() => (shouldShowLogin = !shouldShowLogin)}
						class="flex-shrink-0 w-full group block text-center text-sm text-gray-500"
					>
						Login
					</button>
				{:else}
					<p class="flex-shrink-0 w-full group block text-center text-sm text-gray-500">
						👋 Hi, {$session.user.name}!
					</p>
				{/if}
			</div>
		</div>

		<div class="flex-shrink-0 w-14" aria-hidden="true">
			<!-- Force sidebar to shrink to fit close icon -->
		</div>
	</div>
{/if}
