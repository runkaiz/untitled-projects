<script>
	import ArticleTile from '$lib/components/layout/ArticleTile.svelte';
	import MainPanel from '$lib/components/layout/MainPanel.svelte';
	import SidePanel from '$lib/components/layout/SidePanel.svelte';
</script>

<MainPanel>
	<slot />
</MainPanel>
<SidePanel>
	<ArticleTile
		title="Ipsum lorem"
		author="Runkai"
		abstract="Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim
				rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt
				maiores et accusamus quod dolor."
		date="today"
	/>
	<ArticleTile
		title="Ipsum lorem"
		author="Runkai & Y. Chen"
		abstract="Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim
				rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt
				maiores et accusamus quod dolor."
		date="today"
	/></SidePanel
>
