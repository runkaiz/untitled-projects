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
				BlueNCS: {
					100: '#EDF7FC',
					200: '#DCEEF8',
					300: '#E4F1F9',
					400: '#D3E7F1',
					500: '#89BCD7',
					600: '#056EA6'
				}
			}
		}
	},
	variants: {},
	plugins: [require('@tailwindcss/line-clamp')]
};
