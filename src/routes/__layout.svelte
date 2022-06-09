<script>
	import '../tailwind.css';
	import DesktopMenu from '$lib/components/layout/DesktopMenu.svelte';
	import ReactivePanel from '$lib/components/layout/ReactivePanel.svelte';
	import LoginForm from '$lib/components/feature/auth/LoginForm.svelte';
	import OffCanvasMenu from '$lib/components/layout/OffCanvasMenu.svelte';
	import OffCanvasNoteMenu from '$lib/components/layout/OffCanvasNoteMenu.svelte';
	import MobileTopBar from '$lib/components/layout/MobileTopBar.svelte';
	import { beforeUpdate, afterUpdate } from 'svelte';
	import { session } from '$app/stores';

	let url;
	let isANoteOpen = false;
	let showLogin = false;
	let showOffCanvasMenu = false;
	let showOffCanvasNoteMenu = false;

	beforeUpdate(() => {
		isANoteOpen = true;
		url = new URL(window.location.href);

		if (url.pathname === '/notes' || url.pathname.lastIndexOf('/notes') !== 0) {
			isANoteOpen = false;
		}
	});

	afterUpdate(() => {
		isANoteOpen = true;
		url = new URL(window.location.href);

		if (url.pathname === '/notes' || url.pathname.lastIndexOf('/notes') !== 0) {
			isANoteOpen = false;
		}
	});

	function updateUser(event) {
		showLogin = false;
		$session.user = event.detail.user;
	}
</script>

<svelte:head>
	<link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
		rel="stylesheet"
	/>
	<title>Untitled Projects</title>
</svelte:head>

<div class="min-h-screen flex">
	<ReactivePanel bind:active={showLogin} title="Login"
		><LoginForm on:success={updateUser} /></ReactivePanel
	>
	<OffCanvasMenu bind:show={showOffCanvasMenu} bind:shouldShowLogin={showLogin} />
	<OffCanvasNoteMenu bind:show={showOffCanvasNoteMenu} />
	<DesktopMenu bind:shouldShowLogin={showLogin} />
	<div class="flex flex-col min-w-0 flex-1 overflow-hidden">
		<div class="flex-1 relative z-0 flex overflow-hidden">
			<div class="flex flex-col min-w-0 flex-1 overflow-hidden">
				<div class="flex-1 relative z-0 flex overflow-hidden">
					<MobileTopBar
						bind:isANoteOpen
						bind:shouldShowOffCanvasMenu={showOffCanvasMenu}
						bind:shouldShowOffCanvasNoteMenu={showOffCanvasNoteMenu}
					/>
					<!-- To preserve the space for DesktopMenu -->
					<div class="lg:flex lg:flex-col lg:w-64 lg:order-first print:hidden" />
					<slot />
				</div>
			</div>
		</div>
	</div>
</div>
