<script>
	import '../tailwind.css';
	import DesktopMenu from '$lib/components/layout/DesktopMenu.svelte';
	import ReactivePanel from '$lib/components/layout/ReactivePanel.svelte';
	import LoginForm from '$lib/components/feature/auth/LoginForm.svelte';
	import OffCanvasMenu from '$lib/components/layout/OffCanvasMenu.svelte';
	import MobileTopBar from '$lib/components/layout/MobileTopBar.svelte';
	let showLogin = false;
	let showOffCanvasMenu = false;
</script>

<svelte:head>
	<link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="min-h-screen flex">
	<ReactivePanel bind:active={showLogin} title="Login"><LoginForm /></ReactivePanel>
	<OffCanvasMenu bind:show={showOffCanvasMenu} />
	<DesktopMenu bind:shouldShowLogin={showLogin} />
	<div class="flex flex-col min-w-0 flex-1 overflow-hidden">
		<div class="flex-1 relative z-0 flex overflow-hidden">
			<div class="flex flex-col min-w-0 flex-1 overflow-hidden">
				<div class="flex-1 relative z-0 flex overflow-hidden">
					<MobileTopBar bind:shouldShowOffCanvasMenu={showOffCanvasMenu} />
					<slot />
				</div>
			</div>
		</div>
	</div>
</div>
