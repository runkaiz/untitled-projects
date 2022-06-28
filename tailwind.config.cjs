const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{svelte, css}', './src/app.html'],
	media: false,
	theme: {
		fontFamily: {
			sans: ['Inter', ...defaultTheme.fontFamily.sans]
		},
		extend: {
			colors: {
				link: '#5047E5',
				linkHover: '49 46 129',
				paragraph: '#374151',
				title: '#111827'
			},
			order: {
				second: '-9998'
			}
		}
	},
	variants: {},
	plugins: [
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms')
	]
};
