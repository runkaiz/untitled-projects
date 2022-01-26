import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			optimizeDeps: {
				include: ['mock-aws-s3', 'aws-sdk', 'nock'] // For bcrypt
			}
		}
	}
};

export default config;
