// ProjectTable.stories.js

import ProjectTable from './ProjectTable.svelte';

//👇This default export determines where your story goes in the story list
export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/svelte/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'ProjectTable',
	component: ProjectTable
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => ({
	props: args
});

export const Normal = Template.bind({});
Normal.args = {
	title: "Ongoing Projects",
	subtitle: "A list of projects that I recently worked on.",
	buttonText: "GitHub",
	buttonLink: "https://github.com/runkaiz"
};