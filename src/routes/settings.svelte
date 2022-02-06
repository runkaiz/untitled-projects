<script context="module">
	export async function load({ session, fetch }) {
		if (!session.user) {
			console.log('not logged in');
			return {
				status: 307,
				redirect: '/'
			};
		}

		const url = `/auth/me.json`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					user: await res.json()
				}
			};
		}

		return {
			status: 500,
			error: 'Failed to load user'
		};
	}
</script>

<script>
	import MainPanel from '$lib/components/layout/MainPanel.svelte';
	import TextField from '$lib/components/base/TextField.svelte';
	import PasswordField from '$lib/components/base/PasswordField.svelte';
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import Notification from '$lib/components/base/Notification.svelte';

	export let user;

	let notificationMessages = [];

	async function updateUser(event) {
		const form = event.target;
		const data = Object.fromEntries(new FormData(form));

		if (data.currentPassword || data.newPassword) {
			updatePassword(data.currentPassword, data.newPassword);
		}

		const url = `/auth/me.json`;
		const res = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (res.ok) {
			this.user = await res.json();
		}
	}

	async function updatePassword(currentPassword, newPassword) {
		const url = `/auth/new-password.json`;
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				currentPassword,
				newPassword
			})
		});

		if (!res.ok) {
			const { message } = await res.json();
			notificationMessages = [
				...notificationMessages,
				{
					title: 'Failed to update password',
					details: message,
					ok: false
				}
			];
		} else {
			notificationMessages = [
				...notificationMessages,
				{
					title: 'Password updated',
					ok: true
				}
			];
		}
	}

	async function logout() {
		const url = `/auth/logout.json`;
		const res = await fetch(url, {
			credentials: 'same-origin',
			method: 'POST'
		});

		if (res.ok) {
			$session.user = null;
			goto('/');
		}
	}
</script>

<Notification bind:messages={notificationMessages} />
<MainPanel>
	<h1 class="font-semibold text-2xl">Settings</h1>
	<div
		class="border border-emerald-200 bg-emerald-50 rounded-md p-2 mt-5 text-emerald-600 flex flex-row justify-between"
	>
		<p>👋 You are logged in as {user.name}.</p>
		<button on:click={logout}><i class="ri-logout-box-r-line pr-1" /></button>
	</div>

	<div class="mt-5">
		<form on:submit|preventDefault={updateUser}>
			<div class="border border-gray-200 sm:rounded-lg sm:overflow-hidden">
				<div class="px-4 py-5 bg-white space-y-6 sm:p-6">
					<div>
						<h3 class="text-lg font-medium leading-6 text-gray-900">My Account</h3>
						<p class="mt-1 text-sm text-gray-600">
							Update your account information or change your password.
						</p>
					</div>
					<div class="grid grid-cols-6 gap-6">
						<div class="col-span-6 sm:col-span-3">
							<TextField label="Email" name="email" value={user.email} />
						</div>
						<div class="col-span-6 sm:col-span-3">
							<TextField label="Display name" name="name" value={user.name} />
						</div>
						<div class="col-span-6 sm:col-span-3">
							<PasswordField
								label="Current Password"
								name="currentPassword"
								autocomplete="current-password"
								required={false}
							/>
						</div>
						<div class="col-span-6 sm:col-span-3">
							<PasswordField
								label="New Password"
								name="newPassword"
								autocomplete="off"
								required={false}
							/>
						</div>
					</div>
				</div>
				<div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
					<button
						type="submit"
						class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Save
					</button>
				</div>
			</div>
		</form>
	</div>
</MainPanel>
