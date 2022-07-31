<script>
	import DescriptionBox from '$lib/components/content/DescriptionBox.svelte';
	import HyperLink from '$lib/components/content/HyperLink.svelte';
	import Project from '$lib/components/content/items/Project.svelte';
	import ProjectTable from '$lib/components/content/ProjectTable.svelte';
	import MainPanel from '$lib/components/layout/MainPanel.svelte';
	import { site_title } from '$lib/environment';

	let time = new Date();
	$: date = time.getDate();
	$: month = time.getMonth();
	$: year = time.getFullYear();
</script>

<svelte:head>
	<title>{site_title} • Nico</title>
</svelte:head>

<MainPanel>
	<div class="hidden print:block">
		<DescriptionBox title="Printing or exporting to PDF?">
			If you can see this, then it means you are viewing a printed or PDF version of my personal
			page (which means it might be outdated). Please visit https://untitled.codes/nico for the
			latest information, sorry for you inconvenience. Version exported {month + 1}/{date}/{year}.
		</DescriptionBox>
	</div>
	<h1>Runkai (Nico) Zhang</h1>
	<p class="pt-2">
		<HyperLink link="mailto:runkai@untitled.codes">runkai@untitled.codes</HyperLink>
		<br />
		I am an high school student pursuing my interests in computer science.
		<br />
		Check out my <HyperLink link="https://runkaizhang.xyz/">profile</HyperLink> for details that's updated
		more frequently.
		<br />
		<br />
		Aside from 'traditional' computer science I have also taken a course with <HyperLink
			link="https://www.inspiritai.com/">Inspirit AI's A.I. Scholars program</HyperLink
		>.
	</p>
	<DescriptionBox title="A work in progress.">
		I am still compiling and designing what is going to be placed inside this section, so bear with
		me for now.
	</DescriptionBox>
	<div class="sm:flex sm:items-center">
		<div class="sm:flex-auto">
			<h2>High School</h2>
		</div>
		<p>Northfield Mount Hermon '23</p>
	</div>
	<div class="sm:flex sm:items-center">
		<div class="sm:flex-auto">
			<h2>Middle School</h2>
		</div>
		<p>The Bement School '20</p>
	</div>
	<br />
	<p>
		I also have taken the responsibility of a couple of leadership positions, such as resident
		leader at NMH and leader of the robotics club.
	</p>
	<br />
	<div>
		<ProjectTable
			title="Ongoing Projects"
			subtitle="A list of projects that I recently worked on."
			buttonLink="https://github.com/runkaiz"
			buttonText="GitHub"
		>
			<Project
				name="Untitled Project"
				platform="Web"
				language="HTML, CSS, JS"
				status="Ongoing"
				link="https://github.com/runkaiz/untitled-projects"
			/>
			<Project
				name="Shift C"
				platform="Web"
				language="HTML, CSS, JS"
				status="Planning"
				link="https://github.com/yych42/shift-c"
			/>
		</ProjectTable>
		<br />
		<ProjectTable
			title="Other Projects"
			subtitle="Relevent programs that I had been working that may not be as recent. Those that are marked as experiments are like completed little proofs of concepts. Practically they are not useful to anybody, but I have always found these snippets of knowledge handy as I tend to forget things."
			buttonLink="https://github.com/runkaiz"
			buttonText="GitHub"
		>
			<Project
				name="The Bement App"
				platform="iOS"
				language="Swift"
				status="Completed"
				link="https://github.com/bement-dev/Bement-app"
			/>
			<Project
				name="RunkaiKit"
				platform="iOS"
				language="Swift"
				status="Experiment"
				link="https://github.com/runkaiz/RunkaiKit"
			/>
			<Project
				name="Pro-Ject"
				platform="Web"
				language="HTML, CSS, JS"
				status="Experiment"
				link="https://github.com/runkaiz/pro-ject"
			/>
			<Project
				name="Personal Website"
				platform="Web"
				language="HTML, CSS, JS"
				status="Decommissioned"
				link="https://github.com/runkaiz/runkai-zhang"
			/>
			<Project
				name="Think"
				platform="iOS"
				language="Swift"
				status="Experiment"
				link="https://github.com/yych42/think"
			/>
			<Project
				name="Journey"
				platform="iOS"
				language="Swift"
				status="Experiment"
				link="https://github.com/runkaiz/Journey"
			/>
			<Project
				name="Heartful"
				platform="iOS"
				language="Swift"
				status="Experiment"
				link="https://github.com/runkaiz/Heartful"
			/>
		</ProjectTable>
	</div>
</MainPanel>
