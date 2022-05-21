<script>
	import MainPanel from '$lib/components/layout/MainPanel.svelte';
</script>

<MainPanel>
	<h1 class="font-semibold text-2xl">Untitled Projects</h1>
	<div class="flex flex-row">
		<div class="basis-full border border-gray-200 rounded-md p-4 my-6">
			<h2 class="font-semibold text-lg"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
			</h2>
			<p class="pt-2 text-gray-700">
				You have discovered this website in eco mode, which means the current web page you are viewing is hosted on a solar powered SBC. This helps us reduce load from our primary webserver and take another step towards carbon neutrality.
			</p>
		</div>
	</div>
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
