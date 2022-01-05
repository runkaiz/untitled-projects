const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	purge: ['./src/**/*.svelte', './src/**/*.css'],
	darkMode: false,
	theme: {
		extend: {
			colors: {
				BlueNCS: {
					100: '#EDF7FC',
					200: '#DCEEF8',
					300: '#E4F1F9',
					400: '#D3E7F1',
					500: '#89BCD7',
					600: '#056EA6',
			},
		},
	},
	},
	variants: {
		extend: {
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans],
			},
		}
	},
	plugins: [require('@tailwindcss/line-clamp')]
};
