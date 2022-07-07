import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
    extensions: ['.svelte', ...mdsvexConfig.extensions],

    preprocess: [mdsvex(mdsvexConfig)]
};

export default config;
