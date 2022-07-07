// Notification.stories.js

import Notification from './Notification.svelte';

//👇This default export determines where your story goes in the story list
export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/svelte/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Notification',
	component: Notification
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => ({
	props: args
});

export const Multiple = Template.bind({});
Multiple.args = {
    messages: [
		{
        	ok: true,
        	title: "Test Title #1",
        	details: "This is like one of the only things working in storybook."
    	},
		{
			ok: false,
			title: "Test Title #2",
			details: "Alright I can get used to this."
		}
	]
};

export const Ok = Template.bind({});
Ok.args = {
    messages: [
		{
        	ok: true,
        	title: "Test Title #1",
        	details: "This is like one of the only things working in storybook."
    	}
	]
};

export const NotOk = Template.bind({});
NotOk.args = {
    messages: [
		{
        	ok: false,
        	title: "Test Title #2",
        	details: "This is like one of the only things working in storybook."
    	}
	]
};
