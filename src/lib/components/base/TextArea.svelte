<script>
	export let label;
	export let name;
	export let placeholder = '';
	export let value = '';
	export let disabled = false;
	export let required = false;
</script>

<div>
	<label for={name} class="block text-sm font-medium text-paragraph">
		{label}
	</label>
	<div class="mt-1 relative">
		<textarea
			{name}
			id={name}
			{placeholder}
			bind:value
			{disabled}
			{required}
			class="appearance-none block w-full py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:shadow-md transition-shadow sm:text-sm"
		/>
	</div>
</div>
