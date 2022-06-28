<script>
	import HyperLink from '$lib/components/content/HyperLink.svelte';
	import MainPanel from '$lib/components/layout/MainPanel.svelte';
</script>

<MainPanel>
	<h1>Untitled Projects</h1>
	<p class="pt-2 text-paragraph">
		This is a collaborative space for nico and yao to document their shared projects.
	</p>
	<div class="flex flex-row">
		<div class="basis-full border border-gray-200 rounded-md p-4 my-6">
			<h2>Want to deploy your own site?</h2>
			<p class="pt-2 text-paragraph">
				This site runs on our hand-crafted <HyperLink
					link="https://github.com/runkaiz/untitled-projects"
					newWindow={true}>code</HyperLink
				>. For now, you c>an take a look at the code on GitHub. The project is still in early development,
				so please do not send new issues or pull requests. It's not ready yet.
			</p>
		</div>
	</div>
</MainPanel>
