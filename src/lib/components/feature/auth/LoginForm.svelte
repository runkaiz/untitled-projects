<script>
	import PasswordField from '$lib/components/base/PasswordField.svelte';
	import TextField from '$lib/components/base/TextField.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	async function login(event) {
		const form = event.target;
		const auth = new FormData(form);
		await fetch('/auth/login.json', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: auth.get('email'),
				password: auth.get('password'),
				remember: auth.get('remember-me') === 'on'
			})
		}).then((response) => {
			response.json().then((data) => {
				if (!data.error) {
					dispatch('success', { user: data.user });
				} else {
					// TODO: Handle error in UI
				}
			});
		});
	}
</script>

<form class="space-y-6" on:submit|preventDefault={login}>
	<TextField name="email" label="Email" autocomplete="email" required={true} />

	<PasswordField autocomplete="current-password" />

	<div class="flex items-center justify-between">
		<div class="flex items-center">
			<input
				id="remember-me"
				name="remember-me"
				type="checkbox"
				class="h-4 w-4 text-link focus:ring-indigo-500 border-gray-300 rounded"
			/>
			<label for="remember-me" class="ml-2 block text-sm text-title"> Remember me </label>
		</div>

		<div class="text-sm">
			<button
				type="button"
				on:click|preventDefault={() => {
					// TODO: Implement forgot password
				}}
				class="font-medium text-link hover:text-indigo-500"
			>
				Forgot your password?
			</button>
		</div>
	</div>

	<div>
		<button
			type="submit"
			class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-link hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			Sign in
		</button>
	</div>
</form>
