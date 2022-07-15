<script>
	import DescriptionBox from '$lib/components/content/DescriptionBox.svelte';
	import HyperLink from '$lib/components/content/HyperLink.svelte';
	import MainPanel from '$lib/components/layout/MainPanel.svelte';
	import { site_title } from '$lib/environment';
</script>

<MainPanel>
	<h1>{site_title}</h1>
	<p class="pt-2">
		This is a collaborative space for nico and yao to document their shared projects.
	</p>
	<DescriptionBox title="Want to deploy your own site?">
		This site runs on our hand-crafted <HyperLink
			link="https://github.com/runkaiz/untitled-projects"
			newWindow={true}>code</HyperLink
		>. For now, you can take a look at the code on GitHub. The project is still in early
		development, so please do not send new issues or pull requests. It's not ready yet.
	</DescriptionBox>
</MainPanel>
