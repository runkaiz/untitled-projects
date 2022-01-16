<script>
	import PasswordField from '$lib/components/base/PasswordField.svelte';
	import TextField from '$lib/components/base/TextField.svelte';
</script>

<form class="space-y-6" action="#" method="POST">
	<TextField name="email" label="Email" autocomplete="email" required={true} />

	<PasswordField autocomplete="current-password" />

	<div class="flex items-center justify-between">
		<div class="flex items-center">
			<input
				id="remember-me"
				name="remember-me"
				type="checkbox"
				class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
			/>
			<label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
		</div>

		<div class="text-sm">
			<button
				type="button"
				on:click|preventDefault={() => {
					console.log('clicked');
				}}
				class="font-medium text-indigo-600 hover:text-indigo-500"
			>
				Forgot your password?
			</button>
		</div>
	</div>

	<div>
		<button
			type="submit"
			class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			Sign in
		</button>
	</div>
</form>
