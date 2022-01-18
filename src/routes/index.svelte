<script>
	import MainPanel from '$lib/components/layout/MainPanel.svelte';
</script>

<MainPanel>
	<h1 class="font-semibold text-2xl">Untitled Projects</h1>
	<p class="pt-2 text-gray-700">
		This is a collaborative space for nico and yao to document their shared projects.
	</p>
	<div class="flex flex-row">
		<div class="basis-full border border-gray-200 rounded-md p-4 my-6">
			<h2 class="font-semibold text-lg">Want to deploy your own site?</h2>
			<p class="pt-2 text-gray-700">
				This site runs on our hand-crafted <a
					href="https://github.com/runkaiz/untitled-projects"
					target="_blank"
					class="font-medium text-indigo-600">code</a
				>. For now, you can take a look at the code on GitHub. The project is still in early
				development, so please do not send new issues or pull requests. It's not ready yet.
			</p>
		</div>
	</div>
</MainPanel>
