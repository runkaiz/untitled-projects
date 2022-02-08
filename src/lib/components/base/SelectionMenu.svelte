<script>
	import classes from 'svelte-transition-classes';
	export let options;
	export let selected = [];
	export let label;

	let showPopover = false;
</script>

<div>
	<p class="block text-sm font-medium text-gray-700">{label}</p>
	<div class="relative">
		<button
			type="button"
			class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			aria-haspopup="listbox"
			aria-expanded="true"
			aria-labelledby="listbox-label"
			on:click={() => {
				showPopover = !showPopover;
			}}
		>
			<span class="block truncate"
				>{selected.length !== 0 ? selected.map((item) => item.text).join(', ') : 'Select'}</span
			>
			<span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
				<!-- Heroicon name: solid/selector -->
				<svg
					class="h-5 w-5 text-gray-400"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</span>
		</button>

		<!-- Select popover, show/hide based on select state. -->
		{#if showPopover}
			<ul
				class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
				tabindex="-1"
				role="listbox"
				aria-labelledby="listbox-label"
				aria-activedescendant="listbox-option-3"
				out:classes={{
					duration: 100,
					base: 'transition ease-in duration-100',
					from: 'opacity-100',
					to: 'opacity-0'
				}}
			>
				{#each options as option}
					<li
						class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
						role="option"
						on:click={() => {
							if (selected.includes(option)) {
								// Remove this option from the selected list
								selected = selected.filter((item) => item.text !== option.text);
							} else {
								// Add this option to the selected list
								selected = [...selected, option];
							}
						}}
					>
						<span
							class="{selected.includes(option) ? 'font-semibold' : 'font-normal'} block truncate"
						>
							{option.text}
						</span>

						{#if selected.includes(option)}
							<span
								class="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4 hover:text-white"
							>
								<!-- Heroicon name: solid/check -->
								<svg
									class="h-5 w-5"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									/>
								</svg>
							</span>
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
