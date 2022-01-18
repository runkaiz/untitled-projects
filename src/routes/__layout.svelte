<script>
	import '../tailwind.css';
	import DesktopMenu from '$lib/components/layout/DesktopMenu.svelte';
</script>

<svelte:head>
	<link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="min-h-screen flex">
	<DesktopMenu />
	<div class="flex flex-col min-w-0 flex-1 overflow-hidden">
		<div class="flex-1 relative z-0 flex overflow-hidden">
			<div class="flex flex-col min-w-0 flex-1 overflow-hidden">
				<div class="flex-1 relative z-0 flex overflow-hidden">
					<slot />
				</div>
			</div>
		</div>
	</div>
</div>
