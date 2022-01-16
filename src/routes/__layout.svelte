<script>
	import '../tailwind.css';
	import { menuItems } from '$lib/menu-items';
	import ReactivePanel from '$lib/components/layout/ReactivePanel.svelte';
	let showLogin = false;
</script>

<svelte:head>
	<link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<ReactivePanel bind:active={showLogin} title="Login">Not ready yet.</ReactivePanel>
<div class="min-h-screen flex">
	<!-- Static sidebar for desktop -->
	<div class="hidden lg:flex lg:flex-shrink-0">
		<div class="flex flex-col w-64">
			<!-- Sidebar component, swap this element with another sidebar if you like -->
			<div class="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-gray-100">
				<div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
					<div class="flex items-center flex-shrink-0 px-4">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
							><path fill="none" d="M0 0h24v24H0z" /><path
								d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm9 12v2h6v-2h-6zm-3.586-3l-2.828 2.828L7 16.243 11.243 12 7 7.757 5.586 9.172 8.414 12z"
							/></svg
						>
					</div>
					<nav class="flex-1 mt-5" aria-label="Sidebar">
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
											class="text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors group flex items-center px-2 py-2 text-sm rounded-md"
										>
											<i class="{item.iconClass} mr-2" />
											{item.label}
										</a>
									{/each}
								</div>
							{/each}
						</div>
					</nav>
				</div>
				<div class="flex-shrink-0 flex border-t border-gray-200 p-4">
					<button
						on:click={() => (showLogin = !showLogin)}
						class="flex-shrink-0 w-full group block text-center text-sm text-gray-500"
					>
						Login
					</button>
				</div>
			</div>
		</div>
	</div>

	<div class="flex flex-col min-w-0 flex-1 overflow-hidden">
		<div class="flex-1 relative z-0 flex overflow-hidden">
			<div class="flex flex-col min-w-0 flex-1 overflow-hidden">
				<div class="flex-1 relative z-0 flex overflow-hidden">
					<slot />
				</div>
			</div>
		</div>
	</div>
</div>
