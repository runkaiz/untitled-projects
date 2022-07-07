// DesktopMenu.stories.js

import DesktopMenu from './DesktopMenu.svelte';

//👇This default export determines where your story goes in the story list
export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/svelte/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'DesktopMenu',
	component: DesktopMenu
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => ({
	props: args
});

export const Normal = Template.bind({});
Normal.args = {
	shouldShowLogin: false
};

export const LoginTriggered = Template.bind({});
LoginTriggered.args = {
	shouldShowLogin: true
};
