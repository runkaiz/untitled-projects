// PasswordField.stories.js

import PasswordField from './PasswordField.svelte';

//👇This default export determines where your story goes in the story list
export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/svelte/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'PasswordField',
	component: PasswordField
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => ({
	props: args
});

export const Multiple = Template.bind({});
Multiple.args = {};