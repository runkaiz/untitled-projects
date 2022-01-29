<script context="module">
	export async function load({ session, fetch }) {
		if (!session.user) {
			console.log('not logged in');
			return {
				status: 307,
				redirect: '/'
			};
		}

		// const url = `/auth/me.json`;
		// const res = await fetch(url);

		// if (res.ok) {
		// 	return {
		// 		props: {
		// 			user: await res.json()
		// 		}
		// 	};
		// }

		return {
			status: 200
		};
	}
</script>

<script>
	import MainPanel from '$lib/components/layout/MainPanel.svelte';
	import TextField from '$lib/components/base/TextField.svelte';
	import TextArea from '$lib/components/base/TextArea.svelte';
	import PasswordField from '$lib/components/base/PasswordField.svelte';

	export let user;
</script>

<MainPanel>
	<h1 class="font-semibold text-2xl">Settings</h1>
	<div
		class="border border-emerald-200 bg-emerald-50 rounded-md p-2 mt-5 text-emerald-600 flex flex-row justify-between"
	>
		<p>👋 You are logged in as [user.name].</p>
		<button href="/logout"><i class="ri-logout-box-r-line pr-1" /></button>
	</div>

	<div class="mt-5">
		<form>
			<div class="border border-gray-200 sm:rounded-lg sm:overflow-hidden">
				<div class="px-4 py-5 bg-white space-y-6 sm:p-6">
					<div>
						<h3 class="text-lg font-medium leading-6 text-gray-900">Account Credentials</h3>
						<p class="mt-1 text-sm text-gray-600">
							This information will be displayed publicly so be careful what you share.
						</p>
					</div>
					<div class="grid grid-cols-6 gap-6">
						<div class="col-span-6">
							<TextField label="Email" name="email" value="[user.email]" />
						</div>
						<div class="col-span-6 sm:col-span-3">
							<PasswordField
								label="Current Password"
								name="password-old"
								autocomplete="current-password"
							/>
						</div>
						<div class="col-span-6 sm:col-span-3">
							<PasswordField label="New Password" name="password-new" autocomplete="off" />
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

	<div class="mt-5">
		<form>
			<div class="border border-gray-200 sm:rounded-lg sm:overflow-hidden">
				<div class="px-4 py-5 bg-white space-y-6 sm:p-6">
					<div>
						<h3 class="text-lg font-medium leading-6 text-gray-900">Public Profile</h3>
						<p class="mt-1 text-sm text-gray-600">
							This information will be displayed publicly so be careful what you share.
						</p>
					</div>
					<div class="grid grid-cols-6 gap-6">
						<div class="col-span-6 sm:col-span-3">
							<TextField label="Display name" name="display-name" />
						</div>
					</div>

					<div>
						<div class="mt-1">
							<TextArea label="About" name="about" />
						</div>
						<p class="mt-2 text-sm text-gray-500">
							Brief description for your profile. URLs are hyperlinked.
						</p>
					</div>

					<div class="grid grid-cols-6 gap-6">
						<div class="col-span-6 sm:col-span-3">
							<TextField label="GitHub" name="github-account" leadingIconClass="ri-github-fill" />
						</div>
						<div class="col-span-6 sm:col-span-3">
							<TextField label="Twitter" name="twitter-account" leadingIconClass="ri-at-line" />
						</div>
						<div class="col-span-6 sm:col-span-3">
							<TextField
								label="Telegram"
								name="telegram-account"
								leadingIconClass="ri-telegram-line"
							/>
						</div>
						<div class="col-span-6 sm:col-span-3">
							<TextField label="Public Email" name="public-email" leadingIconClass="ri-mail-line" />
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
