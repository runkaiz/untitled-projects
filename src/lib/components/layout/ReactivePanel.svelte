<script>
	import classes from 'svelte-transition-classes';
	import Keydown from 'svelte-keydown';
	export let active;
	export let title;
	export let description = '';
</script>

{#if active}
	<Keydown on:Escape={() => (active = false)} />
	<div
		class="fixed z-50 inset-0 overflow-hidden print:flex"
		aria-labelledby="slide-over-title"
		role="dialog"
		aria-modal="true"
	>
		<div class="absolute inset-0 overflow-hidden">
			<!--
      Background overlay, show/hide based on off-canvas menu state.
    -->
			<div
				in:classes={{
					duration: 200,
					base: 'transition-opacity ease-out duration-200',
					from: 'opacity-0 backdrop-blur-none',
					to: 'opacity-100 backdrop-blur-sm'
				}}
				out:classes={{
					duration: 200,
					base: 'transition-opacity ease-out duration-200',
					from: 'opacity-100 backdrop-blur-sm',
					to: 'opacity-0 backdrop-blur-none'
				}}
				class="fixed inset-0 bg-gray-50 bg-opacity-75"
				aria-hidden="true"
			/>
			<div class="absolute inset-0" aria-hidden="true">
				<div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
					<div
						class="w-screen max-w-md border-l border-gray-200"
						in:classes={{
							duration: 300,
							base: 'transition ease-in-out duration-300 transform',
							from: 'translate-x-full',
							to: 'translate-x-0'
						}}
						out:classes={{
							duration: 300,
							base: 'transition ease-in-out duration-300 transform',
							from: 'translate-x-0',
							to: 'translate-x-full'
						}}
					>
						<div class="h-full flex flex-col bg-white overflow-y-scroll">
							<div class="py-6 px-4 bg-gray-50 sm:px-6">
								<div class="flex items-center justify-between">
									<h2 class="text-lg font-medium text-gray-900" id="slide-over-title">
										{title}
									</h2>
									<div class="ml-3 h-7 flex items-center">
										<button
											on:click={() => {
												active = false;
											}}
											type="button"
											class="text-gray-500 hover:text-gray-600 focus:outline-none"
										>
											<span class="sr-only">Close panel</span>
											<!-- Heroicon name: outline/x -->
											<svg
												class="h-6 w-6"
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
								</div>
								<div class="mt-1">
									<p class="text-sm text-gray-500">
										{description}
									</p>
								</div>
							</div>
							<div class="relative flex-1 py-6 px-4 sm:px-6">
								<slot />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
