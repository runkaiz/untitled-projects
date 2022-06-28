<script>
	export let label;
	export let name;
	export let placeholder = '';
	export let value = '';
	export let disabled = false;
	export let leadingIconClass = null;
	export let autocomplete = false;
	export let required = false;
</script>

<div>
	<label for={name} class="block text-sm font-medium text-paragraph">
		{label}
	</label>
	<div class="mt-1 relative">
		{#if leadingIconClass}
			<div
				class="absolute inset-y-0 left-0 px-2 flex items-center bg-gray-50 rounded-l-md border border-gray-300 text-gray-600 pointer-events-none"
			>
				<i class={leadingIconClass} />
			</div>
		{/if}
		<input
			{name}
			id={name}
			{placeholder}
			bind:value
			{disabled}
			{autocomplete}
			{required}
			class="appearance-none block w-full  py-2 {leadingIconClass
				? 'pl-10 pr-2'
				: 'px-3'} border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:shadow-md transition-shadow sm:text-sm"
		/>
	</div>
</div>
