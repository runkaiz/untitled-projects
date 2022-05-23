<script>
	import '../tailwind.css';
	import DesktopMenu from '$lib/components/layout/DesktopMenu.svelte';
	import ReactivePanel from '$lib/components/layout/ReactivePanel.svelte';
	import LoginForm from '$lib/components/feature/auth/LoginForm.svelte';
	import OffCanvasMenu from '$lib/components/layout/OffCanvasMenu.svelte';
	import MobileTopBar from '$lib/components/layout/MobileTopBar.svelte';
	import { session } from '$app/stores';
	let showLogin = false;
	let showOffCanvasMenu = false;

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
	<DesktopMenu bind:shouldShowLogin={showLogin} />
	<div class="flex flex-col min-w-0 flex-1 overflow-hidden">
		<div class="flex-1 relative z-0 flex overflow-hidden">
			<div class="flex flex-col min-w-0 flex-1 overflow-hidden">
				<div class="flex-1 relative z-0 flex overflow-hidden">
					<MobileTopBar bind:shouldShowOffCanvasMenu={showOffCanvasMenu} />
					<!-- To preserve the space for DesktopMenu -->
					<div class="lg:flex lg:flex-col lg:w-64 lg:order-first" />
					<slot />
				</div>
			</div>
		</div>
	</div>
</div>
