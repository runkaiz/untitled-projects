<script>
	export let label = 'Password';
	export let name = 'password';
	export let placeholder = '';
	export let value = '';
	export let disabled = false;
	export let leadingIconClass = '';
	export let autocomplete = undefined;
</script>

<div>
	<label for={name} class="block text-sm font-medium text-gray-700">
		{label}
	</label>
	<div class="mt-1 relative">
		{#if leadingIconClass}
			<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<i class={leadingIconClass} />
			</div>
		{/if}
		<input
			{name}
			id={name}
			type="password"
			{placeholder}
			bind:value
			{disabled}
			{autocomplete}
			required
			class="appearance-none block w-full  py-2 {leadingIconClass
				? 'pl-9 pr-2'
				: 'px-3'} border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:shadow-md transition-shadow sm:text-sm"
		/>
	</div>
</div>
