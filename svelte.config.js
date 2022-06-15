import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],

	kit: {
		adapter: adapter()
	},

	preprocess: []
};

export default config;
