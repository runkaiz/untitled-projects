<script>
	import Composer from '$lib/components/feature/Composer.svelte';
	import MainPanel from '$lib/components/layout/MainPanel.svelte';

	export let data;
</script>

<MainPanel>
	<Composer
		title={data.note.title}
		content={data.note.content}
		isDraft={data.note.isDraft}
		slug={data.note.slug}
		author={data.note.author}
		coauthors={data.note.coauthors}
	/>
</MainPanel>
